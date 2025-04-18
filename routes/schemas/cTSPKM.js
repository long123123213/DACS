var mongoose=require('mongoose');
const CTSPKMSchema = new mongoose.Schema({
    MaSP: { type: mongoose.Schema.Types.ObjectId, ref: 'SanPham' },
    MaKM: { type: mongoose.Schema.Types.ObjectId, ref: 'KhuyenMai' },
    PhanTramGiam: Number
  });
  