const mongoose = require("mongoose");
const Schmea = mongoose.Schema;

const UserSchema = new Schmea({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

UserSchema.virtual("url").get(function () {
  return `/users/${this._id}`;
});

module.exports = new mongoose.model("User", UserSchema);
