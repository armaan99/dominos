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

const connectDB = require("./backend/config/db");
connectDB();

const authRoutes = require("./backend/routes/AuthRoutes");
app.use("/api/auth", authRoutes);

const menuRoutes = require("./backend/routes/MenuRoutes");
app.use("/api/menu", menuRoutes);

const toppingsRoutes = require("./backend/routes/ToppingsRoutes");
app.use("/api/toppings", toppingsRoutes);

const cartRoutes = require("./backend/routes/CartRoutes");
app.use("/api/cart", cartRoutes);

if (process.env.NODE_ENV == "production") {
  const path = require("path");
  app.use(express.static(path.resolve(__dirname, "frontend", "build")));
  app.get("*", (req, res) => {
    res.sendFile(path.resolve(__dirname, "frontend", "build", "index.html"));
  });
}

app.listen(4000, () => {
  console.log("Server Running...");
});
