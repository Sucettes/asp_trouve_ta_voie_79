"use strict";

const db = require("../models/dbSetup");
const Grimpe = db.grimpes;
const Utilisateur = db.utilisateurs;
const Image = db.images;
const Lieu = db.lieux;

const uuid = require("uuid");

const fs = require("fs");

exports.createGrimpe = async (req, res, next) => {
    try {
        // todo : Faire les validations
        let grimpe = await Grimpe.findOne({
            where: {
                lieuxId: req.body.lieuxId,
                titre: req.body.titre,
            },
        });

        // Titre déjà utilisé
        if (grimpe) {
            res.status(400).json({err: "Titre déjà utilisé !"});
        } else {
            await db.sequelize.transaction(async (transaction) => {
                try {
                    let imgs = [];

                    const newGrimpe = await Grimpe.create({
                        titre: req.body.titre,
                        style: req.body.style,
                        description: req.body.description,
                        difficulte: +req.body.difficulte,
                        utilisateurId: req.token.userId,
                        lieuxId: req.body.lieuxId,
                    }, {transaction: transaction});

                    if (newGrimpe) {
                        await req.body.imgsBase64.forEach(pic => {
                            const matches = pic.base64.match(/^data:([A-Za-z+/]+);base64,(.+)$/);
                            let buff = Buffer.from(matches[2], "base64");
                            const fileName = uuid.v4() + "-" + pic.name;

                            fs.writeFileSync(`public/img/grimpe/${fileName}`, buff);
                            imgs.push({
                                nom: fileName, path: `/img/grimpe/${fileName}`, grimpeId: newGrimpe.id,
                            });
                        });

                        imgs = await Image.bulkCreate(imgs, {transaction: transaction});
                        res.status(201).json({grimpe: newGrimpe, img: imgs});
                    }
                } catch (e) {
                    res.status(400).end();
                }
            });
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.getGrimpeById = async (req, res, next) => {
    try {
        const grimpe = await Grimpe.findByPk(+req.params.id, {include: Image});

        if (grimpe) {
            res.status(200).json(grimpe);
        } else {
            res.status(400).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.getGrimpeByIdToEdit = async (req, res, next) => {
    try {
        const grimpe = await Grimpe.findByPk(+req.params.id, {include: Image});

        if (grimpe) {
            if (+grimpe.utilisateurId === +req.params.userId) {
                res.status(200).json(grimpe);
            } else {
                res.status(403).end();
            }
        } else {
            res.status(404).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.editGrimpe = async (req, res, next) => {
    try {
        // fixme : Modification des grimpes est casse
        // todo : Faire les validations
        let grimpe = await Grimpe.findOne({
            where: {
                lieuxId: req.body.lieuxId,
                titre: req.body.titre,
            }, LIMIT: 1
        });
        console.log(grimpe)
        if (grimpe && grimpe.utilisateurId !== req.token.userId) {
            res.status(403).end();
        } else {
            if (grimpe) {
                res.status(404).end();
            }
            // Titre déjà utilisé
            if (grimpe && grimpe.id !== req.body.id) {
                res.status(400).json({err: "Titre déjà utilisé !"});
            } else {
                await Grimpe.update({
                        titre: req.body.titre,
                        style: req.body.style,
                        description: req.body.description,
                        difficulte: req.body.difficulte,
                        lieuxId: req.body.lieuxId,
                    },
                    {where: {id: req.body.id}},
                ).then(grimpe => {
                    res.status(204).json(grimpe);
                });
            }
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.getGrimpesForUserId = async (req, res, next) => {
    try {
        if (+req.params.userId !== +req.token.userId)
            return res.status(403).end();

        const user = await Utilisateur.findByPk(req.token.userId);

        if (user) {
            await Grimpe.findAll({
                include: [Image, Lieu, Utilisateur], where: {utilisateurId: req.token.userId},
            }).then(grimpes => {
                res.status(200).json(grimpes);
            }).catch(() => {
                res.status(400).end();
            });
        } else {
            res.status(400).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};
