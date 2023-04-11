const Posts = require("../models/postModel");

// GET REQUEST
exports.posts_get = (req, res) => {
  res.json({
    message: "NOT IMPLEMENTED: POSTS GET REQUEST",
  });
};
// POST REQUEST
exports.posts_post = (req, res) => {
  res.json({
    message: "NOT IMPLEMENTED: POSTS POST REQUEST",
  });
};
// PUT REQUEST
exports.posts_update = (req, res) => {
  res.json({
    message: `NOT IMPLEMENTED: POST ${req.params.postId} PUT REQUEST `,
  });
};
// DELETE REQUEST
exports.posts_delete = (req, res) => {
  res.json({
    message: `NOT IMPLEMENTED: POST ${req.params.postId} DELETE REQUEST `,
  });
};
