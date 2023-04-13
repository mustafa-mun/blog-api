const Comments = require("../models/commentModel");

// GET REQUEST
exports.all_comments_get = (req, res) => {
  // GET ALL COMMENTS
  res.json({
    message: "NOT IMPLEMENTED: ALL COMMENTS GET REQUEST",
  });
};

// GET REQUEST
exports.comments_get = (req, res) => {
  // GET COMMENTS WITH ID
  res.json({
    message: "NOT IMPLEMENTED: ID COMMENTS GET REQUEST",
  });
};
// POST REQUEST
exports.comments_post = (req, res) => {
  res.json({
    message: "NOT IMPLEMENTED: CREATE COMMENT POST REQUEST",
  });
};

exports.comments_like_post = (req, res) => {
  res.json({
    message: "NOT IMPLEMENTED: COMMENTS LIKE POST REQUEST",
  });
};

// PUT REQUEST
exports.comments_update = (req, res) => {
  res.json({
    message: `NOT IMPLEMENTED: POST ${req.params.postId} COMMENT ${req.params.commentId} PUT REQUEST`,
  });
};
// DELETE REQUEST
exports.comments_delete = (req, res) => {
  res.json({
    message: `NOT IMPLEMENTED: POST ${req.params.postId} COMMENT ${req.params.commentId} DELETE REQUEST`,
  });
};
