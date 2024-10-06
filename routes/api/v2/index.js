const express = require("express");
const Router = express.Router();

Router.use("/posts", require("./post"));

module.exports = Router;
