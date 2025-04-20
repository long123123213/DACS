var mongoose=require('mongoose');
const UserBanSchema = new mongoose.Schema({
    TenShop: String,
    Email: String,
    MatKhau: String,
    SDT: String,
    DiaChi: String,
    MaAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' },
    MaKH: { type: mongoose.Schema.Types.ObjectId, ref: 'KhachHang' }
  });
  module.exports=mongoose.model('UserBan',UserBanSchema);