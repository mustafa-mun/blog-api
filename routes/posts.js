const express = require("express");
const router = express.Router();

const postsController = require("../controllers/postsController");
const commentsController = require("../controllers/commentsController");
// This is for authenticate tokens
const authController = require("../controllers/authController");

/**
 * @swagger
 * components:
 *   schemas:
 *     Post:
 *       type: object
 *       required:
 *         - title
 *         - author
 *         - content
 *         - password
 *       properties:
 *         _id:
 *            type: string
 *            description: The auto-generated id of the post
 *         title:
 *            type: string
 *            description: The title of post
 *         author:
 *           type: ObjectId
 *           description: The author of post
 *         content:
 *           type: string
 *           description: The body content of post
 *         created_at:
 *           type: date
 *           description: Date of posts creation
 *         updated_at:
 *           type: date
 *           description: Date of posts updation
 *         tags:
 *           type: array
 *           description: Array of tags
 *         likes:
 *           type: number
 *           description: The number of posts likes
 *         is_published:
 *           type: boolean
 *           description: The publishment status of the post
 *       example:
 *         _id: 64380e6b45bd9a73df7da2c7
 *         title: My programming journey so far…
 *         content: I was that kind of person who started to learn code just by having one…
 *         tags: ["programming", "journey"]
 *         likes: 12
 *         is_published: true
 *         created_at: 2023-04-13T14:15:07.881+00:00
 *         updated_at: 2023-04-13T15:19:55.055+00:00
 *     Comment:
 *       type: object
 *       required:
 *         - post
 *         - name
 *         - mail
 *         - content
 *       properties:
 *         _id:
 *            type: string
 *            description: The auto-generated id of the comment
 *         post:
 *            type: ObjectId
 *            description: The post that comment writted on
 *         name:
 *           type: string
 *           description: Name of the commenter
 *         mail:
 *           type: string
 *           description: E-mail of the commenter
 *         content:
 *           type: string
 *           description: The body content of post
 *         created_at:
 *           type: date
 *           description: Date of posts creation
 *         updated_at:
 *           type: date
 *           description: Date of posts updation
 *         likes:
 *           type: number
 *           description: The number of posts likes
 *       example:
 *         _id: 85676b9febe16j9d61ec0b0d
 *         post: 64380e6b45bd9a73df7da2c7
 *         name: Kyle
 *         mail: kyle@gmail.com
 *         content: Cool post!
 *         created_at: 2023-04-13T14:15:07.881+00:00
 *         updated_at: 2023-04-13T15:19:55.055+00:00
 *         likes: 3
 */

/**
 * @swagger
 * /posts/:
 *   get:
 *     summary: Get all posts
 *     tags:
 *       - Posts
 *     responses:
 *       200:
 *         description: A list of posts
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 *   post:
 *     summary: Creates a new post
 *     security:
 *       - BearerAuth: []
 *     description: Use this endpoint to create a post with the given details.
 *     tags:
 *       - Posts
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post.
 *                 example: My programming journey so far..
 *               content:
 *                 type: string
 *                 description: The body content of the post.
 *                 example: I was that kind of person who started to learn code just by having one motive to make money because...
 *               tags:
 *                 type: array
 *                 description: Array of appropriate tags.
 *                 example: ["programming", "journey"]
 *     responses:
 *       200:
 *         description: The created post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 */

/**
 * @swagger
 * /posts/{postId}:
 *   put:
 *     summary: Update a post
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the post to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *                 description: The title of the post.
 *                 example: My programming journey so far..
 *               content:
 *                 type: string
 *                 description: The body content of the post.
 *                 example: I was that kind of person who started to learn code just by having one motive to make money because...
 *               tags:
 *                 type: array
 *                 description: Array of appropriate tags.
 *                 example: ["programming", "journey"]
 *     responses:
 *       200:
 *         description: The updated post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 *       404:
 *         description: Post not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 *   delete:
 *     summary: Delete a post
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the post to delete.
 *     responses:
 *       200:
 *         description: The deleted post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted_post:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 *       401:
 *         description: Unauthorized
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 *       403:
 *         description: Forbidden
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 *
 *       404:
 *         description: Post not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 */

/**
 * @swagger
 * /posts/{postId}/publish:
 *   put:
 *     summary: Publish a post
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the post to publish.
 *     responses:
 *       200:
 *         description: The published post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 *       403:
 *         description: Forbidden.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 *       404:
 *         description: Post not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 */

/**
 * @swagger
 * /posts/{postId}/like:
 *   put:
 *     summary: Like a post
 *     tags:
 *       - Posts
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the post to like.
 *     responses:
 *       200:
 *         description: The liked post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 post:
 *                   $ref: '#/components/schemas/Post'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 *       403:
 *         description: Forbidden.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 *       404:
 *         description: Post not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 */

/**
 * @swagger
 * /posts/comments:
 *   get:
 *     summary: Get all comments
 *     tags:
 *       - Comments
 *     responses:
 *       200:
 *         description: A list of comments
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 */

/**
 * @swagger
 * /posts/{postId}/comments:
 *   get:
 *     summary: Get comments on the spesific post
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the post to comment.
 *     responses:
 *       200:
 *         description: A list of comments on spesific post
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comments:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *       404:
 *         description: Post not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 *   post:
 *     summary: Creates a new comment
 *     description: Use this endpoint to create a comment with the given details.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the post to comment.
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               name:
 *                 type: string
 *                 description: The name of the commenter.
 *                 example: Kyle
 *               mail:
 *                 type: string
 *                 description: The e-mail of the commenter.
 *                 example: kyle@gmail.com
 *               content:
 *                 type: string
 *                 description: Body of a comment content.
 *                 example: What a cool post!
 *     responses:
 *       200:
 *         description: The created comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 *       404:
 *         description: Post not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 */

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}/like:
 *   put:
 *     summary: Like a comment
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the post to like comment.
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the comment to like.
 *     responses:
 *       200:
 *         description: The liked comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *       401:
 *         description: Unauthorized.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 *       403:
 *         description: Forbidden.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 *       404:
 *         description: Post or Comment not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 */

/**
 * @swagger
 * /posts/{postId}/comments/{commentId}:
 *   put:
 *     summary: Update a comment
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the post to comment.
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the comment to update.
 *     responses:
 *       200:
 *         description: Updated comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 comment:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Bad request.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *       404:
 *         description: Post or Comment not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *
 *   delete:
 *     summary: Deletes a new comment
 *     security:
 *       - BearerAuth: []
 *     description: Use this endpoint to delete a comment.
 *     tags:
 *       - Comments
 *     parameters:
 *       - in: path
 *         name: postId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the post to comment.
 *       - in: path
 *         name: commentId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the comment to update.
 *     produces:
 *       - application/json
 *     responses:
 *       200:
 *         description: The deleted comment
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted_comment:
 *                   $ref: '#/components/schemas/Comment'
 *       400:
 *         description: Invalid input data
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 *       404:
 *         description: Post or Comment not found.
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
 *                   description: A message describing the error.
 */

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
  authController.isAdmin,
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
