const express = require("express");
const cors = require("cors");
const db= require("./config/db");
const route = require("./routes");
const methodOverride=require('method-override');
require("dotenv").config();



const app = express();
const PORT = process.env.PORT || 5001;
app.use(methodOverride('_method'));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

db.connect();
app.use(cors()); // Cho phép frontend gọi API
app.use(express.json());

route(app);

app.listen(PORT, () => console.log(`🚀 Product Service chạy tại http://localhost:${PORT}`));
