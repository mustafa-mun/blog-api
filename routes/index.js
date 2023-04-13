const express = require("express");
const router = express.Router();

/* API explanation. */
router.get("/", function (req, res, next) {
  const apiDoc = {
    message:
      "Welcome to my blog api. You can find the endpoints you can use below.",
    endpoints: {
      users: {
        get: {
          endpoint: "/users",
          explanation: "get all users",
          protected_route: false,
        },
        get: {
          endpoint: "/users/signup",
          explanation: "get signup",
          note: "this endpoint needs to be connected with a frontend, it's currenty only available on development env",
          protected_route: false,
        },
        post: {
          endpoint: "/users/signup",
          explanation: "register a new user",
          protected_route: false,
        },
        get: {
          endpoint: "/users/login",
          explanation: "get login",
          note: "this endpoint needs to be connected with a frontend, it's currenty only available on development env",
          protected_route: false,
        },
        post: {
          endpoint: "/users/login",
          explanation: "login",
          protected_route: false,
        },
        post: {
          endpoint: "/users/logout",
          explanation: "logout",
          protected_route: false,
        },
        put: {
          endpoint: "/users/:userId",
          explanation: "update user",
          protected_route: true,
        },
        delete: {
          endpoint: "/users/:userId",
          explanation: "delete user",
          protected_route: true,
        },
      },
      posts: {
        get: {
          endpoint: "/posts",
          explanation: "get all posts",
          protected_route: false,
        },
        post: {
          endpoint: "/posts",
          explanation: "create new post",
          protected_route: true,
        },
        put: {
          endpoint: "/posts/:postId",
          explanation: "update post",
          protected_route: true,
        },
        put: {
          endpoint: "/posts/:postId/publish",
          explanation: "publish a post",
          protected_route: true,
        },
        put: {
          endpoint: "/posts/:postId/like",
          explanation: "like a post",
          protected_route: true,
        },
        delete: {
          endpoint: "/posts/:postId",
          explanation: "delete post",
          protected_route: true,
        },
      },
      comments: {
        get: {
          endpoint: "/posts/comments",
          explanation: "get all comments",
          protected_route: false,
        },
        get: {
          endpoint: "/posts/:postId/comments",
          explanation: "get comments on spesific post",
          protected_route: false,
        },
        post: {
          endpoint: "/posts/:postId/comments",
          explanation: "add a new comment to a spesific post",
          protected_route: true,
        },
        put: {
          endpoint: "/posts/:postId/comments/:commentId",
          explanation: "update a comment on a spesific post",
          protected_route: true,
        },
        put: {
          endpoint: "/posts/:postId/comments/:commentId/like",
          explanation: "like a comment on a spesific post",
          protected_route: true,
        },
        delete: {
          endpoint: "/posts/:postId/comments/:commentId",
          explanation: "delete a comment on a spesific post",
          protected_route: true,
        },
      },
    },
  };

  const prettyJSON = JSON.stringify(apiDoc, null, 2); // 2 spaces for indentation
  res.type("json").send(prettyJSON);
});

module.exports = router;
