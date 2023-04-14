const User = require("../models/userModel");
const bcrypt = require("bcryptjs");
const { body, validationResult } = require("express-validator");

// GET REQUEST
exports.users_get = (req, res, next) => {
  async function findAllUsers() {
    try {
      const users = await User.find({});
      return users;
    } catch (error) {
      return next(error);
    }
  }
  // Find all users
  findAllUsers().then((results) => {
    // Send results
    res.json({
      users: results,
    });
  });
};
// PUT REQUEST
exports.users_update = [
  body("first_name", "firstname can't be empty")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("last_name", "lastname can't be empty!")
    .trim()
    .isLength({ min: 1 })
    .escape(),
  body("username", "username must be minimum 5 characters!")
    .trim()
    .isLength({ min: 5 })
    .escape(),
  body("password", "password must be minimum 8 characters!")
    .trim()
    .isLength({ min: 8 })
    .escape(),
  async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      // There are errors
      return res.status(400).json({ errors: errors.array() });
    } else {
      // Inputs are valid, create updated user
      try {
        // Create a hashed password
        const hashedPassword = await bcrypt.hash(req.body.password, 10);
        // Update user
        const result = await User.findByIdAndUpdate(
          req.params.userId,
          {
            first_name: req.body.first_name,
            last_name: req.body.last_name,
            username: req.body.username,
            password: hashedPassword,
          },
          { new: true }
        );

        if (!result) {
          // Handle user not found
          return res.status(404).json({ error: "User not found!" });
        }
        // User updated, send updated user
        return res.status(200).json({
          user: result,
        });
      } catch (error) {
        // Handle error
        return res.status(400).json({
          error,
        });
      }
    }
  },
];

// PUT REQUEST
exports.users_give_adminship_post = async (req, res) => {
  // GIVE USER ADMINSHIP REQUEST
  try {
    // Find user
    const user = await User.findById(req.params.userId);

    // Handle user is not found
    if (!user) {
      return res.status(404).json({
        error: "User is not found!",
      });
    }
    // Check if user is already an admin
    if (user.is_admin) {
      return res.status(400).json({ error: "User is already an admin" });
    }
    // User is not an admin, give user adminship
    user.is_admin = true;
    const result = await user.save();
    // Return updated user
    return res.status(200).json({ user: result });
  } catch (error) {
    return res.status(400).json({ error });
  }
};

// DELETE REQUEST
exports.users_delete = async (req, res) => {
  try {
    const result = await User.findOneAndDelete({ _id: req.params.userId });
    if (!result) {
      // Handle user not found
      return res.status(404).json({
        error: "User not found!",
      });
    }
    // User is deleted, return the deleted post
    return res.status(200).json({
      deleted_user: result,
    });
  } catch (error) {
    return res.status(400).json({
      error,
    });
  }
};
