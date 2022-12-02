"use strict";

const express = require("express");
const routerAuth = express.Router();

const authMidl = require("../fctUtils/auth");

const authController = require("../controllers/authController");

routerAuth.route("/inscription")
    .post(authController.register)
    .all(authController.allReq);
routerAuth.route("/connexion")
    .post(authController.login)
    .all(authController.allReq);
routerAuth.route("/valideToken")
    .post(authMidl, authController.valideToken)
    .all(authController.allReq);

module.exports = routerAuth;
