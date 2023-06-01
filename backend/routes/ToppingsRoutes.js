const express = require("express");
const { fetchToppings } = require("../controllers/ToppingsController");

const router = express.Router();

router.get("/", fetchToppings);

module.exports = router;
