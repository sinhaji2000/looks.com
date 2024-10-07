const passport = require("passport");
const googleStrategy = require("passport-google-oauth").OAuth2Strategy;
const crypto = require("crypto");
const User = require("../models/user");

// Tell passport to use Google strategy for login
passport.use(
  new googleStrategy(
    {
      clientID: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      callbackURL: "http://localhost:8000/user/auth/google/callback", // Ensure callback matches the route
    },

    async function (accessToken, refreshToken, profile, done) {
      try {
        // Find the user based on their Google email
        let user = await User.findOne({ email: profile.emails[0].value });

        if (user) {
          console.log(profile);
          // If user found, log them in
          return done(null, user);
        } else {
          // If the user is not found, create them in the database
          user = await User.create({
            name: profile.displayName,
            email: profile.emails[0].value,
            password: crypto.randomBytes(20).toString("hex"), // Random password
          });

          return done(null, user);
        }
      } catch (err) {
        console.log("Error in Google strategy", err);
        return done(err);
      }
    }
  )
);

module.exports = passport;
