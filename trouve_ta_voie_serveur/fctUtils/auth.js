"use strict";

const jwt = require("jsonwebtoken");

function checkSiIsAuthenticated(req, callback) {
    const auth = req.headers.authorization;
    if (!auth) {
        callback(false, null);
    } else {
        const authArray = auth.split(" ");
        if (authArray.length !== 2) {
            callback(false, null);
        } else {
            const tokenEncode = authArray[1];
            jwt.verify(tokenEncode, req.app.get("jwt-secret"), (err, tokenDecode) => {
                if (err) callback(false, null);
                else {
                    callback(true, tokenDecode);
                }
            });
        }
    }
}

// Middleware pour vérifier si l'utilisateur est authentifié.
const authMidl = (req, res, next) => {
    checkSiIsAuthenticated(req, (isAuthenticated, tokenDecode) => {
        if (!isAuthenticated) res.status(401).end();
        else {
            req.token = tokenDecode;
            next();
        }
    });
};

module.exports = authMidl;
