'use strict';

const config = require('./config/config');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');
app.set('jwt-secret', config.secret);

// const db = require("./models/dbSetup");
// db.sequelize.sync({force: true}).then(() => {
// db.sequelize.sync().then(() => {
//     console.log("Drop and re-sync db.");
// });

const routerAuth = require('./routes/authRoutes');
const routerUtilisateur = require('./routes/utilisateurRoutes');
const routerGrimpe = require('./routes/grimpeRoutes');
const routerLieu = require('./routes/lieuRoutes');

app.use('/api', routerAuth);
app.use('/api', routerUtilisateur);
app.use('/api', routerGrimpe);
app.use('/api', routerLieu);

app.listen(8090, function () {
    console.log('Serveur sur le port ' + this.address().port);
});
