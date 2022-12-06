"use strict";

const db = require("../models/dbSetup");
const {Op} = require("sequelize");
const Vote = db.votes;
const Grimpe = db.grimpes;
const Utilisateur = db.utilisateurs;
const Image = db.images;
const Lieu = db.lieux;


exports.newVote = async (req, res) => {
    try {
        const regex = new RegExp("^[1-5]$");

        const climb = await Grimpe.findByPk(req.body.grimpeId);

        if (regex.test(req.body.stars) && climb) {
            // Creation du vote
            const vote = await Vote.create({
                nbEtoiles: req.body.stars,
                grimpeId: req.body.grimpeId,
                utilisateurId: req.token.userId,
            });

            res.status(201).json(vote);
        } else {
            res.status(400).end();
        }
    } catch (e) {
        res.status(500).end();
    }
};

exports.getVotesForUserId = async (req, res) => {
    try {
        if (+req.params.userId !== +req.token.userId)
            return res.status(403).end();

        const user = await Utilisateur.findByPk(req.token.userId);
        if (!user)
            res.status(400).end();

        const climbId = (await Vote.findAll({
            where: {
                utilisateurId: req.token.userId,
            },
            group: "grimpeId",
            attributes: ["grimpeId"],
        })).map(x => x.grimpeId);

        await Grimpe.findAll({
            where: {
                id: {
                    [Op.in]: climbId,
                },
            },
            order: [["nbEtoiles", "DESC"], ["nbVotes", "DESC"], ["titre", "ASC"]],
            include: [Image, Lieu],
        }).then(climbs => {
            res.status(200).json(climbs);
        }).catch(() => {
            res.status(400).end();
        });

    } catch (e) {
        res.status(500).end();
    }
};

exports.allReq = async (req, res) => {
    res.status(405).end();
};
