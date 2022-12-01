"use strict";

const express = require("express");
const routerAuth = express.Router();

const authMidl = require("../fctUtils/auth");

const authController = require("../controllers/authController");

routerAuth.post("/inscription", authController.register);
routerAuth.post("/connexion", authController.login);
routerAuth.post("/valideToken", authMidl, authController.valideToken);

module.exports = routerAuth;
