const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

/**
 * @swagger
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       required:
 *         - first_name
 *         - last_name
 *         - username
 *         - password
 *       properties:
 *         _id:
 *            type: string
 *            description: The auto-generated id of the user
 *         first_name:
 *            type: string
 *            description: First name of the user
 *         last_name:
 *           type: string
 *           description: Last name of the user
 *         username:
 *           type: string
 *           description: Username of the user
 *         password:
 *           type: string
 *           description: Password of the user
 *         is_admin:
 *           type: boolean
 *           description: The adminship status of the user
 *       example:
 *         _id: 61711b9febe15e7d61ec0b0c
 *         first_name: Kyle
 *         last_name: Smith
 *         username: adminuser
 *         password: $%a1BcD2eFgH4iJkL6mNoP8qRsT0uVxYz#
 *         is_admin: false
 *     BlacklistedToken:
 *       type: object
 *       required:
 *         - blacklisted_token
 *       properties:
 *         _id:
 *            type: string
 *            description: The auto-generated id of the blacklisted token
 *         blacklisted_token:
 *            type: string
 *            description: Blacklisted Token
 *       example:
 *         _id: 85676b9febe16j9d61ec0b0d
 *         blacklisted_token: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *   securitySchemes:
 *     BearerAuth:
 *       type: http
 *       scheme: bearer
 *       description: JWT authorization token
 */

/**
 * @swagger
 * /users/:
 *   get:
 *     summary: Get all users
 *     tags:
 *       - Users
 *     responses:
 *       200:
 *         description: A list of users
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 users:
 *                   type: array
 *                   items:
 *                     $ref: '#/components/schemas/User'
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
 *
 *
 */

/**
 * @swagger
 * /users/{userId}:
 *   put:
 *     summary: Update a user
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user to update.
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: The first name of the user.
 *                 example: John
 *               last_name:
 *                 type: string
 *                 description: The last name of the user.
 *                 example: Smith
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: johnsmith
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: password123
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
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
 *         description: User not found.
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
 *     summary: Delete a user
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user to delete.
 *     responses:
 *       200:
 *         description: The deleted user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 deleted_user:
 *                   $ref: '#/components/schemas/User'
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
 *         description: User not found.
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
 * /users/signup:
 *   post:
 *     summary: Creates a new user account
 *     description: Use this endpoint to create a new user account with the given details.
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               first_name:
 *                 type: string
 *                 description: The first name of the user.
 *                 example: John
 *               last_name:
 *                 type: string
 *                 description: The last name of the user.
 *                 example: Smith
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: johnsmith
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: password123
 *     responses:
 *       200:
 *         description: The created user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
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
 */

/**
 * @swagger
 * /users/login:
 *   post:
 *     summary: Log in to user accont
 *     description: Use this endpoint to log in to a user account with username and password.
 *     tags:
 *       - Users
 *     produces:
 *       - application/json
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               username:
 *                 type: string
 *                 description: The username of the user.
 *                 example: johnsmith
 *               password:
 *                 type: string
 *                 description: The password of the user.
 *                 example: password123
 *     responses:
 *       200:
 *         description: The logged in user and a jwt token
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
 *                 token:
 *                   type: string
 *                   description: The access token.
 *                   example: eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c
 *       400:
 *          description: Invalid input data
 *          content:
 *            application/json:
 *              schema:
 *                type: object
 *                properties:
 *                  error:
 *                    type: string
 *                    description: A message describing the error.
 */

/**
 * @swagger
 * /users/logout:
 *   post:
 *     summary: Log out a user and blacklist their authentication token
 *     tags:
 *       - Users
 *     security:
 *       - BearerAuth: []
 *     responses:
 *       200:
 *         description: Blacklisted token successfully saved to database
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 result:
 *                   $ref: '#/components/schemas/BlacklistedToken'
 *       400:
 *         description: Invalid request or server error
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 error:
 *                   type: string
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
 */

/**
 * @swagger
 * /users/{userId}/adminship:
 *   put:
 *     summary: Give user adminship
 *     security:
 *       - BearerAuth: []
 *     tags:
 *       - Users
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: string
 *         required: true
 *         description: The id of the user to give adminship.
 *     responses:
 *       200:
 *         description: The updated user
 *         content:
 *           application/json:
 *             schema:
 *               type: object
 *               properties:
 *                 user:
 *                   $ref: '#/components/schemas/User'
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
 *         description: User not found.
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

/* /users ROUTES */

// GET REQUEST
router.get("/", userController.users_get);
// GET REQUEST
router.get("/signup", authController.get_signup);
// POST REQUEST
router.post("/signup", authController.post_signup);
// GET REQUEST
router.get("/login", authController.get_login);
// POST REQUEST
router.post("/login", authController.post_login);
// POST REQUEST (PROTECTED ROUTE)
router.post(
  "/logout",
  authController.authenticateToken,
  authController.post_logout
);
// PUT REQUEST (EXTRA PROTECTED ROUTE)
router.put(
  "/:userId",
  authController.authenticateToken,
  authController.isAdmin,
  userController.users_update
);
// PUT REQUEST (EXTRA PROTECTED ROUTE)
router.put(
  "/:userId/adminship",
  authController.authenticateToken,
  authController.isAdmin,
  userController.users_give_adminship_post
);
// DELETE REQUEST (EXTRA PROTECTED ROUTE)
router.delete(
  "/:userId",
  authController.authenticateToken,
  authController.isAdmin,
  userController.users_delete
);

module.exports = router;
