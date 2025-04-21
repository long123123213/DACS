var mongoose=require('mongoose');
const OrderItemSchema = new mongoose.Schema({
    MaOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' },
    MaSP: { type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' },
    Tong: Number
  });
  