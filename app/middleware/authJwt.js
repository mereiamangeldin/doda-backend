const jwt = require("jsonwebtoken");
const config = require("../config/auth.config")


verifyToken = (req, res, next) => {
    let authHeader = req.headers["authorization"];
    if (!authHeader) {
        return res.status(403).send({
            message: "No token provided!"
        });
    }

    const tokenArray = authHeader.split(" ");
    if (tokenArray.length !== 2 || tokenArray[0].toLowerCase() !== "bearer") {
        return res.status(401).send({
            message: "Invalid token format!"
        });
    }

    const token = tokenArray[1];

    jwt.verify(token,
        config.secret,
        (err, decoded) => {
            if (err) {
                return res.status(401).send({
                    message: "Unauthorized!",
                });
            }
            req.userId = decoded.id;
            next();
        });
}

const authJwt = {
    verifyToken:verifyToken
};

module.exports = authJwt;