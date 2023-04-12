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
// PUT REQUEST
exports.users_update = (req, res) => {
  // This request needs html form for req.body
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
      return res.json({
        updated_user: result,
      });
    } catch (error) {
      res.status(401).json({
        error,
        status: 401,
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
      return res.json({
        deleted_user: result,
        status: 200,
      });
    } catch (error) {
      return res.status(401).json({
        error,
        status: 401,
      });
    }
  }

  deleteUser();
};
