"use strict";

const config = require("../config/config");

const bcrypt = require("bcrypt");

const db = require("../models/dbSetup");
const Utilisateur = db.utilisateurs;

const jwt = require("jsonwebtoken");

const express = require("express");

const validatorFct = require("../fctUtils/validations.js");

const routerAuth = express.Router();

routerAuth.route("/inscription")
    .post((req, res) => {
        const emailIsValid = validatorFct.userEmailIsValid(req.body.courriel);
        const nameIsValid = validatorFct.userNameIsValid(req.body.nom);
        const pwdIsValid = validatorFct.userPwdIsValid(req.body.mdp);
        const pwdConfIsValid = validatorFct.userPwdIsValid(req.body.mdpConf);

        if (emailIsValid && nameIsValid && pwdIsValid && pwdConfIsValid && (req.body.mdp === req.body.mdpConf)) {
            // email déjà utilisé...
            db.utilisateurs.findOne({where: {courriel: req.body.courriel}}).then(u => {
                if (u) {
                    res.status(400).json({err: "Courriel déjà utilisé !"});
                }
            });

            let utilisateur = {
                nom: req.body.nom,
                courriel: req.body.courriel,
                mdp: req.body.mdp,
                estAdmin: req.body.estAdmin !== undefined ? req.body.estAdmin : false,
            };

            const salt = bcrypt.genSaltSync(10);
            utilisateur.mdp = bcrypt.hashSync(utilisateur.mdp, salt);

            db.utilisateurs.create(utilisateur)
                .then(u => {
                    const jwtToken = jwt.sign({userId: u.id}, req.app.get("jwt-secret"), {
                        expiresIn: config.tokenExpire,
                    });
                    res.status(201).json({
                        "token": jwtToken,
                        "userId": u.id,
                        "name": u.nom,
                    });
                })
                .catch(err => {
                    res.status(400).end();
                });
        } else {
            res.status(400).end();
        }
    })
    .all((req, res) => {
        res.status(405).end();
    });

routerAuth.route("/connexion")
    .post((req, res) => {
        let courrielEstValide = validatorFct.userEmailIsValid(req.body.courriel);
        let mdpEstValide = validatorFct.userPwdIsValid(req.body.mdp);

        if (courrielEstValide && mdpEstValide) {
            Utilisateur.findOne({where: {courriel: req.body.courriel}}).then(u => {
                if (u) {
                    if (bcrypt.compareSync(req.body.mdp, u.mdp)) {
                        const payload = {userId: u.id};

                        const jwtToken = jwt.sign(payload, req.app.get("jwt-secret"), {
                                expiresIn: config.tokenExpire,
                            },
                        );

                        res.status(201).json({
                            "token": jwtToken,
                            "userId": u.id,
                            "name": u.nom,
                        });
                    } else {
                        res.status(401).end();
                    }
                } else {
                    res.status(400).end();
                }
            });
        } else {
            res.status(400).end();
        }
    })
    .all((req, res) => {
        res.status(405).end();
    });

module.exports = routerAuth;
