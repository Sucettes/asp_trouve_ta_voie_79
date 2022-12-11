"use strict";


const db = require("../models/dbSetup");
const Utilisateur = db.utilisateurs;

const jwt = require("jsonwebtoken");

function checkSiEstAuthentifier(req, callback) {
    const auth = req.headers.authorization;
    if (!auth) {
        callback(false, null);
    } else {
        const authArray = auth.split(" ");
        if (authArray.length !== 2) {
            callback(false, null);
        } else {
            const tokenEncode = authArray[1];
            jwt.verify(tokenEncode, req.app.get("jwt-secret"), async (err, tokenDecode) => {
                if (err) callback(false, null);
                else {
                    await Utilisateur.findByPk(tokenDecode.userId)
                        .then(user => {
                            // Utilisateur existe
                            callback((user), tokenDecode);
                        }).catch(() => {
                            callback(false, null);
                        });
                }
            });
        }
    }
}

// Middleware pour vérifier si l'utilisateur est authentifié.
const authMidl = (req, res, next) => {
    checkSiEstAuthentifier(req, (isAuthenticated, tokenDecode) => {
        if (!isAuthenticated) res.status(401).end();
        else {
            req.token = tokenDecode;
            next();
        }
    });
};

module.exports = authMidl;
