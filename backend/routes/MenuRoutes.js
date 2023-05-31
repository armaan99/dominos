const express = require("express");
const { fetchMenu } = require("../controllers/MenuController");

const router = express.Router();

router.get("/", fetchMenu);

module.exports = router;
