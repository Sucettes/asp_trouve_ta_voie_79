'use strict';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('lieux', {
        titre: {
            type: Sequelize.STRING(50),
            unique: true,
            validate: {
                len: [3, 50]
            }
        },
        description: {
            type: Sequelize.STRING(500),
            validate: {
                len: [3, 500]
            }
        },
        directives: {
            type: Sequelize.STRING(500),
            validate: {
                len: [3, 500]
            }
        },
        latitude: {
            type: Sequelize.DECIMAL
        },
        longitude: {
            type: Sequelize.DECIMAL
        }
    });
};
