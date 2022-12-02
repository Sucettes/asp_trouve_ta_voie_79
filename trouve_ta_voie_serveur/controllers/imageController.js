"use strict";

const db = require("../models/dbSetup");
const Image = db.images;

const uuid = require("uuid");
const fs = require("fs");

exports.deleteImgById = async (req, res, next) => {
    // todo : Verifie que le user connecter peut supprimer cette image
    try {
        let resultImg = await Image.findByPk(req.params.id);

        if (resultImg) {
            await Image.destroy({where: {id: req.params.id}}).then(() => {
                fs.unlinkSync(`public/${resultImg.dataValues.path}`);
                res.status(204).end();
            });
        } else {
            res.stat(404).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.addImg = async (req, res, next) => {
    // todo : Check si le user peut ajoute l<image a la grimpe
    try {
        await db.sequelize.transaction(async (transaction) => {
            try {
                const imgb64 = req.body.imgBase64;
                const matches = imgb64.base64.match(/^data:([A-Za-z+/]+);base64,(.+)$/);
                let buff = Buffer.from(matches[2], "base64");
                const dotIndex = imgb64.name.lastIndexOf('.');
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
            } catch (e) {
                res.status(400).end();
            }
        });
    } catch (e) {
        res.status(500).end();
    }
};

exports.allReq = async (req, res, next) => {
    res.status(405).end();
};
