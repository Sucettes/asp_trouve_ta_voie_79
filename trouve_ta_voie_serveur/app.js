"use strict";

const path = require("path");
const config = require("./config/config");
const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const jwt = require("jsonwebtoken");

app.use(bodyParser.json({limit: "1024mb"}));
app.use(bodyParser.urlencoded({limit: "1024mb", extended: true})); // todo : vraiment necessaire??? je crois pas

app.use(cors({origin: config.origins}));
app.set("jwt-secret", config.secret);
app.use(express.static(path.join(__dirname, "public")));

// const db = require("./models/dbSetup");
// // db.sequelize.sync().then(() => {
// db.sequelize.sync({force: true}).then(() => {
//     console.log("Drop and re-sync db.");
// });

const routerAuth = require("./routes/authRoutes");
const routerUtilisateur = require("./routes/utilisateurRoutes");
const routerGrimpe = require("./routes/grimpeRoutes");
const routerLieu = require("./routes/lieuRoutes");
const routerImage = require("./routes/imageRoutes");

app.use("/api", routerAuth);
app.use("/api", routerUtilisateur);
app.use("/api", routerGrimpe);
app.use("/api", routerLieu);
app.use("/api", routerImage);

app.listen(8090, function () {
    console.log("Serveur sur le port " + this.address().port);
});
