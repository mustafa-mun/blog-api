var express = require("express");
var router = express.Router();

/* GET home page. */
router.get("/", function (req, res, next) {
  res.json({
    message: "Welcome to blog api",
    endpoints: {
      users: {
        get: "/users",
        post: "/users",
        put: "/users/:userId",
        delete: "/users/:userId",
      },
      posts: {
        get: "/posts",
        post: "/posts",
        put: "/posts/:userId",
        delete: "/posts/:userId",
      },
      comments: {
        get: "/comments",
        post: "/comments",
        put: "/comments/:userId",
        delete: "/comments/:userId",
      },
    },
  });
});

module.exports = router;
