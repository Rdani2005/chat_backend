const jwt = require("jsonwebtoken");

const validateJWT = (req, res, next) => {
    const token = req.header("x-token");
    if (!token) {
        return res.status(401).json({
            ok: false,
            msg: "There is not a token on the headers",
        });
    }

    try {
        const { uid } = jwt.verify(token, process.env.SECRET_JWT_KEY);
        req.uid = uid;

        next();
    } catch (error) {
        return res.status(401).json({
            ok: false,
            msg: "Invalid Token.",
        });
    }
};

module.exports = {
    validateJWT,
};
