'use strict';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('lieux', {
        titre: {
            type: Sequelize.STRING
        },
        description: {
            type: Sequelize.STRING
        },
        directives: {
            type: Sequelize.STRING
        },
        latitude: {
            type: Sequelize.DECIMAL
        },
        longitude: {
            type: Sequelize.DECIMAL
        }
    });
};
