"use strict";

const express = require("express");
const routerImage = express.Router();

const authMidl = require("../fctUtils/auth");

const imageController = require("../controllers/imageController");

routerImage.route("/image/:id")
    .delete(authMidl, imageController.deleteImgById)
    .all(imageController.allReq);
routerImage.route("/image")
    .post(authMidl, imageController.addImg)
    .all(imageController.allReq);

module.exports = routerImage;
