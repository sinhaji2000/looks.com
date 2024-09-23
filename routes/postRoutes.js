const express = require("express");
const Router = express.Router();
const postController = require("../controllers/postController");
const passport = require("../config/passport-local-strategy");

Router.post("/create-post", postController.postPost);
Router.post(
  "/destroy/:id",
  passport.checkAuthentication,
  postController.deletePost
);

module.exports = Router;
