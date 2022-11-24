'use strict';

const bcrypt = require("bcrypt");

const db = require("../models/dbSetup");
const Utilisateur = db.utilisateurs;
const Op = db.Sequelize.Op;

const express = require('express');

const routerUtilisateur = express.Router();

// routerUtilisateur.route('/utilisateur/create')
//     .post(function (req, res) {
//         if (req.body.nom && req.body.courriel && req.body.mdp) {
//             let utilisateur = {
//                 nom: req.body.nom,
//                 courriel: req.body.courriel,
//                 mdp: req.body.mdp,
//                 estAdmin: req.body.estAdmin !== undefined ? req.body.estAdmin : false
//             }
//
//             const salt = bcrypt.genSaltSync(10);
//             utilisateur.mdp = bcrypt.hashSync(utilisateur.mdp, salt);
//
//             db.utilisateurs.create(utilisateur)
//                 .then(r => {
//                     res.status(201).json(r);
//                 })
//                 .catch(err => {
//                     // res.status(400).end();
//                 });
//         } else {
//             res.status(400).end();
//         }
//     })
//     .all(function (req, res) {
//         res.status(405).end();
//     });

routerUtilisateur.route('/utilisateur/:id')
    .get(function (req, res) {
        console.log(req.params.id);
        Utilisateur.findByPk(req.params.id).then(
            data => {
                res.status(200).json(data);
            }
        ).catch(err => {
            res.status(400).end();
        });
    })
    .put(function (req, res) {
    })
    .delete(function (req, res) {
    })
    .all(function (req, res) {
        res.status(405).end();
    });

routerUtilisateur.route('/utilisateurs');

module.exports = routerUtilisateur;
