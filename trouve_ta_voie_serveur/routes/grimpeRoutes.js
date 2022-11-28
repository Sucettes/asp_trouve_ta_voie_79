"use strict";

const express = require("express");
const routerGrimpe = express.Router();

const authMidl = require("../fctUtils/auth");

const grimpeController = require("../controllers/grimpeController");

routerGrimpe.post("/grimpe/create", authMidl, grimpeController.createGrimpe);
routerGrimpe.get("/grimpe/:id", grimpeController.getGrimpeById);
routerGrimpe.put("/grimpe/:id", authMidl, grimpeController.editGrimpe);
routerGrimpe.get("/grimpes/:userId", authMidl, grimpeController.getGrimpesForUserId);

module.exports = routerGrimpe;

routerGrimpe.route("/grimpe/:id");
