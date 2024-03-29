const express = require("express");
const router = express.Router();
const verifyUser = require("../middleware/auth.js");
const ROLES = require("../config/roles_list.js");
const itemGroupController = require("../controllers/API/Item/item_group_API_controller.js");
const itemFieldController = require("../controllers/API/Item/item_field_API_controller.js");
const itemController = require("../controllers/API/Item/item_API_controller.js")
const itemDataController = require("../controllers/API/Item/item_data_API_controller.js")

router.route("/item")
    .get(verifyUser(ROLES.User, ROLES.Admin), itemController.getItems())
    .post(verifyUser(ROLES.Admin), itemController.createItem())
    .put(verifyUser(ROLES.Admin), itemController.updateItem())
    .delete(verifyUser(ROLES.Admin), itemController.deleteItem())

router.route("/item-group")
    .get(verifyUser(ROLES.User, ROLES.Admin), itemGroupController.getAllItemGroups())
    .post(verifyUser(ROLES.Admin), itemGroupController.createItemGroup())
    .put(verifyUser(ROLES.Admin), itemGroupController.updateItemGroup())
    .delete(verifyUser(ROLES.Admin), itemGroupController.deleteItemGroup())

router.route("/item-field")
    .get(verifyUser(ROLES.User, ROLES.Admin), itemFieldController.getItemFields())
    .post(verifyUser(ROLES.Admin), itemFieldController.createItemField())
    .put(verifyUser(ROLES.Admin), itemFieldController.updateItemField())
    .delete(verifyUser(ROLES.Admin), itemFieldController.deleteItemField())

router.route("/item-data")
    .get(verifyUser(ROLES.User, ROLES.Admin), itemDataController.getItemData())
    .post(verifyUser(ROLES.User, ROLES.Admin), itemDataController.createItemData())
    .put(verifyUser(ROLES.User, ROLES.Admin), itemDataController.updateItemData())
    .delete(verifyUser(ROLES.User, ROLES.Admin), itemDataController.deleteItemData())
    
module.exports = router;
