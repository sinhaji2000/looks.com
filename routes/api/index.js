const express = require("express");
const Router = express.Router();

Router.use("/v1", require("./v1/index"));
Router.use("/v2", require("./v2/index"));

module.exports = Router;
