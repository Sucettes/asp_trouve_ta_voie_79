"use strict";

const express = require("express");
const routerGrimpe = express.Router();

const authMidl = require("../fctUtils/auth");

const grimpeController = require("../controllers/grimpeController");


routerGrimpe.route("/grimpe/create")
    .post(authMidl, grimpeController.createGrimpe)
    .all(grimpeController.allReq);

routerGrimpe.route("/grimpe/details/:id")
    .get(grimpeController.getGrimpeDetailsById)
    .all(grimpeController.allReq);

routerGrimpe.route("/grimpe/:id")
    .get(grimpeController.getGrimpeById)
    .put(authMidl, grimpeController.editGrimpe)
    .delete(authMidl, grimpeController.deleteGrimpe)
    .all(grimpeController.allReq);

routerGrimpe.route("/grimpe/:userId/:id")
    .get(authMidl, grimpeController.getGrimpeByIdToEdit)
    .all(grimpeController.allReq);

routerGrimpe.route("/grimpes/top10")
    .get(grimpeController.getGrimpesTop10)
    .all(grimpeController.allReq);

routerGrimpe.route("/grimpes/filtre")
    .post(grimpeController.getFilteredGrimpes)
    .all(grimpeController.allReq);

routerGrimpe.route("/grimpes/:userId")
    .get(authMidl, grimpeController.getGrimpesForUserId)
    .all(grimpeController.allReq);


module.exports = routerGrimpe;

