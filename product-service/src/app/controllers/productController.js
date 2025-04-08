    const Product = require("../models/product");
const { mongooseToObject } = require('../../../util/mongoose');

// Lấy danh sách sản phẩm từ MongoDB và gửi cho frontend
const getProduct = async (req, res) => {
    try {
        const product = await Product.find(); // Lấy tất cả sản phẩm từ DB
        console.log("📦 Danh sách sản phẩm gửi về frontend:", product);
        res.json(product); // Gửi JSON về frontend
    } catch (error) {
        res.status(500).json({ message: "Lỗi lấy danh sách sản phẩm" });
    }
};

// [POST] Thêm sản phẩm
const addProduct = async (req, res) => {
    console.log("📌 Dữ liệu nhận được:", req.body); // ✅ Debug dữ liệu từ frontend

    const { name, price, image } = req.body;
    if (!name || !price || !image) {
        return res.status(400).json({ message: "Thiếu thông tin sản phẩm!" });
    }

    try {
        const newProduct = new Product({ name, price, image });
        await newProduct.save();

        res.status(201).json({ message: "Thêm sản phẩm thành công!", product: newProduct });
    } catch (error) {
        console.error("❌ Lỗi khi lưu vào database:", error);
        res.status(500).json({ message: "Lỗi server khi thêm sản phẩm!" });
    }
};

const deleteProduct=async(req,res)=>{
    try {
        const { id } = req.params;
        
        // Kiểm tra xem sản phẩm có tồn tại không
        const product = await Product.findById(id);
        if (!product) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại!" });
        }

        // Xóa sản phẩm
        await Product.findByIdAndDelete(id);
        res.status(200).json({ message: "Xóa sản phẩm thành công!" });
    } catch (error) {
        console.error("❌ Lỗi khi xóa sản phẩm:", error);
        res.status(500).json({ message: "Lỗi server khi xóa sản phẩm!" });
    }
}
const editProduct = async (req, res) => {
    try {
        const { name, price, image } = req.body;
        const updatedProduct = await Product.findByIdAndUpdate(
            req.params.id,
            { name, price, image },
            { new: true }
        );

        if (!updatedProduct) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại!" });
        }

        res.json(updatedProduct);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

module.exports = { getProduct,addProduct , deleteProduct,editProduct};
