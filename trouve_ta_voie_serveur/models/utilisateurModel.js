"use strict";

module.exports = (sequelize, Sequelize) => {
    return sequelize.define("utilisateurs", {
        nom: {
            type: Sequelize.STRING
        },
        courriel: {
            type: Sequelize.STRING,
            unique: true,
            validate: {
                isEmail: true
            }
        },
        mdp: {
            type: Sequelize.STRING
        },
        estAdmin: {
            type: Sequelize.BOOLEAN,
            defaultValue: false
        }
    });
};
