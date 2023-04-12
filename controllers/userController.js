const User = require("../models/userModel");

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
// POST REQUEST
exports.users_post = (req, res, next) => {
  // This request needs html form for req.body
  async function createUser() {
    try {
      const user = new User({
        name: req.body.name,
      });
      const result = await user.save();
      return res.json({
        user: result,
      });
    } catch (error) {
      res.status(404).json({
        error,
        status: 404,
      });
    }
  }

  createUser();
};
exports.users_update = (req, res) => {
  async function updateUser() {
    try {
      const newUser = {
        name: req.body.name,
        _id: req.params.userId,
      };
      const result = await User.findOneAndUpdate(
        { _id: req.params.userId },
        newUser,
        { new: true }
      );
      if (result) {
        res.json({
          updated_user: result,
        });
      } else {
        res.status(404).json({
          error: "User not found",
        });
      }
    } catch (error) {
      res.status(401).json({
        error,
      });
    }
  }

  updateUser();
};

// DELETE REQUEST
exports.users_delete = (req, res) => {
  async function deleteUser() {
    try {
      const result = await User.deleteOne({ _id: req.params.userId });
      if (result.deletedCount === 1) {
        return res.status(204).json({
          deleted_user: result,
        });
      } else {
        return res.status(404).json({
          error: "User not found",
        });
      }
    } catch (error) {
      return res.status(404).json({
        error,
      });
    }
  }

  deleteUser();
};
