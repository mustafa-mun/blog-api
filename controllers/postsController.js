const Posts = require("../models/postModel");
const { body, validationResult } = require("express-validator");

// GET REQUEST
exports.posts_get = async (req, res) => {
  try {
    const posts = await Posts.find({});
    return res.status(200).json({ posts });
  } catch (error) {
    return res.status(400).json({ error });
  }
};
// POST REQUEST
exports.posts_post = [
  body("title", "Title should be at least 5 characters!")
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body("content", "Content should be at least 50 characters!")
    .trim()
    .isLength({ min: 50 })
    .escape(),
  body("tags")
    .isArray()
    .withMessage("Tags must be an array")
    .custom((value, { req }) => {
      // Check that each tag is a string and not empty
      const validTags = value.every(
        (tag) => typeof tag === "string" && tag.trim().length > 0
      );
      if (!validTags) {
        throw new Error("Tags must be non-empty strings");
      }

      return true;
    }),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors
      return res.status(400).json({ errors: errors.array() });
    } else {
      // Form data is valid create new post with form data.

      const post = new Posts({
        title: req.body.title,
        author: req.user.id,
        content: req.body.content,
        tags: req.body.tags,
      });
      try {
        const result = await post.save();
        return res.status(200).json({
          post: result,
        });
      } catch (error) {
        return res.status(400).json({ error });
      }
    }
  },
];
// PUT REQUEST
exports.posts_update = [
  body("title", "Title should be at least 5 characters!")
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body("content", "Content should be at least 50 characters!")
    .trim()
    .isLength({ min: 50 })
    .escape(),
  body("tags")
    .isArray()
    .withMessage("Tags must be an array")
    .custom((value, { req }) => {
      // Check that each tag is a string and not empty
      const validTags = value.every(
        (tag) => typeof tag === "string" && tag.trim().length > 0
      );
      if (!validTags) {
        throw new Error("Tags must be non-empty strings");
      }

      return true;
    }),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors
      return res.status(400).json({ errors: errors.array() });
    } else {
      // Form data is valid, create new updated post

      try {
        const result = await Posts.findByIdAndUpdate(
          req.params.postId,
          {
            title: req.body.title,
            content: req.body.content,
            updated_at: Date.now(),
            tags: req.body.tags,
          },
          { new: true }
        );
        // Handle if post is not found
        if (!result) {
          return res.status(404).json({
            error: "Post not found!",
          });
        }
        // Post updated, return updated post
        return res.status(200).json({ post: result });
      } catch (error) {
        return res.status(400).json({ error });
      }
    }
  },
];
// DELETE REQUEST
exports.posts_delete = async (req, res) => {
  try {
    const result = await Posts.findOneAndDelete({ _id: req.params.postId });
    if (!result) {
      // Handle post not found
      return res.status(404).json({
        error: "Post not found!",
      });
    }
    // Post is deleted, return the deleted post
    return res.status(200).json({
      deleted_post: result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
