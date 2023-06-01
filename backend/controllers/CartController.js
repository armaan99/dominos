const { UserModel, CartModel } = require("../models/User");
const { GetIdFromToken } = require("./GetIdFromToken");

async function addItemToCart(req, res) {
  const token = req.params.token;
  const userId = await GetIdFromToken(token);
  console.log(token, userId);

  if (userId) {
    const cartItem = new CartModel(req.body);
    await UserModel.findByIdAndUpdate(
      { _id: userId },
      { $push: { cart: cartItem } }
    );
    res.send({ success: true, message: "Item added to cart" });
  } else {
    res.send({ success: false, message: "User not found" });
  }
}

module.exports = { addItemToCart };
