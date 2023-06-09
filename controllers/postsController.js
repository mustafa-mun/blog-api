const Posts = require("../models/postModel");
const { body, validationResult } = require("express-validator");

// GET REQUEST
exports.posts_get = async (req, res) => {
  try {
    // Find all posts and return them.
    const posts = await Posts.find({});
    return res.status(200).json({ posts });
  } catch (error) {
    // Handle error.
    return res.status(400).json({ error });
  }
};
// POST REQUEST
exports.posts_post = [
  // Validate and sanitize inputs
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
        author: req.jwt_token.user.id,
        content: req.body.content,
        tags: req.body.tags,
      });
      try {
        // Save post on database
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
  // Validate and sanitize inputs
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
      // Form data is valid
      try {
        const user = req.jwt_token.user;
        const post = await Posts.findOne({ _id: req.params.postId });

        // Check if user is an admin or the owner of the post
        if (
          user.isAdmin ||
          JSON.stringify(user.id) === JSON.stringify(post.author)
        ) {
          // Find post with it's id and update it with new data.
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
        } else {
          // User is not an admin and trying to update another ones post.
          return res.status(401).json({ error: "Unauthorized" });
        }
      } catch (error) {
        // Handle error
        return res.status(400).json({ error });
      }
    }
  },
];

exports.posts_like_update = async (req, res) => {
  try {
    // Increment post like by 1
    const result = await Posts.findByIdAndUpdate(
      req.params.postId,
      {
        $inc: { likes: 1 },
      },
      { new: true }
    );
    // Handle post not found
    if (!result) {
      return res.status(404).json({
        error: "Post not found!",
      });
    }
    // Post updated, return updated document
    return res.status(200).json({ post: result });
  } catch (error) {
    // Handle error.
    return res.status(400).json({ error });
  }
};

exports.posts_update_publish = async (req, res, next) => {
  try {
    const post = await Posts.findById(req.params.postId);
    // Check if post is already published
    if (!post.is_published) {
      // Post is not published
      // Find post with id and update it's publised status.
      const result = await Posts.findByIdAndUpdate(
        req.params.postId,
        { is_published: true, updated_at: Date.now() },
        { new: true }
      );
      // Handle post is not found.
      if (!result) {
        return res.status(404).json({
          error: "Post is not found!",
        });
      }
      // Post updated, return updated post.
      return res.status(200).json({
        post: result,
      });
    } else {
      // Post is publised already
      return res.status(400).json({
        error: "Post is already published!",
      });
    }
  } catch (error) {
    // Handle error.
    return res.status(400).json({ error });
  }
};

// DELETE REQUEST
exports.posts_delete = async (req, res) => {
  try {
    const user = req.jwt_token.user;
    const post = await Posts.findOne({ _id: req.params.postId });

    // Check if user is an admin or the owner of the post
    if (
      user.isAdmin ||
      JSON.stringify(user.id) === JSON.stringify(post.author)
    ) {
      // Find post with it's id and delete it.
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
    } else {
      // User is not an admin and trying to delete another ones post.
      return res.status(401).json({ error: "Unauthorized" });
    }
  } catch (error) {
    // Handle error
    return res.status(400).json({
      error,
    });
  }
};
