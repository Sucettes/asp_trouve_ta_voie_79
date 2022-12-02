"use strict";

const express = require("express");
const routerUtilisateur = express.Router();

const utilisateurController = require("../controllers/utilisateurController");

// edit : Vérifié si est utilisé
routerUtilisateur.get("/utilisateur/courriel/:courriel", utilisateurController.getUserByEmail);
routerUtilisateur.all("*", utilisateurController.allReq);

module.exports = routerUtilisateur;
