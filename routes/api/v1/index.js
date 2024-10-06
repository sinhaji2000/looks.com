const express = require("express");
const Router = express.Router();

Router.use("/posts", require("./post"));
Router.use("/user", require("./user"));

module.exports = Router;
