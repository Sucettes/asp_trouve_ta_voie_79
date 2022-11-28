"use strict";

const db = require("../models/dbSetup");
const validatorFct = require("../fctUtils/validations");
const Lieu = db.lieux;
const Utilisateur = db.utilisateurs;

exports.getDropdownData = async (req, res, next) => {
    try {
        await Lieu.findAll({attributes: ["id", "titre"]})
            .then(lieux => {
                res.status(200).json(lieux);
            })
            .catch(() => {
                res.status(400).end();
            });
    } catch (e) {
        res.status(500).end();
    }
};

exports.createLieu = async (req, res, next) => {
    try {
        const locationTitleIsValid = validatorFct.locationTitleIsValid(req.body.titre);
        const locationDescriptionIsValid = validatorFct.locationDescriptionIsValid(req.body.description);
        const locationInstructionIsValid = validatorFct.locationInstructionIsValid(req.body.directives);
        const locationGEOIsValid = validatorFct.locationGEOIsValid(req.body.latitude, req.body.longitude);

        if (locationTitleIsValid && locationDescriptionIsValid && locationInstructionIsValid && locationGEOIsValid) {
            let user = await Utilisateur.findByPk(req.token.userId);

            if (user) {
                const location = await Lieu.findOne({where: {titre: req.body.titre}});

                if (location) {
                    res.status(400).end();
                } else {
                    await Lieu.create({
                        titre: req.body.titre,
                        description: req.body.description,
                        directives: req.body.directives,
                        latitude: req.body.latitude,
                        longitude: req.body.longitude,
                        utilisateurId: req.token.userId,
                    }).then(location => {
                        res.status(201).json(location);
                    });
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

exports.getLieuById = async (req, res, next) => {
    try {
        await Lieu.findByPk(+req.params.id)
            .then(location => {
                res.status(200).json(location);
            })
            .catch(() => {
                res.status(400).end();
            });
    } catch (e) {
        res.status(500).end();
    }
};

exports.editLieu = async (req, res, next) => {
    try {
        const locationTitleIsValid = validatorFct.locationTitleIsValid(req.body.titre);
        const locationDescriptionIsValid = validatorFct.locationDescriptionIsValid(req.body.description);
        const locationInstructionIsValid = validatorFct.locationInstructionIsValid(req.body.directives);
        const locationGEOIsValid = validatorFct.locationGEOIsValid(req.body.latitude, req.body.longitude);

        if (locationTitleIsValid && locationDescriptionIsValid && locationInstructionIsValid && locationGEOIsValid) {
            let location = await Lieu.findByPk(req.body.id);

            if (location) {
                if (+location.utilisateurId === +req.token.userId) {
                    // edit : Faire en sorte de pas pouvoir prendre un autre nom qui existe déjà...
                    await Lieu.update({
                        titre: req.body.titre,
                        description: req.body.description,
                        directives: req.body.directives,
                        longitude: req.body.longitude,
                        latitude: req.body.latitude,
                    }, {where: {id: req.body.id}});
                    res.status(204).end();
                } else {
                    res.status(403).end();
                }
            } else {
                res.status(404).end();
            }
        } else {
            res.status(400).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.getLieuxForUserId = async (req, res, next) => {
    try {
        if (+req.params.userId !== +req.token.userId)
            return res.status(403).end();

        let user = await Utilisateur.findByPk(req.token.userId);

        if (user) {
            await Lieu.findAll({where: {utilisateurId: req.token.userId}})
                .then(lieux => {
                    res.status(200).json(lieux);
                })
                .catch(() => {
                    res.status(400).end();
                });
        } else {
            res.status(400).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.getLieuByTitle = async (req, res, next) => {
    try {
        let lieu = await Lieu.findOne({where: {titre: req.params.titre}});

        if (lieu) {
            res.status(200).json(lieu);
        } else {
            res.status(404).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};


