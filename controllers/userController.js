const User = require("../models/userModel");

// GET REQUEST
exports.users_get = (req, res) => {
  res.json({
    message: "NOT IMPLEMENTED: USERS GET REQUEST",
  });
};
// POST REQUEST
exports.users_post = (req, res) => {
  res.json({
    message: "NOT IMPLEMENTED: USERS POST REQUEST",
  });
};
// PUT REQUEST
exports.users_update = (req, res) => {
  res.json({
    message: `NOT IMPLEMENTED: USER ${req.params.userId} PUT REQUEST `,
  });
};
// DELETE REQUEST
exports.users_delete = (req, res) => {
  res.json({
    message: `NOT IMPLEMENTED: USER ${req.params.userId} DELETE REQUEST `,
  });
};
