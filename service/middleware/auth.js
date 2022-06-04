const authHelper = require('../helpers/authentication.helper.js')
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
        try{
        const token = paraseToken(req.headers)
        const userData = authHelper.authenticate(token)
        if(userData == null){
            console.log("Invalid token")
            return res.sendStatus(401)
        }
        req.body.userData = userData;
        const isAuthorized = authorize([...userRoles], userData)
        next();
        }
        catch(error){
            res.status(500).json({error})
        }
    }
}