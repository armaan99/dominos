const {
  PizzaModel,
  DessertModel,
  BeveragesModel,
  ChickenModel,
  CombosModel,
  ManiaModel,
  SidesModel,
} = require("./../models/Menu");

async function fetchMenu(req, res) {
  const pizza = await PizzaModel.find({});
  const dessert = await DessertModel.find({});
  const beverages = await BeveragesModel.find({});
  const chicken = await ChickenModel.find({});
  const combos = await CombosModel.find({});
  const mania = await ManiaModel.find({});
  const sides = await SidesModel.find({});

  // console.log(pizza, dessert, beverages, chicken, combos, mania, sides);

  res.send({
    success: true,
    message: "All Menu Data Fetches from Database",
    data: { pizza, dessert, beverages, chicken, combos, mania, sides },
  });
}

module.exports = { fetchMenu };
