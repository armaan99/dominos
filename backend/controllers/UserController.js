const { UserModel, AddressModel } = require("../models/User");
const { GetIdFromToken } = require("./GetIdFromToken");

async function updateAddress(req, res) {
  const token = req.params.token;
  const userId = await GetIdFromToken(token);
  if (userId) {
    const newAddress = new AddressModel({
      address: req.body.address,
      city: req.body.city,
      state: req.body.state,
    });
    const user = await UserModel.findByIdAndUpdate(
      { _id: userId },
      { $push: { address: newAddress } }
    );
    const updatedUser = await UserModel.findById({ _id: userId });
    res.send({
      success: true,
      message: "Address Updated",
      address: updatedUser.address,
    });
  } else {
    res.send({ success: false, message: "User not found" });
  }
}

async function deleteAddress(req, res) {
  const token = req.params.token;
  const userId = await GetIdFromToken(token);
  if (userId) {
    const addressItemId = req.body.addressId;
    await UserModel.updateOne(
      { _id: userId },
      {
        $pull: { address: { _id: addressItemId } },
      }
    );
    const updatedUser = await UserModel.findById({ _id: userId });
    res.send({
      success: true,
      message: "Address Deleted",
      address: updatedUser.address,
    });
  } else {
    res.send({ success: false, message: "User not found" });
  }
}

module.exports = { updateAddress, deleteAddress };
