require("dotenv").config();
const express = require("express");
const { pool } = require("./db");

const app = express();
require("./routes/router")(app);

// connect to database
pool.connect().catch((err) => console.log(err));

module.exports = app;
