const config = require("./utils/config");
const middleware = require("./utils/middleware");
const logger = require("./utils/logger");

const express = require("express");
require("express-async-errors");

const blogRouter = require("./controllers/blog");
const userRouter = require("./controllers/user");
const loginRouter = require("./controllers/login");
const testingRouter = require("./controllers/testing");
const app = express();

const mongoose = require("mongoose");
mongoose.set("strictQuery", false);

mongoose
  .connect(config.MONGODB_URI)
  .then(() => {
    logger.info("connected to MongoDB");
  })
  .catch((error) => {
    logger.error("error connecting to MongoDB:", error.message);
  });

app.use(express.static("build"));
app.use(express.json());
app.use(middleware.cors());
app.use(middleware.morganSetup);
app.use(middleware.tokenExtractor);

app.use("/api/login", loginRouter);
app.use("/api/users", userRouter);
app.use("/api/blog", blogRouter);
app.use("/api/testing", testingRouter);

app.use(middleware.unknownEndpoint);
app.use(middleware.errorHandler);

module.exports = app;
