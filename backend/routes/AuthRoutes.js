const express = require("express");
const { login, validateToken } = require("../controllers/AuthController");

const router = express.Router();

router.post("/login", login);
router.post("/validate_token", validateToken);

module.exports = router;
