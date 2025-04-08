const axios = require("axios");

// 🛒 Lấy danh sách sản phẩm từ Backend và render ra trang
exports.getProduct = async (req, res) => {
    try {
        const response = await axios.get("http://localhost:5001/api/product"); // Gọi API từ Product Service
        res.render("product", { 
            title: "Quản lý sản phẩm", 
            products: response.data 
        });
    } catch (error) {
        console.error("❌ Lỗi gọi API:", error.message);
        res.render("product", { 
            title: "Trang chủ", 
            products: [] 
        });
    }
};
exports.getProductt = (req,res) => {
res.render('productt');
};

// ➕ Thêm sản phẩm mới bằng cách gửi request đến Backend
exports.addProduct = async () => {
    const data = req.body;

    try {
        const response = await fetch("http://localhost:5001/api/product", {
            method: "POST",
            headers: {
                "Content-Type": "application/json",
            },
            body: JSON.stringify(data),
        });

        const result = await response.json();
        console.log("✅ Thành công:", result);
    } catch (error) {
        console.error("❌ Lỗi gửi request:", error);
    }
};

exports.deleteProduct=async(req,res)=>{
    // const { id } = req.params; // Lấy ID sản phẩm từ request

    // try {
    //     const response = await fetch(`http://localhost:5001/api/product/${id}`, {
    //         method: "DELETE",
    //         headers: {
    //             "Content-Type": "application/json",
    //         },
    //     });

    //     const result = await response.json();
    //     console.log("✅ Xóa thành công:", result);
    //     res.redirect("/product"); // Reload trang sau khi xóa
    // } catch (error) {
    //     console.error("❌ Lỗi khi xóa sản phẩm:", error);
    //     res.redirect("/product");
    // }
};


