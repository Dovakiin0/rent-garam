require("dotenv").config();
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

const generateToken = (id) => {
  return jwt.sign({ id }, process.env.JWT_SECRET, {
    expiresIn: "30d",
  });
};

const hashPassword = async (password) => {
  let salt = await bcrypt.genSalt(10);
  return await bcrypt.hash(password, salt);
};

module.exports = { generateToken, hashPassword };
