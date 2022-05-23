const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/auth.js");
const ROLES = require("../config/roles_list.js");
const userControler = require("../controllers/API/user/user_API_controller.js");


router.route("/").get(verifyUser(ROLES.USER, ROLES.ADMIN), (req, res) => {
    res.json({
        message: "Welcome to our API",
    });
});
router.route("/user")
    .get(verifyUser(ROLES.USER), userControler.getUser())
    .put(verifyUser(ROLES.USER), userControler.updateUser())

router.route("/register")
    .post(userControler.registerUser());

router.route("/login")
    .post(userControler.loginUser());
    
module.exports = router;
