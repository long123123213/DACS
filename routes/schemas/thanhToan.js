var mongoose=require('mongoose');
const ThanhToanSchema = new mongoose.Schema({
    PhuongThuc: String,
    TrangThai: String,
    NgayTT: Date,
    MaOrder: { type: mongoose.Schema.Types.ObjectId, ref: 'Order' }
  });
  