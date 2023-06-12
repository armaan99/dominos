const express = require("express");
const {
  updateAddress,
  deleteAddress,
} = require("../controllers/UserController");

const router = express.Router();

router.put("/address/:token", updateAddress);
router.post("/address/:token", deleteAddress);

module.exports = router;
