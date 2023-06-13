const { response } = require("express");
const bcrypt = require("bcryptjs");
const User = require("../models/user");
const { generateJWT } = require("../helpers/jwt");

const createUser = async (req, res = response) => {
    const { email, password } = req.body;

    try {
        const existEmail = await User.findOne({ email });

        if (existEmail)
            return res.status(400).json({
                ok: false,
                msg: "Email already exists!",
            });

        const user = new User(req.body);

        // Encrypt password
        const salt = bcrypt.genSaltSync();
        user.password = bcrypt.hashSync(password, salt);

        // Generate JWT
        token = await generateJWT(user.id);
        await user.save();

        res.json({ ok: true, user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Talk with the server admin.",
        });
    }
};

const login = async (req, res) => {
    const { email, password } = req.body;

    try {
        const user = await User.findOne({ email });
        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "Email not found.",
            });
        }

        const validPassord = bcrypt.compareSync(password, user.password);
        if (!validPassord) {
            return res.status(400).json({
                ok: false,
                msg: "Password not valid.",
            });
        }

        // Generate JWT
        token = await generateJWT(user.id);

        res.json({ ok: true, user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Talk with the server admin.",
        });
    }
};

const renewToken = async (req, res) => {
    const uid = req.uid;

    try {
        const user = await User.findById(uid);

        if (!user) {
            return res.status(404).json({
                ok: false,
                msg: "User not found.",
            });
        }

        token = await generateJWT(uid);

        res.json({ ok: true, user, token });
    } catch (error) {
        console.log(error);
        res.status(500).json({
            ok: false,
            msg: "Talk with the server admin.",
        });
    }
};

module.exports = {
    createUser,
    login,
    renewToken,
};
