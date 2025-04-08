const express = require("express");
const router = express.Router();
const orderController = require("../controllers/orderController");

// Route quản lý tài khoản
router.get("/", orderController.getOder);

module.exports = router;
