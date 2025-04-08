const axios = require("axios");

exports.getHomePage = async (req, res) => {
    try {
        const response = await axios.get("http://localhost:5001/api/product"); // Gọi API từ Product Service
        res.render("home", { title: "Trang chủ", products: response.data });
    } catch (error) {
        console.error("Lỗi gọi API:", error.message);
        res.render("home", { title: "Trang chủ", products: [] });
    }
};
