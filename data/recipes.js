/* ============================================================
   MIJOTE : BASE DE DONNÉES DES RECETTES
   costPerPerson est recalculé à partir de data/catalog.js (PRICES) au chargement.
   Quantités (baseQty) calculées pour 1 personne.
   Tags diet : sans-porc, halal, sans-lactose, sans-gluten, vegetarien, vegan
   Équipements : base, four, airfryer, micro-ondes, mixeur, vapeur
   difficulty : 1 facile, 2 intermédiaire, 3 avancé
   instructions : "Titre de l'étape|Texte" ; skills : techniques travaillées ; tips : astuces de chef
   ============================================================ */
const T = { SP: "sans-porc", H: "halal", SL: "sans-lactose", SG: "sans-gluten", VG: "vegetarien", VN: "vegan" };
const i = (item, baseQty, unit = "g") => ({ item, baseQty, unit });
const RECIPES = [];

/* ---------- PROTÉINÉ / FITNESS ---------- */
RECIPES.push(
{
  id: "p01", name: "Poulet à la peau croustillante, riz pilaf, brocolis grillés et sauce citron", category: "proteine",
  diet: [T.SP, T.H], equipments: ["base"], prepTime: 15, cookTime: 30, difficulty: 2,
  costPerPerson: 3.4, calories: 650, protein: 43,
  skills: ["Riz pilaf", "Saisir une volaille côté peau", "Déglacer et monter au beurre"],
  ingredients: [i("Haut de cuisse de poulet désossé", 170), i("Riz basmati", 70), i("Oignon", 0.25, "pièce"), i("Bouillon de volaille (cube)", 0.25, "pièce"), i("Brocoli", 150), i("Citron", 0.5, "pièce"), i("Ail", 2, "gousse"), i("Thym", 0.5, "càc"), i("Beurre", 10), i("Huile d'olive", 15, "ml"), i("Persil plat", 5)],
  instructions: [
    "Mise en place|Sortir le poulet du réfrigérateur 15 minutes avant et l'éponger au papier absorbant : une peau sèche dore, une peau humide bout. Saler les deux faces. Émincer finement l'oignon, écraser les gousses d'ail avec le plat du couteau, détailler le brocoli en bouquets.",
    "Riz pilaf|Faire suer l'oignon 3 minutes dans un filet d'huile, sans coloration. Ajouter le riz non rincé et remuer 1 à 2 minutes jusqu'à ce que les grains deviennent translucides sur les bords : c'est le nacrage, il enrobe l'amidon de gras et garde les grains séparés. Verser 1,5 fois le volume du riz en bouillon chaud, couvrir et cuire 12 minutes à feu très doux sans remuer, puis 5 minutes hors du feu.",
    "Saisir côté peau|Chauffer 1 cuillère d'huile dans une poêle à feu moyen-vif. Poser le poulet côté peau et ne plus y toucher pendant 8 à 10 minutes : la peau se décolle d'elle-même quand elle est dorée. Appuyer avec une spatule les premières secondes pour qu'elle reste bien à plat.",
    "Finir la cuisson|Retourner, ajouter l'ail et le thym, baisser à feu moyen et cuire 6 à 8 minutes. Le poulet est cuit quand le jus qui s'écoule à la piqûre est clair (74 °C à cœur). Réserver peau vers le haut pour qu'elle reste croustillante.",
    "Brocolis grillés|Dans la même poêle, saisir les bouquets 4 minutes dans la graisse du poulet sans trop remuer pour les colorer, puis ajouter 3 cuillères à soupe d'eau et couvrir 2 minutes : ils finissent à la vapeur et restent croquants.",
    "Sauce minute|Retirer les brocolis. Verser le jus du citron et 4 cuillères à soupe d'eau, gratter les sucs collés au fond avec une spatule : c'est le déglaçage, tout le goût est là. Réduire de moitié, couper le feu et incorporer le beurre froid en remuant jusqu'à ce que la sauce devienne brillante.",
    "Dresser|Égrainer le riz à la fourchette avec le persil ciselé. Trancher le poulet, napper de sauce et servir avec les brocolis."
  ],
  tips: ["Si les morceaux se touchent dans la poêle, la vapeur les empêche de dorer : cuisez en deux fois si besoin.", "Le beurre se monte hors du feu. Trop chaud, il se sépare et la sauce devient grasse au lieu d'être liée."]
},
{
  id: "p02", name: "Bœuf sauté gingembre-ail façon wok, brocolis et riz jasmin", category: "proteine",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["base"], prepTime: 20, cookTime: 15, difficulty: 2,
  costPerPerson: 4.4, calories: 590, protein: 41,
  skills: ["Couper une viande contre les fibres", "Velouter à la fécule", "Cuisson au wok à feu vif"],
  ingredients: [i("Bœuf à sauter", 140), i("Fécule de maïs", 8), i("Tamari (sauce soja sans gluten)", 20, "ml"), i("Miel", 1, "càc"), i("Gingembre frais", 10), i("Ail", 2, "gousse"), i("Brocoli", 150), i("Oignon vert", 1, "pièce"), i("Riz jasmin", 70), i("Huile neutre", 15, "ml"), i("Huile de sésame", 5, "ml"), i("Graines de sésame", 5)],
  instructions: [
    "Trancher la viande|Repérer le sens des fibres (les lignes parallèles sur la viande) et couper des lamelles de 3 mm perpendiculairement à elles : les fibres raccourcies rendent chaque bouchée tendre. Un passage de 15 minutes au congélateur avant facilite la découpe.",
    "Velouter|Mélanger le bœuf avec la moitié de la fécule, 1 cuillère de tamari et 1 cuillère d'huile neutre. Laisser 15 minutes : cette fine pellicule protège la viande de la chaleur violente et la garde juteuse.",
    "Sauce|Délayer le reste de fécule dans le reste du tamari, le miel et 4 cuillères à soupe d'eau. Râper le gingembre, hacher l'ail, séparer le blanc et le vert de l'oignon vert.",
    "Riz jasmin|Rincer le riz jusqu'à ce que l'eau soit presque claire, le cuire avec 1,3 fois son volume d'eau, couvert, 12 minutes à feu très doux puis 5 minutes hors du feu.",
    "Brocolis|Faire chauffer le wok à vide jusqu'à ce qu'il fume légèrement. Ajouter un filet d'huile, sauter les brocolis 2 minutes, verser 3 cuillères d'eau, couvrir 2 minutes, puis réserver.",
    "Saisir le bœuf|Remettre de l'huile, étaler la viande en une seule couche et ne pas y toucher 1 minute pour qu'elle colore, puis sauter 1 minute de plus. Elle doit rester rosée : elle finira dans la sauce.",
    "Assembler|Ajouter ail, gingembre et blanc d'oignon 30 secondes, remettre les brocolis, verser la sauce et mélanger 30 à 60 secondes jusqu'à ce qu'elle nappe et brille. Finir à l'huile de sésame, au vert d'oignon et aux graines. Servir sur le riz."
  ],
  tips: ["Le secret du wok : tout est coupé et prêt avant d'allumer le feu, la cuisson ne laisse pas le temps de préparer.", "Trop de viande d'un coup fait chuter la température : elle bout au lieu de saisir. Cuisez en deux fois pour plus de 2 personnes."]
},
{
  id: "p03", name: "Saumon laqué tamari-miel au four, riz vinaigré et concombre mariné", category: "proteine",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["base", "four"], prepTime: 20, cookTime: 20, difficulty: 2,
  costPerPerson: 5.2, calories: 640, protein: 38,
  skills: ["Laquer au four", "Pickles express", "Assaisonner un riz"],
  ingredients: [i("Pavé de saumon", 130), i("Tamari (sauce soja sans gluten)", 20, "ml"), i("Miel", 2, "càc"), i("Gingembre frais", 5), i("Ail", 1, "gousse"), i("Riz jasmin", 70), i("Vinaigre de riz", 2, "càs"), i("Sucre", 1, "càc"), i("Concombre", 100), i("Avocat", 0.5, "pièce"), i("Oignon vert", 1, "pièce"), i("Graines de sésame", 5), i("Citron vert", 0.5, "pièce")],
  instructions: [
    "Pickles express|Couper le concombre en fines rondelles, les mélanger avec 1 cuillère de vinaigre de riz, la moitié du sucre et une pincée de sel. Laisser au frais : le sel et l'acidité les rendent croquants et acidulés en 15 minutes.",
    "Laque|Mélanger tamari, miel, gingembre râpé et ail écrasé. Réserver un tiers de cette laque pour la fin.",
    "Riz assaisonné|Cuire le riz rincé avec 1,3 fois son volume d'eau, couvert, 12 minutes puis 5 minutes de repos. Mélanger délicatement avec le reste du vinaigre de riz et du sucre, en soulevant à la spatule sans écraser les grains.",
    "Cuire le saumon|Préchauffer le four à 200 °C. Poser le saumon sur une plaque couverte de papier cuisson, badigeonner de laque et enfourner 10 minutes.",
    "Laquer|Badigeonner une seconde fois et passer 2 à 3 minutes sous le gril, en surveillant : le miel caramélise en quelques secondes. Le cœur doit rester légèrement nacré et se détacher en lamelles.",
    "Dresser|Répartir le riz, poser le saumon, les concombres égouttés et l'avocat tranché arrosé de citron vert. Napper de la laque réservée, parsemer de sésame et d'oignon vert."
  ],
  tips: ["Un saumon trop cuit devient sec et blanchâtre en surface : sortez-le dès que la chair s'effeuille sous la pression du doigt.", "Le gril change tout : la laque doit bulle et brunir sur les bords, pas noircir."]
},
{
  id: "p04", name: "Escalope de dinde panée aux herbes, purée de patate douce et salade croquante", category: "proteine",
  diet: [T.SP, T.H, T.SL], equipments: ["base"], prepTime: 20, cookTime: 20, difficulty: 2,
  costPerPerson: 3.2, calories: 620, protein: 45,
  skills: ["Paner à l'anglaise", "Aplatir une escalope", "Purée lisse sans beurre"],
  ingredients: [i("Escalope de dinde", 150), i("Farine de blé", 15), i("Œuf", 0.5, "pièce"), i("Panko", 30), i("Persil plat", 5), i("Citron", 0.5, "pièce"), i("Patate douce", 250), i("Huile d'olive", 25, "ml"), i("Roquette", 40), i("Radis", 40), i("Moutarde", 1, "càc")],
  instructions: [
    "Purée|Éplucher la patate douce, la couper en cubes réguliers (même taille, même cuisson) et la cuire 15 minutes dans l'eau salée froide portée à ébullition. Elle est prête quand un couteau s'enfonce sans résistance.",
    "Aplatir|Placer l'escalope entre deux feuilles de papier cuisson et la taper avec le fond d'une casserole jusqu'à 1 cm d'épaisseur régulière : elle cuira uniformément et vite.",
    "Paner à l'anglaise|Préparer trois assiettes : farine, œuf battu salé, panko mélangé au persil haché et au zeste du citron. Passer l'escalope dans chacune en tapotant entre chaque étape. La farine sèche la surface, l'œuf colle, la chapelure croustille.",
    "Cuire|Chauffer 2 cuillères d'huile à feu moyen : une miette de pain doit grésiller vivement. Cuire 3 à 4 minutes par face sans bouger l'escalope, jusqu'à une panure bien dorée. Égoutter sur papier absorbant.",
    "Finir la purée|Égoutter la patate douce, l'écraser avec le reste d'huile, du sel et du poivre, puis fouetter 1 minute pour l'alléger.",
    "Salade|Trancher finement les radis, mélanger avec la roquette, la moutarde, un trait de jus de citron et un filet d'huile. Servir l'escalope avec un quartier de citron."
  ],
  tips: ["Une huile pas assez chaude fait boire la panure : elle devient grasse et molle.", "Le panko, chapelure japonaise en gros flocons, reste croustillant bien plus longtemps qu'une chapelure fine."]
},
{
  id: "p05", name: "Keftas de bœuf grillées, boulgour aux herbes et sauce yaourt-tahini", category: "proteine",
  diet: [T.SP, T.H], equipments: ["base"], prepTime: 25, cookTime: 15, difficulty: 2,
  costPerPerson: 4.0, calories: 680, protein: 42,
  skills: ["Assaisonner une farce", "Taboulé de boulgour", "Sauce émulsionnée au tahini"],
  ingredients: [i("Bœuf haché 15 % MG", 140), i("Oignon", 0.25, "pièce"), i("Persil plat", 15), i("Menthe fraîche", 5), i("Cumin moulu", 1, "càc"), i("Coriandre moulue", 0.5, "càc"), i("Paprika fumé", 0.5, "càc"), i("Boulgour", 60), i("Tomate", 100), i("Concombre", 60), i("Citron", 0.5, "pièce"), i("Yaourt grec", 60), i("Tahini", 10), i("Ail", 0.5, "gousse"), i("Huile d'olive", 15, "ml")],
  instructions: [
    "Boulgour|Verser le boulgour dans un saladier avec une pincée de sel, couvrir de son volume d'eau bouillante, couvrir et laisser gonfler 15 minutes.",
    "Farce|Râper l'oignon et presser le jus avec les mains (sinon les keftas se délitent). Mélanger avec le bœuf, la moitié du persil ciselé, les épices, sel et poivre. Pétrir 1 minute : la viande devient légèrement collante, c'est ce qui la fait tenir.",
    "Goûter|Cuire une noisette de farce à la poêle et la goûter pour ajuster sel et épices avant de tout façonner : c'est le réflexe des pros.",
    "Façonner|Avec les mains humides, former des boudins de 8 cm. Les réserver 10 minutes au frais pour qu'ils se raffermissent.",
    "Sauce|Fouetter le yaourt, le tahini, l'ail râpé et un trait de citron. Si elle épaissit (le tahini fige), ajouter de l'eau froide cuillère par cuillère jusqu'à une texture nappante.",
    "Griller|Chauffer une poêle ou un gril bien chaud légèrement huilé. Cuire les keftas 8 à 10 minutes en les tournant sur toutes les faces, jusqu'à ce qu'elles soient bien colorées et cuites à cœur.",
    "Taboulé|Égrainer le boulgour, ajouter tomate et concombre en petits dés, le reste du persil, la menthe, le jus de citron restant et l'huile. Rectifier le sel. Servir avec les keftas et la sauce."
  ],
  tips: ["Un taboulé libanais, c'est d'abord des herbes : n'hésitez pas à doubler le persil.", "Le bœuf haché se mange toujours cuit à cœur : contrairement à un steak entier, les bactéries de surface sont mélangées dans toute la masse."]
},
{
  id: "p06", name: "Cabillaud en croûte d'amandes et herbes, lentilles vertes à la moutarde", category: "proteine",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["base", "four"], prepTime: 20, cookTime: 30, difficulty: 2,
  costPerPerson: 4.8, calories: 560, protein: 44,
  skills: ["Croûte sans chapelure", "Lentilles fermes", "Vinaigrette chaude"],
  ingredients: [i("Dos de cabillaud", 150), i("Amandes", 20), i("Persil plat", 10), i("Citron", 0.5, "pièce"), i("Moutarde", 2, "càc"), i("Lentilles vertes", 70), i("Carotte", 60), i("Échalote", 1, "pièce"), i("Laurier", 1, "feuille"), i("Vinaigre de cidre", 1, "càs"), i("Huile d'olive", 20, "ml")],
  instructions: [
    "Lentilles|Rincer les lentilles, les couvrir de 3 fois leur volume d'eau froide avec la feuille de laurier, porter à frémissement et cuire 20 à 25 minutes sans saler : le sel en début de cuisson durcit leur peau. Elles doivent rester entières et légèrement fermes.",
    "Brunoise|Pendant ce temps, tailler la carotte en tout petits dés de 3 mm (une brunoise) et ciseler l'échalote. Les faire suer 4 minutes dans un filet d'huile.",
    "Croûte|Hacher grossièrement les amandes et le persil, ajouter le zeste du citron, sel, poivre et 1 cuillère d'huile pour obtenir une pâte granuleuse.",
    "Cuire le poisson|Préchauffer le four à 200 °C. Saler le cabillaud, le badigeonner d'une cuillère de moutarde, presser la croûte dessus et enfourner 10 à 12 minutes. Il est cuit quand la chair devient opaque et se sépare en feuillets.",
    "Vinaigrette chaude|Égoutter les lentilles, les ajouter à la brunoise avec le vinaigre, le reste de moutarde et d'huile, saler. Chaudes, elles absorbent l'assaisonnement bien mieux que froides.",
    "Dresser|Servir le poisson sur les lentilles avec un trait de jus de citron."
  ],
  tips: ["La moutarde sert de colle à la croûte et apporte du peps sans masquer le poisson.", "Le cabillaud continue de cuire quelques minutes hors du four : sortez-le juste avant qu'il ne soit parfait."]
},
{
  id: "p07", name: "Poulet tandoori rôti, riz au curcuma et raïta concombre-menthe", category: "proteine",
  diet: [T.SP, T.H, T.SG], equipments: ["base", "four"], prepTime: 20, cookTime: 25, difficulty: 2,
  costPerPerson: 3.6, calories: 620, protein: 48,
  skills: ["Marinade lactique", "Rôtir à haute température", "Riz parfumé aux épices entières"],
  ingredients: [i("Blanc de poulet", 160), i("Yaourt grec", 90), i("Garam masala", 1, "càc"), i("Paprika fumé", 1, "càc"), i("Curcuma", 0.5, "càc"), i("Gingembre frais", 8), i("Ail", 1, "gousse"), i("Citron", 0.5, "pièce"), i("Riz basmati", 70), i("Oignon", 0.25, "pièce"), i("Concombre", 80), i("Menthe fraîche", 5), i("Huile neutre", 10, "ml")],
  instructions: [
    "Mariner|Entailler le poulet de trois coups de couteau. Mélanger les deux tiers du yaourt avec garam masala, paprika, la moitié du curcuma, gingembre et ail râpés, jus de citron et sel. Enrober et laisser au moins 30 minutes (idéalement la veille) : l'acidité du yaourt attendrit la viande en douceur.",
    "Rôtir|Préchauffer le four à 230 °C. Poser le poulet sur une grille au-dessus d'une plaque pour que l'air circule. Rôtir 18 à 22 minutes : les bords doivent noircir légèrement, comme dans un four tandoor.",
    "Riz au curcuma|Faire revenir l'oignon émincé dans l'huile 3 minutes, ajouter le reste de curcuma 20 secondes (les épices libèrent leurs arômes dans le gras), puis le riz rincé. Mouiller de 1,5 fois son volume d'eau salée, couvrir et cuire 12 minutes à feu doux, puis 5 minutes de repos.",
    "Raïta|Râper le concombre, le presser dans un torchon pour retirer l'eau, mélanger avec le reste du yaourt, la menthe ciselée et une pincée de sel.",
    "Reposer et servir|Laisser reposer le poulet 5 minutes avant de le trancher pour que les jus se répartissent. Servir avec le riz et la raïta bien froide."
  ],
  tips: ["Le contraste chaud-épicé et froid-frais est la clé du plat : gardez la raïta au réfrigérateur jusqu'au dernier moment.", "Sans grille, surélevez le poulet sur des rondelles d'oignon : il ne baignera pas dans son jus."]
},
{
  id: "p08", name: "Chili con carne mijoté, riz et crème au citron vert", category: "proteine",
  diet: [T.SP, T.H, T.SG], equipments: ["base"], prepTime: 15, cookTime: 50, difficulty: 2,
  costPerPerson: 3.5, calories: 690, protein: 44,
  skills: ["Torréfier des épices", "Mijotage long", "Équilibrer acidité et sucre"],
  ingredients: [i("Bœuf haché 15 % MG", 140), i("Oignon", 0.5, "pièce"), i("Poivron rouge", 0.5, "pièce"), i("Ail", 2, "gousse"), i("Cumin moulu", 1, "càc"), i("Paprika fumé", 1, "càc"), i("Origan", 0.5, "càc"), i("Concentré de tomate", 1, "càs"), i("Tomates concassées", 150), i("Haricots rouges (boîte)", 100), i("Riz basmati", 60), i("Yaourt grec", 40), i("Citron vert", 0.5, "pièce"), i("Coriandre fraîche", 5), i("Huile d'olive", 10, "ml")],
  instructions: [
    "Saisir le bœuf|Chauffer l'huile dans une cocotte à feu vif. Étaler la viande et la laisser colorer 3 minutes sans remuer avant de l'émietter : la croûte brune (réaction de Maillard) donne la profondeur du chili. Réserver.",
    "Base aromatique|Dans la même cocotte, faire revenir l'oignon et le poivron en dés 6 minutes, puis l'ail 1 minute.",
    "Épices et concentré|Ajouter cumin, paprika, origan et concentré de tomate. Remuer 1 minute jusqu'à ce que le concentré fonce : il perd son goût de métal et devient sucré.",
    "Mijoter|Remettre la viande, les tomates et 100 ml d'eau par personne. Couvrir à moitié et laisser frémir 30 minutes, puis ajouter les haricots rincés et poursuivre 10 minutes. Goûter : un trait de citron vert et une pincée de sucre équilibrent l'acidité si besoin.",
    "Riz|Cuire le riz rincé dans 2 fois son volume d'eau salée, couvert, 12 minutes.",
    "Crème au citron vert|Mélanger le yaourt avec le zeste et un peu de jus de citron vert. Servir le chili sur le riz, avec une cuillère de crème et la coriandre."
  ],
  tips: ["Le chili est meilleur réchauffé le lendemain : les épices ont le temps de se fondre.", "Le concentré de tomate « pincé » (cuit dans le gras) est un réflexe de chef dans toutes les sauces tomate."]
},
{
  id: "p09", name: "Omelette baveuse au comté, champignons poêlés et salade à la moutarde", category: "proteine",
  diet: [T.SP, T.H, T.SG, T.VG], equipments: ["base"], prepTime: 10, cookTime: 15, difficulty: 2,
  costPerPerson: 2.6, calories: 520, protein: 32,
  skills: ["Omelette roulée baveuse", "Poêler des champignons", "Vinaigrette émulsionnée"],
  ingredients: [i("Œuf", 3, "pièce"), i("Beurre", 15), i("Comté", 30), i("Champignons de Paris", 150), i("Échalote", 0.5, "pièce"), i("Ciboulette", 5), i("Salade verte", 60), i("Moutarde", 1, "càc"), i("Vinaigre de cidre", 1, "càc"), i("Huile d'olive", 15, "ml")],
  instructions: [
    "Champignons|Émincer les champignons. Les saisir à feu vif dans une poêle chaude avec un filet d'huile, sans sel : salés trop tôt, ils rendent leur eau et bouillent. Quand ils sont dorés (5 minutes), ajouter l'échalote ciselée, saler, poivrer. Réserver.",
    "Vinaigrette|Dans un bol, fouetter la moutarde, le vinaigre et le sel, puis verser l'huile en filet en fouettant : la moutarde lie l'huile et le vinaigre en une sauce crémeuse.",
    "Battre les œufs|Battre les œufs à la fourchette avec sel et poivre, juste assez pour mélanger blancs et jaunes, sans les faire mousser.",
    "Cuire|Chauffer une poêle antiadhésive à feu moyen, ajouter le beurre. Quand il mousse sans brunir, verser les œufs. Remuer vivement avec une spatule en secouant la poêle 30 secondes, puis laisser prendre 30 secondes : le dessus doit rester crémeux.",
    "Garnir et rouler|Parsemer de comté râpé et de la moitié des champignons, incliner la poêle et rouler l'omelette sur elle-même vers le bord. La faire glisser dans l'assiette.",
    "Servir|Ajouter le reste des champignons et la ciboulette. Assaisonner la salade au dernier moment pour qu'elle reste croquante."
  ],
  tips: ["Une omelette réussie ne colore pas : si elle brunit, le feu est trop fort.", "La chaleur résiduelle finit la cuisson : sortez-la toujours un peu avant qu'elle vous semble prête."]
},
{
  id: "p10", name: "Aiguillettes de poulet yaourt-citron à l'air fryer, grenailles et sauce verte", category: "proteine",
  diet: [T.SP, T.H, T.SG], equipments: ["airfryer"], prepTime: 20, cookTime: 25, difficulty: 1,
  costPerPerson: 3.4, calories: 560, protein: 46,
  skills: ["Marinade au yaourt", "Cuisson en deux temps à l'air fryer", "Sauce aux herbes"],
  ingredients: [i("Blanc de poulet", 160), i("Yaourt grec", 90), i("Citron", 0.5, "pièce"), i("Ail", 1, "gousse"), i("Paprika doux", 1, "càc"), i("Pomme de terre grenaille", 220), i("Huile d'olive", 15, "ml"), i("Persil plat", 10), i("Ciboulette", 5), i("Câpres", 1, "càs")],
  instructions: [
    "Mariner|Couper le poulet en aiguillettes. Mélanger la moitié du yaourt avec le zeste et la moitié du jus de citron, l'ail écrasé, le paprika et du sel. Enrober et laisser 20 minutes minimum.",
    "Précuire les pommes de terre|Couper les grenailles en deux, les enrober de la moitié de l'huile, sel et poivre. Cuire 12 minutes à 200 °C en secouant le panier à mi-parcours.",
    "Sauce verte|Hacher finement persil, ciboulette et câpres. Mélanger avec le reste du yaourt, d'huile et de jus de citron. Saler : elle doit être vive et acidulée.",
    "Cuire le poulet|Égoutter l'excès de marinade (sinon elle brûle) et ajouter le poulet sur les pommes de terre. Poursuivre 10 à 12 minutes à 190 °C en retournant à mi-cuisson, jusqu'à des bords grillés et un cœur cuit sans rose.",
    "Servir|Dresser le poulet et les grenailles, napper de sauce verte."
  ],
  tips: ["Ne surchargez pas le panier : l'air doit circuler autour de chaque morceau, sinon tout cuit à la vapeur.", "Les câpres apportent le sel et l'acidité qui réveillent la sauce : rincez-les si elles sont au sel."]
},
{
  id: "p11", name: "Saumon vapeur au gingembre, riz, épinards et sauce tamari-sésame", category: "proteine",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["vapeur"], prepTime: 10, cookTime: 25, difficulty: 1,
  costPerPerson: 5.0, calories: 580, protein: 36,
  skills: ["Cuisson vapeur douce", "Sauce sans cuisson", "Parfumer à l'huile chaude"],
  ingredients: [i("Pavé de saumon", 130), i("Riz jasmin", 70), i("Épinards frais", 120), i("Gingembre frais", 10), i("Oignon vert", 1, "pièce"), i("Tamari (sauce soja sans gluten)", 15, "ml"), i("Vinaigre de riz", 1, "càc"), i("Huile de sésame", 5, "ml"), i("Huile neutre", 10, "ml"), i("Graines de sésame", 5)],
  instructions: [
    "Riz|Rincer le riz, le mettre dans la cuve du cuiseur avec l'eau indiquée par la notice et lancer la cuisson.",
    "Aromates|Tailler le gingembre en très fines allumettes et l'oignon vert en longs filaments.",
    "Vapeur douce|Saler le saumon, le poser dans le panier sur la moitié du gingembre. Cuire 8 à 10 minutes : la chair doit rester juste nacrée au centre. Ajouter les épinards dans le panier pour les 2 dernières minutes.",
    "Sauce|Mélanger tamari, vinaigre de riz et huile de sésame.",
    "Huile grésillante|Disposer le reste de gingembre et l'oignon vert sur le saumon. Chauffer l'huile neutre jusqu'à ce qu'elle frémisse et la verser dessus : elle grésille et libère instantanément les arômes, une technique cantonaise.",
    "Servir|Napper de sauce, parsemer de sésame et servir avec le riz et les épinards."
  ],
  tips: ["La vapeur est la cuisson la plus tolérante pour le poisson, mais quelques minutes de trop suffisent à le dessécher.", "Le coup d'huile chaude transforme un plat vapeur sage en plat parfumé : ne le sautez pas."]
},
{
  id: "p12", name: "Steak haché façon bistrot, sauce échalote et pommes grenaille sautées", category: "proteine",
  diet: [T.SP, T.H, T.SG], equipments: ["base"], prepTime: 15, cookTime: 30, difficulty: 2,
  costPerPerson: 4.2, calories: 700, protein: 40,
  skills: ["Façonner un steak", "Sauce de déglaçage", "Pommes sautées"],
  ingredients: [i("Bœuf haché 15 % MG", 160), i("Échalote", 1.5, "pièce"), i("Vinaigre de cidre", 1, "càs"), i("Crème liquide 30 %", 30, "ml"), i("Moutarde à l'ancienne", 1, "càc"), i("Pomme de terre grenaille", 220), i("Haricots verts", 120), i("Beurre", 15), i("Huile d'olive", 15, "ml"), i("Persil plat", 5), i("Thym", 0.5, "càc")],
  instructions: [
    "Pommes de terre|Couper les grenailles en deux, les cuire 8 minutes à l'eau bouillante salée, égoutter et laisser sécher à l'air 5 minutes.",
    "Façonner|Former le steak sans trop le tasser (un steak compressé devient caoutchouteux), sur 2,5 cm d'épaisseur. Creuser légèrement le centre avec le pouce : il ne gonflera pas en boule à la cuisson. Saler juste avant de cuire.",
    "Sauter les pommes de terre|Les faire dorer face coupée dans l'huile et la moitié du beurre à feu moyen-vif 10 minutes, ajouter le thym, saler.",
    "Haricots verts|Les cuire 6 minutes dans l'eau bouillante salée, puis les plonger dans l'eau glacée : ils restent vert vif et croquants. Les réchauffer au moment de servir.",
    "Cuire le steak|Poêle très chaude, filet d'huile, 4 minutes par face. Retourner une seule fois. Réserver sur une assiette.",
    "Sauce échalote|Baisser le feu, faire fondre l'échalote ciselée dans le reste de beurre 2 minutes, déglacer au vinaigre en grattant les sucs, réduire presque à sec, ajouter la crème et la moutarde. Laisser réduire jusqu'à ce que la sauce nappe la cuillère.",
    "Servir|Napper le steak, ajouter le jus rendu sur l'assiette dans la sauce, servir avec les pommes et les haricots persillés."
  ],
  tips: ["Le bain glacé (blanchir puis rafraîchir) fixe la chlorophylle : technique de base pour tous les légumes verts.", "Les sucs bruns au fond de la poêle sont la base de la sauce : ne lavez jamais la poêle entre la viande et la sauce."]
},
{
  id: "p13", name: "Poulet satay mariné, sauce cacahuète et riz jasmin", category: "proteine",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["base"], prepTime: 20, cookTime: 20, difficulty: 2,
  costPerPerson: 3.5, calories: 680, protein: 47,
  skills: ["Marinade sucrée-salée", "Sauce cacahuète", "Griller à la poêle"],
  ingredients: [i("Blanc de poulet", 160), i("Tamari (sauce soja sans gluten)", 20, "ml"), i("Curry en poudre", 1, "càc"), i("Curcuma", 0.25, "càc"), i("Miel", 1, "càc"), i("Ail", 1, "gousse"), i("Beurre de cacahuète", 25), i("Lait de coco", 50, "ml"), i("Citron vert", 0.5, "pièce"), i("Riz jasmin", 70), i("Concombre", 80), i("Coriandre fraîche", 5), i("Cacahuètes", 10), i("Huile neutre", 10, "ml")],
  instructions: [
    "Mariner|Couper le poulet en lanières fines. Mélanger avec la moitié du tamari, le curry, le curcuma, le miel et l'ail râpé. Laisser 20 minutes.",
    "Riz|Cuire le riz rincé avec 1,3 fois son volume d'eau, couvert, 12 minutes puis 5 minutes de repos.",
    "Sauce cacahuète|Dans une petite casserole à feu doux, fouetter beurre de cacahuète, lait de coco, le reste du tamari et le jus de citron vert. Chauffer 2 minutes : elle doit être lisse et nappante. Allonger d'eau si elle est trop épaisse.",
    "Griller|Chauffer l'huile dans une poêle à feu vif et cuire le poulet en une couche, 3 minutes par face : le miel de la marinade caramélise et donne des bords grillés.",
    "Servir|Dresser le riz, le poulet, le concombre en bâtonnets, napper de sauce et parsemer de cacahuètes concassées et de coriandre."
  ],
  tips: ["Avec des piques en bois trempées 20 minutes dans l'eau, vous obtenez de vraies brochettes satay.", "Goûtez la sauce : elle doit être à la fois salée, sucrée, acide et grasse. Ajustez avec tamari, miel ou citron vert."]
},
{
  id: "p14", name: "Escalope de dinde piccata au citron et câpres, tagliatelles au persil", category: "proteine",
  diet: [T.SP, T.H], equipments: ["base"], prepTime: 15, cookTime: 15, difficulty: 2,
  costPerPerson: 3.3, calories: 630, protein: 46,
  skills: ["Fariner pour saisir", "Sauce au beurre et citron", "Lier des pâtes à l'eau de cuisson"],
  ingredients: [i("Escalope de dinde", 150), i("Farine de blé", 10), i("Tagliatelles", 80), i("Citron", 0.5, "pièce"), i("Câpres", 1, "càs"), i("Ail", 1, "gousse"), i("Bouillon de volaille (cube)", 0.25, "pièce"), i("Beurre", 15), i("Huile d'olive", 10, "ml"), i("Persil plat", 10)],
  instructions: [
    "Préparer|Aplatir l'escalope à 7 mm entre deux feuilles de papier cuisson. Saler, poivrer, la fariner légèrement et tapoter pour retirer l'excès : la farine aide à dorer et épaissira la sauce. Dissoudre le bouillon dans 100 ml d'eau chaude.",
    "Pâtes|Cuire les tagliatelles dans une grande eau bien salée. Garder une louche d'eau de cuisson.",
    "Saisir|Chauffer l'huile et un tiers du beurre à feu moyen-vif. Cuire l'escalope 2 à 3 minutes par face jusqu'à une belle couleur blonde. Réserver.",
    "Sauce piccata|Faire revenir l'ail émincé 30 secondes, verser le bouillon et le jus du citron, gratter le fond. Réduire de moitié, ajouter les câpres, puis hors du feu le reste du beurre froid en remuant : la sauce devient brillante et onctueuse.",
    "Lier les pâtes|Mélanger les tagliatelles égouttées avec la moitié du persil, un peu de sauce et un trait d'eau de cuisson : l'amidon de l'eau lie le tout.",
    "Servir|Remettre l'escalope 30 secondes dans la sauce pour la réchauffer, servir sur les pâtes avec le reste du persil."
  ],
  tips: ["Une fine couche de farine suffit : trop épaisse, elle devient pâteuse.", "Le duo citron-câpres-beurre est un classique italo-américain : il fonctionne aussi avec du veau ou du poisson blanc."]
},
{
  id: "p15", name: "Boulettes de dinde à l'air fryer, sauce tomate mijotée et orzo", category: "proteine",
  diet: [T.SP, T.H, T.SL], equipments: ["base", "airfryer"], prepTime: 20, cookTime: 30, difficulty: 2,
  costPerPerson: 3.2, calories: 640, protein: 45,
  skills: ["Boulettes moelleuses (panade)", "Sauce tomate de base", "Cuisson des pâtes courtes"],
  ingredients: [i("Dinde hachée", 150), i("Pain de mie", 0.5, "tranche"), i("Œuf", 0.25, "pièce"), i("Ail", 2, "gousse"), i("Persil plat", 5), i("Origan", 0.5, "càc"), i("Tomates concassées", 200), i("Oignon", 0.25, "pièce"), i("Basilic frais", 5), i("Orzo", 70), i("Huile d'olive", 15, "ml"), i("Sucre", 0.25, "càc")],
  instructions: [
    "Panade|Émietter le pain de mie et le tremper 5 minutes dans 2 cuillères d'eau. Cette panade garde l'humidité à l'intérieur : la dinde, très maigre, reste moelleuse.",
    "Farce|Mélanger la dinde, la panade, l'œuf battu, une gousse d'ail râpée, le persil, l'origan, sel et poivre. Former des boulettes de 3 cm avec les mains humides.",
    "Sauce tomate|Faire revenir l'oignon finement ciselé dans l'huile 5 minutes, ajouter l'autre gousse d'ail 1 minute, puis les tomates, le sucre et une pincée de sel. Laisser mijoter 20 minutes à feu doux, à demi couvert, jusqu'à ce qu'elle épaississe.",
    "Air fryer|Cuire les boulettes à 190 °C 10 à 12 minutes en secouant à mi-cuisson, jusqu'à ce qu'elles soient dorées.",
    "Mijoter ensemble|Plonger les boulettes dans la sauce 5 minutes : elles s'imprègnent et finissent de cuire. Ajouter le basilic déchiré hors du feu.",
    "Orzo|Cuire l'orzo dans l'eau salée selon le paquet, égoutter, arroser d'un filet d'huile. Servir avec les boulettes en sauce."
  ],
  tips: ["La pincée de sucre corrige l'acidité des tomates en conserve, surtout hors saison.", "Le basilic se met toujours à la fin : cuit, il perd son parfum et noircit."]
},
{
  id: "p16", name: "Poulet sauté au basilic thaï façon kra pao, œuf frit croustillant et riz", category: "proteine",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["base"], prepTime: 15, cookTime: 15, difficulty: 2,
  costPerPerson: 3.4, calories: 650, protein: 46,
  skills: ["Hacher au couteau", "Œuf frit à la thaïlandaise", "Sauce d'assaisonnement asiatique"],
  ingredients: [i("Haut de cuisse de poulet désossé", 150), i("Ail", 3, "gousse"), i("Piment d'Espelette", 0.5, "càc"), i("Haricots verts", 60), i("Sauce nuoc-mâm", 1, "càc"), i("Tamari (sauce soja sans gluten)", 10, "ml"), i("Sucre", 0.5, "càc"), i("Basilic frais", 10), i("Œuf", 1, "pièce"), i("Riz jasmin", 70), i("Huile neutre", 30, "ml")],
  instructions: [
    "Hacher|Hacher grossièrement le poulet au couteau (plus de texture qu'une viande hachée industrielle). Écraser l'ail, couper les haricots en petits tronçons.",
    "Riz|Cuire le riz rincé avec 1,3 fois son volume d'eau, couvert, 12 minutes puis 5 minutes de repos.",
    "Sauce|Mélanger nuoc-mâm, tamari, sucre et 1 cuillère d'eau.",
    "Œuf frit|Chauffer 2 cuillères d'huile dans une petite poêle jusqu'à ce qu'elle frémisse. Casser l'œuf : les bords gonflent et deviennent dentelés et croustillants. Arroser le blanc d'huile chaude à la cuillère 1 minute, jaune coulant. Égoutter.",
    "Sauter|Dans un wok très chaud avec le reste d'huile, faire sauter l'ail et le piment 20 secondes, puis le poulet 4 minutes à feu vif, les haricots 2 minutes.",
    "Finir|Verser la sauce, remuer 30 secondes, couper le feu et incorporer le basilic qui doit juste flétrir. Servir sur le riz, l'œuf posé dessus."
  ],
  tips: ["Le nuoc-mâm sent fort cru mais apporte une profondeur salée incomparable une fois cuit.", "Le basilic thaï (anisé) est l'idéal si vous le trouvez en épicerie asiatique."]
}
);

/* ---------- FAST-FOOD MAISON / CONFORT ---------- */
RECIPES.push(
{
  id: "f01", name: "Smash burger maison, oignons caramélisés, sauce burger et frites au four", category: "fastfood",
  diet: [T.SP, T.H], equipments: ["base", "four"], prepTime: 25, cookTime: 40, difficulty: 2,
  costPerPerson: 4.8, calories: 920, protein: 42,
  skills: ["Smash (écraser pour caraméliser)", "Oignons caramélisés", "Frites croustillantes au four"],
  ingredients: [i("Bœuf haché 15 % MG", 150), i("Pain à burger", 1, "pièce"), i("Cheddar", 30, "g"), i("Oignon", 0.5, "pièce"), i("Pomme de terre", 250), i("Fécule de maïs", 5), i("Salade verte", 15), i("Cornichons", 20), i("Mayonnaise", 15), i("Ketchup", 10), i("Moutarde", 0.5, "càc"), i("Paprika fumé", 0.5, "càc"), i("Huile d'olive", 20, "ml"), i("Beurre", 5)],
  instructions: [
    "Frites|Couper les pommes de terre en bâtonnets de 1 cm, les rincer à l'eau froide jusqu'à ce qu'elle soit claire (on retire l'amidon de surface), puis bien sécher. Enrober de fécule, huile, paprika et sel. Étaler sans qu'elles se touchent sur une plaque et cuire 35 minutes à 220 °C en retournant à mi-cuisson.",
    "Oignons caramélisés|Émincer finement l'oignon, le cuire à feu doux dans un filet d'huile et une pincée de sel 20 minutes en remuant de temps en temps. Il doit devenir brun doré et fondant : c'est le sucre naturel qui caramélise lentement. Ajouter une cuillère d'eau s'il accroche.",
    "Sauce burger|Mélanger mayonnaise, ketchup, moutarde et la moitié des cornichons hachés finement.",
    "Préparer la viande|Diviser le bœuf en deux boules de 75 g sans les tasser. Les garder au frais jusqu'à la cuisson : une viande froide se smashe mieux.",
    "Smasher|Chauffer une poêle en fonte à sec jusqu'à ce qu'elle fume. Poser une boule, la recouvrir d'un carré de papier cuisson et l'écraser fermement avec une casserole jusqu'à 7 mm d'épaisseur. Saler. Laisser 2 minutes sans toucher : une croûte brune se forme sur toute la surface.",
    "Finir|Gratter le steak avec une spatule fine pour garder la croûte, retourner, poser le cheddar, cuire 1 minute. Superposer les deux steaks.",
    "Monter|Toaster le pain beurré côté coupé. Sauce, salade, steaks au fromage, oignons caramélisés, cornichons, chapeau. Servir avec les frites."
  ],
  tips: ["Le smash ne marche qu'une fois, dans les 30 premières secondes : après, on chasse le jus au lieu de créer la croûte.", "Deux steaks fins valent mieux qu'un épais : deux fois plus de surface caramélisée."]
},
{
  id: "f02", name: "Burger de poulet croustillant mariné au babeurre maison et coleslaw", category: "fastfood",
  diet: [T.SP, T.H], equipments: ["airfryer"], prepTime: 30, cookTime: 15, difficulty: 2,
  costPerPerson: 4.0, calories: 820, protein: 48,
  skills: ["Babeurre maison", "Panure double", "Coleslaw croquant"],
  ingredients: [i("Haut de cuisse de poulet désossé", 150), i("Lait", 60, "ml"), i("Citron", 0.5, "pièce"), i("Farine de blé", 35), i("Fécule de maïs", 10), i("Paprika fumé", 1, "càc"), i("Ail en poudre", 0.5, "càc"), i("Pain à burger", 1, "pièce"), i("Chou blanc", 70), i("Carotte", 40), i("Mayonnaise", 20), i("Vinaigre de cidre", 1, "càc"), i("Cornichons", 15), i("Huile neutre", 15, "ml")],
  instructions: [
    "Babeurre maison|Mélanger le lait avec 1 cuillère à soupe de jus de citron : il caille légèrement en 5 minutes. Y plonger le poulet salé et laisser 30 minutes (ou une nuit). L'acidité douce attendrit la viande sans la rendre farineuse.",
    "Coleslaw|Émincer le chou très finement, râper la carotte, saler et laisser 10 minutes, puis presser pour retirer l'eau. Mélanger avec la moitié de la mayonnaise, le vinaigre et du poivre.",
    "Panure|Mélanger farine, fécule, paprika, ail en poudre et sel. Ajouter 1 cuillère de babeurre et frotter entre les doigts pour créer de petits grumeaux : ce sont eux qui donnent le croustillant irrégulier.",
    "Paner|Égoutter le poulet, le presser fermement dans la panure, le replonger dans le babeurre et repaner une seconde fois. Laisser reposer 5 minutes : la panure s'hydrate et tient à la cuisson.",
    "Cuire|Badigeonner généreusement d'huile toutes les faces (sans gras, la farine reste blanche et sèche). Air fryer à 190 °C, 14 à 16 minutes en retournant à mi-cuisson.",
    "Monter|Toaster le pain, tartiner du reste de mayonnaise, ajouter le poulet, les cornichons et le coleslaw."
  ],
  tips: ["Le haut de cuisse reste juteux même un peu trop cuit, contrairement au blanc : c'est le choix des vrais chicken burgers.", "Si des zones farineuses restent blanches, vaporisez-les d'huile et prolongez de 2 minutes."]
},
{
  id: "f03", name: "Tacos de poulet aux agrumes, pico de gallo et oignons rouges pickles", category: "fastfood",
  diet: [T.SP, T.H], equipments: ["base"], prepTime: 25, cookTime: 15, difficulty: 2,
  costPerPerson: 3.8, calories: 690, protein: 42,
  skills: ["Marinade aux agrumes", "Pickles rapides", "Salsa crue"],
  ingredients: [i("Haut de cuisse de poulet désossé", 150), i("Orange", 0.5, "pièce"), i("Citron vert", 1, "pièce"), i("Cumin moulu", 1, "càc"), i("Paprika fumé", 1, "càc"), i("Origan", 0.5, "càc"), i("Ail", 1, "gousse"), i("Tortilla de blé", 3, "pièce"), i("Oignon rouge", 0.5, "pièce"), i("Vinaigre de cidre", 2, "càs"), i("Sucre", 1, "càc"), i("Tomate", 100), i("Coriandre fraîche", 10), i("Avocat", 0.5, "pièce"), i("Huile d'olive", 15, "ml")],
  instructions: [
    "Pickles|Émincer finement la moitié de l'oignon rouge, couvrir de vinaigre, sucre, une pincée de sel et 2 cuillères d'eau chaude. En 20 minutes, il devient rose vif, croquant et acidulé.",
    "Mariner|Mélanger le jus de l'orange et d'un demi-citron vert, cumin, paprika, origan, ail râpé, huile et sel. Y mettre le poulet 20 minutes (pas plus de 2 heures : l'acide finirait par cuire la surface).",
    "Pico de gallo|Couper la tomate épépinée en petits dés, ciseler le reste de l'oignon et la coriandre, assaisonner avec le jus du demi-citron vert restant et du sel.",
    "Griller|Poêle très chaude, cuire le poulet égoutté 5 minutes par face : le sucre de l'orange noircit légèrement les bords. Laisser reposer 3 minutes puis trancher finement.",
    "Tortillas|Les réchauffer 20 secondes par face dans une poêle sèche, jusqu'à quelques taches brunes. Les garder dans un torchon.",
    "Garnir|Poulet, avocat en lamelles, pico de gallo, oignons pickles et coriandre."
  ],
  tips: ["Retirer les pépins de la tomate évite une salsa aqueuse qui détrempe la tortille.", "Les pickles d'oignon se gardent une semaine au réfrigérateur et relèvent n'importe quel plat."]
},
{
  id: "f04", name: "Pizza margherita croustillante, cuisson poêle puis gril", category: "fastfood",
  diet: [T.SP, T.H, T.VG], equipments: ["base", "four"], prepTime: 20, cookTime: 15, difficulty: 2,
  costPerPerson: 2.9, calories: 760, protein: 30,
  skills: ["Étaler une pâte à la main", "Sauce tomate crue", "Cuisson poêle et gril"],
  ingredients: [i("Pâte à pizza", 180), i("Tomates concassées", 80), i("Ail", 0.5, "gousse"), i("Origan", 0.5, "càc"), i("Mozzarella", 90), i("Basilic frais", 5), i("Parmesan", 10), i("Huile d'olive", 15, "ml")],
  instructions: [
    "Préparer|Sortir la pâte 30 minutes avant : froide, elle se rétracte. Préchauffer le four en position gril au maximum. Égoutter la mozzarella et la déchirer en morceaux sur du papier absorbant.",
    "Sauce crue|Mélanger les tomates, l'ail râpé, l'origan, du sel et un filet d'huile. Ne pas la cuire : elle cuit sur la pizza et garde sa fraîcheur.",
    "Étaler|Sur un plan fariné, aplatir la pâte du bout des doigts en partant du centre, en laissant un bourrelet de 1,5 cm. Éviter le rouleau, qui chasse l'air des bords.",
    "Cuire la base|Chauffer une grande poêle allant au four à feu vif. Y poser la pâte, garnir rapidement de sauce en fine couche puis de mozzarella. Cuire 3 à 4 minutes : le dessous doit être doré et tacheté.",
    "Gril|Glisser la poêle sous le gril 3 à 5 minutes, jusqu'à ce que le bord gonfle et que le fromage bulle avec quelques taches brunes.",
    "Finir|Basilic frais, parmesan râpé et un filet d'huile d'olive crue."
  ],
  tips: ["Un four domestique ne chauffe pas assez pour une vraie pizza : la poêle brûlante remplace la pierre, le gril remplace la voûte.", "Trop de sauce ou une mozzarella mal égouttée, et le centre reste détrempé."]
},
{
  id: "f05", name: "Croque-monsieur à la béchamel maison et salade vinaigrette", category: "fastfood",
  diet: [], equipments: ["base", "four"], prepTime: 15, cookTime: 15, difficulty: 2,
  costPerPerson: 2.6, calories: 690, protein: 32,
  skills: ["Roux et béchamel", "Gratiner"],
  ingredients: [i("Pain de mie", 2, "tranche"), i("Jambon blanc", 1, "tranche"), i("Comté", 40), i("Beurre", 15), i("Farine de blé", 8), i("Lait", 80, "ml"), i("Muscade", 0.25, "càc"), i("Moutarde", 1, "càc"), i("Salade verte", 60), i("Vinaigre de cidre", 1, "càc"), i("Huile d'olive", 10, "ml")],
  instructions: [
    "Roux|Faire fondre la moitié du beurre, ajouter la farine et remuer 1 minute à feu moyen : ce roux blanc cuit le goût de farine crue.",
    "Béchamel|Verser le lait froid d'un coup en fouettant (lait froid dans roux chaud, pas de grumeaux), porter à frémissement et cuire 3 minutes jusqu'à ce qu'elle nappe la cuillère. Saler, poivrer, râper la muscade, ajouter un tiers du comté.",
    "Monter|Tartiner une tranche de moutarde, ajouter une cuillère de béchamel, le jambon et un peu de comté, refermer.",
    "Dorer|Beurrer l'extérieur et dorer 2 minutes par face à la poêle à feu moyen.",
    "Gratiner|Poser sur une plaque, napper le dessus du reste de béchamel et de comté, passer 4 à 6 minutes sous le gril jusqu'à une croûte bouillonnante et dorée.",
    "Salade|Vinaigrette moutarde-vinaigre-huile, assaisonner au dernier moment."
  ],
  tips: ["Une béchamel trop épaisse se rattrape avec un trait de lait, trop liquide avec 2 minutes de cuisson en plus.", "Le passage à la poêle avant le gril donne un pain croustillant dessous et un dessus gratiné."]
},
{
  id: "f06", name: "Fish and chips au four, chapelure panko et sauce tartare maison", category: "fastfood",
  diet: [T.SP, T.H], equipments: ["four"], prepTime: 25, cookTime: 35, difficulty: 2,
  costPerPerson: 4.3, calories: 740, protein: 38,
  skills: ["Panure panko", "Sauce tartare", "Frites au four"],
  ingredients: [i("Dos de cabillaud", 150), i("Farine de blé", 15), i("Œuf", 0.5, "pièce"), i("Panko", 35), i("Paprika doux", 0.5, "càc"), i("Pomme de terre", 250), i("Petits pois (boîte)", 80), i("Menthe fraîche", 3), i("Yaourt grec", 40), i("Mayonnaise", 15), i("Cornichons", 15), i("Câpres", 1, "càc"), i("Citron", 0.5, "pièce"), i("Huile d'olive", 25, "ml")],
  instructions: [
    "Frites|Couper les pommes de terre en bâtonnets épais, rincer, sécher soigneusement, enrober de la moitié de l'huile et sel. Cuire 35 minutes à 220 °C, en retournant à mi-cuisson.",
    "Panko grillé|Faire dorer le panko 3 minutes à sec dans une poêle avec le paprika et le reste d'huile : au four, le poisson cuit avant que la chapelure ne colore, on la dore donc d'avance.",
    "Paner|Couper le poisson en 2 morceaux, sécher, saler. Farine, œuf battu, panko doré en pressant bien.",
    "Cuire|Ajouter le poisson sur la plaque des frites pour les 12 dernières minutes. La chair doit s'effeuiller.",
    "Sauce tartare|Mélanger yaourt, mayonnaise, cornichons et câpres hachés, un trait de citron.",
    "Petits pois à l'anglaise|Réchauffer les petits pois égouttés, les écraser grossièrement à la fourchette avec la menthe, sel et un filet de citron. Servir avec le poisson et les frites."
  ],
  tips: ["Le cabillaud doit être bien séché avant la panure, sinon elle glisse.", "Les petits pois écrasés à la menthe sont l'accompagnement traditionnel britannique (mushy peas) en version rapide."]
},
{
  id: "f07", name: "Kebab maison au poulet rôti façon broche, pita chaude et sauce blanche", category: "fastfood",
  diet: [T.SP, T.H], equipments: ["base", "four"], prepTime: 25, cookTime: 30, difficulty: 2,
  costPerPerson: 3.6, calories: 760, protein: 46,
  skills: ["Rôtir en bloc puis trancher", "Sauce blanche", "Finition à la poêle"],
  ingredients: [i("Haut de cuisse de poulet désossé", 170), i("Yaourt grec", 90), i("Cumin moulu", 1, "càc"), i("Paprika fumé", 1, "càc"), i("Coriandre moulue", 0.5, "càc"), i("Ail", 2, "gousse"), i("Citron", 0.5, "pièce"), i("Pita", 1, "pièce"), i("Tomate", 80), i("Oignon rouge", 0.25, "pièce"), i("Salade verte", 30), i("Menthe fraîche", 3), i("Huile d'olive", 10, "ml")],
  instructions: [
    "Mariner|Mélanger la moitié du yaourt avec les épices, une gousse d'ail râpée, le jus du demi-citron, l'huile et du sel. Enrober les hauts de cuisse et laisser 30 minutes.",
    "Monter le bloc|Empiler les hauts de cuisse bien serrés dans un petit plat, comme une broche couchée. Rôtir 25 minutes à 220 °C : l'extérieur grille, l'intérieur reste juteux.",
    "Sauce blanche|Mélanger le reste du yaourt, l'autre gousse d'ail râpée, la menthe ciselée, sel, poivre et un trait de citron.",
    "Trancher et saisir|Laisser reposer 5 minutes, trancher finement, puis faire griller les lamelles 2 minutes dans une poêle très chaude avec le jus du plat : c'est ce qui recrée les bords croustillants de la broche.",
    "Pita|Réchauffer la pita 30 secondes par face à la poêle.",
    "Garnir|Salade, tomate, oignon rouge émincé, poulet, sauce blanche généreuse."
  ],
  tips: ["Le passage final à la poêle est le vrai secret : sans lui, c'est du poulet rôti dans un pain.", "Le haut de cuisse, plus gras que le blanc, reproduit le moelleux de la broche."]
},
{
  id: "f08", name: "Nuggets panko à l'air fryer, frites de patate douce et sauce miel-moutarde", category: "fastfood",
  diet: [T.SP, T.H, T.SL], equipments: ["airfryer"], prepTime: 25, cookTime: 25, difficulty: 1,
  costPerPerson: 3.5, calories: 700, protein: 44,
  skills: ["Panure à l'anglaise", "Frites de patate douce", "Sauce émulsionnée express"],
  ingredients: [i("Blanc de poulet", 150), i("Farine de blé", 15), i("Œuf", 0.5, "pièce"), i("Panko", 35), i("Paprika fumé", 0.5, "càc"), i("Ail en poudre", 0.25, "càc"), i("Patate douce", 220), i("Fécule de maïs", 5), i("Huile d'olive", 20, "ml"), i("Moutarde", 2, "càc"), i("Miel", 2, "càc"), i("Citron", 0.25, "pièce")],
  instructions: [
    "Frites|Couper la patate douce en bâtonnets fins (8 mm), les enrober de fécule puis de la moitié de l'huile et de sel : la fécule absorbe l'humidité de surface, condition du croustillant pour ce légume très sucré.",
    "Couper|Tailler le poulet en morceaux réguliers de 3 cm : même taille, même cuisson.",
    "Paner|Assaisonner la farine de sel, le panko de paprika et d'ail. Farine, œuf, panko en pressant. Une main sèche, une main mouillée pour ne pas paner ses doigts.",
    "Cuire les frites|Air fryer 200 °C, 14 à 16 minutes en secouant 2 fois, en une couche. Réserver.",
    "Cuire les nuggets|Vaporiser ou badigeonner du reste d'huile et cuire 9 à 10 minutes à 190 °C en retournant à mi-cuisson. Remettre les frites 2 minutes à la fin pour les réchauffer.",
    "Sauce|Fouetter moutarde, miel et quelques gouttes de citron."
  ],
  tips: ["La patate douce brûle plus vite que la pomme de terre : surveillez les 3 dernières minutes.", "Les nuggets panés crus se congèlent à plat et se cuisent directement surgelés (2 minutes de plus)."]
},
{
  id: "f09", name: "Mac and cheese gratiné au cheddar et à la chapelure croustillante", category: "fastfood",
  diet: [T.SP, T.H, T.VG], equipments: ["base", "four"], prepTime: 15, cookTime: 25, difficulty: 2,
  costPerPerson: 2.7, calories: 820, protein: 32,
  skills: ["Sauce Mornay (béchamel au fromage)", "Cuisson al dente avant gratin", "Croûte de chapelure"],
  ingredients: [i("Macaroni", 100), i("Beurre", 15), i("Farine de blé", 12), i("Lait", 180, "ml"), i("Cheddar", 50), i("Comté", 20), i("Moutarde", 0.5, "càc"), i("Paprika fumé", 0.25, "càc"), i("Panko", 15), i("Salade verte", 50)],
  instructions: [
    "Pâtes|Cuire les macaroni 2 minutes de moins que le temps indiqué : ils finiront de cuire au four dans la sauce sans devenir mous.",
    "Roux|Faire fondre les deux tiers du beurre, ajouter la farine, remuer 1 minute.",
    "Sauce Mornay|Verser le lait en fouettant, cuire 4 minutes jusqu'à ce que la sauce nappe. Hors du feu, ajouter les fromages râpés, la moutarde et le paprika. Ne pas faire bouillir après le fromage, il deviendrait granuleux.",
    "Assembler|Mélanger pâtes et sauce : l'ensemble doit sembler trop crémeux, les pâtes vont absorber.",
    "Croûte|Verser dans un plat, couvrir de panko mélangé au reste du beurre fondu. Gratiner 12 minutes à 210 °C.",
    "Servir|Laisser reposer 3 minutes avant de servir avec la salade."
  ],
  tips: ["Râpez vous-même le cheddar : le fromage râpé du commerce est enrobé d'amidon anti-agglomérant qui rend la sauce pâteuse.", "La moutarde ne se sent pas : elle renforce le goût du fromage."]
},
{
  id: "f10", name: "Quesadillas poulet-haricots noirs, guacamole maison et crème acidulée", category: "fastfood",
  diet: [T.SP, T.H], equipments: ["base"], prepTime: 20, cookTime: 20, difficulty: 1,
  costPerPerson: 3.6, calories: 780, protein: 44,
  skills: ["Guacamole", "Cuisson à la poêle sèche", "Garniture épicée"],
  ingredients: [i("Blanc de poulet", 120), i("Haricots noirs (boîte)", 70), i("Tortilla de blé", 2, "pièce"), i("Cheddar", 40), i("Cumin moulu", 1, "càc"), i("Paprika fumé", 0.5, "càc"), i("Oignon rouge", 0.25, "pièce"), i("Avocat", 0.5, "pièce"), i("Citron vert", 0.5, "pièce"), i("Tomate", 50), i("Coriandre fraîche", 5), i("Yaourt grec", 30), i("Huile d'olive", 10, "ml")],
  instructions: [
    "Garniture|Couper le poulet en petits dés, le saisir 5 minutes dans l'huile avec cumin, paprika et sel. Ajouter les haricots rincés et la moitié de l'oignon ciselé, écraser grossièrement quelques haricots pour lier.",
    "Guacamole|Écraser l'avocat à la fourchette en laissant des morceaux, ajouter le reste de l'oignon, la tomate en dés, la coriandre, le jus de citron vert et du sel.",
    "Crème|Mélanger le yaourt avec un peu de zeste de citron vert et une pincée de sel.",
    "Garnir|Sur une moitié de chaque tortilla : fromage, garniture, fromage. Le fromage des deux côtés sert de colle.",
    "Cuire|Plier en demi-lune et cuire dans une poêle sèche à feu moyen 2 à 3 minutes par face en pressant avec une spatule, jusqu'à ce qu'elles soient dorées et le fromage fondu.",
    "Servir|Couper en triangles, servir avec guacamole et crème."
  ],
  tips: ["Feu moyen et non vif : la tortilla doit dorer pendant que le fromage a le temps de fondre.", "Le jus de citron vert empêche l'avocat de noircir trop vite."]
},
{
  id: "f11", name: "Burger végétarien aux haricots noirs fumés, cheddar et oignons grillés", category: "fastfood",
  diet: [T.SP, T.H, T.VG], equipments: ["base"], prepTime: 25, cookTime: 15, difficulty: 2,
  costPerPerson: 2.8, calories: 720, protein: 26,
  skills: ["Sécher des légumineuses", "Galette qui se tient", "Saisir une galette végétale"],
  ingredients: [i("Haricots noirs (boîte)", 130), i("Flocons d'avoine", 25), i("Œuf", 0.5, "pièce"), i("Paprika fumé", 1, "càc"), i("Cumin moulu", 0.5, "càc"), i("Ail", 1, "gousse"), i("Pain à burger", 1, "pièce"), i("Cheddar", 25), i("Oignon rouge", 0.25, "pièce"), i("Tomate", 50), i("Salade verte", 15), i("Mayonnaise", 15), i("Huile d'olive", 15, "ml")],
  instructions: [
    "Sécher les haricots|Rincer, égoutter et étaler les haricots sur une plaque, puis les passer 5 minutes dans une poêle chaude à sec. Les haricots trop humides donnent une galette molle qui s'effondre.",
    "Galette|Écraser les haricots en laissant un tiers de morceaux, ajouter les flocons mixés grossièrement, l'œuf, les épices, l'ail râpé et du sel. Repos 10 minutes : l'avoine absorbe l'humidité et lie.",
    "Façonner|Former une galette d'1,5 cm légèrement plus large que le pain.",
    "Oignons|Couper l'oignon en rondelles épaisses et les griller 3 minutes par face dans une poêle chaude.",
    "Cuire|Chauffer l'huile à feu moyen, cuire la galette 4 minutes par face sans y toucher. Poser le cheddar, couvrir 1 minute.",
    "Monter|Pain toasté, mayonnaise, salade, tomate, galette, oignons grillés."
  ],
  tips: ["Retournez la galette d'un geste franc avec une large spatule : elle est fragile tant qu'elle n'a pas croûté.", "Les galettes crues se congèlent très bien entre deux feuilles de papier cuisson."]
},
{
  id: "f12", name: "Spaghetti alla carbonara, la vraie (jaunes, pecorino, sans crème)", category: "fastfood",
  diet: [], equipments: ["base"], prepTime: 10, cookTime: 15, difficulty: 3,
  costPerPerson: 2.8, calories: 760, protein: 32,
  skills: ["Émulsion œuf-fromage-amidon", "Rendre le gras d'une charcuterie", "Cuisson hors du feu"],
  ingredients: [i("Spaghetti", 100), i("Pancetta", 60), i("Œuf", 1.5, "pièce"), i("Pecorino", 25), i("Poivre noir", 1, "càc")],
  instructions: [
    "Mélange|Séparer les œufs : garder 1 jaune par personne et un demi-œuf entier. Battre avec le pecorino finement râpé et beaucoup de poivre fraîchement concassé, jusqu'à une pâte épaisse.",
    "Rendre le gras|Couper la pancetta en lardons épais, les cuire à feu moyen dans une poêle froide 8 minutes : la graisse fond doucement et les lardons deviennent croustillants. Couper le feu.",
    "Pâtes|Cuire les spaghetti dans une eau moins salée que d'habitude (le pecorino est salé). Garder une grande tasse d'eau de cuisson.",
    "Tempérer|Délayer le mélange œuf-fromage avec 2 cuillères d'eau de cuisson chaude : il se réchauffe sans coaguler.",
    "Émulsionner|Mettre les pâtes égouttées dans la poêle des lardons, hors du feu, attendre 30 secondes, puis verser le mélange en remuant vivement. Ajouter de l'eau de cuisson par petites touches jusqu'à une sauce crémeuse et brillante qui enrobe chaque spaghetto.",
    "Servir|Immédiatement, avec un dernier tour de poivre et un peu de pecorino."
  ],
  tips: ["L'ennemi, c'est la chaleur directe : au-delà de 70 °C, l'œuf fait des grumeaux. Toujours hors du feu.", "La crème est une invention hors d'Italie : la texture vient uniquement de l'émulsion jaune, fromage, gras et amidon."]
},
{
  id: "f13", name: "Hot-dog maison, saucisse de volaille, oignons confits et pickles de concombre", category: "fastfood",
  diet: [T.SP, T.H], equipments: ["base"], prepTime: 20, cookTime: 25, difficulty: 1,
  costPerPerson: 2.9, calories: 640, protein: 26,
  skills: ["Oignons confits", "Pickles rapides", "Cuisson douce des saucisses"],
  ingredients: [i("Saucisse de volaille", 2, "pièce"), i("Pain à hot-dog", 1, "pièce"), i("Oignon", 0.5, "pièce"), i("Concombre", 60), i("Vinaigre de cidre", 2, "càs"), i("Sucre", 1, "càc"), i("Moutarde", 1, "càc"), i("Ketchup", 10), i("Beurre", 5), i("Huile d'olive", 10, "ml"), i("Salade verte", 40)],
  instructions: [
    "Pickles|Trancher finement le concombre, le couvrir de vinaigre, sucre, sel et 2 cuillères d'eau chaude. Laisser 20 minutes.",
    "Oignons confits|Émincer l'oignon et le cuire 20 minutes à feu doux dans l'huile avec une pincée de sel et de sucre, jusqu'à ce qu'il soit brun et fondant.",
    "Pocher puis dorer|Plonger les saucisses 5 minutes dans une eau frémissante (pas bouillante, elles éclateraient) : elles chauffent à cœur. Puis les dorer 3 minutes dans une poêle avec le beurre.",
    "Pain|Ouvrir le pain et le toaster côté intérieur dans la poêle.",
    "Monter|Moutarde, saucisses, oignons confits, pickles égouttés, un trait de ketchup. Servir avec la salade."
  ],
  tips: ["Pocher avant de griller évite la saucisse brûlée dehors et froide dedans.", "Gardez le vinaigre des pickles : il fait une excellente base de vinaigrette."]
},
{
  id: "f14", name: "Chicken katsu curry : poulet pané panko, sauce curry japonaise et riz", category: "fastfood",
  diet: [T.SP, T.H, T.SL], equipments: ["base"], prepTime: 25, cookTime: 35, difficulty: 3,
  costPerPerson: 3.8, calories: 860, protein: 44,
  skills: ["Sauce curry à base de roux", "Friture plate contrôlée", "Riz japonais"],
  ingredients: [i("Blanc de poulet", 150), i("Farine de blé", 25), i("Œuf", 0.5, "pièce"), i("Panko", 35), i("Oignon", 0.5, "pièce"), i("Carotte", 60), i("Pomme", 0.25, "pièce"), i("Curry en poudre", 2, "càc"), i("Garam masala", 0.5, "càc"), i("Sauce soja", 10, "ml"), i("Miel", 1, "càc"), i("Bouillon de volaille (cube)", 0.5, "pièce"), i("Riz rond", 75), i("Huile neutre", 40, "ml")],
  instructions: [
    "Base de sauce|Faire revenir l'oignon émincé et la carotte en dés dans 1 cuillère d'huile 8 minutes. Ajouter la pomme râpée 2 minutes : elle apporte la douceur fruitée typique du curry japonais.",
    "Roux au curry|Ajouter 10 g de farine et les épices, remuer 1 minute, puis verser 250 ml de bouillon chaud par personne en fouettant. Ajouter sauce soja et miel, mijoter 15 minutes. Mixer ou laisser rustique.",
    "Riz|Rincer le riz rond jusqu'à eau claire, cuire avec 1,2 fois son volume d'eau, couvert, 12 minutes puis 10 minutes de repos.",
    "Paner|Ouvrir le blanc en portefeuille pour obtenir 1,5 cm d'épaisseur. Sel, farine restante, œuf, panko bien pressé.",
    "Frire|Chauffer le reste d'huile (1 cm de hauteur) à feu moyen : un grain de panko doit grésiller sans brunir instantanément. Cuire 3 à 4 minutes par face jusqu'à une panure dorée. Égoutter sur une grille pour que le dessous reste croustillant.",
    "Servir|Trancher le katsu en bandes, le poser à côté du riz et napper la sauce sur le riz uniquement : la panure reste croquante."
  ],
  tips: ["Égoutter sur une grille plutôt que sur du papier évite que la vapeur ramollisse la panure.", "La sauce gagne à mijoter plus longtemps : faites-la en double et congelez-la."]
},
{
  id: "f15", name: "Wrap de falafels maison, chou rouge croquant et sauce tahini", category: "fastfood",
  diet: [T.SP, T.H, T.SL, T.VG, T.VN], equipments: ["airfryer", "mixeur"], prepTime: 30, cookTime: 15, difficulty: 2,
  costPerPerson: 2.6, calories: 690, protein: 24,
  skills: ["Falafels aux pois chiches", "Sauce tahini", "Salade de chou massée"],
  ingredients: [i("Pois chiches (boîte)", 140), i("Oignon", 0.25, "pièce"), i("Ail", 1, "gousse"), i("Persil plat", 10), i("Coriandre fraîche", 10), i("Cumin moulu", 1, "càc"), i("Coriandre moulue", 0.5, "càc"), i("Farine de blé", 15), i("Tortilla de blé", 1, "pièce"), i("Chou rouge", 70), i("Citron", 0.5, "pièce"), i("Tahini", 20), i("Tomate", 50), i("Huile d'olive", 15, "ml")],
  instructions: [
    "Sécher les pois chiches|Égoutter, rincer et sécher les pois chiches dans un torchon en frottant : les peaux se détachent, retirez celles qui viennent facilement.",
    "Mixer|Mixer par impulsions avec l'oignon, l'ail, les herbes, les épices et du sel jusqu'à une texture de semoule grossière, pas de purée. Incorporer la farine.",
    "Façonner|Former des boulettes aplaties de la taille d'une noix (4 par personne). Repos 15 minutes au frais.",
    "Chou massé|Émincer très finement le chou rouge, ajouter sel et un peu de citron et le masser 1 minute entre les mains : il s'assouplit tout en restant croquant.",
    "Sauce tahini|Fouetter le tahini avec le jus de citron restant : il fige d'abord, c'est normal. Ajouter de l'eau froide cuillère par cuillère jusqu'à une sauce lisse et coulante. Saler.",
    "Cuire|Badigeonner les falafels d'huile, air fryer 190 °C, 12 minutes en retournant à mi-cuisson.",
    "Monter|Tortilla chauffée, chou, tomate, falafels légèrement écrasés, sauce tahini. Rouler serré."
  ],
  tips: ["Avec des pois chiches secs trempés une nuit (non cuits), les falafels sont encore plus légers : c'est la méthode traditionnelle.", "Le tahini qui « tranche » puis devient lisse avec l'eau est une émulsion : patience en fouettant."]
},
{
  id: "f16", name: "Lasagnes à la bolognaise mijotée et béchamel maison", category: "fastfood",
  diet: [T.SP, T.H], equipments: ["base", "four"], prepTime: 35, cookTime: 80, difficulty: 3,
  costPerPerson: 3.4, calories: 780, protein: 40,
  skills: ["Bolognaise mijotée", "Béchamel", "Montage en couches"],
  ingredients: [i("Bœuf haché 15 % MG", 120), i("Oignon", 0.25, "pièce"), i("Carotte", 40), i("Céleri branche", 30), i("Ail", 1, "gousse"), i("Concentré de tomate", 1, "càs"), i("Tomates concassées", 150), i("Lait", 180, "ml"), i("Feuilles de lasagne", 70), i("Beurre", 15), i("Farine de blé", 15), i("Parmesan", 25), i("Muscade", 0.25, "càc"), i("Huile d'olive", 10, "ml"), i("Laurier", 0.5, "feuille")],
  instructions: [
    "Soffritto|Hacher très finement oignon, carotte et céleri (le trio de base italien) et les faire suer 10 minutes dans l'huile à feu doux.",
    "Bolognaise|Monter le feu, ajouter la viande et la colorer en l'émiettant. Ajouter l'ail et le concentré 1 minute, puis 40 ml de lait par personne : il attendrit la viande, c'est le geste de Bologne. Laisser réduire, puis ajouter les tomates, le laurier et un verre d'eau. Mijoter 45 minutes à feu très doux, couvercle entrouvert.",
    "Béchamel|Roux de beurre et farine 1 minute, le reste du lait froid en fouettant, cuire 4 minutes. Sel, poivre, muscade. Elle doit être plus fluide que pour un croque : les feuilles de lasagne vont l'absorber.",
    "Monter|Dans un plat : un peu de sauce au fond, puis alterner feuilles, bolognaise, béchamel, parmesan, sur 3 ou 4 couches. Terminer par béchamel et parmesan.",
    "Cuire|Couvrir d'aluminium 20 minutes à 190 °C, puis découvrir 15 à 20 minutes pour gratiner.",
    "Reposer|Attendre 10 minutes avant de couper : les couches se figent et les parts se tiennent."
  ],
  tips: ["Une bolognaise n'est jamais trop mijotée : 2 heures, c'est encore mieux.", "Les lasagnes se préparent la veille et cuisent le jour même : elles sont même meilleures ainsi."]
}
);

/* ---------- SAIN & ÉQUILIBRÉ ---------- */
RECIPES.push(
{
  id: "s01", name: "Buddha bowl : quinoa, patate douce rôtie, pois chiches croustillants et sauce tahini", category: "sain",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG, T.VN], equipments: ["base", "four"], prepTime: 20, cookTime: 30, difficulty: 1,
  costPerPerson: 3.1, calories: 640, protein: 22,
  skills: ["Rôtir des légumes", "Pois chiches croustillants", "Composer un bowl équilibré"],
  ingredients: [i("Quinoa", 60), i("Patate douce", 180), i("Pois chiches (boîte)", 100), i("Paprika fumé", 1, "càc"), i("Cumin moulu", 0.5, "càc"), i("Chou rouge", 50), i("Carotte", 50), i("Avocat", 0.5, "pièce"), i("Tahini", 20), i("Citron", 0.5, "pièce"), i("Ail", 0.5, "gousse"), i("Graines de courge", 10), i("Huile d'olive", 20, "ml")],
  instructions: [
    "Rôtir|Préchauffer le four à 210 °C. Couper la patate douce en cubes de 2 cm. Sécher soigneusement les pois chiches rincés dans un torchon. Enrober le tout d'huile, paprika, cumin et sel, étaler en une seule couche sur la plaque et rôtir 25 à 30 minutes en remuant à mi-cuisson.",
    "Quinoa|Rincer le quinoa dans une passoire fine (il est recouvert de saponine, amère). Le cuire dans 2 fois son volume d'eau salée 12 minutes, couvrir et laisser gonfler 5 minutes hors du feu : les petits germes blancs se détachent.",
    "Crudités|Émincer très finement le chou rouge, râper la carotte, les assaisonner d'un trait de citron.",
    "Sauce|Fouetter tahini, jus de citron restant, ail râpé, sel, puis de l'eau froide jusqu'à une sauce coulante.",
    "Graines|Torréfier les graines de courge 2 minutes à sec dans une poêle jusqu'à ce qu'elles gonflent et crépitent.",
    "Composer|Disposer chaque élément en quartiers dans un bol, napper de sauce, parsemer de graines."
  ],
  tips: ["Un bowl équilibré, c'est une céréale, une protéine, du cru, du cuit, une sauce et du croquant.", "Si les pois chiches ne croustillent pas, c'est qu'ils étaient humides ou trop serrés sur la plaque."]
},
{
  id: "s02", name: "Poulet rôti aux herbes, légumes racines rôtis et jus court", category: "sain",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["four"], prepTime: 20, cookTime: 45, difficulty: 2,
  costPerPerson: 3.6, calories: 590, protein: 40,
  skills: ["Rôtir sur lit de légumes", "Huile aux herbes sous la peau", "Jus de rôti"],
  ingredients: [i("Cuisse de poulet", 1, "pièce"), i("Carotte", 100), i("Panais", 80), i("Oignon rouge", 0.5, "pièce"), i("Pomme de terre", 120), i("Ail", 3, "gousse"), i("Thym", 1, "càc"), i("Romarin", 0.5, "càc"), i("Citron", 0.5, "pièce"), i("Huile d'olive", 20, "ml"), i("Persil plat", 5)],
  instructions: [
    "Préparer les légumes|Préchauffer le four à 200 °C. Couper carottes, panais et pommes de terre en tronçons de taille égale, l'oignon en quartiers. Les enrober de la moitié de l'huile, sel, thym, et les étaler dans un plat avec les gousses d'ail en chemise (non épluchées).",
    "Herbes sous la peau|Mélanger le reste d'huile, le romarin, le zeste du citron et du sel. Décoller la peau de la cuisse avec les doigts et glisser la moitié du mélange dessous, frotter le reste dessus : la chair est parfumée, la peau dore.",
    "Rôtir|Poser la cuisse sur les légumes, peau vers le haut. Rôtir 40 à 45 minutes. Elle est cuite quand l'os bouge facilement et que le jus est clair à la piqûre.",
    "Repos|Sortir la cuisse et la couvrir lâchement d'aluminium 10 minutes. Remettre les légumes 5 minutes au four s'ils ne sont pas assez dorés.",
    "Jus court|Verser 4 cuillères d'eau et le jus du demi-citron dans le plat chaud, gratter les sucs, presser l'ail rôti hors de sa peau et écraser dans le jus.",
    "Servir|Napper le poulet et les légumes de jus, parsemer de persil."
  ],
  tips: ["L'ail rôti en chemise devient doux et crémeux comme une purée : un trésor à étaler partout.", "Les légumes sous la volaille cuisent dans son jus : aucun beurre nécessaire."]
},
{
  id: "s03", name: "Colin en papillote aux agrumes et fenouil, riz complet aux herbes", category: "sain",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["base", "four"], prepTime: 20, cookTime: 35, difficulty: 1,
  costPerPerson: 4.2, calories: 480, protein: 34,
  skills: ["Papillote", "Émincer un fenouil", "Riz complet"],
  ingredients: [i("Filet de colin", 150), i("Fenouil", 120), i("Orange", 0.5, "pièce"), i("Citron", 0.5, "pièce"), i("Olives noires", 15), i("Thym", 0.5, "càc"), i("Riz complet", 65), i("Persil plat", 10), i("Huile d'olive", 15, "ml")],
  instructions: [
    "Riz complet|Rincer et cuire le riz complet dans 3 fois son volume d'eau salée, 30 minutes à frémissement, puis égoutter : son enveloppe de son demande une cuisson plus longue que le riz blanc.",
    "Fenouil|Couper le fenouil en deux, retirer le trognon dur, émincer très finement. Garder les plumets verts.",
    "Monter la papillote|Sur une grande feuille de papier cuisson, déposer le fenouil, poser le poisson salé, ajouter rondelles d'orange et de citron, olives, thym et un filet d'huile.",
    "Fermer|Rabattre la feuille et plier les bords en petits plis serrés, comme un chausson : la papillote doit être étanche pour cuire à la vapeur de ses propres jus.",
    "Cuire|Enfourner 15 minutes à 200 °C. La papillote gonfle : bon signe.",
    "Servir|Mélanger le riz avec le persil, les plumets de fenouil et un filet d'huile. Ouvrir la papillote à table (attention à la vapeur)."
  ],
  tips: ["Pour un poisson plus épais, comptez 5 minutes de plus.", "Le fenouil cru est anisé, cuit il devient doux et sucré : l'émincer finement lui permet de cuire en même temps que le poisson."]
},
{
  id: "s04", name: "Salade tiède de lentilles, betteraves rôties, chèvre frais et noix", category: "sain",
  diet: [T.SP, T.H, T.SG, T.VG], equipments: ["base", "four"], prepTime: 15, cookTime: 40, difficulty: 1,
  costPerPerson: 2.9, calories: 540, protein: 24,
  skills: ["Rôtir des betteraves", "Vinaigrette au miel", "Torréfier des noix"],
  ingredients: [i("Lentilles vertes", 70), i("Betterave crue", 150), i("Fromage de chèvre", 40), i("Noix", 15), i("Roquette", 40), i("Échalote", 0.5, "pièce"), i("Moutarde", 1, "càc"), i("Miel", 1, "càc"), i("Vinaigre de cidre", 1, "càs"), i("Thym", 0.5, "càc"), i("Huile d'olive", 20, "ml")],
  instructions: [
    "Betteraves|Préchauffer le four à 200 °C. Éplucher et couper les betteraves en quartiers, enrober d'un peu d'huile, thym et sel, rôtir 35 minutes jusqu'à ce qu'elles soient tendres et légèrement caramélisées.",
    "Lentilles|Les cuire dans 3 fois leur volume d'eau non salée, 20 à 25 minutes à frémissement. Égoutter.",
    "Vinaigrette|Ciseler finement l'échalote, la laisser 5 minutes dans le vinaigre (elle s'adoucit). Ajouter moutarde, miel, sel, puis l'huile en fouettant.",
    "Noix|Torréfier les noix 3 minutes à sec à feu moyen en remuant, jusqu'à ce qu'elles sentent le grillé.",
    "Assembler|Mélanger les lentilles tièdes avec la moitié de la vinaigrette, ajouter les betteraves, la roquette, le chèvre émietté et les noix concassées. Arroser du reste de vinaigrette."
  ],
  tips: ["Mettez des gants pour éplucher les betteraves crues, ou épluchez-les après cuisson.", "Le contraste tiède-frais et fondant-croquant fait toute la réussite de la salade."]
},
{
  id: "s05", name: "Wok de dinde aux légumes croquants, nouilles de riz et sauce gingembre", category: "sain",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["base"], prepTime: 20, cookTime: 12, difficulty: 2,
  costPerPerson: 3.4, calories: 560, protein: 40,
  skills: ["Tailler en julienne", "Ordre de cuisson au wok", "Réhydrater des nouilles de riz"],
  ingredients: [i("Escalope de dinde", 140), i("Nouilles de riz", 70), i("Carotte", 60), i("Poivron rouge", 0.5, "pièce"), i("Courgette", 80), i("Oignon vert", 1, "pièce"), i("Gingembre frais", 10), i("Ail", 1, "gousse"), i("Tamari (sauce soja sans gluten)", 20, "ml"), i("Citron vert", 0.5, "pièce"), i("Fécule de maïs", 3), i("Huile neutre", 15, "ml"), i("Cacahuètes", 10), i("Coriandre fraîche", 5)],
  instructions: [
    "Nouilles|Les tremper dans de l'eau très chaude 6 à 8 minutes, égoutter, rincer à l'eau froide : elles ne colleront pas.",
    "Julienne|Tailler carotte, poivron et courgette en bâtonnets fins de même taille (julienne) : ils cuiront tous en 2 minutes.",
    "Dinde|Couper en lanières fines, mélanger avec la fécule et la moitié du tamari.",
    "Sauce|Mélanger le reste du tamari, le jus de citron vert, le gingembre et l'ail râpés et 3 cuillères d'eau.",
    "Wok|Wok fumant, huile, dinde en une couche 2 minutes, puis sauter 1 minute et réserver. Carottes 1 minute, puis poivron et courgette 2 minutes : du plus dur au plus tendre.",
    "Assembler|Remettre la dinde, ajouter les nouilles et la sauce, sauter 1 minute. Parsemer d'oignon vert, cacahuètes concassées et coriandre."
  ],
  tips: ["Un wok qui ne fume pas fait bouillir les légumes : préchauffez-le 2 minutes à vide.", "Les légumes doivent rester croquants et brillants : c'est le signe d'une cuisson au wok réussie."]
},
{
  id: "s06", name: "Truite rôtie, quinoa aux herbes, courgettes grillées et sauce yaourt-aneth", category: "sain",
  diet: [T.SP, T.H, T.SG], equipments: ["base", "four"], prepTime: 20, cookTime: 20, difficulty: 2,
  costPerPerson: 4.8, calories: 560, protein: 42,
  skills: ["Courgettes quadrillées", "Cuisson d'un poisson côté peau", "Sauce aux herbes"],
  ingredients: [i("Filet de truite", 150), i("Quinoa", 60), i("Courgette", 180), i("Yaourt grec", 60), i("Aneth", 5), i("Persil plat", 5), i("Menthe fraîche", 3), i("Citron", 0.5, "pièce"), i("Ail", 0.5, "gousse"), i("Amandes", 10), i("Huile d'olive", 20, "ml")],
  instructions: [
    "Quinoa|Rincer et cuire le quinoa 12 minutes dans 2 fois son volume d'eau salée, puis 5 minutes de repos couvert.",
    "Courgettes|Couper en longues tranches de 5 mm, huiler, saler. Les griller dans une poêle-gril ou une poêle très chaude 2 minutes par face sans bouger, pour marquer de belles lignes.",
    "Sauce|Mélanger le yaourt avec l'aneth haché, l'ail râpé, un trait de citron, sel et poivre.",
    "Truite|Entailler légèrement la peau, saler. Poêle chaude huilée, poser côté peau en appuyant 10 secondes, cuire 4 minutes, puis finir 3 minutes au four à 180 °C ou retourner 1 minute. La peau doit être croustillante, la chair nacrée.",
    "Quinoa aux herbes|Mélanger le quinoa avec persil, menthe, zeste de citron, amandes concassées et un filet d'huile.",
    "Dresser|Quinoa, courgettes, truite peau dessus, sauce à côté."
  ],
  tips: ["Entailler la peau l'empêche de se rétracter et de faire gondoler le filet.", "Le poisson se cuit à 80 % côté peau : elle protège la chair délicate."]
},
{
  id: "s07", name: "Velouté de butternut rôtie au cumin, graines torréfiées et tartines au chèvre", category: "sain",
  diet: [T.SP, T.H, T.VG], equipments: ["four", "mixeur"], prepTime: 15, cookTime: 35, difficulty: 1,
  costPerPerson: 2.6, calories: 480, protein: 15,
  skills: ["Rôtir avant de mixer", "Ajuster la texture d'un velouté", "Graines torréfiées"],
  ingredients: [i("Courge butternut", 350), i("Oignon", 0.5, "pièce"), i("Ail", 1, "gousse"), i("Cumin moulu", 1, "càc"), i("Bouillon de légumes (cube)", 0.5, "pièce"), i("Lait de coco", 40, "ml"), i("Graines de courge", 10), i("Pain de campagne", 1, "tranche"), i("Fromage de chèvre", 30), i("Huile d'olive", 15, "ml")],
  instructions: [
    "Rôtir|Préchauffer le four à 210 °C. Couper la courge épluchée et épépinée en cubes, l'oignon en quartiers, ajouter l'ail en chemise. Huile, cumin, sel. Rôtir 30 minutes : la caramélisation donne au velouté un goût bien plus profond qu'une simple courge bouillie.",
    "Bouillon|Dissoudre le cube dans 300 ml d'eau chaude par personne.",
    "Mixer|Mixer les légumes rôtis (ail épluché) avec les deux tiers du bouillon et le lait de coco. Ajouter le reste du bouillon petit à petit jusqu'à la texture voulue : il doit napper la cuillère.",
    "Graines|Torréfier les graines à sec 2 minutes avec une pincée de sel.",
    "Tartines|Griller le pain, tartiner de chèvre, passer 2 minutes sous le gril.",
    "Servir|Verser le velouté, un filet de lait de coco, les graines, poivre. Tartine à côté."
  ],
  tips: ["On ajoute toujours le liquide progressivement en mixant : trop liquide, un velouté ne se rattrape pas.", "Goûtez et ajustez à la fin : une soupe de courge a souvent besoin d'une pointe d'acidité (citron)."]
},
{
  id: "s08", name: "Cabillaud vapeur, riz complet, légumes verts et sauce gingembre-citron vert", category: "sain",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["vapeur"], prepTime: 15, cookTime: 35, difficulty: 1,
  costPerPerson: 4.6, calories: 500, protein: 38,
  skills: ["Étagement des cuissons vapeur", "Sauce crue asiatique"],
  ingredients: [i("Dos de cabillaud", 150), i("Riz complet", 60), i("Brocoli", 100), i("Haricots verts", 80), i("Courgette", 80), i("Gingembre frais", 10), i("Citron vert", 1, "pièce"), i("Tamari (sauce soja sans gluten)", 15, "ml"), i("Miel", 0.5, "càc"), i("Huile de sésame", 5, "ml"), i("Oignon vert", 1, "pièce"), i("Graines de sésame", 5)],
  instructions: [
    "Riz complet|Lancer le riz complet dans le cuiseur avec la quantité d'eau prévue pour le riz complet (environ 30 minutes).",
    "Préparer|Détailler le brocoli, couper les haricots en tronçons, la courgette en demi-lunes. Saler le poisson et le poser sur des rondelles de citron vert et la moitié du gingembre en lamelles.",
    "Étager|Haricots verts au panier 4 minutes, puis ajouter brocoli et poisson 8 minutes, enfin la courgette les 3 dernières minutes : chaque élément arrive à point en même temps.",
    "Sauce|Mélanger tamari, jus d'un demi-citron vert, reste du gingembre râpé, miel et huile de sésame.",
    "Servir|Riz, légumes, poisson, sauce, oignon vert et sésame."
  ],
  tips: ["Le citron vert sous le poisson parfume la chair pendant la cuisson sans la cuire à l'acide.", "Un poisson vapeur se juge à l'œil : la chair passe de translucide à blanc nacré."]
},
{
  id: "s09", name: "Shakshuka verte aux épinards, courgette et feta, pain grillé", category: "sain",
  diet: [T.SP, T.H, T.VG], equipments: ["base"], prepTime: 15, cookTime: 20, difficulty: 2,
  costPerPerson: 2.7, calories: 470, protein: 24,
  skills: ["Œufs pochés en sauce", "Faire tomber des légumes-feuilles", "Équilibrer avec herbes et acidité"],
  ingredients: [i("Œuf", 2, "pièce"), i("Épinards frais", 150), i("Courgette", 120), i("Poireau", 60), i("Ail", 1, "gousse"), i("Cumin moulu", 0.5, "càc"), i("Feta", 30), i("Yaourt grec", 30), i("Citron", 0.25, "pièce"), i("Aneth", 3), i("Pain de campagne", 1, "tranche"), i("Huile d'olive", 15, "ml"), i("Piment d'Espelette", 0.25, "càc")],
  instructions: [
    "Base|Émincer finement le poireau, le faire fondre 5 minutes dans l'huile. Ajouter la courgette râpée et l'ail, cuire 5 minutes jusqu'à ce que l'eau s'évapore.",
    "Verdure|Ajouter les épinards par poignées et le cumin : ils tombent en 2 minutes. Saler, ajouter un trait de citron.",
    "Pocher les œufs|Creuser deux puits avec une cuillère, y casser les œufs, saler le blanc. Couvrir et cuire 5 à 6 minutes à feu doux : les blancs doivent être pris et les jaunes tremblants.",
    "Finir|Parsemer de feta émiettée, de piment, d'aneth et de quelques points de yaourt.",
    "Servir|Directement dans la poêle avec le pain grillé."
  ],
  tips: ["Le couvercle est indispensable : la vapeur cuit le dessus du blanc sans durcir le jaune.", "Si les blancs tardent à prendre, arrosez-les de sauce chaude à la cuillère."]
},
{
  id: "s10", name: "Curry léger de poulet au lait de coco, épinards et riz basmati", category: "sain",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["base"], prepTime: 15, cookTime: 30, difficulty: 2,
  costPerPerson: 3.4, calories: 620, protein: 42,
  skills: ["Faire revenir une pâte d'aromates", "Mijoter au lait de coco", "Riz basmati parfait"],
  ingredients: [i("Blanc de poulet", 150), i("Oignon", 0.5, "pièce"), i("Ail", 2, "gousse"), i("Gingembre frais", 10), i("Curry en poudre", 1.5, "càc"), i("Garam masala", 0.5, "càc"), i("Tomates concassées", 80), i("Lait de coco", 80, "ml"), i("Épinards frais", 80), i("Riz basmati", 65), i("Citron vert", 0.5, "pièce"), i("Coriandre fraîche", 5), i("Huile neutre", 10, "ml")],
  instructions: [
    "Riz basmati|Rincer jusqu'à eau claire, faire tremper 20 minutes si possible (grains plus longs), cuire dans 1,5 fois son volume d'eau salée, couvert, 10 minutes à feu très doux, puis 5 minutes de repos.",
    "Pâte d'aromates|Mixer ou hacher très finement oignon, ail et gingembre. Les faire revenir dans l'huile 8 minutes à feu moyen jusqu'à ce qu'ils dorent et que l'huile se sépare : c'est la base de tout curry indien.",
    "Épices|Ajouter curry et garam masala, remuer 30 secondes, puis les tomates, cuire 5 minutes.",
    "Poulet|Ajouter le poulet en cubes, enrober, verser le lait de coco et 50 ml d'eau. Mijoter 12 minutes à feu doux sans bouillir fort : le poulet reste tendre.",
    "Épinards|Les ajouter pour les 2 dernières minutes, puis le jus de citron vert. Rectifier le sel.",
    "Servir|Sur le riz, avec la coriandre."
  ],
  tips: ["Un blanc de poulet bouilli à gros bouillons devient filandreux : le frémissement suffit.", "L'huile qui perle à la surface de la base indique que l'eau est évaporée et les aromates prêts."]
},
{
  id: "s11", name: "Steak de chou-fleur rôti, purée de haricots blancs à l'ail et gremolata", category: "sain",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG, T.VN], equipments: ["base", "four", "mixeur"], prepTime: 15, cookTime: 30, difficulty: 2,
  costPerPerson: 2.8, calories: 470, protein: 18,
  skills: ["Découper un steak de légume", "Purée de légumineuses", "Gremolata"],
  ingredients: [i("Chou-fleur", 300), i("Haricots blancs (boîte)", 120), i("Ail", 2, "gousse"), i("Citron", 0.5, "pièce"), i("Persil plat", 10), i("Câpres", 1, "càc"), i("Paprika fumé", 0.5, "càc"), i("Amandes", 15), i("Huile d'olive", 30, "ml")],
  instructions: [
    "Découper|Couper le chou-fleur verticalement en tranches de 2 cm en passant par le trognon, qui maintient la tranche entière. Garder les bouquets tombés pour la plaque.",
    "Saisir et rôtir|Préchauffer le four à 220 °C. Badigeonner les tranches d'huile, paprika et sel, les saisir 3 minutes par face dans une poêle chaude, puis 15 à 20 minutes au four jusqu'à ce qu'un couteau entre facilement au centre.",
    "Purée|Faire chauffer les haricots rincés avec une gousse d'ail émincée, 2 cuillères d'huile et 3 cuillères d'eau, 5 minutes. Mixer avec un trait de citron et du sel jusqu'à une purée lisse et soyeuse.",
    "Gremolata|Hacher finement persil, zeste de citron, la seconde gousse d'ail, câpres et amandes torréfiées. Ajouter un filet d'huile.",
    "Dresser|Purée en fond d'assiette étalée à la cuillère, steak de chou-fleur dessus, gremolata généreuse."
  ],
  tips: ["La gremolata, condiment milanais, réveille n'importe quel plat rôti : zeste, ail, persil.", "Les haricots blancs en purée remplacent la crème : onctueux et riches en protéines."]
},
{
  id: "s12", name: "Salade niçoise composée : haricots verts, œuf mollet, thon, pommes de terre et anchois", category: "sain",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["base"], prepTime: 20, cookTime: 20, difficulty: 2,
  costPerPerson: 3.9, calories: 560, protein: 34,
  skills: ["Œuf mollet", "Légumes blanchis-rafraîchis", "Vinaigrette à l'anchois"],
  ingredients: [i("Thon au naturel (boîte)", 80), i("Œuf", 1, "pièce"), i("Pomme de terre grenaille", 150), i("Haricots verts", 100), i("Tomates cerises", 100), i("Olives noires", 20), i("Anchois à l'huile", 3, "pièce"), i("Oignon rouge", 0.25, "pièce"), i("Salade verte", 40), i("Moutarde", 1, "càc"), i("Vinaigre de cidre", 1, "càs"), i("Huile d'olive", 20, "ml"), i("Basilic frais", 3)],
  instructions: [
    "Pommes de terre|Les cuire dans l'eau froide salée portée à ébullition 15 minutes. Couper en deux et assaisonner tièdes d'un peu de vinaigrette : elles l'absorbent.",
    "Haricots|Les cuire 6 minutes dans l'eau bouillante salée, puis les plonger dans l'eau glacée.",
    "Œuf mollet|Plonger l'œuf à température ambiante dans l'eau bouillante exactement 6 minutes 30, puis eau glacée 3 minutes. Écaler délicatement : jaune coulant, blanc ferme.",
    "Vinaigrette|Écraser 1 anchois à la fourchette avec la moutarde, ajouter vinaigre, puis huile en fouettant. L'anchois fond et apporte un salé profond, pas un goût de poisson.",
    "Composer|Salade, pommes de terre, haricots, tomates coupées, oignon émincé, olives, thon en gros morceaux, anchois restants, œuf coupé en deux. Napper de vinaigrette, basilic déchiré."
  ],
  tips: ["Une salade composée se dresse par éléments distincts plutôt que mélangée : chaque bouchée se compose à la fourchette.", "L'eau glacée stoppe la cuisson de l'œuf net : sans elle, le jaune continue de cuire."]
},
{
  id: "s13", name: "Saumon en papillote au micro-ondes, légumes et quinoa au citron", category: "sain",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["micro-ondes"], prepTime: 15, cookTime: 15, difficulty: 1,
  costPerPerson: 4.9, calories: 560, protein: 36,
  skills: ["Cuisson vapeur au micro-ondes", "Quinoa au micro-ondes", "Gérer la puissance"],
  ingredients: [i("Pavé de saumon", 130), i("Quinoa", 60), i("Courgette", 100), i("Tomates cerises", 80), i("Épinards frais", 50), i("Citron", 0.5, "pièce"), i("Aneth", 3), i("Huile d'olive", 15, "ml")],
  instructions: [
    "Quinoa|Rincer le quinoa, le mettre dans un grand bol avec 2 fois son volume d'eau et une pincée de sel. Couvrir d'une assiette sans serrer et cuire 8 minutes à 800 W, puis laisser gonfler 5 minutes couvert.",
    "Légumes|Couper la courgette en fines demi-lunes et les tomates en deux, les disposer dans un plat creux avec les épinards, un filet d'huile et du sel.",
    "Poisson|Poser le saumon salé dessus, avec des rondelles de citron et l'aneth. Couvrir hermétiquement (assiette ou film micro-ondes percé d'un trou).",
    "Cuire|5 à 6 minutes à 600 W : une puissance moyenne cuit plus uniformément qu'une puissance maximale qui durcit les bords. Laisser reposer 2 minutes couvert : la cuisson s'achève.",
    "Servir|Mélanger le quinoa avec zeste et jus de citron et un filet d'huile, servir avec le saumon et ses légumes arrosés de leur jus."
  ],
  tips: ["Le repos est une vraie étape au micro-ondes : la chaleur se répartit vers le centre.", "Les puissances varient selon les appareils : vérifiez le saumon et prolongez par 30 secondes."]
},
{
  id: "s14", name: "Bouillon thaï au poulet, citronnelle et lait de coco (tom kha), nouilles de riz", category: "sain",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["base"], prepTime: 20, cookTime: 20, difficulty: 2,
  costPerPerson: 3.8, calories: 520, protein: 34,
  skills: ["Infuser un bouillon", "Équilibre thaï : salé, acide, sucré, piquant", "Pocher dans un bouillon"],
  ingredients: [i("Blanc de poulet", 120), i("Lait de coco", 120, "ml"), i("Citronnelle", 1, "pièce"), i("Gingembre frais", 15), i("Champignons de Paris", 80), i("Tomates cerises", 60), i("Sauce nuoc-mâm", 2, "càc"), i("Sucre", 0.5, "càc"), i("Citron vert", 1, "pièce"), i("Piment d'Espelette", 0.25, "càc"), i("Nouilles de riz", 50), i("Coriandre fraîche", 10)],
  instructions: [
    "Infuser|Écraser la citronnelle avec le dos d'un couteau et la couper en tronçons, trancher le gingembre. Les mettre dans 250 ml d'eau par personne et frémir 10 minutes : les fibres libèrent leurs huiles parfumées.",
    "Bouillon|Ajouter le lait de coco, les champignons émincés et les tomates. Garder à frémissement, sans bouillir, pour que le coco ne tranche pas.",
    "Pocher le poulet|Ajouter le poulet en fines tranches, 5 minutes : il reste tendre.",
    "Nouilles|Les tremper dans l'eau très chaude 6 minutes, égoutter, répartir dans les bols.",
    "Assaisonner|Hors du feu : nuoc-mâm, sucre, jus du citron vert, piment. Goûter et ajuster jusqu'à ce que salé, acide, sucré et piquant soient en équilibre.",
    "Servir|Verser le bouillon sur les nouilles (retirer la citronnelle), coriandre généreuse."
  ],
  tips: ["Le citron vert s'ajoute hors du feu : cuit, il devient amer.", "Goûter en cuisine thaïe, c'est ajuster quatre curseurs : notez ce que vous ajoutez pour reproduire."]
},
{
  id: "s15", name: "Frittata aux légumes rôtis et herbes, salade de roquette au parmesan", category: "sain",
  diet: [T.SP, T.H, T.SG, T.VG], equipments: ["base", "four"], prepTime: 15, cookTime: 30, difficulty: 2,
  costPerPerson: 2.8, calories: 500, protein: 28,
  skills: ["Frittata épaisse", "Cuisson démarrée au feu, finie au four", "Démouler"],
  ingredients: [i("Œuf", 3, "pièce"), i("Poivron rouge", 0.5, "pièce"), i("Courgette", 100), i("Oignon rouge", 0.25, "pièce"), i("Pomme de terre", 80), i("Basilic frais", 5), i("Parmesan", 20), i("Roquette", 40), i("Citron", 0.25, "pièce"), i("Huile d'olive", 20, "ml")],
  instructions: [
    "Légumes|Couper pomme de terre en petits dés, poivron, courgette et oignon en morceaux. Les faire sauter 12 minutes dans une poêle allant au four avec l'huile, en commençant par la pomme de terre, jusqu'à ce qu'ils soient tendres et dorés.",
    "Appareil|Battre les œufs avec la moitié du parmesan, le basilic ciselé, sel et poivre.",
    "Prendre|Verser sur les légumes, remuer doucement 30 secondes, puis laisser prendre 4 minutes à feu doux sans toucher : le dessous fixe.",
    "Four|Finir 8 à 10 minutes à 180 °C : elle gonfle et le centre est juste pris quand on secoue la poêle.",
    "Démouler|Laisser tiédir 3 minutes, passer une spatule sur les bords et la faire glisser sur une planche.",
    "Salade|Roquette, copeaux du reste de parmesan, citron, huile."
  ],
  tips: ["La frittata se mange aussi froide : parfaite en lunch box le lendemain.", "Un manche de poêle en plastique ne va pas au four : utilisez un plat à gratin huilé si besoin."]
},
{
  id: "s16", name: "Brochettes de dinde citron-origan et salade grecque de quinoa", category: "sain",
  diet: [T.SP, T.H, T.SG], equipments: ["base"], prepTime: 25, cookTime: 15, difficulty: 1,
  costPerPerson: 3.5, calories: 560, protein: 45,
  skills: ["Brochettes régulières", "Marinade express", "Salade de céréales"],
  ingredients: [i("Escalope de dinde", 150), i("Citron", 1, "pièce"), i("Origan", 1, "càc"), i("Ail", 1, "gousse"), i("Quinoa", 55), i("Concombre", 80), i("Tomates cerises", 80), i("Oignon rouge", 0.25, "pièce"), i("Olives noires", 15), i("Feta", 30), i("Huile d'olive", 25, "ml")],
  instructions: [
    "Mariner|Couper la dinde en cubes réguliers de 3 cm. Mélanger avec le jus d'un demi-citron, le zeste, l'origan, l'ail râpé, la moitié de l'huile et du sel. 15 minutes suffisent.",
    "Quinoa|Rincer, cuire 12 minutes dans 2 fois son volume d'eau salée, laisser gonfler et refroidir étalé dans une assiette.",
    "Brochettes|Enfiler les cubes sans les tasser : l'air entre les morceaux permet une cuisson homogène.",
    "Griller|Poêle-gril bien chaude, 8 à 10 minutes en tournant toutes les 2 minutes. La dinde doit être dorée et cuite à cœur.",
    "Salade grecque|Mélanger quinoa, concombre et tomates en dés, oignon émincé, olives, feta, reste d'huile et de jus de citron.",
    "Servir|Brochettes sur la salade."
  ],
  tips: ["La dinde maigre sèche vite : retirez-la du feu dès qu'elle n'est plus rosée.", "Laissez refroidir le quinoa avant d'ajouter la feta, sinon elle fond."]
}
);

/* ---------- VÉGÉTALIEN / VEGAN ---------- */
RECIPES.push(
{
  id: "v01", name: "Chana masala : pois chiches mijotés aux épices, riz basmati et oignons pickles", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG, T.VN], equipments: ["base"], prepTime: 15, cookTime: 35, difficulty: 2,
  costPerPerson: 2.3, calories: 620, protein: 20,
  skills: ["Base oignon-ail-gingembre", "Épices entières et moulues", "Lier une sauce aux légumineuses"],
  ingredients: [i("Pois chiches (boîte)", 150), i("Oignon", 1, "pièce"), i("Ail", 2, "gousse"), i("Gingembre frais", 10), i("Graines de cumin", 0.5, "càc"), i("Garam masala", 1, "càc"), i("Curcuma", 0.5, "càc"), i("Coriandre moulue", 1, "càc"), i("Tomates concassées", 150), i("Épinards frais", 60), i("Citron", 0.5, "pièce"), i("Riz basmati", 65), i("Coriandre fraîche", 5), i("Huile neutre", 15, "ml")],
  instructions: [
    "Pickles d'oignon|Émincer un quart de l'oignon en fines lamelles, le mélanger avec le jus du demi-citron et une pincée de sel. Il devient rose et doux en 20 minutes.",
    "Épices entières|Chauffer l'huile, ajouter les graines de cumin : quand elles crépitent et brunissent (20 secondes), le reste de l'oignon haché finement.",
    "Base|Faire dorer l'oignon 10 minutes : il doit être brun doré, c'est la couleur et la douceur de la sauce. Ajouter ail et gingembre râpés 1 minute, puis les épices moulues 30 secondes.",
    "Mijoter|Ajouter les tomates, cuire 5 minutes jusqu'à ce que l'huile perle sur les bords. Ajouter les pois chiches rincés et 100 ml d'eau, mijoter 15 minutes.",
    "Lier|Écraser une cuillère de pois chiches contre la paroi : leur purée épaissit naturellement la sauce. Ajouter les épinards 2 minutes.",
    "Riz et service|Cuire le riz basmati rincé (1,5 fois son volume d'eau, 10 minutes couvert, 5 minutes de repos). Servir avec la coriandre et les oignons pickles."
  ],
  tips: ["La couleur de l'oignon fait le goût d'un curry : pâle, la sauce sera fade.", "Le garam masala est un mélange de finition : il en faut aussi une pincée à la fin pour raviver le parfum."]
},
{
  id: "v02", name: "Dal de lentilles corail, tadka à l'ail et au cumin, riz et chou rouge", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG, T.VN], equipments: ["base"], prepTime: 10, cookTime: 30, difficulty: 2,
  costPerPerson: 1.9, calories: 590, protein: 24,
  skills: ["Tadka (huile aux épices versée à la fin)", "Texture d'un dal", "Écumer"],
  ingredients: [i("Lentilles corail", 80), i("Curcuma", 0.5, "càc"), i("Gingembre frais", 8), i("Tomate", 80), i("Lait de coco", 40, "ml"), i("Ail", 2, "gousse"), i("Graines de cumin", 0.5, "càc"), i("Graines de moutarde", 0.5, "càc"), i("Piment d'Espelette", 0.25, "càc"), i("Riz basmati", 60), i("Chou rouge", 50), i("Citron", 0.5, "pièce"), i("Coriandre fraîche", 5), i("Huile neutre", 20, "ml")],
  instructions: [
    "Cuire les lentilles|Rincer les lentilles plusieurs fois jusqu'à ce que l'eau soit claire. Les couvrir de 3 fois leur volume d'eau avec le curcuma et le gingembre râpé. Porter à frémissement et retirer l'écume blanche qui monte.",
    "Mijoter|Ajouter la tomate en dés et cuire 20 minutes à feu doux en remuant : les lentilles se défont en purée. Ajouter le lait de coco et saler. Texture visée : une soupe épaisse qui coule lentement de la louche.",
    "Riz|Cuire le riz basmati rincé dans 1,5 fois son volume d'eau, couvert, 10 minutes puis 5 minutes de repos.",
    "Chou|Émincer finement le chou rouge, l'assaisonner de citron et sel.",
    "Tadka|Au moment de servir, chauffer l'huile dans une petite poêle, ajouter graines de moutarde et de cumin : quand elles sautent, l'ail en lamelles. Dès qu'il est blond (30 secondes), le piment, et verser immédiatement sur le dal. Ça grésille : c'est voulu.",
    "Servir|Dal, riz, chou, coriandre et un quartier de citron."
  ],
  tips: ["Le tadka transforme une purée de lentilles en plat parfumé : c'est l'étape qui fait tout.", "L'ail brûlé est amer : retirez la poêle du feu dès qu'il est blond, la chaleur continue de le colorer."]
},
{
  id: "v03", name: "Tofu croustillant sauce sucrée-salée façon général Tso, brocoli et riz", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG, T.VN], equipments: ["base"], prepTime: 25, cookTime: 20, difficulty: 2,
  costPerPerson: 2.9, calories: 680, protein: 28,
  skills: ["Presser le tofu", "Enrober de fécule", "Sauce laquée à la fécule"],
  ingredients: [i("Tofu ferme", 150), i("Fécule de maïs", 25), i("Tamari (sauce soja sans gluten)", 25, "ml"), i("Sucre", 2, "càc"), i("Vinaigre de riz", 1, "càs"), i("Concentré de tomate", 1, "càc"), i("Ail", 2, "gousse"), i("Gingembre frais", 8), i("Piment d'Espelette", 0.25, "càc"), i("Brocoli", 120), i("Riz jasmin", 70), i("Oignon vert", 1, "pièce"), i("Graines de sésame", 5), i("Huile neutre", 30, "ml")],
  instructions: [
    "Presser|Envelopper le tofu dans un torchon et poser un poids dessus 15 minutes : moins il y a d'eau, plus il croustille et mieux il absorbe la sauce. Couper en cubes de 2 cm.",
    "Riz|Cuire le riz rincé avec 1,3 fois son volume d'eau, couvert, 12 minutes puis 5 minutes de repos.",
    "Sauce|Mélanger tamari, sucre, vinaigre, concentré, 1 cuillère de fécule et 80 ml d'eau.",
    "Enrober et frire|Enrober le tofu du reste de fécule avec une pincée de sel. Chauffer l'huile à feu moyen-vif et dorer les cubes 8 minutes en les retournant, jusqu'à ce qu'ils soient croustillants sur toutes les faces. Égoutter.",
    "Brocoli|Dans la même poêle, sauter le brocoli 2 minutes, ajouter 3 cuillères d'eau, couvrir 2 minutes. Réserver.",
    "Laquer|Faire revenir ail, gingembre et piment 30 secondes, verser la sauce : elle épaissit et devient brillante en 1 minute. Remettre le tofu, enrober rapidement et servir aussitôt sur le riz avec le brocoli, oignon vert et sésame."
  ],
  tips: ["N'enrobez le tofu de sauce qu'au dernier moment : il perd son croustillant en quelques minutes.", "Agitez la sauce avant de la verser : la fécule tombe au fond."]
},
{
  id: "v04", name: "Chili sin carne aux haricots et patate douce, guacamole et riz", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG, T.VN], equipments: ["base"], prepTime: 20, cookTime: 40, difficulty: 1,
  costPerPerson: 2.4, calories: 650, protein: 20,
  skills: ["Construire du goût sans viande", "Mijotage", "Guacamole"],
  ingredients: [i("Haricots rouges (boîte)", 80), i("Haricots noirs (boîte)", 60), i("Patate douce", 120), i("Oignon", 0.5, "pièce"), i("Poivron rouge", 0.5, "pièce"), i("Ail", 2, "gousse"), i("Cumin moulu", 1, "càc"), i("Paprika fumé", 1, "càc"), i("Cacao en poudre", 0.5, "càc"), i("Concentré de tomate", 1, "càs"), i("Tomates concassées", 150), i("Riz basmati", 55), i("Avocat", 0.5, "pièce"), i("Citron vert", 0.5, "pièce"), i("Coriandre fraîche", 5), i("Huile d'olive", 15, "ml")],
  instructions: [
    "Base|Faire revenir oignon et poivron en dés 8 minutes jusqu'à coloration, ajouter l'ail 1 minute.",
    "Épices et umami|Ajouter cumin, paprika, cacao et concentré de tomate, cuire 1 minute en remuant. Le cacao non sucré apporte une profondeur qui remplace le goût de la viande, sans se reconnaître.",
    "Mijoter|Ajouter les tomates, la patate douce en dés de 1,5 cm et 150 ml d'eau. Mijoter 20 minutes, puis les haricots rincés 10 minutes. La patate douce se défait en partie et épaissit.",
    "Riz|Cuire le riz rincé dans 2 fois son volume d'eau salée, couvert, 12 minutes.",
    "Guacamole|Écraser l'avocat avec jus de citron vert, coriandre et sel.",
    "Servir|Chili sur le riz, guacamole, un trait de citron vert."
  ],
  tips: ["Le paprika fumé est le meilleur ami de la cuisine végétale : il apporte le goût grillé du barbecue.", "Comme tous les chilis, il est meilleur le lendemain."]
},
{
  id: "v05", name: "Bolognaise de lentilles et champignons, spaghetti et chapelure à l'ail", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.VG, T.VN], equipments: ["base"], prepTime: 20, cookTime: 40, difficulty: 2,
  costPerPerson: 2.0, calories: 680, protein: 27,
  skills: ["Hacher des champignons pour une texture « viande »", "Soffritto", "Pangrattato (chapelure frite)"],
  ingredients: [i("Lentilles vertes", 50), i("Champignons de Paris", 120), i("Oignon", 0.25, "pièce"), i("Carotte", 40), i("Céleri branche", 30), i("Ail", 2, "gousse"), i("Concentré de tomate", 1, "càs"), i("Tomates concassées", 150), i("Sauce soja", 5, "ml"), i("Origan", 0.5, "càc"), i("Spaghetti", 90), i("Chapelure", 15), i("Persil plat", 5), i("Huile d'olive", 25, "ml")],
  instructions: [
    "Lentilles|Cuire les lentilles dans 3 fois leur volume d'eau non salée 20 minutes. Égoutter.",
    "Champignons|Hacher les champignons très finement au couteau. Les saisir à feu vif dans un filet d'huile 8 minutes jusqu'à ce que toute leur eau s'évapore et qu'ils brunissent : ils prennent une texture et un goût de viande hachée.",
    "Soffritto|Ajouter oignon, carotte et céleri hachés très fin, cuire 8 minutes à feu moyen. Puis l'ail et le concentré 1 minute.",
    "Mijoter|Ajouter tomates, lentilles, sauce soja (umami), origan et un verre d'eau. Mijoter 15 minutes.",
    "Pangrattato|Dorer la chapelure dans 1 cuillère d'huile avec une demi-gousse d'ail râpée et le persil haché, 2 minutes. C'est le parmesan du pauvre des Italiens du Sud.",
    "Servir|Cuire les spaghetti, les mélanger à la sauce avec un peu d'eau de cuisson, parsemer de pangrattato."
  ],
  tips: ["Les champignons ne dorent que s'ils ont de la place : utilisez la plus grande poêle possible.", "Une cuillère de sauce soja dans une sauce tomate végétale apporte le goût profond qui manquerait sans viande."]
},
{
  id: "v06", name: "Ramen au bouillon miso-sésame, tofu grillé, champignons et maïs", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.VG, T.VN], equipments: ["base"], prepTime: 20, cookTime: 25, difficulty: 2,
  costPerPerson: 3.2, calories: 660, protein: 28,
  skills: ["Bouillon aromatique express", "Délayer le miso hors ébullition", "Garnitures de ramen"],
  ingredients: [i("Nouilles ramen", 80), i("Tofu ferme", 100), i("Miso blanc", 25), i("Tahini", 15), i("Sauce soja", 15, "ml"), i("Gingembre frais", 10), i("Ail", 2, "gousse"), i("Champignons de Paris", 80), i("Maïs (boîte)", 40), i("Épinards frais", 40), i("Oignon vert", 1, "pièce"), i("Huile de sésame", 5, "ml"), i("Graines de sésame", 5), i("Huile neutre", 10, "ml")],
  instructions: [
    "Bouillon|Dorer l'ail et le gingembre émincés dans l'huile neutre 2 minutes, ajouter les queues de champignons et 400 ml d'eau par personne. Frémir 15 minutes, puis filtrer.",
    "Tofu|Couper le tofu pressé en tranches, le dorer à la poêle 3 minutes par face avec une goutte de sauce soja en fin de cuisson.",
    "Champignons|Émincer les chapeaux et les saisir 4 minutes dans la même poêle.",
    "Miso|Hors du feu, délayer le miso et le tahini dans une louche de bouillon chaud, puis reverser dans la casserole avec le reste de sauce soja. Ne plus faire bouillir : l'ébullition détruit les arômes du miso.",
    "Nouilles|Cuire les nouilles à part selon le paquet (leur amidon troublerait le bouillon), égoutter.",
    "Monter|Nouilles dans un bol chaud, bouillon, puis tofu, champignons, maïs, épinards crus (ils cuisent au contact), oignon vert, sésame et huile de sésame."
  ],
  tips: ["Chauffez les bols à l'eau chaude : un ramen tiède perd la moitié de son plaisir.", "Le miso blanc est doux et légèrement sucré, le rouge plus puissant : commencez par le blanc."]
},
{
  id: "v07", name: "Tajine de légumes aux abricots secs et pois chiches, semoule aux amandes", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.VG, T.VN], equipments: ["base"], prepTime: 20, cookTime: 40, difficulty: 2,
  costPerPerson: 2.6, calories: 640, protein: 18,
  skills: ["Mijoter à l'étouffée", "Sucré-salé", "Semoule légère"],
  ingredients: [i("Carotte", 100), i("Courgette", 100), i("Patate douce", 80), i("Oignon", 0.5, "pièce"), i("Pois chiches (boîte)", 80), i("Abricots secs", 25), i("Ras el hanout", 1, "càc"), i("Cannelle", 0.25, "càc"), i("Gingembre frais", 5), i("Ail", 1, "gousse"), i("Citron", 0.25, "pièce"), i("Semoule", 65), i("Amandes", 15), i("Coriandre fraîche", 5), i("Huile d'olive", 20, "ml")],
  instructions: [
    "Base|Faire fondre l'oignon émincé 6 minutes dans la moitié de l'huile, ajouter ail, gingembre râpé, ras el hanout et cannelle 1 minute.",
    "Étouffée|Ajouter carottes et patate douce en gros morceaux, pois chiches, abricots coupés en deux et 150 ml d'eau. Couvrir et cuire 20 minutes à feu doux : les légumes cuisent dans leur vapeur et la sauce reste concentrée.",
    "Courgette|Ajouter la courgette en gros tronçons et poursuivre 10 minutes. Elle doit rester entière.",
    "Semoule|Verser la semoule dans un saladier avec le reste d'huile et le sel, l'humidifier d'autant d'eau bouillante, couvrir 5 minutes puis égrainer longuement à la fourchette, en frottant entre les mains si besoin.",
    "Amandes|Les dorer à sec 3 minutes et les mélanger à la semoule.",
    "Servir|Finir le tajine avec le jus de citron et la coriandre, servir sur la semoule."
  ],
  tips: ["Coupez les légumes en gros morceaux : dans un tajine, ils doivent rester entiers et fondants, pas en purée.", "L'acidité finale du citron équilibre le sucre des abricots."]
},
{
  id: "v08", name: "Risotto aux champignons et petits pois, huile de persil", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.VG, T.VN], equipments: ["base"], prepTime: 15, cookTime: 30, difficulty: 3,
  costPerPerson: 2.7, calories: 600, protein: 15,
  skills: ["Nacrer et mouiller un risotto", "Mantecatura sans beurre", "Huile d'herbes"],
  ingredients: [i("Riz arborio", 80), i("Champignons de Paris", 150), i("Petits pois (boîte)", 60), i("Échalote", 1, "pièce"), i("Ail", 1, "gousse"), i("Bouillon de légumes (cube)", 0.5, "pièce"), i("Vinaigre de cidre", 1, "càc"), i("Persil plat", 15), i("Huile d'olive", 35, "ml"), i("Citron", 0.25, "pièce")],
  instructions: [
    "Bouillon chaud|Dissoudre le cube dans 350 ml d'eau par personne et le garder frémissant : un bouillon froid casse la cuisson du riz.",
    "Huile de persil|Mixer le persil avec 20 ml d'huile et une pincée de sel jusqu'à ce que l'huile devienne verte. Réserver.",
    "Champignons|Saisir les champignons émincés à feu vif dans une cuillère d'huile 6 minutes, saler, réserver.",
    "Nacrer|Faire suer l'échalote ciselée et l'ail 3 minutes, ajouter le riz non rincé et remuer 2 minutes jusqu'à ce que les grains soient brillants et translucides sur les bords. Déglacer au vinaigre.",
    "Mouiller|Ajouter le bouillon louche par louche, en remuant régulièrement, et en attendant que chaque louche soit presque absorbée. Le frottement des grains libère l'amidon qui crée l'onctuosité. 17 à 18 minutes.",
    "Mantecatura|Quand le riz est tendre mais garde un léger croquant au centre, ajouter champignons et petits pois, couper le feu, ajouter le reste d'huile et le citron et remuer énergiquement 1 minute. Il doit « faire la vague » : couler lentement dans l'assiette.",
    "Servir|Dans une assiette chaude, avec un filet d'huile de persil."
  ],
  tips: ["Un risotto n'attend pas : il se sert dans la minute, sinon il fige.", "Le vinaigre remplace le vin blanc pour apporter l'acidité qui équilibre l'amidon."]
},
{
  id: "v09", name: "Tacos de patate douce rôtie et haricots noirs, salsa mangue-citron vert", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG, T.VN], equipments: ["base", "four"], prepTime: 20, cookTime: 25, difficulty: 1,
  costPerPerson: 2.9, calories: 610, protein: 16,
  skills: ["Salsa de fruit", "Réchauffer des tortillas de maïs", "Équilibrer sucré et acide"],
  ingredients: [i("Patate douce", 180), i("Haricots noirs (boîte)", 90), i("Cumin moulu", 1, "càc"), i("Paprika fumé", 1, "càc"), i("Tortilla de maïs", 3, "pièce"), i("Mangue", 0.25, "pièce"), i("Oignon rouge", 0.25, "pièce"), i("Citron vert", 1, "pièce"), i("Coriandre fraîche", 10), i("Chou rouge", 40), i("Avocat", 0.5, "pièce"), i("Huile d'olive", 15, "ml")],
  instructions: [
    "Rôtir|Couper la patate douce en dés de 1,5 cm, l'enrober d'huile, cumin, paprika et sel. Rôtir 25 minutes à 210 °C.",
    "Haricots|Les réchauffer avec un filet d'huile et une pincée de cumin, en écrasant légèrement la moitié.",
    "Salsa mangue|Couper la mangue en petits dés, ajouter oignon rouge ciselé, coriandre, jus d'un demi-citron vert et sel. Le sucre de la mangue et l'acidité du citron vert se répondent.",
    "Avocat|Écraser l'avocat avec le reste du citron vert et du sel.",
    "Tortillas|Les chauffer 30 secondes par face dans une poêle très chaude sèche : elles doivent être souples et tachetées. Une tortilla de maïs froide casse.",
    "Garnir|Avocat, haricots, patate douce, chou rouge émincé, salsa."
  ],
  tips: ["Gardez les tortillas chaudes empilées dans un torchon : elles restent souples.", "Hors saison, l'ananas remplace très bien la mangue."]
},
{
  id: "v10", name: "Pad thaï au tofu, nouilles de riz sautées et cacahuètes", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG, T.VN], equipments: ["base"], prepTime: 20, cookTime: 12, difficulty: 3,
  costPerPerson: 2.8, calories: 680, protein: 24,
  skills: ["Sauce pad thaï", "Sauter des nouilles sans les casser", "Mise en place complète"],
  ingredients: [i("Nouilles de riz", 80), i("Tofu ferme", 100), i("Tamari (sauce soja sans gluten)", 20, "ml"), i("Sucre", 2, "càc"), i("Citron vert", 1, "pièce"), i("Concentré de tomate", 0.5, "càc"), i("Ail", 2, "gousse"), i("Oignon vert", 2, "pièce"), i("Pousses de soja", 60), i("Carotte", 50), i("Cacahuètes", 20), i("Piment d'Espelette", 0.25, "càc"), i("Coriandre fraîche", 5), i("Huile neutre", 25, "ml")],
  instructions: [
    "Nouilles|Les tremper dans de l'eau tiède (pas bouillante) 20 à 25 minutes : elles doivent être souples mais encore fermes. Elles finiront de cuire dans la sauce.",
    "Sauce|Mélanger tamari, sucre, jus d'un demi-citron vert, concentré et 3 cuillères d'eau. Goûter : sucré, salé, acide doivent s'équilibrer.",
    "Mise en place|Tofu pressé en bâtonnets, ail haché, oignons verts en tronçons, carotte en julienne, cacahuètes concassées. Tout doit être prêt à côté du feu.",
    "Tofu|Wok très chaud, la moitié de l'huile, dorer le tofu 4 minutes. Réserver.",
    "Nouilles|Reste d'huile, ail 15 secondes, nouilles égouttées et sauce. Sauter 2 à 3 minutes en soulevant avec deux spatules : elles absorbent la sauce et deviennent brillantes. Ajouter un trait d'eau si elles collent.",
    "Finir|Tofu, carotte, oignons verts et la moitié des pousses de soja, 30 secondes. Servir avec cacahuètes, reste des pousses crues, coriandre, piment et quartier de citron vert."
  ],
  tips: ["Des nouilles trempées dans l'eau bouillante deviennent pâteuses au wok : c'est l'erreur numéro un du pad thaï.", "La pâte de tamarin est l'ingrédient traditionnel ; le citron vert et le concentré de tomate l'imitent."]
},
{
  id: "v11", name: "Tofu mariné vapeur, riz parfumé, légumes et sauce gingembre-oignon vert", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG, T.VN], equipments: ["vapeur"], prepTime: 20, cookTime: 25, difficulty: 1,
  costPerPerson: 2.6, calories: 560, protein: 24,
  skills: ["Mariner le tofu", "Sauce gingembre-oignon vert", "Cuisson vapeur étagée"],
  ingredients: [i("Tofu ferme", 140), i("Tamari (sauce soja sans gluten)", 25, "ml"), i("Riz jasmin", 70), i("Brocoli", 100), i("Carotte", 60), i("Chou blanc", 60), i("Gingembre frais", 15), i("Oignon vert", 2, "pièce"), i("Vinaigre de riz", 1, "càc"), i("Huile neutre", 20, "ml"), i("Graines de sésame", 5)],
  instructions: [
    "Mariner|Couper le tofu en tranches de 1 cm, les mariner 15 minutes dans la moitié du tamari et un peu de gingembre râpé.",
    "Riz|Lancer le riz rincé dans le cuiseur.",
    "Sauce gingembre-oignon vert|Hacher finement le reste du gingembre et les oignons verts, ajouter le sel. Chauffer l'huile jusqu'à ce qu'elle fume légèrement et la verser dessus : ça grésille. Ajouter le reste du tamari et le vinaigre. Condiment classique de la cuisine cantonaise.",
    "Vapeur|Carotte en rondelles et tofu dans le panier 8 minutes, puis brocoli et chou émincé 5 minutes.",
    "Servir|Riz, légumes et tofu, sauce généreuse, sésame."
  ],
  tips: ["Cette sauce se garde une semaine au réfrigérateur et sublime riz, œufs ou poulet.", "La marinade ne pénètre pas profondément le tofu : tranches fines et sauce puissante compensent."]
},
{
  id: "v12", name: "Chou-fleur rôti aux épices à l'air fryer, houmous maison et pita", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.VG, T.VN], equipments: ["airfryer", "mixeur"], prepTime: 20, cookTime: 18, difficulty: 2,
  costPerPerson: 2.5, calories: 620, protein: 21,
  skills: ["Houmous ultra-lisse", "Rôtir à l'air fryer", "Dresser en assiette creuse"],
  ingredients: [i("Chou-fleur", 250), i("Pois chiches (boîte)", 120), i("Tahini", 25), i("Citron", 0.75, "pièce"), i("Ail", 1, "gousse"), i("Cumin moulu", 1, "càc"), i("Paprika fumé", 0.5, "càc"), i("Pita", 1, "pièce"), i("Persil plat", 5), i("Grenade", 0.25, "pièce"), i("Huile d'olive", 25, "ml")],
  instructions: [
    "Houmous|Faire chauffer les pois chiches 5 minutes dans leur jus : chauds, ils mixent plus lisse. Égoutter en gardant le jus. Mixer d'abord tahini, jus de citron et ail 1 minute jusqu'à une crème, puis ajouter les pois chiches et 2 à 3 cuillères de jus. Mixer 3 minutes, saler.",
    "Chou-fleur|Détailler en bouquets moyens, enrober d'huile, cumin, paprika et sel. Air fryer 200 °C, 15 à 18 minutes en secouant à mi-cuisson : bords grillés, cœur tendre.",
    "Pita|La réchauffer 2 minutes à l'air fryer, la couper en triangles.",
    "Dresser|Étaler le houmous en spirale avec le dos d'une cuillère dans une assiette creuse, verser un filet d'huile dans le creux, poser le chou-fleur, parsemer de grains de grenade et de persil."
  ],
  tips: ["Mixer le tahini et le citron d'abord est le secret d'un houmous aérien.", "Le houmous se garde 4 jours au réfrigérateur sous un film d'huile."]
},
{
  id: "v13", name: "Velouté carotte-gingembre-coco au micro-ondes et croûtons épicés", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.VG, T.VN], equipments: ["micro-ondes", "mixeur"], prepTime: 15, cookTime: 15, difficulty: 1,
  costPerPerson: 1.8, calories: 420, protein: 9,
  skills: ["Cuisson des légumes au micro-ondes", "Équilibrer un velouté"],
  ingredients: [i("Carotte", 250), i("Oignon", 0.25, "pièce"), i("Gingembre frais", 10), i("Lait de coco", 80, "ml"), i("Curry en poudre", 0.5, "càc"), i("Citron vert", 0.25, "pièce"), i("Pain complet", 1, "tranche"), i("Huile d'olive", 10, "ml"), i("Coriandre fraîche", 5)],
  instructions: [
    "Cuire|Couper les carottes en fines rondelles (plus elles sont fines, plus elles cuisent vite), l'oignon en morceaux. Les mettre dans un grand bol avec le gingembre émincé, le curry, 200 ml d'eau et du sel. Couvrir et cuire 12 minutes à 800 W en remuant à mi-cuisson.",
    "Mixer|Ajouter le lait de coco et mixer longuement. Ajuster l'épaisseur avec de l'eau chaude.",
    "Équilibrer|Goûter : un trait de citron vert réveille le sucré de la carotte et le gras du coco.",
    "Croûtons|Couper le pain en dés, les mélanger avec l'huile et une pincée de curry, étaler sur une assiette et cuire 1 minute 30 au micro-ondes, remuer, puis 1 minute : ils sèchent et croustillent en refroidissant.",
    "Servir|Velouté, filet de lait de coco, croûtons et coriandre."
  ],
  tips: ["Au micro-ondes, les croûtons semblent mous à la sortie : ils durcissent en 1 minute à l'air.", "Un velouté fade manque presque toujours de sel ou d'acidité, rarement d'épices."]
},
{
  id: "v14", name: "Penne au pesto de roquette et noix, tomates cerises rôties", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.VG, T.VN], equipments: ["base", "four", "mixeur"], prepTime: 15, cookTime: 20, difficulty: 1,
  costPerPerson: 2.4, calories: 690, protein: 20,
  skills: ["Pesto sans fromage", "Tomates rôties confites", "Lier pâtes et pesto"],
  ingredients: [i("Penne", 95), i("Roquette", 50), i("Basilic frais", 10), i("Noix", 20), i("Ail", 0.5, "gousse"), i("Citron", 0.25, "pièce"), i("Tomates cerises", 150), i("Huile d'olive", 35, "ml"), i("Haricots blancs (boîte)", 60)],
  instructions: [
    "Tomates rôties|Couper les tomates en deux, les étaler face coupée vers le haut, huile, sel, et rôtir 20 minutes à 200 °C : elles confisent et concentrent leur sucre.",
    "Pesto|Torréfier les noix 3 minutes. Mixer roquette, basilic, noix, ail, zeste et jus de citron, sel, puis ajouter l'huile en filet. Garder un peu de texture.",
    "Pâtes|Cuire les penne dans une grande eau salée. 2 minutes avant la fin, ajouter les haricots blancs pour les réchauffer. Garder une louche d'eau de cuisson.",
    "Lier|Hors du feu, mélanger pâtes, haricots et pesto avec un peu d'eau de cuisson : le pesto ne doit pas cuire (il noircirait) mais l'eau le rend crémeux.",
    "Servir|Tomates rôties et leur jus par-dessus."
  ],
  tips: ["La roquette apporte du piquant ; mélangée au basilic, le pesto est plus équilibré.", "Le pesto se congèle en bacs à glaçons : une portion prête en permanence."]
},
{
  id: "v15", name: "Aubergines laquées tamari-gingembre au four, riz et concombre au sésame", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG, T.VN], equipments: ["base", "four"], prepTime: 15, cookTime: 35, difficulty: 2,
  costPerPerson: 2.5, calories: 540, protein: 12,
  skills: ["Quadriller une aubergine", "Laque au four", "Salade de concombre écrasé"],
  ingredients: [i("Aubergine", 250), i("Tamari (sauce soja sans gluten)", 20, "ml"), i("Sirop d'érable", 2, "càc"), i("Gingembre frais", 8), i("Ail", 1, "gousse"), i("Vinaigre de riz", 2, "càc"), i("Riz jasmin", 70), i("Concombre", 100), i("Huile de sésame", 5, "ml"), i("Graines de sésame", 8), i("Oignon vert", 1, "pièce"), i("Huile neutre", 20, "ml")],
  instructions: [
    "Quadriller|Couper l'aubergine en deux dans la longueur, inciser la chair en croisillons profonds sans percer la peau : la chaleur et la laque pénètrent jusqu'au cœur.",
    "Rôtir|Badigeonner d'huile neutre, saler, rôtir face coupée vers le bas 20 minutes à 210 °C : la chair devient fondante.",
    "Laque|Mélanger tamari, sirop d'érable, gingembre et ail râpés, 1 cuillère de vinaigre.",
    "Laquer|Retourner les aubergines, badigeonner généreusement de laque, poursuivre 10 à 12 minutes en badigeonnant une seconde fois.",
    "Concombre écrasé|Écraser le concombre avec le plat d'un couteau, le couper en morceaux irréguliers, saler 10 minutes, égoutter, assaisonner du reste de vinaigre, huile de sésame et sésame. Les surfaces irrégulières retiennent mieux la sauce.",
    "Servir|Riz cuit, aubergine, concombre, oignon vert."
  ],
  tips: ["Une aubergine mal cuite est spongieuse et amère : la chair doit s'écraser sans résistance.", "Le sirop d'érable remplace le miel pour rester vegan."]
},
{
  id: "v16", name: "Gnocchis de pomme de terre maison, sauce tomate au basilic", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.VG, T.VN], equipments: ["base"], prepTime: 40, cookTime: 30, difficulty: 3,
  costPerPerson: 1.8, calories: 620, protein: 14,
  skills: ["Pâte à gnocchis", "Façonner à la fourchette", "Sauce tomate courte"],
  ingredients: [i("Pomme de terre", 250), i("Farine de blé", 70), i("Tomates concassées", 150), i("Ail", 1, "gousse"), i("Basilic frais", 10), i("Huile d'olive", 25, "ml"), i("Muscade", 0.25, "càc")],
  instructions: [
    "Pommes de terre|Cuire les pommes de terre entières avec la peau dans l'eau salée 25 minutes (avec la peau, elles absorbent moins d'eau). Les éplucher chaudes et les passer au presse-purée ou les écraser très finement.",
    "Pâte|Laisser tiédir 5 minutes, saler, muscade, ajouter la farine progressivement et mélanger du bout des doigts sans pétrir. S'arrêter dès que la pâte ne colle plus : trop de farine donne des gnocchis durs.",
    "Façonner|Rouler en boudins de 2 cm, couper en tronçons de 2 cm, les rouler sur le dos d'une fourchette en appuyant du pouce : les stries retiendront la sauce. Les poser sur un plateau fariné.",
    "Sauce|Faire revenir l'ail écrasé dans la moitié de l'huile 1 minute, ajouter les tomates et la moitié du basilic, cuire 10 minutes. Retirer l'ail.",
    "Cuire|Plonger les gnocchis dans l'eau bouillante salée par petites quantités : ils sont cuits 30 secondes après être remontés à la surface. Les sortir à l'écumoire directement dans la sauce.",
    "Servir|Mélanger délicatement, reste du basilic et d'huile crue."
  ],
  tips: ["Les pommes de terre farineuses (type Bintje) donnent les gnocchis les plus légers.", "Faites un gnocchi test avant de tout façonner : s'il se délite, ajoutez un peu de farine."]
},
{
  id: "v17", name: "Socca croustillante, légumes grillés et sauce tahini-citron", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG, T.VN], equipments: ["four"], prepTime: 15, cookTime: 30, difficulty: 2,
  costPerPerson: 2.4, calories: 560, protein: 19,
  skills: ["Pâte à socca", "Cuisson en plaque brûlante", "Légumes grillés au four"],
  ingredients: [i("Farine de pois chiches", 70), i("Huile d'olive", 30, "ml"), i("Cumin moulu", 0.5, "càc"), i("Poivron rouge", 0.5, "pièce"), i("Courgette", 100), i("Oignon rouge", 0.25, "pièce"), i("Roquette", 30), i("Tahini", 15), i("Citron", 0.5, "pièce"), i("Romarin", 0.5, "càc")],
  instructions: [
    "Pâte|Fouetter la farine de pois chiches avec 120 ml d'eau, 1 cuillère d'huile, le cumin, le romarin et du sel jusqu'à une pâte lisse et fluide. Repos 20 minutes : la farine s'hydrate.",
    "Légumes|Couper poivron, courgette et oignon en lanières, huile, sel, et rôtir 20 minutes à 230 °C.",
    "Plaque brûlante|Mettre un plat à gratin ou une poêle allant au four avec 1 cuillère d'huile dans le four 5 minutes pour qu'elle soit très chaude.",
    "Cuire|Verser la pâte sur 5 mm d'épaisseur, elle grésille. Cuire 10 à 12 minutes à 230 °C puis passer 2 minutes sous le gril : bords croustillants, centre moelleux.",
    "Sauce|Tahini, jus de citron, sel et eau jusqu'à une sauce coulante.",
    "Servir|Couper la socca en parts, garnir de légumes, roquette et sauce."
  ],
  tips: ["La socca est la street food niçoise : elle se mange poivrée, brûlante, avec les doigts.", "Le repos de la pâte évite une texture granuleuse."]
},
{
  id: "v18", name: "Hachis parmentier de lentilles et champignons, purée de patate douce", category: "vegan",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG, T.VN], equipments: ["base", "four"], prepTime: 25, cookTime: 45, difficulty: 2,
  costPerPerson: 2.3, calories: 620, protein: 22,
  skills: ["Garniture végétale dense", "Purée sans beurre", "Gratiner"],
  ingredients: [i("Lentilles vertes", 60), i("Champignons de Paris", 120), i("Oignon", 0.5, "pièce"), i("Carotte", 60), i("Ail", 1, "gousse"), i("Concentré de tomate", 1, "càs"), i("Tamari (sauce soja sans gluten)", 10, "ml"), i("Thym", 0.5, "càc"), i("Patate douce", 200), i("Pomme de terre", 100), i("Huile d'olive", 25, "ml"), i("Muscade", 0.25, "càc")],
  instructions: [
    "Lentilles|Cuire 20 minutes dans 3 fois leur volume d'eau non salée. Égoutter.",
    "Garniture|Saisir les champignons hachés à feu vif jusqu'à évaporation complète, ajouter oignon et carotte en petits dés 8 minutes, puis ail, concentré, thym et tamari 1 minute. Ajouter les lentilles et un demi-verre d'eau, mijoter 5 minutes : la garniture doit être épaisse, pas liquide.",
    "Purée|Cuire patate douce et pomme de terre en cubes dans l'eau salée 15 minutes. Égoutter, écraser avec l'huile, muscade, sel. La pomme de terre donne de la tenue à la patate douce, trop fluide seule.",
    "Monter|Garniture au fond d'un plat, purée par-dessus, stries à la fourchette (elles doreront).",
    "Gratiner|20 minutes à 200 °C, puis 2 minutes sous le gril."
  ],
  tips: ["Le tamari et le concentré de tomate apportent la profondeur d'un hachis à la viande.", "Se prépare d'avance et se réchauffe parfaitement."]
}
);

/* ---------- MÉDITERRANÉEN ---------- */
RECIPES.push(
{
  id: "m01", name: "Poulet rôti au citron, olives et pommes de terre en plat unique", category: "mediterraneen",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["four"], prepTime: 20, cookTime: 50, difficulty: 1,
  costPerPerson: 3.6, calories: 640, protein: 40,
  skills: ["Plat unique au four", "Marinade citron-ail-origan", "Pommes de terre rôties dans le jus"],
  ingredients: [i("Haut de cuisse de poulet", 2, "pièce"), i("Pomme de terre", 220), i("Citron", 1, "pièce"), i("Olives vertes", 25), i("Ail", 3, "gousse"), i("Origan", 1, "càc"), i("Romarin", 0.5, "càc"), i("Oignon rouge", 0.5, "pièce"), i("Huile d'olive", 25, "ml"), i("Persil plat", 5)],
  instructions: [
    "Marinade|Mélanger le jus d'un demi-citron, l'huile, l'ail écrasé, l'origan, le romarin, sel et poivre.",
    "Préparer|Préchauffer le four à 200 °C. Couper les pommes de terre en quartiers épais, l'oignon en quartiers, le reste du citron en rondelles. Les mélanger dans le plat avec la moitié de la marinade.",
    "Poulet|Frotter les hauts de cuisse avec le reste de marinade et les poser peau vers le haut sur les légumes, sans les recouvrir : la peau doit être exposée pour croustiller.",
    "Rôtir|45 à 50 minutes. À mi-cuisson, ajouter les olives et retourner les pommes de terre en les arrosant de jus.",
    "Finir|Si la peau n'est pas assez dorée, 3 minutes sous le gril. Parsemer de persil et servir avec le jus du plat."
  ],
  tips: ["Les rondelles de citron rôties deviennent confites : elles se mangent.", "Un plat trop petit fait bouillir les légumes : ils doivent tenir en une couche."]
},
{
  id: "m02", name: "Linguine aux crevettes, ail, citron et persil, chapelure dorée", category: "mediterraneen",
  diet: [T.SP, T.SL], equipments: ["base"], prepTime: 15, cookTime: 15, difficulty: 2,
  costPerPerson: 4.6, calories: 640, protein: 32,
  skills: ["Cuisson minute des crevettes", "Émulsion huile-eau de cuisson", "Finir les pâtes dans la sauce"],
  ingredients: [i("Linguine", 95), i("Crevettes décortiquées", 120), i("Ail", 3, "gousse"), i("Citron", 0.5, "pièce"), i("Piment d'Espelette", 0.25, "càc"), i("Tomates cerises", 80), i("Persil plat", 10), i("Chapelure", 10), i("Huile d'olive", 30, "ml")],
  instructions: [
    "Chapelure|Dorer la chapelure avec 1 cuillère d'huile et le zeste du citron 2 minutes. Réserver.",
    "Pâtes|Cuire les linguine dans une eau bien salée, 2 minutes de moins que le paquet. Garder un grand verre d'eau de cuisson.",
    "Crevettes|Sécher les crevettes, saler. Poêle très chaude, un filet d'huile, 1 minute par face : elles virent au rose et se courbent en C. En O, elles sont trop cuites. Réserver.",
    "Sauce|Baisser le feu, le reste de l'huile, l'ail émincé et le piment 1 minute sans brunir, puis les tomates coupées 2 minutes.",
    "Finir les pâtes|Ajouter les linguine et une demi-louche d'eau de cuisson, remuer vivement 2 minutes : l'eau et l'huile s'émulsionnent en une sauce légère qui enrobe. Remettre les crevettes, jus de citron, persil.",
    "Servir|Parsemer de chapelure dorée au dernier moment."
  ],
  tips: ["Les pâtes finies dans la sauce absorbent son goût : c'est la différence entre pâtes « avec » sauce et vraies pâtes italiennes.", "Les crevettes surgelées se décongèlent 10 minutes sous l'eau froide."]
},
{
  id: "m03", name: "Moussaka à l'agneau, aubergines rôties et béchamel gratinée", category: "mediterraneen",
  diet: [T.SP, T.H], equipments: ["base", "four"], prepTime: 35, cookTime: 70, difficulty: 3,
  costPerPerson: 4.4, calories: 760, protein: 36,
  skills: ["Aubergines rôties au lieu de frites", "Sauce à la viande épicée", "Béchamel liée à l'œuf"],
  ingredients: [i("Aubergine", 250), i("Agneau haché", 120), i("Oignon", 0.5, "pièce"), i("Ail", 1, "gousse"), i("Cannelle", 0.25, "càc"), i("Origan", 0.5, "càc"), i("Concentré de tomate", 1, "càs"), i("Tomates concassées", 120), i("Beurre", 15), i("Farine de blé", 15), i("Lait", 150, "ml"), i("Œuf", 0.5, "pièce"), i("Parmesan", 20), i("Muscade", 0.25, "càc"), i("Huile d'olive", 25, "ml")],
  instructions: [
    "Aubergines|Couper en tranches de 1 cm, les badigeonner d'huile, saler et rôtir 25 minutes à 210 °C en les retournant. Rôties plutôt que frites, elles n'absorbent pas des litres d'huile.",
    "Sauce à l'agneau|Faire dorer l'agneau à feu vif en l'émiettant, ajouter l'oignon haché 5 minutes, puis ail, cannelle, origan et concentré 1 minute, et enfin les tomates. Mijoter 20 minutes jusqu'à ce qu'elle soit épaisse.",
    "Béchamel|Roux beurre-farine 1 minute, lait froid en fouettant, cuire 4 minutes. Hors du feu, ajouter la moitié du parmesan, muscade, puis l'œuf battu : il fait gonfler et dorer la couche du dessus.",
    "Monter|Plat huilé : couche d'aubergines, sauce à la viande, aubergines, sauce, béchamel épaisse, reste de parmesan.",
    "Cuire|40 minutes à 180 °C jusqu'à une croûte dorée.",
    "Reposer|20 minutes avant de couper : chaude, elle s'effondre ; reposée, elle se tient en belles parts."
  ],
  tips: ["La cannelle dans la viande est la signature grecque : discrète, elle ne doit pas se reconnaître.", "Une moussaka est encore meilleure réchauffée le lendemain."]
},
{
  id: "m04", name: "Ratatouille confite aux légumes cuits séparément, polenta crémeuse au parmesan", category: "mediterraneen",
  diet: [T.SP, T.H, T.SG, T.VG], equipments: ["base"], prepTime: 30, cookTime: 50, difficulty: 2,
  costPerPerson: 3.0, calories: 560, protein: 15,
  skills: ["Cuisson séparée des légumes", "Confire à feu doux", "Polenta crémeuse"],
  ingredients: [i("Aubergine", 120), i("Courgette", 120), i("Poivron rouge", 0.5, "pièce"), i("Oignon", 0.5, "pièce"), i("Tomate", 200), i("Ail", 2, "gousse"), i("Thym", 1, "càc"), i("Basilic frais", 5), i("Polenta", 65), i("Parmesan", 20), i("Beurre", 10), i("Huile d'olive", 35, "ml")],
  instructions: [
    "Tailler|Couper aubergine, courgette, poivron et oignon en dés réguliers de 2 cm. Monder les tomates : inciser en croix, plonger 20 secondes dans l'eau bouillante, puis l'eau froide, la peau s'enlève seule. Les concasser.",
    "Cuire séparément|Dans une grande poêle, dorer successivement chaque légume dans un peu d'huile avec du sel : aubergine 8 minutes, courgette 5 minutes, poivron 6 minutes. Chaque légume garde son goût et sa texture au lieu de bouillir ensemble.",
    "Base|Dans une cocotte, faire fondre l'oignon 8 minutes, ajouter ail et thym, puis les tomates, 10 minutes.",
    "Confire|Ajouter tous les légumes, couvrir et laisser confire 20 minutes à feu très doux. Basilic à la fin.",
    "Polenta|Porter 4 fois le volume de polenta d'eau salée à ébullition, verser la polenta en pluie en fouettant, puis cuire à feu doux en remuant selon le paquet. Finir avec parmesan et beurre : elle doit être souple comme une purée.",
    "Servir|Polenta en fond d'assiette, ratatouille dessus, filet d'huile crue."
  ],
  tips: ["La cuisson séparée est le secret des ratatouilles de chef : plus long, mais incomparable.", "La polenta épaissit en refroidissant : ajoutez de l'eau chaude au besoin."]
},
{
  id: "m05", name: "Souvlaki de poulet, tzatziki maison, pita et frites au four à l'origan", category: "mediterraneen",
  diet: [T.SP, T.H], equipments: ["base", "four"], prepTime: 30, cookTime: 35, difficulty: 2,
  costPerPerson: 3.8, calories: 780, protein: 46,
  skills: ["Tzatziki (égoutter le concombre)", "Brochettes grillées", "Frites assaisonnées à la sortie du four"],
  ingredients: [i("Blanc de poulet", 160), i("Citron", 1, "pièce"), i("Origan", 1.5, "càc"), i("Ail", 2, "gousse"), i("Yaourt grec", 80), i("Concombre", 80), i("Aneth", 3), i("Pita", 1, "pièce"), i("Tomate", 80), i("Oignon rouge", 0.25, "pièce"), i("Pomme de terre", 220), i("Feta", 15), i("Huile d'olive", 30, "ml")],
  instructions: [
    "Mariner|Poulet en cubes, avec jus d'un demi-citron, une gousse d'ail, origan, huile et sel. 30 minutes.",
    "Frites|Bâtonnets de pomme de terre rincés et séchés, huile, sel, 35 minutes à 220 °C.",
    "Tzatziki|Râper le concombre, le saler, le presser fortement dans un torchon (sinon le tzatziki devient liquide). Mélanger avec le yaourt, l'autre gousse d'ail râpée, l'aneth, un filet d'huile.",
    "Griller|Enfiler sur des piques et griller dans une poêle-gril très chaude 8 minutes en tournant.",
    "Frites à la grecque|À la sortie du four, les mélanger aussitôt avec feta émiettée, origan et zeste de citron : la chaleur fait fondre légèrement la feta.",
    "Servir|Pita chaude, tzatziki, souvlaki, tomate et oignon rouge, frites à côté."
  ],
  tips: ["Le tzatziki est meilleur après 30 minutes au frais : l'ail infuse.", "Trempez les piques en bois 20 minutes pour qu'elles ne brûlent pas."]
},
{
  id: "m06", name: "Dorade rôtie au fenouil, tomates et olives, sauce vierge", category: "mediterraneen",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["four"], prepTime: 20, cookTime: 25, difficulty: 2,
  costPerPerson: 5.4, calories: 520, protein: 36,
  skills: ["Rôtir un poisson sur lit de légumes", "Sauce vierge", "Vérifier la cuisson d'un filet"],
  ingredients: [i("Filet de dorade", 160), i("Fenouil", 150), i("Tomates cerises", 120), i("Olives noires", 20), i("Citron", 0.5, "pièce"), i("Basilic frais", 8), i("Câpres", 1, "càc"), i("Ail", 1, "gousse"), i("Pomme de terre grenaille", 150), i("Huile d'olive", 35, "ml")],
  instructions: [
    "Lit de légumes|Préchauffer le four à 210 °C. Émincer le fenouil, couper les grenailles en rondelles fines. Les mélanger avec la moitié de l'huile et du sel dans un plat et rôtir 15 minutes.",
    "Sauce vierge|Couper une partie des tomates cerises en petits dés, mélanger avec câpres, ail râpé, basilic ciselé, jus de citron, le reste de l'huile et du sel. Laisser infuser à température ambiante.",
    "Poisson|Poser les filets salés sur les légumes, côté peau dessus, ajouter les olives et le reste des tomates entières. Rôtir 8 à 10 minutes.",
    "Vérifier|La chair doit être opaque et se détacher en lamelles à la pointe d'un couteau, la peau légèrement croustillante.",
    "Servir|Napper de sauce vierge tiède, jamais cuite : elle reste fraîche et parfumée."
  ],
  tips: ["La sauce vierge (huile, tomate, herbes, citron) est le classique provençal pour tous les poissons.", "Dorade, bar ou maigre sont interchangeables dans cette recette."]
},
{
  id: "m07", name: "Shakshuka rouge aux poivrons, feta et herbes, pain grillé", category: "mediterraneen",
  diet: [T.SP, T.H, T.VG], equipments: ["base"], prepTime: 15, cookTime: 30, difficulty: 2,
  costPerPerson: 2.4, calories: 520, protein: 24,
  skills: ["Sauce tomate-poivron réduite", "Œufs pochés en sauce", "Épices orientales"],
  ingredients: [i("Œuf", 2, "pièce"), i("Poivron rouge", 1, "pièce"), i("Oignon", 0.5, "pièce"), i("Ail", 2, "gousse"), i("Cumin moulu", 1, "càc"), i("Paprika fumé", 1, "càc"), i("Harissa", 0.5, "càc"), i("Tomates concassées", 200), i("Feta", 30), i("Coriandre fraîche", 5), i("Persil plat", 5), i("Pain de campagne", 1, "tranche"), i("Huile d'olive", 20, "ml")],
  instructions: [
    "Base|Faire fondre oignon et poivron en lanières 10 minutes dans l'huile, jusqu'à ce qu'ils soient très tendres et légèrement colorés.",
    "Épices|Ajouter ail, cumin, paprika et harissa, 1 minute.",
    "Réduire|Ajouter les tomates, saler et laisser réduire 12 minutes : la sauce doit être épaisse pour soutenir les œufs.",
    "Œufs|Creuser deux puits, y casser les œufs, saler le blanc, couvrir et cuire 5 à 7 minutes à feu doux.",
    "Finir|Feta émiettée, herbes ciselées, filet d'huile. Servir dans la poêle avec le pain grillé."
  ],
  tips: ["Cassez chaque œuf dans un ramequin avant de le glisser dans la sauce : moins de risque de crever le jaune.", "La harissa varie beaucoup en force : goûtez avant d'en ajouter plus."]
},
{
  id: "m08", name: "Orzo crémeux façon risotto aux tomates, épinards et feta", category: "mediterraneen",
  diet: [T.SP, T.H, T.VG], equipments: ["base"], prepTime: 10, cookTime: 20, difficulty: 1,
  costPerPerson: 2.5, calories: 620, protein: 21,
  skills: ["Cuisson par absorption", "Lier à l'amidon", "Finition au fromage"],
  ingredients: [i("Orzo", 90), i("Échalote", 1, "pièce"), i("Ail", 1, "gousse"), i("Tomates cerises", 120), i("Concentré de tomate", 1, "càc"), i("Bouillon de légumes (cube)", 0.5, "pièce"), i("Épinards frais", 60), i("Feta", 40), i("Citron", 0.25, "pièce"), i("Basilic frais", 5), i("Huile d'olive", 15, "ml")],
  instructions: [
    "Base|Faire suer l'échalote et l'ail 3 minutes, ajouter les tomates coupées en deux et le concentré, cuire 3 minutes jusqu'à ce qu'elles éclatent.",
    "Nacrer|Ajouter l'orzo, remuer 1 minute pour l'enrober.",
    "Absorption|Verser 250 ml de bouillon chaud par personne en deux fois et cuire 10 à 12 minutes en remuant souvent, comme un risotto : l'amidon de l'orzo épaissit le bouillon.",
    "Épinards|Ajouter les épinards 1 minute.",
    "Finir|Hors du feu, la moitié de la feta émiettée, zeste et jus de citron : elle fond et rend le tout crémeux. Servir avec le reste de feta et le basilic."
  ],
  tips: ["L'orzo est une pâte en forme de riz : plus rapide qu'un risotto et presque aussi crémeux.", "Gardez un peu de bouillon : l'orzo continue d'absorber hors du feu."]
},
{
  id: "m09", name: "Pasta alla norma : aubergines dorées, sauce tomate et ricotta", category: "mediterraneen",
  diet: [T.SP, T.H, T.VG], equipments: ["base"], prepTime: 15, cookTime: 30, difficulty: 2,
  costPerPerson: 2.6, calories: 690, protein: 22,
  skills: ["Dorer des aubergines sans les noyer d'huile", "Sauce tomate sicilienne", "Mantecare"],
  ingredients: [i("Penne", 95), i("Aubergine", 180), i("Ail", 2, "gousse"), i("Tomates concassées", 180), i("Piment d'Espelette", 0.25, "càc"), i("Basilic frais", 8), i("Ricotta", 50), i("Parmesan", 10), i("Huile d'olive", 30, "ml")],
  instructions: [
    "Aubergine|Couper en dés de 2 cm, saler, laisser 15 minutes dans une passoire puis éponger : elle rend son eau et absorbera moins d'huile.",
    "Dorer|Chauffer l'huile à feu moyen-vif, dorer les dés 8 à 10 minutes sans trop les remuer. Ils doivent être bruns et fondants. Réserver le tiers pour la décoration.",
    "Sauce|Dans la même poêle, ail émincé et piment 1 minute, tomates, sel. Mijoter 12 minutes, ajouter les deux tiers de l'aubergine et la moitié du basilic.",
    "Pâtes|Cuire les penne al dente, les finir 1 minute dans la sauce avec un peu d'eau de cuisson.",
    "Servir|Aubergines réservées, cuillerées de ricotta, parmesan râpé, basilic."
  ],
  tips: ["En Sicile on utilise de la ricotta salata (affinée et râpée) : la ricotta fraîche donne une version plus douce.", "Une aubergine bien dorée a un goût presque fumé : ne la retirez pas trop tôt."]
},
{
  id: "m10", name: "Paella au poulet, crevettes et petits pois, socarrat croustillant", category: "mediterraneen",
  diet: [T.SP, T.SL, T.SG], equipments: ["base"], prepTime: 25, cookTime: 40, difficulty: 3,
  costPerPerson: 4.6, calories: 710, protein: 40,
  skills: ["Sofrito", "Cuisson du riz sans remuer", "Socarrat (croûte au fond)"],
  ingredients: [i("Haut de cuisse de poulet désossé", 110), i("Crevettes décortiquées", 70), i("Riz rond", 80), i("Poivron rouge", 0.5, "pièce"), i("Oignon", 0.5, "pièce"), i("Ail", 2, "gousse"), i("Tomate", 100), i("Paprika fumé", 1, "càc"), i("Curcuma", 0.5, "càc"), i("Petits pois (boîte)", 50), i("Citron", 0.5, "pièce"), i("Persil plat", 5), i("Huile d'olive", 25, "ml")],
  instructions: [
    "Saisir|Dans la poêle la plus large possible, dorer le poulet en morceaux dans l'huile 6 minutes. Saisir les crevettes 1 minute et les réserver à part.",
    "Sofrito|Ajouter oignon et poivron en dés 6 minutes, ail 1 minute, puis la tomate râpée (on garde la peau à la main) : cuire 5 minutes jusqu'à une pâte confite.",
    "Riz|Ajouter paprika, curcuma et riz, remuer 1 minute pour l'enrober. Verser 3 fois le volume du riz en eau bouillante salée et répartir uniformément.",
    "Ne plus toucher|Cuire 10 minutes à feu vif puis 8 minutes à feu moyen sans jamais remuer : le riz espagnol doit rester en grains secs, pas crémeux comme un risotto.",
    "Socarrat|Ajouter crevettes et petits pois sur le dessus, monter le feu 1 à 2 minutes : on entend crépiter et ça sent légèrement le grillé. C'est le socarrat, la croûte caramélisée, la partie la plus convoitée.",
    "Reposer|Couvrir d'un torchon 5 minutes, servir avec citron et persil."
  ],
  tips: ["Une pincée de vrai safran (10 à 15 filaments infusés dans l'eau chaude) remplace avantageusement le curcuma.", "Remuer libère l'amidon et rend le riz collant : en paella, on s'abstient."]
},
{
  id: "m11", name: "Fattouche au poulet grillé au sumac, croûtons de pita et mélasse de grenade", category: "mediterraneen",
  diet: [T.SP, T.H, T.SL], equipments: ["base", "four"], prepTime: 25, cookTime: 15, difficulty: 1,
  costPerPerson: 3.7, calories: 590, protein: 40,
  skills: ["Croûtons de pita au four", "Vinaigrette acidulée", "Épice sumac"],
  ingredients: [i("Blanc de poulet", 140), i("Sumac", 1.5, "càc"), i("Pita", 1, "pièce"), i("Tomate", 100), i("Concombre", 80), i("Radis", 40), i("Salade verte", 50), i("Oignon rouge", 0.25, "pièce"), i("Menthe fraîche", 5), i("Persil plat", 10), i("Citron", 0.5, "pièce"), i("Mélasse de grenade", 1, "càc"), i("Ail", 0.5, "gousse"), i("Huile d'olive", 30, "ml")],
  instructions: [
    "Croûtons|Ouvrir la pita, la couper en morceaux, huile, sel, un peu de sumac, 8 minutes à 200 °C jusqu'à ce qu'ils soient dorés et cassants.",
    "Poulet|Ouvrir le blanc en deux dans l'épaisseur, l'assaisonner de sel, sumac et huile. Poêle chaude, 3 à 4 minutes par face. Repos 3 minutes, trancher.",
    "Vinaigrette|Jus de citron, mélasse de grenade, ail râpé, reste du sumac, sel, huile.",
    "Légumes|Couper grossièrement tomate, concombre, radis, salade, oignon ; effeuiller les herbes en grande quantité.",
    "Assembler au dernier moment|Mélanger légumes, herbes, vinaigrette et croûtons : les croûtons doivent être à moitié croquants, à moitié imbibés. Poulet dessus."
  ],
  tips: ["Le sumac, baie séchée acidulée, est l'épice qui donne au fattouche son goût citronné.", "Sans mélasse de grenade, une cuillère de miel et un trait de vinaigre balsamique dépannent."]
},
{
  id: "m12", name: "Cabillaud à la provençale, écrasé de pommes de terre à l'huile d'olive", category: "mediterraneen",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["base"], prepTime: 15, cookTime: 25, difficulty: 2,
  costPerPerson: 4.9, calories: 540, protein: 36,
  skills: ["Écrasé de pommes de terre", "Poêler un poisson blanc", "Sauce provençale minute"],
  ingredients: [i("Dos de cabillaud", 150), i("Pomme de terre", 220), i("Tomates cerises", 100), i("Olives noires", 20), i("Câpres", 1, "càc"), i("Ail", 1, "gousse"), i("Thym", 0.5, "càc"), i("Basilic frais", 5), i("Citron", 0.25, "pièce"), i("Huile d'olive", 40, "ml")],
  instructions: [
    "Écrasé|Cuire les pommes de terre épluchées 20 minutes dans l'eau salée. Égoutter, écraser grossièrement à la fourchette avec 2 cuillères d'huile, du sel et le basilic ciselé : pas une purée lisse, des morceaux.",
    "Sauce|Faire revenir l'ail 30 secondes dans un filet d'huile, ajouter tomates coupées en deux, olives, câpres et thym, 4 minutes.",
    "Poisson|Saler le cabillaud, poêle chaude avec un filet d'huile. Cuire côté le plus beau 4 minutes sans toucher jusqu'à une croûte dorée, retourner 2 à 3 minutes.",
    "Servir|Écrasé, poisson, sauce provençale par-dessus, trait de citron."
  ],
  tips: ["Un poisson qui attache n'est pas prêt à être retourné : attendez qu'il se décolle tout seul.", "Séchez soigneusement le cabillaud, très riche en eau, sinon il ne dore pas."]
},
{
  id: "m13", name: "Pasta e ceci romaine : pâtes et pois chiches au romarin, huile pimentée", category: "mediterraneen",
  diet: [T.SP, T.H, T.VG], equipments: ["base"], prepTime: 10, cookTime: 30, difficulty: 1,
  costPerPerson: 2.0, calories: 640, protein: 22,
  skills: ["Soupe-repas italienne", "Lier avec des légumineuses écrasées", "Huile infusée"],
  ingredients: [i("Pois chiches (boîte)", 130), i("Ditalini", 70), i("Oignon", 0.25, "pièce"), i("Ail", 2, "gousse"), i("Romarin", 0.5, "càc"), i("Concentré de tomate", 1, "càc"), i("Bouillon de légumes (cube)", 0.5, "pièce"), i("Parmesan", 15), i("Piment d'Espelette", 0.25, "càc"), i("Huile d'olive", 30, "ml")],
  instructions: [
    "Base|Faire suer oignon et ail hachés dans la moitié de l'huile avec le romarin 5 minutes, ajouter le concentré 1 minute.",
    "Pois chiches|Ajouter les pois chiches rincés et 350 ml de bouillon par personne, frémir 10 minutes. Mixer ou écraser un tiers des pois chiches : la soupe devient veloutée.",
    "Pâtes|Cuire les ditalini directement dans la soupe 10 minutes en remuant souvent : leur amidon épaissit encore. Ajouter de l'eau si besoin, la texture doit être entre soupe et risotto.",
    "Huile pimentée|Chauffer doucement le reste d'huile avec le piment 1 minute.",
    "Servir|Parmesan, huile pimentée en filet, poivre."
  ],
  tips: ["Plat de la cucina povera romaine : peu d'ingrédients, beaucoup de technique.", "Il épaissit en refroidissant : rallongez d'eau chaude en réchauffant."]
},
{
  id: "m14", name: "Tajine de kefta aux tomates et œufs, semoule", category: "mediterraneen",
  diet: [T.SP, T.H, T.SL], equipments: ["base"], prepTime: 25, cookTime: 30, difficulty: 2,
  costPerPerson: 3.4, calories: 700, protein: 42,
  skills: ["Boulettes épicées", "Sauce tomate marocaine", "Œufs cuits dans la sauce"],
  ingredients: [i("Bœuf haché 15 % MG", 120), i("Oignon", 0.75, "pièce"), i("Persil plat", 10), i("Coriandre fraîche", 10), i("Cumin moulu", 1.5, "càc"), i("Paprika doux", 1, "càc"), i("Cannelle", 0.25, "càc"), i("Ail", 2, "gousse"), i("Tomates concassées", 200), i("Œuf", 1, "pièce"), i("Semoule", 60), i("Huile d'olive", 20, "ml")],
  instructions: [
    "Keftas|Mélanger le bœuf avec un quart d'oignon râpé et pressé, la moitié des herbes, la moitié du cumin et du paprika, la cannelle, sel et poivre. Former de petites boulettes de 2,5 cm.",
    "Sauce|Faire fondre le reste de l'oignon haché dans l'huile 6 minutes, ajouter l'ail, le reste des épices, puis les tomates et un demi-verre d'eau. Mijoter 10 minutes.",
    "Pocher les keftas|Déposer les boulettes crues dans la sauce, couvrir et cuire 12 minutes : elles restent moelleuses et parfument la sauce.",
    "Œufs|Casser les œufs entre les boulettes, couvrir 5 à 6 minutes.",
    "Semoule|Semoule, sel, filet d'huile, même volume d'eau bouillante, 5 minutes couvert, égrainer.",
    "Servir|Parsemer du reste des herbes, servir dans la poêle avec la semoule (ou du pain pour saucer)."
  ],
  tips: ["Les boulettes cuites directement dans la sauce, sans saisie préalable, sont la méthode marocaine : plus tendres.", "Râper l'oignon et presser son jus évite des boulettes qui se délitent."]
},
{
  id: "m15", name: "Aubergines farcies à l'agneau, pignons et menthe, sauce yaourt", category: "mediterraneen",
  diet: [T.SP, T.H, T.SG], equipments: ["base", "four"], prepTime: 25, cookTime: 45, difficulty: 2,
  costPerPerson: 4.6, calories: 620, protein: 32,
  skills: ["Évider une aubergine rôtie", "Farce épicée aux pignons", "Sauce yaourt"],
  ingredients: [i("Aubergine", 300), i("Agneau haché", 110), i("Oignon", 0.5, "pièce"), i("Ail", 1, "gousse"), i("Cumin moulu", 1, "càc"), i("Cannelle", 0.25, "càc"), i("Pignons de pin", 10), i("Tomates concassées", 80), i("Menthe fraîche", 5), i("Persil plat", 5), i("Yaourt grec", 60), i("Citron", 0.25, "pièce"), i("Huile d'olive", 20, "ml")],
  instructions: [
    "Rôtir|Couper l'aubergine en deux, quadriller la chair, huiler, saler et rôtir 25 minutes à 200 °C face coupée vers le haut.",
    "Évider|Récupérer la chair à la cuillère en laissant 5 mm contre la peau. Hacher la chair.",
    "Farce|Dorer l'agneau à feu vif, ajouter oignon, ail, cumin, cannelle 5 minutes, puis la chair d'aubergine et les tomates, 5 minutes. Hors du feu : pignons dorés à sec, la moitié des herbes.",
    "Garnir et cuire|Remplir les demi-aubergines, 15 minutes au four.",
    "Sauce|Yaourt, citron, sel, menthe ciselée.",
    "Servir|Sauce yaourt froide sur les aubergines chaudes, reste des herbes."
  ],
  tips: ["Les pignons brûlent en quelques secondes : surveillez-les sans quitter la poêle.", "Recette proche de l'imam bayildi turc : remplacez l'agneau par des lentilles pour une version végétarienne."]
},
{
  id: "m16", name: "Saumon à la grecque en plaque : orzo, tomates, olives, feta et citron", category: "mediterraneen",
  diet: [T.SP, T.H], equipments: ["four"], prepTime: 15, cookTime: 30, difficulty: 1,
  costPerPerson: 5.3, calories: 720, protein: 40,
  skills: ["Plat unique en plaque", "Cuire des pâtes au four", "Synchroniser les cuissons"],
  ingredients: [i("Pavé de saumon", 130), i("Orzo", 70), i("Tomates cerises", 120), i("Olives noires", 20), i("Oignon rouge", 0.25, "pièce"), i("Feta", 35), i("Citron", 0.5, "pièce"), i("Origan", 1, "càc"), i("Bouillon de légumes (cube)", 0.5, "pièce"), i("Épinards frais", 50), i("Huile d'olive", 20, "ml"), i("Aneth", 3)],
  instructions: [
    "Base|Préchauffer le four à 200 °C. Dans un plat, mélanger orzo cru, tomates, olives, oignon émincé, origan, huile et 200 ml de bouillon chaud par personne.",
    "Première cuisson|Enfourner 12 minutes : l'orzo commence à absorber le bouillon.",
    "Poisson|Remuer, ajouter les épinards, poser le saumon salé et des rondelles de citron, émietter la feta autour. Poursuivre 12 à 14 minutes.",
    "Vérifier|L'orzo doit être tendre et le liquide absorbé, le saumon nacré au centre. Ajouter une goutte d'eau chaude si l'orzo est sec.",
    "Servir|Aneth, jus de citron, filet d'huile."
  ],
  tips: ["Le bouillon doit être chaud au départ, sinon l'orzo cuit mal.", "Une seule plaque, zéro casserole : idéal en semaine."]
}
);

/* ---------- EXPRESS (20 MIN MAXIMUM, MAIS SOIGNÉ) ---------- */
RECIPES.push(
{
  id: "x01", name: "Œufs brouillés crémeux à la française, avocat et pain de campagne grillé", category: "express",
  diet: [T.SP, T.H, T.VG], equipments: ["base"], prepTime: 5, cookTime: 8, difficulty: 2,
  costPerPerson: 2.6, calories: 560, protein: 24,
  skills: ["Brouillés à feu doux", "Arrêter une cuisson à temps"],
  ingredients: [i("Œuf", 3, "pièce"), i("Beurre", 10), i("Crème fraîche épaisse", 15), i("Ciboulette", 5), i("Avocat", 0.5, "pièce"), i("Citron", 0.25, "pièce"), i("Pain de campagne", 2, "tranche"), i("Piment d'Espelette", 0.25, "càc")],
  instructions: [
    "Préparer|Battre les œufs avec une pincée de sel. Écraser l'avocat avec citron et sel. Mettre le pain à griller.",
    "Feu doux|Faire fondre le beurre à feu doux dans une petite casserole, verser les œufs et remuer sans arrêt avec une spatule en raclant le fond. Rien ne se passe pendant 2 minutes : c'est normal.",
    "Petits grains|Des grains très fins et crémeux se forment. Si ça prend trop vite, retirer la casserole du feu quelques secondes et continuer à remuer.",
    "Stopper|Quand les œufs sont encore légèrement coulants, couper le feu et ajouter la crème froide : elle stoppe la cuisson et rend l'ensemble soyeux.",
    "Servir|Pain grillé, avocat, œufs, ciboulette ciselée et piment."
  ],
  tips: ["Des brouillés en gros morceaux secs, c'est un feu trop fort. La patience est le seul ingrédient secret.", "Salez au début : le sel détend les protéines et donne des œufs plus tendres."]
},
{
  id: "x02", name: "Cacio e pepe : spaghetti, pecorino et poivre noir torréfié", category: "express",
  diet: [T.SP, T.H, T.VG], equipments: ["base"], prepTime: 3, cookTime: 12, difficulty: 3,
  costPerPerson: 2.2, calories: 640, protein: 24,
  skills: ["Émulsion fromage-amidon", "Torréfier le poivre", "Peu d'eau, beaucoup d'amidon"],
  ingredients: [i("Spaghetti", 100), i("Pecorino", 40), i("Poivre noir", 1, "càc"), i("Huile d'olive", 5, "ml")],
  instructions: [
    "Peu d'eau|Cuire les spaghetti dans peu d'eau (environ 1 litre pour 2 personnes), peu salée : l'eau devient très chargée en amidon, c'est elle qui fera la sauce.",
    "Poivre|Concasser grossièrement le poivre et le torréfier 1 minute à sec dans une grande poêle jusqu'à ce qu'il embaume.",
    "Pâte de fromage|Râper le pecorino très finement dans un bol, ajouter 2 cuillères d'eau de cuisson tiède (pas bouillante) et mélanger en pâte lisse.",
    "Assembler|Ajouter une louche d'eau de cuisson au poivre, puis les spaghetti égouttés 1 minute avant la fin, cuire 1 minute en remuant. Couper le feu, attendre 30 secondes.",
    "Émulsionner|Ajouter la pâte de pecorino et remuer vivement en ajoutant de l'eau de cuisson par petites touches : la sauce devient crémeuse et nappe. Servir immédiatement."
  ],
  tips: ["Si le fromage forme des filaments, c'était trop chaud : la poêle doit être hors du feu.", "Trois ingrédients, une technique : c'est le meilleur exercice pour comprendre les émulsions."]
},
{
  id: "x03", name: "Crevettes sautées ail-citron-persil et semoule aux herbes", category: "express",
  diet: [T.SP, T.SL], equipments: ["base"], prepTime: 8, cookTime: 10, difficulty: 1,
  costPerPerson: 4.3, calories: 520, protein: 32,
  skills: ["Saisir des crevettes", "Semoule minute", "Déglacer au citron"],
  ingredients: [i("Crevettes décortiquées", 130), i("Ail", 2, "gousse"), i("Citron", 0.5, "pièce"), i("Persil plat", 10), i("Piment d'Espelette", 0.25, "càc"), i("Semoule", 65), i("Menthe fraîche", 3), i("Tomates cerises", 80), i("Huile d'olive", 25, "ml")],
  instructions: [
    "Semoule|Semoule, sel, 1 cuillère d'huile, même volume d'eau bouillante, couvrir 5 minutes.",
    "Sécher|Éponger les crevettes, saler.",
    "Saisir|Poêle très chaude, huile, crevettes en une couche 1 minute sans toucher, retourner 1 minute.",
    "Ail et citron|Baisser le feu, ail émincé, piment et tomates coupées 1 minute, puis jus de citron : il décolle les sucs. Persil.",
    "Servir|Égrainer la semoule avec la menthe et le zeste, crevettes et jus par-dessus."
  ],
  tips: ["Une crevette trop cuite devient caoutchouteuse en 30 secondes : elle se cuit en moins de 3 minutes.", "L'ail s'ajoute après les crevettes, sinon il brûle à la température de saisie."]
},
{
  id: "x04", name: "Saumon poêlé peau croustillante, lentilles tièdes et sauce yaourt-aneth", category: "express",
  diet: [T.SP, T.H, T.SG], equipments: ["base"], prepTime: 8, cookTime: 10, difficulty: 2,
  costPerPerson: 5.0, calories: 600, protein: 42,
  skills: ["Peau de poisson croustillante", "Salade de légumineuses minute"],
  ingredients: [i("Pavé de saumon", 130), i("Lentilles cuites (boîte)", 130), i("Échalote", 0.5, "pièce"), i("Moutarde", 1, "càc"), i("Vinaigre de cidre", 1, "càc"), i("Yaourt grec", 50), i("Aneth", 5), i("Citron", 0.25, "pièce"), i("Roquette", 30), i("Huile d'olive", 20, "ml")],
  instructions: [
    "Lentilles|Rincer les lentilles, les chauffer 3 minutes à la poêle avec l'échalote ciselée, assaisonner de moutarde, vinaigre, huile et sel.",
    "Sécher la peau|Éponger la peau du saumon et la gratter avec le dos d'un couteau pour retirer l'humidité. Saler la peau.",
    "Cuire côté peau|Poêle chaude, filet d'huile, saumon côté peau, appuyer 15 secondes avec une spatule. Cuire 5 à 6 minutes sans toucher : la chair change de couleur de bas en haut.",
    "Finir|Retourner 30 secondes à 1 minute : le centre doit rester rosé.",
    "Sauce|Yaourt, aneth, citron, sel. Servir lentilles, roquette, saumon peau dessus, sauce."
  ],
  tips: ["On voit la cuisson monter sur le flanc du pavé : retournez quand il reste un tiers translucide.", "Peau toujours vers le haut à l'assiette, sinon elle ramollit."]
},
{
  id: "x05", name: "Nouilles sautées au poulet, chou et carotte, sauce soja-miel", category: "express",
  diet: [T.SP, T.H, T.SL], equipments: ["base"], prepTime: 8, cookTime: 10, difficulty: 1,
  costPerPerson: 3.0, calories: 640, protein: 36,
  skills: ["Sauter à feu vif", "Sauce de nouilles express"],
  ingredients: [i("Nouilles chinoises", 85), i("Blanc de poulet", 110), i("Chou blanc", 80), i("Carotte", 50), i("Oignon vert", 1, "pièce"), i("Ail", 1, "gousse"), i("Gingembre frais", 5), i("Sauce soja", 20, "ml"), i("Miel", 1, "càc"), i("Vinaigre de riz", 1, "càc"), i("Huile neutre", 15, "ml"), i("Graines de sésame", 5)],
  instructions: [
    "Nouilles|Les cuire selon le paquet (3 à 4 minutes), égoutter, rincer à l'eau froide, huiler légèrement.",
    "Sauce|Sauce soja, miel, vinaigre de riz, 2 cuillères d'eau.",
    "Poulet|Lanières fines, wok fumant, 3 minutes. Réserver.",
    "Légumes|Chou émincé et carotte en julienne 2 minutes, ail et gingembre 30 secondes.",
    "Sauter|Nouilles, poulet, sauce, 2 minutes en soulevant. Oignon vert et sésame."
  ],
  tips: ["Rincer les nouilles à l'eau froide stoppe la cuisson et retire l'amidon qui les collerait.", "Tout est prêt avant d'allumer le feu : c'est la seule règle du sauté."]
},
{
  id: "x06", name: "Gnocchis poêlés dorés, petits pois, citron et parmesan", category: "express",
  diet: [T.SP, T.H, T.VG], equipments: ["base"], prepTime: 5, cookTime: 12, difficulty: 1,
  costPerPerson: 2.6, calories: 620, protein: 20,
  skills: ["Poêler des gnocchis crus", "Sauce beurre-citron"],
  ingredients: [i("Gnocchis", 220), i("Petits pois (boîte)", 80), i("Beurre", 15), i("Citron", 0.5, "pièce"), i("Parmesan", 20), i("Menthe fraîche", 3), i("Ail", 1, "gousse"), i("Huile d'olive", 10, "ml")],
  instructions: [
    "Dorer|Sans les précuire, poser les gnocchis dans une poêle chaude huilée en une couche, 4 minutes sans toucher, puis sauter 3 minutes : croustillants dehors, fondants dedans.",
    "Petits pois|Ajouter les petits pois égouttés et l'ail râpé, 2 minutes.",
    "Sauce|Couper le feu, ajouter le beurre, le zeste et le jus du citron, 2 cuillères d'eau : remuer jusqu'à ce que ça devienne une sauce brillante.",
    "Servir|Parmesan râpé, menthe ciselée, poivre."
  ],
  tips: ["Les gnocchis du commerce poêlés crus sont bien meilleurs que bouillis.", "Plus la couche est unique, plus ils croustillent."]
},
{
  id: "x07", name: "Tartines de sardines grillées, tomate, oignon rouge et citron", category: "express",
  diet: [T.SP, T.H, T.SL], equipments: ["base"], prepTime: 8, cookTime: 5, difficulty: 1,
  costPerPerson: 2.4, calories: 520, protein: 28,
  skills: ["Ail frotté sur pain grillé", "Salsa minute"],
  ingredients: [i("Sardines (boîte)", 100), i("Pain de campagne", 2, "tranche"), i("Ail", 0.5, "gousse"), i("Tomate", 120), i("Oignon rouge", 0.25, "pièce"), i("Câpres", 1, "càc"), i("Citron", 0.5, "pièce"), i("Persil plat", 5), i("Roquette", 30), i("Huile d'olive", 15, "ml")],
  instructions: [
    "Pain|Griller le pain, le frotter aussitôt avec la gousse d'ail coupée : la croûte râpe l'ail comme une râpe.",
    "Salsa|Tomate en petits dés, oignon finement ciselé, câpres, persil, citron, huile, sel.",
    "Sardines|Les poser 1 minute dans une poêle chaude sans gras pour les colorer légèrement.",
    "Monter|Roquette, sardines, salsa, zeste de citron."
  ],
  tips: ["Les sardines en conserve se bonifient avec le temps : un millésime de plusieurs années est une vraie spécialité.", "Riche en oméga-3 et en protéines, pour moins de 3 €."]
},
{
  id: "x08", name: "Riz cantonais au micro-ondes, œuf brouillé, jambon de dinde et petits pois", category: "express",
  diet: [T.SP, T.H, T.SL], equipments: ["micro-ondes"], prepTime: 6, cookTime: 14, difficulty: 1,
  costPerPerson: 2.2, calories: 560, protein: 26,
  skills: ["Riz au micro-ondes", "Œuf brouillé au micro-ondes"],
  ingredients: [i("Riz basmati", 70), i("Œuf", 1, "pièce"), i("Jambon de dinde", 2, "tranche"), i("Petits pois (boîte)", 60), i("Oignon vert", 1, "pièce"), i("Sauce soja", 15, "ml"), i("Huile de sésame", 5, "ml")],
  instructions: [
    "Riz|Riz rincé, 2 fois son volume d'eau, sel, dans un grand bol couvert sans serrer. 10 minutes à 800 W, puis repos 2 minutes. Étaler pour le sécher.",
    "Œuf|Battre l'œuf avec une pincée de sel dans un bol, 40 secondes, remuer, 20 secondes : brouillé ferme. L'émietter.",
    "Assembler|Mélanger riz, œuf, jambon en dés, petits pois, sauce soja et huile de sésame. 1 minute 30 à 800 W.",
    "Servir|Oignon vert ciselé."
  ],
  tips: ["Avec un reste de riz de la veille, il ne reste que 5 minutes de préparation, et le résultat est meilleur.", "L'huile de sésame se met à la fin : chauffée longtemps, elle perd son parfum."]
},
{
  id: "x09", name: "Wrap thon-avocat-maïs, chou croquant et sauce yaourt au citron vert", category: "express",
  diet: [T.SP, T.H], equipments: [], prepTime: 12, cookTime: 0, difficulty: 1,
  costPerPerson: 2.8, calories: 560, protein: 32,
  skills: ["Rouler un wrap serré", "Sauce yaourt relevée"],
  ingredients: [i("Tortilla de blé", 1, "pièce"), i("Thon au naturel (boîte)", 80), i("Avocat", 0.5, "pièce"), i("Maïs (boîte)", 40), i("Chou rouge", 30), i("Yaourt grec", 40), i("Citron vert", 0.5, "pièce"), i("Coriandre fraîche", 5), i("Piment d'Espelette", 0.25, "càc")],
  instructions: [
    "Sauce|Yaourt, zeste et jus de citron vert, piment, sel.",
    "Garniture|Mélanger thon émietté, maïs égoutté et la moitié de la sauce.",
    "Monter|Étaler le reste de sauce sur la tortilla, avocat en lamelles, chou émincé, thon, coriandre, en gardant 3 cm de marge.",
    "Rouler|Replier les côtés, puis rouler en serrant à chaque tour avec les pouces. Couper en biais."
  ],
  tips: ["Une tortilla réchauffée 10 secondes à la poêle se roule sans craquer.", "Emballé dans du papier aluminium, le wrap se transporte sans se défaire."]
},
{
  id: "x10", name: "Spaghetti citron-ricotta, épinards et pistaches", category: "express",
  diet: [T.SP, T.H, T.VG], equipments: ["base"], prepTime: 5, cookTime: 12, difficulty: 1,
  costPerPerson: 2.6, calories: 660, protein: 24,
  skills: ["Sauce crue liée à l'eau de cuisson", "Faire tomber les épinards dans l'eau des pâtes"],
  ingredients: [i("Spaghetti", 95), i("Ricotta", 60), i("Citron", 0.5, "pièce"), i("Épinards frais", 80), i("Parmesan", 15), i("Pistaches", 10), i("Huile d'olive", 10, "ml")],
  instructions: [
    "Sauce crue|Dans un saladier : ricotta, zeste et jus du citron, parmesan, huile, sel et beaucoup de poivre.",
    "Pâtes|Cuire les spaghetti, ajouter les épinards dans l'eau les 30 dernières secondes. Garder une louche d'eau.",
    "Lier|Délayer la ricotta avec 3 cuillères d'eau de cuisson, ajouter pâtes et épinards égouttés, mélanger : une sauce soyeuse sans cuisson.",
    "Servir|Pistaches concassées pour le croquant."
  ],
  tips: ["Le zeste porte le parfum du citron, le jus son acidité : utilisez les deux.", "Pistaches, noisettes ou amandes : un croquant change tout dans un plat crémeux."]
},
{
  id: "x11", name: "Bœuf haché sauté façon bulgogi, riz et concombre au vinaigre", category: "express",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["base"], prepTime: 6, cookTime: 14, difficulty: 1,
  costPerPerson: 3.5, calories: 680, protein: 36,
  skills: ["Caraméliser une viande hachée", "Marinade coréenne"],
  ingredients: [i("Bœuf haché 15 % MG", 130), i("Tamari (sauce soja sans gluten)", 20, "ml"), i("Sucre", 1.5, "càc"), i("Ail", 2, "gousse"), i("Gingembre frais", 5), i("Huile de sésame", 5, "ml"), i("Riz jasmin", 70), i("Concombre", 80), i("Vinaigre de riz", 1, "càs"), i("Oignon vert", 1, "pièce"), i("Graines de sésame", 5)],
  instructions: [
    "Riz|Lancer le riz rincé avec 1,3 fois son volume d'eau, couvert, 12 minutes.",
    "Concombre|Fines rondelles, vinaigre de riz, sel.",
    "Sauce|Tamari, sucre, ail et gingembre râpés.",
    "Caraméliser|Poêle très chaude, bœuf étalé 3 minutes sans toucher, émietter, verser la sauce et cuire jusqu'à ce qu'elle soit absorbée et que la viande soit brillante et légèrement collante. Huile de sésame.",
    "Servir|Riz, bœuf, concombre, oignon vert et sésame."
  ],
  tips: ["Le sucre caramélise avec la viande : c'est le goût grillé-sucré du bulgogi.", "Un œuf au plat par-dessus et c'est un vrai bibimbap express."]
},
{
  id: "x12", name: "Émincé de poulet moutarde-estragon et tagliatelles", category: "express",
  diet: [T.SP, T.H], equipments: ["base"], prepTime: 5, cookTime: 15, difficulty: 1,
  costPerPerson: 3.4, calories: 690, protein: 44,
  skills: ["Sauce à la crème réduite", "Cuisson d'émincé"],
  ingredients: [i("Blanc de poulet", 140), i("Tagliatelles", 80), i("Échalote", 0.5, "pièce"), i("Moutarde à l'ancienne", 2, "càc"), i("Crème liquide 30 %", 50, "ml"), i("Estragon", 3), i("Citron", 0.25, "pièce"), i("Huile d'olive", 10, "ml")],
  instructions: [
    "Pâtes|Cuire les tagliatelles dans une eau bien salée.",
    "Poulet|Émincer finement, saler, saisir à feu vif 4 minutes en une couche. Réserver.",
    "Sauce|Faire suer l'échalote 1 minute, déglacer avec 3 cuillères d'eau, ajouter crème et moutarde, réduire 2 minutes jusqu'à ce qu'elle nappe.",
    "Assembler|Remettre le poulet, l'estragon ciselé et un trait de citron, puis les pâtes avec un peu d'eau de cuisson."
  ],
  tips: ["L'estragon et la moutarde sont un duo classique de la cuisine française. Le persil le remplace si besoin.", "La moutarde à l'ancienne ajoutée tard garde ses grains entiers et son piquant."]
},
{
  id: "x13", name: "Tacos de crevettes au paprika, slaw au citron vert et sauce crémeuse", category: "express",
  diet: [T.SP], equipments: ["base"], prepTime: 10, cookTime: 6, difficulty: 1,
  costPerPerson: 4.2, calories: 560, protein: 30,
  skills: ["Slaw minute", "Saisie rapide"],
  ingredients: [i("Crevettes décortiquées", 120), i("Paprika fumé", 1, "càc"), i("Cumin moulu", 0.5, "càc"), i("Tortilla de blé", 3, "pièce"), i("Chou rouge", 60), i("Citron vert", 1, "pièce"), i("Coriandre fraîche", 5), i("Yaourt grec", 30), i("Mayonnaise", 10), i("Avocat", 0.5, "pièce"), i("Huile d'olive", 10, "ml")],
  instructions: [
    "Slaw|Chou émincé finement, jus d'un demi-citron vert, sel, coriandre.",
    "Sauce|Yaourt, mayonnaise, zeste de citron vert, une pincée de paprika.",
    "Crevettes|Les enrober de paprika, cumin, sel et huile, saisir 1 minute par face dans une poêle très chaude.",
    "Tortillas|Chauffer à sec 20 secondes par face.",
    "Garnir|Sauce, slaw, avocat, crevettes, quartier de citron vert."
  ],
  tips: ["Le chou rouge reste croquant même assaisonné : on peut faire le slaw à l'avance.", "Des épices sèches brûlent vite à feu vif : la saisie est courte, c'est parfait."]
},
{
  id: "x14", name: "Patate douce au micro-ondes farcie aux haricots noirs, feta et sauce citron vert", category: "express",
  diet: [T.SP, T.H, T.SG, T.VG], equipments: ["micro-ondes"], prepTime: 6, cookTime: 12, difficulty: 1,
  costPerPerson: 2.5, calories: 560, protein: 20,
  skills: ["Cuire une patate douce au micro-ondes", "Garniture contrastée"],
  ingredients: [i("Patate douce", 280), i("Haricots noirs (boîte)", 90), i("Maïs (boîte)", 30), i("Paprika fumé", 0.5, "càc"), i("Cumin moulu", 0.5, "càc"), i("Feta", 30), i("Yaourt grec", 40), i("Citron vert", 0.5, "pièce"), i("Oignon rouge", 0.25, "pièce"), i("Coriandre fraîche", 5)],
  instructions: [
    "Cuire|Piquer la patate douce, l'envelopper dans du papier absorbant humide (il crée de la vapeur et empêche la peau de durcir) et cuire 8 à 10 minutes à 800 W en la retournant. Elle doit céder sous la pression.",
    "Garniture|Haricots et maïs rincés, paprika, cumin, sel, 1 minute 30 au micro-ondes.",
    "Sauce|Yaourt, citron vert, sel.",
    "Garnir|Fendre la patate douce, écraser légèrement la chair à la fourchette, ajouter haricots, feta émiettée, oignon rouge ciselé, sauce et coriandre."
  ],
  tips: ["Le papier absorbant humide est le geste qui évite une peau sèche et racornie.", "L'oignon rouge cru apporte le piquant et le croquant qui manquent à la patate douce."]
},
{
  id: "x15", name: "Pois chiches poêlés aux épinards, ail et cumin, œuf mollet", category: "express",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG], equipments: ["base"], prepTime: 5, cookTime: 12, difficulty: 1,
  costPerPerson: 2.0, calories: 470, protein: 24,
  skills: ["Pois chiches croustillants à la poêle", "Œuf mollet minuté"],
  ingredients: [i("Pois chiches (boîte)", 130), i("Épinards frais", 120), i("Ail", 2, "gousse"), i("Cumin moulu", 1, "càc"), i("Paprika fumé", 0.5, "càc"), i("Œuf", 1, "pièce"), i("Citron", 0.25, "pièce"), i("Huile d'olive", 20, "ml")],
  instructions: [
    "Œuf|Plonger l'œuf dans l'eau bouillante 6 minutes 30, puis eau glacée.",
    "Pois chiches|Bien sécher, poêle chaude huilée, 7 minutes en secouant de temps en temps jusqu'à ce qu'ils éclatent et dorent. Ajouter cumin, paprika et sel en fin de cuisson.",
    "Épinards|Ajouter l'ail émincé 30 secondes, puis les épinards par poignées jusqu'à ce qu'ils tombent. Citron.",
    "Servir|Œuf écalé coupé en deux sur le dessus, jaune coulant comme sauce."
  ],
  tips: ["Le jaune coulant sert de sauce : pas besoin d'en ajouter.", "Les épices se mettent en fin de cuisson des pois chiches pour ne pas brûler."]
},
{
  id: "x16", name: "Tofu sauté minute, nouilles de riz et sauce cacahuète-citron vert", category: "express",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG, T.VN], equipments: ["base"], prepTime: 8, cookTime: 10, difficulty: 1,
  costPerPerson: 2.6, calories: 640, protein: 26,
  skills: ["Dorer du tofu rapidement", "Sauce cacahuète sans cuisson"],
  ingredients: [i("Tofu ferme", 120), i("Nouilles de riz", 70), i("Beurre de cacahuète", 25), i("Tamari (sauce soja sans gluten)", 15, "ml"), i("Citron vert", 0.5, "pièce"), i("Sirop d'érable", 1, "càc"), i("Carotte", 50), i("Concombre", 50), i("Coriandre fraîche", 5), i("Huile neutre", 15, "ml")],
  instructions: [
    "Nouilles|Tremper dans l'eau très chaude 6 à 8 minutes, rincer.",
    "Tofu|Éponger fortement, cubes, poêle chaude huilée 6 minutes jusqu'à ce que toutes les faces soient dorées, tamari en fin de cuisson.",
    "Sauce|Beurre de cacahuète, jus de citron vert, sirop d'érable, un trait de tamari et 3 cuillères d'eau chaude, fouetter.",
    "Assembler|Nouilles mélangées à la sauce, tofu, carotte et concombre en julienne, coriandre."
  ],
  tips: ["L'eau chaude détend le beurre de cacahuète en sauce lisse en quelques secondes.", "Le tofu ne dore que s'il ne bouge pas : laissez-le tranquille 2 minutes par face."]
}
);

/* ---------- ÉCONOMIQUE / ÉTUDIANT (moins de 2,80 € par personne) ---------- */
RECIPES.push(
{
  id: "e01", name: "Riz frit à l'œuf comme au restaurant, petits pois et oignons verts", category: "economique",
  diet: [T.SP, T.H, T.SL, T.VG], equipments: ["base"], prepTime: 10, cookTime: 25, difficulty: 2,
  costPerPerson: 1.4, calories: 560, protein: 19,
  skills: ["Riz sec pour sauter", "Œuf brouillé dans le wok", "Wok hei (goût de feu)"],
  ingredients: [i("Riz jasmin", 80), i("Œuf", 2, "pièce"), i("Petits pois (boîte)", 60), i("Carotte", 40), i("Oignon vert", 2, "pièce"), i("Ail", 1, "gousse"), i("Sauce soja", 15, "ml"), i("Huile de sésame", 3, "ml"), i("Huile neutre", 20, "ml")],
  instructions: [
    "Riz sec|Cuire le riz (1,2 fois son volume d'eau, 12 minutes), l'étaler sur une plaque et le laisser refroidir au moins 15 minutes, idéalement une nuit au frais. Un riz chaud et humide devient collant et pâteux au wok.",
    "Préparer|Carotte en petits dés, oignons verts émincés (blanc et vert séparés), ail haché, œufs battus salés.",
    "Œuf|Wok fumant, la moitié de l'huile, verser les œufs, remuer 30 secondes : brouillés mous. Réserver.",
    "Sauter|Reste d'huile, blanc d'oignon, ail et carotte 1 minute, puis le riz : l'écraser contre la paroi et le laisser griller 30 secondes avant de remuer, plusieurs fois. Les grains doivent danser et légèrement crépiter.",
    "Assembler|Petits pois, sauce soja versée le long de la paroi chaude (elle caramélise au contact), œufs, vert d'oignon, huile de sésame."
  ],
  tips: ["Le riz de la veille est la règle d'or du riz frit : chaque restaurant asiatique l'utilise.", "Votre poêle n'est pas assez chaude si le riz ne fait aucun bruit."]
},
{
  id: "e02", name: "Soupe à l'oignon gratinée, oignons caramélisés longuement", category: "economique",
  diet: [T.SP, T.H, T.VG], equipments: ["base", "four"], prepTime: 15, cookTime: 60, difficulty: 2,
  costPerPerson: 2.0, calories: 520, protein: 20,
  skills: ["Caramélisation lente", "Déglacer plusieurs fois", "Gratiner"],
  ingredients: [i("Oignon", 2, "pièce"), i("Beurre", 15), i("Farine de blé", 5), i("Bouillon de légumes (cube)", 0.5, "pièce"), i("Vinaigre de cidre", 1, "càc"), i("Thym", 0.5, "càc"), i("Laurier", 0.5, "feuille"), i("Pain de campagne", 1, "tranche"), i("Comté", 40), i("Huile d'olive", 5, "ml")],
  instructions: [
    "Émincer|Couper les oignons en fines demi-lunes régulières.",
    "Caraméliser|Beurre et huile à feu moyen, oignons et une pincée de sel, couvrir 10 minutes pour qu'ils rendent leur eau. Puis découvrir, feu moyen-doux, et remuer toutes les 3 à 4 minutes pendant 30 minutes. Quand ça accroche, ajouter 2 cuillères d'eau et gratter : le fond brun rejoint les oignons. Ils doivent devenir brun acajou et confits.",
    "Lier|Saupoudrer de farine, remuer 1 minute.",
    "Mouiller|Ajouter 350 ml de bouillon chaud par personne, thym, laurier, mijoter 15 minutes. Finir avec le vinaigre, qui apporte l'acidité habituellement donnée par le vin.",
    "Gratiner|Verser dans des bols allant au four, poser le pain grillé, couvrir de comté râpé et passer sous le gril 5 minutes jusqu'à ce que le fromage bulle et brunisse."
  ],
  tips: ["La couleur de la soupe vient uniquement des oignons : pas de raccourci, 40 minutes minimum.", "Un bon tiers de comté vieux donne plus de goût que le double de fromage râpé standard."]
},
{
  id: "e03", name: "Hachis parmentier classique, purée maison au beurre et muscade", category: "economique",
  diet: [T.SP, T.H, T.SG], equipments: ["base", "four"], prepTime: 25, cookTime: 45, difficulty: 2,
  costPerPerson: 2.7, calories: 690, protein: 34,
  skills: ["Purée maison onctueuse", "Garniture de viande fondante", "Gratiner"],
  ingredients: [i("Bœuf haché 15 % MG", 110), i("Oignon", 0.5, "pièce"), i("Carotte", 50), i("Ail", 1, "gousse"), i("Concentré de tomate", 1, "càc"), i("Thym", 0.5, "càc"), i("Pomme de terre", 280), i("Lait", 70, "ml"), i("Beurre", 20), i("Muscade", 0.25, "càc"), i("Emmental râpé", 20), i("Huile d'olive", 10, "ml")],
  instructions: [
    "Pommes de terre|Les éplucher, couper en morceaux égaux et les cuire départ eau froide salée 20 minutes. Départ à froid, elles cuisent uniformément jusqu'au cœur.",
    "Garniture|Dorer le bœuf à feu vif, ajouter oignon et carotte finement hachés 6 minutes, ail, concentré, thym, un demi-verre d'eau. Cuire 10 minutes jusqu'à ce que le liquide ait presque disparu. Rectifier le sel.",
    "Purée|Égoutter, laisser fumer 2 minutes pour évaporer l'eau, écraser au presse-purée (jamais au mixeur, qui rend élastique). Incorporer le beurre en morceaux puis le lait chaud, muscade, sel.",
    "Monter|Viande au fond, purée dessus, stries à la fourchette, fromage.",
    "Gratiner|20 minutes à 200 °C, 2 minutes de gril pour colorer les stries."
  ],
  tips: ["Le mixeur casse l'amidon des pommes de terre : la purée devient collante comme de la colle.", "Beurre d'abord, lait ensuite : le gras enrobe l'amidon et donne une purée plus fine."]
},
{
  id: "e04", name: "Tortilla espagnole fondante aux oignons confits, salade de tomates", category: "economique",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG], equipments: ["base"], prepTime: 15, cookTime: 35, difficulty: 3,
  costPerPerson: 1.6, calories: 580, protein: 20,
  skills: ["Confire des pommes de terre", "Retourner une omelette épaisse", "Cœur baveux"],
  ingredients: [i("Pomme de terre", 220), i("Oignon", 0.5, "pièce"), i("Œuf", 2.5, "pièce"), i("Huile d'olive", 60, "ml"), i("Tomate", 150), i("Ail", 0.5, "gousse"), i("Vinaigre de cidre", 1, "càc"), i("Persil plat", 5)],
  instructions: [
    "Confire|Couper les pommes de terre en fines lamelles irrégulières, l'oignon en lamelles. Les cuire à feu doux dans l'huile 20 minutes, en remuant de temps en temps : elles doivent être fondantes sans dorer. Saler.",
    "Égoutter et mariner|Égoutter dans une passoire (garder l'huile, elle resservira), puis mélanger avec les œufs battus salés. Laisser reposer 10 minutes : les pommes de terre s'imprègnent d'œuf.",
    "Cuire|Poêle antiadhésive de 20 cm avec 1 cuillère de l'huile, verser, cuire 5 minutes à feu moyen en décollant les bords à la spatule.",
    "Retourner|Poser une assiette plus large sur la poêle et retourner d'un geste franc au-dessus de l'évier. Remettre une goutte d'huile et faire glisser la tortilla dans la poêle. Cuire 2 à 3 minutes : le cœur reste juteux.",
    "Salade|Tomates en tranches, ail râpé, vinaigre, huile, sel, persil."
  ],
  tips: ["Le retournement fait peur une fois : un geste rapide et décidé, sans hésiter, et ça passe.", "En Espagne, elle se mange tiède ou froide : c'est le roi des pique-niques."]
},
{
  id: "e05", name: "Penne all'arrabbiata, sauce tomate pimentée et huile à l'ail", category: "economique",
  diet: [T.SP, T.H, T.SL, T.VG, T.VN], equipments: ["base"], prepTime: 5, cookTime: 20, difficulty: 1,
  costPerPerson: 1.3, calories: 600, protein: 18,
  skills: ["Infuser ail et piment dans l'huile", "Réduire une sauce tomate", "Pâtes al dente"],
  ingredients: [i("Penne", 100), i("Tomates concassées", 200), i("Ail", 3, "gousse"), i("Piment d'Espelette", 0.5, "càc"), i("Persil plat", 5), i("Sucre", 0.25, "càc"), i("Huile d'olive", 25, "ml")],
  instructions: [
    "Infuser|Dans une poêle froide, mettre l'huile, l'ail en lamelles et le piment. Chauffer doucement : l'ail doit frémir 3 minutes et devenir à peine blond. Départ à froid, il parfume l'huile sans brûler.",
    "Sauce|Ajouter les tomates, sucre et sel, réduire 12 minutes à feu moyen jusqu'à ce que la sauce épaississe et que l'huile perle en surface.",
    "Pâtes|Cuire les penne 1 minute de moins que le paquet.",
    "Finir|Les terminer 1 minute dans la sauce avec un peu d'eau de cuisson. Persil."
  ],
  tips: ["Arrabbiata veut dire « en colère » : dosez le piment selon votre courage.", "Une sauce bien réduite colle aux pâtes au lieu de baigner au fond de l'assiette."]
},
{
  id: "e06", name: "Velouté poireaux-pommes de terre, œuf poché et croûtons à l'ail", category: "economique",
  diet: [T.SP, T.H, T.VG], equipments: ["base", "mixeur"], prepTime: 15, cookTime: 30, difficulty: 2,
  costPerPerson: 1.7, calories: 470, protein: 17,
  skills: ["Faire suer sans colorer", "Œuf poché", "Velouté lisse"],
  ingredients: [i("Poireau", 200), i("Pomme de terre", 150), i("Beurre", 15), i("Bouillon de légumes (cube)", 0.5, "pièce"), i("Crème fraîche épaisse", 15), i("Œuf", 1, "pièce"), i("Vinaigre de cidre", 1, "càs"), i("Pain de campagne", 1, "tranche"), i("Ail", 0.5, "gousse"), i("Ciboulette", 5)],
  instructions: [
    "Poireaux|Fendre en quatre, laver soigneusement entre les feuilles (la terre s'y cache), émincer. Les faire suer dans le beurre 8 minutes à feu doux, à couvert : ils deviennent tendres sans colorer, le velouté reste vert pâle.",
    "Cuire|Ajouter les pommes de terre en dés et 350 ml de bouillon par personne, 20 minutes.",
    "Mixer|Mixer longuement avec la crème, ajuster sel et épaisseur.",
    "Œuf poché|Eau frémissante (petites bulles, jamais de gros bouillons) avec le vinaigre. Casser l'œuf dans un ramequin, créer un léger tourbillon et faire glisser l'œuf au centre. 3 minutes, puis sortir à l'écumoire.",
    "Croûtons|Pain en dés dorés à la poêle, frottés d'ail.",
    "Servir|Velouté, œuf poché au centre, croûtons, ciboulette."
  ],
  tips: ["Un œuf très frais se poche beaucoup mieux : son blanc reste groupé.", "Le vinaigre aide le blanc à coaguler vite, sans donner de goût à cette dose."]
},
{
  id: "e07", name: "Rösti croustillants à l'air fryer, œuf au plat et salade moutardée", category: "economique",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG], equipments: ["airfryer"], prepTime: 20, cookTime: 20, difficulty: 2,
  costPerPerson: 1.5, calories: 520, protein: 18,
  skills: ["Essorer des pommes de terre râpées", "Galettes croustillantes", "Œuf à l'air fryer"],
  ingredients: [i("Pomme de terre", 250), i("Oignon", 0.25, "pièce"), i("Fécule de maïs", 10), i("Œuf", 1, "pièce"), i("Huile d'olive", 25, "ml"), i("Salade verte", 60), i("Moutarde", 1, "càc"), i("Vinaigre de cidre", 1, "càc"), i("Ciboulette", 3)],
  instructions: [
    "Râper et essorer|Râper les pommes de terre et l'oignon, saler, attendre 5 minutes, puis presser très fortement dans un torchon propre jusqu'à ce qu'il ne coule plus rien. C'est l'étape décisive : l'eau est l'ennemie du croustillant.",
    "Lier|Mélanger avec la fécule et du poivre.",
    "Façonner|Former des galettes fines de 1 cm, les badigeonner d'huile des deux côtés.",
    "Cuire|Air fryer 200 °C, 16 à 18 minutes en retournant délicatement à mi-cuisson, jusqu'à ce qu'elles soient brun doré.",
    "Œuf|Dans un petit ramequin huilé, 5 à 6 minutes à 180 °C pendant que les galettes reposent.",
    "Salade|Vinaigrette moutarde-vinaigre-huile, ciboulette."
  ],
  tips: ["La fécule remplace l'œuf pour lier et donne un croustillant plus net.", "Une pomme de terre à chair farineuse croustille mieux qu'une ferme."]
},
{
  id: "e08", name: "Coquillettes jambon-comté façon risotto", category: "economique",
  diet: [], equipments: ["base"], prepTime: 5, cookTime: 15, difficulty: 1,
  costPerPerson: 2.1, calories: 640, protein: 30,
  skills: ["Cuisson des pâtes par absorption", "Lier au fromage"],
  ingredients: [i("Coquillettes", 100), i("Jambon blanc", 1, "tranche"), i("Comté", 35), i("Échalote", 0.5, "pièce"), i("Bouillon de volaille (cube)", 0.25, "pièce"), i("Beurre", 10), i("Ciboulette", 5)],
  instructions: [
    "Base|Faire suer l'échalote ciselée dans le beurre 2 minutes, ajouter les coquillettes et remuer 1 minute.",
    "Absorption|Verser le bouillon chaud louche par louche (250 ml par personne au total), en remuant, comme pour un risotto : 10 à 12 minutes. L'amidon reste dans la casserole et crée une sauce.",
    "Lier|Hors du feu, jambon en lanières et comté râpé, remuer vivement : c'est crémeux sans une goutte de crème.",
    "Servir|Ciboulette et poivre."
  ],
  tips: ["Le plat préféré des grands chefs quand ils rentrent chez eux : la technique du risotto appliquée aux coquillettes.", "Gardez un fond de bouillon pour ajuster la texture au dernier moment."]
},
{
  id: "e09", name: "Pilons de poulet laqués miel-moutarde et pommes de terre rôties au thym", category: "economique",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["four"], prepTime: 15, cookTime: 45, difficulty: 1,
  costPerPerson: 2.6, calories: 640, protein: 36,
  skills: ["Laquer en fin de cuisson", "Rôtir des morceaux avec os"],
  ingredients: [i("Pilon de poulet", 3, "pièce"), i("Miel", 2, "càc"), i("Moutarde à l'ancienne", 2, "càc"), i("Ail", 1, "gousse"), i("Pomme de terre", 220), i("Thym", 1, "càc"), i("Carotte", 80), i("Huile d'olive", 20, "ml"), i("Vinaigre de cidre", 1, "càc")],
  instructions: [
    "Rôtir|Préchauffer le four à 200 °C. Pommes de terre et carottes en morceaux, huile, thym, sel. Pilons salés posés dessus. Rôtir 25 minutes.",
    "Laque|Mélanger miel, moutarde, ail râpé et vinaigre.",
    "Laquer|Badigeonner les pilons et poursuivre 15 à 20 minutes, en badigeonnant une seconde fois à mi-parcours. Ajouté dès le départ, le miel brûlerait avant que la viande soit cuite.",
    "Vérifier|Près de l'os, la chair doit être blanche et le jus clair.",
    "Servir|Napper du jus de la plaque."
  ],
  tips: ["Les pilons sont le morceau le moins cher et le plus tolérant du poulet : impossible de les dessécher.", "La moutarde à l'ancienne accroche mieux à la peau que la moutarde fine."]
},
{
  id: "e10", name: "Mujaddara : riz et lentilles aux oignons frits, yaourt à l'ail et concombre", category: "economique",
  diet: [T.SP, T.H, T.SG, T.VG], equipments: ["base"], prepTime: 15, cookTime: 45, difficulty: 2,
  costPerPerson: 1.5, calories: 620, protein: 22,
  skills: ["Oignons frits croustillants", "Cuisson combinée riz-lentilles", "Huile parfumée réutilisée"],
  ingredients: [i("Lentilles vertes", 50), i("Riz basmati", 50), i("Oignon", 1.5, "pièce"), i("Cumin moulu", 1, "càc"), i("Cannelle", 0.25, "càc"), i("Yaourt grec", 60), i("Ail", 0.5, "gousse"), i("Concombre", 60), i("Persil plat", 5), i("Huile neutre", 40, "ml")],
  instructions: [
    "Oignons frits|Émincer finement les oignons. Les cuire dans l'huile à feu moyen 20 à 25 minutes en remuant, jusqu'à ce qu'ils soient brun foncé et croustillants. Égoutter sur papier absorbant, saler. Garder l'huile, désormais parfumée.",
    "Lentilles|Les précuire 15 minutes à l'eau. Égoutter.",
    "Riz et lentilles|Dans 1 cuillère d'huile des oignons, faire revenir cumin et cannelle 30 secondes, ajouter le riz rincé, les lentilles, un tiers des oignons et 1,5 fois le volume du riz en eau salée. Couvrir 15 minutes à feu doux, puis 5 minutes de repos.",
    "Yaourt|Yaourt, ail râpé, concombre en dés, sel.",
    "Servir|Riz-lentilles surmonté du reste des oignons croustillants, yaourt à côté, persil."
  ],
  tips: ["Plat levantin de base depuis le Moyen Âge : tout le goût vient des oignons, ne les retirez pas trop tôt.", "Riz et lentilles ensemble forment des protéines complètes."]
},
{
  id: "e11", name: "Galettes de thon et pommes de terre à l'air fryer, sauce tartare légère", category: "economique",
  diet: [T.SP, T.H], equipments: ["airfryer", "micro-ondes"], prepTime: 25, cookTime: 22, difficulty: 2,
  costPerPerson: 2.4, calories: 560, protein: 32,
  skills: ["Fishcakes", "Purée sèche pour façonner", "Sauce tartare"],
  ingredients: [i("Thon au naturel (boîte)", 80), i("Pomme de terre", 200), i("Œuf", 0.5, "pièce"), i("Oignon vert", 1, "pièce"), i("Persil plat", 5), i("Citron", 0.5, "pièce"), i("Chapelure", 25), i("Yaourt grec", 50), i("Cornichons", 15), i("Câpres", 1, "càc"), i("Salade verte", 40), i("Huile d'olive", 15, "ml")],
  instructions: [
    "Pommes de terre|Les piquer et cuire entières 8 à 10 minutes au micro-ondes. Éplucher et écraser : une purée sèche, sans lait, pour que les galettes se tiennent.",
    "Mélange|Thon bien égoutté, purée, œuf, oignon vert, persil, zeste de citron, sel, poivre.",
    "Façonner|Former des galettes de 2 cm, les rouler dans la chapelure. 10 minutes au frais.",
    "Cuire|Badigeonner d'huile, air fryer 190 °C 12 minutes en retournant à mi-cuisson.",
    "Sauce tartare|Yaourt, cornichons et câpres hachés, jus de citron.",
    "Servir|Avec la salade et la sauce."
  ],
  tips: ["Pressez bien le thon : l'eau ferait éclater les galettes.", "Ces galettes fonctionnent avec n'importe quel poisson en conserve : saumon, maquereau."]
},
{
  id: "e12", name: "Pâtes au chou-fleur rôti, ail, câpres et chapelure croustillante", category: "economique",
  diet: [T.SP, T.H, T.SL, T.VG, T.VN], equipments: ["base", "four"], prepTime: 10, cookTime: 25, difficulty: 1,
  costPerPerson: 1.6, calories: 620, protein: 18,
  skills: ["Rôtir pour caraméliser", "Pangrattato", "Lier à l'eau de cuisson"],
  ingredients: [i("Orecchiette", 95), i("Chou-fleur", 220), i("Ail", 2, "gousse"), i("Câpres", 1, "càs"), i("Piment d'Espelette", 0.25, "càc"), i("Citron", 0.25, "pièce"), i("Chapelure", 20), i("Persil plat", 5), i("Huile d'olive", 35, "ml")],
  instructions: [
    "Rôtir|Petits bouquets de chou-fleur, la moitié de l'huile, sel, 25 minutes à 220 °C : ils doivent être bruns sur les bords, c'est là qu'est le goût.",
    "Pangrattato|Dorer la chapelure dans 1 cuillère d'huile, zeste de citron.",
    "Pâtes|Cuire les orecchiette.",
    "Sauce|Reste d'huile, ail émincé, piment, câpres 1 minute. Ajouter le chou-fleur, les pâtes et une louche d'eau de cuisson, remuer 1 minute : une partie du chou-fleur s'écrase et lie la sauce.",
    "Servir|Jus de citron, persil, chapelure."
  ],
  tips: ["Le chou-fleur bouilli est fade et soufré ; rôti, il devient noisette et sucré.", "La chapelure dorée apporte le croquant du parmesan pour un coût dérisoire."]
},
{
  id: "e13", name: "Saucisses de Toulouse aux lentilles mijotées et carottes", category: "economique",
  diet: [T.SL, T.SG], equipments: ["base"], prepTime: 15, cookTime: 40, difficulty: 1,
  costPerPerson: 2.5, calories: 720, protein: 38,
  skills: ["Saisir et mijoter des saucisses", "Lentilles dans un jus de viande"],
  ingredients: [i("Saucisse de Toulouse", 1.5, "pièce"), i("Lentilles vertes", 70), i("Carotte", 80), i("Oignon", 0.5, "pièce"), i("Ail", 1, "gousse"), i("Thym", 0.5, "càc"), i("Laurier", 1, "feuille"), i("Moutarde", 1, "càc"), i("Vinaigre de cidre", 1, "càc"), i("Persil plat", 5)],
  instructions: [
    "Saisir|Dorer les saucisses entières dans une cocotte à sec 6 minutes. Les sortir.",
    "Base|Dans leur graisse, oignon et carotte en dés 5 minutes, ail 1 minute.",
    "Mijoter|Ajouter lentilles rincées, thym, laurier, 3 fois leur volume d'eau. Reposer les saucisses dessus, couvrir et cuire 30 minutes à feu doux : les lentilles cuisent dans le jus des saucisses.",
    "Finir|Les lentilles doivent être tendres et le liquide presque absorbé. Saler seulement maintenant, ajouter moutarde et vinaigre.",
    "Servir|Persil ciselé."
  ],
  tips: ["Le vinaigre final réveille les lentilles : n'oubliez jamais un acide sur les légumineuses.", "Ne piquez pas les saucisses : elles garderaient moins leur jus."]
},
{
  id: "e14", name: "Purée maison au beurre, œufs au plat et épinards à l'ail", category: "economique",
  diet: [T.SP, T.H, T.SG, T.VG], equipments: ["base"], prepTime: 10, cookTime: 25, difficulty: 1,
  costPerPerson: 1.8, calories: 580, protein: 20,
  skills: ["Purée onctueuse", "Œuf au plat parfait", "Épinards sautés"],
  ingredients: [i("Pomme de terre", 280), i("Beurre", 25), i("Lait", 70, "ml"), i("Muscade", 0.25, "càc"), i("Œuf", 2, "pièce"), i("Épinards frais", 120), i("Ail", 1, "gousse"), i("Huile d'olive", 10, "ml")],
  instructions: [
    "Purée|Pommes de terre départ eau froide salée 20 minutes, égouttées et séchées 2 minutes, écrasées au presse-purée, beurre puis lait chaud, muscade.",
    "Épinards|Ail émincé dans l'huile 30 secondes, épinards par poignées 2 minutes, sel.",
    "Œufs au plat|Poêle à feu moyen-doux, un peu de beurre, casser les œufs, couvrir 2 minutes : le blanc prend entièrement sans que le dessous brûle, le jaune reste coulant. Saler le blanc seulement (le sel tache le jaune).",
    "Servir|Purée en nid, épinards, œufs."
  ],
  tips: ["Le couvercle sur l'œuf au plat est l'astuce pour cuire le blanc autour du jaune sans le retourner.", "Le lait doit être chaud : froid, il refroidit la purée et la rend collante."]
},
{
  id: "e15", name: "Pommes de terre en robe des champs au micro-ondes, fromage blanc aux herbes et thon", category: "economique",
  diet: [T.SP, T.H, T.SG], equipments: ["micro-ondes"], prepTime: 10, cookTime: 12, difficulty: 1,
  costPerPerson: 2.0, calories: 470, protein: 32,
  skills: ["Cuire des pommes de terre entières au micro-ondes", "Sauce aux herbes fraîches"],
  ingredients: [i("Pomme de terre", 300), i("Fromage blanc", 80), i("Thon au naturel (boîte)", 70), i("Ciboulette", 5), i("Persil plat", 5), i("Échalote", 0.5, "pièce"), i("Citron", 0.25, "pièce"), i("Radis", 40)],
  instructions: [
    "Cuire|Laver les pommes de terre, les piquer plusieurs fois (sinon la vapeur les fait éclater), les envelopper dans du papier absorbant humide et cuire 10 à 12 minutes à 800 W en les retournant. Un couteau doit entrer sans résistance.",
    "Sauce|Fromage blanc, herbes ciselées, échalote très finement ciselée, citron, sel, poivre.",
    "Thon|Émietter le thon égoutté dans la moitié de la sauce.",
    "Servir|Fendre les pommes de terre en croix, presser les côtés pour les ouvrir, garnir de thon, puis du reste de sauce et de radis émincés."
  ],
  tips: ["Plat traditionnel de la cuisine paysanne française, prêt en 20 minutes.", "Le fromage blanc à 20 % de matière grasse est un bon compromis entre légèreté et onctuosité."]
},
{
  id: "e16", name: "Pommes de terre, poireaux et œufs vapeur, vinaigrette moutarde-câpres", category: "economique",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG], equipments: ["vapeur"], prepTime: 10, cookTime: 25, difficulty: 1,
  costPerPerson: 1.6, calories: 500, protein: 18,
  skills: ["Cuisson vapeur étagée", "Vinaigrette relevée"],
  ingredients: [i("Pomme de terre", 250), i("Poireau", 150), i("Œuf", 2, "pièce"), i("Moutarde", 1, "càc"), i("Câpres", 1, "càc"), i("Échalote", 0.5, "pièce"), i("Vinaigre de cidre", 1, "càs"), i("Persil plat", 5), i("Huile d'olive", 25, "ml")],
  instructions: [
    "Pommes de terre|En morceaux réguliers dans le panier, 15 minutes.",
    "Poireaux et œufs|Ajouter les poireaux en tronçons de 4 cm bien lavés et les œufs entiers, 10 minutes : œufs durs, poireaux fondants.",
    "Vinaigrette|Échalote ciselée macérée 5 minutes dans le vinaigre, moutarde, câpres hachées, sel, huile en fouettant.",
    "Servir|Tout tiède, œufs écalés coupés en deux, vinaigrette généreuse, persil."
  ],
  tips: ["Les poireaux vinaigrette sont un classique de bistrot : la vapeur les garde plus savoureux que l'eau.", "Assaisonnez les pommes de terre chaudes : elles absorbent la vinaigrette."]
},
{
  id: "e17", name: "Gratin de pâtes au thon, béchamel légère et chapelure", category: "economique",
  diet: [T.SP, T.H], equipments: ["base", "four"], prepTime: 15, cookTime: 30, difficulty: 2,
  costPerPerson: 2.2, calories: 700, protein: 38,
  skills: ["Béchamel", "Gratin sans dessèchement"],
  ingredients: [i("Penne", 90), i("Thon au naturel (boîte)", 80), i("Beurre", 15), i("Farine de blé", 12), i("Lait", 180, "ml"), i("Muscade", 0.25, "càc"), i("Emmental râpé", 25), i("Chapelure", 10), i("Tomates cerises", 60), i("Persil plat", 5)],
  instructions: [
    "Pâtes|Cuire les penne 3 minutes de moins que le paquet.",
    "Béchamel|Roux de beurre et farine 1 minute, lait froid en fouettant, 4 minutes de cuisson, muscade, sel, poivre, la moitié du fromage.",
    "Assembler|Pâtes, thon émietté, persil, béchamel : le mélange doit être très crémeux.",
    "Gratiner|Dans un plat, tomates cerises coupées dessus, reste du fromage et chapelure. 20 minutes à 200 °C."
  ],
  tips: ["Une béchamel généreuse évite le gratin sec : les pâtes en absorbent beaucoup au four.", "Les tomates cerises sur le dessus apportent de l'acidité et de la fraîcheur."]
},
{
  id: "e18", name: "Spaghetti alla puttanesca : tomates, olives, câpres et anchois", category: "economique",
  diet: [T.SP, T.H, T.SL], equipments: ["base"], prepTime: 5, cookTime: 20, difficulty: 1,
  costPerPerson: 1.9, calories: 640, protein: 20,
  skills: ["Fondre des anchois", "Sauce de placard"],
  ingredients: [i("Spaghetti", 100), i("Anchois à l'huile", 3, "pièce"), i("Ail", 2, "gousse"), i("Piment d'Espelette", 0.25, "càc"), i("Tomates concassées", 180), i("Olives noires", 25), i("Câpres", 1, "càs"), i("Persil plat", 5), i("Huile d'olive", 20, "ml")],
  instructions: [
    "Fondre|Chauffer l'huile à feu doux avec les anchois et l'ail émincé : en écrasant à la cuillère, les anchois fondent complètement en 2 minutes. Ils disparaissent et apportent un salé profond, pas un goût de poisson.",
    "Sauce|Piment, tomates, olives coupées et câpres. Mijoter 12 minutes.",
    "Pâtes|Les cuire dans une eau peu salée (la sauce l'est beaucoup) et les finir 1 minute dans la sauce.",
    "Servir|Persil généreux."
  ],
  tips: ["Tout vient du placard : c'est la recette des soirs où le réfrigérateur est vide.", "Ne salez pas la sauce avant d'avoir goûté : anchois, olives et câpres suffisent souvent."]
}
);

/* ---------- GASTRONOMIQUE (budget non contraignant, techniques de restaurant) ---------- */
RECIPES.push(
{
  id: "g01", name: "Magret de canard rôti, gastrique au miel et cidre, purée de céleri-rave et panais glacés", category: "gastronomique",
  diet: [T.SP, T.H], equipments: ["base", "four"], prepTime: 30, cookTime: 40, difficulty: 3,
  costPerPerson: 11.5, calories: 780, protein: 42,
  skills: ["Rendre la graisse d'un magret à froid", "Gastrique (sauce aigre-douce)", "Légumes glacés à brillant"],
  ingredients: [i("Magret de canard", 200), i("Céleri-rave", 200), i("Lait", 100, "ml"), i("Beurre", 30), i("Panais", 120), i("Miel", 2, "càc"), i("Vinaigre de cidre", 2, "càs"), i("Fond de volaille (déshydraté)", 1, "càc"), i("Échalote", 1, "pièce"), i("Thym", 0.5, "càc"), i("Sucre", 0.5, "càc"), i("Poivre noir", 0.5, "càc")],
  instructions: [
    "Quadriller la peau|Sortir le magret 30 minutes avant. Inciser la peau en croisillons serrés tous les 5 mm, sans toucher la chair : la graisse s'écoulera par ces entailles. Saler généreusement côté peau.",
    "Purée de céleri|Éplucher le céleri, le couper en cubes et le cuire dans le lait et autant d'eau salée 20 minutes. Égoutter (garder un peu de liquide), mixer longuement avec 15 g de beurre jusqu'à une texture de velours. Ajuster avec le liquide de cuisson.",
    "Panais glacés|Couper les panais en bâtonnets, les mettre en une couche dans une poêle, couvrir d'eau à mi-hauteur avec 10 g de beurre, le sucre et une pincée de sel. Cuire à feu vif jusqu'à évaporation complète, puis rouler les panais dans le beurre restant : ils deviennent brillants et légèrement caramélisés.",
    "Rendre la graisse|Poser le magret côté peau dans une poêle FROIDE, puis allumer à feu moyen. Cuire 10 à 12 minutes en vidant régulièrement la graisse fondue dans un bol. La peau doit devenir fine, dorée et croustillante.",
    "Finir au four|Retourner 1 minute côté chair, puis 5 à 7 minutes au four à 180 °C. Cœur rosé : 55 °C au thermomètre. Laisser reposer 8 minutes sur une grille, peau vers le haut, couvert lâchement : les jus se répartissent, la tranche ne saignera pas.",
    "Gastrique|Dans la poêle vidée de sa graisse (en garder une cuillère), faire suer l'échalote ciselée 1 minute. Ajouter le miel, laisser caraméliser 30 secondes, puis déglacer au vinaigre : ça fume, c'est normal. Ajouter le fond dissous dans 80 ml d'eau et le thym, réduire jusqu'à ce que la sauce nappe la cuillère. Monter avec le reste de beurre hors du feu, poivrer.",
    "Trancher et dresser|Trancher le magret en biais en tranches de 7 mm. Purée en virgule tirée à la cuillère, panais, tranches en éventail, sauce autour, jamais sur la peau pour qu'elle reste croustillante."
  ],
  tips: ["La graisse de canard récupérée fait les meilleures pommes de terre sautées du monde : gardez-la au réfrigérateur.", "Le repos est aussi important que la cuisson : coupé trop tôt, le magret perd son jus sur la planche.", "Une gastrique équilibre le gras du canard par le sucre et l'acide : goûtez et corrigez avec miel ou vinaigre."]
},
{
  id: "g02", name: "Filet de bœuf poêlé au beurre, sauce au poivre, gratin dauphinois", category: "gastronomique",
  diet: [T.SP, T.H], equipments: ["base", "four"], prepTime: 30, cookTime: 70, difficulty: 3,
  costPerPerson: 16.0, calories: 920, protein: 46,
  skills: ["Arroser au beurre (arroser à la cuillère)", "Sauce au poivre sur fond", "Gratin dauphinois cuit dans la crème"],
  ingredients: [i("Filet de bœuf", 180), i("Pomme de terre", 220), i("Crème liquide 30 %", 140, "ml"), i("Lait", 70, "ml"), i("Ail", 2, "gousse"), i("Muscade", 0.25, "càc"), i("Beurre", 35), i("Thym", 0.5, "càc"), i("Poivre noir", 1.5, "càc"), i("Échalote", 1, "pièce"), i("Fond de veau (déshydraté)", 1, "càc"), i("Huile neutre", 10, "ml"), i("Haricots verts", 100)],
  instructions: [
    "Gratin|Éplucher les pommes de terre sans les laver ensuite (l'amidon liera le gratin), les trancher à 3 mm à la mandoline. Les cuire 10 minutes à frémissement dans 100 ml de crème et le lait avec l'ail écrasé, la muscade et du sel. Verser dans un plat frotté d'ail et beurré, enfourner 50 minutes à 160 °C : la surface dore lentement, la crème réduit et devient nappante.",
    "Préparer le filet|Sortir la viande 45 minutes avant. La ficeler si elle est irrégulière pour garder une forme ronde. L'éponger et saler juste avant la cuisson.",
    "Concasser le poivre|Écraser les grains au fond d'une casserole ou au mortier : on veut des éclats, pas de la poudre, qui serait âcre.",
    "Saisir|Poêle épaisse très chaude, huile, filet 2 minutes par face sur toutes ses faces, bords compris : une croûte brune uniforme.",
    "Arroser au beurre|Baisser à feu moyen, ajouter 15 g de beurre, l'ail et le thym. Incliner la poêle et arroser le filet sans arrêt à la cuillère avec le beurre mousseux pendant 3 à 4 minutes. Cuisson saignante : 50 °C à cœur, à point : 56 °C.",
    "Repos|10 minutes sur une grille couvert d'aluminium : la température monte encore de 3 à 4 °C.",
    "Sauce au poivre|Jeter le gras, faire suer l'échalote ciselée 1 minute, ajouter le poivre concassé 30 secondes, déglacer avec le fond dissous dans 80 ml d'eau, réduire de moitié, ajouter le reste de crème et réduire jusqu'à ce qu'elle nappe. Hors du feu, monter avec 10 g de beurre et ajouter le jus de repos de la viande.",
    "Haricots|Les cuire 5 minutes à l'eau très salée, rafraîchir à l'eau glacée, réchauffer au beurre restant.",
    "Dresser|Trancher le filet en deux médaillons épais, fleur de sel sur la tranche, sauce à côté."
  ],
  tips: ["Un thermomètre de cuisine à 15 € est l'investissement qui change tout pour les viandes nobles.", "Le cognac flambé est classique dans la sauce au poivre : cette version sans alcool reste fidèle et convient à tous.", "Le gratin dauphinois authentique ne contient pas de fromage : la crème réduite suffit."]
},
{
  id: "g03", name: "Noix de Saint-Jacques snackées, purée de chou-fleur à la vanille et beurre noisette", category: "gastronomique",
  diet: [T.SP, T.SG], equipments: ["base", "mixeur"], prepTime: 25, cookTime: 25, difficulty: 3,
  costPerPerson: 18.0, calories: 560, protein: 30,
  skills: ["Snacker des Saint-Jacques", "Beurre noisette", "Purée de légume lisse comme une crème"],
  ingredients: [i("Noix de Saint-Jacques", 150), i("Chou-fleur", 250), i("Lait", 100, "ml"), i("Gousse de vanille", 0.25, "pièce"), i("Beurre", 40), i("Noisettes", 15), i("Citron", 0.25, "pièce"), i("Huile neutre", 10, "ml"), i("Roquette", 15), i("Ciboulette", 3)],
  instructions: [
    "Purée de chou-fleur|Couper le chou-fleur en petits bouquets, les cuire 15 minutes dans le lait et autant d'eau salée avec la gousse de vanille fendue et grattée. Égoutter en gardant le liquide, retirer la gousse, mixer 3 minutes avec 10 g de beurre en ajoutant du liquide jusqu'à une texture lisse et brillante. Passer au tamis pour un résultat parfait.",
    "Préparer les noix|Retirer le petit muscle blanc sur le côté (il durcit à la cuisson). Les éponger soigneusement sur du papier absorbant et les laisser 10 minutes au réfrigérateur à découvert : une surface sèche est indispensable pour colorer.",
    "Noisettes|Les torréfier 5 minutes à sec, les frotter dans un torchon pour retirer les peaux, les concasser.",
    "Beurre noisette|Faire fondre 25 g de beurre à feu moyen dans une petite casserole claire. Il mousse, puis les particules au fond brunissent et ça sent la noisette (3 à 4 minutes). Couper le feu immédiatement, ajouter quelques gouttes de citron : ça stoppe la cuisson.",
    "Snacker|Poêle en acier ou fonte très chaude, filet d'huile qui fume à peine. Saler les noix, les poser dans le sens des aiguilles d'une montre pour savoir laquelle retourner en premier. 90 secondes sans toucher : une croûte dorée profonde. Retourner, ajouter le reste de beurre, 45 secondes en arrosant.",
    "Vérifier|Le cœur doit rester translucide et tiède : une Saint-Jacques trop cuite devient caoutchouteuse et rend de l'eau.",
    "Dresser|Purée en larme au fond d'une assiette chaude, noix posées dessus, beurre noisette en filet, noisettes, quelques feuilles de roquette et ciboulette."
  ],
  tips: ["Des noix qui baignent dans leur eau à la cuisson n'ont pas été assez séchées, ou la poêle n'était pas assez chaude.", "Le beurre noisette passe en quelques secondes au beurre noir et amer : une casserole claire permet de surveiller la couleur."]
},
{
  id: "g04", name: "Risotto aux cèpes et champignons de saison, bouillon de cèpes maison et parmesan", category: "gastronomique",
  diet: [T.SP, T.SG, T.VG], equipments: ["base"], prepTime: 25, cookTime: 35, difficulty: 3,
  costPerPerson: 9.0, calories: 680, protein: 20,
  skills: ["Bouillon d'infusion de cèpes", "Risotto mouillé au vin blanc", "Mantecatura au beurre froid"],
  ingredients: [i("Riz carnaroli", 85), i("Cèpes séchés", 10), i("Girolles", 100), i("Champignons de Paris", 60), i("Échalote", 1, "pièce"), i("Ail", 1, "gousse"), i("Vin blanc", 50, "ml"), i("Beurre", 30), i("Parmesan", 30), i("Thym", 0.5, "càc"), i("Persil plat", 5), i("Huile d'olive", 10, "ml")],
  instructions: [
    "Bouillon de cèpes|Réhydrater les cèpes 20 minutes dans 400 ml d'eau chaude par personne. Les sortir, les hacher. Filtrer l'eau à travers un filtre à café (le sable reste au fond) et la garder frémissante avec les pieds des champignons de Paris et le thym. C'est un bouillon plus parfumé que n'importe quel cube.",
    "Champignons|Nettoyer les girolles au pinceau (jamais sous l'eau, elles se gorgent). Les saisir à feu vif dans l'huile, sans sel, 3 minutes, puis ajouter 5 g de beurre, l'ail haché et le sel. Réserver.",
    "Base|Faire suer l'échalote très finement ciselée dans 5 g de beurre 3 minutes, sans couleur. Ajouter le riz et les cèpes hachés, nacrer 2 minutes : les grains crépitent et deviennent translucides sur les bords.",
    "Vin blanc|Verser le vin et remuer jusqu'à complète évaporation : l'acidité donne de la tension au risotto. Plus d'odeur d'alcool : c'est prêt.",
    "Mouiller|Louche par louche de bouillon filtré, en remuant souvent et en attendant l'absorption. 16 à 18 minutes selon le riz : le grain doit rester al dente au cœur.",
    "Mantecatura|Hors du feu, ajouter le reste de beurre bien froid en dés et le parmesan, et remuer énergiquement 1 minute en secouant la casserole. Le risotto devient brillant et coule en vague lente quand on incline l'assiette (all'onda).",
    "Dresser|Assiette creuse chaude, taper le fond de l'assiette pour étaler le risotto, girolles dessus, persil, un trait de parmesan râpé."
  ],
  tips: ["Le carnaroli, « roi des riz à risotto », tient mieux la cuisson que l'arborio et pardonne plus.", "Un risotto qui se tient en dôme est trop cuit ou pas assez mouillé : il doit s'étaler seul."]
},
{
  id: "g05", name: "Filet de bar, beurre blanc, fondue de poireaux et pommes de terre vapeur", category: "gastronomique",
  diet: [T.SP, T.SG], equipments: ["base"], prepTime: 25, cookTime: 30, difficulty: 3,
  costPerPerson: 13.0, calories: 700, protein: 34,
  skills: ["Beurre blanc (émulsion à chaud)", "Fondue de poireaux", "Poisson côté peau croustillante"],
  ingredients: [i("Filet de bar", 170), i("Poireau", 180), i("Pomme de terre grenaille", 180), i("Beurre", 60), i("Échalote", 1, "pièce"), i("Vin blanc", 50, "ml"), i("Vinaigre de vin blanc", 1, "càs"), i("Crème liquide 30 %", 10, "ml"), i("Ciboulette", 5), i("Huile neutre", 10, "ml")],
  instructions: [
    "Pommes de terre|Les cuire à la vapeur ou à l'eau salée 20 minutes. Les garder au chaud.",
    "Fondue de poireaux|Émincer finement le blanc des poireaux, bien laver. Les cuire très doucement à couvert avec 10 g de beurre, une pincée de sel et 2 cuillères d'eau 15 minutes : ils fondent sans aucune coloration.",
    "Réduction|Dans une petite casserole, échalote très finement ciselée, vin blanc et vinaigre. Réduire à feu moyen jusqu'à ce qu'il ne reste que 1 cuillère à soupe de liquide (presque à sec).",
    "Monter le beurre blanc|Ajouter la crème (elle stabilise l'émulsion), puis à feu très doux, incorporer 40 g de beurre très froid en dés, 2 ou 3 à la fois, en fouettant sans arrêt. Chaque ajout doit fondre avant le suivant. La sauce doit rester tiède, jamais bouillir : au-delà de 60 °C, elle tranche. Saler, garder au chaud au bain-marie tiède.",
    "Bar|Entailler légèrement la peau, l'éponger, saler. Poêle chaude, huile, filet côté peau en appuyant avec une spatule 20 secondes. Cuire 4 minutes jusqu'à ce que la chair blanchisse presque jusqu'en haut. Ajouter le reste du beurre, retourner 30 secondes.",
    "Dresser|Fondue de poireaux en lit, bar peau croustillante dessus, pommes de terre coupées en deux, beurre blanc autour, ciboulette ciselée finement."
  ],
  tips: ["Un beurre blanc qui tranche se rattrape : une cuillère d'eau froide dans une casserole propre, et y réincorporer la sauce tranchée en fouettant.", "Le beurre blanc est né sur les bords de Loire : la sauce reine des poissons de rivière et de mer."]
},
{
  id: "g06", name: "Suprême de volaille rôti, jus corsé, mousseline de carottes au cumin et asperges", category: "gastronomique",
  diet: [T.SP, T.H], equipments: ["base", "four", "mixeur"], prepTime: 30, cookTime: 40, difficulty: 3,
  costPerPerson: 9.5, calories: 680, protein: 48,
  skills: ["Rôtir un suprême sur peau", "Jus réduit à partir des sucs", "Mousseline de légume"],
  ingredients: [i("Suprême de volaille fermière", 220), i("Carotte", 220), i("Cumin moulu", 0.5, "càc"), i("Orange", 0.5, "pièce"), i("Beurre", 40), i("Asperges vertes", 120), i("Échalote", 1, "pièce"), i("Ail", 2, "gousse"), i("Thym", 0.5, "càc"), i("Fond de volaille (déshydraté)", 1.5, "càc"), i("Huile neutre", 10, "ml")],
  instructions: [
    "Mousseline|Couper les carottes en rondelles, les cuire à couvert avec 10 g de beurre, le jus de l'orange, le cumin, sel et un fond d'eau 20 minutes jusqu'à ce qu'elles soient très tendres. Mixer longuement avec 10 g de beurre : la texture doit être aussi lisse qu'une crème.",
    "Asperges|Casser l'extrémité dure (elle se rompt naturellement où commence la partie tendre), éplucher le bas des tiges. Les cuire 3 à 4 minutes à l'eau bouillante très salée, rafraîchir dans l'eau glacée.",
    "Saisir côté peau|Sécher le suprême, saler. Poêle allant au four à feu moyen, huile, côté peau 6 minutes sans toucher jusqu'à une peau dorée et tendue.",
    "Rôtir et arroser|Retourner, ajouter ail en chemise, thym et 10 g de beurre, arroser 1 minute, puis 10 à 12 minutes au four à 180 °C. 68 °C à cœur pour une chair juteuse. Repos 8 minutes.",
    "Jus corsé|Dans la poêle, faire suer l'échalote dans les sucs 1 minute, déglacer avec le fond dissous dans 120 ml d'eau en grattant, réduire de moitié jusqu'à un jus sirupeux qui nappe la cuillère. Passer au tamis, ajouter le jus de repos et monter avec 5 g de beurre froid.",
    "Finir les asperges|Les rouler 1 minute dans le reste de beurre mousseux.",
    "Dresser|Mousseline en trait à la cuillère, suprême tranché en deux en biais, asperges, jus en points et en cordon autour."
  ],
  tips: ["Le suprême (blanc avec l'aileron et la peau) reste plus moelleux qu'un blanc nu grâce à la peau qui le protège.", "Un jus de restaurant, c'est des sucs, un liquide et beaucoup de réduction : la patience fait la texture."]
},
{
  id: "g07", name: "Carré d'agneau en croûte d'herbes, jus à l'ail confit et tian provençal", category: "gastronomique",
  diet: [T.SP, T.H], equipments: ["base", "four"], prepTime: 35, cookTime: 60, difficulty: 3,
  costPerPerson: 18.0, calories: 820, protein: 44,
  skills: ["Croûte d'herbes", "Cuisson rosée d'un carré", "Tian (légumes en rosace)"],
  ingredients: [i("Carré d'agneau", 280), i("Panko", 20), i("Persil plat", 15), i("Romarin", 0.5, "càc"), i("Moutarde", 1, "càc"), i("Beurre", 20), i("Ail", 4, "gousse"), i("Courgette", 100), i("Aubergine", 100), i("Tomate", 120), i("Oignon", 0.5, "pièce"), i("Thym", 1, "càc"), i("Fond de veau (déshydraté)", 1, "càc"), i("Huile d'olive", 30, "ml")],
  instructions: [
    "Ail confit|Mettre les gousses en chemise dans une petite casserole, couvrir d'huile d'olive et cuire à feu très doux 25 minutes : l'ail devient fondant et sucré.",
    "Tian|Préchauffer le four à 180 °C. Faire fondre l'oignon émincé et l'étaler au fond d'un petit plat. Trancher courgette, aubergine et tomate en rondelles de même diamètre et 3 mm d'épaisseur, les alterner debout en rosace serrée. Huile, sel, thym. Couvrir d'aluminium 30 minutes, puis découvrir 20 minutes.",
    "Croûte|Mixer persil, panko, romarin, une gousse d'ail confit et le beurre mou jusqu'à une pâte verte. L'étaler entre deux feuilles de papier cuisson sur 3 mm et la mettre au congélateur 10 minutes.",
    "Saisir le carré|Saler, saisir côté gras dans une poêle chaude 4 minutes pour rendre le gras, puis 1 minute sur les autres faces. Laisser tiédir 5 minutes.",
    "Croûter|Badigeonner le dessus de moutarde, découper la plaque d'herbes durcie à la taille et la poser : elle épouse la viande proprement.",
    "Rôtir|Monter le four à 200 °C, 10 à 14 minutes : 55 °C à cœur pour un agneau rosé. Repos 10 minutes.",
    "Jus|Déglacer la poêle avec le fond dissous dans 100 ml d'eau, ajouter les gousses d'ail confit écrasées, réduire jusqu'à ce qu'il nappe.",
    "Dresser|Couper le carré entre les os en côtes doubles, poser sur une part de tian, jus à côté."
  ],
  tips: ["La plaque d'herbes congelée est une technique de restaurant : la croûte est nette, régulière et ne glisse pas.", "L'huile de l'ail confit est un trésor : gardez-la pour vos vinaigrettes et vos poêlées."]
},
{
  id: "g08", name: "Joues de bœuf braisées au vin rouge, purée ultra-beurrée et carottes glacées", category: "gastronomique",
  diet: [T.SP], equipments: ["base", "four"], prepTime: 35, cookTime: 210, difficulty: 3,
  costPerPerson: 10.0, calories: 950, protein: 48,
  skills: ["Braiser une viande à collagène", "Réduire un vin et une sauce de braisage", "Purée façon grand restaurant"],
  ingredients: [i("Joue de bœuf", 250), i("Vin rouge", 200, "ml"), i("Carotte", 150), i("Oignon", 0.5, "pièce"), i("Ail", 2, "gousse"), i("Concentré de tomate", 1, "càs"), i("Farine de blé", 5), i("Fond de veau (déshydraté)", 1, "càc"), i("Thym", 0.5, "càc"), i("Laurier", 1, "feuille"), i("Pomme de terre", 220), i("Beurre", 55), i("Lait", 60, "ml"), i("Sucre", 0.5, "càc"), i("Huile neutre", 15, "ml"), i("Persil plat", 5)],
  instructions: [
    "Parer et saisir|Retirer la membrane argentée et l'excès de gras des joues, les couper en deux morceaux, saler. Les saisir sur toutes les faces dans une cocotte très chaude avec l'huile, jusqu'à une croûte brun foncé. Réserver.",
    "Garniture aromatique|Dans la même cocotte, oignon et une carotte en gros morceaux 5 minutes, ail, concentré 1 minute, puis saupoudrer de farine et remuer 1 minute.",
    "Réduire le vin|Verser le vin, gratter le fond, porter à ébullition 5 minutes pour évaporer l'alcool et concentrer le goût.",
    "Braiser|Remettre les joues, le fond dissous dans 200 ml d'eau, thym et laurier. Le liquide doit arriver aux trois quarts de la viande. Couvrir et enfourner 3 heures à 150 °C. La joue est prête quand une fourchette s'y enfonce sans aucune résistance : le collagène s'est transformé en gélatine fondante.",
    "Sauce|Sortir les joues délicatement, passer la sauce au tamis, la réduire à feu vif jusqu'à ce qu'elle soit brillante et nappante. Remettre les joues et les arroser.",
    "Purée|Cuire les pommes de terre entières avec la peau départ eau froide salée, les éplucher chaudes, les passer au presse-purée ou au tamis. Sur feu doux, incorporer 40 g de beurre froid en dés au fouet, puis le lait chaud. Elle doit être lisse, brillante et presque coulante.",
    "Carottes glacées|Carottes en tronçons biseautés, à demi couvertes d'eau, 10 g de beurre, sucre, sel : cuire à découvert jusqu'à évaporation et les rouler dans le glaçage.",
    "Dresser|Purée, joue nappée de sauce, carottes, persil."
  ],
  tips: ["Les morceaux riches en collagène (joue, paleron, jarret) doivent cuire longtemps à basse température : c'est l'inverse d'un filet.", "Le braisé est meilleur le lendemain : refroidi, la graisse fige en surface et s'enlève facilement."]
},
{
  id: "g09", name: "Œuf mollet pané, crème de petits pois à la menthe et asperges rôties", category: "gastronomique",
  diet: [T.SP, T.H, T.VG], equipments: ["base", "mixeur"], prepTime: 35, cookTime: 20, difficulty: 3,
  costPerPerson: 8.0, calories: 560, protein: 24,
  skills: ["Œuf mollet précis", "Paner un œuf mollet sans le casser", "Crème de légume vert éclatant"],
  ingredients: [i("Œuf", 2.5, "pièce"), i("Farine de blé", 15), i("Panko", 30), i("Petits pois surgelés", 150), i("Menthe fraîche", 5), i("Crème liquide 30 %", 30, "ml"), i("Beurre", 10), i("Échalote", 0.5, "pièce"), i("Asperges vertes", 120), i("Parmesan", 15), i("Citron", 0.25, "pièce"), i("Huile neutre", 100, "ml")],
  instructions: [
    "Œufs mollets|Plonger 2 œufs à température ambiante dans l'eau bouillante exactement 5 minutes 45, puis 10 minutes dans l'eau glacée. Les écaler sous un filet d'eau avec délicatesse : le jaune est liquide.",
    "Paner|Rouler chaque œuf dans la farine, puis dans le demi-œuf restant battu, puis dans le panko. Recommencer œuf battu et panko : une double panure solide. Réserver au frais.",
    "Crème de petits pois|Faire suer l'échalote dans le beurre, ajouter les petits pois et 100 ml d'eau salée, 4 minutes. Mixer immédiatement avec la crème et la menthe, passer au tamis. Couleur vert vif : ne pas la cuire plus longtemps, sinon elle vire au kaki.",
    "Asperges|Les rôtir dans une poêle chaude avec un filet d'huile 5 à 6 minutes en les roulant, sel, zeste de citron.",
    "Frire|Chauffer l'huile dans une petite casserole à 180 °C (un cube de pain dore en 30 secondes). Frire les œufs 60 à 90 secondes jusqu'à ce qu'ils soient dorés, égoutter.",
    "Dresser|Crème de petits pois au fond, asperges, œuf pané, copeaux de parmesan. On ouvre l'œuf à table : le jaune coule dans la crème."
  ],
  tips: ["5 minutes 45 donne un blanc juste ferme qui résiste à la panure et un jaune entièrement liquide : chronométrez.", "La crème verte se fait au dernier moment : elle perd sa couleur en restant au chaud."]
},
{
  id: "g10", name: "Tartare de bœuf au couteau, condiments, frites maison double cuisson", category: "gastronomique",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["base"], prepTime: 35, cookTime: 25, difficulty: 3,
  costPerPerson: 12.0, calories: 880, protein: 40,
  skills: ["Tailler un tartare au couteau", "Frites double cuisson", "Assaisonner une viande crue"],
  ingredients: [i("Filet de bœuf", 170), i("Jaune d'œuf", 1, "pièce"), i("Échalote", 0.5, "pièce"), i("Câpres", 1, "càc"), i("Cornichons", 15), i("Persil plat", 5), i("Moutarde", 1, "càc"), i("Huile d'olive", 10, "ml"), i("Piment d'Espelette", 0.25, "càc"), i("Pomme de terre", 280), i("Huile neutre", 300, "ml"), i("Salade verte", 40)],
  instructions: [
    "Sécurité|Pour une viande crue, achetez-la le jour même chez un boucher en précisant l'usage, gardez-la au réfrigérateur jusqu'à la dernière minute et travaillez avec des ustensiles très propres.",
    "Frites, première cuisson|Bâtonnets de 1 cm, rincés et parfaitement séchés. Huile à 150 °C, 6 à 7 minutes : elles cuisent à cœur sans colorer. Égoutter et laisser refroidir au moins 15 minutes.",
    "Tailler au couteau|Viande très froide (15 minutes au congélateur). La trancher en fines lamelles, puis en bâtonnets, puis en petits dés de 3 à 4 mm. La texture est incomparable avec une viande hachée à la machine, qui écrase les fibres.",
    "Condiments|Hacher très finement échalote, câpres, cornichons et persil.",
    "Assaisonner|Dans un bol posé sur de la glace, mélanger la viande avec la moutarde, l'huile, les condiments, le piment, sel et poivre. Goûter et ajuster : un tartare doit être bien relevé.",
    "Frites, seconde cuisson|Huile à 180 °C, 2 à 3 minutes : elles gonflent et dorent. Égoutter, saler aussitôt.",
    "Dresser|Mouler le tartare dans un cercle, creuser légèrement le dessus et y poser le jaune d'œuf. Frites et salade à côté."
  ],
  tips: ["La double cuisson des frites : la première cuit l'intérieur, la seconde crée la croûte croustillante. C'est la méthode belge.", "Les femmes enceintes et les personnes fragiles doivent éviter la viande et l'œuf crus."]
},
{
  id: "g11", name: "Ravioles maison ricotta-épinards, beurre de sauge et noisettes", category: "gastronomique",
  diet: [T.SP, T.H, T.VG], equipments: ["base"], prepTime: 70, cookTime: 10, difficulty: 3,
  costPerPerson: 8.0, calories: 760, protein: 28,
  skills: ["Pâte fraîche aux œufs", "Abaisser et façonner des ravioles", "Beurre de sauge"],
  ingredients: [i("Farine T00", 100), i("Œuf", 1, "pièce"), i("Ricotta", 80), i("Épinards frais", 100), i("Parmesan", 30), i("Muscade", 0.25, "càc"), i("Citron", 0.25, "pièce"), i("Beurre", 30), i("Sauge", 3), i("Noisettes", 10)],
  instructions: [
    "Pâte|Farine en fontaine, œuf au centre, une pincée de sel. Mélanger à la fourchette en ramenant la farine, puis pétrir 8 à 10 minutes : la pâte devient lisse, élastique et satinée. Envelopper et laisser reposer 30 minutes : le gluten se détend et la pâte s'étale sans se rétracter.",
    "Farce|Faire tomber les épinards à la poêle 2 minutes, les presser très fortement pour retirer toute l'eau, hacher. Mélanger avec ricotta, 20 g de parmesan, muscade, zeste de citron, sel. Une farce humide ferait éclater les ravioles.",
    "Abaisser|Au laminoir ou au rouleau, étaler la pâte très finement : on doit presque voir sa main au travers. Fariner peu, garder les bandes couvertes d'un torchon pour qu'elles ne sèchent pas.",
    "Façonner|Déposer des noisettes de farce tous les 5 cm sur une bande, humidifier la pâte autour au pinceau, couvrir d'une seconde bande. Chasser l'air autour de chaque farce avec les doigts (l'air fait éclater à la cuisson), puis découper à l'emporte-pièce ou au couteau.",
    "Beurre de sauge|Faire mousser le beurre avec les feuilles de sauge jusqu'à ce qu'elles soient croustillantes et le beurre noisette. Ajouter les noisettes concassées.",
    "Cuire|Eau frémissante salée, 2 à 3 minutes. Les sortir à l'écumoire directement dans le beurre de sauge avec une cuillère d'eau de cuisson, napper doucement.",
    "Dresser|Ravioles, beurre, sauge croustillante, reste du parmesan."
  ],
  tips: ["Sans laminoir, un rouleau et de la patience suffisent : travaillez de petits pâtons.", "Les ravioles crues se congèlent à plat sur un plateau fariné, puis en sachet : cuisson directe, 1 minute de plus."]
},
{
  id: "g12", name: "Blanquette de veau à l'ancienne, riz pilaf et champignons glacés", category: "gastronomique",
  diet: [T.SP, T.H], equipments: ["base"], prepTime: 30, cookTime: 120, difficulty: 3,
  costPerPerson: 12.0, calories: 860, protein: 46,
  skills: ["Blanchir une viande", "Velouté lié à la crème et au jaune", "Garniture à l'ancienne"],
  ingredients: [i("Épaule de veau", 220), i("Carotte", 80), i("Oignon", 0.5, "pièce"), i("Clou de girofle", 1, "pièce"), i("Poireau", 50), i("Thym", 0.5, "càc"), i("Laurier", 1, "feuille"), i("Champignons de Paris", 100), i("Petits oignons grelots", 60), i("Beurre", 30), i("Farine de blé", 15), i("Crème liquide 30 %", 50, "ml"), i("Jaune d'œuf", 0.5, "pièce"), i("Citron", 0.25, "pièce"), i("Riz basmati", 60)],
  instructions: [
    "Blanchir|Couper le veau en cubes de 4 cm, couvrir d'eau froide, porter à ébullition, écumer, égoutter et rincer la viande. Ce blanchiment retire les impuretés : la sauce sera blanche et limpide, c'est l'essence d'une blanquette.",
    "Cuire la viande|Recouvrir d'eau froide avec carotte en tronçons, oignon piqué du clou de girofle, poireau, thym et laurier. Frémir très doucement 1 h 30, à découvert, en écumant : la viande doit être fondante.",
    "Garniture|Cuire champignons en quartiers et petits oignons dans 10 g de beurre, un fond d'eau, sel et un trait de citron, à couvert, jusqu'à ce qu'ils soient tendres et glacés.",
    "Riz pilaf|Nacrer le riz dans 5 g de beurre, mouiller avec 1,5 fois son volume de bouillon de cuisson du veau, couvrir 12 minutes.",
    "Velouté|Filtrer le bouillon. Roux blanc avec 15 g de beurre et la farine 2 minutes sans coloration, puis 300 ml de bouillon par personne en fouettant. Cuire 15 minutes en écumant : il devient lisse et nappant.",
    "Liaison|Mélanger crème et jaune d'œuf, y verser une louche de velouté chaud en fouettant (pour tempérer), puis reverser dans la sauce hors du feu. Ne plus faire bouillir. Citron, sel, poivre blanc.",
    "Assembler|Viande et garniture dans la sauce, réchauffer à feu très doux. Servir avec le riz pilaf."
  ],
  tips: ["Une blanquette ne doit jamais voir de couleur : ni viande saisie, ni roux coloré.", "La liaison crème-jaune bout ? Elle graine. D'où le geste de tempérer et de couper le feu."]
},
{
  id: "g13", name: "Linguine aux gambas et bisque express des têtes", category: "gastronomique",
  diet: [T.SP, T.SL], equipments: ["base"], prepTime: 30, cookTime: 35, difficulty: 3,
  costPerPerson: 14.0, calories: 760, protein: 36,
  skills: ["Bisque à partir des carapaces", "Décortiquer des gambas", "Lier des pâtes au jus de crustacés"],
  ingredients: [i("Gambas crues entières", 250), i("Linguine", 95), i("Échalote", 1, "pièce"), i("Ail", 2, "gousse"), i("Concentré de tomate", 1, "càs"), i("Tomates cerises", 100), i("Vin blanc", 50, "ml"), i("Piment d'Espelette", 0.25, "càc"), i("Persil plat", 10), i("Citron", 0.25, "pièce"), i("Huile d'olive", 35, "ml")],
  instructions: [
    "Décortiquer|Retirer têtes et carapaces des gambas en gardant tout. Inciser le dos et retirer le boyau noir.",
    "Torréfier les carapaces|Dans une casserole, faire rôtir têtes et carapaces dans 2 cuillères d'huile à feu vif 4 minutes en les écrasant au pilon ou au fond d'une louche : elles rougissent et libèrent leur corail. C'est là qu'est tout le goût.",
    "Bisque|Ajouter l'échalote, une gousse d'ail, le concentré 1 minute, déglacer au vin blanc, réduire. Couvrir d'eau à hauteur et frémir 20 minutes. Filtrer en pressant fort les carapaces, puis réduire jusqu'à environ 120 ml par personne : un jus intense et orangé.",
    "Pâtes|Cuire les linguine 2 minutes de moins que le paquet.",
    "Gambas|Poêle très chaude, huile, gambas 1 minute par face. Réserver.",
    "Assembler|Même poêle, reste de l'ail et piment, tomates coupées 2 minutes, bisque, puis linguine : finir la cuisson 2 minutes dans la bisque en remuant, elles absorbent le jus et deviennent orange et brillantes.",
    "Dresser|Gambas, persil, zeste de citron, un filet d'huile crue. Enrouler les pâtes en nid à la pince."
  ],
  tips: ["Les têtes contiennent le meilleur des crustacés : ne les jetez jamais, même les crevettes décortiquées au quotidien.", "La bisque se congèle en bac à glaçons pour relever un risotto ou une sauce."]
},
{
  id: "g14", name: "Tarte fine aux champignons, comté et œuf coulant, salade d'herbes", category: "gastronomique",
  diet: [T.SP, T.H, T.VG], equipments: ["base", "four"], prepTime: 25, cookTime: 30, difficulty: 2,
  costPerPerson: 8.0, calories: 720, protein: 26,
  skills: ["Pâte feuilletée cuite sous presse", "Duxelles", "Salade d'herbes"],
  ingredients: [i("Pâte feuilletée", 0.4, "pièce"), i("Champignons de Paris", 120), i("Girolles", 60), i("Échalote", 1, "pièce"), i("Crème fraîche épaisse", 20), i("Comté", 35), i("Œuf", 1, "pièce"), i("Thym", 0.5, "càc"), i("Beurre", 15), i("Persil plat", 5), i("Cerfeuil", 5), i("Ciboulette", 3), i("Citron", 0.25, "pièce"), i("Huile d'olive", 10, "ml")],
  instructions: [
    "Cuire sous presse|Découper la pâte en rectangle, la piquer, la poser sur une plaque avec papier cuisson, couvrir d'une feuille et d'une seconde plaque. Cuire 15 minutes à 200 °C : elle dore et croustille sans gonfler.",
    "Duxelles|Hacher très finement les champignons de Paris et l'échalote. Les cuire dans la moitié du beurre à feu moyen 10 minutes jusqu'à ce que toute l'eau soit évaporée et que la duxelles soit sèche. Ajouter la crème et le thym, saler.",
    "Girolles|Les saisir dans le reste de beurre à feu vif 3 minutes.",
    "Garnir|Étaler la duxelles sur la pâte en laissant un bord, comté râpé, girolles. Creuser un nid au centre et y casser l'œuf. Enfourner 8 à 10 minutes à 200 °C : le blanc doit être pris, le jaune coulant.",
    "Salade d'herbes|Effeuiller persil, cerfeuil et ciboulette en tronçons, assaisonner de citron, huile et fleur de sel au dernier moment.",
    "Servir|Tarte tiède, salade d'herbes dessus, poivre."
  ],
  tips: ["La duxelles est une préparation classique de la cuisine française : elle sert aussi à farcir volailles et filets.", "Une salade d'herbes uniquement est un vrai condiment : fraîche, elle équilibre le gras de la tarte."]
},
{
  id: "g15", name: "Thon mi-cuit en croûte de sésame, wok de légumes croquants et sauce gingembre", category: "gastronomique",
  diet: [T.SP, T.H, T.SL, T.SG], equipments: ["base"], prepTime: 25, cookTime: 12, difficulty: 3,
  costPerPerson: 15.0, calories: 620, protein: 46,
  skills: ["Mi-cuit (saisie extrême, cœur cru)", "Croûte de sésame", "Wok de légumes"],
  ingredients: [i("Pavé de thon", 170), i("Graines de sésame", 25), i("Tamari (sauce soja sans gluten)", 25, "ml"), i("Gingembre frais", 15), i("Citron vert", 1, "pièce"), i("Miel", 1, "càc"), i("Huile de sésame", 5, "ml"), i("Pois gourmands", 80), i("Carotte", 60), i("Poivron rouge", 0.5, "pièce"), i("Oignon vert", 1, "pièce"), i("Riz jasmin", 60), i("Huile neutre", 20, "ml")],
  instructions: [
    "Thon|Choisir un thon qualité sashimi, en pavé rectangulaire épais. Le badigeonner d'une cuillère de tamari et le rouler dans les graines de sésame en pressant sur toutes les faces.",
    "Sauce|Tamari restant, gingembre râpé, jus de citron vert, miel, huile de sésame.",
    "Riz|Cuire le riz jasmin rincé (1,3 fois son volume d'eau, 12 minutes, repos 5 minutes).",
    "Wok|Wok fumant, huile, carotte en julienne 1 minute, poivron en lanières et pois gourmands 2 minutes : croquants et brillants. Oignon vert, une cuillère de sauce.",
    "Mi-cuit|Poêle très chaude avec un filet d'huile, 30 à 45 secondes par face, bords compris : le sésame dore, la cuisson ne pénètre que sur 2 mm. Le cœur reste rouge et cru.",
    "Trancher|Couteau très affûté, tranches de 1 cm en un seul mouvement de va-et-vient, sans écraser.",
    "Dresser|Riz, légumes, tranches de thon en éventail montrant le cœur rouge, sauce en filet."
  ],
  tips: ["Le mi-cuit exige un poisson très frais vendu « qualité sashimi » : ne faites jamais ce plat avec un thon décongelé banal.", "Le contraste croûte croustillante et cœur fondant est le but : la poêle ne sera jamais trop chaude."]
},
{
  id: "g16", name: "Bouillabaisse simplifiée aux poissons de roche, rouille maison et croûtons", category: "gastronomique",
  diet: [T.SP], equipments: ["base"], prepTime: 40, cookTime: 50, difficulty: 3,
  costPerPerson: 14.0, calories: 760, protein: 44,
  skills: ["Soupe de poisson montée à l'huile", "Rouille (mayonnaise à l'ail et au safran)", "Pocher des poissons par fermeté"],
  ingredients: [i("Filet de rouget", 80), i("Filet de lotte", 100), i("Crevettes décortiquées", 60), i("Fenouil", 100), i("Oignon", 0.5, "pièce"), i("Poireau", 60), i("Tomate", 150), i("Ail", 3, "gousse"), i("Safran", 1, "pincée"), i("Zeste d'orange", 1, "pièce"), i("Concentré de tomate", 1, "càs"), i("Pomme de terre", 120), i("Jaune d'œuf", 0.5, "pièce"), i("Piment d'Espelette", 0.25, "càc"), i("Pain de campagne", 2, "tranche"), i("Huile d'olive", 70, "ml")],
  instructions: [
    "Base|Faire suer oignon, poireau, fenouil émincés et deux gousses d'ail dans 2 cuillères d'huile 10 minutes. Ajouter le concentré, les tomates concassées, le zeste d'orange et la moitié du safran.",
    "Bouillir vivement|Mouiller de 400 ml d'eau par personne et faire bouillir à gros bouillons 20 minutes. « Bouille-abaisse » : l'ébullition forte émulsionne l'huile dans le bouillon et lui donne son corps.",
    "Pommes de terre|Ajouter les pommes de terre en rondelles épaisses, 15 minutes.",
    "Rouille|Écraser la dernière gousse d'ail, ajouter le jaune, le reste du safran infusé dans une cuillère de bouillon chaud, le piment, sel. Monter au fouet avec l'huile versée en mince filet comme une mayonnaise, en ajoutant une cuillère de pomme de terre cuite écrasée pour la tenue.",
    "Pocher les poissons|Baisser à frémissement. Ajouter la lotte (ferme) 5 minutes, puis les rougets et les crevettes 2 minutes. Les poissons doivent rester entiers.",
    "Croûtons|Griller le pain, le frotter d'ail.",
    "Servir en deux temps|D'abord le bouillon brûlant sur les croûtons tartinés de rouille, puis les poissons et pommes de terre, comme à Marseille."
  ],
  tips: ["Plus les poissons sont variés, plus le bouillon est riche : rascasse, grondin, saint-pierre selon l'arrivage.", "La rouille, c'est « rouillée » par le safran et le piment : une couleur rouille, pas rouge vif."]
},
{
  id: "g17", name: "Chou-fleur rôti entier, sauce tahini-grenade, dukkah maison et herbes", category: "gastronomique",
  diet: [T.SP, T.H, T.SL, T.SG, T.VG, T.VN], equipments: ["base", "four"], prepTime: 25, cookTime: 60, difficulty: 2,
  costPerPerson: 8.0, calories: 580, protein: 18,
  skills: ["Précuire puis rôtir un légume entier", "Dukkah (mélange de noisettes et épices)", "Dressage à partager"],
  ingredients: [i("Chou-fleur", 400), i("Huile d'olive", 35, "ml"), i("Paprika fumé", 1, "càc"), i("Cumin moulu", 1, "càc"), i("Noisettes", 20), i("Graines de sésame", 10), i("Graines de coriandre", 0.5, "càc"), i("Graines de cumin", 0.5, "càc"), i("Tahini", 30), i("Citron", 0.5, "pièce"), i("Ail", 1, "gousse"), i("Grenade", 0.25, "pièce"), i("Mélasse de grenade", 1, "càc"), i("Persil plat", 10), i("Menthe fraîche", 5)],
  instructions: [
    "Précuire|Retirer les feuilles extérieures du chou-fleur (garder les petites tendres), le plonger entier 8 minutes dans une grande eau bouillante très salée. Égoutter tête en bas 10 minutes : il doit être sec.",
    "Rôtir|Badigeonner d'huile mélangée au paprika, au cumin et au sel. Rôtir 40 à 50 minutes à 220 °C en le badigeonnant deux fois : il devient brun profond, presque noir par endroits, et un couteau traverse le cœur sans résistance.",
    "Dukkah|Torréfier séparément noisettes, sésame, graines de coriandre et de cumin à sec. Concasser grossièrement au mortier ou au couteau, saler. C'est un condiment égyptien à saupoudrer.",
    "Sauce|Tahini, jus de citron, ail râpé, sel, puis eau froide jusqu'à une sauce lisse et coulante.",
    "Assaisonnement grenade|Égrainer la grenade, mélanger les grains avec la mélasse.",
    "Dresser|Étaler la sauce tahini en large cercle sur un plat, poser le chou-fleur entier, grains de grenade, dukkah généreux, herbes effeuillées, filet d'huile. On le découpe à table comme un rôti."
  ],
  tips: ["La précuisson à l'eau garantit un cœur tendre ; le four ne sert qu'à caraméliser l'extérieur.", "Un légume peut être la pièce maîtresse d'un repas : c'est toute la philosophie de la cuisine végétale gastronomique."]
},
{
  id: "g18", name: "Entrecôte saisie, beurre maître d'hôtel et pommes Anna", category: "gastronomique",
  diet: [T.SP, T.H, T.SG], equipments: ["base", "four"], prepTime: 30, cookTime: 50, difficulty: 3,
  costPerPerson: 15.0, calories: 980, protein: 48,
  skills: ["Saisir une pièce persillée", "Beurre composé", "Pommes Anna (gâteau de pommes de terre)"],
  ingredients: [i("Entrecôte", 250), i("Beurre", 55), i("Persil plat", 10), i("Échalote", 0.5, "pièce"), i("Citron", 0.25, "pièce"), i("Pomme de terre", 250), i("Thym", 0.5, "càc"), i("Ail", 2, "gousse"), i("Huile neutre", 10, "ml"), i("Roquette", 30)],
  instructions: [
    "Beurre maître d'hôtel|Écraser 25 g de beurre mou avec le persil et l'échalote hachés très finement, quelques gouttes de citron, sel et poivre. Rouler en boudin dans du film et le mettre au frais : il se taillera en rondelles.",
    "Pommes Anna|Trancher les pommes de terre à 2 mm sans les rincer (l'amidon colle les couches). Beurrer généreusement un petit moule ou une poêle allant au four, disposer les tranches en rosace qui se chevauchent, en badigeonnant chaque couche de beurre fondu, sel et thym. Presser. Cuire 10 minutes sur le feu pour dorer le fond, puis 35 minutes à 200 °C. Démouler à l'envers : un gâteau doré et croustillant.",
    "Préparer la viande|Sortir l'entrecôte 45 minutes avant. L'éponger. Entailler le gras sur le bord tous les 2 cm pour qu'elle ne se courbe pas. Saler généreusement.",
    "Saisir|Poêle en fonte fumante, filet d'huile, entrecôte 2 à 3 minutes par face, puis la tenir à la pince sur la tranche de gras 1 minute pour le faire fondre et griller.",
    "Arroser|Ajouter 10 g de beurre et l'ail écrasé, arroser 1 minute. Saignant : 50 °C, à point : 56 °C.",
    "Repos|8 minutes sur une grille. Poivrer seulement maintenant : le poivre brûle et devient amer dans la poêle.",
    "Dresser|Trancher contre les fibres en lamelles épaisses, rondelle de beurre maître d'hôtel qui fond dessus, part de pommes Anna, roquette."
  ],
  tips: ["L'entrecôte est persillée : son gras intramusculaire fond à la cuisson et la nourrit, d'où sa tendreté.", "Le beurre maître d'hôtel se congèle en rondelles : un bistrot instantané pour tous vos grillades."]
}
);


/* ---------- MÉTADONNÉES : repos, anticipation, restes ----------
   waitTime : minutes de marinade, trempage ou repos hors préparation active
   ahead    : ce qui gagne à être fait la veille (affiché en rappel dans le planning)
   leftover : false si le plat ne supporte pas d'être réchauffé le lendemain        */
const RECIPE_META = {
  p02: { waitTime: 15 }, p03: { waitTime: 15 }, p05: { waitTime: 10 },
  p07: { waitTime: 30, ahead: "Mariner le poulet la veille au soir : il sera plus tendre et plus parfumé." },
  p08: { ahead: "Le chili est meilleur préparé la veille et réchauffé." },
  p10: { waitTime: 20 }, p13: { waitTime: 20 },
  f02: { waitTime: 30, ahead: "Mettre le poulet à mariner dans le babeurre la veille." },
  f03: { waitTime: 20 }, f07: { waitTime: 30 }, f11: { waitTime: 10 }, f15: { waitTime: 15 },
  f16: { waitTime: 10, ahead: "Monter les lasagnes la veille, les cuire le jour même." },
  s16: { waitTime: 15 }, v01: { waitTime: 20 }, v03: { waitTime: 15 }, v10: { waitTime: 20 }, v11: { waitTime: 15 },
  e01: { waitTime: 15, ahead: "Cuire le riz la veille : un riz froid saute sans coller." },
  e04: { waitTime: 10 }, m03: { waitTime: 20 }, m05: { waitTime: 30 },
  g01: { waitTime: 30 }, g02: { waitTime: 45 }, g11: { waitTime: 30 }, g17: { waitTime: 10 }, g18: { waitTime: 45 },
  g08: { ahead: "Braiser les joues la veille : meilleures réchauffées, et la graisse figée se retire facilement." }
};
const NO_LEFTOVER = ["p09", "p16", "f01", "f02", "f03", "f04", "f05", "f06", "f08", "f10", "f11", "f12", "f13", "f14", "s09", "v08", "x01", "x02", "x06", "x07", "x13", "x15", "e06", "e07", "e14", "m07", "g03", "g04", "g05", "g09", "g10", "g13", "g14", "g15"];
RECIPES.forEach(r => {
  Object.assign(r, { waitTime: 0, ahead: null }, RECIPE_META[r.id] || {});
  r.leftover = !NO_LEFTOVER.includes(r.id);
});
