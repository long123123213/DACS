var mongoose=require('mongoose');
const GioHangSchema = new mongoose.Schema({
    MaKH: { type: mongoose.Schema.Types.ObjectId, ref: 'KhachHang' }
  });
  module.exports=mongoose.model('GioHang',GioHangSchema);
  