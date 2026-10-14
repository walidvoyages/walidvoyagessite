# Walid Voyages V8 — Affiche verticale

- Fichiers au niveau racine, GitHub Pages : Deploy from a branch / main / root.
- Nouvelle section Affiche verticale sur les pages françaises et arabes, sans recadrage ni étirement.
- L’image fournie est conservée telle quelle : elle comporte la marque tierce « Alli Travel ». Remplacez-la par une affiche Walid Voyages avant publication commerciale si vous ne disposez pas des droits d’utilisation.
- `admin.html` → « Affiche verticale » → coller le lien d’image Cloudinary HTTPS → Enregistrer. Stockage sous `banners/promo` (les règles existantes autorisent l’écriture Admin sur `banners`).
- L’upload direct depuis PC sur un preset Cloudinary Signed nécessite toujours un backend sécurisé. L’API Secret ne doit pas être exposée dans les fichiers.
- L’URL image est affichée aux visiteurs après lecture Firebase. L’image fournie sert de fallback statique.
- SEO : image alt, texte HTML visible, H2 et lien interne. Aucune promesse de classement Google.
- Test visuel recommandé sur un serveur HTTP et sur GitHub Pages.
