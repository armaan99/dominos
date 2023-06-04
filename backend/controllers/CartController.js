const { UserModel, CartModel } = require("../models/User");
const { GetIdFromToken } = require("./GetIdFromToken");

async function addItemToCart(req, res) {
  const token = req.params.token;
  const userId = await GetIdFromToken(token);

  if (userId) {
    const cartItem = new CartModel(req.body);
    await UserModel.findByIdAndUpdate(
      { _id: userId },
      { $push: { cart: cartItem } }
    );
    const cart = await UserModel.findById({ _id: userId }).select(["cart"]);
    res.send({ success: true, message: "Item added to cart", cart: cart.cart });
  } else {
    res.send({ success: false, message: "User not found" });
  }
}

async function fetchCartItem(req, res) {
  const token = req.params.token;
  const userId = await GetIdFromToken(token);
  if (userId) {
    const user = await UserModel.findById({ _id: userId });
    if (user) {
      res.send({
        success: true,
        message: "Cart Items Fetched Successfully",
        cart: user.cart,
      });
    } else {
      res.send({ success: false, message: "User not found" });
    }
  } else {
    res.send({ success: false, message: "User not found" });
  }
}

async function updateCartItem(req, res) {
  const token = req.params.token;
  const userId = await GetIdFromToken(token);
  if (userId) {
    const cartItemId = req.body.cartItemId;
    if (req.body.qty === 0) {
      await UserModel.updateOne(
        { _id: userId },
        {
          $pull: { cart: { _id: cartItemId } },
        }
      );
    } else {
      await UserModel.updateOne(
        { "cart._id": cartItemId },
        {
          $set: { "cart.$.qty": req.body.qty },
        }
      );
    }
    const user = await UserModel.findById({ _id: userId });
    console.log(user);
    res.send({
      success: true,
      message: "Cart Updated",
      cart: user.cart,
    });
  } else {
    res.send({ success: false, message: "User not found" });
  }
}

module.exports = { addItemToCart, fetchCartItem, updateCartItem };
