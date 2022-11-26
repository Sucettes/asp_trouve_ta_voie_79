"use strict";

const db = require("../models/dbSetup");
const Grimpe = db.grimpes;

const express = require("express");
const authMidl = require("../fctUtils/auth");

const routerGrimpe = express.Router();

routerGrimpe.use(authMidl);

routerGrimpe.route("/grimpe/create")
            .post((req, res) => {
                // todo : faire les validations...
                // Grimpe.create({
                //     titre: req.body.titre,
                //     style: req.body.style,
                //     description: req.body.description,
                //     difficulte: req.body.difficulte,
                //     utilisateurId: req.token.userId,
                //     lieuxId: req.body.lieuxId
                // });

                res.status(200).json(req.body);
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
