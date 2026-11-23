# Mijote

Planificateur de repas qui apprend à cuisiner : planning de la semaine, liste de courses, catalogue de 134 recettes, progression et mode cuisine.

## Lancer l'application

- **Sur ton ordinateur, sans rien installer** : ouvre `index.html` dans Chrome, Edge, Firefox ou Safari. Tout fonctionne, sauf l'installation sur téléphone et le mode hors ligne.
- **Avec un petit serveur local** (pour tester l'installation) : dans le dossier, lance `python3 -m http.server 8000`, puis ouvre http://localhost:8000.

## L'installer sur téléphone (PWA)

Une application web installable doit être servie en HTTPS. Le plus simple et gratuit :

1. Crée un dépôt GitHub et envoies-y le contenu de ce dossier.
2. Dans Settings > Pages, choisis la branche `main` et le dossier racine.
3. Ouvre l'adresse `https://<ton-pseudo>.github.io/<depot>/` sur ton téléphone.
   - Android (Chrome) : bouton « Installer » dans l'en-tête, ou menu > Installer l'application.
   - iPhone (Safari) : bouton Partager > « Sur l'écran d'accueil ».

Netlify ou Cloudflare Pages fonctionnent aussi (glisser-déposer du dossier).

## Où sont les données

| Fichier | Contenu |
| --- | --- |
| `data/recipes.js` | Les recettes, plus les temps de repos, préparations à l'avance et compatibilité restes (`RECIPE_META`, `NO_LEFTOVER`) |
| `data/catalog.js` | Prix par ingrédient (`PRICES`), formats vendus (`PACKS`), placard (`PANTRY_RE`), saisons (`SEASONS`) |
| `engine.js` | Filtres, génération du planning, coûts, liste de courses |
| `app.js` | Interface |
| `sw.js` | Cache hors ligne : **change `VERSION` à chaque modification** pour que les téléphones récupèrent la mise à jour |

Le coût de chaque recette est calculé à partir de `PRICES` : modifier un prix met à jour toutes les recettes.

## Données enregistrées

Tout reste dans le navigateur (stockage local) : réglages, planning, cases cochées, placard, favoris, historique et notes. Rien n'est envoyé sur Internet, les polices sont hébergées dans le dossier `fonts/`. Vider les données du site efface tout.

## Limites connues

- Prix (estimations 2026, grande surface), calories et protéines sont des estimations, pas des mesures.
- Avec un seul appareil (seulement micro-ondes, air fryer ou cuiseur vapeur), le choix de recettes reste limité.
