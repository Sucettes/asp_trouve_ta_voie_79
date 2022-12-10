"use strict";


const {DataTypes} = require("sequelize");

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("utilisateurs", {
        nom: {
            type: DataTypes.STRING,
        },
        courriel: {
            type: DataTypes.STRING,
            unique: true,
            validate: {
                isEmail: true,
            },
        },
        mdp: {
            type: DataTypes.STRING,
        },
        estAdmin: {
            type: DataTypes.BOOLEAN,
            defaultValue: false,
        },
    });
};
