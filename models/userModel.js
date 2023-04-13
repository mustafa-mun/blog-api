const mongoose = require("mongoose");
const Schmea = mongoose.Schema;

const UserSchema = new Schmea({
  first_name: { type: String, required: true },
  last_name: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  password: { type: String, required: true },
});

module.exports = new mongoose.model("User", UserSchema);
