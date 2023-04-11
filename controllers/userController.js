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
  // This request needs html element for req.body
  async function createUser() {
    try {
      const user = new User({
        name: req.body.name,
      });
      const result = await user.save();
      return result;
    } catch (error) {
      return next(error);
    }
  }

  createUser()
    .then((result) => {
      res.json({
        user: result,
      });
    })
    .catch((error) => {
      res.json({
        error,
        status: 404,
      });
    });
};
// PUT REQUEST
exports.users_update = (req, res, next) => {
  // This request needs html element for req.body
  async function updateUser() {
    try {
      const newUser = {
        name: req.body.name,
        _id: req.params.id,
      };
      const result = await User.findOneAndUpdate(
        { _id: req.params.id },
        newUser,
        { new: true }
      );
      return result;
    } catch (error) {
      return next(error);
    }
  }

  updateUser()
    .then((result) => {
      res.json({
        user: result,
      });
    })
    .catch((error) => {
      res.json({
        error,
        status: 401,
      });
    });
};
// DELETE REQUEST
exports.users_delete = (req, res, next) => {
  // This request needs html element for req.body
  async function deleteUser() {
    try {
      await User.deleteOne({ _id: req.params.id });
    } catch (error) {
      return next(error);
    }
  }

  deleteUser()
    .then(() => {
      res.json({
        status: 200,
      });
    })
    .catch((error) => {
      res.json({
        status: 401,
      });
    });
};
