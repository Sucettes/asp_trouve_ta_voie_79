'use strict';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('utilisateurs', {
        nom: {
            type: Sequelize.STRING
        },
        courriel: {
            type: Sequelize.STRING
        },
        mdp: {
            type: Sequelize.STRING
        },
        estAdmin: {
            type: Sequelize.BOOLEAN,
            default: false
        }
    });
};
