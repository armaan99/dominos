const express = require("express");
const {
  addItemToCart,
  fetchCartItem,
  updateCartItem,
} = require("../controllers/CartController");

const router = express.Router();

router.post("/:token", addItemToCart);
router.get("/:token", fetchCartItem);
router.put("/:token", updateCartItem);

module.exports = router;
