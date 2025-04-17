var mongoose=require('mongoose');
const LSGHSchema = new mongoose.Schema({
    TrangThai: String,
    NgayCapNhat: Date,
    MaOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
  });
  