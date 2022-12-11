"use strict";


const db = require("../models/dbSetup");
const Utilisateur = db.utilisateurs;

const validatorFct = require("../fctUtils/validations.js");

const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");


exports.login = async (req, res) => {
    try {
        if (!req.body.courriel || !req.body.mdp) {
            res.status(400).end();
        }

        let emailEstValide = validatorFct.userEmailEstValide(req.body.courriel);
        let pwdEstValide = validatorFct.userPwdEstValide(req.body.mdp);

        if (emailEstValide && pwdEstValide) {
            let user = await Utilisateur.findOne({
                where: {courriel: req.body.courriel},
            });

            if (user) {
                if (bcrypt.compareSync(req.body.mdp, user.mdp)) {
                    const payload = {
                        userId: user.id,
                        isAdmin: user.estAdmin,
                        name: user.nom,
                    };

                    const jwtToken = jwt.sign(payload, req.app.get("jwt-secret"), {
                        expiresIn: "12h",
                    });

                    res.status(201).json({
                        token: jwtToken,
                        userId: user.id,
                        name: user.nom,
                        isAdmin: user.estAdmin,
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
        if (!req.body.courriel || !req.body.mdp || !req.body.nom || !req.body.mdpConf) {
            res.status(400).end();
        }

        const emailEstValide = validatorFct.userEmailEstValide(req.body.courriel);
        const nameEstValide = validatorFct.userNameEstValide(req.body.nom);
        const pwdEstValide = validatorFct.userPwdEstValide(req.body.mdp);
        const pwdConfEstValide = validatorFct.userPwdEstValide(req.body.mdpConf);

        if (emailEstValide && nameEstValide && pwdEstValide && pwdConfEstValide) {
            // Vérifie si le courriel est déjà utilisé.
            let user = await Utilisateur.findOne({where: {courriel: req.body.courriel}});

            if (user) {
                res.status(400).json({err: "Courriel déjà utilisé !"});
            } else {
                // Pas de possibilité de créer un utilisateur admin autre que manuellement.
                user = {
                    nom: req.body.nom.trim(),
                    courriel: req.body.courriel.trim(),
                    mdp: req.body.mdp.trim(),
                };

                const salt = bcrypt.genSaltSync(10);
                user.mdp = bcrypt.hashSync(user.mdp, salt);

                const newUser = await Utilisateur.create(user);

                if (newUser) {
                    const jwtToken = jwt.sign({
                        userId: newUser.id,
                        isAdmin: false,
                        name: newUser.nom,
                    }, req.app.get("jwt-secret"), {
                        expiresIn: "12h",
                    });

                    res.status(201).json({
                        token: jwtToken,
                        userId: newUser.id,
                        name: newUser.nom,
                        isAdmin: false,
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

// Si ce n’est pas valide, 401 est retourné grâce au middleware.
exports.valideToken = async (req, res) => {
    try {
        res.status(200).json(req.token);
    } catch (e) {
        res.status(500).end();
    }
};

exports.allReq = async (req, res) => {
    res.status(405).end();
};
