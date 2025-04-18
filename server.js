const express = require('express');
const bodyParser = require('body-parser');
const path = require('path');
const session = require('express-session');
var expressLayouts = require('express-ejs-layouts');
const app = express();
const PORT = process.env.PORT || 3000;
const route=require('./routes');
var db=require('./config/db/index');
// Cấu hình EJS
app.set('view engine', 'ejs');
app.set('views', path.join(__dirname, 'views'));
app.use(expressLayouts);
app.set('layout','backend');



// Middleware
app.use(session({
    secret: 'webbanhang-secret-key',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false } // set to true if using HTTPS
}));
app.use((req, res, next) => {
    if (req.session.khachHang) {
        res.locals.hoTen = req.session.khachHang.hoTen;  // Lưu hoTen vào res.locals
    } else {
        res.locals.hoTen = null;  // Nếu không có thông tin user, đặt hoTen là null
    }
    next();  // Tiếp tục với middleware hoặc route tiếp theo
});
app.use(express.urlencoded({ extended: true }));

app.use(express.json());
app.use(express.static(path.join(__dirname, 'public')));


db.connect();
// Khởi động server
app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
}); 

app.use('/',route);