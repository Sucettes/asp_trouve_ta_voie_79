# ASP Trouve ta voie

---

## Voici les instructions pour installer et démarrer le projet.

### 1. Gitlab
- Faire un pull de la branche main pour obtenir le code en local

---
### 2. Zip
- Décompresser le fichier zip `Postman_Data.zip` qui est à la racine du repos Git ou sur Omnivox. Dans ce fichier il y a les données pour la bd, image et test postman.

---
### 3. BD et images
- Créer une nouvelle base de données dans **wamp64** avec le nom : `trouve_ta_voie_bd_79` | type (`utf8_general_ci` ou si pas trouvé `utf8mb3_general_ci`)
- importer les données dans la bd grace au fichier sql `trouve_ta_voie_bd_79.sql` dans le zip.


- À la racine de l'api _(Même endroit que le **.env** et **.env.exemple**)_, ajouter un fichier _(Si pas existant)_ `public/img/grimpe`
- Glisser les images qui sont dans le fichier zip à l'intérieur. (Les images doivent être directement dans grimpe sinon elles ne seront pas trouvées. )

> trouve_ta_voie_serveur\public\img\grimpe\lesImageIci .png, .jpg etc...

---
### 4. Configuration
- créé un fichier **.env** en prenant exemple sur le fichier **.env.exemple** pour configurer le projet _(projet serveur)_.


- Dans le projet **client** et **serveur**, faire un `npm install` pour installer les packages nécessaires. Un fichier **node_modules** doit être créé.

---
### 5. Démarage
- Afin de démarrer le projet **SERVEUR** faire cette commande :
> nodemon app.js ou node_modules/.bin/nodemon app.js

- Afin de démarrer le projet **CLIENT** faire cette commande :
> npm run serve

_Si vous utilisez les IDE de jetbrain, normalement vous pouvez appuyer sur le bouton pour démarrer le projet._

- Vérifié que le projet soit bien démarré. Allez sur la [Page principale](http://localhost:8080/accueil) et si les données sont affichées et le visuel fonctionne, le projet est bien installé.

--- 
### 6. Tests Postman

- Ouvrir postman et importé l'environment **(trouve_ta_voie.postman_environment.json)** et la collection **(trouve_ta_voie.postman_collection.json)** de tests qui sont dans le fichier .zip.
- Puis l'exécuté pour lancer les tests. _(Commencer par les tests avant de faire des modifications à la bd.)_
