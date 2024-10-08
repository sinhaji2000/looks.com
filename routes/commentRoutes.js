const express = require("express");
const Router = express.Router();
const commentController = require("../controllers/commentsController");
const passport = require("../config/passport-local-strategy");

Router.post(
  "/create-comment",
  passport.checkAuthentication,
  commentController.createComment
);

Router.post(
  "/delete-comment/:id",
  passport.checkAuthentication,
  commentController.destroyComments
);
module.exports = Router;
