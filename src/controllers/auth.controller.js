const db = require("../db");
const { generateToken, hashPassword } = require("../utils/utility");
const bcrypt = require("bcryptjs");

const registerUser = async (req, res) => {
  const { email, full_name, phone_no, password } = req.body;
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
    "INSERT INTO users (fullname, email, password, phone_no) VALUES ($1, $2, $3, $4) RETURNING id",
    [full_name, email, hashedPassword, phone_no]
  );

  // Generate Token
  const token = generateToken(newUser[0].id);
  return res.status(201).json({
    message: "User created successfully",
    token,
  });
};

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
};
