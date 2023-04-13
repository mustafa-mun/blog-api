const Comments = require("../models/commentModel");
const { body, validationResult } = require("express-validator");

// GET REQUEST
exports.all_comments_get = async (req, res) => {
  // GET ALL COMMENTS
  try {
    // Find all comments and return them
    const comments = await Comments.find({});
    return res.status(200).json({ comments });
  } catch (error) {
    // Handle errors
    return res.status(400).json({ error });
  }
};

// GET REQUEST
exports.comments_get = async (req, res) => {
  // GET COMMENTS WITH ID
  try {
    // Find posts comments
    const comments = await Comments.find({ post: req.params.postId });
    // Return comments
    return res.status(200).json({ comments });
  } catch (error) {
    // Handle error
    return res.status(400).json({ error });
  }
};
// POST REQUEST
exports.comments_post = [
  // Validate and sanitize inputs
  body("name", "Name can't be empty!").trim().isLength({ min: 1 }).escape(),
  body("mail", "Please enter a valid email address").trim().isEmail().escape(),
  body("content", "Comment can't be empty!")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // Input is valid, create new comment
    const comment = new Comments({
      post: req.params.postId,
      name: req.body.name,
      mail: req.body.mail,
      content: req.body.content,
    });
    try {
      // Save comment on database
      const result = await comment.save();
      // Return new comment
      return res.status(200).json({ comment: result });
    } catch (error) {
      // Handle error
      return res.status(400).json({ error });
    }
  },
];

exports.comments_like_post = async (req, res) => {
  try {
    // Increment comments like by 1
    const result = await Comments.findByIdAndUpdate(
      req.params.commentId,
      {
        $inc: { likes: 1 },
      },
      { new: true }
    );
    // Handle comment not found
    if (!result) {
      return res.status(404).json({
        error: "Comment not found!",
      });
    }
    // Comment updated, return updated document
    return res.status(200).json({ comment: result });
  } catch (error) {
    // Handle error.
    return res.status(400).json({ error });
  }
};

// PUT REQUEST
exports.comments_update = [
  // Validate and sanitize inputs
  body("name", "Name can't be empty!").trim().isLength({ min: 1 }).escape(),
  body("mail", "Please enter a valid email address").trim().isEmail().escape(),
  body("content", "Comment can't be empty!")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  async (req, res) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors
      return res.status(400).json({
        errors: errors.array(),
      });
    }
    // Input is valid, create updated comment
    const updatedComment = new Comments({
      name: req.body.name,
      mail: req.body.mail,
      content: req.body.content,
      _id: req.params.commentId,
    });

    try {
      // Update comment and save it on database.
      const result = await Comments.findByIdAndUpdate(
        req.params.commentId,
        updatedComment,
        { new: true }
      );
      // Return new comment
      return res.status(200).json({ comment: result });
    } catch (error) {
      // Handle error
      return res.status(400).json({ error });
    }
  },
];
// DELETE REQUEST
exports.comments_delete = async (req, res) => {
  try {
    const result = await Comments.findOneAndDelete({
      _id: req.params.commentId,
    });
    // Handle comment is not found
    if (!result) {
      return res.status(404).json({
        error: "Comment is not found!",
      });
    }
    // Return the deleted comment
    return res.status(200).json({ deleted_comment: result });
  } catch (error) {
    // Handle errror
    return res.status(400).json({ error });
  }
};
