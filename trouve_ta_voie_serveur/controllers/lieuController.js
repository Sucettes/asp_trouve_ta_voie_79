"use strict";

const db = require("../models/dbSetup");
const validatorFct = require("../fctUtils/validations");
const Lieu = db.lieux;
const Utilisateur = db.utilisateurs;
const Grimpe = db.grimpes;

// Obtenir les lieux pour être affiché dans les listes déroulantes.
exports.getDropdownData = async (req, res) => {
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

exports.createLieu = async (req, res) => {
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
                    res.status(400).json({err: "Titre déjà utilisé !"});
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
                res.status(401).end();
            }
        } else {
            res.status(400).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.getLieuById = async (req, res) => {
    try {
        await Lieu.findByPk(+req.params.id)
            .then(location => {
                if (location) {
                    res.status(200).json(location);
                } else {
                    res.status(404).end();
                }
            })
            .catch(() => {
                res.status(400).end();
            });
    } catch (e) {
        res.status(500).end();
    }
};

exports.getLieuDetailsById = async (req, res) => {
    try {
        let location = await Lieu.findByPk(+req.params.id);

        if (location) {
            let nbGrimpe = await Grimpe.count({where: {lieuxId: req.params.id}});

            let grimpeStyle = await Grimpe.findAndCountAll({
                attributes: ["style"],
                group: "style",
                where: {lieuxId: req.params.id},
            });
            let grimpeDiff = await Grimpe.findAndCountAll({
                attributes: ["difficulte"],
                group: "difficulte",
                where: {lieuxId: req.params.id},
                order: [],
            });
            let grimpes = await Grimpe.findAll({where: {lieuxId: req.params.id}});

            res.status(200).json({
                lieu: location,
                totalGrimpe: nbGrimpe,
                grimpeStyle: grimpeStyle,
                grimpeDiff: grimpeDiff,
                grimpes: grimpes,
            });
        } else {
            res.status(404).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.getLieuByIdToEdit = async (req, res) => {
    try {
        await Lieu.findByPk(+req.params.id)
            .then(location => {
                if (!location) {
                    res.status(404).end();
                } else if (+location.utilisateurId === +req.params.userId) {
                    res.status(200).json(location);
                } else {
                    res.status(403).end();
                }
            })
            .catch(() => {
                res.status(400).end();
            });
    } catch (e) {
        res.status(500).end();
    }
};

exports.editLieu = async (req, res) => {
    try {
        const locationTitleIsValid = validatorFct.locationTitleIsValid(req.body.titre);
        const locationDescriptionIsValid = validatorFct.locationDescriptionIsValid(req.body.description);
        const locationInstructionIsValid = validatorFct.locationInstructionIsValid(req.body.directives);
        const locationGEOIsValid = validatorFct.locationGEOIsValid(req.body.latitude, req.body.longitude);

        if (locationTitleIsValid && locationDescriptionIsValid && locationInstructionIsValid && locationGEOIsValid) {
            let user = await Utilisateur.findByPk(req.token.userId);

            if (user) {
                let location = await Lieu.findByPk(req.body.id);

                if (location) {
                    if (+location.utilisateurId === +req.token.userId) {
                        const location2 = await Lieu.findOne({where: {titre: req.body.titre}});
                        if (location2 && location2.id !== req.body.id) {
                            res.status(400).json({err: "Titre déjà utilisé !"});
                        } else {
                            await Lieu.update({
                                titre: req.body.titre,
                                description: req.body.description,
                                directives: req.body.directives,
                                longitude: req.body.longitude,
                                latitude: req.body.latitude,
                            }, {where: {id: req.body.id}});
                            res.status(204).end();
                        }
                    } else {
                        res.status(403).end();
                    }
                } else {
                    res.status(404).end();
                }
            } else {
                res.status(401).end();
            }
        } else {
            res.status(400).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.getLieuxForUserId = async (req, res) => {
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

exports.getLieuByTitle = async (req, res) => {
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

exports.allReq = async (req, res) => {
    res.status(405).end();
};
