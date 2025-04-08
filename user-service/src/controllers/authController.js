// authController.js
const User = require("../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
require("dotenv").config();

exports.register = async (req, res) => {
    try {
        const { username, email, password } = req.body;
        console.log("Đăng ký với:", { username, email });
        if (!username || !email || !password) {
            return res.status(400).json({ error: "Vui lòng nhập đủ thông tin" });
        }

        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        const newUser = new User({ username, email, password: hashedPassword });
        await newUser.save();

        res.status(201).json({ message: "Đăng ký thành công!" });
    } catch (error) {
        console.error("Lỗi đăng ký:", error);
        res.status(500).json({ error: error.message });
    }
};

exports.login = async (req, res) => {
    try {
        const { email, password } = req.body;
        console.log("Đăng nhập với email:", email);

        const user = await User.findOne({ email });
        if (!user) {
            console.log("Email không tồn tại:", email);
            return res.status(400).json({ error: "Email không tồn tại" });
        }

        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
            console.log("Mật khẩu không đúng cho email:", email);
            return res.status(400).json({ error: "Mật khẩu không đúng" });
        }

        const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, { expiresIn: "7d" });
        console.log("Token được tạo:", token);
        res.json({ token, user });
    } catch (error) {
        console.error("Lỗi đăng nhập:", error);
        res.status(500).json({ error: "Lỗi đăng nhập" });
    }
};

exports.getUserInfo = async (req, res) => {
    try {
        const token = req.headers.authorization?.split(" ")[1];
        console.log("Token nhận được:", token);
        if (!token) return res.status(401).json({ error: "Không có token" });

        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        console.log("Token giải mã:", decoded);

        const user = await User.findById(decoded.userId).select("-password");
        if (!user) return res.status(404).json({ error: "Người dùng không tồn tại" });

        console.log("Thông tin người dùng:", user);
        res.json({ user });
    } catch (error) {
        console.error("Lỗi lấy thông tin người dùng:", error);
        res.status(500).json({ error: "Lỗi lấy thông tin người dùng" });
    }
};