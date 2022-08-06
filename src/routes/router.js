const express = require("express");
const cors = require("cors");

module.exports = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));

  app.use("/api/v1/auth", require("./auth.routes"));
  app.use("/api/v1/estate", require("./estate.routes"));
};
