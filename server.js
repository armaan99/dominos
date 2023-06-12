const express = require("express");
const app = express();

const cors = require("cors");
app.use(cors());
const dotenv = require("dotenv");
dotenv.config();

const mongoose = require("mongoose");

mongoose.set("strictQuery", true);

const bodyParser = require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

// database
const connectDB = require("./backend/config/db");
connectDB();

// routes
const authRoutes = require("./backend/routes/AuthRoutes");
const menuRoutes = require("./backend/routes/MenuRoutes");
const toppingsRoutes = require("./backend/routes/ToppingsRoutes");
const cartRoutes = require("./backend/routes/CartRoutes");
const userRoutes = require("./backend/routes/UserRoutes");
const paymentRoutes = require("./backend/routes/PaymentRoutes");
app.use("/api/auth", authRoutes);
app.use("/api/menu", menuRoutes);
app.use("/api/toppings", toppingsRoutes);
app.use("/api/cart", cartRoutes);
app.use("/api/user", userRoutes);
app.use("/api/payment", paymentRoutes);

// listening server during production or deploymeny
if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

// listening server during development
app.listen(4000, () => {
  console.log("Server Running...");
});
