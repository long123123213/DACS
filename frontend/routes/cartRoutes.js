const express = require("express");
const router = express.Router();
const cartController = require("../controllers/cartController");

// Route giỏ hàng
router.get("/", cartController.getCartPage);

module.exports = router;
