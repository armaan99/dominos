const { ToppingsModel } = require("./../models/Menu");

async function fetchToppings(req, res) {
  const toppings = await ToppingsModel.find({});

  res.send({
    success: true,
    message: "All Toppings Data Fetches from Database",
    data: toppings,
  });
}

module.exports = { fetchToppings };
