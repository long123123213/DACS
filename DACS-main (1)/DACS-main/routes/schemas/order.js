var mongoose=require('mongoose');
const OrderSchema = new mongoose.Schema({
    NgayLap: Date,
    TongTien: Number,
    MaGH: { type: mongoose.Schema.Types.ObjectId, ref: 'GioHang' }
  });
  module.exports=mongoose.model('Order',OrderSchema);