/* ============================================================
   MIJOTE : MOTEUR
   Filtres, planning (restes, saison, progression), coûts calculés,
   quantités, liste de courses (placard, formats vendus).
   Dépend de data/recipes.js et data/catalog.js.
   ============================================================ */
const DAYS = ["Lundi", "Mardi", "Mercredi", "Jeudi", "Vendredi", "Samedi", "Dimanche"];
const MEAL_LABEL = { lunch: "Déjeuner", dinner: "Dîner" };

const STYLES = [
  { id: "proteine", label: "Protéiné / Fitness", desc: "Orienté macros, haute teneur en protéines" },
  { id: "fastfood", label: "Fast-food maison / Confort", desc: "Burgers, tacos et pizzas en version maison" },
  { id: "sain", label: "Sain & équilibré", desc: "Légumes, céréales complètes, cuissons douces" },
  { id: "vegan", label: "Végétalien / Vegan", desc: "Aucun produit d'origine animale" },
  { id: "mediterraneen", label: "Méditerranéen", desc: "Huile d'olive, tomates, poisson, légumineuses" },
  { id: "express", label: "Express (20 min)", desc: "Préparation et cuisson en 20 minutes maximum" },
  { id: "economique", label: "Économique / Étudiant", desc: "Petits prix, gros appétit" },
  { id: "gastronomique", label: "Gastronomique", desc: "Plats de restaurant et techniques avancées. Le budget devient indicatif." }
];
const DIETS = [
  { id: "sans-porc", label: "Sans porc", desc: "Aucun produit à base de porc" },
  { id: "halal", label: "Halal", desc: "Sans porc, sans alcool, sans crustacés. Viande certifiée à choisir en magasin." },
  { id: "sans-lactose", label: "Sans lactose", desc: "Ni lait, ni beurre, ni crème, ni fromage, ni yaourt" },
  { id: "sans-gluten", label: "Sans gluten", desc: "Ni blé, ni pâtes classiques, ni pain, ni semoule, ni sauce soja" },
  { id: "vegetarien", label: "Végétarien", desc: "Ni viande, ni poisson (œufs et laitages acceptés)" }
];
const DIET_LABEL = { "sans-porc": "Sans porc", halal: "Halal", "sans-lactose": "Sans lactose", "sans-gluten": "Sans gluten", vegetarien: "Végétarien", vegan: "Vegan" };
const EQUIP = [
  { id: "base", label: "Plaques, poêle, casserole", desc: "Le matériel de base" },
  { id: "four", label: "Four", desc: "Gratins, rôtis, papillotes" },
  { id: "airfryer", label: "Air fryer", desc: "Cuisson croustillante sans bain d'huile" },
  { id: "micro-ondes", label: "Micro-ondes", desc: "Cuisson et réchauffage rapides" },
  { id: "mixeur", label: "Mixeur / blender", desc: "Veloutés, sauces, houmous" },
  { id: "vapeur", label: "Cuiseur vapeur / rice cooker", desc: "Riz, poissons et légumes à la vapeur" }
];
const EQUIP_LABEL = Object.fromEntries(EQUIP.map(e => [e.id, e.label]));
const STYLE_LABEL = Object.fromEntries(STYLES.map(s => [s.id, s.label]));
const LEVELS = [
  { min: 0, name: "Apprenti", diff: 1 },
  { min: 5, name: "Commis", diff: 2 },
  { min: 15, name: "Cuisinier", diff: 3 },
  { min: 30, name: "Chef de partie", diff: 3 }
];

/* ---------- coûts calculés à partir des ingrédients ---------- */
function ingredientCost(g) {
  const p = PRICES[g.item + "|" + g.unit];
  if (p === undefined) return 0;
  return g.unit === "g" || g.unit === "ml" ? g.baseQty * p / 1000 : g.baseQty * p;
}
RECIPES.forEach(r => { r.costPerPerson = Math.round(r.ingredients.reduce((s, g) => s + ingredientCost(g), 0) * 100) / 100; });
const MIN_COST = Math.min(...RECIPES.filter(r => r.category !== "gastronomique").map(r => r.costPerPerson));

/* ---------- utilitaires ---------- */
function shuffle(arr, rng = Math.random) {
  const a = arr.slice();
  for (let k = a.length - 1; k > 0; k--) { const j = Math.floor(rng() * (k + 1)); [a[k], a[j]] = [a[j], a[k]]; }
  return a;
}
const totalTime = r => r.prepTime + r.cookTime + (r.waitTime || 0);
const activeTime = r => r.prepTime + r.cookTime;
const recipeById = id => RECIPES.find(r => r.id === id);
const norm = s => String(s).toLowerCase().normalize("NFD").replace(/[̀-ͯ]/g, "").trim();
const gastroMode = cfg => cfg.styles.includes("gastronomique");

/* ---------- saison ---------- */
const currentMonth = () => new Date().getMonth() + 1;
function outOfSeason(r, month = currentMonth()) {
  return r.ingredients.filter(g => SEASONS[g.item] && !SEASONS[g.item].includes(month) && (g.unit !== "g" || g.baseQty >= 60)).map(g => g.item);
}

/* ---------- filtres stricts ---------- */
function excludedBy(r, cfg) {
  const ex = (cfg.exclude || []).map(norm).filter(Boolean);
  if (!ex.length) return null;
  const hit = r.ingredients.find(g => ex.some(e => norm(g.item).includes(e)));
  return hit ? hit.item : null;
}
function eligible(r, cfg) {
  if (r.category === "gastronomique" && !gastroMode(cfg)) return false;
  if (!cfg.diets.every(d => r.diet.includes(d))) return false;
  if (!r.equipments.every(e => cfg.equip.includes(e))) return false;
  return !excludedBy(r, cfg);
}
function matchesStyle(r, s) {
  if (r.category === s) return true;
  if (s === "express") return totalTime(r) <= 20;
  if (s === "economique") return r.costPerPerson <= 3;
  if (s === "vegan") return r.diet.includes("vegan");
  if (s === "proteine") return r.protein >= 40;
  return false;
}
function prefersStyle(r, cfg) { return !cfg.styles.length || cfg.styles.some(s => matchesStyle(r, s)); }
function poolFor(cfg) { return RECIPES.filter(r => eligible(r, cfg)); }

/* ---------- progression ---------- */
function cookedCount(history) { return Object.values(history || {}).filter(h => h.n > 0).length; }
function levelFor(history) {
  const n = cookedCount(history);
  let lvl = LEVELS[0];
  LEVELS.forEach(l => { if (n >= l.min) lvl = l; });
  const idx = LEVELS.indexOf(lvl), next = LEVELS[idx + 1] || null;
  return { ...lvl, index: idx, cooked: n, next };
}
function targetDifficulty(cfg, history) {
  if (cfg.level === "adaptive") return levelFor(history).diff;
  if (cfg.level === "all") return 3;
  return +cfg.level || 3;
}

/* ---------- créneaux et restes ---------- */
function slotList(days, leftovers = false) {
  const out = [];
  DAYS.forEach((_, d) => {
    const m = days[d];
    if (!m) return;
    if (m === "lunch" || m === "both") out.push({ day: d, meal: "lunch" });
    if (m === "dinner" || m === "both") out.push({ day: d, meal: "dinner" });
  });
  if (leftovers) {
    out.forEach((s, k) => {
      if (s.meal !== "lunch" || s.day === 0) return;
      const src = out.findIndex(x => x.day === s.day - 1 && x.meal === "dinner");
      if (src >= 0) { s.leftoverOf = src; out[src].feeds = k; }
    });
  }
  return out;
}
const cookedSlots = slots => slots.filter(s => s.leftoverOf === undefined);

/* ---------- score d'un candidat (plus bas = mieux) ---------- */
function candidateScore(r, cfg, ctx) {
  let s = 0;
  if (!prefersStyle(r, cfg)) s += 100;
  if (cfg.seasonal) s += outOfSeason(r).length * 12;
  const h = ctx.history[r.id];
  if (h && h.last && Date.now() - h.last < 21 * 864e5) s += 25;
  if (ctx.favorites.has(r.id)) s -= 6;
  if (!gastroMode(cfg) && cfg.level !== "all") {
    const t = ctx.target;
    if (r.difficulty > t + 1) s += 60;
    else if (r.difficulty === t + 1) s += ctx.challengeUsed ? 40 : 4;
  }
  return s;
}

/* ---------- moteur de recommandation ---------- */
function buildPlan(cfg, opts = {}) {
  const rng = opts.rng || Math.random;
  const ctx = { history: opts.history || {}, favorites: opts.favorites || new Set(), target: targetDifficulty(cfg, opts.history), challengeUsed: false };
  const slots = slotList(cfg.days, cfg.leftovers);
  const P = cfg.people, B = cfg.budget, gastro = gastroMode(cfg);
  const pool = poolFor(cfg);
  const unused = shuffle(pool, rng);
  const chosen = new Array(slots.length).fill(null);
  const order = slots.map((s, k) => k).filter(k => slots[k].leftoverOf === undefined);
  let spent = 0, overBudget = false;

  order.forEach((k, pos) => {
    if (!unused.length) return;
    const mult = slots[k].feeds !== undefined ? 2 : 1;
    const remainingMults = order.slice(pos + 1).map(j => (slots[j].feeds !== undefined ? 2 : 1)).sort((a, b) => b - a);
    const feasible = r => {
      if (gastro) return true;
      const others = unused.filter(x => x !== r).map(x => x.costPerPerson).sort((a, b) => a - b);
      const reserve = remainingMults.slice(0, others.length).reduce((s, m, i) => s + m * others[i], 0) * P;
      return spent + r.costPerPerson * P * mult + reserve <= B + 1e-9;
    };
    let cands = unused.filter(r => (mult === 1 || r.leftover) && feasible(r));
    if (!cands.length) cands = unused.filter(feasible);
    let pick;
    if (!cands.length) {
      pick = unused.slice().sort((a, b) => a.costPerPerson - b.costPerPerson)[0];
      overBudget = true;
    } else {
      const scored = cands.map(r => ({ r, s: candidateScore(r, cfg, ctx) }));
      const best = Math.min(...scored.map(x => x.s));
      let top = scored.filter(x => x.s <= best + 5).map(x => x.r);
      if (!gastro) {
        const remCount = order.length - pos;
        const target = (B - spent) / remCount / mult;
        const bal = top.filter(r => r.costPerPerson * P <= target * 1.3);
        if (bal.length) top = bal;
      }
      pick = top[Math.floor(rng() * top.length)];
    }
    if (pick.difficulty > ctx.target) ctx.challengeUsed = true;
    spent += pick.costPerPerson * P * mult;
    unused.splice(unused.indexOf(pick), 1);
    chosen[k] = pick;
  });
  slots.forEach((s, k) => { if (s.leftoverOf !== undefined) chosen[k] = chosen[s.leftoverOf]; });
  const filled = chosen.filter(Boolean).length;
  return {
    slots: slots.map((s, k) => ({ ...s, rid: chosen[k] ? chosen[k].id : null })),
    createdAt: Date.now(),
    stats: { poolSize: pool.length, slotCount: slots.length, filled, missing: slots.length - filled, overBudget: !gastro && overBudget }
  };
}

function planCost(plan, P) {
  return plan.slots.reduce((s, sl) => s + (sl.rid ? recipeById(sl.rid).costPerPerson * P : 0), 0);
}

/* Recettes possibles pour un créneau (remplacement ou choix manuel) */
function slotAlternatives(plan, idx, cfg, { ignoreBudget = false } = {}) {
  const sl = plan.slots[idx], P = cfg.people, B = cfg.budget;
  const mult = sl.feeds !== undefined ? 2 : 1;
  const used = new Set(plan.slots.filter((s, k) => k !== idx && k !== sl.feeds).map(s => s.rid).filter(Boolean));
  const cur = sl.rid ? recipeById(sl.rid) : null;
  const base = planCost(plan, P) - (cur ? cur.costPerPerson * P * mult : 0);
  const alts = poolFor(cfg).filter(r => !used.has(r.id) && (!cur || r.id !== cur.id) && (mult === 1 || r.leftover));
  const fits = gastroMode(cfg) || ignoreBudget ? alts : alts.filter(r => base + r.costPerPerson * P * mult <= B + 1e-9);
  return { alts, fits };
}
function pickReplacement(plan, idx, cfg, opts = {}) {
  const rng = opts.rng || Math.random;
  const { alts, fits } = slotAlternatives(plan, idx, cfg);
  if (!fits.length) return { id: null, reason: alts.length ? "budget" : "pool" };
  const ctx = { history: opts.history || {}, favorites: opts.favorites || new Set(), target: targetDifficulty(cfg, opts.history), challengeUsed: true };
  const scored = fits.map(r => ({ r, s: candidateScore(r, cfg, ctx) }));
  const best = Math.min(...scored.map(x => x.s));
  const top = scored.filter(x => x.s <= best + 5).map(x => x.r);
  return { id: top[Math.floor(rng() * top.length)].id, reason: null };
}
function assignSlot(plan, idx, rid) {
  plan.slots[idx].rid = rid;
  const f = plan.slots[idx].feeds;
  if (f !== undefined) plan.slots[f].rid = rid;
}

/* Aide quand le filtrage est trop strict */
function relaxHints(cfg) {
  const current = poolFor(cfg).length;
  const hints = [];
  cfg.diets.forEach(d => {
    hints.push({ label: "retirer « " + DIET_LABEL[d] + " »", count: poolFor({ ...cfg, diets: cfg.diets.filter(x => x !== d) }).length });
  });
  EQUIP.filter(e => !cfg.equip.includes(e.id)).forEach(e => {
    hints.push({ label: "ajouter « " + e.label + " »", count: poolFor({ ...cfg, equip: cfg.equip.concat(e.id) }).length });
  });
  if ((cfg.exclude || []).length) hints.push({ label: "vider les ingrédients exclus", count: poolFor({ ...cfg, exclude: [] }).length });
  return hints.filter(h => h.count > current).sort((a, b) => b.count - a.count).slice(0, 3);
}

/* ---------- quantités ---------- */
const FR = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 1 });
const FRC = new Intl.NumberFormat("fr-FR", { maximumFractionDigits: 2 });
function eur(n) {
  const whole = Math.abs(n - Math.round(n)) < 0.005;
  return new Intl.NumberFormat("fr-FR", { style: "currency", currency: "EUR", minimumFractionDigits: whole ? 0 : 2, maximumFractionDigits: whole ? 0 : 2 }).format(n);
}
function fraction(q) {
  const r = Math.round(q * 4) / 4;
  const whole = Math.floor(r), f = r - whole;
  const sym = { 0.25: "¼", 0.5: "½", 0.75: "¾" }[f] || "";
  if (!whole && !sym) return "¼";
  return (whole ? String(whole) : "") + (whole && sym ? " " : "") + sym;
}
const UNIT_LABEL = { càc: "c. à café", càs: "c. à soupe", gousse: "gousse", tranche: "tranche", feuille: "feuille", pincée: "pincée" };
const PLURAL_UNITS = new Set(["gousse", "tranche", "feuille", "pincée"]);
const PREP_STOP = new Set(["de", "du", "des", "à", "au", "aux", "en", "et", "sans", "avec"]);
function plural(name, q) {
  if (q <= 1) return name;
  let stop = false;
  return name.split(" ").map(w => {
    if (stop) return w;
    if (PREP_STOP.has(w.toLowerCase()) || /^d['’]/i.test(w) || w.startsWith("(")) { stop = true; return w; }
    return /[sxz]$/i.test(w) ? w : w + "s";
  }).join(" ");
}
function fmtRecipeQty(q, unit) {
  if (unit === "g" || unit === "ml") {
    const step = q >= 50 ? 5 : 1;
    const v = Math.max(step, Math.round(q / step) * step);
    if (v >= 1000) return FRC.format(v / 1000) + (unit === "g" ? " kg" : " L");
    return v + " " + unit;
  }
  const f = fraction(q), n = Math.round(q * 4) / 4;
  if (unit === "pièce") return f;
  const lab = UNIT_LABEL[unit] || unit;
  return f + " " + (PLURAL_UNITS.has(unit) && n > 1 ? lab + "s" : lab);
}
function recipeIngredientLine(ing, P) {
  const q = ing.baseQty * P, n = Math.round(q * 4) / 4;
  return { qty: fmtRecipeQty(q, ing.unit), name: ing.unit === "pièce" ? plural(ing.item, n) : ing.item };
}

/* ---------- liste de courses ---------- */
const AISLES = ["Fruits & Légumes", "Boucherie / Poissonnerie", "Produits frais", "Épicerie", "Placard"];
function aisleOf(name) {
  const n = name.toLowerCase();
  if (PANTRY_RE.test(name)) return "Placard";
  if (/saint-jacques/.test(n)) return "Boucherie / Poissonnerie";
  if (/surgel|pâte brisée|pâte à pizza|pâte feuilletée|tofu|houmous/.test(n)) return "Produits frais";
  if (/boîte|coco|sauce|\briz\b|pâtes|spaghetti|linguine|penne|orecchiette|ditalini|macaroni|orzo|tagliatelle|coquillette|nouille|semoule|boulgour|quinoa|farine|chapelure|panko|flocons|lentille|pois chiche|olive|tahini|amande|noisette|\bnoix\b|pistache|pignons de pin|cacahuète|graines|sésame|\bpain\b|tortilla|pita|gnocchi|fécule|lasagne|polenta|séché|secs|miso|concass|\bvin\b|cornichon|anchois/.test(n)) return "Épicerie";
  if (/poulet|volaille|dinde|bœuf|boeuf|veau|agneau|canard|magret|entrecôte|joue|saumon|cabillaud|colin|dorade|truite|\bbar\b|lotte|rouget|thon|crevette|gambas|lardon|jambon|pancetta|saucisse|merguez|pilon|steak|carré/.test(n)) return "Boucherie / Poissonnerie";
  if (/œuf|oeuf|\blait\b|fromage|crème|yaourt|beurre|feta|mozzarella|parmesan|pecorino|ricotta|cheddar|emmental|comté|gruyère|chèvre|mascarpone/.test(n)) return "Produits frais";
  return "Fruits & Légumes";
}
function fmtShopQty(q, unit) {
  if (unit === "g" || unit === "ml") {
    const step = q >= 100 ? 10 : 5;
    const v = Math.max(step, Math.ceil(q / step) * step);
    if (v >= 1000) return FRC.format(v / 1000) + (unit === "g" ? " kg" : " L");
    return v + " " + unit;
  }
  const n = Math.ceil(q - 1e-9);
  if (unit === "pièce") return String(n);
  const lab = UNIT_LABEL[unit] || unit;
  return n + " " + (PLURAL_UNITS.has(unit) && n > 1 ? lab + "s" : lab);
}
function packHint(item, unit, q) {
  const p = PACKS[item];
  if (!p) return "";
  const n = Math.ceil(q / p[0] - 1e-9);
  return n + " × " + p[1];
}
function buildShopping(plan, P) {
  const acc = new Map();
  plan.slots.forEach(sl => {
    if (!sl.rid) return;
    recipeById(sl.rid).ingredients.forEach(ing => {
      const pantry = PANTRY_RE.test(ing.item);
      const key = pantry ? "placard|" + ing.item : ing.item + "|" + ing.unit;
      const cur = acc.get(key) || { item: ing.item, unit: ing.unit, qty: 0, pantry };
      if (!pantry) cur.qty += ing.baseQty * P;
      acc.set(key, cur);
    });
  });
  const groups = AISLES.map(a => ({ aisle: a, items: [] }));
  acc.forEach((v, key) => {
    const count = v.unit === "pièce" ? Math.ceil(v.qty - 1e-9) : v.qty;
    const g = groups.find(x => x.aisle === (v.pantry ? "Placard" : aisleOf(v.item)));
    g.items.push({
      key, item: v.item, pantry: v.pantry,
      name: !v.pantry && v.unit === "pièce" ? plural(v.item, count) : v.item,
      qty: v.pantry ? "" : fmtShopQty(v.qty, v.unit),
      pack: v.pantry ? "" : packHint(v.item, v.unit, v.qty)
    });
  });
  groups.forEach(g => g.items.sort((a, b) => a.name.localeCompare(b.name, "fr")));
  return groups.filter(g => g.items.length);
}
function shoppingText(groups, checked, pantryOwned, header) {
  const lines = [header, ""];
  groups.forEach(g => {
    const items = g.items.filter(it => !(it.pantry && pantryOwned.has(it.item)));
    if (!items.length) return;
    lines.push(g.aisle === "Placard" ? "Placard (à vérifier)" : g.aisle);
    items.forEach(it => lines.push("[" + (checked.has(it.key) ? "x" : " ") + "] " + (it.qty ? it.qty + " " : "") + it.name + (it.pack ? " (" + it.pack + ")" : "")));
    lines.push("");
  });
  return lines.join("\n").trim();
}

/* ---------- budget ---------- */
function budgetLevel(c) {
  if (c < 3) return { id: "eco", label: "Éco", text: "Moins de 3 € par repas et par personne : légumineuses, œufs, pâtes et riz au menu." };
  if (c <= 6) return { id: "equi", label: "Équilibré", text: "Entre 3 € et 6 € : viande, poisson et légumes frais en rotation." };
  return { id: "conf", label: "Confort", text: "Plus de 6 € : de la marge pour les pièces de viande et de poisson." };
}

/* ---------- minuteurs détectés dans le texte d'une étape ---------- */
function detectTimers(text) {
  const out = [], re = /(\d+)(?:\s*(?:à|-)\s*(\d+))?\s*(minutes?|min\b|heures?|h\b|secondes?)/gi;
  let m;
  while ((m = re.exec(text))) {
    const a = +m[1], b = m[2] ? +m[2] : null, u = m[3].toLowerCase();
    const mult = u.startsWith("h") ? 3600 : u.startsWith("s") ? 1 : 60;
    if (a * mult < 20 || a * mult > 6 * 3600) continue;
    out.push({ seconds: a * mult, label: (b ? `${a} à ${b} ` : `${a} `) + (mult === 3600 ? "h" : mult === 1 ? "s" : "min") });
  }
  return out.filter((t, k) => out.findIndex(x => x.seconds === t.seconds) === k).slice(0, 3);
}

/* ---------- icône de recette ---------- */
const MEAT = true;
const ICON_RULES = [
  [/burger/i, "🍔"], [/hot-dog/i, "🌭"], [/pizza|calzone/i, "🍕"], [/socca/i, "🫓"], [/tacos?\b|quesadilla|nachos/i, "🌮"],
  [/wrap|kebab|souvlaki|falafel|pita/i, "🥙"], [/croque|tartine|panini/i, "🥪"], [/riz frit|riz cantonais/i, "🍚"],
  [/fish and chips/i, "🐟", MEAT], [/ravioles|gnocchi/i, "🥟"], [/saint-jacques/i, "🐚", MEAT], [/gambas|crevette|bouillabaisse/i, "🦐", MEAT],
  [/magret|canard/i, "🦆", MEAT], [/saucisse|merguez/i, "🌭", MEAT], [/moussaka|aubergine/i, "🍆"],
  [/paella/i, "🥘"], [/salade|fattouche|niçoise|buddha|bowl/i, "🥗"],
  [/velouté|soupe|bouillon|tom kha/i, "🥣"], [/ramen|nouilles|pad thaï/i, "🍜"],
  [/spaghetti|linguine|penne|pâtes|pasta|tagliatelle|carbonara|cacio|orzo|coquillettes|lasagne|mac and cheese|orecchiette/i, "🍝"],
  [/saumon|cabillaud|colin|thon|\bbar\b|dorade|truite|sardine/i, "🐟", MEAT], [/poulet|dinde|volaille|pilon|nuggets|chicken/i, "🍗", MEAT],
  [/bœuf|steak|entrecôte|joue|tartare|kefta|agneau|hachis|blanquette|bulgogi/i, "🥩", MEAT],
  [/(^|[\s'’])(œufs?|oeufs?)(?=[\s,]|$)|omelette|shakshuka|frittata|tortilla espagnole|brouillé/i, "🍳"],
  [/risotto|riz|mujaddara/i, "🍚"], [/curry|dal|masala|chili|tajine|ratatouille|bolognaise/i, "🍲"],
  [/chou-fleur|brocoli/i, "🥦"], [/patate douce|pommes? de terre|rösti|parmentier/i, "🥔"], [/tofu/i, "🥢"], [/tarte/i, "🥧"],
  [/lentilles|pois chiches|haricots/i, "🫘"]
];
function iconFor(r) {
  const veg = r.diet.includes("vegetarien");
  const rules = ICON_RULES.filter(x => !(veg && x[2]));
  const head = r.name.split(/[,:]/)[0];
  const hit = rules.find(([re]) => re.test(head)) || rules.find(([re]) => re.test(r.name));
  return hit ? hit[1] : "🍽️";
}
