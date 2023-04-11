var express = require("express");
var router = express.Router();

/* API explanation. */
router.get("/", function (req, res, next) {
  res.json({
    message: "Welcome to blog api",
    endpoints: {
      users: {
        get: {
          endpoint: "/users",
          explanation: "get all users",
        },
        post: {
          endpoint: "/users",
          explanation: "create new user",
        },
        put: {
          endpoint: "/users/:userId",
          explanation: "update user",
        },
        delete: {
          endpoint: "/users/:userId",
          explanation: "delete user",
        },
      },
      posts: {
        get: {
          endpoint: "/posts",
          explanation: "get all posts",
        },
        post: {
          endpoint: "/posts",
          explanation: "create new post",
        },
        put: {
          endpoint: "/posts/:postId",
          explanation: "update post",
        },
        delete: {
          endpoint: "/posts/:postId",
          explanation: "delete post",
        },
      },
      comments: {
        get: {
          endpoint: "/posts/comments",
          explanation: "get all comments",
        },
        get: {
          endpoint: "/posts/:postId/comments",
          explanation: "get comments on spesific post",
        },
        post: "/posts/comments",
        put: "/posts/comments/:userId",
        delete: "/posts/comments/:userId",
      },
    },
  });
});

module.exports = router;
