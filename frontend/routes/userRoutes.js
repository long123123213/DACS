const express = require("express");
const router = express.Router();
const userController = require("../controllers/userController");

// Route quản lý tài khoản
router.get('/store',userController.getUserstore)
router.get("/", userController.getUser);

module.exports = router;
