const express = require("express");
const router = express.Router();
const homeController = require("../controllers/homeController");

// Route trang chủ
router.get("/", homeController.getHomePage);

module.exports = router;
