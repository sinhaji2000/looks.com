const express = require("express");
const Router = express.Router();

const likesController = require("../controllers/likesController");

Router.post("/toggle", likesController.toggleLike);

module.exports = Router;
