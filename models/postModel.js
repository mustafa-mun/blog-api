const mongoose = require("mongoose");
const Schmea = mongoose.Schema;

const PostSchema = new Schmea({
  title: { type: String, required: true },
  author: { type: Schmea.Types.ObjectId, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  tags: [String],
  likes: { type: Number, default: 0 },
  is_published: { type: Boolean, default: false },
});

module.exports = new mongoose.model("Posts", PostSchema);
