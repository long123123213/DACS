var mongoose=require('mongoose');
const KhuyenMaiSchema = new mongoose.Schema({
    TenKM: String,
    NgayBD: Date,
    NgayKT: Date,
    MoTa: String
  });
  module.exports=mongoose.model('KhuyenMai',KhuyenMaiSchema);