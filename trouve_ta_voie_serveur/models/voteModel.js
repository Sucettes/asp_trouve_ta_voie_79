"use strict";

const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    return sequelize.define("votes", {
        nbEtoiles: {
            type: DataTypes.DECIMAL(10, 2),
            defaultValue: 1,
        }
    });
};
