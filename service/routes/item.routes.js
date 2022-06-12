const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/auth.js");
const ROLES = require("../config/roles_list.js");
const itemGroupControler = require("../controllers/API/Item/item_group_API_controller.js");


router.route("/item-group")
    .get(verifyUser(ROLES.User, ROLES.Admin), itemGroupControler.getAllItemGroups())
    .post(verifyUser(ROLES.Admin), itemGroupControler.createItemGroup())
    .put(verifyUser(ROLES.Admin), itemGroupControler.updateItemGroup())
    
module.exports = router;
