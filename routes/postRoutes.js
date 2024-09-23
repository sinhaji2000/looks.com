const express = require("express");
const Router = express.Router();
const postController = require("../controllers/postController");

Router.post("/create-post", postController.postPost);

module.exports = Router;
