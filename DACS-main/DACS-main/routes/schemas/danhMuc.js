var mongoose=require('mongoose');
const DanhMucSchema = new mongoose.Schema({
    TenDM: String,
    HinhAnh : String,
  });
  module.exports=mongoose.model('DanhMuc',DanhMucSchema);