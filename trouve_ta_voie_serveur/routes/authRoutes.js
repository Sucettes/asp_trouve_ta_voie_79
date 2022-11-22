'use strict';

const config = require('../config/config');

const bcrypt = require("bcrypt");

const db = require("../models/dbSetup");
const Utilisateur = db.utilisateurs;
const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');

const express = require('express');

const routerAuth = express.Router();

routerAuth.route('/connexion')
    .post(function (req, res) {
        Utilisateur.findOne({
            where: {
                courriel: req.body.courriel
            }
        }).then(utilisateur => {
            if (utilisateur) {
                if (bcrypt.compareSync(req.body.mdp, utilisateur.mdp)) {
                    const payload = {
                        utilisateurConnecterID: utilisateur.id
                    };
                    const jwtToken = jwt.sign(payload, req.app.get('jwt-secret'), {
                        expiresIn: config.tokenExpire
                    });
                    res.status(200).json({'token': jwtToken});
                } else {
                    res.status(401).end();
                }
            } else {
                res.status(400).end();
            }
        });
    });

module.exports = routerAuth;
