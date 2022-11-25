const jwt = require("jsonwebtoken");

function checkIfIsAuthenticated(req, callback) {
    const auth = req.headers.authorization;
    if (!auth) {
        callback(false, null);
    } else {
        const authArray = auth.split(' ');
        if (authArray.length !== 2) {
            callback(false, null);
        } else {
            const tokenEncode = authArray[1];
            jwt.verify(tokenEncode, req.app.get('jwt-secret'), function (err, tokenDecode) {
                if (err) callback(false, null);
                else {
                    callback(true, tokenDecode);
                }
            });
        }
    }
}
const authMidl = function (req, res, next) {
    checkIfIsAuthenticated(req, function (isAuthenticated, tokenDecode) {
        if (!isAuthenticated) res.status(401).end();
        else {
            req.token = tokenDecode;
            next();
        }
    });
};

module.exports = authMidl;
