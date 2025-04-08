const express = require("express");
const { getCart, addToCart, updateCart, removeFromCart, clearCart } = require("../controllers/cartController");

const router = express.Router();

router.get("/", getCart);
router.post("/add", addToCart);
router.post("/update", updateCart);  // Thêm route cập nhật
router.post("/remove", removeFromCart);
router.post("/clear", clearCart);

module.exports = router;
