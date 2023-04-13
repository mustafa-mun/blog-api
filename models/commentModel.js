const mongoose = require("mongoose");
const Schmea = mongoose.Schema;

const CommentsSchema = new Schmea({
  post: { type: Schmea.Types.ObjectId, required: true },
  name: { type: String, required: true },
  mail: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
});

module.exports = new mongoose.model("Comments", CommentsSchema);
