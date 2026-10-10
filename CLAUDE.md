# Site Glossy Ponytail — brief projet

## Client
- **Marque** : Glossy Ponytail (Instagram @glossypony_, 796 abonnés)
- **Gérante** : Noëlla (@noella._curls, ~126k abonnés, influenceuse cheveux/beauté)
- **Activité** : coiffeuse afro spécialisée sleek ponytail, ponylace, pose de perruques (wig), tissage
- **Positionnement** : s'inspire de la coiffure d'Atlanta (États-Unis) et importe cette culture dans le 93
- **Parcours** : coiffeuse autodidacte depuis 5 ans
- **Lieu** : Aulnay-sous-Bois (93). Adresse exacte communiquée 24h avant le RDV → **ne pas afficher d'adresse précise ni de carte au pin**, seulement la ville.
- **Contact** : noellascurls@gmail.com (à confirmer : mail pro du salon ?)
- **Réseaux** : Instagram @glossypony_, TikTok @glossy.ponytail

## Objectif du site
Faire réserver, avec le parcours client le plus simple possible (consigne de la cliente : simple, moderne, premium, esthétique).
- **Outil de réservation retenu : Acuity Scheduling**, formule Standard conseillée (acompte, rappels SMS, cartes cadeaux). Module Acuity intégré dans la page, pas de système de réservation maison.
- En dessous de la formule Premium, le module garde le style Acuity (logo + couleur) : le site porte l'image premium, le module gère la résa.
- Parcours visé : arrivée depuis Insta → prestation → créneau → acompte (Apple Pay / Google Pay / carte), sans création de compte. Bouton « Réserver » fixé en bas de l'écran sur mobile.
- Page iara actuelle : https://www.iarabeauty.com/pro/glossypony_ (à garder ou non pendant la transition)

## Prestations et tarifs (relevés sur iara le 06/10/2026)
| Prestation | Durée | Prix |
|---|---|---|
| Weeding Sleek | 5h | dès 110 € |
| Lagos Hairline | 2h | dès 80 € |
| Wig Install + Styling | 2h | dès 75 € |
| Tissage + Lace | 3h | dès 75 € |
| Jayda Wayda Braids | 3h | dès 70 € |
| Ponylace | 2h | dès 70 € |
| Ponytail | 2h | dès 65 € |
| Half Pony | 2h | 65 € |
| Tissage ouvert | 3h | 65 € |
| Wig Install | 2h | dès 60 € |
| Wig Custom | 30 min | 40 € |

Les tarifs bougent : les centraliser dans un seul fichier de données (ex. `data/prestations.json`) pour les mettre à jour facilement.

## Politique de RDV
- Acompte demandé à la réservation
- Retards : 5 min offerts, +10 € à 15 min, +15 € à 20 min ; au-delà de 20 min, RDV annulé. Sans nouvelles dès 5 min de retard, RDV annulé.
- Accompagnant accepté, hommes acceptés, accès handicapé
- Cartes cadeaux disponibles (via iara)

## Avis
- **Pas d'avis clients sur le site** (choix de la cliente) : ni note, ni témoignages, ni fiche Google à mettre en place pour le site.

## Direction artistique
- Identité existante sur Insta : noir + doré, logo « Glossy Ponytail » en script doré
- Carte blanche sur la DA ; « Atlanta éditorial » (orange) et noir & or écartés. Inspiration de la cliente : page Acuity de @slayeedbyke (noir & blanc, éditorial, mode).
- **DA retenue : palette « ivoire & bleu nuit » (direction A) + logo de la direction B.**
  - Couleurs : ivoire `#FAF7F2` (fond), sable `#EDE4D6` (sections alternées), bleu nuit `#0F1E4A` (textes, boutons, sections sombres), bleu roi `#2A4BC9` (touches : mots en italique), doré `#B89252` / `#D4B26A` sur fond sombre (filets, étoiles, détails seulement), doré foncé `#8A6A2E` pour « PONYTAIL » sur fond clair.
  - Logo : « Glossy » en Cormorant Garamond italique + petite étoile dorée, « PONYTAIL » en Jost espacé entre deux filets dorés. Version courte : « G » italique + étoile dans un rond.
  - Typo : titres en Cormorant Garamond (pour aller avec le logo), texte en Jost.
  - Formes : photos en arche (rappel des miroirs du local), filet doré décalé autour des photos principales.
  - Maquette finale : canevas « Glossy Ponytail — maquette finale » (logo, page ordinateur, mobile accueil, mobile réalisations).
- Le doré / caramel ne sert jamais pour du petit texte sur fond clair (contraste insuffisant).
- Ton : chaleureux, complice, s'adresse aux clientes en « tu » (« Hello mes girls »)
- Levier n°1 de l'image premium : un vrai shooting photo (réalisations ; pas de portrait d'elle)

## Structure (one-page, mobile d'abord)
1. Hero : titre = les services (« Sleek ponytails, ponylace, wigs & tissages. ») ; l'inspiration Atlanta → 93 en sous-titre ; bouton Réserver
2. « Réserver, c'est trois étapes » (prestation, créneau, acompte)
3. Tarifs & réservation = le module Acuity (liste des prestations par catégorie, avec prix)
4. Réalisations : 6 à 10 photos ; rangée à faire glisser sur mobile (scroll-snap, sans défilement auto, photo suivante visible), défilement avec flèches sur ordinateur. Sous chaque photo : nom de la prestation + lien « Réserver ce style » qui recharge le module Acuity sur cette prestation (paramètre `appointmentType`, ID stocké dans `data/prestations.json`) puis fait défiler jusqu'au module. Pas de carrousel en haut de page : une seule photo forte.
5. Avant ton rendez-vous (acompte, retards, adresse, préparation)
6. À propos de Noëlla (titre : « Noëlla, coiffeuse autodidacte depuis 5 ans. », ton sobre), sans avis ni note
7. Pied de page : infos pratiques, réseaux, mentions légales, cartes cadeaux

## Contraintes techniques
- HTML/CSS/JS statique, pas de framework lourd
- Images en WebP compressées, chargement paresseux
- SEO local : « coiffeuse afro Aulnay-sous-Bois », « sleek ponytail 93 », « pose perruque 93 »
- Mentions légales + politique de confidentialité obligatoires
- Déploiement : GitHub → Netlify ou Cloudflare Pages (l'offre gratuite de Vercel est réservée aux projets non commerciaux)

## Organisation du code
- `index.html` : la page unique ; `css/styles.css` : tout le style (variables de couleurs en haut) ; `js/main.js` : prestations, galerie et module Acuity
- `data/prestations.json` : **seule source** des prestations, prix, durées, identifiants Acuity (`acuityId`) et photos de la galerie. Pour changer un prix ou ajouter une photo, on modifie ce fichier, pas le HTML.
- Tant que `acuity.scheduleUrl` est vide, le site affiche la liste des prestations à la place du module Acuity.
- `images/realisations/` : photos en WebP, ~1200 px de large max
- `mentions-legales.html`, `confidentialite.html` : pages légales (champs entre crochets à compléter)

## À récupérer auprès de la cliente
- [ ] Logo en haute définition (fichier source)
- [ ] Photos avant/après en bonne qualité (les vidéos Insta ne suffisent pas)
- Pas de photo de Noëlla sur le site (choix de la cliente) : section « À propos » en texte seul
- [ ] Horaires / jours de travail
- [ ] Mail et téléphone pro à afficher
- [ ] Infos pour les mentions légales (SIRET, statut)
- [ ] Nom de domaine souhaité
- [ ] Nouveau lien Instagram de la politique des prestations : la bio iara renvoie vers @glossyponytail_, compte qui n'existe plus

## État du projet (au 10/10/2026)
- Dépôt GitHub : **mouvementvisible-cmd/glossy-ponytail** (anciennement upflowcrea-create), relié à Netlify qui publie la branche `main`.
- Photos : 13 réalisations dans `images/realisations/` (WebP 900×1200, recadrées) + photo d'accueil `images/hero.webp` (Ponylace au soleil). Ordre de la galerie validé, on garde toutes les variantes.
- Règles photos : jamais Noëlla ni d'autres personnes en reflet dans les miroirs ; recadrer télé, produits, enseignes (ELANYA).
- Descriptions des prestations reprises de la page iara (`comprend` / `aSavoir` dans `data/prestations.json`).
- Questionnaire Tally de configuration Acuity : formulaire 2EMoaj (non publié).
- Fiche de configuration Acuity : doc Claude ; brief portfolio AuPropre : doc Claude.

- Design du 10/10/2026 : hero centré, titre « Sleek ponytails, ponylace, wigs & tissages. » en une seule couleur (bleu nuit, sans italique), photo d'accueil en arche sous le titre : `images/hero-bun.webp` (Bun ponytail, mise en ligne le 10/10/2026 à la demande du client, accord parental en attente, voir « En suspens »). L'ancienne photo `images/hero.webp` (Ponylace au soleil) est conservée dans le dépôt : pour revenir en arrière, remettre `images/hero.webp` dans `index.html`. Photos de la galerie en carrés arrondis (24 px) au lieu des arches. Les autres titres gardent le mot en italique bleu roi. DA de base conservée (ivoire & bleu nuit) ; trois autres directions (noir & blanc, chocolat & rose, vert & lin) explorées en maquette et écartées. Le client préfère la photo Bun ponytail pour le hero (comparée en maquette à la photo Ponylace au soleil).

## En suspens
- [ ] **Au lancement : retirer la balise `<meta name="robots" content="noindex, nofollow">` de `index.html`** (ajoutée le 10/10/2026 pour que Google n'indexe pas le site tant qu'il n'est pas terminé). Au même moment, remplacer le domaine `[nom-de-domaine]` (canonical, og:url) et vérifier `robots.txt`.
- Photo Tissage + lace : la cliente a indiqué qu'une photo de perruque suffit (même rendu, technique différente). On réutilise la photo Wig install (`wig-install.webp`), visible donc deux fois dans la galerie. Doublons Ponytail/Half pony : variantes gardées volontairement.
- [ ] Prestation « Layers » ajoutée (catégorie provisoire Ponylace & wigs) : prix, durée, catégorie et contenu à confirmer
- [ ] « Weeding sleek » : confirmer s'il faut écrire « Wedding sleek » (prestation mariage à domicile)
- [ ] Tissage ouvert : vérifier que la photo n'est pas plutôt un tissage + lace
- [ ] Lieu « ELANYA » (enseigne visible sur des photos) : confirmer que c'est le local de Noëlla
- [ ] Accord des clientes visibles sur les photos (dont Bun ponytail : cliente qui paraît mineure → accord parental). **Bun ponytail est actuellement en photo d'accueil (hero) et dans la galerie** : si l'accord n'est pas obtenu, remettre `images/hero.webp` dans le hero et retirer la photo de la galerie (`data/prestations.json`)
- [ ] Paiement de l'acompte : Revolut seul (option préférée de la cliente, sans frais, vérification manuelle) ou Stripe via Acuity. Tant que ce n'est pas tranché, le site affiche encore « Acompte sécurisé · Apple Pay & carte » : à adapter
- [ ] Questionnaire Tally : page « Paiement et compte » parle encore de Stripe ; question « Ton prénom et ton nom » disparue de la page 1 et page Photos revenue en position 8 (modifié hors session, à vérifier)
