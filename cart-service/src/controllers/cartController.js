const Cart = require("../models/cartModel");

// Lấy giỏ hàng
exports.getCart = async (req, res) => {
    try {
        const cartItems = await Cart.find();
        console.log("🛒 Giỏ hàng:", cartItems);
        res.json({ cart: cartItems });
    } catch (error) {
        console.error("❌ Lỗi lấy giỏ hàng:", error);
        res.status(500).json({ error: "Lỗi server" });
    }
};

// Thêm vào giỏ hàng (Tránh trùng sản phẩm)
exports.addToCart = async (req, res) => {
    console.log("📥 Request body:", req.body);

    const { productId, name, price, image, quantity = 1 } = req.body;

    if (!productId || !name || !price || !image) {
        return res.status(400).json({ message: "Thiếu thông tin sản phẩm!" });
    }

    try {
        let existingItem = await Cart.findOne({ productId });

        if (existingItem) {
            existingItem.quantity += quantity;
            await existingItem.save();
            return res.status(200).json({ message: "Đã cập nhật số lượng sản phẩm trong giỏ hàng!", cart: existingItem });
        }

        const newItem = new Cart({ productId, name, price, image, quantity });
        await newItem.save();
        res.status(201).json({ message: "Sản phẩm đã được thêm vào giỏ hàng!", cart: newItem });
    } catch (error) {
        console.error("❌ Lỗi khi thêm vào DB:", error);
        res.status(500).json({ message: "Lỗi server!" });
    }
};

// Cập nhật số lượng sản phẩm
exports.updateCart = async (req, res) => {
    const { productId, action } = req.body;

    try {
        let cartItem = await Cart.findOne({ productId });

        if (!cartItem) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng" });
        }

        if (action === "increase") cartItem.quantity += 1;
        if (action === "decrease") cartItem.quantity = Math.max(1, cartItem.quantity - 1);
        if (action === "remove") {
            await Cart.deleteOne({ productId });
            return res.json({ message: "Đã xóa sản phẩm khỏi giỏ hàng!" });
        }

        await cartItem.save();
        res.json({ message: "Cập nhật giỏ hàng thành công!", cart: cartItem });
    } catch (error) {
        console.error("❌ Lỗi cập nhật giỏ hàng:", error);
        res.status(500).json({ error: error.message });
    }
};

// Xóa sản phẩm khỏi giỏ hàng
exports.removeFromCart = async (req, res) => {
    const { productId } = req.body;

    try {
        const deletedItem = await Cart.findOneAndDelete({ productId });

        if (!deletedItem) {
            return res.status(404).json({ message: "Sản phẩm không tồn tại trong giỏ hàng" });
        }

        res.json({ message: "Sản phẩm đã bị xóa khỏi giỏ hàng!" });
    } catch (error) {
        console.error("❌ Lỗi khi xóa sản phẩm:", error);
        res.status(500).json({ error: error.message });
    }
};

// Xóa toàn bộ giỏ hàng
exports.clearCart = async (req, res) => {
    try {
        await Cart.deleteMany({});
        res.json({ message: "Đã xóa toàn bộ giỏ hàng!" });
    } catch (error) {
        console.error("❌ Lỗi khi xóa toàn bộ giỏ hàng:", error);
        res.status(500).json({ error: error.message });
    }
};
