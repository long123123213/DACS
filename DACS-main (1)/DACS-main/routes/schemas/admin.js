var mongoose=require('mongoose');

const AdminSchema = new mongoose.Schema({
    TenTK: String,
    Mk: String,
    VaiTro: String
  });
  module.exports=mongoose.model('Admin',AdminSchema);