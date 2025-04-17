var mongoose=require('mongoose');
const UserBanSchema = new mongoose.Schema({
    HoTen: String,
    Email: String,
    MatKhau: String,
    SDT: String,
    DiaChi: String,
    MaAdmin: { type: mongoose.Schema.Types.ObjectId, ref: 'Admin' }
  });
  module.exports=mongoose.model('UserBan',UserBanSchema);