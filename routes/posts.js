const express = require("express");
const router = express.Router();

const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");

/* /posts ROUTES */

// GET REQUEST
router.get("/", postsController.posts_get);
// POST REQUEST
router.post("/", postsController.posts_post);
// PUT REQUEST
router.put("/:postId", postsController.posts_update);
// DELETE REQUEST
router.delete("/:postId", postsController.posts_delete);

/* /comments ROUTES */

// GET REQUEST
router.get("/comments/", commentsController.all_comments_get);
router.get("/:postId/comments/", commentsController.comments_get);
// POST REQUEST
router.post("/:postId/comments/", commentsController.comments_post);
// PUT REQUEST
router.put("/:postId/comments/:commentId", commentsController.comments_update);
// DELETE REQUEST
router.delete(
  "/:postId/comments/:commentId",
  commentsController.comments_delete
);

module.exports = router;
