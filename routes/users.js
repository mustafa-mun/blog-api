const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");
const authController = require("../controllers/authController");

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
// PUT REQUEST (PROTECTED ROUTE)
router.put(
  "/:userId",
  authController.authenticateToken,
  userController.users_update
);
// DELETE REQUEST (PROTECTED ROUTE)
router.delete(
  "/:userId",
  authController.authenticateToken,
  userController.users_delete
);

module.exports = router;
