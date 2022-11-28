"use strict";

const express = require("express");
const routerAuth = express.Router();

const authController = require("../controllers/authController");

routerAuth.post("/inscription", authController.register);
routerAuth.post("/connexion", authController.login);

module.exports = routerAuth;
