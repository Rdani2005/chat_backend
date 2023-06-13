/**
 * path: api/login
 */

const { Router } = require("express");
const { check } = require("express-validator");

const { createUser, login, renewToken } = require("../controllers/auth");
const { validateFields } = require("../middlewares/fields-validate");
const { validateJWT } = require("../middlewares/validate-jwt");

const router = Router();

router.post(
    "/new",
    [
        check("name", "Name is required").not().isEmpty(),
        check("email", "email is required").not().isEmpty(),
        check("password", "password is required").not().isEmpty(),
        check("email", "The given email is not an email").isEmail(),
    ],
    validateFields,
    createUser
);

router.post(
    "/",
    [
        check("email", "email is required").not().isEmpty(),
        check("password", "password is required").not().isEmpty(),
        check("email", "The given email is not an email").isEmail(),
    ],
    validateFields,
    login
);

router.get("/renew", validateJWT, renewToken);

module.exports = router;
