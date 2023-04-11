const express = require("express");
const router = express.Router();

const userController = require("../controllers/userController");

/* /users ROUTES */

// GET REQUEST
router.get("/", userController.users_get);
// POST REQUEST
router.post("/", userController.users_post);
// PUT REQUEST
router.put("/:userId", userController.users_update);
// DELETE REQUEST
router.delete("/:userId", userController.users_delete);

module.exports = router;
