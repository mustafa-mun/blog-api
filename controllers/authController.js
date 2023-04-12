const User = require("../models/userModel");
const Token_Blacklist = require("../models/token_blacklistModel");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const passportJWT = require("passport-jwt");
const LocalStrategy = require("passport-local");
const JWTStrategy = passportJWT.Strategy;
const ExtractJWT = passportJWT.ExtractJwt;
require("dotenv").config();
const { body, validationResult } = require("express-validator");

/* USE REFRESH TOKENS! */

passport.use(
  new LocalStrategy(async (username, password, done) => {
    try {
      const user = await User.findOne({ username: username });
      if (!user) {
        return done(null, false, { message: "Incorrect username" });
      }
      const passwordsMatch = await bcrypt.compare(password, user.password);
      if (passwordsMatch) {
        // passwords match! log user in
        return done(null, user);
      } else {
        // passwords do not match!
        return done(null, false, { message: "Incorrect password" });
      }
    } catch (err) {
      return done(err);
    }
  })
);

passport.use(
  new JWTStrategy(
    {
      jwtFromRequest: ExtractJWT.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET_TOKEN_KEY,
    },
    async function (jwtPayload, cb) {
      try {
        const user = await User.findOneById(jwtPayload.id);
        if (!user) {
          return cb(null, false, { message: "Incorrect username" });
        }
        return cb(null, user);
      } catch (err) {
        return cb(err);
      }
    }
  )
);

// Auth jwt token.
exports.authenticateToken = async (req, res, next) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];
  const list_token = await Token_Blacklist.findOne({
    blacklisted_token: token,
  });
  // Unauthorized
  if (token == null)
    return res.status(401).json({
      error: "Invalid request.",
      message: "You are unauthorized.",
    });
  if (list_token) {
    return res.status(401).json({
      error: "Invalid request.",
      message: "You are unauthorized.",
    });
  }

  jwt.verify(token, process.env.JWT_SECRET_TOKEN_KEY, (err, user) => {
    if (err)
      // Forbidden
      return res.status(403).json({
        error: "Invalid request.",
        message: "Forbidden.",
      });
    req.user = user;
    next(); // Pass the control to the next middleware
  });
};

/* GET signup. */
exports.get_signup = (req, res) => {
  return res.status(400).json({
    error: "Invalid request",
    message: "The request is missing required parameters.",
  });
};
/* POST signup. */
exports.post_signup = [
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
      return res.json({
        errors,
      });
    }
    // Inputs are valid, create user
    try {
      const hashedPassword = await bcrypt.hash(req.body.password, 10);
      const hashedUser = new User({
        first_name: req.body.first_name,
        last_name: req.body.last_name,
        username: req.body.username,
        password: hashedPassword,
      });
      const result = await hashedUser.save();
      res.json({
        user: result,
      });
    } catch (error) {
      if (error.code === 11000 && error.keyValue.username) {
        const errors = ["Username already exists!"];
        res.status(400).json({
          errors,
        });
      } else {
        res.status(400).json({
          error,
        });
      }
    }
  },
];
/* GET login. */
exports.get_login = (req, res) => {
  return res.status(400).json({
    error: "Invalid request",
    message: "The request is missing required parameters.",
  });
};

exports.post_login = (req, res, next) => {
  passport.authenticate("local", { session: false }, (err, user, info) => {
    if (err) {
      return next(err);
    }
    if (!user) {
      return res.status(400).json({
        message: "Invalid credentials provided.",
      });
    }
    req.logIn(user, { session: false }, (err) => {
      if (err) {
        return next(err);
      }
      const token = jwt.sign(
        { id: user.id },
        process.env.JWT_SECRET_TOKEN_KEY,
        { expiresIn: "1h" }
      );
      return res.json({ user, token });
    });
  })(req, res, next);
};

exports.post_logout = async (req, res) => {
  const token = req.headers.authorization.split(" ")[1];
  try {
    const blacklisted_token = new Token_Blacklist({
      blacklisted_token: token,
    });
    const result = await blacklisted_token.save();
    res.status(200).json({
      result,
    });
  } catch (error) {
    res.status(400).json({
      error,
    });
  }
};
