'use strict';

module.exports = (sequelize, Sequelize) => {
    return sequelize.define('grimpes', {
        titre: {
            type: Sequelize.STRING,
            allowNull: false
        },
        style: {
            type: Sequelize.ENUM('Traditionnelle', 'Sportive', 'Moulinette'),
            allowNull: false
        },
        description: {
            type: Sequelize.STRING,
            allowNull: false
        },
        difficulte: {
            type: Sequelize.DECIMAL,
            allowNull: false
        },
        nbEtoiles: {
            type: Sequelize.DECIMAL,
            defaultValue: 0
        },
        nbVotes: {
            type: Sequelize.DECIMAL,
            defaultValue: 0
        }
    });
};
