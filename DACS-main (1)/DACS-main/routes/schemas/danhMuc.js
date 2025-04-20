var mongoose=require('mongoose');
const DanhMucSchema = new mongoose.Schema({
    TenDM: String,
    MoTa: String,
    MaUserBan: { type: mongoose.Schema.Types.ObjectId, ref: 'UserBan' }
  });
  module.exports=mongoose.model('DanhMuc',DanhMucSchema);