const session = require("express-session");
const passport = require("passport");
const createError = require("http-errors");
const express = require("express");
const path = require("path");
const cookieParser = require("cookie-parser");
const logger = require("morgan");
const cors = require("cors");
const swaggerUI = require("swagger-ui-express");
const swaggerJsDoc = require("swagger-jsdoc");
const compression = require("compression");
const helmet = require("helmet");
require("dotenv").config();
// Initialize swagger-jsdoc
const options = {
  swaggerDefinition: {
    openapi: "3.0.0",
    info: {
      title: "Blog API",
      version: "1.0.0",
      description:
        "Here is the API documentation for My Blog API. Please note that authentication is required and you must obtain a token by logging in before making requests to protected routes.",
      contact: {
        name: "Mustafa",
        email: "beginnerdev7@gmail.com",
      },
    },
    servers: [
      {
        url: "https://blog-api-production-18c9.up.railway.app/",
      },
    ],
  },
  apis: ["./routes/*.js"],
};

const specs = swaggerJsDoc(options);

const indexRouter = require("./routes/index");
const userRouter = require("./routes/users");
const postsRouter = require("./routes/posts");

const app = express();
// Set up rate limiter: maximum of twenty requests per minute
var RateLimit = require("express-rate-limit");
var limiter = RateLimit({
  windowMs: 1 * 60 * 1000, // 1 minute
  max: 20,
});
// Apply rate limiter to all requests
app.use(limiter);

app.use(cors());
app.use("/api-docs", swaggerUI.serve, swaggerUI.setup(specs));

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);
const mongoDB = process.env.MONGODB_URI || process.env.LOCAL_URI;

async function mongooseConnect() {
  await mongoose.connect(mongoDB);
}
mongooseConnect().catch((err) => console.log(err));

app.use(logger("dev"));
app.use(express.json());
app.use(session({ secret: "cats", resave: false, saveUninitialized: true }));
app.use(passport.initialize());
app.use(passport.session());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, "public")));
app.use(compression());
app.use(helmet());

app.use("/", indexRouter);
app.use("/users", userRouter);
app.use("/posts", postsRouter);

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get("env") === "development" ? err : {};

  // send error status
  res.sendStatus(err.status || 500);
});

module.exports = app;
