const express = require("express");
const Router = express.Router();
const postApi = require("../../../controllers/api/v1/post_api");

Router.get("/", postApi.index);
Router.delete("/:id", postApi.deletePost);

module.exports = Router;
