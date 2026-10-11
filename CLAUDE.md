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
- Accompagnant non accepté, hommes non acceptés, accès handicapé (conditions de la page iara, relevées le 11/10/2026 ; corrigé à la demande du client, le brief disait l'inverse)
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
3. Réalisations (placées AVANT la réservation depuis le 11/10/2026) : 6 à 10 photos ; rangée à faire glisser sur mobile (scroll-snap, sans défilement auto, photo suivante visible), défilement avec flèches sur ordinateur. Sous chaque photo : nom de la prestation + lien « Réserver ce style » qui recharge le module Acuity sur cette prestation (paramètre `appointmentType`, ID stocké dans `data/prestations.json`) puis fait défiler jusqu'au module. Filtres par catégorie (Tout, Ponytails, Ponylace & wigs, Tissages & braids), nom de variante facultatif sous le nom de la prestation (champ `variante` des `realisations`, ex. « Ponytail · Bun »), animations légères (apparition au défilement, zoom au survol, voile de chargement de la réservation, désactivées si « mouvement réduit »). Pas de carrousel en haut de page : une seule photo forte.
4. Tarifs & réservation = le module Acuity (liste des prestations par catégorie, avec prix)
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
- Photos : 17 réalisations dans `images/realisations/` (WebP 900×1200, recadrées) + photo d'accueil `images/hero.webp` (Ponylace au soleil). Ordre de la galerie validé, on garde toutes les variantes.
- Règles photos : jamais Noëlla ni d'autres personnes en reflet dans les miroirs ; recadrer télé, produits, enseignes (ELANYA).
- Descriptions des prestations reprises de la page iara (`comprend` / `aSavoir` dans `data/prestations.json`).
- Questionnaire Tally de configuration Acuity : formulaire 2EMoaj (non publié).
- Fiche de configuration Acuity : doc Claude ; brief portfolio AuPropre : doc Claude.
- **Acuity configuré le 11/10/2026** (adresse de la page : `https://glossyponytai93.as.me/`, saisie dans `acuity.scheduleUrl`) : 10 prestations en 3 catégories (Ponytails, Ponylace & wigs, Tissages & braids), dont l'identifiant `appointmentType` est dans `acuityId` de `data/prestations.json` ; suppléments Lagos hairline +5 € et Customisation le jour même +15 € ; formulaire client (Instagram, accompagnée, précision, politique de retard obligatoire, case perruque obligatoire pour les 5 prestations avec perruque) ; téléphone obligatoire ; création de compte client et réservation de plusieurs créneaux désactivées. `weeding-sleek`, `ponybraid` et `layers` ont un `acuityId` à `null` (pas créées dans Acuity) : leurs liens « Réserver ce style » ouvrent la page de réservation générale.
- Galerie (11/10/2026) : option C retenue (toutes les photos gardées, noms de variantes, filtres par catégorie), galerie au-dessus du module de réservation ; photos uniquement dans le code du site (pas dans Acuity ; une photo par prestation dans Acuity seulement si le champ existe, facultatif).
- Module Acuity : le site charge `scheduleUrl` dans une iframe (`?appointmentType=<acuityId>` pour une prestation précise). Vérifié en local le 11/10 que chaque « Réserver ce style » construit la bonne adresse ; **non testé avec le vrai affichage d'Acuity** (domaine bloqué depuis l'environnement de travail) : à contrôler sur le site en ligne.

- Design du 10/10/2026 : hero centré, titre « Sleek ponytails, ponylace, wigs & tissages. » en une seule couleur (bleu nuit, sans italique), photo d'accueil en arche sous le titre : `images/hero.webp` (Ponylace au soleil). La photo Bun ponytail (`images/hero-bun.webp`) a été essayée en hero puis abandonnée à la demande du client ; le fichier reste dans le dépôt (inutilisé). Photos de la galerie en carrés arrondis (24 px) au lieu des arches. Les autres titres gardent le mot en italique bleu roi. DA de base conservée (ivoire & bleu nuit) ; trois autres directions (noir & blanc, chocolat & rose, vert & lin) explorées en maquette et écartées.
## En suspens
- [ ] **Au lancement : retirer la balise `<meta name="robots" content="noindex, nofollow">` de `index.html`** (ajoutée le 10/10/2026 pour que Google n'indexe pas le site tant qu'il n'est pas terminé). Au même moment, remplacer le domaine `[nom-de-domaine]` (canonical, og:url) et vérifier `robots.txt`.
- Photo Tissage + lace : la cliente a indiqué qu'une photo de perruque suffit (même rendu, technique différente). On réutilise la photo Wig install (`wig-install.webp`), visible donc deux fois dans la galerie. Doublons Ponytail/Half pony : variantes gardées volontairement.
- [ ] Prestation Ponybraid : prix, durée, catégorie et contenu à confirmer (ajoutée le 10/10/2026 dans la catégorie Ponytails)
- [ ] Prestation « Layers » ajoutée (catégorie provisoire Ponylace & wigs) : prix, durée, catégorie et contenu à confirmer
- Nom « Weeding sleek » : confirmé par le client le 11/10/2026 (on garde « Weeding », pas « Wedding »).
- [ ] **Relevé de la page iara (11/10/2026)** : iara liste exactement les 11 mêmes prestations que `data/prestations.json` (aucune manquante ; Ponybraid et Layers n'y sont pas), avec les mêmes durées, prix et mentions « dès ». Décidé : les conditions d'iara font foi (accompagnant et hommes non acceptés, voir « Politique de RDV »). Reste à confirmer avec Noëlla : (1) **acompte de 20 €** par prestation sur iara (relevé pour 8 prestations sur 11) ; (2) **« option coiffure »** citée dans la description de Lagos hairline (iara) : n'existe pas dans Acuity, prix à demander ou texte à retirer. À savoir : la « grille tarifaire » d'iara n'est qu'une photo de cliente, pas une grille de prix (ne pas la réutiliser) ; iara indique aussi animaux et bébé sur place : non, accès handicapé : oui, cartes cadeaux : oui.
- [ ] Tissage ouvert : vérifier que la photo n'est pas plutôt un tissage + lace
- [ ] Lieu « ELANYA » (enseigne visible sur des photos) : confirmer que c'est le local de Noëlla
- [ ] Accord des clientes visibles sur les photos (dont Bun ponytail : cliente qui paraît mineure → accord parental). Bun ponytail est toujours dans la galerie : si l'accord n'est pas obtenu, retirer la photo de la galerie (`data/prestations.json`)
- [ ] **Restent à faire dans Acuity** : paiement de l'acompte (Revolut ou Stripe, voir ci-dessous), disponibilités (horaires de Noëlla), **réglages de réservation repris d'iara** (réservation jusqu'à 40 jours à l'avance, préavis minimum de 10 h, annulation ou report jusqu'à 72 h avant), **retirer la question « Viens-tu accompagnée ? » du formulaire** (accompagnant non accepté), une photo par prestation, création de Ponybraid / Layers / Weeding sleek (puis renseigner leur `acuityId`), nom de la page (« Glossy Ponytail BOOKING » à renommer « Glossy Ponytail »), logo et style de la page
- [ ] **À étudier** : page d'administration (type Decap CMS) pour que Noëlla gère elle-même la galerie sans passer par `data/prestations.json`
- [ ] Paiement de l'acompte : Revolut seul (option préférée de la cliente, sans frais, vérification manuelle) ou Stripe via Acuity. Tant que ce n'est pas tranché, le site affiche encore « Acompte sécurisé · Apple Pay & carte » : à adapter
- [ ] Questionnaire Tally : page « Paiement et compte » parle encore de Stripe ; question « Ton prénom et ton nom » disparue de la page 1 et page Photos revenue en position 8 (modifié hors session, à vérifier)
