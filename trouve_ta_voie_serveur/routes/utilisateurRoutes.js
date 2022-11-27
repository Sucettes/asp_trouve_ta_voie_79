"use strict";

const express = require("express");
const db = require("../models/dbSetup");
const routerUtilisateur = express.Router();
const Utilisateur = db.utilisateurs;

routerUtilisateur.route("/utilisateur/courriel/:courriel")
    // todo : a faire qui est pas en parametre
                 .get((req, res) => {
                     Utilisateur.findOne({where: {courriel: req.params.courriel}}).then(l => {
                         if (l) {
                             res.status(200).json(l);
                         } else {
                             res.status(404).end();
                         }
                     });
                 })
                 .all((req, res) => {
                     res.status(405).end();
                 });

module.exports = routerUtilisateur;
