"use strict";


const path = require("path");
const cors = require("cors");
const express = require("express");
const app = express();
const bodyParser = require("body-parser");
const dotenv = require("dotenv");
const jwt = require("jsonwebtoken");

dotenv.config();

app.use(bodyParser.json({limit: "500mb"}));
app.use(bodyParser.urlencoded({limit: "500mb", extended: true}));

app.use(cors({origin: ["http://localhost:8080"]}));
app.set("jwt-secret", process.env.SECRET);
app.use(express.static(path.join(__dirname, "public")));

const db = require("./models/dbSetup");

const routerAuth = require("./routes/authRoutes");
const routerUtilisateur = require("./routes/utilisateurRoutes");
const routerGrimpe = require("./routes/grimpeRoutes");
const routerLieu = require("./routes/lieuRoutes");
const routerImage = require("./routes/imageRoutes");
const routerVote = require("./routes/voteRoutes");

app.use("/api", routerAuth);
app.use("/api", routerUtilisateur);
app.use("/api", routerGrimpe);
app.use("/api", routerLieu);
app.use("/api", routerImage);
app.use("/api", routerVote);

app.all("*", (req, res) => {
    res.status(404).end();
});

app.listen(8090, function () {
    console.log(`Serveur sur : http://localhost:${this.address().port}`);
});
