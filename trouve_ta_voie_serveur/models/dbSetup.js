"use strict";

const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    process.env.DB_NAME,
    process.env.USER,
    process.env.PASSWORD,
    {
        host: process.env.HOST,
        port: process.env.PORT,
        dialect: process.env.DIALECT,
        define: {
            timestamps: false,
            freezeTableName: true,
        },
    },
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.utilisateurs = require("./utilisateurModel.js")(sequelize, Sequelize);
db.grimpes = require("./grimpeModel.js")(sequelize, Sequelize);
db.lieux = require("./lieuModel.js")(sequelize, Sequelize);
db.images = require("./imageModel")(sequelize, Sequelize);

db.utilisateurs.hasMany(db.lieux);
db.lieux.belongsTo(db.utilisateurs);

db.utilisateurs.hasMany(db.grimpes);
db.grimpes.belongsTo(db.utilisateurs);

db.lieux.hasMany(db.grimpes);
db.grimpes.belongsTo(db.lieux);

db.grimpes.hasMany(db.images);

module.exports = db;
