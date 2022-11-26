"use strict";

const path = require("path");
const config = require("./config/config");
const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");

app.use(bodyParser.json({ limit: '1024mb' }));
app.use(cors({origin: config.origins}));
app.set("jwt-secret", config.secret);
app.use(express.static(path.join(__dirname, "public")));

// const db = require("./models/dbSetup");
// db.sequelize.sync().then(() => {
// // db.sequelize.sync({force: true}).then(() => {
//     console.log("Drop and re-sync db.");
// });

const routerAuth = require("./routes/authRoutes");
const routerUtilisateur = require("./routes/utilisateurRoutes");
const routerGrimpe = require("./routes/grimpeRoutes");
const routerLieu = require("./routes/lieuRoutes");

app.use("/api", routerAuth);
app.use("/api", routerUtilisateur);
app.use("/api", routerGrimpe);
app.use("/api", routerLieu);

app.listen(8090, function () {
    console.log("Serveur sur le port " + this.address().port);
});
