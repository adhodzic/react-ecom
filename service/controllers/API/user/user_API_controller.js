const { UserModel } = require("../../../models/User.js");
const authHelper = require("../../../helpers/authentication.helper")
const jwt = require("jsonwebtoken");

//route: /users
exports.getUser = function () {

    return (req, res) => {
        const {Username} = req.body.userData.user;
    
        UserModel.findOne({ Username }, (err, docs) => {
            if (docs === null) return res.status(401).json({Message:"User not found"});
            console.log(docs)
            if (err) return res.status(500).json({ err: err });

            res.status(200).json({
                Username: docs.Username,
                Role: docs.Role,
                FullName: docs.FullName
            });
        });
    };
};
// /get-all-users
exports.getAllUsers = function () {

    return (req, res) => {
        UserModel.find({}, (err, docs) => {
            if (docs === null) return res.status(401).json({Message:"No users found"});
            console.log(docs)
            if (err) return res.status(500).json({ err: err });
            docs = docs.map(user=>{
                return {
                    Username: user.Username,
                    Role: user.Role,
                    FullName: user.FullName
                }
            })
            res.status(200).json(docs);
        });
    };
};

exports.updateUser = function () {
    return async (req, res) => {
        const data =  req.body.newData;
        const Username = req.body.userData.user.Username;
        console.log({...data}, Username)
        const result = await UserModel.updateOne({Username},{...data});
        return res.status(200).json(result)
    }
}

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
        if (!req.body.Username && !req.body.Password) {
            return res.sendStatus(400);
        }

       const {Username, Password, FullName} = req.body

        const newUser = new UserModel({
            Username,
            Password,
            FullName,
            Role: "User",
        });

        newUser.save(function (err) {
            console.log(err);
            if (err) return res.json({ err: err });
            let {Password, ...userData} = newUser;
            let newToken = authHelper.createToken(userData);
            res.json({
                Token: newToken,
                User: newUser
            });
        });
    };
};
//route: /login
exports.loginUser = function () {
    return (req, res) => {
        if (!req.body.Username || !req.body.Password) {
            return res.status(400).json({Message:"Invalid data for login. Make sure that body is JSON Object and it contains username and password keys"});
        }
        const {Username, Password} = req.body;

        UserModel.findOne({ Username }, async (err, docs) => {
            if (docs === null) return res.status(401).json({error: "Invalid username or password"});

            if (err) return res.status(500).json({ err: err });

          
            const newToken = await authHelper.compareAndCreateToken({Username, Password, Role: docs.Role, UserId: docs._id}, docs.Password);
            if(!newToken) return res.status(401).json({error: "Invalid username or password"})
            res.json({
                User: {
                    UserId: docs._id,
                    Username: docs.Username,
                    Role: docs.Role,
                    FullName: docs.FullName
                },
                Token: newToken
            });
        });
    };
};
