const mongoose = require('mongoose');
const slug=require('mongoose-slug-updater');
const mongooseDelete=require('mongoose-delete');
mongoose.plugin(slug);

const Schema = mongoose.Schema;

const productSchema = new Schema({
    name: { type: String, required : true },
    description: { type: String },
    image: { type: String, },
    price:{type:String,},
    slug:{type: String, slug:'name',unique:true},
   
},{timestamps:true,});




module.exports = mongoose.model('product', productSchema);
