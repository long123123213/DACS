var mongoose=require('mongoose');
const ChiTietCartItemSchema = new mongoose.Schema({
    MaGH: { type: mongoose.Schema.Types.ObjectId, ref: 'GioHang' },
    MaSP: { type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' },
    SoLuong: Number,
    Size: String,
    Color: String
  });
  