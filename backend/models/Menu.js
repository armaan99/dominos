const mongoose = require("mongoose");

const pizza = mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  image_url: { type: String, required: true },
  is_veg: { type: Boolean, required: true },
  is_bestseller: { type: Boolean, required: true },
  is_new: { type: Boolean, required: true },
  size: { type: Object },
});

const sides = mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  image_url: { type: String, required: true },
  is_veg: { type: Boolean, required: true },
  price: { type: Number, required: true },
});

const mania = mongoose.Schema({
  name: { type: String, required: true },
  desc: { type: String, required: true },
  image_url: { type: String, required: true },
  is_veg: { type: Boolean, required: true },
  size: { type: Object },
});

mongoose.pluralize(null);

const PizzaModel = mongoose.model("menu_pizza", pizza);
const DessertModel = mongoose.model("menu-dessert", sides);
const BeveragesModel = mongoose.model("menu_beverages", sides);
const ChickenModel = mongoose.model("menu_chicken", sides);
const CombosModel = mongoose.model("menu_combos", sides);
const ManiaModel = mongoose.model("menu_mania", mania);
const SidesModel = mongoose.model("menu_sides", sides);

module.exports = {
  PizzaModel,
  DessertModel,
  BeveragesModel,
  ChickenModel,
  CombosModel,
  ManiaModel,
  SidesModel,
};
