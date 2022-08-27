const db = require("../db");
const { generateToken, hashPassword } = require("../utils/utility");
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");

/**
 * register a new user
 */
const registerUser = async (req, res) => {
  const { email, fullname, phone_no, password } = req.body;
  const hashedPassword = await hashPassword(password);
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);

  // Check if User Exists
  if (rows.length > 0) {
    return res.status(409).json({
      message: "User already exists",
    });
  }

  // Insert User
  const { rows: newUser } = await db.query(
    "INSERT INTO users (fullname, email, password, phone_no, role) VALUES ($1, $2, $3, $4, $5) RETURNING id",
    [fullname, email, hashedPassword, phone_no, "user"]
  );

  // Generate Token
  const token = generateToken(newUser[0].id);
  return res.status(201).json({
    message: "User created successfully",
    token,
  });
};

/**
 * Change password of user
 */
const changePassword = async (req, res) => {
  const { password } = req.body;
  const hashedPassword = await hashPassword(password);

  const { rows } = await db.query(
    "UPDATE users SET password = $1 WHERE id = $2",
    [hashedPassword, req.body.id]
  );
  return res.status(200).json({
    message: "Password changed successfully",
  });
};

const getUser = async (req, res) => {
  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    req.body.email,
  ]);
  if (rows.length > 0) {
    return res.status(200).json({
      user: rows[0],
    });
  } else {
    return res.status(404).json({
      message: "User not found",
    });
  }
};

/**
 * Gets Currently logged in user
 */
const getMe = async (req, res) => {
  token = req.headers.authorization.split(" ")[1];
  const decoded = await jwt.verify(token, process.env.JWT_SECRET);
  const { rows } = await db.query("SELECT * FROM users WHERE id = $1", [
    decoded.id,
  ]);
  if (rows.length > 0) {
    return res.status(200).json({
      user: rows[0],
    });
  } else {
    return res.status(404).json({
      message: "User not found",
    });
  }
};

/**
 * Login User and Generate Token
 */
const loginUser = async (req, res) => {
  const { email, password } = req.body;

  const { rows } = await db.query("SELECT * FROM users WHERE email = $1", [
    email,
  ]);
  if (rows.length === 0) {
    return res.status(404).json({
      message: "User not found",
    });
  }

  if (rows[0] && (await bcrypt.compare(password, rows[0].password))) {
    const token = generateToken(rows[0].id);
    return res.status(200).json({
      message: "User logged in successfully",
      token,
    });
  }

  return res.status(401).json({
    message: "Invalid credentials",
  });
};

module.exports = {
  registerUser,
  loginUser,
  getMe,
  changePassword,
  getUser,
};
