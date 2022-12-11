"use strict";


const db = require("../models/dbSetup");
const Op = db.Sequelize.Op;
const Grimpe = db.grimpes;
const Utilisateur = db.utilisateurs;
const Image = db.images;
const Lieu = db.lieux;
const Vote = db.votes;

const uuid = require("uuid");

const fs = require("fs");
const grimpeValidator = require("../fctUtils/grimpeValidator");


exports.createGrimpe = async (req, res) => {
    try {
        if (!req.body.titre || !req.body.style || !req.body.description || !req.body.difficulte) {
            res.status(400).end();
        }

        const titreEstValide = grimpeValidator.checkSiTitreEstValide(req.body.titre);
        const styleEstValide = grimpeValidator.checkSiStyleEstValide(req.body.style);
        const descEstValide = grimpeValidator.checkSiDescriptionEstValide(req.body.description);
        const diffEstValide = grimpeValidator.checkSiDifficulteLevelEstValide(req.body.difficulte);
        const imgCountEstValide = req.body.imgsBase64.length >= 1;

        if (titreEstValide && styleEstValide && descEstValide && diffEstValide && imgCountEstValide) {
            let grimpe = await Grimpe.findOne({
                where: {
                    lieuxId: req.body.lieuxId,
                    titre: req.body.titre,
                },
            });

            // Existe déjà et titre déjà utiliser.
            if (grimpe) {
                res.status(400).json({err: "Titre déjà utilisé !"});
            } else {
                await db.sequelize.transaction(async (transaction) => {
                    try {
                        let imgs = [];

                        const newGrimpe = await Grimpe.create({
                            titre: req.body.titre.trim(),
                            style: req.body.style,
                            description: req.body.description.trim(),
                            difficulte: +req.body.difficulte,
                            utilisateurId: req.token.userId,
                            lieuxId: req.body.lieuxId,
                        }, {transaction: transaction});

                        if (newGrimpe) {
                            // Sauvegarde des images dans bd et en local.
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
                        res.status(400).end();
                    }
                });
            }
        } else {
            res.status(400).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.getGrimpeById = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).end();
        }

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

exports.getGrimpeByIdToEdit = async (req, res) => {
    try {
        if (!req.params.id || !req.params.userId) {
            res.status(400).end();
        }

        const grimpe = await Grimpe.findByPk(+req.params.id, {include: Image});

        if (grimpe) {
            // Possède les autorisations.
            if (+grimpe.utilisateurId === +req.params.userId || req.token.isAdmin) {
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

exports.editGrimpe = async (req, res) => {
    try {
        if (!req.body.titre || !req.body.style || !req.body.description || !req.body.difficulte) {
            res.status(400).end();
        }

        const titreEstValide = grimpeValidator.checkSiTitreEstValide(req.body.titre);
        const styleEstValide = grimpeValidator.checkSiStyleEstValide(req.body.style);
        const descEstValide = grimpeValidator.checkSiDescriptionEstValide(req.body.description);
        const diffEstValide = grimpeValidator.checkSiDifficulteLevelEstValide(req.body.difficulte);

        if (titreEstValide && styleEstValide && descEstValide && diffEstValide) {
            let grimpe = await Grimpe.findOne({
                where: {id: req.body.id},
            });

            if (grimpe) {
                if (grimpe.utilisateurId === req.token.userId || req.token.isAdmin) {
                    // Vérification si le titre est disponible.
                    const grimpe2 = await Grimpe.findOne({
                        where: {
                            lieuxId: req.body.lieuxId,
                            titre: req.body.titre,
                        },
                    });

                    if (grimpe2 && grimpe2.id !== req.body.id) {
                        res.status(400).json({err: "Titre déjà utilisé !"});
                    } else {
                        // Modification de la grimpe.
                        await Grimpe.update({
                                titre: req.body.titre.trim(),
                                style: req.body.style,
                                description: req.body.description.trim(),
                                difficulte: req.body.difficulte,
                                lieuxId: req.body.lieuxId,
                            },
                            {where: {id: req.body.id}},
                        ).then(() => {
                            res.status(204).end();
                        });
                    }
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

exports.deleteGrimpe = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).end();
        }

        // Vérification utilisateur est admin.
        const user = await Utilisateur.findByPk(req.token.userId);
        if (user.estAdmin) {
            // Récupération de la grimpe.
            const grimpe = await Grimpe.findByPk(req.params.id, {include: [Image]});
            if (grimpe) {
                // Suppression des images de la grimpe.
                for (let i = 0; i < grimpe.images.length; i++) {
                    fs.unlinkSync(`public/${grimpe.images[i].path}`);
                }

                // Suppression de la grimpe. cascade
                await Grimpe.destroy({where: {id: req.params.id}});
            }
            res.status(204).end();
        } else {
            res.status(403).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.getGrimpesForUserId = async (req, res) => {
    try {
        if (!req.params.userId){
            res.status(400).end();
        }

        if (+req.params.userId !== +req.token.userId)
            return res.status(403).end();

        const user = await Utilisateur.findByPk(req.token.userId);

        if (user) {
            await Grimpe.findAll({
                include: [Image, Lieu, Utilisateur],
                where: {utilisateurId: req.token.userId},
                order: [["nbEtoiles", "DESC"], ["nbVotes", "DESC"], ["titre", "ASC"]],
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

exports.getGrimpesTop10 = async (req, res) => {
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

exports.getFilteredGrimpes = async (req, res) => {
    try {
        let styleEstValide = true;
        let diff1EstValide = true;
        let diff2EstValide = true;
        if (req.body.style) {
            styleEstValide = grimpeValidator.checkSiStyleEstValide(req.body.style);
        }
        if (req.body.diff1) {
            diff1EstValide = grimpeValidator.checkSiDifficulteLevelEstValide(req.body.diff1);
        }
        if (req.body.diff2) {
            diff2EstValide = grimpeValidator.checkSiDifficulteLevelEstValide(req.body.diff2);
        }

        if (!styleEstValide || !diff1EstValide || !diff2EstValide) {
            res.status(400).end();
        }

        // Création du filtre : where
        let whereStr = {};
        if (req.body.style) whereStr.style = req.body.style;
        if (req.body.stars) {
            whereStr.nbEtoiles = {
                [Op.gte]: req.body.stars,
            };
        }
        if (req.body.lieu) whereStr.lieuxId = req.body.lieu;
        if (req.body.diff1 && req.body.diff2) {
            whereStr.difficulte = {
                [Op.between]: [+req.body.diff1, +req.body.diff2],
            };
        } else if (req.body.diff1) {
            whereStr.difficulte = {
                [Op.gte]: +req.body.diff1,
            };
        } else if (req.body.diff2) {
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

exports.getGrimpeDetailsById = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).end();
        }

        const grimpe = await Grimpe.findByPk(+req.params.id, {
            include: [Image, Lieu, Vote],
        });

        if (!grimpe) {
            res.status(404).end();
        }

        res.status(200).json(grimpe);
    } catch (e) {
        res.status(500).end();
    }
};

exports.allReq = async (req, res) => {
    res.status(405).end();
};
