'use strict';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('images', {
        nom: {
            type: Sequelize.STRING,
        },
        path: {
            type: Sequelize.STRING,
            allowNull: false
        }
    });
};
