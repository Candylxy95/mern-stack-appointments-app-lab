const express = require("express");
const router = express.Router();
const { getUsers } = require("../controllers/users");
//for my own sake to check if userdata has been posted to postman
router.get("/user", getUsers);

module.exports = router;
