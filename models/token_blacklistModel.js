const mongoose = require("mongoose");
const Schema = mongoose.Schema;

const Token_BlacklistSchema = new Schema({
  blacklisted_token: { type: String, required: true },
});

module.exports = new mongoose.model("Token_Blacklist", Token_BlacklistSchema);
