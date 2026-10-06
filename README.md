# Glossy Ponytail — site vitrine et réservation

Site one-page de Glossy Ponytail, coiffeuse afro à Aulnay-sous-Bois (93).
HTML, CSS et JavaScript statiques, sans framework. La réservation passe par le module Acuity Scheduling intégré.

## Voir le site en local

Le site lit `data/prestations.json`, il doit donc être servi par un petit serveur (pas en double-cliquant sur le fichier) :

```bash
python3 -m http.server 8000
```

Puis ouvrir http://localhost:8000.

## Mettre à jour le contenu

- **Prix, durées, prestations, photos de la galerie** : `data/prestations.json`
- **Brancher Acuity** : dans `data/prestations.json`, renseigner `acuity.scheduleUrl` (adresse de la page de réservation) et l'`acuityId` de chaque prestation.
- **Photos** : déposer les fichiers WebP dans `images/realisations/` et indiquer leur chemin dans `realisations[].image`.

## Mise en ligne

Relier le dépôt à Netlify ou Cloudflare Pages (pas de commande de build, dossier publié : la racine). Chaque push sur `main` met le site à jour.

Le brief complet du projet est dans `CLAUDE.md`.
