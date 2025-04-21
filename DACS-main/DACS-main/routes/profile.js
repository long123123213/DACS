var express = require('express');
var router = express.Router();
const KhachHang = require('./schemas/khachHang');

// Middleware to check if user is logged in
const isAuthenticated = (req, res, next) => {
    if (req.session.khachHang) {
        next();
    } else {
        res.redirect('/login');
    }
};

// Profile route
router.get('/', isAuthenticated, async (req, res) => {
    try {
        const khachHang = await KhachHang.findById(req.session.khachHang.id);
        if (!khachHang) {
            req.session.destroy();
            return res.redirect('/login');
        }

        res.render('profile', {
            user: {
                username: khachHang.Email,
                hoTen: khachHang.HoTen,
                email: khachHang.Email,
                phone: khachHang.SDT,
                gender: khachHang.GioiTinh || 'male',
                birthDate: khachHang.NgaySinh || '',
                avatar: khachHang.Avatar || '/images/default-avatar.png'
            }
        });
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi server!');
    }
});

// Update profile route
router.post('/', isAuthenticated, async (req, res) => {
    try {
        const { hoTen, phone, gender, birthDate } = req.body;
        
        await KhachHang.findByIdAndUpdate(req.session.khachHang.id, {
            HoTen: hoTen,
            SDT: phone,
            GioiTinh: gender,
            NgaySinh: birthDate
        });

        // Update session name
        req.session.khachHang.hoTen = hoTen;

        res.redirect('/profile');
    } catch (error) {
        console.error(error);
        res.status(500).send('Lỗi server!');
    }
});

module.exports = router; 