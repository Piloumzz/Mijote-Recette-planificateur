/* ============================================================
   MIJOTE : INTERFACE
   Onglets Planning / Recettes / Progression, sauvegarde locale,
   mode cuisine, rappels, liste de courses avec placard.
   ============================================================ */
const $ = (s, r = document) => r.querySelector(s);
const $$ = (s, r = document) => Array.from(r.querySelectorAll(s));
const esc = s => String(s).replace(/[&<>"']/g, c => ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c]));
const plur = (n, one, many) => (n > 1 ? many : one);

/* ---------- animation ---------- */
const RM = window.matchMedia("(prefers-reduced-motion: reduce)");
const DESK = window.matchMedia("(min-width: 720px)");
const motionOff = () => RM.matches;
const E_OUT = "cubic-bezier(.16,1,.3,1)", E_SPRING = "cubic-bezier(.34,1.45,.64,1)", E_IN = "cubic-bezier(.5,0,.75,0)";
const NOOP = { finished: Promise.resolve(), cancel() {} };
function anim(el, frames, opts) {
  if (!el || typeof el.animate !== "function" || motionOff()) return NOOP;
  const a = el.animate(frames, opts);
  a.finished.catch(() => {});
  return a;
}
function enter(els, { y = 16, x = 0, delay = 0, step = 45, dur = 640, scale = 1 } = {}) {
  els.filter(Boolean).forEach((el, i) => anim(el, [{ opacity: 0, transform: `translate(${x}px, ${y}px) scale(${scale})` }, { opacity: 1, transform: "none" }], { duration: dur, delay: delay + i * step, easing: E_OUT, fill: "backwards" }));
}
function countTo(from, to, set, dur = 800) {
  if (motionOff() || Math.abs(from - to) < 1e-6) { set(to); return () => {}; }
  const t0 = performance.now();
  let raf;
  const tick = now => { const p = Math.min(1, (now - t0) / dur), e = 1 - Math.pow(1 - p, 4); set(from + (to - from) * e); if (p < 1) raf = requestAnimationFrame(tick); };
  raf = requestAnimationFrame(tick);
  return () => cancelAnimationFrame(raf);
}
function tween(el, to, fmt, dur) {
  if (!el) return;
  const from = el.dataset.v !== undefined ? parseFloat(el.dataset.v) : to;
  el.dataset.v = to;
  if (el._stop) el._stop();
  el._stop = countTo(from, to, v => { el.textContent = fmt(v); }, dur);
}
const fmtEur = v => eur(Math.round(v * 100) / 100);
const fmtInt = v => String(Math.round(v));
function movePill(pill, target, instant) {
  if (!pill || !target) return;
  if (instant) pill.style.transition = "none";
  pill.style.width = target.offsetWidth + "px";
  pill.style.height = target.offsetHeight + "px";
  pill.style.transform = `translate(${target.offsetLeft}px, ${target.offsetTop}px)`;
  if (instant) { void pill.offsetWidth; pill.style.transition = ""; }
}
function centerInTrack(track, el) {
  if (!track || !el || track.scrollWidth <= track.clientWidth) return;
  track.scrollTo({ left: el.offsetLeft - track.clientWidth / 2 + el.offsetWidth / 2, behavior: motionOff() ? "auto" : "smooth" });
}
function setLabel(btn, text) {
  const l = btn && btn.querySelector(".lbl");
  if (!l || l.textContent === text) return;
  if (!l.textContent || motionOff()) { l.textContent = text; return; }
  const out = anim(l, [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-9px)" }], { duration: 140, easing: E_IN, fill: "forwards" });
  out.finished.then(() => { l.textContent = text; out.cancel(); anim(l, [{ opacity: 0, transform: "translateY(9px)" }, { opacity: 1, transform: "none" }], { duration: 420, easing: E_OUT }); }, () => {});
}

/* ---------- icônes ---------- */
const svg = (p, s = 18, w = 1.9) => `<svg viewBox="0 0 24 24" width="${s}" height="${s}" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${p}</svg>`;
const TICK = '<svg viewBox="0 0 16 16" width="14" height="14" aria-hidden="true"><path d="M3 8.5l3.2 3L13 4.5" fill="none" stroke="currentColor" stroke-width="2.3" stroke-linecap="round" stroke-linejoin="round"/></svg>';
const CLOSE = svg('<path d="M6 6l12 12M18 6 6 18"/>', 18, 2);
const ICON = {
  right: svg('<path d="M5 12h14M13 6l6 6-6 6"/>'), left: svg('<path d="M19 12H5M11 6l-6 6 6 6"/>'),
  cart: svg('<path d="M3 4h2l2.4 11.2a2 2 0 0 0 2 1.6h7.7a2 2 0 0 0 2-1.6L21 8H6.2"/><circle cx="10" cy="20" r="1.2"/><circle cx="17" cy="20" r="1.2"/>'),
  refresh: svg('<path d="M20 11a8 8 0 0 0-14.3-4.9L4 8"/><path d="M4 4v4h4"/><path d="M4 13a8 8 0 0 0 14.3 4.9L20 16"/><path d="M20 20v-4h-4"/>', 16),
  sliders: svg('<path d="M4 6h9M17 6h3M4 12h3M11 12h9M4 18h11M19 18h1"/><circle cx="15" cy="6" r="2"/><circle cx="9" cy="12" r="2"/><circle cx="17" cy="18" r="2"/>'),
  clock: svg('<circle cx="12" cy="12" r="8.5"/><path d="M12 7.5V12l3 2"/>', 13, 2.1),
  flame: svg('<path d="M12 3c.5 3.5 5 5.5 5 10a5 5 0 0 1-10 0c0-2.4 1.3-3.8 2.5-5 .3 1.6 1 2.5 2 3 0-3 0-5.5.5-8Z"/>', 13, 2.1),
  sparkle: svg('<path d="M12 3l1.8 5.2L19 10l-5.2 1.8L12 17l-1.8-5.2L5 10l5.2-1.8Z"/><path d="M19 17l.7 1.8 1.8.7-1.8.7-.7 1.8-.7-1.8-1.8-.7 1.8-.7Z"/>'),
  copy: svg('<rect x="8" y="8" width="12" height="12" rx="2.5"/><path d="M16 8V6a2 2 0 0 0-2-2H6a2 2 0 0 0-2 2v8a2 2 0 0 0 2 2h2"/>'),
  share: svg('<circle cx="18" cy="5" r="2.5"/><circle cx="6" cy="12" r="2.5"/><circle cx="18" cy="19" r="2.5"/><path d="m8.2 10.8 7.6-4.4M8.2 13.2l7.6 4.4"/>'),
  done: svg('<circle cx="12" cy="12" r="9"/><path d="m8 12.5 2.6 2.5L16 9.5"/>', 20),
  alert: svg('<circle cx="12" cy="12" r="9"/><path d="M12 7.5v5.5M12 16.5h.01"/>', 20),
  plate: svg('<circle cx="12" cy="12" r="8.5"/><circle cx="12" cy="12" r="4.5"/>', 30, 1.6),
  heart: svg('<path d="M12 20s-7-4.4-9-8.6C1.6 8.3 3.5 5 7 5c2 0 3.4 1.2 5 3 1.6-1.8 3-3 5-3 3.5 0 5.4 3.3 4 6.4-2 4.2-9 8.6-9 8.6Z"/>', 18),
  leftover: svg('<rect x="4" y="8" width="16" height="11" rx="2.5"/><path d="M3 8h18M9 4h6"/><path d="M9 13h6"/>', 16),
  chef: svg('<path d="M7 17v-4.2A4 4 0 0 1 8.5 5 4.5 4.5 0 0 1 12 3.5 4.5 4.5 0 0 1 15.5 5 4 4 0 0 1 17 12.8V17Z"/><path d="M7 20h10"/>', 18),
  play: svg('<path d="M8 5v14l11-7Z"/>', 16), pause: svg('<path d="M8 5v14M16 5v14"/>', 16), stop: svg('<rect x="6" y="6" width="12" height="12" rx="2"/>', 16),
  timer: svg('<circle cx="12" cy="13" r="7.5"/><path d="M12 9.5V13l2.5 1.5M10 2.5h4"/>', 16),
  search: svg('<circle cx="11" cy="11" r="6.5"/><path d="m20 20-4.2-4.2"/>', 18),
  calendar: svg('<rect x="3.5" y="5" width="17" height="15" rx="2.5"/><path d="M3.5 10h17M8 3v4M16 3v4"/>', 18),
  book: svg('<path d="M4 5a2 2 0 0 1 2-2h13v16H6a2 2 0 0 0-2 2Z"/><path d="M4 19V5M8 7h7"/>', 18),
  trophy: svg('<path d="M8 4h8v5a4 4 0 0 1-8 0Z"/><path d="M8 6H5a3 3 0 0 0 3 4M16 6h3a3 3 0 0 1-3 4M12 13v4M8.5 20h7M10 17h4"/>', 18),
  download: svg('<path d="M12 4v11M7 10l5 5 5-5M5 20h14"/>', 16),
  bell: svg('<path d="M6 16V11a6 6 0 0 1 12 0v5l1.5 2h-15Z"/><path d="M10 20.5a2 2 0 0 0 4 0"/>', 18),
  star: '<svg viewBox="0 0 24 24" width="26" height="26" aria-hidden="true"><path d="M12 3.5l2.6 5.3 5.9.9-4.3 4.1 1 5.8L12 16.9l-5.2 2.7 1-5.8L3.5 9.7l5.9-.9Z" fill="currentColor"/></svg>'
};
const EQUIP_ICON = {
  base: svg('<circle cx="10" cy="13" r="6"/><path d="M16 13h6"/>', 22),
  four: svg('<rect x="3" y="4" width="18" height="16" rx="2.5"/><path d="M3 9h18M7 6.5h.01M10 6.5h.01"/><rect x="7" y="12" width="10" height="5" rx="1"/>', 22),
  airfryer: svg('<path d="M7 3h10l2 6v9a3 3 0 0 1-3 3H8a3 3 0 0 1-3-3V9Z"/><path d="M5 10h14"/><circle cx="12" cy="15.5" r="2.5"/>', 22),
  "micro-ondes": svg('<rect x="2.5" y="5" width="19" height="14" rx="2.5"/><rect x="5.5" y="8" width="10" height="8" rx="1"/><path d="M18.5 9v.01M18.5 12v.01M18.5 15v.01"/>', 22),
  mixeur: svg('<path d="M7 3h10l-1.5 11h-7Z"/><path d="M8.5 14h7l1 7h-9Z"/><path d="M12 17.5v.01"/>', 22),
  vapeur: svg('<path d="M4 13h16v2a5 5 0 0 1-5 5H9a5 5 0 0 1-5-5Z"/><path d="M3 13h18"/><path d="M9 4c-1 1.2 1 2.3 0 3.5M12 4c-1 1.2 1 2.3 0 3.5M15 4c-1 1.2 1 2.3 0 3.5"/>', 22)
};
const STYLE_COLOR = { proteine: "#E5533D", fastfood: "#E89B12", sain: "#2F9A63", vegan: "#6FAE2E", mediterraneen: "#2C7BC0", express: "#8A5CF0", economique: "#109C97", gastronomique: "#9B2C4F" };
const AISLE_COLOR = { "Fruits & Légumes": "#2F9A63", "Boucherie / Poissonnerie": "#E5533D", "Épicerie": "#E89B12", "Produits frais": "#2C7BC0", "Placard": "#8A8F98" };
const DIFF_LABEL = ["", "Facile", "Intermédiaire", "Avancé"];
const diffPill = d => `<span class="pill diff" data-d="${d}" title="Difficulté"><span class="dots" aria-hidden="true"><i></i><i></i><i></i></span>${DIFF_LABEL[d]}</span>`;
const fmtDur = m => (m >= 90 ? `${Math.floor(m / 60)} h ${String(m % 60).padStart(2, "0")}` : `${m} min`);
function splitStep(s) { const k = s.indexOf("|"); return k < 0 ? [null, s] : [s.slice(0, k), s.slice(k + 1)]; }
const MONTHS = ["janvier", "février", "mars", "avril", "mai", "juin", "juillet", "août", "septembre", "octobre", "novembre", "décembre"];

/* ============================================================
   ÉTAT ET SAUVEGARDE LOCALE
   ============================================================ */
const STORE_KEY = "mijote-v1";
const defaultCfg = () => ({ days: { 0: "dinner", 1: "dinner", 2: "dinner", 3: "dinner", 4: "dinner" }, people: 2, budget: 80, styles: [], diets: [], equip: ["base", "four"], exclude: [], leftovers: false, seasonal: true, level: "adaptive" });
const state = {
  tab: "plan", view: "wizard", step: 0, cfg: defaultCfg(), plan: null,
  checked: new Set(), pantry: new Set(), favorites: new Set(), history: {},
  catalog: { q: "", styles: [], diff: [], time: "all", fav: false, compatible: false, season: false },
  picker: null, busy: false, shop: null
};
function save() {
  try {
    localStorage.setItem(STORE_KEY, JSON.stringify({
      v: 1, tab: state.tab, view: state.view, cfg: state.cfg, plan: state.plan,
      checked: [...state.checked], pantry: [...state.pantry], favorites: [...state.favorites], history: state.history,
      catalog: state.catalog
    }));
  } catch (e) { /* stockage indisponible (navigation privée) */ }
}
let saveTimer;
const persist = () => { clearTimeout(saveTimer); saveTimer = setTimeout(save, 250); };
function load() {
  let d = null;
  try { d = JSON.parse(localStorage.getItem(STORE_KEY) || "null"); } catch (e) { d = null; }
  if (!d) return;
  state.cfg = { ...defaultCfg(), ...(d.cfg || {}) };
  state.checked = new Set(d.checked || []);
  state.pantry = new Set(d.pantry || []);
  state.favorites = new Set((d.favorites || []).filter(id => recipeById(id)));
  state.history = Object.fromEntries(Object.entries(d.history || {}).filter(([id]) => recipeById(id)));
  state.catalog = { ...state.catalog, ...(d.catalog || {}) };
  if (d.plan && Array.isArray(d.plan.slots) && d.plan.slots.every(s => !s.rid || recipeById(s.rid))) {
    state.plan = d.plan;
    state.view = d.view === "plan" ? "plan" : "wizard";
  }
  state.tab = ["plan", "catalog", "progress"].includes(d.tab) ? d.tab : "plan";
}

/* ---------- toast ---------- */
let toastTimer;
function toast(msg, ms = 2800) {
  const t = $("#toast");
  t.textContent = msg;
  t.classList.add("show");
  clearTimeout(toastTimer);
  toastTimer = setTimeout(() => t.classList.remove("show"), ms);
}

/* ---------- thème ---------- */
const THEME_KEY = "mijote-theme";
function toggleTheme(e) {
  const next = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  try { localStorage.setItem(THEME_KEY, next); } catch (err) { /* ignore */ }
  const apply = () => { document.documentElement.dataset.theme = next; $('meta[name="theme-color"]').content = next === "dark" ? "#0E0F11" : "#F4F1EA"; };
  if (document.startViewTransition && !motionOff()) {
    const r = e.currentTarget.getBoundingClientRect();
    document.documentElement.style.setProperty("--vx", (r.left + r.width / 2) + "px");
    document.documentElement.style.setProperty("--vy", (r.top + r.height / 2) + "px");
    document.startViewTransition(apply);
  } else apply();
}
window.matchMedia("(prefers-color-scheme: dark)").addEventListener("change", e => {
  let stored = null;
  try { stored = localStorage.getItem(THEME_KEY); } catch (err) { /* ignore */ }
  if (!stored) document.documentElement.dataset.theme = e.matches ? "dark" : "light";
});

/* ============================================================
   NAVIGATION PRINCIPALE
   ============================================================ */
function updateTabs(instant) {
  $$("#tabs [data-tab]").forEach(b => {
    const on = b.dataset.tab === state.tab;
    b.classList.toggle("is-active", on);
    if (on) b.setAttribute("aria-current", "page"); else b.removeAttribute("aria-current");
  });
  requestAnimationFrame(() => movePill($("#tabs .tabs-pill"), $("#tabs .is-active"), instant));
}
function switchTab(tab) {
  if (tab === state.tab && !state.picker) return;
  if (tab !== "catalog") state.picker = null;
  state.tab = tab;
  closeObservers();
  updateTabs();
  const v = $("#view");
  const go = () => { render({ intro: true }); window.scrollTo({ top: 0 }); persist(); };
  if (motionOff()) return go();
  anim(v, [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(10px)" }], { duration: 180, easing: E_IN, fill: "forwards" }).finished.then(() => { go(); anim(v, [{ opacity: 0 }, { opacity: 1 }], { duration: 1 }); }, go);
}
function render(opts = {}) {
  $("#view").getAnimations && $("#view").getAnimations().forEach(a => a.cancel());
  document.body.classList.toggle("in-wizard", state.tab === "plan" && state.view !== "plan");
  if (state.tab === "catalog") return renderCatalog(opts);
  if (state.tab === "progress") return renderProgress(opts);
  if (state.plan && state.view === "plan") return renderPlan(opts);
  showWizard();
}

/* ============================================================
   FORMULAIRE
   ============================================================ */
const STEP_TITLES = ["Jours et repas", "Personnes", "Styles", "Régimes", "Équipements", "Budget et niveau"];
const STEP_HEAD = [
  ["Quels jours planifier ?", "Cochez les jours, puis choisissez le ou les repas. Les restes du dîner peuvent devenir le déjeuner du lendemain."],
  ["Pour combien de personnes ?", "Les quantités de chaque recette s'adaptent automatiquement."],
  ["Quels styles de cuisine ?", "Choisissez-en plusieurs. La gamme Gastronomique n'apparaît que si vous la cochez, et rend le budget indicatif."],
  ["Des restrictions alimentaires ?", "Ces filtres sont stricts : une recette qui ne les respecte pas n'est jamais proposée. Vous pouvez aussi exclure des ingrédients."],
  ["De quel matériel disposez-vous ?", "Seules les recettes réalisables avec votre équipement sont proposées."],
  ["Budget et niveau", "Le coût est calculé à partir du prix de chaque ingrédient. Le niveau adaptatif propose un défi par semaine et monte avec vous."]
];
function wizardShell() {
  $("#view").innerHTML = `
    <div class="wizard" id="wizard">
      <aside class="wz-side">
        <p class="eyebrow">Planificateur de repas</p>
        <p class="wz-title">Planifiez votre <em>semaine</em></p>
        <p class="wz-lead">Six questions, une semaine de repas et la liste de courses qui va avec.</p>
        <nav aria-label="Étapes du formulaire"><div class="stepper" id="stepper"><span class="stepper-pill" aria-hidden="true"></span>
          <ol>${STEP_TITLES.map((t, k) => `<li><button type="button" class="step" data-goto="${k}"><span class="step-n">${k + 1}</span><span class="step-txt"><span class="step-t">${t}</span><span class="step-v"></span></span></button></li>`).join("")}</ol>
        </div></nav>
        ${state.plan ? `<button type="button" class="btn btn-ghost btn-sm back-plan" data-action="back-plan">${ICON.left}<span>Revenir au planning</span></button>` : ""}
      </aside>
      <section class="wz-main card" aria-labelledby="step-title">
        <div class="wz-head"><span class="eyebrow" id="step-count"></span>
          <div class="progress" role="progressbar" aria-label="Progression du formulaire" aria-valuemin="1" aria-valuemax="6"><span id="progress-fill"></span></div></div>
        <div class="stage" id="stage"></div>
        <div class="wz-nav">
          <button type="button" id="back" class="btn btn-ghost">${ICON.left}<span>Retour</span></button>
          <button type="button" id="next" class="btn btn-primary"><span class="lbl">Continuer</span><span class="arrow">${ICON.right}</span></button>
        </div>
      </section>
    </div>`;
}
function stepValues() {
  const c = state.cfg, nD = Object.keys(c.days).filter(k => c.days[k]).length;
  const slots = slotList(c.days, c.leftovers), cooked = cookedSlots(slots).length;
  const lvl = c.level === "adaptive" ? `adaptatif (${levelFor(state.history).name.toLowerCase()})` : c.level === "all" ? "tous niveaux" : DIFF_LABEL[+c.level].toLowerCase();
  return [
    nD ? `${nD} ${plur(nD, "jour", "jours")} · ${slots.length} repas${c.leftovers && cooked < slots.length ? `, ${cooked} à cuisiner` : ""}` : "À choisir",
    `${c.people} ${plur(c.people, "personne", "personnes")}`,
    c.styles.length ? (c.styles.length === 1 ? STYLE_LABEL[c.styles[0]] : `${c.styles.length} styles`) : "Tous les styles",
    (c.diets.length ? (c.diets.length === 1 ? DIET_LABEL[c.diets[0]] : `${c.diets.length} restrictions`) : "Aucune restriction") + (c.exclude.length ? ` · ${c.exclude.length} exclu${c.exclude.length > 1 ? "s" : ""}` : ""),
    `${c.equip.length} ${plur(c.equip.length, "appareil", "appareils")}`,
    `${eur(c.budget)}${gastroMode(c) ? " indicatif" : ""} · ${lvl}`
  ];
}
function updateStepValues() {
  const v = stepValues();
  $$("#stepper .step-v").forEach((el, k) => { if (el.textContent !== v[k]) el.textContent = v[k]; });
}
function placeStepPill(instant) {
  const cur = $("#stepper .step.is-current"), pill = $("#stepper .stepper-pill");
  if (!cur || !pill) return;
  movePill(pill, cur, instant || !pill.dataset.ready);
  pill.dataset.ready = "1";
  centerInTrack($("#stepper"), cur);
}
function stripPane(p) {
  p.querySelectorAll("*").forEach(n => Array.from(n.attributes).forEach(a => {
    if (a.name === "id" || a.name === "name" || a.name === "for" || (a.name.startsWith("data-") && a.name !== "data-m")) n.removeAttribute(a.name);
  }));
  p.inert = true;
  p.setAttribute("aria-hidden", "true");
}
function swapPane(stage, html, dir) {
  Array.from(stage.children).slice(0, -1).forEach(c => c.remove());
  const old = stage.lastElementChild;
  const pane = document.createElement("div");
  pane.className = "pane";
  pane.innerHTML = html;
  if (!old || !dir || motionOff()) { stage.replaceChildren(pane); return pane; }
  const h0 = stage.offsetHeight, box = { top: old.offsetTop, left: old.offsetLeft, width: old.offsetWidth };
  stripPane(old);
  old.style.cssText = `position:absolute;top:${box.top}px;left:${box.left}px;width:${box.width}px`;
  stage.appendChild(pane);
  anim(stage, [{ height: h0 + "px" }, { height: stage.offsetHeight + "px" }], { duration: 560, easing: E_OUT });
  anim(old, [{ opacity: 1, transform: "none", filter: "blur(0)" }, { opacity: 0, transform: `translateX(${-dir * 56}px)`, filter: "blur(5px)" }], { duration: 280, easing: E_IN, fill: "forwards" }).finished.then(() => old.remove(), () => old.remove());
  anim(pane, [{ opacity: 0, transform: `translateX(${dir * 80}px)` }, { opacity: 1, transform: "none" }], { duration: 680, delay: 90, easing: E_OUT, fill: "backwards" });
  return pane;
}
const STEP_FN = () => [stepDays, stepPeople, stepStyles, stepDiets, stepEquip, stepBudget];
const SYNC_FN = () => [syncDays, syncPeople, syncPool, syncDiets, syncPool, syncBudget];
function paneHTML(s) {
  return `<h1 id="step-title" class="pane-title" tabindex="-1">${STEP_HEAD[s][0]}</h1><p class="pane-desc">${STEP_HEAD[s][1]}</p><div class="pane-body">${STEP_FN()[s]()}</div>`;
}
function updateWizard(dir = 0) {
  const s = state.step;
  if (!$("#wizard")) wizardShell();
  $$("#stepper .step").forEach((b, k) => {
    b.classList.toggle("is-current", k === s);
    b.classList.toggle("is-done", k < s);
    if (k === s) b.setAttribute("aria-current", "step"); else b.removeAttribute("aria-current");
    b.querySelector(".step-n").innerHTML = k < s ? TICK : String(k + 1);
  });
  $("#step-count").textContent = `Étape ${s + 1} sur 6`;
  $(".wz-head .progress").setAttribute("aria-valuenow", s + 1);
  $("#progress-fill").style.width = ((s + 1) / 6) * 100 + "%";
  const back = $("#back");
  back.disabled = s === 0;
  back.classList.toggle("is-hidden", s === 0);
  const next = $("#next");
  next.classList.toggle("btn-final", s === 5);
  next.classList.toggle("btn-primary", s !== 5);
  next.querySelector(".arrow").innerHTML = s === 5 ? ICON.sparkle : ICON.right;
  setLabel(next, s === 5 ? "Générer le planning" : "Continuer");
  const pane = swapPane($("#stage"), paneHTML(s), dir);
  SYNC_FN()[s]();
  updateStepValues();
  requestAnimationFrame(() => placeStepPill());
  enter($$(".pane-body > *:not(.days-list):not(.opts), .days-list > li, .opts > *", pane), { y: 14, delay: dir ? 160 : 220, step: 32, dur: 600 });
  updateNav();
  return pane;
}
function optCard(attr, id, title, desc, checked, icon, color) {
  return `<label class="opt"${color ? ` style="--c:${color}"` : ""}><input type="checkbox" class="vh" ${attr}="${id}" ${checked ? "checked" : ""}><span class="opt-body">${icon ? `<span class="opt-ico" aria-hidden="true">${icon}</span>` : ""}<span class="opt-txt"><span class="opt-title">${title}</span><span class="opt-desc">${desc}</span></span><span class="tick" aria-hidden="true">${TICK}</span></span></label>`;
}
function switchRow(id, title, desc, on) {
  return `<label class="switch-row"><span class="sw-txt"><span class="opt-title">${title}</span><span class="opt-desc">${desc}</span></span><input type="checkbox" class="vh" role="switch" id="${id}" ${on ? "checked" : ""}><span class="switch" aria-hidden="true"><i></i></span></label>`;
}

/* ----- étape 1 : jours ----- */
function stepDays() {
  const meals = [["lunch", "Déjeuner"], ["dinner", "Dîner"], ["both", "Les deux"]];
  return `
    <div class="quick" role="group" aria-label="Sélection rapide des jours">
      <button type="button" class="chip" data-quick="all">Tous les jours</button>
      <button type="button" class="chip" data-quick="week">Semaine</button>
      <button type="button" class="chip" data-quick="weekend">Week-end</button>
      <button type="button" class="chip" data-quick="none">Tout décocher</button>
    </div>
    <ul class="days-list">${DAYS.map((d, k) => `
      <li class="dayrow" data-row="${k}">
        <label class="day-chk"><input type="checkbox" class="vh" data-day="${k}"><span class="tick" aria-hidden="true">${TICK}</span><span>${d}</span></label>
        <div class="seg-wrap"><div class="seg-clip"><div class="seg" role="radiogroup" aria-label="Repas du ${d.toLowerCase()}"><span class="seg-thumb" aria-hidden="true"></span>
          ${meals.map(([v, l]) => `<label><input type="radio" class="vh" name="meal-${k}" value="${v}" data-meal="${k}"><span>${l}</span></label>`).join("")}
        </div></div></div>
      </li>`).join("")}
    </ul>
    <div class="bulk" role="group" aria-label="Appliquer un type de repas à tous les jours cochés"><span>Même repas pour tous les jours cochés</span>
      <div class="bulk-btns"><button type="button" class="chip" data-bulk="lunch">Déjeuner</button><button type="button" class="chip" data-bulk="dinner">Dîner</button><button type="button" class="chip" data-bulk="both">Les deux</button></div></div>
    ${switchRow("sw-leftovers", "Restes pour le midi", "Le dîner est cuisiné en double : la moitié devient le déjeuner du lendemain. Moins de cuisine, moins de dépenses.", state.cfg.leftovers)}
    <p id="days-summary" class="summary" aria-live="polite"></p>`;
}
function syncDays() {
  const days = state.cfg.days;
  DAYS.forEach((_, k) => {
    const row = $(`[data-row="${k}"]`);
    if (!row) return;
    const on = !!days[k];
    row.classList.toggle("is-on", on);
    row.dataset.m = on ? days[k] : "";
    $(`[data-day="${k}"]`).checked = on;
    $$(`[data-meal="${k}"]`).forEach(r => { r.checked = on && r.value === days[k]; });
  });
  const keys = Object.keys(days).filter(k => days[k]).map(Number).sort().join(",");
  const presets = { all: "0,1,2,3,4,5,6", week: "0,1,2,3,4", weekend: "5,6", none: "" };
  $$("[data-quick]").forEach(b => b.classList.toggle("is-active", presets[b.dataset.quick] === keys));
  const vals = Object.values(days).filter(Boolean);
  $$("[data-bulk]").forEach(b => b.classList.toggle("is-active", vals.length > 0 && vals.every(v => v === b.dataset.bulk)));
  const slots = slotList(days, state.cfg.leftovers), cooked = cookedSlots(slots).length, left = slots.length - cooked;
  const sum = $("#days-summary");
  sum.classList.toggle("is-empty", !vals.length);
  sum.innerHTML = vals.length
    ? `${ICON.done}<span>${vals.length} ${plur(vals.length, "jour", "jours")}, ${slots.length} repas${left ? `, dont ${left} ${plur(left, "déjeuner", "déjeuners")} de restes : ${cooked} à cuisiner` : ""}</span>`
    : `${ICON.alert}<span>Aucun jour sélectionné : cochez au moins un jour pour continuer.</span>`;
  if (state.cfg.leftovers && vals.length && !left) sum.innerHTML += `<span class="muted small sum-note">Les restes s'appliquent quand un déjeuner suit le dîner de la veille : cochez « Les deux » sur des jours consécutifs.</span>`;
  updateStepValues();
  updateNav();
}

/* ----- étape 2 : personnes ----- */
function stepPeople() {
  return `
    <div class="people">
      <button type="button" class="round" data-people="-1" aria-label="Retirer une personne"><span aria-hidden="true">−</span></button>
      <div><div class="num-window"><label for="people-input" class="sr-only">Nombre de personnes (1 à 8)</label>
        <input id="people-input" class="num-input" type="number" min="1" max="8" step="1" inputmode="numeric" value="${state.cfg.people}"></div>
        <p class="people-label" id="people-label"></p></div>
      <button type="button" class="round" data-people="1" aria-label="Ajouter une personne"><span aria-hidden="true">+</span></button>
    </div>
    <div class="plates" aria-hidden="true">${Array.from({ length: 8 }, (_, k) => `<span class="plate" style="--k:${k}"></span>`).join("")}</div>
    <p id="people-hint" class="hint" aria-live="polite"></p>`;
}
function syncPeople() {
  const P = state.cfg.people, N = cookedSlots(slotList(state.cfg.days, state.cfg.leftovers)).length;
  $("#people-label").textContent = plur(P, "personne", "personnes");
  $('[data-people="-1"]').disabled = P <= 1;
  $('[data-people="1"]').disabled = P >= 8;
  $$(".plate").forEach((d, k) => d.classList.toggle("on", k < P));
  $("#people-hint").innerHTML = `150 g de poulet par personne deviennent <strong>${FR.format(150 * P)} g</strong>. Sur ${N} ${plur(N, "repas cuisiné", "repas cuisinés")}, cela fait <strong>${N * P * (state.cfg.leftovers ? 1 : 1)} portions</strong> à préparer${state.cfg.leftovers ? ", plus les restes" : ""}.${P >= 5 ? " À partir de 5 personnes, les cuissons à la poêle se font en plusieurs fois : les fiches vous le rappelleront." : ""}`;
  updateStepValues();
}
function setPeople(v) {
  const old = state.cfg.people;
  state.cfg.people = Math.min(8, Math.max(1, v));
  const inp = $("#people-input");
  if (inp && document.activeElement !== inp) {
    inp.value = state.cfg.people;
    if (old !== state.cfg.people) { const d = state.cfg.people > old ? 1 : -1; anim(inp, [{ transform: `translateY(${d * 45}%)`, opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 520, easing: E_OUT }); }
  }
  syncPeople();
}

/* ----- étapes 3 à 5 ----- */
function poolInfo() {
  const cfg = state.cfg, N = cookedSlots(slotList(cfg.days, cfg.leftovers)).length, pool = poolFor(cfg), n = pool.length;
  if (n === 0) {
    const h = relaxHints(cfg);
    return { cls: "err", html: `<strong>Aucune recette ne correspond à ces filtres.</strong> ${h.length ? "Essayez de " + h.map(x => `${x.label} (${x.count} recettes)`).join(", ou de ") + "." : "Retirez un filtre pour élargir le choix."}` };
  }
  if (n < N) {
    const h = relaxHints(cfg);
    return { cls: "warn", html: `<strong>${n} ${plur(n, "recette compatible", "recettes compatibles")} pour ${N} repas à cuisiner.</strong> Une recette n'est jamais proposée deux fois : ${N - n} ${plur(N - n, "repas resterait vide", "repas resteraient vides")}.${h.length ? " Pour élargir : " + h.map(x => `${x.label} (${x.count} recettes)`).join(", ") + "." : ""}` };
  }
  if (cfg.styles.length) {
    const s = pool.filter(r => prefersStyle(r, cfg)).length;
    if (s < N) return { cls: "warn", html: `<strong>${n} recettes compatibles, dont ${s} dans les styles choisis.</strong> D'autres styles compléteront le planning.` };
    return { cls: "info", html: `<strong>${n} recettes compatibles</strong>, dont ${s} dans les styles choisis.` };
  }
  return { cls: "info", html: `<strong>${n} recettes compatibles</strong> avec vos filtres et votre matériel.` };
}
function syncPool() {
  const el = $("#pool");
  if (el) {
    const p = poolInfo(), html = `<span>${p.html}</span>`;
    el.className = "pool tone-" + p.cls;
    if (el.innerHTML !== html) { const first = !el.innerHTML; el.innerHTML = html; if (!first) anim(el, [{ transform: "scale(.985)" }, { transform: "none" }], { duration: 450, easing: E_SPRING }); }
  }
  updateStepValues();
  updateNav();
}
const poolBox = '<div id="pool" class="pool tone-info" role="status" aria-live="polite"></div>';
function stepStyles() {
  return `<div class="opts">${STYLES.map(s => optCard("data-style", s.id, s.label, s.desc, state.cfg.styles.includes(s.id), s.id === "gastronomique" ? ICON.sparkle : '<span class="cat-dot"></span>', STYLE_COLOR[s.id])).join("")}</div>${poolBox}`;
}
const EXCLUDE_SUGGEST = ["Coriandre", "Champignons", "Olives", "Câpres", "Aubergine", "Chou-fleur", "Avocat", "Poivron"];
function stepDiets() {
  const none = optCard("data-diet", "none", "Aucune", "Pas de restriction particulière", state.cfg.diets.length === 0);
  return `<div class="opts">${none}${DIETS.map(d => optCard("data-diet", d.id, d.label, d.desc, state.cfg.diets.includes(d.id))).join("")}</div>
    <div class="exclude">
      <label for="ex-input" class="opt-title">Ingrédients à exclure</label>
      <p class="opt-desc">Toute recette qui en contient est écartée. Exemple : coriandre, champignons.</p>
      <form class="ex-form" id="ex-form"><input id="ex-input" class="field" type="text" autocomplete="off" placeholder="Coriandre" maxlength="40"><button type="submit" class="btn btn-ghost btn-sm">Exclure</button></form>
      <div class="ex-chips" id="ex-chips"></div>
      <div class="ex-suggest" id="ex-suggest"></div>
    </div>${poolBox}`;
}
function syncDiets() {
  const chips = $("#ex-chips"), sug = $("#ex-suggest");
  if (chips) chips.innerHTML = state.cfg.exclude.map(x => `<button type="button" class="chip is-active" data-unexclude="${esc(x)}" aria-label="Ne plus exclure ${esc(x)}">${esc(x)} ${CLOSE}</button>`).join("");
  if (sug) {
    const left = EXCLUDE_SUGGEST.filter(s => !state.cfg.exclude.some(x => norm(x) === norm(s)));
    sug.innerHTML = left.length ? `<span class="muted small">Suggestions :</span> ` + left.map(s => `<button type="button" class="chip chip-sm" data-exclude="${s}">+ ${s}</button>`).join("") : "";
  }
  syncPool();
}
function stepEquip() {
  return `<div class="opts">${EQUIP.map(e => optCard("data-equip", e.id, e.label, e.desc, state.cfg.equip.includes(e.id), EQUIP_ICON[e.id])).join("")}</div>${poolBox}`;
}

/* ----- étape 6 : budget et niveau ----- */
function stepBudget() {
  const b = state.cfg.budget, lvl = levelFor(state.history);
  const levels = [["adaptive", "Adaptatif"], ["1", "Facile"], ["2", "Intermédiaire"], ["all", "Tous niveaux"]];
  return `
    <div class="budget-top">
      <div><label for="budget-num" class="eyebrow">Budget hebdomadaire total</label>
        <div class="money"><input id="budget-num" type="number" min="20" max="400" step="1" inputmode="numeric" value="${b}"><span class="cur" aria-hidden="true">€</span></div></div>
      <div class="presets" id="presets" role="group" aria-label="Budgets suggérés selon vos repas"></div>
    </div>
    <div><label for="budget-range" class="sr-only">Curseur du budget, de 20 à 400 euros</label>
      <input id="budget-range" class="range" type="range" min="20" max="400" step="5" value="${b}">
      <div class="range-scale" aria-hidden="true"><span>20 €</span><span>400 €</span></div></div>
    <div class="per-card">
      <p class="muted small" id="b-meals"></p>
      <div class="per-line" aria-live="polite"><span class="per-num" id="b-per" data-v="0">0 €</span><span class="muted">par personne et par repas</span><span class="level" id="b-level"></span></div>
      <div class="gauge" aria-hidden="true"><i class="g1"></i><i class="g2"></i><i class="g3"></i><span class="marker" id="b-marker"></span></div>
      <div class="gauge-labels" aria-hidden="true"><span style="left:0">0 €</span><span style="left:30%">3 €</span><span style="left:60%">6 €</span><span style="left:100%">10 € et plus</span></div>
      <p id="b-text" class="b-text"></p>
      <p id="b-warn" class="alert tone-warn" role="status" hidden></p>
      <p id="b-gastro" class="alert tone-info" hidden><span><strong>Gamme gastronomique cochée :</strong> le budget devient indicatif, le planning privilégie la qualité. Le coût réel reste affiché.</span></p>
    </div>
    <div class="prefs">
      <p class="eyebrow">Niveau de cuisine</p>
      <div class="seg seg-level" role="radiogroup" aria-label="Niveau de difficulté proposé" data-lv="${esc(state.cfg.level)}"><span class="seg-thumb" aria-hidden="true"></span>
        ${levels.map(([v, l]) => `<label><input type="radio" class="vh" name="level" value="${v}" data-level ${state.cfg.level === v ? "checked" : ""}><span>${l}</span></label>`).join("")}</div>
      <p class="opt-desc" id="level-desc">Adaptatif : vous êtes <strong>${lvl.name}</strong> (${lvl.cooked} ${plur(lvl.cooked, "recette cuisinée", "recettes cuisinées")}). Le planning reste à votre niveau, avec un défi d'un cran au-dessus chaque semaine.</p>
      ${switchRow("sw-season", "Privilégier les produits de saison", `Nous sommes en ${MONTHS[currentMonth() - 1]} : les recettes à base de légumes hors saison passent après les autres.`, state.cfg.seasonal)}
    </div>
    ${poolBox}`;
}
function budgetPresets() {
  const n = Math.max(1, slotList(state.cfg.days, state.cfg.leftovers).length) * state.cfg.people;
  const clamp = v => Math.min(400, Math.max(20, Math.round(v / 5) * 5));
  return [["Éco", 2.5], ["Équilibré", 4.5], ["Confort", 7]].map(([l, per]) => ({ l, v: clamp(n * per) }));
}
function syncBudget(skipInputs) {
  const { budget, people, days, leftovers } = state.cfg;
  const meals = slotList(days, leftovers).length, per = budget / (Math.max(1, meals) * people), lvl = budgetLevel(per);
  const num = $("#budget-num"), range = $("#budget-range");
  if (!num) return;
  if (!skipInputs) { num.value = budget; range.value = budget; } else if (document.activeElement !== num) num.value = budget;
  range.style.setProperty("--p", ((range.value - 20) / 380) * 100 + "%");
  const pr = budgetPresets(), sig = pr.map(p => p.v).join(","), box = $("#presets");
  if (box.dataset.sig !== sig) { box.dataset.sig = sig; box.innerHTML = pr.map(p => `<button type="button" class="chip" data-preset="${p.v}">${p.l} <b>${eur(p.v)}</b></button>`).join(""); }
  $$("[data-preset]", box).forEach(b => b.classList.toggle("is-active", +b.dataset.preset === budget));
  $("#b-meals").textContent = `${meals} repas pour ${people} ${plur(people, "personne", "personnes")}`;
  tween($("#b-per"), Math.round(per * 100) / 100, fmtEur, 500);
  const lv = $("#b-level"); lv.textContent = lvl.label; lv.dataset.l = lvl.id;
  $("#b-text").textContent = lvl.text;
  $("#b-marker").style.left = Math.min(100, (per / 10) * 100) + "%";
  $("#b-gastro").hidden = !gastroMode(state.cfg);
  const w = $("#b-warn");
  if (per < MIN_COST && !gastroMode(state.cfg)) { w.hidden = false; w.innerHTML = `<span>Sous ${eur(MIN_COST)} par repas et par personne, aucune recette n'est assez économique. Augmentez le budget ou réduisez le nombre de repas.</span>`; }
  else w.hidden = true;
  syncPool();
}
function setBudget(v, skipInputs) {
  state.cfg.budget = Math.min(400, Math.max(20, Math.round(v)));
  const range = $("#budget-range");
  if (skipInputs && range && document.activeElement !== range) range.value = state.cfg.budget;
  syncBudget(skipInputs);
}

/* ----- navigation du formulaire ----- */
function updateNav() {
  const next = $("#next");
  if (!next) return;
  let ok = !!slotList(state.cfg.days).length;
  if (state.step === 5 && poolFor(state.cfg).length === 0) ok = false;
  next.disabled = !ok;
}
function goStep(k) {
  if (k > 0 && !slotList(state.cfg.days).length) { toast("Cochez au moins un jour pour continuer"); k = 0; }
  k = Math.max(0, Math.min(5, k));
  if (k === state.step) return;
  const dir = k > state.step ? 1 : -1;
  state.step = k;
  const pane = updateWizard(dir);
  $("h1", pane).focus({ preventScroll: true });
  const w = $("#wizard");
  if (w && w.getBoundingClientRect().top < 0) window.scrollTo({ top: 0, behavior: motionOff() ? "auto" : "smooth" });
}
function showWizard() {
  $("#view").innerHTML = "";
  closeObservers();
  const pane = updateWizard(0);
  enter([$(".wz-side"), $(".wz-main")], { y: 22, step: 90, dur: 700 });
  return pane;
}
function generate() {
  if (state.busy) return;
  if (poolFor(state.cfg).length === 0) { toast("Aucune recette ne correspond à vos filtres"); return; }
  state.busy = true;
  state.plan = buildPlan(state.cfg, { history: state.history, favorites: state.favorites });
  state.checked = new Set();
  const go = () => {
    state.busy = false;
    state.view = "plan";
    document.body.classList.remove("in-wizard");
    window.scrollTo({ top: 0 });
    renderPlan({ intro: true });
    $("#plan-title").focus({ preventScroll: true });
    persist();
  };
  const w = $("#wizard");
  if (!w || motionOff()) return go();
  anim(w, [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-18px) scale(.985)" }], { duration: 300, easing: E_IN, fill: "forwards" }).finished.then(go, go);
}

/* ============================================================
   PLANNING
   ============================================================ */
function badgesFor(r, cfg) {
  const prio = [...new Set([...cfg.diets, "vegan", "vegetarien"])];
  let html = prio.filter(t => r.diet.includes(t)).slice(0, 2).map(t => `<span class="tag">${DIET_LABEL[t]}</span>`).join("");
  if (cfg.seasonal && outOfSeason(r).length) html += `<span class="tag tag-warn" title="Hors saison : ${esc(outOfSeason(r).join(", "))}">Hors saison</span>`;
  return html;
}
function favBtn(rid, extra = "") {
  const on = state.favorites.has(rid);
  return `<button type="button" class="fav${on ? " is-on" : ""}${extra}" data-fav="${rid}" aria-pressed="${on}" aria-label="${on ? "Retirer des favoris" : "Ajouter aux favoris"}">${ICON.heart}</button>`;
}
function slotHTML(sl, idx) {
  const { cfg, plan } = state, P = cfg.people;
  const r = sl.rid ? recipeById(sl.rid) : null;
  const label = `${DAYS[sl.day]}, ${MEAL_LABEL[sl.meal].toLowerCase()}`;
  if (sl.leftoverOf !== undefined && r) {
    const src = plan.slots[sl.leftoverOf];
    return `<li class="meal meal-left" data-idx="${idx}" style="--c:${STYLE_COLOR[r.category]}">
      <button type="button" class="meal-open" data-open="${idx}" aria-haspopup="dialog" aria-label="Restes : ${esc(r.name)}, ${esc(label)}">
        <span class="meal-art small" aria-hidden="true">${ICON.leftover}</span>
        <span class="meal-body"><span class="meal-kicker"><span>${MEAL_LABEL[sl.meal]}</span><span class="cat"><i></i>Restes du dîner de ${DAYS[src.day].toLowerCase()}</span></span>
          <span class="meal-name">${esc(r.name)}</span>
          <span class="small muted">Rien à cuisiner : réchauffez la portion mise de côté. Pour changer ce plat, changez le dîner de la veille.</span></span>
      </button></li>`;
  }
  if (!r) {
    return `<li class="meal meal-empty" data-idx="${idx}">
      <div class="meal-open"><span class="meal-art" aria-hidden="true">${ICON.plate}</span>
        <span class="meal-body"><span class="meal-kicker">${MEAL_LABEL[sl.meal]}</span><span class="meal-name">Aucune recette disponible</span>
        <span class="small muted">Toutes les recettes compatibles sont déjà utilisées ou dépasseraient le budget.</span></span></div>
      <div class="meal-foot"><span></span><span class="foot-actions"><button type="button" class="swap" data-pick="${idx}">${ICON.book}<span>Choisir</span></button><button type="button" class="swap" data-replace="${idx}" aria-label="Chercher une recette pour ${esc(label)}">${ICON.refresh}<span>Chercher</span></button></span></div>
    </li>`;
  }
  const double = sl.feeds !== undefined;
  return `<li class="meal" data-idx="${idx}" style="--c:${STYLE_COLOR[r.category]}">
    <button type="button" class="meal-open" data-open="${idx}" aria-haspopup="dialog" aria-label="Voir la recette ${esc(r.name)}, ${esc(label)}">
      <span class="meal-art" aria-hidden="true">${iconFor(r)}</span>
      <span class="meal-body">
        <span class="meal-kicker"><span>${MEAL_LABEL[sl.meal]}</span><span class="cat"><i></i>${esc(STYLE_LABEL[r.category])}</span>${double ? `<span class="x2">× 2 pour demain midi</span>` : ""}</span>
        <span class="meal-name">${esc(r.name)}</span>
        <span class="meal-meta"><span class="pill">${ICON.clock}${fmtDur(totalTime(r))}</span><span class="pill">${ICON.flame}${r.calories} kcal</span><span class="pill">${eur(r.costPerPerson * P * (double ? 2 : 1))}</span>${diffPill(r.difficulty)}</span>
      </span>
    </button>
    <div class="meal-foot"><span class="tags">${badgesFor(r, cfg)}</span>
      <span class="foot-actions">${favBtn(r.id)}<button type="button" class="swap" data-pick="${idx}" aria-label="Choisir une recette pour ${esc(label)}">${ICON.book}<span>Choisir</span></button><button type="button" class="swap" data-replace="${idx}" aria-label="Remplacer au hasard : ${esc(r.name)}, ${esc(label)}">${ICON.refresh}<span>Remplacer</span></button></span></div>
  </li>`;
}
function dayCost(d) {
  const P = state.cfg.people;
  return state.plan.slots.reduce((s, sl) => s + (sl.day === d && sl.rid ? recipeById(sl.rid).costPerPerson * P : 0), 0);
}
function reminders(plan) {
  const out = [];
  plan.slots.forEach(s => {
    if (!s.rid || s.leftoverOf !== undefined) return;
    const r = recipeById(s.rid), when = `${DAYS[s.day].toLowerCase()} ${s.meal === "lunch" ? "midi" : "soir"}`;
    if (r.ahead) out.push({ day: s.day - 0.5, when: s.day > 0 ? `${DAYS[s.day - 1]} soir` : "Dimanche soir", what: r.ahead, about: `Pour ${when} : ${r.name}` });
    if (s.feeds !== undefined) out.push({ day: s.day + 0.4, when: `${DAYS[s.day]} soir`, what: `Cuisiner en double et mettre la moitié en boîte au réfrigérateur pour ${DAYS[s.day + 1].toLowerCase()} midi.`, about: r.name });
    if (r.waitTime >= 20) out.push({ day: s.day + (s.meal === "lunch" ? 0 : 0.3), when: `${DAYS[s.day]} ${s.meal === "lunch" ? "matin" : "après-midi"}`, what: `Prévoir ${r.waitTime} min de marinade ou de repos en plus du temps actif.`, about: r.name });
  });
  return out.sort((a, b) => a.day - b.day);
}
function renderPlan({ intro = false, prev = null } = {}) {
  const { cfg, plan } = state, P = cfg.people;
  const dayIdx = [...new Set(plan.slots.map(s => s.day))];
  const rem = reminders(plan);
  const cooked = cookedSlots(plan.slots).length;
  $("#view").innerHTML = `
    <div class="plan" id="plan">
      <header class="plan-hero">
        <div class="hero-txt">
          <p class="eyebrow">Planning de la semaine</p>
          <h1 id="plan-title" tabindex="-1">Votre semaine <em>à table</em></h1>
          <div class="plan-sub"><span class="pill">${dayIdx.length} ${plur(dayIdx.length, "jour", "jours")}</span><span class="pill">${plan.slots.length} repas${cooked < plan.slots.length ? `, ${cooked} cuisinés` : ""}</span><span class="pill">${P} ${plur(P, "personne", "personnes")}</span></div>
        </div>
        <div class="plan-actions">
          <button type="button" id="btn-shop" class="btn btn-primary">${ICON.cart}<span>Liste de courses</span><span class="count-badge" id="shop-badge"></span></button>
          <button type="button" id="btn-regen" class="btn btn-ghost">${ICON.refresh}<span>Régénérer</span></button>
          <button type="button" id="btn-edit" class="btn btn-ghost">${ICON.sliders}<span>Modifier mes choix</span></button>
        </div>
      </header>
      <section class="stats" aria-label="Résumé du budget et de la nutrition">
        <div class="stat stat-cost" id="stat-cost">
          <div class="stat-row"><p class="eyebrow">Coût estimé</p><span class="level" id="s-level"></span></div>
          <p class="stat-num"><span id="s-cost" data-v="${prev ? prev.cost : 0}"></span><span class="stat-of">sur ${eur(cfg.budget)}</span></p>
          <div class="meter" id="s-meter" role="progressbar" aria-label="Coût estimé par rapport au budget" aria-valuemin="0" aria-valuemax="100"><span id="s-bar"${prev ? ` style="width:${prev.bar}"` : ""}></span></div>
          <p class="small stat-note" id="s-note"></p>
        </div>
        <div class="stat"><p class="eyebrow">Énergie</p><p class="stat-num"><span id="s-kcal" data-v="${prev ? prev.kcal : 0}"></span><small> kcal</small></p><p class="small muted">par repas et par personne, estimation</p></div>
        <div class="stat"><p class="eyebrow">Protéines</p><p class="stat-num"><span id="s-prot" data-v="${prev ? prev.prot : 0}"></span><small> g</small></p><p class="small muted">par repas et par personne, estimation</p></div>
      </section>
      <div class="alerts" id="alerts"></div>
      ${rem.length ? `<section class="ahead card" aria-labelledby="ahead-h"><div class="ahead-head">${ICON.bell}<h2 id="ahead-h">À anticiper</h2><span class="muted small">${rem.length} ${plur(rem.length, "rappel", "rappels")}</span></div>
        <ol class="ahead-list">${rem.map(x => `<li><span class="ahead-when">${esc(x.when)}</span><span><strong>${esc(x.what)}</strong><span class="muted small">${esc(x.about)}</span></span></li>`).join("")}</ol></section>` : ""}
      ${dayIdx.length > 1 ? `<nav class="daynav" aria-label="Aller directement à un jour"><div class="daynav-track" id="daynav"><span class="daynav-pill" aria-hidden="true"></span>${dayIdx.map(d => {
        const n = plan.slots.filter(s => s.day === d).length;
        return `<button type="button" data-jump="${d}" aria-label="${DAYS[d]}, ${n} repas">${DAYS[d].slice(0, 3)}<small aria-hidden="true">${n}</small></button>`;
      }).join("")}</div></nav>` : ""}
      <div class="days">${dayIdx.map(d => `
        <section class="day" id="day-${d}" aria-labelledby="day-h-${d}">
          <div class="day-head"><h2 id="day-h-${d}">${DAYS[d]}</h2><span class="day-meta" data-daymeta="${d}"></span></div>
          <ul class="meals">${plan.slots.map((sl, idx) => sl.day === d ? slotHTML(sl, idx) : "").join("")}</ul>
        </section>`).join("")}</div>
    </div>`;
  refreshPlanMeta();
  setupDayNav();
  if (intro) {
    enter([$(".hero-txt"), $(".plan-actions")], { y: 22, step: 90, dur: 760 });
    enter($$(".stat"), { y: 18, delay: 140, step: 70 });
    enter($$(".daynav, #alerts > *, .ahead"), { y: 12, delay: 300, step: 50 });
  }
  reveal($$(".day-head, .meal"), intro ? 340 : 60);
}
function refreshPlanMeta() {
  const { cfg, plan } = state, P = cfg.people, B = cfg.budget, gastro = gastroMode(cfg);
  const filled = plan.slots.filter(s => s.rid);
  const missing = plan.slots.length - filled.length;
  const nMeals = filled.length, cost = planCost(plan, P), over = !gastro && cost > B + 0.005;
  const perMeal = nMeals ? cost / (nMeals * P) : 0, lvl = budgetLevel(perMeal);
  const avgK = nMeals ? Math.round(filled.reduce((s, x) => s + recipeById(x.rid).calories, 0) / nMeals) : 0;
  const avgP = nMeals ? Math.round(filled.reduce((s, x) => s + recipeById(x.rid).protein, 0) / nMeals) : 0;
  const fallback = cfg.styles.length ? cookedSlots(filled).filter(s => !prefersStyle(recipeById(s.rid), cfg)).length : 0;
  const poolSize = poolFor(cfg).length;
  tween($("#s-cost"), cost, fmtEur, 900);
  tween($("#s-kcal"), avgK, fmtInt, 900);
  tween($("#s-prot"), avgP, fmtInt, 900);
  $("#stat-cost").classList.toggle("is-over", over);
  $("#stat-cost").classList.toggle("is-gastro", gastro);
  const pct = Math.min(100, (cost / B) * 100), bar = $("#s-bar");
  void bar.offsetWidth;
  bar.style.width = pct + "%";
  $("#s-meter").setAttribute("aria-valuenow", Math.round(pct));
  $("#s-meter").setAttribute("aria-valuetext", `${eur(cost)} sur ${eur(B)}`);
  $("#s-note").innerHTML = gastro
    ? `Mode gastronomique : budget indicatif de ${eur(B)}${cost > B ? `, dépassé de <b>${eur(cost - B)}</b>` : ""}. Soit ${eur(Math.round(perMeal * 100) / 100)} par personne et par repas.`
    : `${over ? `Dépassement de <b>${eur(cost - B)}</b>` : `Marge restante : <b>${eur(B - cost)}</b>`}, soit ${eur(Math.round(perMeal * 100) / 100)} par personne et par repas.`;
  const lv = $("#s-level"); lv.textContent = lvl.label; lv.dataset.l = lvl.id;
  const alerts = [];
  if (over) alerts.push(`<div class="alert tone-err" role="alert"><span><strong>Budget dépassé de ${eur(cost - B)}.</strong> Augmentez le budget, réduisez le nombre de repas ou activez les restes pour le midi.</span></div>`);
  if (missing) {
    const h = relaxHints(cfg);
    alerts.push(`<div class="alert tone-warn" role="status"><span><strong>${missing} repas sans recette.</strong> Seules ${poolSize} ${plur(poolSize, "recette respecte", "recettes respectent")} vos filtres, et aucune n'est proposée deux fois.${h.length ? " Pour élargir : " + h.map(x => `${x.label} (${x.count} recettes)`).join(", ") + "." : ""}</span></div>`);
  }
  if (fallback) alerts.push(`<div class="alert tone-warn" role="status"><span><strong>${fallback} ${plur(fallback, "recette sort", "recettes sortent")} des styles choisis.</strong> Il n'y avait pas assez de recettes dans ces styles.</span></div>`);
  if (gastro) alerts.push(`<div class="alert tone-info"><span><strong>Gamme gastronomique :</strong> recettes choisies pour leur qualité, sans contrainte de budget. Prévoyez du temps : ce sont des plats de week-end ou d'occasion.</span></div>`);
  if (cfg.diets.includes("halal")) alerts.push(`<div class="alert tone-info"><span><strong>Halal :</strong> les recettes sont sans porc, sans alcool et sans crustacés. Choisissez de la viande certifiée halal en magasin.</span></div>`);
  const box = $("#alerts"), html = alerts.join("");
  if (box.innerHTML !== html) box.innerHTML = html;
  $$("[data-daymeta]").forEach(el => {
    const d = +el.dataset.daymeta, n = plan.slots.filter(s => s.day === d).length;
    el.textContent = `${n} repas · ${eur(dayCost(d))}`;
  });
  const items = buildShopping(plan, P).filter(g => g.aisle !== "Placard").reduce((s, g) => s + g.items.length, 0);
  const badge = $("#shop-badge");
  if (badge.textContent !== String(items)) { badge.textContent = items; anim(badge, [{ transform: "scale(.6)" }, { transform: "none" }], { duration: 500, easing: E_SPRING }); }
}

/* apparition au défilement et menu des jours */
let revealIO = null, dayIO = null, jumpLock = 0;
function closeObservers() { if (revealIO) revealIO.disconnect(); if (dayIO) dayIO.disconnect(); revealIO = dayIO = null; }
function reveal(els, firstDelay = 0) {
  if (revealIO) revealIO.disconnect();
  if (motionOff() || !("IntersectionObserver" in window)) return;
  let batchDelay = firstDelay;
  els.forEach(el => el.classList.add("pre-reveal"));
  revealIO = new IntersectionObserver(entries => {
    const vis = entries.filter(e => e.isIntersecting).map(e => e.target).sort((a, b) => (a.compareDocumentPosition(b) & Node.DOCUMENT_POSITION_FOLLOWING ? -1 : 1));
    vis.forEach((el, i) => {
      revealIO.unobserve(el);
      el.classList.remove("pre-reveal");
      anim(el, [{ opacity: 0, transform: "translateY(28px) scale(.97)" }, { opacity: 1, transform: "none" }], { duration: 760, delay: batchDelay + i * 55, easing: E_OUT, fill: "backwards" });
    });
    if (vis.length) batchDelay = 0;
  }, { rootMargin: "0px 0px -6% 0px", threshold: 0.06 });
  els.forEach(el => revealIO.observe(el));
}
function setupDayNav() {
  if (dayIO) dayIO.disconnect();
  dayIO = null;
  const track = $("#daynav");
  if (!track) return;
  const btns = $$("button", track), pill = $(".daynav-pill", track);
  track._set = (d, instant) => {
    const b = btns.find(x => +x.dataset.jump === d);
    if (!b || (b.classList.contains("is-active") && !instant)) return;
    btns.forEach(x => { x.classList.toggle("is-active", x === b); if (x === b) x.setAttribute("aria-current", "true"); else x.removeAttribute("aria-current"); });
    movePill(pill, b, instant);
    centerInTrack(track, b);
  };
  track._set(+btns[0].dataset.jump, true);
  if (!("IntersectionObserver" in window)) return;
  dayIO = new IntersectionObserver(entries => {
    if (Date.now() < jumpLock) return;
    entries.forEach(e => { if (e.isIntersecting) track._set(+e.target.id.slice(4)); });
  }, { rootMargin: "-32% 0px -60% 0px" });
  $$(".day").forEach(s => dayIO.observe(s));
}
function jumpToDay(d) {
  const track = $("#daynav"), sec = document.getElementById("day-" + d);
  if (!sec) return;
  jumpLock = Date.now() + 900;
  if (track) track._set(d);
  sec.scrollIntoView({ behavior: motionOff() ? "auto" : "smooth", block: "start" });
}

/* remplacement animé d'un créneau (et de ses restes) */
function swapSlotCards(indices, focusIdx, msg) {
  let pending = indices.length;
  indices.forEach(idx => {
    const li = $(`.meal[data-idx="${idx}"]`);
    if (!li) { pending--; return; }
    const tmp = document.createElement("ul");
    tmp.innerHTML = slotHTML(state.plan.slots[idx], idx);
    const fresh = tmp.firstElementChild;
    const swapIn = () => {
      const h0 = li.offsetHeight;
      li.replaceWith(fresh);
      const h1 = fresh.offsetHeight;
      if (h0 !== h1) anim(fresh, [{ height: h0 + "px" }, { height: h1 + "px" }], { duration: 480, easing: E_OUT });
      anim(fresh.querySelector(".meal-body"), [{ opacity: 0, transform: "translateY(20px)" }, { opacity: 1, transform: "none" }], { duration: 600, easing: E_OUT });
      anim(fresh.querySelector(".meal-art"), [{ transform: "scale(.55) rotate(-25deg)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 760, easing: E_SPRING });
      if (idx === focusIdx) { const f = fresh.querySelector("[data-replace]") || fresh.querySelector(".meal-open"); if (f) f.focus({ preventScroll: true }); }
      if (--pending === 0) { refreshPlanMeta(); persist(); if (msg) toast(msg); }
    };
    anim(li.querySelector(".meal-body"), [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-16px)" }], { duration: 200, easing: E_IN, fill: "forwards" });
    anim(li.querySelector(".meal-art"), [{ transform: "none" }, { transform: "scale(.7) rotate(20deg)", opacity: 0 }], { duration: 200, easing: E_IN, fill: "forwards" }).finished.then(swapIn, swapIn);
  });
  if (!indices.length) { refreshPlanMeta(); persist(); }
}
function replaceSlot(idx, btn) {
  const li = $(`.meal[data-idx="${idx}"]`);
  const res = pickReplacement(state.plan, idx, state.cfg, { history: state.history, favorites: state.favorites });
  if (!res.id) {
    toast(res.reason === "budget" ? "Aucune alternative dans votre budget : utilisez « Choisir »" : "Aucune autre recette compatible avec vos filtres");
    anim(li, [{ transform: "translateX(0)" }, { transform: "translateX(-7px)" }, { transform: "translateX(6px)" }, { transform: "translateX(-3px)" }, { transform: "none" }], { duration: 440, easing: "ease-out" });
    return;
  }
  anim(btn && btn.querySelector("svg"), [{ transform: "rotate(0)" }, { transform: "rotate(180deg)" }], { duration: 220, easing: E_IN });
  assignSlot(state.plan, idx, res.id);
  const f = state.plan.slots[idx].feeds;
  swapSlotCards(f !== undefined ? [idx, f] : [idx], idx, "Remplacé par « " + recipeById(res.id).name + " »");
}
function regenerate(btn) {
  if (state.busy) return;
  state.busy = true;
  anim(btn.querySelector("svg"), [{ transform: "rotate(0)" }, { transform: "rotate(360deg)" }], { duration: 800, easing: E_OUT });
  const prev = { cost: $("#s-cost").dataset.v, kcal: $("#s-kcal").dataset.v, prot: $("#s-prot").dataset.v, bar: $("#s-bar").style.width };
  state.plan = buildPlan(state.cfg, { history: state.history, favorites: state.favorites });
  state.checked = new Set();
  const vis = $$(".meal").filter(m => { const r = m.getBoundingClientRect(); return r.bottom > 0 && r.top < innerHeight; });
  vis.forEach((m, i) => anim(m, [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(-10px) scale(.97)" }], { duration: 220, delay: i * 28, easing: E_IN, fill: "forwards" }));
  setTimeout(() => {
    const y = window.scrollY;
    renderPlan({ prev });
    window.scrollTo(0, y);
    $("#btn-regen").focus({ preventScroll: true });
    toast("Nouveau planning généré");
    state.busy = false;
    persist();
  }, motionOff() ? 0 : 230 + vis.length * 28);
}
function editChoices() {
  const plan = $("#plan");
  const go = () => { state.view = "wizard"; state.step = 0; window.scrollTo({ top: 0 }); const pane = showWizard(); document.body.classList.add("in-wizard"); $("h1", pane).focus({ preventScroll: true }); persist(); };
  if (!plan || motionOff()) return go();
  anim(plan, [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(14px)" }], { duration: 240, easing: E_IN, fill: "forwards" }).finished.then(go, go);
}

/* ============================================================
   CATALOGUE
   ============================================================ */
function catalogFilter() {
  const c = state.catalog, q = norm(c.q);
  const cfg = state.cfg;
  return RECIPES.filter(r => {
    if (state.picker !== null) {
      const sl = state.plan.slots[state.picker];
      if (!eligible(r, { ...cfg, styles: cfg.styles.concat("gastronomique") })) return false;
      if (sl.feeds !== undefined && !r.leftover) return false;
    } else if (c.compatible && !eligible(r, { ...cfg, styles: cfg.styles.concat("gastronomique") })) return false;
    if (q && !norm(r.name + " " + r.ingredients.map(g => g.item).join(" ") + " " + (r.skills || []).join(" ")).includes(q)) return false;
    if (c.styles.length && !c.styles.some(s => matchesStyle(r, s))) return false;
    if (c.diff.length && !c.diff.includes(r.difficulty)) return false;
    if (c.time === "20" && totalTime(r) > 20) return false;
    if (c.time === "45" && totalTime(r) > 45) return false;
    if (c.fav && !state.favorites.has(r.id)) return false;
    if (c.season && outOfSeason(r).length) return false;
    return true;
  });
}
function catCard(r) {
  const h = state.history[r.id];
  const inPlan = state.picker !== null && state.plan.slots.some((s, k) => s.rid === r.id && k !== state.picker && k !== state.plan.slots[state.picker].feeds);
  return `<li class="rcard${inPlan ? " is-used" : ""}" style="--c:${STYLE_COLOR[r.category]}">
    <button type="button" class="rcard-open" data-recipe="${r.id}" aria-haspopup="dialog">
      <span class="meal-art" aria-hidden="true">${iconFor(r)}</span>
      <span class="meal-body"><span class="meal-kicker"><span class="cat"><i></i>${esc(STYLE_LABEL[r.category])}</span>${h && h.n ? `<span class="cooked">${ICON.done.replace('width="20" height="20"', 'width="13" height="13"')} cuisiné${h.rating ? " · " + "★".repeat(h.rating) : ""}</span>` : ""}${inPlan ? `<span class="x2">déjà au planning</span>` : ""}</span>
        <span class="meal-name">${esc(r.name)}</span>
        <span class="meal-meta"><span class="pill">${ICON.clock}${fmtDur(totalTime(r))}</span><span class="pill">${eur(r.costPerPerson)} / pers.</span>${diffPill(r.difficulty)}</span></span>
    </button>${favBtn(r.id, " fav-float")}</li>`;
}
function renderCatalog({ intro = false } = {}) {
  const c = state.catalog, pk = state.picker;
  const sl = pk !== null && state.plan ? state.plan.slots[pk] : null;
  const chips = (list, key, val, label) => list.map(x => `<button type="button" class="chip chip-sm${c[key].includes(val(x)) ? " is-active" : ""}" data-cfilter="${key}" data-val="${val(x)}" aria-pressed="${c[key].includes(val(x))}">${label(x)}</button>`).join("");
  $("#view").innerHTML = `
    <div class="catalog" id="catalog">
      ${sl ? `<div class="picker-bar card"><span>${ICON.book}<span>Choisissez la recette pour <strong>${DAYS[sl.day]}, ${MEAL_LABEL[sl.meal].toLowerCase()}</strong>${sl.feeds !== undefined ? " (cuisinée en double pour les restes)" : ""}. Seules les recettes compatibles avec vos réglages sont affichées.</span></span><button type="button" class="btn btn-ghost btn-sm" data-action="cancel-pick">Annuler</button></div>` : ""}
      <header class="cat-hero"><div><p class="eyebrow">Catalogue</p><h1 tabindex="-1" id="cat-title">Toutes les <em>recettes</em></h1></div>
        <label class="search"><span class="sr-only">Rechercher une recette, un ingrédient ou une technique</span>${ICON.search}<input id="cat-q" type="search" placeholder="Rechercher : risotto, poulet, émulsion…" value="${esc(c.q)}" autocomplete="off"></label></header>
      <div class="filters card">
        <div class="frow"><span class="flabel">Styles</span><div class="fchips">${chips(STYLES, "styles", s => s.id, s => s.label)}</div></div>
        <div class="frow"><span class="flabel">Difficulté</span><div class="fchips">${chips([1, 2, 3], "diff", d => d, d => DIFF_LABEL[d])}
          <span class="fsep"></span>${[["all", "Tous les temps"], ["45", "45 min max"], ["20", "20 min max"]].map(([v, l]) => `<button type="button" class="chip chip-sm${c.time === v ? " is-active" : ""}" data-ctime="${v}" aria-pressed="${c.time === v}">${l}</button>`).join("")}</div></div>
        <div class="frow"><span class="flabel">Affiner</span><div class="fchips">
          <button type="button" class="chip chip-sm${c.fav ? " is-active" : ""}" data-ctoggle="fav" aria-pressed="${c.fav}">${ICON.heart} Favoris (${state.favorites.size})</button>
          <button type="button" class="chip chip-sm${c.season ? " is-active" : ""}" data-ctoggle="season" aria-pressed="${c.season}">De saison</button>
          ${pk === null ? `<button type="button" class="chip chip-sm${c.compatible ? " is-active" : ""}" data-ctoggle="compatible" aria-pressed="${c.compatible}">Compatible avec mes réglages</button>` : ""}
          <button type="button" class="chip chip-sm" data-action="reset-filters">Réinitialiser</button></div></div>
      </div>
      <p class="cat-count" id="cat-count" aria-live="polite"></p>
      <ul class="rgrid" id="rgrid"></ul>
    </div>`;
  fillCatalog(intro);
  if (intro) enter([$(".picker-bar"), $(".cat-hero"), $(".filters")], { y: 16, step: 70 });
}
function fillCatalog(animate) {
  const list = catalogFilter();
  $("#cat-count").textContent = `${list.length} ${plur(list.length, "recette", "recettes")}`;
  $("#rgrid").innerHTML = list.length ? list.map(catCard).join("") : `<li class="empty-cat">Aucune recette ne correspond. Retirez un filtre ou changez la recherche.</li>`;
  if (animate !== false) enter($$("#rgrid > li").slice(0, 12), { y: 14, step: 30, dur: 560 });
}

/* ============================================================
   PROGRESSION
   ============================================================ */
function renderProgress({ intro = false } = {}) {
  const lvl = levelFor(state.history);
  const cookedIds = Object.keys(state.history).filter(id => state.history[id].n > 0);
  const allSkills = [...new Set(RECIPES.flatMap(r => r.skills || []))];
  const acquired = [...new Set(cookedIds.flatMap(id => recipeById(id).skills || []))];
  const ratings = cookedIds.map(id => state.history[id].rating).filter(Boolean);
  const avg = ratings.length ? (ratings.reduce((a, b) => a + b, 0) / ratings.length) : 0;
  const pct = lvl.next ? Math.round(((lvl.cooked - lvl.min) / (lvl.next.min - lvl.min)) * 100) : 100;
  const tdiff = Math.min(3, lvl.diff + 1);
  const seed = Math.floor(Date.now() / 864e5);
  const challengePool = RECIPES.filter(r => r.difficulty === tdiff && !cookedIds.includes(r.id) && r.category !== "gastronomique" && eligible(r, { ...state.cfg, styles: [] }));
  const challenge = challengePool.length ? challengePool[seed % challengePool.length] : null;
  const recent = cookedIds.sort((a, b) => state.history[b].last - state.history[a].last).slice(0, 12);
  const toLearn = allSkills.filter(s => !acquired.includes(s));
  $("#view").innerHTML = `
    <div class="progress-view" id="progress-view">
      <header class="cat-hero"><div><p class="eyebrow">Progression</p><h1 tabindex="-1" id="prog-title">Votre <em>parcours</em> en cuisine</h1></div></header>
      <section class="level-card card">
        <div class="level-badge" aria-hidden="true">${ICON.chef}</div>
        <div class="level-main"><p class="eyebrow">Niveau actuel</p><p class="level-name">${lvl.name}</p>
          <div class="meter"><span id="lvl-bar" style="width:0"></span></div>
          <p class="small muted">${lvl.next ? `${lvl.next.min - lvl.cooked} ${plur(lvl.next.min - lvl.cooked, "recette", "recettes")} avant <strong>${lvl.next.name}</strong>. Une recette compte une fois, même cuisinée plusieurs fois.` : "Niveau maximal atteint : vous maîtrisez l'essentiel du répertoire."}</p></div>
      </section>
      <section class="stats prog-stats">
        <div class="stat"><p class="eyebrow">Recettes cuisinées</p><p class="stat-num"><span id="pg-n" data-v="0"></span><small> / ${RECIPES.length}</small></p></div>
        <div class="stat"><p class="eyebrow">Techniques acquises</p><p class="stat-num"><span id="pg-s" data-v="0"></span><small> / ${allSkills.length}</small></p></div>
        <div class="stat"><p class="eyebrow">Note moyenne</p><p class="stat-num">${avg ? avg.toFixed(1).replace(".", ",") : "–"}<small> / 5</small></p></div>
      </section>
      ${challenge ? `<section class="challenge card" style="--c:${STYLE_COLOR[challenge.category]}"><div><p class="eyebrow">Défi suggéré · ${DIFF_LABEL[challenge.difficulty]}</p><p class="ch-name">${esc(challenge.name)}</p><p class="small muted">Vous apprendrez : ${esc((challenge.skills || []).join(", "))}.</p></div>
        <button type="button" class="btn btn-primary btn-sm" data-recipe="${challenge.id}">Voir la recette</button></section>` : ""}
      <section class="skills card"><h2>Techniques acquises</h2>
        ${acquired.length ? `<ul class="skill-list">${acquired.map(s => `<li class="on">${esc(s)}</li>`).join("")}</ul>` : `<p class="muted">Aucune pour l'instant. Ouvrez une recette et touchez « J'ai cuisiné ce plat » une fois terminée.</p>`}
        <h3 class="eyebrow">À découvrir</h3><ul class="skill-list">${toLearn.slice(0, 18).map(s => `<li>${esc(s)}</li>`).join("")}${toLearn.length > 18 ? `<li class="more">+ ${toLearn.length - 18}</li>` : ""}</ul></section>
      <section class="history card"><h2>Historique</h2>
        ${recent.length ? `<ul class="hist-list">${recent.map(id => { const r = recipeById(id), h = state.history[id]; return `<li><button type="button" data-recipe="${id}"><span class="meal-art small" aria-hidden="true" style="--c:${STYLE_COLOR[r.category]}">${iconFor(r)}</span><span class="hist-txt"><span class="meal-name">${esc(r.name)}</span><span class="small muted">${new Date(h.last).toLocaleDateString("fr-FR", { day: "numeric", month: "long" })} · cuisiné ${h.n} ${plur(h.n, "fois", "fois")}</span></span><span class="stars-ro" aria-label="${h.rating ? h.rating + " sur 5" : "Pas de note"}">${h.rating ? "★".repeat(h.rating) + "☆".repeat(5 - h.rating) : ""}</span></button></li>`; }).join("")}</ul>` : `<p class="muted">Votre historique apparaîtra ici.</p>`}
        ${recent.length ? `<button type="button" class="btn btn-ghost btn-sm" data-action="reset-history">Effacer la progression</button>` : ""}</section>
    </div>`;
  tween($("#pg-n"), lvl.cooked, fmtInt, 900);
  tween($("#pg-s"), acquired.length, fmtInt, 900);
  requestAnimationFrame(() => { const b = $("#lvl-bar"); void b.offsetWidth; b.style.width = pct + "%"; });
  if (intro) enter($$("#progress-view > *"), { y: 18, step: 70 });
}

/* ============================================================
   MODALES
   ============================================================ */
let modal = null;
function openModal({ html, footer = "", wide = false, opener }) {
  if (modal) closeModal(true);
  const root = $("#modal-root");
  root.innerHTML = `<div class="overlay" data-overlay></div><div class="sheet-wrap"><div class="sheet${wide ? " wide" : ""}" role="dialog" aria-modal="true" aria-labelledby="dlg-title" tabindex="-1">
    <div class="grab" aria-hidden="true"><span></span></div><div class="sheet-scroll">${html}</div>${footer ? `<div class="sheet-foot">${footer}</div>` : ""}</div></div>`;
  modal = { opener: opener || document.activeElement, closing: false };
  const sbw = window.innerWidth - document.documentElement.clientWidth;
  document.body.style.overflow = "hidden";
  if (sbw > 0) document.body.style.paddingRight = sbw + "px";
  $("main").inert = true; $("#topbar").inert = true;
  const sheet = $(".sheet", root);
  anim($(".overlay", root), [{ opacity: 0 }, { opacity: 1 }], { duration: 360, easing: "ease-out" });
  anim(sheet, DESK.matches ? [{ opacity: 0, transform: "translateY(30px) scale(.96)" }, { opacity: 1, transform: "none" }] : [{ transform: "translateY(100%)" }, { transform: "none" }], { duration: DESK.matches ? 560 : 600, easing: E_OUT });
  sheet.focus({ preventScroll: true });
  enableDrag(sheet);
  return sheet;
}
function closeModal(instant) {
  if (!modal || modal.closing) return;
  modal.closing = true;
  const root = $("#modal-root"), sheet = $(".sheet", root), ov = $(".overlay", root);
  const done = () => {
    root.innerHTML = "";
    document.body.style.overflow = ""; document.body.style.paddingRight = "";
    $("main").inert = false; $("#topbar").inert = false;
    const o = modal && modal.opener;
    modal = null;
    if (o && document.contains(o)) o.focus({ preventScroll: true });
  };
  if (instant === true || motionOff() || !sheet) return done();
  const curT = getComputedStyle(sheet).transform, curO = getComputedStyle(ov).opacity;
  anim(ov, [{ opacity: curO }, { opacity: 0 }], { duration: 280, easing: "ease-in", fill: "forwards" });
  anim(sheet, DESK.matches ? [{ opacity: 1, transform: "none" }, { opacity: 0, transform: "translateY(18px) scale(.97)" }] : [{ transform: curT === "none" ? "none" : curT }, { transform: "translateY(100%)" }], { duration: 300, easing: E_IN, fill: "forwards" }).finished.then(done, done);
}
function enableDrag(sheet) {
  const grab = $(".grab", sheet), ov = $("#modal-root .overlay");
  let y0 = null, dy = 0, t0 = 0;
  grab.addEventListener("pointerdown", e => { if (DESK.matches || e.button !== 0) return; y0 = e.clientY; dy = 0; t0 = performance.now(); grab.setPointerCapture(e.pointerId); });
  grab.addEventListener("pointermove", e => { if (y0 === null) return; dy = Math.max(0, e.clientY - y0); sheet.style.transform = `translateY(${dy}px)`; ov.style.opacity = String(1 - Math.min(1, dy / 420)); });
  const end = () => {
    if (y0 === null) return;
    const v = dy / Math.max(1, performance.now() - t0);
    y0 = null;
    if (dy > 120 || (v > 0.5 && dy > 30)) return closeModal();
    anim(sheet, [{ transform: `translateY(${dy}px)` }, { transform: "none" }], { duration: 520, easing: E_SPRING });
    sheet.style.transform = ""; ov.style.opacity = "";
  };
  grab.addEventListener("pointerup", end);
  grab.addEventListener("pointercancel", end);
}

/* ----- fiche recette (planning, catalogue, progression) ----- */
function recipeContext(rid, slotIdx) {
  const P = state.cfg.people;
  const sl = slotIdx !== undefined && state.plan ? state.plan.slots[slotIdx] : null;
  const double = sl && sl.feeds !== undefined;
  const leftoverSlot = sl && sl.leftoverOf !== undefined;
  return { r: recipeById(rid), P, portions: P * (double ? 2 : 1), sl, double, leftoverSlot };
}
function starsHTML(rid) {
  const cur = (state.history[rid] || {}).rating || 0;
  return `<div class="stars" role="radiogroup" aria-label="Votre note">${[1, 2, 3, 4, 5].map(n => `<button type="button" role="radio" aria-checked="${cur === n}" class="star${n <= cur ? " on" : ""}" data-rate="${n}" data-rid="${rid}" aria-label="${n} sur 5">${ICON.star}</button>`).join("")}</div>`;
}
function openRecipe(rid, opener, slotIdx) {
  const { r, P, portions, sl, double, leftoverSlot } = recipeContext(rid, slotIdx);
  const tags = `<span class="tag tag-cat">${esc(STYLE_LABEL[r.category])}</span>` + r.diet.map(t => `<span class="tag">${DIET_LABEL[t]}</span>`).join("");
  const ing = r.ingredients.map(g => { const l = recipeIngredientLine(g, portions); return `<li><span class="ing-q">${esc(l.qty)}</span><span>${esc(l.name)}</span></li>`; }).join("");
  const equip = r.equipments.length ? r.equipments.map(e => EQUIP_LABEL[e]).join(", ") : "Aucun matériel de cuisson";
  const facts = [[fmtDur(totalTime(r)), "temps total"], [`${r.prepTime} min`, "préparation"], [r.cookTime ? fmtDur(r.cookTime) : "Aucune", "cuisson"]];
  if (r.waitTime) facts.push([`${r.waitTime} min`, "marinade ou repos"]);
  facts.push([`${r.calories}`, "kcal par pers. (est.)"], [`${r.protein} g`, "protéines (est.)"], [DIFF_LABEL[r.difficulty], "difficulté"]);
  const oos = outOfSeason(r), h = state.history[r.id];
  const where = sl ? `${DAYS[sl.day]} · ${MEAL_LABEL[sl.meal].toLowerCase()}${leftoverSlot ? " · restes" : ""}` : STYLE_LABEL[r.category];
  const notes = [];
  if (double) notes.push(`<p class="alert tone-info"><span><strong>Quantités pour ${portions} portions :</strong> gardez la moitié pour demain midi, dans une boîte fermée au réfrigérateur dès que le plat a tiédi (moins de 2 heures). À consommer sous 3 jours.</span></p>`);
  if (leftoverSlot) notes.push(`<p class="alert tone-info"><span><strong>Restes :</strong> réchauffez jusqu'à ce que le plat soit bien chaud à cœur, en ajoutant un trait d'eau aux plats en sauce ou aux féculents. Les quantités ci-dessous sont celles de la recette d'origine, déjà cuisinée hier soir.</span></p>`);
  if (portions >= 5) notes.push(`<p class="alert tone-warn"><span><strong>${portions} portions :</strong> faites saisir viandes, poissons et légumes en plusieurs fois, ou dans deux poêles. Une poêle surchargée fait bouillir au lieu de dorer. Les temps de cuisson au four peuvent s'allonger de 5 à 10 minutes pour un plat plus rempli.</span></p>`);
  if (r.ahead) notes.push(`<p class="alert tone-info"><span><strong>À anticiper :</strong> ${esc(r.ahead)}</span></p>`);
  if (state.cfg.seasonal && oos.length) notes.push(`<p class="alert tone-warn"><span><strong>Hors saison en ${MONTHS[currentMonth() - 1]} :</strong> ${esc(oos.join(", "))}. Plus cher et moins goûteux : remplacez si possible par un légume de saison.</span></p>`);
  const pickMode = state.picker !== null && opener && opener.closest && opener.closest("#rgrid");
  const footer = `${favBtn(r.id, " fav-lg")}
    ${pickMode ? `<button type="button" class="btn btn-primary" data-assign="${r.id}">${ICON.calendar}<span>Mettre au planning</span></button>` : `<button type="button" class="btn btn-ghost" data-cook="${r.id}" data-portions="${portions}">${ICON.chef}<span>Mode cuisine</span></button>
    <button type="button" class="btn btn-primary" data-cooked="${r.id}">${ICON.done}<span class="lbl">${h && h.n ? `Cuisiné ${h.n} fois · encore` : "J'ai cuisiné ce plat"}</span></button>`}`;
  openModal({ opener, wide: true, footer, html: `
    <header class="rcp-hero" style="--c:${STYLE_COLOR[r.category]}">
      <span class="rcp-art" aria-hidden="true">${iconFor(r)}</span>
      <div class="rcp-head"><p class="eyebrow">${esc(where)}</p><h2 id="dlg-title">${esc(r.name)}</h2><div class="tags">${tags}</div>
        <p class="rcp-cost">${eur(r.costPerPerson * portions)} pour ${portions} ${plur(portions, "portion", "portions")} · ${eur(r.costPerPerson)} par personne</p></div>
      <button type="button" class="x-btn" data-close aria-label="Fermer la recette">${CLOSE}</button>
    </header>
    <dl class="facts">${facts.map(([v, l]) => `<div class="fact"><dd>${v}</dd><dt>${l}</dt></div>`).join("")}</dl>
    ${notes.join("")}
    ${r.skills && r.skills.length ? `<section class="learn" aria-labelledby="learn-h"><h3 id="learn-h" class="eyebrow">Ce que vous allez apprendre</h3><ul>${r.skills.map(k => `<li>${esc(k)}</li>`).join("")}</ul></section>` : ""}
    <div class="rcp-cols">
      <section aria-labelledby="ing-h"><h3 id="ing-h">Ingrédients <span class="muted">· ${portions} ${plur(portions, "portion", "portions")}</span></h3><ul class="ing-list">${ing}</ul><p class="small muted">Sel et eau ne sont pas comptés. Le poivre n'apparaît que lorsqu'il est un ingrédient principal.</p></section>
      <section aria-labelledby="prep-h"><h3 id="prep-h">Préparation</h3><ol class="steps-tl">${r.instructions.map(s => { const [t, d] = splitStep(s); return `<li><div>${t ? `<strong class="step-title">${esc(t)}</strong>` : ""}<p>${esc(d)}</p></div></li>`; }).join("")}</ol>
        ${r.tips && r.tips.length ? `<aside class="tips" aria-label="Astuces de chef"><p class="eyebrow">Astuces de chef</p><ul>${r.tips.map(t => `<li>${esc(t)}</li>`).join("")}</ul></aside>` : ""}
        <p class="small muted">Matériel : ${esc(equip)}</p>
        <div class="rate-row"><span class="eyebrow">Votre note</span>${starsHTML(r.id)}</div></section>
    </div>` });
  const root = $("#modal-root");
  anim($(".rcp-art", root), [{ transform: "scale(.5) rotate(-20deg)", opacity: 0 }, { transform: "none", opacity: 1 }], { duration: 800, delay: 120, easing: E_SPRING, fill: "backwards" });
  enter($$(".fact, .learn li, .ing-list li, .steps-tl li, .tips", root), { y: 10, delay: 200, step: 22, dur: 520 });
}
function markCooked(rid, rating) {
  const before = levelFor(state.history);
  const h = state.history[rid] || { n: 0, last: 0, rating: 0 };
  const firstTime = !h.n;
  const recent = h.last && Date.now() - h.last < 3 * 3600e3;
  if (rating === undefined) { if (!recent) h.n += 1; h.last = Date.now(); }
  else { h.rating = rating; if (!h.n) { h.n = 1; h.last = Date.now(); } }
  state.history[rid] = h;
  persist();
  const after = levelFor(state.history);
  if (after.index > before.index) toast(`Niveau supérieur : vous êtes ${after.name}`, 4000);
  else if (firstTime) { const sk = recipeById(rid).skills || []; toast(sk.length ? `Techniques acquises : ${sk.slice(0, 2).join(", ")}${sk.length > 2 ? "…" : ""}` : "Recette ajoutée à votre progression"); }
  else if (rating === undefined) toast("Bien joué, c'est noté");
  return h;
}
function toggleFav(rid) {
  if (state.favorites.has(rid)) state.favorites.delete(rid); else state.favorites.add(rid);
  const on = state.favorites.has(rid);
  $$(`[data-fav="${rid}"]`).forEach(b => {
    b.classList.toggle("is-on", on);
    b.setAttribute("aria-pressed", on);
    b.setAttribute("aria-label", on ? "Retirer des favoris" : "Ajouter aux favoris");
    anim(b.querySelector("svg"), [{ transform: "scale(.6)" }, { transform: "scale(1.25)" }, { transform: "none" }], { duration: 500, easing: E_SPRING });
  });
  toast(on ? "Ajouté aux favoris : proposé plus souvent" : "Retiré des favoris");
  persist();
}
function startPicker(idx) {
  state.picker = idx;
  state.tab = "catalog";
  updateTabs();
  closeObservers();
  render({ intro: true });
  window.scrollTo({ top: 0 });
}
function assignFromPicker(rid) {
  const idx = state.picker, cfg = state.cfg;
  const before = planCost(state.plan, cfg.people);
  assignSlot(state.plan, idx, rid);
  const after = planCost(state.plan, cfg.people);
  state.picker = null;
  closeModal(true);
  state.tab = "plan";
  state.view = "plan";
  updateTabs();
  renderPlan({ intro: true });
  const li = $(`.meal[data-idx="${idx}"]`);
  if (li) { li.classList.remove("pre-reveal"); li.scrollIntoView({ block: "center", behavior: motionOff() ? "auto" : "smooth" }); anim(li, [{ boxShadow: "0 0 0 3px var(--accent)" }, { boxShadow: "0 0 0 0 transparent" }], { duration: 1400, easing: "ease-out" }); }
  const over = !gastroMode(cfg) && after > cfg.budget && after > before;
  toast(over ? `Ajouté au planning. Attention : budget dépassé de ${eur(after - cfg.budget)}` : "Ajouté au planning", 3400);
  persist();
}

/* ----- liste de courses ----- */
function shoppingHeader() {
  const meals = state.plan.slots.filter(s => s.rid).length, P = state.cfg.people;
  return `Liste de courses Mijote : ${P} ${plur(P, "personne", "personnes")}, ${meals} repas`;
}
const RING_C = 2 * Math.PI * 26;
function updateChecked() {
  const keys = $$("[data-item]", $("#modal-root"));
  const n = keys.filter(k => k.checked).length, total = keys.length || 1;
  const el = $("#shop-count");
  if (el) el.textContent = `${n} sur ${keys.length} ${plur(keys.length, "article coché", "articles cochés")}`;
  const ring = $("#ring-fill");
  if (ring) ring.style.strokeDashoffset = String(RING_C * (1 - n / total));
  const pct = $("#ring-pct");
  if (pct) pct.textContent = Math.round((n / total) * 100) + "%";
}
function openShopping(opener) {
  const groups = buildShopping(state.plan, state.cfg.people);
  state.shop = groups;
  const main = groups.filter(g => g.aisle !== "Placard"), pantry = groups.find(g => g.aisle === "Placard");
  const total = main.reduce((s, g) => s + g.items.length, 0);
  const meals = state.plan.slots.filter(s => s.rid).length, P = state.cfg.people;
  const canShare = !!navigator.share;
  openModal({ opener, html: `
    <header class="shop-head">
      <div class="ring" aria-hidden="true"><svg viewBox="0 0 64 64" width="64" height="64"><circle cx="32" cy="32" r="26" class="ring-track"/><circle cx="32" cy="32" r="26" class="ring-fill" id="ring-fill" stroke-dasharray="${RING_C}" stroke-dashoffset="${RING_C}"/></svg><b id="ring-pct">0%</b></div>
      <div class="shop-title"><h2 id="dlg-title">Liste de courses</h2><p class="muted small">${total} ${plur(total, "article", "articles")} · ${meals} repas · ${P} ${plur(P, "personne", "personnes")}</p><p id="shop-count" class="small strong" aria-live="polite"></p></div>
      <button type="button" class="x-btn" data-close aria-label="Fermer la liste de courses">${CLOSE}</button>
    </header>
    ${main.map(g => `
      <section class="aisle" aria-label="${esc(g.aisle)}" style="--c:${AISLE_COLOR[g.aisle]}">
        <h3 class="aisle-title"><span><i></i>${esc(g.aisle)}</span><span>${g.items.length}</span></h3>
        <ul>${g.items.map(it => `<li><label class="check"><input type="checkbox" class="vh" data-item="${esc(it.key)}" ${state.checked.has(it.key) ? "checked" : ""}><span class="tick" aria-hidden="true">${TICK}</span><span class="qty">${esc(it.qty)}</span><span class="txt">${esc(it.name)}${it.pack ? `<span class="pack">${esc(it.pack)}</span>` : ""}</span></label></li>`).join("")}</ul>
      </section>`).join("")}
    ${pantry ? `<section class="aisle pantry" aria-label="Placard" style="--c:${AISLE_COLOR.Placard}">
      <h3 class="aisle-title"><span><i></i>Placard : à vérifier</span><span>${pantry.items.length}</span></h3>
      <p class="small muted pantry-note">Épices, huiles et condiments : cochez ce que vous avez déjà. Mijote s'en souvient pour les semaines suivantes et les retire de la liste partagée.</p>
      <ul class="pantry-grid">${pantry.items.map(it => `<li><label class="check check-sm"><input type="checkbox" class="vh" data-pantry="${esc(it.item)}" ${state.pantry.has(it.item) ? "checked" : ""}><span class="tick" aria-hidden="true">${TICK}</span><span class="txt">${esc(it.name)}</span></label></li>`).join("")}</ul>
    </section>` : ""}
    <div id="copy-fallback" class="copy-fallback" hidden><label for="copy-area" class="small muted">Copie automatique impossible : sélectionnez et copiez ce texte.</label><textarea id="copy-area" rows="8" readonly></textarea></div>`,
    footer: `<button type="button" class="btn btn-ghost" data-close>Fermer</button>${canShare ? `<button type="button" class="btn btn-ghost" id="share-btn">${ICON.share}<span>Partager</span></button>` : ""}<button type="button" class="btn btn-primary" id="copy-btn">${ICON.copy}<span class="lbl">Copier la liste</span></button>` });
  requestAnimationFrame(() => requestAnimationFrame(updateChecked));
  enter($$("#modal-root .aisle"), { y: 14, delay: 180, step: 70, dur: 620 });
}
async function copyText(text) {
  try { if (navigator.clipboard && window.isSecureContext) { await navigator.clipboard.writeText(text); return true; } } catch (e) { /* repli */ }
  try {
    const ta = document.createElement("textarea");
    ta.value = text; ta.setAttribute("readonly", ""); ta.style.position = "fixed"; ta.style.opacity = "0";
    document.body.appendChild(ta); ta.select();
    const ok = document.execCommand("copy");
    ta.remove();
    return ok;
  } catch (e) { return false; }
}
const listText = () => shoppingText(state.shop, state.checked, state.pantry, shoppingHeader());
async function copyShopping() {
  const text = listText(), btn = $("#copy-btn");
  if (await copyText(text)) {
    toast("Liste copiée dans le presse-papiers");
    if (btn) { setLabel(btn, "Copiée"); setTimeout(() => { if (document.contains(btn)) setLabel(btn, "Copier la liste"); }, 1800); }
    return;
  }
  const box = $("#copy-fallback"), area = $("#copy-area");
  box.hidden = false; area.value = text; area.focus(); area.select();
}
async function shareShopping() {
  try { await navigator.share({ title: "Liste de courses Mijote", text: listText() }); } catch (e) { /* annulé */ }
}

/* ============================================================
   MODE CUISINE
   ============================================================ */
const cook = { rid: null, portions: 2, step: 0, steps: [], timers: [], wake: null, tick: null, audio: null };
async function requestWake() {
  try { if ("wakeLock" in navigator) { cook.wake = await navigator.wakeLock.request("screen"); } } catch (e) { cook.wake = null; }
}
document.addEventListener("visibilitychange", () => { if (cook.rid && document.visibilityState === "visible") requestWake(); });
function openCook(rid, portions) {
  if (modal) closeModal(true);
  const r = recipeById(rid);
  cook.rid = rid; cook.portions = portions; cook.step = 0;
  cook.steps = [{ title: "Mise en place", text: "Sortez et préparez tous les ingrédients avant d'allumer le feu : c'est la règle d'or des cuisines professionnelles.", ing: true }]
    .concat(r.instructions.map(s => { const [t, d] = splitStep(s); return { title: t || "Étape", text: d }; }))
    .concat([{ title: "Bon appétit", text: r.tips && r.tips.length ? r.tips[0] : "Prenez le temps de goûter et d'ajuster l'assaisonnement.", end: true }]);
  const root = $("#cook-root");
  root.innerHTML = `<div class="cook" role="dialog" aria-modal="true" aria-labelledby="cook-title" style="--c:${STYLE_COLOR[r.category]}">
    <header class="cook-top">
      <button type="button" class="x-btn" data-cook-close aria-label="Quitter le mode cuisine">${CLOSE}</button>
      <div class="cook-name"><p class="eyebrow">Mode cuisine · ${portions} ${plur(portions, "portion", "portions")}</p><p id="cook-title">${esc(r.name)}</p></div>
      <span class="cook-wake small muted" id="cook-wake"></span>
    </header>
    <div class="cook-progress"><span id="cook-bar"></span></div>
    <div class="cook-stage" id="cook-stage"></div>
    <div class="cook-timers" id="cook-timers" aria-live="polite"></div>
    <footer class="cook-nav">
      <button type="button" class="btn btn-ghost" data-cook-prev>${ICON.left}<span>Précédent</span></button>
      <span class="cook-count" id="cook-count"></span>
      <button type="button" class="btn btn-primary" data-cook-next><span class="lbl">Suivant</span>${ICON.right}</button>
    </footer>
  </div>`;
  document.body.style.overflow = "hidden";
  $("main").inert = true; $("#topbar").inert = true;
  const el = $(".cook", root);
  anim(el, [{ opacity: 0, transform: "scale(.98)" }, { opacity: 1, transform: "none" }], { duration: 420, easing: E_OUT });
  requestWake().then(() => { $("#cook-wake").textContent = cook.wake ? "Écran maintenu allumé" : ""; });
  drawCookStep(0);
  bindCookSwipe($("#cook-stage"));
  $("[data-cook-next]", root).focus({ preventScroll: true });
}
function closeCook() {
  const root = $("#cook-root"), el = $(".cook", root);
  const done = () => {
    root.innerHTML = "";
    document.body.style.overflow = "";
    $("main").inert = false; $("#topbar").inert = false;
    if (cook.wake) { cook.wake.release().catch(() => {}); cook.wake = null; }
    cook.rid = null;
    if (!cook.timers.some(t => t.running)) { clearInterval(cook.tick); cook.tick = null; }
  };
  if (!el || motionOff()) return done();
  anim(el, [{ opacity: 1 }, { opacity: 0, transform: "scale(.98)" }], { duration: 220, easing: E_IN, fill: "forwards" }).finished.then(done, done);
}
function drawCookStep(dir) {
  const r = recipeById(cook.rid), s = cook.steps[cook.step], n = cook.steps.length;
  const timers = s.ing || s.end ? [] : detectTimers(s.text);
  let body;
  if (s.ing) body = `<ul class="cook-ing">${r.ingredients.map(g => { const l = recipeIngredientLine(g, cook.portions); return `<li><label class="check"><input type="checkbox" class="vh"><span class="tick" aria-hidden="true">${TICK}</span><span class="qty">${esc(l.qty)}</span><span class="txt">${esc(l.name)}</span></label></li>`; }).join("")}</ul>`;
  else if (s.end) body = `<div class="cook-end"><p class="cook-text">${esc(s.text)}</p><p class="eyebrow">Notez ce plat</p>${starsHTML(r.id)}<button type="button" class="btn btn-final" data-cooked="${r.id}" data-from-cook="1">${ICON.done}<span class="lbl">J'ai cuisiné ce plat</span></button></div>`;
  else body = `<p class="cook-text">${esc(s.text)}</p>${timers.length ? `<div class="cook-tbtns">${timers.map(t => `<button type="button" class="btn btn-ghost" data-timer="${t.seconds}" data-tlabel="${esc(s.title)} · ${esc(t.label)}">${ICON.timer}<span>Minuteur ${esc(t.label)}</span></button>`).join("")}</div>` : ""}`;
  const html = `<p class="cook-step-n">${s.ing ? "Avant de commencer" : s.end ? "Terminé" : `Étape ${cook.step} sur ${n - 2}`}</p><h2 class="cook-step-title">${esc(s.title)}</h2>${body}`;
  const stage = $("#cook-stage");
  const pane = document.createElement("div");
  pane.className = "cook-pane";
  pane.innerHTML = html;
  const old = stage.firstElementChild;
  if (old && dir && !motionOff()) {
    old.style.position = "absolute"; old.style.inset = "0";
    anim(old, [{ opacity: 1, transform: "none" }, { opacity: 0, transform: `translateX(${-dir * 60}px)` }], { duration: 240, easing: E_IN, fill: "forwards" }).finished.then(() => old.remove(), () => old.remove());
    stage.appendChild(pane);
    anim(pane, [{ opacity: 0, transform: `translateX(${dir * 90}px)` }, { opacity: 1, transform: "none" }], { duration: 620, delay: 60, easing: E_OUT, fill: "backwards" });
  } else stage.replaceChildren(pane);
  $("#cook-bar").style.width = (cook.step / (n - 1)) * 100 + "%";
  $("#cook-count").textContent = `${cook.step + 1} / ${n}`;
  $("[data-cook-prev]").disabled = cook.step === 0;
  const next = $("[data-cook-next]");
  next.hidden = cook.step === n - 1;
  setLabel(next, cook.step === 0 ? "Commencer" : cook.step === n - 2 ? "Terminer" : "Suivant");
}
function cookGo(d) {
  const k = cook.step + d;
  if (k < 0 || k >= cook.steps.length) return;
  cook.step = k;
  drawCookStep(d);
}
function bindCookSwipe(el) {
  let x0 = null, y0 = null;
  el.addEventListener("pointerdown", e => { if (e.pointerType === "mouse") return; x0 = e.clientX; y0 = e.clientY; });
  el.addEventListener("pointerup", e => {
    if (x0 === null) return;
    const dx = e.clientX - x0, dy = e.clientY - y0;
    x0 = null;
    if (Math.abs(dx) > 60 && Math.abs(dx) > Math.abs(dy) * 1.5) cookGo(dx < 0 ? 1 : -1);
  });
}
function beep() {
  try {
    cook.audio = cook.audio || new (window.AudioContext || window.webkitAudioContext)();
    const ctx = cook.audio;
    [0, 0.35, 0.7].forEach(t => {
      const o = ctx.createOscillator(), g = ctx.createGain();
      o.frequency.value = 880; o.connect(g); g.connect(ctx.destination);
      g.gain.setValueAtTime(0.0001, ctx.currentTime + t);
      g.gain.exponentialRampToValueAtTime(0.3, ctx.currentTime + t + 0.02);
      g.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + t + 0.28);
      o.start(ctx.currentTime + t); o.stop(ctx.currentTime + t + 0.3);
    });
  } catch (e) { /* audio indisponible */ }
  if (navigator.vibrate) navigator.vibrate([300, 150, 300]);
}
const fmtClock = s => `${Math.floor(s / 60)}:${String(Math.max(0, Math.floor(s % 60))).padStart(2, "0")}`;
function addTimer(seconds, label) {
  try { cook.audio = cook.audio || new (window.AudioContext || window.webkitAudioContext)(); cook.audio.resume(); } catch (e) { /* ignore */ }
  cook.timers.push({ id: Date.now() + Math.random(), label, total: seconds, end: Date.now() + seconds * 1000, left: seconds, running: true, done: false });
  if (!cook.tick) cook.tick = setInterval(tickTimers, 250);
  drawTimers();
  toast(`Minuteur lancé : ${label}`);
}
function tickTimers() {
  let any = false;
  cook.timers.forEach(t => {
    if (!t.running) return;
    t.left = (t.end - Date.now()) / 1000;
    if (t.left <= 0) { t.running = false; t.done = true; t.left = 0; beep(); toast(`Minuteur terminé : ${t.label}`, 6000); }
    else any = true;
  });
  drawTimers();
  if (!any && !cook.timers.some(t => t.running)) { clearInterval(cook.tick); cook.tick = null; }
}
function drawTimers() {
  const box = $("#cook-timers");
  if (!box) return;
  box.innerHTML = cook.timers.map(t => `<div class="ctimer${t.done ? " is-done" : ""}${!t.running && !t.done ? " is-paused" : ""}" style="--p:${(1 - t.left / t.total) * 100}%">
    <span class="ct-label">${esc(t.label)}</span><span class="ct-time">${t.done ? "Terminé" : fmtClock(Math.ceil(t.left))}</span>
    ${t.done ? "" : `<button type="button" class="ct-btn" data-tpause="${t.id}" aria-label="${t.running ? "Pause" : "Reprendre"}">${t.running ? ICON.pause : ICON.play}</button>`}
    <button type="button" class="ct-btn" data-tstop="${t.id}" aria-label="Supprimer le minuteur">${ICON.stop}</button></div>`).join("");
}

/* ============================================================
   ÉVÉNEMENTS
   ============================================================ */
const view = $("#view"), modalRoot = $("#modal-root"), cookRoot = $("#cook-root");

$("#tabs").addEventListener("click", e => { const b = e.target.closest("[data-tab]"); if (b) switchTab(b.dataset.tab); });

view.addEventListener("click", e => {
  const t = e.target.closest("button");
  if (!t || t.disabled) return;
  const d = t.dataset;
  if (d.goto !== undefined) return goStep(+d.goto);
  if (t.id === "back") return goStep(state.step - 1);
  if (t.id === "next") return state.step < 5 ? goStep(state.step + 1) : generate();
  if (d.action === "back-plan") { state.view = "plan"; document.body.classList.remove("in-wizard"); renderPlan({ intro: true }); return persist(); }
  if (d.quick) {
    const sel = { all: [0, 1, 2, 3, 4, 5, 6], week: [0, 1, 2, 3, 4], weekend: [5, 6], none: [] }[d.quick];
    const old = state.cfg.days, days = {};
    sel.forEach(k => { days[k] = old[k] || "dinner"; });
    state.cfg.days = days;
    return syncDays();
  }
  if (d.bulk) { Object.keys(state.cfg.days).forEach(k => { state.cfg.days[k] = d.bulk; }); return syncDays(); }
  if (d.people) return setPeople(state.cfg.people + +d.people);
  if (d.preset) {
    const from = state.cfg.budget, to = +d.preset;
    setBudget(to);
    const num = $("#budget-num");
    countTo(from, to, v => { if (document.contains(num)) num.value = Math.round(v); }, 600);
    return;
  }
  if (d.exclude) { addExclude(d.exclude); return; }
  if (d.unexclude !== undefined) { state.cfg.exclude = state.cfg.exclude.filter(x => x !== d.unexclude); return syncDiets(); }
  if (d.fav) return toggleFav(d.fav);
  if (d.open !== undefined) { const sl = state.plan.slots[+d.open]; return openRecipe(sl.rid, t, +d.open); }
  if (d.recipe) return openRecipe(d.recipe, t);
  if (d.replace !== undefined) return replaceSlot(+d.replace, t);
  if (d.pick !== undefined) return startPicker(+d.pick);
  if (d.jump !== undefined) return jumpToDay(+d.jump);
  if (d.action === "cancel-pick") { state.picker = null; state.tab = "plan"; updateTabs(); return render({ intro: true }); }
  if (d.cfilter) {
    const key = d.cfilter, val = key === "diff" ? +d.val : d.val, arr = state.catalog[key];
    state.catalog[key] = arr.includes(val) ? arr.filter(x => x !== val) : arr.concat(val);
    t.classList.toggle("is-active"); t.setAttribute("aria-pressed", state.catalog[key].includes(val));
    return fillCatalog();
  }
  if (d.ctime) { state.catalog.time = d.ctime; $$("[data-ctime]").forEach(b => { b.classList.toggle("is-active", b === t); b.setAttribute("aria-pressed", b === t); }); return fillCatalog(); }
  if (d.ctoggle) { const k = d.ctoggle; state.catalog[k] = !state.catalog[k]; t.classList.toggle("is-active", state.catalog[k]); t.setAttribute("aria-pressed", state.catalog[k]); return fillCatalog(); }
  if (d.action === "reset-filters") { state.catalog = { q: "", styles: [], diff: [], time: "all", fav: false, compatible: false, season: false }; return renderCatalog(); }
  if (d.action === "reset-history") {
    if (confirm("Effacer toute la progression (recettes cuisinées et notes) ? Cette action est définitive.")) { state.history = {}; persist(); renderProgress(); toast("Progression effacée"); }
    return;
  }
  if (t.id === "btn-shop") return openShopping(t);
  if (t.id === "btn-regen") return regenerate(t);
  if (t.id === "btn-edit") return editChoices();
});
function addExclude(raw) {
  const v = String(raw).trim().replace(/\s+/g, " ").slice(0, 40);
  if (!v) return;
  if (state.cfg.exclude.some(x => norm(x) === norm(v))) { toast("Déjà exclu"); return; }
  state.cfg.exclude = state.cfg.exclude.concat(v);
  const n = RECIPES.filter(r => r.ingredients.some(g => norm(g.item).includes(norm(v)))).length;
  toast(n ? `${n} ${plur(n, "recette écartée", "recettes écartées")}` : "Aucune recette ne contient cet ingrédient");
  syncDiets();
}
view.addEventListener("submit", e => {
  if (e.target.id !== "ex-form") return;
  e.preventDefault();
  const inp = $("#ex-input");
  addExclude(inp.value);
  inp.value = "";
  inp.focus();
});
view.addEventListener("change", e => {
  const t = e.target, d = t.dataset;
  if (d.day !== undefined) {
    const k = +d.day;
    if (t.checked) state.cfg.days[k] = state.cfg.days[k] || "dinner"; else delete state.cfg.days[k];
    return syncDays();
  }
  if (d.meal !== undefined) { state.cfg.days[+d.meal] = t.value; return syncDays(); }
  if (t.id === "sw-leftovers") { state.cfg.leftovers = t.checked; return syncDays(); }
  if (t.id === "sw-season") { state.cfg.seasonal = t.checked; return updateStepValues(); }
  if (d.level !== undefined) { state.cfg.level = t.value; $(".seg-level").dataset.lv = t.value; return updateStepValues(); }
  if (d.style) {
    const s = new Set(state.cfg.styles);
    t.checked ? s.add(d.style) : s.delete(d.style);
    state.cfg.styles = STYLES.map(x => x.id).filter(id => s.has(id));
    return syncPool();
  }
  if (d.diet) {
    if (d.diet === "none") state.cfg.diets = [];
    else { const s = new Set(state.cfg.diets); t.checked ? s.add(d.diet) : s.delete(d.diet); state.cfg.diets = DIETS.map(x => x.id).filter(id => s.has(id)); }
    $$("#stage [data-diet]").forEach(i => { i.checked = i.dataset.diet === "none" ? state.cfg.diets.length === 0 : state.cfg.diets.includes(i.dataset.diet); });
    return syncPool();
  }
  if (d.equip) {
    const s = new Set(state.cfg.equip);
    t.checked ? s.add(d.equip) : s.delete(d.equip);
    state.cfg.equip = EQUIP.map(x => x.id).filter(id => s.has(id));
    return syncPool();
  }
  if (t.id === "people-input") { setPeople(parseInt(t.value, 10) || state.cfg.people); t.value = state.cfg.people; }
  if (t.id === "budget-num") setBudget(parseFloat(t.value) || state.cfg.budget);
});
let searchTimer;
view.addEventListener("input", e => {
  const t = e.target;
  if (t.id === "people-input") { const v = parseInt(t.value, 10); if (v >= 1 && v <= 8) setPeople(v); }
  if (t.id === "budget-range") setBudget(+t.value, true);
  if (t.id === "budget-num") { const v = parseFloat(t.value); if (v >= 20 && v <= 400) setBudget(v, true); }
  if (t.id === "cat-q") { state.catalog.q = t.value; clearTimeout(searchTimer); searchTimer = setTimeout(() => fillCatalog(false), 120); }
});

modalRoot.addEventListener("click", e => {
  const t = e.target;
  if (t.closest("[data-close]") || t.matches("[data-overlay]") || t.matches(".sheet-wrap")) return closeModal();
  const b = t.closest("button");
  if (!b) return;
  if (b.id === "copy-btn") return copyShopping();
  if (b.id === "share-btn") return shareShopping();
  if (b.dataset.fav) return toggleFav(b.dataset.fav);
  if (b.dataset.assign) return assignFromPicker(b.dataset.assign);
  if (b.dataset.cook) return openCook(b.dataset.cook, +b.dataset.portions);
  if (b.dataset.rate) return rate(b);
  if (b.dataset.cooked) { const h = markCooked(b.dataset.cooked); setLabel(b, `Cuisiné ${h.n} fois · encore`); refreshAfterHistory(); }
});
function rate(b) {
  const rid = b.dataset.rid, n = +b.dataset.rate;
  markCooked(rid, n);
  $$(`.star[data-rid="${rid}"]`).forEach(s => { const on = +s.dataset.rate <= n; s.classList.toggle("on", on); s.setAttribute("aria-checked", +s.dataset.rate === n); if (on) anim(s, [{ transform: "scale(.6)" }, { transform: "scale(1.2)" }, { transform: "none" }], { duration: 420, delay: (+s.dataset.rate - 1) * 50, easing: E_SPRING }); });
  refreshAfterHistory();
}
function refreshAfterHistory() {
  if (state.tab === "progress") renderProgress();
  if (state.tab === "catalog") fillCatalog(false);
}
modalRoot.addEventListener("change", e => {
  const t = e.target;
  if (t.dataset.item !== undefined) { t.checked ? state.checked.add(t.dataset.item) : state.checked.delete(t.dataset.item); updateChecked(); persist(); }
  if (t.dataset.pantry !== undefined) { t.checked ? state.pantry.add(t.dataset.pantry) : state.pantry.delete(t.dataset.pantry); persist(); }
});
cookRoot.addEventListener("click", e => {
  const b = e.target.closest("button");
  if (!b) return;
  if (b.hasAttribute("data-cook-close")) return closeCook();
  if (b.hasAttribute("data-cook-next")) return cookGo(1);
  if (b.hasAttribute("data-cook-prev")) return cookGo(-1);
  if (b.dataset.timer) return addTimer(+b.dataset.timer, b.dataset.tlabel);
  if (b.dataset.tstop) { cook.timers = cook.timers.filter(t => String(t.id) !== b.dataset.tstop); return drawTimers(); }
  if (b.dataset.tpause) {
    const t = cook.timers.find(x => String(x.id) === b.dataset.tpause);
    if (t.running) { t.running = false; t.left = (t.end - Date.now()) / 1000; } else { t.running = true; t.end = Date.now() + t.left * 1000; if (!cook.tick) cook.tick = setInterval(tickTimers, 250); }
    return drawTimers();
  }
  if (b.dataset.rate) return rate(b);
  if (b.dataset.cooked) { markCooked(b.dataset.cooked); refreshAfterHistory(); setTimeout(closeCook, 600); }
});

document.addEventListener("keydown", e => {
  if (cook.rid && $("#cook-root .cook")) {
    if (e.key === "Escape") { e.preventDefault(); return closeCook(); }
    if (e.key === "ArrowRight") return cookGo(1);
    if (e.key === "ArrowLeft") return cookGo(-1);
    return;
  }
  const dlg = $("#modal-root .sheet");
  if (!dlg) return;
  if (e.key === "Escape") { e.preventDefault(); return closeModal(); }
  if (e.key !== "Tab") return;
  const f = $$('button, [href], input:not([type="hidden"]), textarea, [tabindex]:not([tabindex="-1"])', dlg).filter(x => !x.disabled && !x.closest("[hidden]"));
  if (!f.length) return;
  const first = f[0], last = f[f.length - 1];
  if (e.shiftKey && (document.activeElement === first || document.activeElement === dlg)) { e.preventDefault(); last.focus(); }
  else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
});
document.addEventListener("click", () => persist(), true);
document.addEventListener("change", () => persist(), true);
window.addEventListener("pagehide", save);

window.addEventListener("scroll", () => {
  $("#topbar").classList.toggle("is-scrolled", window.scrollY > 4);
  const track = $("#daynav");
  if (track && track._set && Date.now() > jumpLock && window.innerHeight + window.scrollY >= document.documentElement.scrollHeight - 4) {
    const last = $$("button", track).pop();
    track._set(+last.dataset.jump);
  }
}, { passive: true });
let resizeRaf;
window.addEventListener("resize", () => {
  cancelAnimationFrame(resizeRaf);
  resizeRaf = requestAnimationFrame(() => {
    placeStepPill(true);
    updateTabs(true);
    const track = $("#daynav"), act = track && $("button.is-active", track);
    if (act) movePill($(".daynav-pill", track), act, true);
  });
});
$("#theme-btn").addEventListener("click", toggleTheme);

/* installation (PWA) */
let installEvt = null;
window.addEventListener("beforeinstallprompt", e => { e.preventDefault(); installEvt = e; $("#install-btn").hidden = false; });
$("#install-btn").addEventListener("click", async () => {
  if (!installEvt) return;
  installEvt.prompt();
  await installEvt.userChoice.catch(() => {});
  installEvt = null;
  $("#install-btn").hidden = true;
});
if ("serviceWorker" in navigator && /^https?:/.test(location.protocol)) {
  window.addEventListener("load", () => navigator.serviceWorker.register("sw.js").catch(() => {}));
}

/* démarrage */
load();
updateTabs(true);
render({ intro: true });
if (document.fonts && document.fonts.ready) document.fonts.ready.then(() => { placeStepPill(true); updateTabs(true); const tr = $("#daynav"), a = tr && $("button.is-active", tr); if (a) movePill($(".daynav-pill", tr), a, true); });
