'use strict';

const config = require('../config/config');

const bcrypt = require("bcrypt");

const db = require("../models/dbSetup");
const Lieu = db.lieux;
const Op = db.Sequelize.Op;

const jwt = require('jsonwebtoken');

const express = require('express');

const routerLieu = express.Router();

routerLieu.route('/lieux')
    .get()
    .all(function (req, res) {
        res.status(405).end();
    });

routerLieu.route('/lieu/create')
    .post()
    .all(function (req, res) {
        res.status(405).end();
    });

routerLieu.route('/lieu/id')
    .get()
    .put()
    .delete()
    .all(function (req, res) {
        res.status(405).end();
    });

module.exports = routerLieu;
