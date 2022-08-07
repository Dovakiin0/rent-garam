require("dotenv").config();
const { Pool } = require("pg");

const pool = new Pool({
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  host: process.env.DB_HOST,
  port: 5432,
  database:
    process.env.NODE_ENV === "test"
      ? process.env.DB_TEST_NAME
      : process.env.DB_NAME,
});

pool.query(
  "CREATE TABLE IF NOT EXISTS users (id SERIAL PRIMARY KEY, fullname VARCHAR(255), email VARCHAR(255), phone_no VARCHAR(255), password VARCHAR(255))"
);
pool.query(
  "CREATE TABLE IF NOT EXISTS estate (id SERIAL PRIMARY KEY, name VARCHAR(255),address VARCHAR(255), image_url VARCHAR(255), description VARCHAR(1000),bedroom INTEGER, washroom INTEGER, price FLOAT, owner_id INTEGER, latitude FLOAT, longitude FLOAT, FOREIGN KEY (owner_id) REFERENCES users(id))"
);

module.exports = {
  pool,
  query: (text, params) => pool.query(text, params),
};
