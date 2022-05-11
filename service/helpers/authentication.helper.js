const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.authenticate = function(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded
    } catch (err) {
        console.log(err)
        return null
    }
};

exports.createToken = function (userData, storedPassword, expTime){
    bcrypt.compare(userData.password, storedPassword,(result)=> {
        if (!result) {
            throw new Error('Passwords does not match')
        }
    });
    let token = jwt.sign(
        {
            user: userData
        },
        process.env.JWT_SECRET,
        { expiresIn: expTime }
    );
    console.log(token)
    return token;
}
