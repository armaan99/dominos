const { OrderModel, UserModel } = require("../models/User");
const { GetIdFromToken } = require("./GetIdFromToken");

// razorpay
const Razorpay = require("razorpay");
const crypto = require("crypto");
const instance = new Razorpay({
  key_id: process.env.RAZORPAY_KEY_ID,
  key_secret: process.env.RAZORPAY_KEY_SECRET,
});

async function checkout(req, res) {
  const token = req.params.token;
  const userId = await GetIdFromToken(token);
  const options = {
    amount: req.body.amount * 100, //converting paise to rupees
    currency: "INR",
  };
  const order = await instance.orders.create(options);
  const new_order = new OrderModel({
    order_details: req.body.cart,
    amount: req.body.amount,
  });
  await UserModel.findByIdAndUpdate(
    { _id: userId },
    { $push: { orders: new_order } }
  );
  res.send({ success: true, order: order, id: new_order._id });
}

async function verification(req, res) {
  const { razorpay_order_id, razorpay_payment_id, razorpay_signature } =
    req.body;
  const body = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSignature = crypto
    .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET)
    .update(body.toString())
    .digest("hex");
  const isAuthentic = expectedSignature === razorpay_signature;
  if (isAuthentic) {
    const user = await UserModel.updateOne(
      { "orders._id": req.params.id },
      {
        $set: { "orders.$.payment": true, "orders.$.status": "Order Recieved" },
      }
    );
    const token = req.params.token;
    const userId = await GetIdFromToken(token);
    await UserModel.findByIdAndUpdate({ _id: userId }, { cart: [] });
    res.redirect("http://localhost:3000/orderHistory");
  } else {
    res.send({ success: false, message: "payment failed" });
  }
}

module.exports = { checkout, verification };
