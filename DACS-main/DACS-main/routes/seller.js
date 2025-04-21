var express = require('express');
var router = express.Router();
const mongoose = require('mongoose');
const ProductsModel=require('./schemas/sanPham');
const CategoryModel = require('./schemas/danhMuc');    

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
router.get('/',(req,res)=>{
res.render('seller/seller-channel',{
    layout:false,
    activeTab: 'dashboard'
})
})


router.get('/product', async (req, res) => {
    try {
      const item = { TenSP: '', GiaGoc: 0, MoTa: '', SoLuong: 0 };
  
      const [dsSanPham, dsDanhMuc] = await Promise.all([
        ProductsModel.find().populate('MaDM'),
        CategoryModel.find()
      ]);
  
      res.render('seller/seller-product', {
        layout: false,
        item,
        dsSanPham,
        dsDanhMuc,
        activeTab: 'product'
      });
  
    } catch (err) {
      console.error('Lỗi khi lấy sản phẩm hoặc danh mục:', err);
      res.status(500).send('Lỗi server');
    }
  });

  router.get('/product/edit/:id',(req,res)=>{
    let id = req.params.id;
    let item ={TenSP :'',GiaGoc:0,MoTa:'',SoLuong : 0};
    if(id===''){
        res.render('seller/seller-product', {
            layout: false,
            item,
            dsSanPham,
            activeTab: 'product'
        });
    }
    else{
        Promise.all([
    ProductsModel.findById(id).populate('MaDM'),     // lấy 1 item
    ProductsModel.find().populate('MaDM'),     // lấy toàn bộ danh sách
    CategoryModel.find(),
])
.then(([item, dsSanPham,dsDanhMuc]) => {
    res.render('seller/seller-product', {
        layout: false,
        item,
        dsDanhMuc,
        dsSanPham,
        activeTab: 'product'
    });
});
    }

})
// Route thêm sản phẩm
router.post('/product/save', upload.single('HinhAnh'),(req,res,next)=>{
    req.body=JSON.parse(JSON.stringify(req.body));
   
    const sp ={
        id :req.body.id,
        TenSP: req.body.TenSP,
        MoTa : req.body.MoTa,
        GiaGoc : req.body.GiaGoc,
        SoLuong : req.body.SoLuong,
        MaDM: new mongoose.Types.ObjectId(req.body.MaDM),
        HinhAnh: req.file ? '/uploads/' + req.file.filename : ''
    };
    if(typeof sp !="undefined" && sp.id !=""){
        ProductsModel.updateOne({_id:sp.id},
            {
                TenSP:sp.TenSP,
                MaDM : sp.MaDM,
                MoTa:sp.MoTa,
                GiaGoc:parseInt(sp.GiaGoc),
                SoLuong:parseInt(sp.SoLuong),
                ...(sp.HinhAnh && { HinhAnh: sp.HinhAnh })
            }
).then(()=>{
                res.redirect('/seller/product');
            })

}
    else{
 new ProductsModel(sp).save().then(()=>{
        res.redirect('/seller/product');
    });
    }
   
});

// Route xóa sản phẩm
router.get('/product/delete/:id',(req,res,next)=>{
    let id= req.params.id;
    
    ProductsModel.deleteOne({_id:id}).then((result)=>{
        res.redirect('/seller/product');
    });
});


// Route quản lý đơn hàng
router.get('/order', (req, res) => {
        res.render('seller/seller-order', { 
            layout: false,
            activeTab: 'order'
        });
});



// Route phân tích bán hàng
router.get('/analytic', (req, res) => {
    
        res.render('seller/seller-analytic', { 
            layout: false,
           
            activeTab: 'analytic'
        });

});

// Route tài chính
router.get('/finance', (req, res) => {
    
        res.render('seller/seller-finance', { 
            layout: false,
            
            activeTab: 'finance'
        });
  
});

// Route thiết lập shop
router.get('/setting', (req, res) => {
   
        res.render('seller/seller-setting', { 
            layout: false,
            
            activeTab: 'setting'
        });
   
});

// Route mã giảm giá
router.get('/sale', (req, res) => {
   
        res.render('seller/seller-sale', { 
            layout: false,
           
            activeTab: 'sale'
        });
   
});



router.get('/register', (req, res) => {
    res.render('seller-register', { layout: false });
});

module.exports = router;