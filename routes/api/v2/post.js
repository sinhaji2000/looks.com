const express = require("express");
const Router = express.Router();
const postApi = require("../../../controllers/api/v2/post_api");

Router.use("/", postApi.index);
module.exports = Router;
