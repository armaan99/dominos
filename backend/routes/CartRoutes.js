const express = require("express");
const {
  addItemToCart,
  //   updateCartItem,
} = require("../controllers/CartController");

const router = express.Router();

router.post("/:token", addItemToCart);
// router.put("/", updateCartItem);

module.exports = router;
