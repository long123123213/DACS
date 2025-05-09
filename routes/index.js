var express = require('express');
var router = express.Router();
var categorySchema = require('./schemas/danhMuc');
/* GET home page. */

router.use('/products',require('./product'));
router.use('/shop', require('./shop'));
router.use('/cart',require('./cart'));
router.use('/seller',require('./seller'));
router.use('/login',require('./login'));
router.use('/register',require('./register'));
router.use('/profile', require('./profile'));
router.use('/blog',require('./blog'));
router.use('/about',require('./about'));
router.use('/contact',require('./contact'));
router.use('/support',require('./support'));
router.get('/', (req, res) => {
    categorySchema.find().then(items=>{
        res.render('index',{
            items
        });
    })
    
});
router.use('/logout',require('./logout'));
module.exports = router;










