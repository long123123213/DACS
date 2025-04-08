const express = require('express');
const Product = require('../app/models/product');
const{addProduct,getProduct,deleteProduct,editProduct}
=require('../app/controllers/productController');
const router = express.Router();

router.post('/product', addProduct);
router.delete('/product/:id',deleteProduct);
router.put('/product/:id',editProduct);
router.get('/product', getProduct);


module.exports = router;
