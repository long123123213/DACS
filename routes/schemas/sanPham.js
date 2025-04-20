var mongoose=require('mongoose');
const SanPhamSchema = new mongoose.Schema({
    TenSP: String,
    MoTa: String,
    GiaGoc: Number,
    SoLuong: Number,
    HinhAnh: String ,
    MaDM: { type: mongoose.Schema.Types.ObjectId, ref: 'DanhMuc' },
    MaUserBan: { type: mongoose.Schema.Types.ObjectId, ref: 'UserBan' }
  });
    module.exports=mongoose.model('SanPham',SanPhamSchema);