/* ============================================================
   MIJOTE : référentiel ingrédients
   PRICES   : prix moyen en grande surface (France, estimation 2026).
              g -> €/kg, ml -> €/L, autres unités -> € l'unité.
   PACKS    : format vendu le plus courant (pour arrondir la liste de courses).
   PANTRY   : produits de placard, à vérifier plutôt qu'à racheter chaque semaine.
   SEASONS  : mois de pleine saison en France métropolitaine (1 = janvier).
   Pour mettre un prix à jour : modifier une seule ligne ici, tout se recalcule.
   ============================================================ */
const PRICES = {
  "Abricots secs|g": 12, "Agneau haché|g": 18, "Ail|gousse": 0.15, "Ail en poudre|càc": 0.05, "Amandes|g": 16,
  "Anchois à l'huile|pièce": 0.25, "Aneth|g": 33, "Asperges vertes|g": 12, "Aubergine|g": 3.5, "Avocat|pièce": 1,
  "Basilic frais|g": 35, "Betterave crue|g": 2.5, "Beurre de cacahuète|g": 10, "Beurre|g": 11, "Blanc de poulet|g": 13,
  "Bouillon de légumes (cube)|pièce": 0.15, "Bouillon de volaille (cube)|pièce": 0.15, "Boulgour|g": 3, "Brocoli|g": 3.5,
  "Bœuf haché 15 % MG|g": 13, "Bœuf à sauter|g": 22, "Cacahuètes|g": 8, "Cacao en poudre|càc": 0.08, "Cannelle|càc": 0.05,
  "Carotte|g": 1.5, "Carré d'agneau|g": 40, "Cerfeuil|g": 35, "Champignons de Paris|g": 5, "Chapelure|g": 4, "Cheddar|g": 16,
  "Chou blanc|g": 2, "Chou rouge|g": 2, "Chou-fleur|g": 3, "Ciboulette|g": 35, "Citron vert|pièce": 0.4, "Citronnelle|pièce": 0.6,
  "Citron|pièce": 0.5, "Clou de girofle|pièce": 0.03, "Comté|g": 20, "Concentré de tomate|càc": 0.05, "Concentré de tomate|càs": 0.15,
  "Concombre|g": 2.5, "Coquillettes|g": 2, "Coriandre fraîche|g": 35, "Coriandre moulue|càc": 0.05, "Cornichons|g": 8,
  "Courge butternut|g": 2, "Courgette|g": 3, "Crevettes décortiquées|g": 25, "Crème fraîche épaisse|g": 6, "Crème liquide 30 %|ml": 6,
  "Cuisse de poulet|pièce": 2, "Cumin moulu|càc": 0.05, "Curcuma|càc": 0.05, "Curry en poudre|càc": 0.06, "Câpres|càc": 0.1,
  "Câpres|càs": 0.3, "Cèpes séchés|g": 120, "Céleri branche|g": 4, "Céleri-rave|g": 3, "Dinde hachée|g": 12, "Ditalini|g": 3,
  "Dos de cabillaud|g": 30, "Emmental râpé|g": 11, "Entrecôte|g": 35, "Escalope de dinde|g": 14, "Estragon|g": 35,
  "Farine T00|g": 2, "Farine de blé|g": 1.2, "Farine de pois chiches|g": 5, "Fenouil|g": 4, "Feta|g": 14, "Feuilles de lasagne|g": 4,
  "Filet de bar|g": 35, "Filet de bœuf|g": 60, "Filet de colin|g": 18, "Filet de dorade|g": 28, "Filet de lotte|g": 40,
  "Filet de rouget|g": 35, "Filet de truite|g": 24, "Flocons d'avoine|g": 3, "Fond de veau (déshydraté)|càc": 0.15,
  "Fond de volaille (déshydraté)|càc": 0.15, "Fromage blanc|g": 4, "Fromage de chèvre|g": 18, "Fécule de maïs|g": 4,
  "Gambas crues entières|g": 30, "Garam masala|càc": 0.08, "Gingembre frais|g": 8, "Girolles|g": 40, "Gnocchis|g": 5,
  "Gousse de vanille|pièce": 2.5, "Graines de coriandre|càc": 0.05, "Graines de courge|g": 15, "Graines de cumin|càc": 0.05,
  "Graines de moutarde|càc": 0.05, "Graines de sésame|g": 10, "Grenade|pièce": 2, "Haricots blancs (boîte)|g": 3,
  "Haricots noirs (boîte)|g": 4, "Haricots rouges (boîte)|g": 3, "Haricots verts|g": 6, "Harissa|càc": 0.08,
  "Haut de cuisse de poulet désossé|g": 11, "Haut de cuisse de poulet|pièce": 1, "Huile d'olive|ml": 12, "Huile de sésame|ml": 20,
  "Huile neutre|ml": 3, "Jambon blanc|tranche": 0.6, "Jambon de dinde|tranche": 0.4, "Jaune d'œuf|pièce": 0.3, "Joue de bœuf|g": 22,
  "Ketchup|g": 4, "Lait de coco|ml": 5, "Lait|ml": 1.1, "Laurier|feuille": 0.03, "Lentilles corail|g": 4, "Lentilles cuites (boîte)|g": 3.5,
  "Lentilles vertes|g": 4, "Linguine|g": 3, "Macaroni|g": 2, "Magret de canard|g": 28, "Mangue|pièce": 1.8, "Mayonnaise|g": 6,
  "Maïs (boîte)|g": 4, "Menthe fraîche|g": 35, "Miel|càc": 0.12, "Miso blanc|g": 20, "Moutarde à l'ancienne|càc": 0.06,
  "Moutarde|càc": 0.04, "Mozzarella|g": 10, "Muscade|càc": 0.05, "Mélasse de grenade|càc": 0.15, "Noisettes|g": 18,
  "Noix de Saint-Jacques|g": 75, "Noix|g": 16, "Nouilles chinoises|g": 5, "Nouilles de riz|g": 6, "Nouilles ramen|g": 7,
  "Oignon rouge|pièce": 0.35, "Oignon vert|pièce": 0.3, "Oignon|pièce": 0.25, "Olives noires|g": 12, "Olives vertes|g": 12,
  "Orange|pièce": 0.5, "Orecchiette|g": 3.5, "Origan|càc": 0.04, "Orzo|g": 4, "Pain complet|tranche": 0.15,
  "Pain de campagne|tranche": 0.3, "Pain de mie|tranche": 0.1, "Pain à burger|pièce": 0.5, "Pain à hot-dog|pièce": 0.35,
  "Panais|g": 4, "Pancetta|g": 25, "Panko|g": 8, "Paprika doux|càc": 0.05, "Paprika fumé|càc": 0.07, "Parmesan|g": 25,
  "Patate douce|g": 3, "Pavé de saumon|g": 28, "Pavé de thon|g": 45, "Pecorino|g": 25, "Penne|g": 2, "Persil plat|g": 20,
  "Petits oignons grelots|g": 5, "Petits pois (boîte)|g": 3.5, "Petits pois surgelés|g": 4, "Pignons de pin|g": 50,
  "Pilon de poulet|pièce": 0.6, "Piment d'Espelette|càc": 0.2, "Pistaches|g": 25, "Pita|pièce": 0.35, "Poireau|g": 2.5,
  "Pois chiches (boîte)|g": 3, "Pois gourmands|g": 10, "Poivre noir|càc": 0.08, "Poivron rouge|pièce": 0.9, "Polenta|g": 3,
  "Pomme de terre grenaille|g": 3, "Pomme de terre|g": 1.4, "Pomme|pièce": 0.4, "Pousses de soja|g": 6, "Pâte feuilletée|pièce": 1.5,
  "Pâte à pizza|g": 5, "Quinoa|g": 7, "Radis|g": 4, "Ras el hanout|càc": 0.06, "Ricotta|g": 9, "Riz arborio|g": 4, "Riz basmati|g": 3,
  "Riz carnaroli|g": 6, "Riz complet|g": 3, "Riz jasmin|g": 3, "Riz rond|g": 2.5, "Romarin|càc": 0.04, "Roquette|g": 15,
  "Safran|pincée": 0.6, "Salade verte|g": 6, "Sardines (boîte)|g": 12, "Sauce nuoc-mâm|càc": 0.05, "Sauce soja|ml": 6,
  "Saucisse de Toulouse|pièce": 1.3, "Saucisse de volaille|pièce": 0.6, "Sauge|g": 35, "Semoule|g": 2, "Sirop d'érable|càc": 0.25,
  "Spaghetti|g": 2, "Sucre|càc": 0.01, "Sumac|càc": 0.08, "Suprême de volaille fermière|g": 22, "Tagliatelles|g": 3.5,
  "Tahini|g": 12, "Tamari (sauce soja sans gluten)|ml": 15, "Thon au naturel (boîte)|g": 14, "Thym|càc": 0.04, "Tofu ferme|g": 9,
  "Tomates cerises|g": 5, "Tomates concassées|g": 2.5, "Tomate|g": 3, "Tortilla de blé|pièce": 0.25, "Tortilla de maïs|pièce": 0.3,
  "Vin blanc|ml": 7, "Vin rouge|ml": 8, "Vinaigre de cidre|càc": 0.02, "Vinaigre de cidre|càs": 0.06, "Vinaigre de riz|càc": 0.04,
  "Vinaigre de riz|càs": 0.12, "Vinaigre de vin blanc|càs": 0.06, "Yaourt grec|g": 5, "Zeste d'orange|pièce": 0.5,
  "Échalote|pièce": 0.3, "Épaule de veau|g": 24, "Épinards frais|g": 8, "Œuf|pièce": 0.3
};

/* Formats vendus : taille dans l'unité de la recette + libellé */
const PACKS = {
  "Riz basmati": [1000, "paquet de 1 kg"], "Riz jasmin": [1000, "paquet de 1 kg"], "Riz complet": [1000, "paquet de 1 kg"],
  "Riz rond": [1000, "paquet de 1 kg"], "Riz arborio": [500, "paquet de 500 g"], "Riz carnaroli": [500, "paquet de 500 g"],
  "Spaghetti": [500, "paquet de 500 g"], "Linguine": [500, "paquet de 500 g"], "Penne": [500, "paquet de 500 g"],
  "Tagliatelles": [500, "paquet de 500 g"], "Coquillettes": [500, "paquet de 500 g"], "Macaroni": [500, "paquet de 500 g"],
  "Orecchiette": [500, "paquet de 500 g"], "Ditalini": [500, "paquet de 500 g"], "Orzo": [500, "paquet de 500 g"],
  "Feuilles de lasagne": [500, "boîte de 500 g"], "Nouilles de riz": [250, "paquet de 250 g"], "Nouilles chinoises": [250, "paquet de 250 g"],
  "Nouilles ramen": [250, "paquet de 250 g"], "Gnocchis": [500, "paquet de 500 g"], "Lentilles vertes": [500, "paquet de 500 g"],
  "Lentilles corail": [500, "paquet de 500 g"], "Semoule": [500, "paquet de 500 g"], "Boulgour": [500, "paquet de 500 g"],
  "Quinoa": [500, "paquet de 500 g"], "Polenta": [500, "paquet de 500 g"], "Farine de blé": [1000, "paquet de 1 kg"],
  "Farine T00": [1000, "paquet de 1 kg"], "Farine de pois chiches": [500, "paquet de 500 g"], "Fécule de maïs": [250, "boîte de 250 g"],
  "Panko": [200, "paquet de 200 g"], "Chapelure": [250, "paquet de 250 g"], "Flocons d'avoine": [500, "paquet de 500 g"],
  "Tomates concassées": [400, "boîte de 400 g"], "Pois chiches (boîte)": [265, "boîte (265 g égouttés)"],
  "Haricots rouges (boîte)": [250, "boîte (250 g égouttés)"], "Haricots noirs (boîte)": [250, "boîte (250 g égouttés)"],
  "Haricots blancs (boîte)": [250, "boîte (250 g égouttés)"], "Lentilles cuites (boîte)": [265, "boîte (265 g égouttés)"],
  "Maïs (boîte)": [285, "boîte de 285 g"], "Petits pois (boîte)": [280, "boîte (280 g égouttés)"], "Thon au naturel (boîte)": [112, "boîte (112 g égouttés)"],
  "Sardines (boîte)": [100, "boîte de 135 g"], "Lait de coco": [400, "boîte de 400 ml"], "Crème liquide 30 %": [200, "brique de 20 cl"],
  "Crème fraîche épaisse": [200, "pot de 20 cl"], "Lait": [1000, "brique de 1 L"], "Yaourt grec": [500, "pot de 500 g"],
  "Fromage blanc": [500, "pot de 500 g"], "Beurre": [250, "plaquette de 250 g"], "Feta": [200, "bloc de 200 g"],
  "Mozzarella": [125, "boule de 125 g"], "Ricotta": [250, "pot de 250 g"], "Parmesan": [200, "morceau de 200 g"],
  "Pecorino": [150, "morceau de 150 g"], "Comté": [250, "morceau de 250 g"], "Cheddar": [200, "bloc de 200 g"],
  "Emmental râpé": [200, "sachet de 200 g"], "Fromage de chèvre": [150, "bûche de 150 g"], "Tofu ferme": [400, "bloc de 400 g"],
  "Pâte à pizza": [400, "pâte de 400 g"], "Pâte feuilletée": [1, "rouleau"], "Œuf": [6, "boîte de 6"], "Tortilla de blé": [8, "paquet de 8"],
  "Tortilla de maïs": [8, "paquet de 8"], "Pita": [6, "paquet de 6"], "Pain à burger": [4, "paquet de 4"], "Pain à hot-dog": [6, "paquet de 6"],
  "Pain de mie": [20, "paquet (20 tranches)"], "Épinards frais": [300, "sachet de 300 g"], "Roquette": [125, "sachet de 125 g"],
  "Salade verte": [150, "sachet de 150 g"], "Champignons de Paris": [250, "barquette de 250 g"], "Tomates cerises": [250, "barquette de 250 g"],
  "Pousses de soja": [200, "sachet de 200 g"], "Crevettes décortiquées": [200, "barquette de 200 g"], "Pancetta": [120, "barquette de 120 g"],
  "Persil plat": [50, "bouquet"], "Coriandre fraîche": [30, "bouquet"], "Menthe fraîche": [30, "bouquet"], "Basilic frais": [30, "bouquet"],
  "Ciboulette": [25, "bouquet"], "Aneth": [25, "bouquet"], "Cerfeuil": [25, "bouquet"], "Estragon": [25, "bouquet"], "Sauge": [20, "bouquet"],
  "Amandes": [125, "sachet de 125 g"], "Noisettes": [125, "sachet de 125 g"], "Noix": [125, "sachet de 125 g"], "Pistaches": [125, "sachet de 125 g"],
  "Pignons de pin": [70, "sachet de 70 g"], "Cacahuètes": [200, "sachet de 200 g"], "Graines de sésame": [100, "sachet de 100 g"],
  "Graines de courge": [125, "sachet de 125 g"], "Abricots secs": [250, "sachet de 250 g"], "Olives noires": [150, "bocal de 150 g"],
  "Olives vertes": [150, "bocal de 150 g"], "Cornichons": [200, "bocal de 200 g"], "Tahini": [300, "pot de 300 g"],
  "Beurre de cacahuète": [350, "pot de 350 g"], "Miso blanc": [300, "pot de 300 g"], "Cèpes séchés": [30, "sachet de 30 g"],
  "Haricots verts": [500, "sachet de 500 g"], "Petits pois surgelés": [750, "sachet de 750 g"], "Mayonnaise": [235, "pot de 235 g"],
  "Ketchup": [500, "flacon de 500 g"], "Jambon de dinde": [4, "paquet de 4 tranches"], "Jambon blanc": [4, "paquet de 4 tranches"],
  "Saucisse de volaille": [6, "paquet de 6"], "Saucisse de Toulouse": [4, "paquet de 4"], "Pilon de poulet": [6, "barquette de 6"], "Ail": [10, "tête d'ail"], "Gingembre frais": [100, "morceau"]
};

/* Placard : à vérifier, pas à racheter chaque semaine */
const PANTRY_RE = /huile|vinaigre|sauce soja|tamari|nuoc|moutarde|ketchup|mayonnaise|miel|sucre|sirop|fond de|bouillon|concentré|câpres|harissa|cacao|ail en poudre|cumin|curcuma|curry|paprika|cannelle|muscade|girofle|garam|ras el hanout|sumac|origan|thym|romarin|laurier|piment d'espelette|poivre noir|safran|graines de (coriandre|cumin|moutarde)|coriandre moulue|mélasse|vanille/i;

const SEASONS = {
  "Asperges vertes": [4, 5, 6], "Girolles": [6, 7, 8, 9, 10], "Tomate": [6, 7, 8, 9], "Tomates cerises": [6, 7, 8, 9],
  "Courgette": [6, 7, 8, 9], "Aubergine": [6, 7, 8, 9], "Poivron rouge": [7, 8, 9, 10], "Concombre": [5, 6, 7, 8, 9],
  "Fenouil": [6, 7, 8, 9, 10, 11], "Radis": [4, 5, 6, 7], "Épinards frais": [3, 4, 5, 9, 10, 11],
  "Courge butternut": [9, 10, 11, 12, 1, 2], "Panais": [10, 11, 12, 1, 2, 3], "Céleri-rave": [10, 11, 12, 1, 2, 3],
  "Poireau": [9, 10, 11, 12, 1, 2, 3, 4], "Chou-fleur": [9, 10, 11, 12, 1, 2, 3, 4], "Chou blanc": [10, 11, 12, 1, 2, 3],
  "Chou rouge": [10, 11, 12, 1, 2, 3], "Betterave crue": [7, 8, 9, 10, 11, 12, 1, 2, 3], "Brocoli": [6, 7, 8, 9, 10, 11],
  "Haricots verts": [6, 7, 8, 9], "Pois gourmands": [5, 6, 7], "Grenade": [10, 11, 12, 1], "Roquette": [4, 5, 6, 7, 8, 9, 10]
};
