"use strict";


const express = require("express");
const routerUtilisateur = express.Router();

const utilisateurController = require("../controllers/utilisateurController");
const authMidl = require("../fctUtils/auth");


routerUtilisateur.route("/utilisateur")
    .put(authMidl, utilisateurController.changeUsername)
    .all(utilisateurController.allReq);

module.exports = routerUtilisateur;
