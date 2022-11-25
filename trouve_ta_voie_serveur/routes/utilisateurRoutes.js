'use strict';

const express = require('express');
const authMidl = require("../fctUtils/auth");
const routerUtilisateur = express.Router();

routerUtilisateur.use(authMidl);

module.exports = routerUtilisateur;
