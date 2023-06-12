const express = require("express");
const { checkout, verification } = require("../controllers/PaymentController");

const router = express.Router();

router.post("/checkout/:token", checkout);
router.post("/verification/:token/:id", verification);

module.exports = router;
