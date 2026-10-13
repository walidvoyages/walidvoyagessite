# Walid Voyages — version HTML/CSS/JS sans dossiers

Site: index.html | Admin: admin.html | styles: style.css | scripts: site.js, admin.js.

## Installation GitHub Pages
Uploader tous les fichiers **à la racine** du repository (et pas le ZIP).
Settings > Pages > Source = Deploy from a branch > main / (root) > Save.
Aucun build Astro, npm ni workflow nécessaire. Si le dépôt a encore un ancien workflow, le retirer/désactiver pour ne pas déclencher un déploiement concurrent.
Pour le domaine `www.walidvoyages.com`, configurer ensuite DNS + domaine personnalisé GitHub Pages; ne pas toucher au domaine `www.walid-voyages.com`.

## Firebase
Utilise le projet EXISTANT `walidvoyages-13332` et Realtime Database. Login via Firebase Authentication (email/mot de passe) et check `admins/{uid} === "admin"`.
Les règles RTDB actuelles doivent autoriser l'Admin à lire et écrire `articles`, `omra`, `hotels`, `voyages`, `agencies`, `seo`, `banners`; les accès publics sont actuellement ouverts en lecture. **Les brouillons non publiés ne sont pas privés sous les règles existantes** : ne pas enregistrer d'informations secrètes dans ces collections. Renforcer règles avant mise en production.

## Cloudinary
Compte existant cloud `xvncs8ud`, preset Signed `walidvoyages`.
L'Admin permet pour le moment de COLLER une URL HTTPS Cloudinary d'une image uploadée depuis Cloudinary Dashboard. Il n'y a **pas de téléversement direct** car cela nécessite un backend sécurisé; ne jamais intégrer API Secret dans le navigateur.

## Limites explicites de cette version
- Le formulaire de vols ouvre la page de réservation sur l'ancien site. Il ne transfère PAS encore origine/destination/date (nécessite URL Deep Link officiel ou API partenaire).
- La modification SEO dans Firebase est un brouillon de gestion; changer les vraies balises `title`, `description`, `canonical`, et publier des articles HTML pré-rendus nécessite un générateur statique sécurisé et un nouveau déploiement. Articles Firebase s'affichent dynamiquement mais leur contenu n'est pas pré-rendu pour Google.
- Les cartes électroniques originales sont reproduites localement à plat pour Sousse, Mahdia, Moknine, Kasserine, Sfax et Tunis. Les liens propres aux cartes sont conservés; contrôler les infos publiques avant lancement.
- Les images externes d'Unsplash requièrent une connexion internet et peuvent changer/disparaître. Remplacer par des images dont vous détenez les droits via Cloudinary.

## Avis agences
Les cartes conservent le lien Maps original lorsqu’il est disponible, avec un bouton Avis Google. Les étoiles/notes ne sont pas simulées. Le champ Avis Google peut être renseigné dans l'Admin pour une fiche d'agence, mais les six fichiers HTML statiques ne sont pas encore régénérés automatiquement à partir de ce champ.

## Tests avant lancement
- Tester la connexion Auth, l’accès UID admin, le changement de couverture après collage d’une URL Cloudinary valide, l’ajout des offres Omra et des hôtels.
- Les règles de lecture des collections publiques peuvent aussi exposer les brouillons: **ne pas stocker de brouillons confidentiels dans ces collections** et remplacer ces règles avant déploiement public.
- Aucun API Secret Cloudinary requis ni embarqué dans le site. Un service signataire est indispensable pour upload Signed direct.
- Ouvrir tous les liens depuis localhost:8000 ou après GitHub Pages, pas file://.
- Les critères de vols/hôtels sont enregistrés localement pour référence mais **ne peuvent pas être préremplis chez le fournisseur** sans deep link ou API documenté.


## V4: FR / العربية + PC images
- `index.html` is French, `ar.html` is the Arabic homepage (indexable with hreflang).
- Navigation language switch and official electronic cards hub are included.
- Admin image input previews PC files. Upload works ONLY after a secure HTTPS backend is configured to verify Firebase ID tokens and admin role, then sign Cloudinary uploads server-side. The existing Signed preset `walidvoyages` cannot securely upload from static GitHub Pages alone.
- Until then, upload images in Cloudinary Dashboard and paste the `https://res.cloudinary.com/xvncs8ud/image/upload/...` URL into the corresponding Admin field.
- Admin's Firebase SEO entries are not automatically baked into static page meta tags; edit HTML/redeploy to update crawlable SEO metadata.
- Booking form currently directs to official engine; deep-link search criteria require supported integration from reservation provider.
- Test via `python -m http.server 8000`, not `file://`.


## V5 — liens officiels et SEO bilingue
- Vols : https://www.walid-voyages.com/vols
- Hôtels : https://www.walid-voyages.com/liste
- Pages françaises et pages arabes SEO statiques, avec liens croisés et sitemap.
- Le formulaire de recherche ouvre le moteur officiel, mais **ne transfère pas automatiquement les critères** : cela nécessite un deep link/API pris en charge par le prestataire de réservation.
- Firebase et Cloudinary : mêmes paramètres que V4. Les images sont stockées sur Cloudinary; le site conserve les liens dans Firebase. Un upload directement depuis l'ordinateur via preset Signed nécessite un backend sécurisé.
- Les modifications SEO enregistrées dans Firebase ne changent pas automatiquement les meta tags HTML; republier des pages statiques pour appliquer ces changements à Google.
- Évitez le travail via file:// : utilisez un serveur HTTP local ou GitHub Pages.
