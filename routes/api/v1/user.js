const express = require("express");
const Router = express.Router();
const userApi = require("../../../controllers/api/v1/user_api");

Router.post("/signIn", userApi.postSignIn);

module.exports = Router;
