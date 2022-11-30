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
        // todo : regarde pour bien les mettre dans la bd car les valeurs ne sont pas exact... 5.6 = 5.60 dans bd.
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
