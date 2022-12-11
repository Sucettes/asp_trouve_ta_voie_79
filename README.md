# ASP Trouve ta voie

---

Voici les instructions pour installer et démarrer le projet.

- Faire un pull de la branche main pour obtenir le code en local


- Créer une nouvelle base de données dans wamp64 avec le nom : `trouve_ta_voie_bd_79` | type (`utf8_general_ci` ou si pas trouvé `utf8mb3_general_ci`)
- importer les données dans la bd grace au fichier dans le zip.


- À la racine de l'api, ajouter un fichier `public/img/grimpe`
- Glisser les images qui sont dans le fichier zip à l'intérieur

> trouve_ta_voie_serveur\public\img\grimpe\imageIci....


- créé un fichier .env en prenant exemple sur le fichier .env.exemple pour configuré le projet.


- Dans le projet client et serveur, faire un npm install pour installer les packages nécessaires


- Afin de démarrer le projet, exécuter du côté client et serveur ces commandes :
> npm run serve

> nodemon app.js

---
Pour utilisé les tests postman importé l'environement et les tests qui sont dans le fichier .zip.


> Url : http://localhost:8080/accueil
