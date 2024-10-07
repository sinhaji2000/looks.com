const express = require('express');
const Router = express.Router();

const userController = require('../controllers/userController');
const passport = require('../config/passport-local-strategy');

Router.get('/signUp', userController.getSignUp);
Router.post('/signUp', userController.postSignUp);
Router.get('/signIn', userController.getSignIn);

// Manual authentication
// Router.post('/signIn', userController.postSignIn);

// Authentication using passport middleware
Router.post(
  "/signIn",
  passport.authenticate("local", { failureRedirect: "/user/signIn" }),
  userController.postSignIn
);

Router.get(
  "/userProfile/:id",
  passport.checkAuthentication,
  userController.getUserProfile
);
Router.get("/signOut", userController.postSignOut);

Router.post("/update_profile/:id", userController.updateUserProfile);
Router.get(
  "/auth/google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

Router.get(
  "/auth/google/callback",
  passport.authenticate("google", {
    failureRedirect: "/user/signIn",
  }),
  userController.postSignIn
);


module.exports = Router;
