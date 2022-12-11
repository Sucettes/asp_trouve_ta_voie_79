"use strict";


const express = require("express");
const routerVote = express.Router();

const authMidl = require("../fctUtils/auth");
const voteController = require("../controllers/voteController");


routerVote.route("/vote/nouveau")
    .post(authMidl, voteController.newVote)
    .all(voteController.allReq);

routerVote.route("/votes/:userId")
    .get(authMidl, voteController.getVotesForUserId)
    .all(voteController.allReq);

module.exports = routerVote;
