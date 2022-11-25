'use strict';

const db = require("../models/dbSetup");
const Grimpe = db.grimpes;

const express = require('express');
const authMidl = require("../fctUtils/auth");

const routerGrimpe = express.Router();

routerGrimpe.use(authMidl);

module.exports = routerGrimpe;
