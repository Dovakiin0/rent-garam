const express = require("express");
const cors = require("cors");
const fileUpload = require("express-fileupload");

module.exports = (app) => {
  app.use(cors());
  app.use(express.json());
  app.use(express.urlencoded({ extended: false }));
  app.use(fileUpload());

  app.use("/api/v1/auth", require("./auth.routes"));
  app.use("/api/v1/estate", require("./estate.routes"));
  app.use("/api/v1/favourite", require("./favourite.routes"));
};
