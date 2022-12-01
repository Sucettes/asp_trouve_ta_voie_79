'use strict';

const {DataTypes} = require("sequelize");
module.exports = (sequelize, Sequelize) => {
    return sequelize.define('grimpes', {
        titre: {
            type: DataTypes.STRING(50),
            allowNull: false
        },
        style: {
            type: DataTypes.ENUM('Traditionnelle', 'Sportive', 'Moulinette'),
            allowNull: false
        },
        description: {
            type: DataTypes.STRING(500),
            allowNull: false
        },
        difficulte: {
            type: DataTypes.INTEGER,
            allowNull: false
        },
        nbEtoiles: {
            type: DataTypes.DECIMAL(10,2),
            defaultValue: 0
        },
        nbVotes: {
            type: DataTypes.INTEGER,
            defaultValue: 0
        }
    });
};
