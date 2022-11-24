'use strict';

const config = require('../config/config');

const bcrypt = require("bcrypt");

const db = require("../models/dbSetup");
const Utilisateur = db.utilisateurs;
const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');

const express = require('express');

const routerAuth = express.Router();

routerAuth.route('/inscription')
    .post(function (req, res) {
        if (!(req.body.nom && req.body.courriel && req.body.mdp && req.body.mdpConf))
            res.status(400).end();
        if (req.body.mdp !== req.body.mdpConf)
            res.status(400).end();

        let utilisateur = {
            nom: req.body.nom,
            courriel: req.body.courriel,
            mdp: req.body.mdp,
            estAdmin: req.body.estAdmin !== undefined ? req.body.estAdmin : false
        };

        const salt = bcrypt.genSaltSync(10);
        utilisateur.mdp = bcrypt.hashSync(utilisateur.mdp, salt);

        db.utilisateurs.create(utilisateur)
            .then(data => {
                console.log(utilisateur.id)
                const jwtToken = jwt.sign({userId: utilisateur.id}, req.app.get('jwt-secret'), {
                    expiresIn: config.tokenExpire
                });
                res.status(201).json({
                    'token': jwtToken,
                    'userId': utilisateur.id,
                    'name': utilisateur.nom
                });
            })
            .catch(err => {
                res.status(400).end();
            });
    })
    .all(function (req, res) {
        res.status(405).end();
    });

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
                        userId: utilisateur.id
                    };
                    const jwtToken = jwt.sign(payload, req.app.get('jwt-secret'), {
                        expiresIn: config.tokenExpire
                    });
                    res.status(200).json({
                        'token': jwtToken,
                        'userId': utilisateur.id,
                        'name': utilisateur.nom
                    });
                } else {
                    res.status(401).end();
                }
            } else {
                res.status(400).end();
            }
        });
    })
    .all(function (req, res) {
        res.status(405).end();
    });

module.exports = routerAuth;
