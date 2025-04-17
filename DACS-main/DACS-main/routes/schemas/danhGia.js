var mongoose=require('mongoose');
const DanhGiaSchema = new mongoose.Schema({
    NoiDung: String,
    DiemSo: Number,
    NgayDG: Date,
    MaKH: { type: mongoose.Schema.Types.ObjectId, ref: 'KhachHang' },
    MaSP: { type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' }
  });
  