"use strict";

const db = require("../models/dbSetup");
const Image = db.images;
const Grimpe = db.grimpes;

const uuid = require("uuid");
const fs = require("fs");

exports.deleteImgById = async (req, res) => {
    try {
        let resultImg = await Image.findByPk(req.params.id);

        if (resultImg) {
            let grimpe = await Grimpe.findOne({
                where: {id: resultImg.grimpeId},
                include: [Image],
            });

            // Dois avoir au moins une image.
            if (grimpe && grimpe.images.length <= 1) {
                res.status(400).end(); // edit: Verifie le code a retourne
            }

            // Est autorisé.
            if (grimpe.utilisateurId === req.token.userId || req.token.isAdmin) {
                await Image.destroy({where: {id: req.params.id}}).then(() => {
                    fs.unlinkSync(`public/${resultImg.dataValues.path}`);
                    res.status(204).end();
                });
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

exports.addImg = async (req, res) => {
    try {
        await db.sequelize.transaction(async (transaction) => {
            try {
                let grimpe = await Grimpe.findOne({
                    where: {id: req.body.grimpeId},
                });

                // Grimpe n'existe pas.
                if (!grimpe) {
                    res.status(404).end();
                }

                // Est autorisé.
                if (grimpe.utilisateurId === req.token.userId || req.token.isAdmin) {
                    const imgb64 = req.body.imgBase64;
                    const matches = imgb64.base64.match(/^data:([A-Za-z+/]+);base64,(.+)$/);
                    let buff = Buffer.from(matches[2], "base64");
                    const dotIndex = imgb64.name.lastIndexOf(".");
                    const fileName = uuid.v4() + imgb64.name.substring(dotIndex);

                    fs.writeFileSync(`public/img/grimpe/${fileName}`, buff);

                    let img = await Image.create({
                        nom: fileName,
                        path: `/img/grimpe/${fileName}`,
                        grimpeId: req.body.grimpeId,
                    }, {transaction: transaction});

                    if (img) {
                        res.status(201).json(img);
                    } else {
                        res.status(400).end();
                    }
                } else {
                    res.status(403).end();
                }
            } catch (e) {
                res.status(400).end();
            }
        });
    } catch (e) {
        res.status(500).end();
    }
};

exports.allReq = async (req, res) => {
    res.status(405).end();
};
