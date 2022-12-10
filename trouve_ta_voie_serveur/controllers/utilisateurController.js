"use strict";


const db = require("../models/dbSetup");
const validatorFct = require("../fctUtils/validations");
const Utilisateur = db.utilisateurs;


exports.changeUsername = async (req, res) => {
    // Permets de changer le nom d'utilisateur de lui qui est connecté.
    try {
        if (!req.body.name) {
            res.status(400).end();
        }

        const nameEstValide = validatorFct.userNameEstValide(req.body.name);
        if (nameEstValide) {
            const user = await Utilisateur.findByPk(req.token.userId);

            if (user) {
                if (+user.id === +req.token.userId) {
                    // Modification du nom
                    await Utilisateur.update({
                        nom: req.body.name.trim(),
                    }, {where: {id: +req.token.userId}});

                    res.status(204).end();
                } else {
                    res.status(403).end();
                }
            } else {
                res.status(400).end();
            }
        } else {
            res.status(400).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.allReq = async (req, res) => {
    res.status(405).end();
};
