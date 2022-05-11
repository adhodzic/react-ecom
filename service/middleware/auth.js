const authenticate = require('../helpers/authentication.helper.js')
const authorize = require('../helpers/authorization_helper.js')
const jwt = require('jsonwebtoken')

function paraseToken(headers){
    const headerToken = headers.authorization;
    const bearerToken = headerToken.split(' ');
    const JWToken = bearerToken[1];
    return JWToken;
}

module.exports = function verifyUser(...userRoles){
    return (req, res, next)=>{
        console.log("we are in middleware");
        const token = paraseToken(req.headers)
        const userData = authenticate(token)
        if(userData == null){
            console.log("Invalid token")
            return res.sendStatus(401)
        }
        const isAuthorized = authorize([...userRoles], userData)
        next();
    }
}