"use strict";

const express = require("express");
const routerImage = express.Router();

const authMidl = require("../fctUtils/auth");

const imageController = require("../controllers/imageController");

routerImage.delete("/image/:id", authMidl, imageController.deleteImgById);
routerImage.post("/image", authMidl, imageController.addImg);

module.exports = routerImage;
