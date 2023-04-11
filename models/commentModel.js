const mongoose = require("mongoose");
const Schmea = mongoose.Schema;

const CommentsSchema = new Schmea({
  post_id: { type: Schmea.Types.ObjectId, required: true },
  author: { type: String, required: true },
  content: { type: String, required: true },
  created_at: { type: Date, default: Date.now },
  updated_at: { type: Date, default: Date.now },
  likes: { type: Number, default: 0 },
});

CommentsSchema.virtual("url").get(function () {
  return `/posts/${this.post_id}/comments/${this._id}`;
});

module.exports = new mongoose.model("Comments", CommentsSchema);
