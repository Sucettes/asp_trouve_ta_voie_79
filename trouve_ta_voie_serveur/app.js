'use strict';

const config = require('./config/config');

const express = require('express');
const app = express();

const bodyParser = require('body-parser');
app.use(bodyParser.json());

const jwt = require('jsonwebtoken');
app.set('jwt-secret', config.secret);
const db = require("./models/dbSetup");
// db.sequelize.sync().then(() => {
db.sequelize.sync({force: true}).then(() => {
    console.log("Drop and re-sync db.");
});

const routerGrimpe = require('./routes/grimpeRoutes.js');

app.use('/', routerGrimpe);

app.listen(8090, function () {
    console.log('Serveur sur le port ' + this.address().port);
});
