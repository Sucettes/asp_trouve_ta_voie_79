'use strict';

const db = require("../models/dbSetup");
const Grimpe = db.grimpes;
const Op = db.Sequelize.Op;

const express = require('express');

const routerGrimpe = express.Router();

routerGrimpe.route('/test/:id')
    .get(function (req, res) {
        // Grimpe.findByPk(req.params.id).then(data => {
        //     res.status(200).json(data);
        // }).catch(err => {
        //     console.log(err);
        // });

        // Grimpe.findOne({
        //     where: {id: req.params.id}
        // }).then(data => {
        //     res.status(200).json(data);
        // });
    });

module.exports = routerGrimpe;
