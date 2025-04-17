var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const ProductsModel=require('./schemas/sanPham');    
const multer = require('multer');
// Route cho kênh người bán



// Cấu hình multer để lưu ảnh vào thư mục public/uploads
const storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/uploads/');
    },
    filename: function (req, file, cb) {
      const uniqueName = Date.now() + '-' + file.originalname;
      cb(null, uniqueName);
    }
  });

  const upload = multer({ storage: storage });

// Route trang tổng quan (dashboard)
router.get('/', (req, res) => {
    ProductsModel.find().then(dsSanPham => {
        res.render('seller-channel', { 
            layout: false,
            dsSanPham,
            activeTab: 'dashboard'
        });
    });
});

// Route quản lý đơn hàng
router.get('/orders', (req, res) => {
    ProductsModel.find().then(dsSanPham => {
        res.render('seller-channel', { 
            layout: false,
            dsSanPham,
            activeTab: 'orders'
        });
    });
});

// Route quản lý sản phẩm
router.get('/products', (req, res) => {
    ProductsModel.find().then(dsSanPham => {
        res.render('seller-channel', { 
            layout: false,
            dsSanPham,
            activeTab: 'products'
        });
    });
});

// Route phân tích bán hàng
router.get('/analytics', (req, res) => {
    ProductsModel.find().then(dsSanPham => {
        res.render('seller-channel', { 
            layout: false,
            dsSanPham,
            activeTab: 'analytics'
        });
    });
});

// Route tài chính
router.get('/finance', (req, res) => {
    ProductsModel.find().then(dsSanPham => {
        res.render('seller-channel', { 
            layout: false,
            dsSanPham,
            activeTab: 'finance'
        });
    });
});

// Route thiết lập shop
router.get('/settings', (req, res) => {
    ProductsModel.find().then(dsSanPham => {
        res.render('seller-channel', { 
            layout: false,
            dsSanPham,
            activeTab: 'settings'
        });
    });
});

// Route thêm sản phẩm
router.post('/save', upload.single('HinhAnh'),(req,res,next)=>{
    req.body=JSON.parse(JSON.stringify(req.body));

    const sp ={
        TenSP: req.body.TenSP,
        MoTa : req.body.MoTa,
        GiaGoc : req.body.GiaGoc,
        SoLuong : req.body.SoLuong,
        MaDM: new mongoose.Types.ObjectId('67fcc63ddcee45aabad6960d'),
        HinhAnh: req.file ? '/uploads/' + req.file.filename : ''
    };

    new ProductsModel(sp).save().then(()=>{
        res.redirect('/seller/products');
    });
});

// Route xóa sản phẩm
router.get('/delete/:id',(req,res,next)=>{
    let id= req.params.id;
    
    ProductsModel.deleteOne({_id:id}).then((err,result)=>{
        res.redirect('/seller/products');
    });
});

module.exports = router;