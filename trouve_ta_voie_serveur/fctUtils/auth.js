const jwt = require("jsonwebtoken");

function checkIfIsAuthenticated(req, callback) {
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
    checkIfIsAuthenticated(req, (isAuthenticated, tokenDecode) => {
        if (!isAuthenticated) res.status(401).end();
        else {
            req.token = tokenDecode;
            next();
        }
    });
};

module.exports = authMidl;
