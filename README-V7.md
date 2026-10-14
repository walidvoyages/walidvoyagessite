# Walid Voyages V7 — Cinematic / FR+AR

## Installation / publication

Projet **HTML/CSS/JavaScript** sans compilation. Mettre les fichiers à la racine du dépôt GitHub puis configurer GitHub Pages sur `Deploy from a branch` → `main` → `/ (root)`; ne pas utiliser l’ancien workflow Astro. Tester depuis un serveur HTTP, pas en ouvrant le fichier localement.

- `index.html`: accueil français
- `ar.html`: accueil arabe RTL
- `cinematic.css`, `cinematic.js`: nouvelles interfaces et animations
- `admin.html`, `admin.js`: administration Firebase **conservée**, nécessite Authentication et Realtime Database correctement configurés.
- `carte-*.html`: cartes agences historiques conservées.
- Pages FR/AR SEO historiques conservées.

## Réservations

Bouton Vols → `https://www.walid-voyages.com/vols`
Bouton Hôtels → `https://www.walid-voyages.com/liste`

**Les critères d’une recherche ne sont pas transmis automatiquement.** Nous évitons un formulaire trompeur jusqu’à l’obtention d’une documentation de deep linking/API du moteur de réservation.

## Images / Cloudinary

Les images externes sont des photos de démonstration. Remplacer par des images avec droits d’utilisation commerciale confirmés avant lancement. Le bandeau Admin affiche une image Cloudinary provenant du champ `banners/home/image` de Firebase (URL HTTPS). La fonction d'upload depuis PC **n’est pas disponible** sans backend sécurisé pour l’upload signé; l’Admin permet l’utilisation d’une URL Cloudinary.

## SEO

Les titres, métadonnées, textes statiques FR/AR et `hreflang` sont dans le HTML. Les champs du panneau SEO sauvegardés dans Firebase **ne modifient pas encore** les meta tags des pages statiques publiées. Nécessite une chaîne de génération/nouvelle publication (ou serveur) pour être effectif auprès des moteurs.

Aucun classement n’est garanti. Les liens d’avis Google par agence ouvrent une recherche Google Maps et ne sont pas des liens d’avis vérifiés.

## Sécurité

Ne jamais publier Cloudinary API Secret; ne pas changer les règles de sécurité de Firebase pour `read: true` sur des données privées. Séparer brouillons/versions publiées avant production. Les règles actuelles doivent être revues avant tout lancement.
