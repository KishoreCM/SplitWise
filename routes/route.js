const express = require("express");
const router = express.Router();
const controllers = require("../controllers/controllers");

router.post("/add/users", controllers.createUser);
router.get("/get/users", controllers.getUsers);
router.post("/user/groups", controllers.getUserGroups);
router.post("/add/groups", controllers.createGroup);
router.post("/add/friends", controllers.createFriends);
router.post("/user/group/friends", controllers.getUserGroupFriends);
router.post("/get/group", controllers.getUserFirstGrp);
router.post("/add/expense", controllers.addExpense);
router.post("/delete/expense", controllers.deleteExpense);
router.post("/group/add/friend", controllers.addFriend);
module.exports = router;
