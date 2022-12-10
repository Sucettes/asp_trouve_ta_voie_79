"use strict";


const db = require("../models/dbSetup");
const validatorFct = require("../fctUtils/validations");
const fs = require("fs");
const Lieu = db.lieux;
const Utilisateur = db.utilisateurs;
const Grimpe = db.grimpes;
const Image = db.images;


exports.getDropdownData = async (req, res) => {
    // Obtenir les lieux pour être affiché dans les listes déroulantes.
    try {
        await Lieu.findAll({
            attributes: ["id", "titre"],
            order: [["titre", "ASC"]],
        })
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
        if (!req.body.titre || !req.body.description || !req.body.directives || !req.body.latitude || !req.body.longitude) {
            res.status(400).end();
        }

        const lieuTitreEstValide = validatorFct.lieuTitreEstValide(req.body.titre);
        const lieuDescriptionEstValide = validatorFct.lieuDescriptionEstValide(req.body.description);
        const lieuInstructionEstValide = validatorFct.lieuInstructionEstValide(req.body.directives);
        const lieuGEOEstValide = validatorFct.lieuGEOEstValide(req.body.latitude, req.body.longitude);

        if (lieuTitreEstValide && lieuDescriptionEstValide && lieuInstructionEstValide && lieuGEOEstValide) {
            const lieu = await Lieu.findOne({where: {titre: req.body.titre}});

            // Vérification si le titre est disponible.
            if (lieu) {
                res.status(400).json({err: "Titre déjà utilisé !"});
            } else {
                // Création du lieu.
                await Lieu.create({
                    titre: req.body.titre.trim(),
                    description: req.body.description.trim(),
                    directives: req.body.directives.trim(),
                    latitude: req.body.latitude,
                    longitude: req.body.longitude,
                    utilisateurId: req.token.userId,
                }).then(lieu => {
                    res.status(201).json(lieu);
                });
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
        if (!req.params.id) {
            res.status(400).end();
        }

        await Lieu.findByPk(+req.params.id)
            .then(lieu => {
                if (lieu) {
                    res.status(200).json(lieu);
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
        if (!req.params.id) {
            res.status(400).end();
        }

        const lieu = await Lieu.findByPk(+req.params.id);

        if (lieu) {
            // Nombre de grimpes que le lieu possède.
            const nbGrimpe = await Grimpe.count({
                where: {lieuxId: req.params.id},
            });

            // Les styles de grimpe (qt) que le lieu possède.
            let grimpeStyle = await Grimpe.findAndCountAll({
                attributes: ["style"],
                group: "style",
                where: {lieuxId: req.params.id},
            });
            // Les difficultés de grimpe (qt) que le lieu possède.
            let grimpeDiff = await Grimpe.findAndCountAll({
                attributes: ["difficulte"],
                group: "difficulte",
                where: {lieuxId: req.params.id},
                order: [],
            });
            // les grimpes que le lieu possède.
            let grimpes = await Grimpe.findAll({
                order: [["nbEtoiles", "DESC"], ["nbVotes", "DESC"], ["titre", "ASC"]],
                where: {lieuxId: req.params.id},
            });

            res.status(200).json({
                lieu: lieu,
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
        if (!req.params.id || !req.params.userId) {
            res.status(400).end();
        }

        await Lieu.findByPk(+req.params.id)
            .then(lieu => {
                if (!lieu) {
                    res.status(404).end();
                } else if (+lieu.utilisateurId === +req.params.userId || req.token.isAdmin) {
                    res.status(200).json(lieu);
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

exports.deleteLieu = async (req, res) => {
    try {
        if (!req.params.id) {
            res.status(400).end();
        }

        // Vérification utilisateur est admin.
        const user = await Utilisateur.findByPk(req.token.userId);
        if (user.estAdmin) {
            // Récupération des path des images.
            const picturesPath = (await Grimpe.findAll({
                where: {
                    lieuxId: +req.params.id,
                },
                raw: true,
                include: [Image],
            })).map(x => x["images.path"]);

            if (picturesPath) {
                // Suppression des images de la grimpe.
                for (let i = 0; i < picturesPath.length; i++) {
                    fs.unlinkSync(`public/${picturesPath[i]}`);
                }
            }

            // Suppression du lieu. Cascade
            await Lieu.destroy({where: {id: req.params.id}});

            res.status(204).end();
        } else {
            res.status(403).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.editLieu = async (req, res) => {
    try {
        if (!req.body.id || !req.body.titre || !req.body.description || !req.body.directives || !req.body.latitude || !req.body.longitude) {
            res.status(400).end();
        }

        const lieuTitreEstValide = validatorFct.lieuTitreEstValide(req.body.titre);
        const lieuDescriptionEstValide = validatorFct.lieuDescriptionEstValide(req.body.description);
        const lieuInstructionEstValide = validatorFct.lieuInstructionEstValide(req.body.directives);
        const lieuGEOEstValide = validatorFct.lieuGEOEstValide(req.body.latitude, req.body.longitude);

        if (lieuTitreEstValide && lieuDescriptionEstValide && lieuInstructionEstValide && lieuGEOEstValide) {
            let lieu = await Lieu.findByPk(req.body.id);

            if (lieu) {
                // Possède les autorisations.
                if (+lieu.utilisateurId === +req.token.userId || req.token.isAdmin) {
                    const lieu2 = await Lieu.findOne({
                        where: {titre: req.body.titre},
                    });

                    // Vérification si le titre est disponible.
                    if (lieu2 && lieu2.id !== req.body.id) {
                        res.status(400).json({err: "Titre déjà utilisé !"});
                    } else {
                        // Mes à jour le lieu
                        await Lieu.update({
                            titre: req.body.titre.trim(),
                            description: req.body.description.trim(),
                            directives: req.body.directives.trim(),
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
            res.status(400).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.getLieuxForUserId = async (req, res) => {
    try {
        if (+req.params.userId !== +req.token.userId) {
            return res.status(403).end();
        }

        // Récupère les lieux de l'utilisateur connecté.
        await Lieu.findAll({
            where: {utilisateurId: req.token.userId},
            order: [["titre", "ASC"]],
        })
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

// exports.getLieuByTitre = async (req, res) => {
//     try {
//         if (validatorFct.lieuTitreEstValide(req.params.titre)) {
//             await Lieu.findOne({
//                 where: {titre: req.params.titre},
//             }).then(lieu => {
//                 if (lieu) {
//                     res.status(200).json(lieu);
//                 } else {
//                     res.status(404).end();
//                 }
//             }).catch(() => {
//                 res.status(404).end();
//             });
//         } else {
//             res.status(400).end();
//         }
//     } catch (e) {
//         res.status(500).end();
//     }
// };

exports.allReq = async (req, res) => {
    res.status(405).end();
};
