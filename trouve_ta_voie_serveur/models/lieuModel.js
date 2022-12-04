"use strict";

const {DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("lieux", {
        titre: {
            type: DataTypes.STRING(50),
            unique: true,
            validate: {
                len: [3, 50],
            },
        },
        description: {
            type: DataTypes.STRING(500),
            validate: {
                len: [3, 500],
            },
        },
        directives: {
            type: DataTypes.STRING(500),
            validate: {
                len: [3, 500],
            },
        },
        latitude: {
            type: DataTypes.DECIMAL(18, 15),
        },
        longitude: {
            type: DataTypes.DECIMAL(19, 15),
        },
    });
};
