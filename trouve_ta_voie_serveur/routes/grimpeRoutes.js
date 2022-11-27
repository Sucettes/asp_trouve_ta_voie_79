"use strict";
const uuid = require("uuid");


const db = require("../models/dbSetup");
const Grimpe = db.grimpes;
const Image = db.images;
const Lieu = db.lieux;

const Utilisateur = db.utilisateurs;

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
                            difficulte: +req.body.difficulte,
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
                        // Mettre le rollback()
                        res.status(400).end();
                    }
                });
            })
            .all((req, res) => {
                res.status(405).end();
            });

routerGrimpe.route("/grimpe/:id")
            .get((req, res) => {
                Grimpe.findByPk(+req.params.id, {include: Image}).then(g => {
                    res.status(200).json(g);
                }).catch(err => {
                    res.status(400).end();
                });
            })
            .put((req, res) => {
                Grimpe.findByPk(req.body.id).then(grimpe => {
                    if (grimpe) {
                        Grimpe.update({
                            titre: req.body.titre,
                            style: req.body.style,
                            description: req.body.description,
                            difficulte: req.body.difficulte,
                            lieuxId: req.body.lieuxId
                        }, {where: {id: req.body.id}}).then(grimpe => {
                            res.status(204).json(grimpe);
                        });
                    }
                });
            })
            .all((req, res) => {
                res.status(405).end();
            });

routerGrimpe.route("/grimpes/:userId")
            .get((req, res) => {
                if (+req.params.userId !== +req.token.userId) return res.status(403).end(); // todo : quoi mettre si le gars veut voir ceux qui sont pas a lui?

                Utilisateur.findByPk(req.token.userId).then(u => {
                    if (u) {
                        Grimpe.findAll({
                            include: [Image, Lieu, Utilisateur],
                            where: {utilisateurId: req.token.userId}
                        })
                              .then(g => {
                                  res.status(200).json(g);
                              }).catch(err => {
                            res.status(400).end();
                        });
                    } else {
                        res.status(400).end();
                    }
                }).catch(err => {
                    res.status(400).end();
                });
            })
            .all((req, res) => {
                res.status(405).end();
            });

module.exports = routerGrimpe;
