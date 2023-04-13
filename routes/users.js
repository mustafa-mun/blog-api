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
