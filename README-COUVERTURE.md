# Walid Voyages — couverture sélectionnée

- La photo de couverture demandée est intégrée dans `hero-cinematic.webp`, sans textes ni logo incrustés.
- Le texte, les boutons de réservation et le logo restent des éléments HTML indépendants.
- Vols : https://www.walid-voyages.com/vols
- Hôtels : https://www.walid-voyages.com/liste
- Page française : index.html ; page arabe : ar.html.
- Carte des agences et Admin conservés.
- Déploiement GitHub Pages : branche main, / (root) ; éviter l’ancien workflow Astro.
- Les médias sont prévisualisables localement; pour Firebase Auth et les modules JS, tester depuis localhost HTTP ou GitHub Pages HTTPS.
- L'upload direct Cloudinary Signed depuis PC et la publication SEO HTML depuis Admin ne sont pas intégrés : un service serveur sécurisé est requis.
- Si Firebase contient déjà un chemin `banners/promo/image` avec une ancienne image Cloudinary, celui-ci remplacera automatiquement la couverture locale. Effacez/actualisez ce champ depuis Admin pour voir cette nouvelle photo.
