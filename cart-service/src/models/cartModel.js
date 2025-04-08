const mongoose = require("mongoose");

const CartSchema = new mongoose.Schema({
    productId: { type: String, required: true },
    name: { type: String, required: true },
    price: { type: String, required: true },
    image: { type: String },
    quantity: { type: Number, default: 1 },
}, { timestamps: true });

module.exports = mongoose.model("Cart", CartSchema);
