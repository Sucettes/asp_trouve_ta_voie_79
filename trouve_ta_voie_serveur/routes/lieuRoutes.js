"use strict";

const express = require("express");
const routerLieu = express.Router();

const authMidl = require("../fctUtils/auth");

const lieuController = require("../controllers/lieuController");

routerLieu.route("/lieux/dropFormat")
    .get(lieuController.getDropdownData)
    .all(lieuController.allReq);

routerLieu.route("/lieu/create")
    .post(authMidl, lieuController.createLieu)
    .all(lieuController.allReq);

routerLieu.route("/lieu/:id")
    .get(lieuController.getLieuById)
    .put(authMidl, lieuController.editLieu)
    .all(lieuController.allReq);

routerLieu.route("/lieu/details/:id")
    .get(lieuController.getLieuDetailsById)
    .all(lieuController.allReq);

routerLieu.route("/lieu/titre/:titre")
    .get(lieuController.getLieuByTitle)
    .all(lieuController.allReq);

routerLieu.route("/lieux/:userId")
    .get(authMidl, lieuController.getLieuxForUserId)
    .all(lieuController.allReq);

routerLieu.route("/lieu/:userId/:id")
    .get(authMidl, lieuController.getLieuByIdToEdit)
    .all(lieuController.allReq);

module.exports = routerLieu;
