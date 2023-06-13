const jwt = require("jsonwebtoken");

const generateJWT = (uid) => {
    return new Promise((resolve, reject) => {
        const payload = {
            uid,
        };

        jwt.sign(
            payload,
            process.env.SECRET_JWT_KEY,
            {
                expiresIn: "12h",
            },
            (err, token) => {
                if (err) {
                    reject("Could not create JWT");
                } else {
                    resolve(token);
                }
            }
        );
    });
};

module.exports = {
    generateJWT,
};
