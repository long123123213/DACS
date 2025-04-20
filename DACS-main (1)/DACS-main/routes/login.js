var express = require('express');
var router = express.Router();
const jwt = require('jsonwebtoken');
const KhachHang = require('./schemas/khachHang');
const bcrypt = require('bcryptjs');
// Route cho đăng nhập
router.get('/', (req, res) => {
    res.render('login',{ layout : false });    
});
router.post('/', async (req, res) => {
    try {
        const { Email, MatKhau } = req.body;
        const khachHang = await KhachHang.findOne({ Email });
        if (!khachHang) return res.status(400).send('Tài khoản không tồn tại!');

        const isMatch = await bcrypt.compare(MatKhau, khachHang.MatKhau);
        if (!isMatch) return res.status(400).send('Sai mật khẩu!');

        // Lưu thông tin vào session (hoặc cookie nếu muốn)
        req.session.khachHang = {
            id: khachHang._id,
            hoTen: khachHang.HoTen
        };

        res.redirect('/');
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi server!');
    }
});
module.exports = router;