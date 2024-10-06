const User = require("../models/user");
const passport = require("passport");
const jwtStrategy = require("passport-jwt").Strategy;
const ExtractJwt = require("passport-jwt").ExtractJwt;

const option = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: "secret",
};

passport.use(
  new jwtStrategy(option, (jwt_payload, done) => {
    User.findById(jwt_payload._id, (err, user) => {
      if (err) {
        console.log("error in finding user from jwt");
        return;
      }

      if (user) {
        return done(null, user);
      } else {
        return done(null, false);
      }
    });
  })
);

module.exports = passport;
