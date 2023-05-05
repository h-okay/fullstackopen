require("dotenv").config();

const PORT = process.env.PORT;
const NODE_ENV = process.env.NODE_ENV;
const MONGODB_URI = () => {
  return NODE_ENV === "test"
    ? process.env.TEST_MONGODB_URI
    : NODE_ENV === "development"
      ? process.env.DEV_MONGODB_URI
      : process.env.MONGODB_URI;
};

module.exports = {
  PORT: PORT || 3001,
  MONGODB_URI: MONGODB_URI(),
};
