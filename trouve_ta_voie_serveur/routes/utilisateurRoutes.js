"use strict";

const express = require("express");
const routerUtilisateur = express.Router();

const utilisateurController = require("../controllers/utilisateurController");

// fixme A supprimer si pas utilisé !!!!!!!!!!!!!!
routerUtilisateur.get("/utilisateur/courriel/:courriel", utilisateurController.getUserByEmail);

module.exports = routerUtilisateur;
