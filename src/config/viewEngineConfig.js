const path = require("path");
const express = require("express");
const expressLayouts = require("express-ejs-layouts");

const configViewEngine = (app) => {
  app.set("views", path.join("./src", "/views"));
  app.set("view engine", "ejs");
  app.use(expressLayouts);
  app.set("layout", "layouts/main");
  app.use(express.static(path.join("./src", "/public")));
};

module.exports = configViewEngine;
