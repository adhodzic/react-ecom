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

exports.compareAndCreateToken = async function (userData, storedPassword, expTime){
    if(!userData?.password || !storedPassword) throw new Error('Both passwords must be provided')
    const res = await bcrypt.compare(userData.password, storedPassword)
    if(!res) return false
    return exports.createToken(userData, expTime);
}
