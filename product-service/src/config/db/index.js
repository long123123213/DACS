const mongoose = require('mongoose');

async function connect() {
    try {
        await mongoose.connect('mongodb://localhost:27017/productDB', {
            useNewUrlParser: true,
            useUnifiedTopology: true,
        });
        console.log('✅ Kết nối MongoDB thành công!');
    } catch (error) {
        console.error('❌ Kết nối MongoDB thất bại:', error);
    }
}

module.exports = { connect };
