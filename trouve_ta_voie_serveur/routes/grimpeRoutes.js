"use strict";
const uuid = require("uuid");


const db = require("../models/dbSetup");
const Grimpe = db.grimpes;
const Image = db.images;
const express = require("express");
const authMidl = require("../fctUtils/auth");
const path = require("path");
const fs = require("fs");

const routerGrimpe = express.Router();

routerGrimpe.use(authMidl);

routerGrimpe.route("/grimpe/create")
            .post(async (req, res) => {
                // todo : faire les validations...
                await db.sequelize.transaction(async (transaction) => {
                    let grimpe;
                    let imgs = [];
                    try {
                        grimpe = await Grimpe.create({
                            titre: req.body.titre,
                            style: req.body.style,
                            description: req.body.description,
                            difficulte: req.body.difficulte,
                            utilisateurId: req.token.userId,
                            lieuxId: req.body.lieuxId
                        }, {transaction: transaction});
                        await req.body.imgsBase64.forEach(pic => {
                            const matches = pic.base64.match(/^data:([A-Za-z+/]+);base64,(.+)$/);
                            let buff = Buffer.from(matches[2], "base64");
                            const fileName = uuid.v4() + "-" + pic.name;
                            fs.writeFileSync(`public/img/grimpe/${fileName}`, buff);
                            imgs.push({
                                nom: fileName,
                                path: `/img/grimpe/${fileName}`,
                                grimpeId: grimpe.id
                            });
                        });
                        imgs = await Image.bulkCreate(imgs, {transaction: transaction});
                        res.status(201).json({grimpe: grimpe, img: imgs});
                    } catch (err) {
                        res.status(400).end();
                    }
                });
            })
            .all((req, res) => {
                res.status(405).end();
            });

routerGrimpe.route("/grimpe/:id")
            .all((req, res) => {
                res.status(405).end();
            });

routerGrimpe.route("/grimpes/:userId")
            .all((req, res) => {
                res.status(405).end();
            });

module.exports = routerGrimpe;
