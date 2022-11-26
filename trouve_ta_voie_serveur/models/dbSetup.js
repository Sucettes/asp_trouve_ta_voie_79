'use strict';

const dbConfig = require("../config/db.config.js");
const Sequelize = require("sequelize");

const sequelize = new Sequelize(
    dbConfig.name,
    dbConfig.user,
    dbConfig.password,
    {
        host: dbConfig.host,
        port: dbConfig.port,
        dialect: dbConfig.dialect,
        define: {
            timestamps: false,
            freezeTableName: true
        }
    }
);

const db = {};

db.Sequelize = Sequelize;
db.sequelize = sequelize;

db.utilisateurs = require('./utilisateurModel.js')(sequelize, Sequelize);
db.grimpes = require('./grimpeModel.js')(sequelize, Sequelize);
db.lieux = require('./lieuModel.js')(sequelize, Sequelize);
db.images = require('./imageModel')(sequelize, Sequelize);

// todo : regarde si c'est correct.
db.utilisateurs.hasMany(db.lieux);
db.lieux.belongsTo(db.utilisateurs);

db.utilisateurs.hasMany(db.grimpes);
db.grimpes.belongsTo(db.utilisateurs);

db.lieux.hasMany(db.grimpes);
db.grimpes.belongsTo(db.lieux);

// db.images.belongsTo(db.grimpes);
db.grimpes.hasMany(db.images);

module.exports = db;
