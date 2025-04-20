var mongoose=require('mongoose');
const VanChuyenSchema = new mongoose.Schema({
    TenDonVi: String,
    PhiVC: Number,
    ThoiGianDuKien: String,
    MaOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
  });
  module.exports=mongoose.model('VanChuyen',VanChuyenSchema);
  