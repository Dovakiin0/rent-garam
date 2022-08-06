require("dotenv").config();
const express = require("express");
const client = require("./configs/connection");

const app = express();
require("./routes/router")(app);

// connect to database
client
  .connect()
  .then(() => console.log("connected to db"))
  .catch((err) => console.log(err))
  .finally(() => client.end());

const PORT = process.env.PORT || 3000;

const server = app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});

module.exports = server;
