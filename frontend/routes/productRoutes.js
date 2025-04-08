const express = require("express");
const router = express.Router();
const productController = require("../controllers/productController");

// Route quản lý tài khoản

router.post('/',productController.addProduct);
router.delete('/:id',productController.deleteProduct);
router.get('/productt',productController.getProductt);
router.get('/', productController.getProduct);
module.exports = router;
