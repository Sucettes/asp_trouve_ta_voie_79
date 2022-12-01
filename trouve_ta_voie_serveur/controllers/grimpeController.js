"use strict";

const db = require("../models/dbSetup");
const Op = db.Sequelize.Op;
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
                            const dotIndex = pic.name.lastIndexOf(".");
                            const fileName = uuid.v4() + pic.name.substring(dotIndex);

                            fs.writeFileSync(`public/img/grimpe/${fileName}`, buff);
                            imgs.push({
                                nom: fileName, path: `/img/grimpe/${fileName}`, grimpeId: newGrimpe.id,
                            });
                        });

                        imgs = await Image.bulkCreate(imgs, {transaction: transaction});
                        res.status(201).json({grimpe: newGrimpe, img: imgs});
                    }
                } catch (e) {
                    // fixme : Supprimé les images qui on été ajouté
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
            res.status(404).end();
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
        // todo : Faire les validation
        let grimpe = await Grimpe.findOne({
            where: {id: req.body.id},
        });

        if (grimpe) {
            if (grimpe.utilisateurId === req.token.userId) {
                let grimpe2 = await Grimpe.findOne({
                    where: {
                        lieuxId: req.body.lieuxId,
                        titre: req.body.titre,
                    },
                });
                if (grimpe2 && grimpe2.id !== req.body.id) {
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

exports.getGrimpesTop10 = async (req, res, next) => {
    try {
        const grimpes = await Grimpe.findAll({
            order: [["nbEtoiles", "DESC"], ["nbVotes", "DESC"], ["titre", "ASC"]],
            include: [Image, Lieu, Utilisateur],
            limit: 10,
        });
        res.status(200).json(grimpes);
    } catch (e) {
        res.status(500).end();
    }
};

exports.getFilteredGrimpes = async (req, res, next) => {
    try {
        // Création du filtre : where
        let whereStr = {};
        if (req.body.style) whereStr.style = req.body.style;
        if (req.body.stars) {
            whereStr.nbEtoiles = {
                [Op.gte]: req.body.stars
            };
        }
        if (req.body.lieu) whereStr.lieuxId = req.body.lieu;
        if (req.body.diff1 && req.body.diff2) {
            whereStr.difficulte = {
                [Op.between]: [+req.body.diff1, +req.body.diff2],
            };
        }
        else if (req.body.diff1) {
            whereStr.difficulte = {
                [Op.gte]: +req.body.diff1,
            };
        }
        else if (req.body.diff2) {
            whereStr.difficulte = {
                [Op.lte]: +req.body.diff2,
            };
        }

        const grimpes = await Grimpe.findAll({
            where: whereStr,
            order: [["nbEtoiles", "DESC"], ["nbVotes", "DESC"], ["titre", "ASC"]],
            include: [Image, Lieu, Utilisateur],
        });

        res.status(200).json(grimpes);
    } catch (e) {
        res.status(500).end();
    }
};
