const { UserModel } = require("../../../models/User.js");
const authHelper = require("../../../helpers/authentication.helper")
const jwt = require("jsonwebtoken");

//route: /users
exports.getUsers = function () {

    return (req, res) => {
        console.log(req.body);
        res.sendStatus(200);
    };
};

exports.deleteUser = function () {

    return (req, res) => {
        console.log(req.body);
        res.sendStatus(200);
    };
};
//route: /register
exports.registerUser = function () {

    return (req, res) => {
        console.log(req.body);
        if (!req.body.username && !req.body.password) {
            return res.sendStatus(400);
        }

        const username = req.body.username;
        const password = req.body.password;

        const newUser = new UserModel({
            username: username,
            password: password,
            role: "User",
        });

        newUser.save(function (err) {
            console.log(err);
            if (err) return res.json({ err: err });
            let {password, ...userData} = newUser;
            let newToken = authHelper.createToken(userData, 480);
            res.json({
                token: newToken,
                user: newUser
            });
        });
    };
};
//route: /login
exports.loginUser = function () {
    return (req, res) => {
        if (!req.body.username || !req.body.password) {
            return res.status(400).json({Message:"Invalid data for login. Make sure that body is JSON Object and it contains username and password keys"});
        }
        try {
            const {username, password} = req.body;

            UserModel.findOne({ username }, (err, docs) => {
                if (docs === null) return res.status(401).json({Message:"User not found"});

                if (err) return res.status(500).json({ err: err });

                const newToken = authHelper.compareAndCreateToken({username, password}, docs.password, 480);

                res.json({
                    username: username,
                    role: docs.role,
                    token: newToken
                });
            });
        } catch (error) {
            res.status(500).json({error});
        }
    };
};
