const express = require("express");
const router = express.Router();

const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");
// This is for authenticate tokens
const authController = require("../controllers/authController");

/* /posts ROUTES */

// GET REQUEST
router.get("/", postsController.posts_get);
// POST REQUEST (PROTECTED ROUTE)
router.post("/", authController.authenticateToken, postsController.posts_post);
// PUT REQUEST (PROTECTED ROUTE)
router.put(
  "/:postId",
  authController.authenticateToken,
  postsController.posts_update
);
router.put(
  "/:postId/publish",
  authController.authenticateToken,
  postsController.posts_update_publish
);
// PUT REQUEST (NOT PROTECTED)
router.put("/:postId/like", postsController.posts_like_update);
// DELETE REQUEST (PROTECTED ROUTE)
router.delete(
  "/:postId",
  authController.authenticateToken,
  postsController.posts_delete
);

/* /posts/comments ROUTES */

// GET REQUEST
router.get("/comments/", commentsController.all_comments_get);
router.get("/:postId/comments/", commentsController.comments_get);
// POST REQUEST
router.post("/:postId/comments/", commentsController.comments_post);
// PUT REQUEST (PROTECTED ROUTE)
router.put(
  "/:postId/comments/:commentId",
  authController.authenticateToken,
  commentsController.comments_update
);
// PUT REQUEST (NOT PROTECTED)
router.put(
  "/:postId/comments/:commentId/like",
  commentsController.comments_like_post
);
// DELETE REQUEST (PROTECTED ROUTE)
router.delete(
  "/:postId/comments/:commentId",
  authController.authenticateToken,
  commentsController.comments_delete
);

module.exports = router;
