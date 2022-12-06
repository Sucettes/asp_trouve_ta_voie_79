"use strict";

const db = require("../models/dbSetup");
const {Op, fn, col} = require("sequelize");
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
            await Vote.create({
                nbEtoiles: req.body.stars,
                grimpeId: req.body.grimpeId,
                utilisateurId: req.token.userId,
            }).then(async vote => {
                if (vote) {
                    const voteResult = await Vote.findAndCountAll({
                        where: {grimpeId: vote.grimpeId},
                        attributes: [[fn("sum", col("nbEtoiles")), "stars"]],
                    });

                    const stars = voteResult.rows[0].dataValues.stars;
                    const votes = voteResult.count;

                    // Arrondissement des étoiles.
                    const starsRat = Math.round((+stars / +votes) * 10) / 10;

                    // Mets à jour le nombre de votes et d'étoiles pour la grimpe.
                    await Grimpe.update({
                        nbVotes: +votes, nbEtoiles: +starsRat,
                    }, {where: {id: vote.grimpeId}});

                    res.status(201).json({stars: starsRat, votes: votes});
                } else {
                    res.status(400).end();
                }
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
