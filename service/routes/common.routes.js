const express = require('express')
const router = express.Router()
const verifyUser = require('../middleware/auth.js')
const ROLES = require('../config/roles_list.js')
const jwt = require('jsonwebtoken')

router.route('/')
    .get(verifyUser(ROLES.USER, ROLES.ADMIN),(req ,res)=>{
        res.json({
            message: "Welcome to our API"
        })
    })
router.route('/token')
    .get((req, res)=>{
        try{
            const token = jwt.sign({
                data: 'foobar'
              }, process.env.JWT_SECRET, { expiresIn: 60 });
            res.send(token);
        }catch(error){
            console.log(error)
        }   
    })
    
module.exports = router