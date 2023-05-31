const mongoose = require("mongoose");

const cart = mongoose.Schema({
  item_id: { type: String, required: true },
  size: { type: String, required: true },
  crust: { type: String, required: true },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  toppings: { type: Array, required: false },
});

const orders = mongoose.Schema({
  order_details: [cart],
  status: { type: String, required: true, default: "Order Accepted" },
  payment_mode: { type: String, required: true },
});

const user = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: [cart],
  address: { type: String, required: false },
  phone_number: { type: Number, required: false },
  orders: [orders],
});

const UserModel = mongoose.model("user", user);

module.exports = { UserModel };
