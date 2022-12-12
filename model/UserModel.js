const mongoose = require("mongoose");
const userSchema = require("../schema/userSchema");

const UserModel = mongoose.model("UserModel", userSchema);

module.exports = UserModel;
