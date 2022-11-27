"use strict";

const db = require("../models/dbSetup");
const Image = db.images;

const express = require("express");

const authMidl = require("../fctUtils/auth");
const uuid = require("uuid");
const fs = require("fs");

const routerImage = express.Router();

routerImage.use(authMidl);

routerImage.route("/image")
           .post(async (req, res) => {
               await db.sequelize.transaction(async (transaction) => {
                   try {
                       const img = req.body.imgBase64;
                       const matches = img.base64.match(/^data:([A-Za-z+/]+);base64,(.+)$/);
                       let buff = Buffer.from(matches[2], "base64");
                       const fileName = uuid.v4() + "-" + img.name;
                       fs.writeFileSync(`public/img/grimpe/${fileName}`, buff);

                       let imgObj = await Image.create({
                           nom: fileName,
                           path: `/img/grimpe/${fileName}`,
                           grimpeId: req.body.grimpeId
                       }, {transaction: transaction});
                       res.status(201).json(imgObj);

                   } catch (err) {
                       // Mettre le rollback() ????
                       res.status(400).end();
                   }
               });
           })
           .all((req, res) => {
               res.status(405).end();
           });

module.exports = routerImage;
