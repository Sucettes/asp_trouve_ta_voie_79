"use strict";

const db = require("../models/dbSetup");
const Utilisateur = db.utilisateurs;

const validatorFct = require("../fctUtils/validations.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.login = async (req, res) => {
    try {
        let emailIsValid = validatorFct.userEmailIsValid(req.body.courriel);
        let pwdIsValid = validatorFct.userPwdIsValid(req.body.mdp);

        if (emailIsValid && pwdIsValid) {
            let user = await Utilisateur.findOne({
                where: {courriel: req.body.courriel},
            });

            if (user) {
                if (bcrypt.compareSync(req.body.mdp, user.mdp)) {
                    const payload = {userId: user.id, isAdmin: user.estAdmin};

                    const jwtToken = jwt.sign(payload, req.app.get("jwt-secret"), {
                        expiresIn: "12h",
                    });

                    res.status(201).json({
                        token: jwtToken,
                        userId: user.id,
                        name: user.nom,
                        isAdmin: user.estAdmin
                    });
                }
            }
            res.status(401).end();
        } else {
            res.status(400).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.register = async (req, res) => {
    try {
        const emailIsValid = validatorFct.userEmailIsValid(req.body.courriel);
        const nameIsValid = validatorFct.userNameIsValid(req.body.nom);
        const pwdIsValid = validatorFct.userPwdIsValid(req.body.mdp);
        const pwdConfIsValid = validatorFct.userPwdIsValid(req.body.mdpConf);

        if (emailIsValid && nameIsValid && pwdIsValid && pwdConfIsValid) {
            // Vérifie si le courriel est déjà utilisé.
            let user = await Utilisateur.findOne({where: {courriel: req.body.courriel}});

            if (user) {
                res.status(400).json({err: "Courriel déjà utilisé !"});
            } else {
                // Pas de possibilité de créer un utilisateur admin autre que manuellement.
                user = {
                    nom: req.body.nom,
                    courriel: req.body.courriel,
                    mdp: req.body.mdp,
                };

                const salt = bcrypt.genSaltSync(10);
                user.mdp = bcrypt.hashSync(user.mdp, salt);

                const newUser = await Utilisateur.create(user);

                if (newUser) {
                    const jwtToken = jwt.sign({userId: newUser.id, isAdmin: false}, req.app.get("jwt-secret"), {
                        expiresIn: "12h",
                    });

                    res.status(201).json({
                        token: jwtToken,
                        userId: newUser.id,
                        name: newUser.nom,
                        isAdmin: false
                    });
                } else {
                    res.status(400).end();
                }
            }
        } else {
            res.status(400).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};

// Si ce n’est pas valide, 401 est retourné grâce aux middleware.
exports.valideToken = async (req, res) => {
    res.status(200).end();
};

exports.allReq = async (req, res) => {
    res.status(405).end();
};
