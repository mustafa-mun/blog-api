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
// PUT REQUEST (EXTRA PROTECTED ROUTE)
router.put(
  "/:postId",
  authController.authenticateToken,
  authController.isAdmin,
  postsController.posts_update
);
router.put(
  "/:postId/publish",
  authController.authenticateToken,
  authController.isAdmin,
  postsController.posts_update_publish
);
// PUT REQUEST (NOT PROTECTED)
router.put("/:postId/like", postsController.posts_like_update);
// DELETE REQUEST (EXTRA PROTECTED ROUTE)
router.delete(
  "/:postId",
  authController.authenticateToken,
  authController.isAdmin,
  postsController.posts_delete
);

/* /posts/comments ROUTES */

// GET REQUEST
router.get("/comments/", commentsController.all_comments_get);
router.get("/:postId/comments/", commentsController.comments_get);
// POST REQUEST
router.post("/:postId/comments/", commentsController.comments_post);
// PUT REQUEST (EXTRA PROTECTED ROUTE)
router.put(
  "/:postId/comments/:commentId",
  authController.authenticateToken,
  authController.isAdmin,
  commentsController.comments_update
);
// PUT REQUEST (NOT PROTECTED)
router.put(
  "/:postId/comments/:commentId/like",
  commentsController.comments_like_post
);
// DELETE REQUEST (EXTRA PROTECTED ROUTE)
router.delete(
  "/:postId/comments/:commentId",
  authController.authenticateToken,
  authController.isAdmin,
  commentsController.comments_delete
);

module.exports = router;
