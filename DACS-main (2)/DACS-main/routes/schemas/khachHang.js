var mongoose=require('mongoose');
const KhachHangSchema = new mongoose.Schema({
    HoTen: String,
    Email: String,
    MatKhau: String,
    SDT: String,
    DiaChi: String
  });
  module.exports=mongoose.model('KhachHang',KhachHangSchema);