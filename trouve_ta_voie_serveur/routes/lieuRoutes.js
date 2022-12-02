"use strict";

const express = require("express");
const routerLieu = express.Router();

const authMidl = require("../fctUtils/auth");

const lieuController = require("../controllers/lieuController");

routerLieu.get("/lieux/dropFormat", lieuController.getDropdownData);
routerLieu.post("/lieu/create", authMidl, lieuController.createLieu);
routerLieu.get("/lieu/:id", lieuController.getLieuById);
routerLieu.get("/lieu/details/:id", lieuController.getLieuDetailsById);
routerLieu.put("/lieu/:id", authMidl, lieuController.editLieu);
routerLieu.get("/lieux/:userId", authMidl, lieuController.getLieuxForUserId);
routerLieu.get("/lieu/:userId/:id", authMidl, lieuController.getLieuByIdToEdit);
routerLieu.get("/lieu/titre/:titre", lieuController.getLieuByTitle);
routerLieu.all("*", lieuController.allReq);

module.exports = routerLieu;
