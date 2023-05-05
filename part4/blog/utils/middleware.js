const logger = require("./logger");
const morgan = require("morgan");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const User = require("../models/user");

const morganSetup = morgan("tiny", {
  skip: () => process.env.NODE_ENV === "test",
});

const unknownEndpoint = (request, response) => {
  response.status(404).send({ error: "Unknown endpoint" });
};

const errorHandler = (error, request, response, next) => {
  logger.error(error.message);

  if (error.name === "CastError") {
    return response.status(400).json({ error: "Malformatted id" });
  } else if (error.name === "ValidationError") {
    return response.status(400).json({ error: error.message });
  } else if (error.name === "SyntaxError") {
    return response.status(400).json({ error: "Not a valid JSON" });
  } else if (error.name === "TokenExpiredError") {
    return response.status(401).json({
      error: "token expired",
    });
  } else if (error.name === "JsonWebTokenError") {
    return response.status(401).json({
      error: "invalid token",
    });
  }

  next(error);
};

const tokenExtractor = (request, response, next) => {
  const authorization = request.get("Authorization");
  if (authorization && authorization.startsWith("Bearer ")) {
    request.token = authorization.substring(7);
  }
  next();
};

const userExtractor = async (request, response, next) => {
  if (!request.token) {
    return response.status(401).json({ error: "token is missing" });
  }
  const decodedToken = jwt.verify(request.token, process.env.SECRET);
  const user = await User.findById(decodedToken.id);

  if (!decodedToken.id || !user) {
    return response.status(401).json({ error: "token is invalid" });
  }

  request.user = user;
  next();
};

module.exports = {
  unknownEndpoint,
  errorHandler,
  morganSetup,
  cors,
  tokenExtractor,
  userExtractor,
};
