"use strict";

const express = require("express");
const routerUtilisateur = express.Router();

const utilisateurController = require("../controllers/utilisateurController");

// edit : Vérifié si est utilisé
routerUtilisateur.route("/utilisateur/courriel/:courriel")
    .get(utilisateurController.getUserByEmail)
    .all(utilisateurController.allReq);

module.exports = routerUtilisateur;
