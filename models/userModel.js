const mongoose = require("mongoose");
const Schmea = mongoose.Schema;

const UserSchema = new Schmea({
  name: { type: String, required: true },
  isAuthorized: { type: Boolean, default: false },
});

UserSchema.virtual("url").get(function () {
  return `/users/${this._id}`;
});

module.exports = new mongoose.model("User", UserSchema);
