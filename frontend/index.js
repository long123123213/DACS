const path = require("path");
const express = require("express");
const exphbs = require("express-handlebars");
const route=require('./routes');
const app = express();

const PORT = process.env.PORT || 3000;

// Cấu hình Handlebars
app.engine("hbs", exphbs.engine({
    extname: "hbs",
    defaultLayout: "main",
    layoutsDir: path.join(__dirname, "views/layouts"),
    partialsDir: path.join(__dirname, "views/partials"),
    helpers: {
        json: function (context) {
            return JSON.stringify(context);
        }
    }
}));
app.set("view engine", "hbs");
app.set("views", path.join(__dirname, "views"));

// Middleware
app.use(express.static( 'public'));

// Sử dụng routes
route(app);

// Chạy server
app.listen(PORT, () => console.log(`🚀 Frontend chạy trên http://localhost:${PORT}`));
