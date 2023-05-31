const mongoose = require("mongoose");
const connectDB = async () => {
  mongoose.connect(`${process.env.MONGO_URL}`);
};
module.exports = connectDB;
