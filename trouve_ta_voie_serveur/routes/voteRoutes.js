"use strict";

const express = require("express");
const routerUtilisateur = express.Router();

const authMidl = require("../fctUtils/auth");

// Ajouté un vote -> Créé le vote dans la bd, récupère la grimpe et met a jours la moy. * et de vote...

module.exports = routerUtilisateur;
