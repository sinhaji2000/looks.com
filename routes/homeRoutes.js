const express = require('express') ;
const Router = express.Router() ;
const homeController = require("../controllers/homeController");
const passport = require('../config/passport-local-strategy') ;


Router.get("/", passport.checkAuthentication, homeController.home);

module.exports = Router ;