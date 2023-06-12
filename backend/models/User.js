const mongoose = require("mongoose");

const cart = mongoose.Schema({
  item_id: { type: String, required: true },
  size: { type: String, required: false },
  crust: { type: String, required: false },
  qty: { type: Number, required: true },
  price: { type: Number, required: true },
  extra_cheese: { type: Boolean, required: true, default: false },
  toppings: { type: Array, required: false },
});

const orders = mongoose.Schema({
  order_details: [cart],
  amount: { type: Number, required: true },
  status: { type: String, required: true, default: "Waiting for payment" },
  payment: { type: Boolean, required: true, default: false },
});

const address = mongoose.Schema({
  address: { type: String, required: true },
  city: { type: String, required: true },
  state: { type: String, required: true },
});

const user = mongoose.Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  cart: [cart],
  address: [address],
  phone_number: { type: Number, required: false },
  orders: [orders],
});

const UserModel = mongoose.model("user", user);
const CartModel = mongoose.model("cart", cart);
const AddressModel = mongoose.model("address", address);
const OrderModel = mongoose.model("order", orders);

module.exports = { UserModel, CartModel, AddressModel, OrderModel };
