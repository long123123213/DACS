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
    let item ={TenSP :'',GiaGoc:0,MoTa:'',SoLuong : 0};
    ProductsModel.find().then(dsSanPham => {
        res.render('seller-channel', { 
            layout: false,
            item,
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

// Route mã giảm giá
router.get('/promotion', (req, res) => {
    ProductsModel.find().then(dsSanPham => {
        res.render('seller-channel', { 
            layout: false,
            dsSanPham,
            activeTab: 'promotion'
        });
    });
});
router.get('/edit/:id',(req,res)=>{
    let id = req.params.id;
    let item ={TenSP :'',GiaGoc:0,MoTa:'',SoLuong : 0};
    if(id===''){
        res.render('seller-channel', {
            layout: false,
            item,
            dsSanPham,
            activeTab: 'products'
        });
    }
    else{
        Promise.all([
    ProductsModel.findById(id),     // lấy 1 item
    ProductsModel.find()            // lấy toàn bộ danh sách
])
.then(([item, dsSanPham]) => {
    res.render('seller-channel', {
        layout: false,
        item,
        dsSanPham,
        activeTab: 'products'
    });
});
    }

})
// Route thêm sản phẩm
router.post('/save', upload.single('HinhAnh'),(req,res,next)=>{
    req.body=JSON.parse(JSON.stringify(req.body));
   
    const sp ={
        id :req.body.id,
        TenSP: req.body.TenSP,
        MoTa : req.body.MoTa,
        GiaGoc : req.body.GiaGoc,
        SoLuong : req.body.SoLuong,
        MaDM: new mongoose.Types.ObjectId('67fcc63ddcee45aabad6960d'),
        HinhAnh: req.file ? '/uploads/' + req.file.filename : ''
    };
    if(typeof sp !="undefined" && sp.id !=""){
        ProductsModel.updateOne({_id:sp.id},
            {
                TenSP:sp.TenSP,
                MoTa:sp.MoTa,
                GiaGoc:parseInt(sp.GiaGoc),
                SoLuong:parseInt(sp.SoLuong),
            }
).then(()=>{
                res.redirect('/seller/');
            })

}
    else{
 new ProductsModel(sp).save().then(()=>{
        res.redirect('/seller/');
    });
    }
   
});

// Route xóa sản phẩm
router.get('/delete/:id',(req,res,next)=>{
    let id= req.params.id;
    
    ProductsModel.deleteOne({_id:id}).then((result)=>{
        res.redirect('/seller/');
    });
});

router.get('/register', (req, res) => {
    res.render('seller-register', { layout: false });
});

module.exports = router;