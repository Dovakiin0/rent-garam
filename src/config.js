require("dotenv").config();
const express = require("express");
const { pool } = require("./db");
const path = require("path");

const app = express();
require("./routes/router")(app);
app.use("/files", express.static(path.join(__dirname, "../", "storage")));
// connect to database
pool.connect().catch((err) => console.log(err));

module.exports = app;
