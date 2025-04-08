const express = require("express");
const dotenv = require("dotenv");
const connectDB = require("./config/db/cart");
const cartRoutes = require("./src/routes/cartRoutes");
const cors = require("cors");


dotenv.config();
const app = express();
const PORT = process.env.PORT || 5002;

app.use(express.json());
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
connectDB();

app.use("/api/cart", cartRoutes);

app.listen(PORT, () => {
    console.log(`Cart Service đang chạy tại http://localhost:${PORT}`);
});
