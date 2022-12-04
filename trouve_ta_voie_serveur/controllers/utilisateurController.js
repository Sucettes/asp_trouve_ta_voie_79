"use strict";

const db = require("../models/dbSetup");
const Utilisateur = db.utilisateurs;

exports.getUserByEmail = async (req, res) => {
    try {
        let utilisateur = await Utilisateur.findOne({
            where: {courriel: req.params.courriel},
        });

        if (utilisateur) {
            res.status(200).json(utilisateur);
        } else {
            res.status(404).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.allReq = async (req, res) => {
    res.status(405).end();
};
