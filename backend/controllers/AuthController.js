const { UserModel } = require("./../models/User");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

async function login(req, res) {
  const { email, password } = req.body;
  const existingUser = await UserModel.findOne({ email: email });
  if (existingUser) {
    // login functionality
    const password_matched = await bcrypt.compare(
      password,
      existingUser.password
    );
    if (password_matched) {
      const token = jwt.sign({ id: existingUser._id }, process.env.JWT_SECRET);
      res.send({
        success: true,
        message: "Login Successful",
        token: token,
        user: existingUser,
      });
    } else {
      res.send({ success: false, message: "Invalid Credentials" });
    }
  } else {
    // signup functionality
    const salt = await bcrypt.genSalt(10);
    const enc_password = await bcrypt.hash(password, salt);
    const newUser = new UserModel({
      email: email,
      password: enc_password,
    });
    await newUser.save().then((user) => {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.send({
        success: true,
        message: "New User Registered",
        token: token,
        user: newUser,
      });
    });
  }
}

async function validateToken(req, res) {
  const { token } = req.body;
  try {
    const decodedToken = await jwt.verify(token, process.env.JWT_SECRET);
    if (decodedToken) {
      const existingUser = await UserModel.findById({ _id: decodedToken.id });
      if (existingUser) {
        res.send({
          success: true,
          message: "User already exist",
          user: existingUser,
        });
      } else {
        res.send({ success: false, message: "User does not exist" });
      }
    }
  } catch (err) {
    res.send({ success: false, message: "User does not exist" });
  }
}

module.exports = {
  login,
  validateToken,
};
