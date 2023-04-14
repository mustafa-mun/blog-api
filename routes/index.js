const express = require("express");
const router = express.Router();

/* API explanation. */
router.get("/", function (req, res, next) {
  res.redirect("/api-docs");
});

module.exports = router;
