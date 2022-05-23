const jwt = require("jsonwebtoken");
const bcrypt = require("bcrypt");
exports.authenticate = function(token) {
    try {
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        return decoded
    } catch (err) {
        return null
    }
};

exports.createToken = function (userData, expTime){
    return jwt.sign(
        {
            user: userData
        },
        process.env.JWT_SECRET,
        { expiresIn: expTime }
    );
}

exports.compareAndCreateToken = function (userData, storedPassword, expTime){
    console.log(userData, storedPassword)
    if(!userData?.password || !storedPassword) throw new Error('Both passwords must be provided')
    bcrypt.compare(userData.password, storedPassword,(err,res)=> {
        if (!res) {
            throw new Error('Passwords does not match')
        }
    });
    return exports.createToken(userData, expTime);
}
