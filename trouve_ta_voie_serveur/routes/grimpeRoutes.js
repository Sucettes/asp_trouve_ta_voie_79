"use strict";

const express = require("express");
const routerGrimpe = express.Router();

const authMidl = require("../fctUtils/auth");

const grimpeController = require("../controllers/grimpeController");


routerGrimpe.post("/grimpe/create", authMidl, grimpeController.createGrimpe);
routerGrimpe.put("/grimpe/:id", authMidl, grimpeController.editGrimpe);
routerGrimpe.get("/grimpe/:id", grimpeController.getGrimpeById);
routerGrimpe.get("/grimpe/:userId/:id", authMidl, grimpeController.getGrimpeByIdToEdit);
routerGrimpe.get("/grimpes/top10", grimpeController.getGrimpesTop10);
routerGrimpe.get("/grimpes/:userId", authMidl, grimpeController.getGrimpesForUserId);
routerGrimpe.post("/grimpes/filtre", grimpeController.getFilteredGrimpes);
routerGrimpe.all("*", grimpeController.allReq);

module.exports = routerGrimpe;

