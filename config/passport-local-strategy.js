const passport = require('passport');
const User = require('../models/user');
const LocalStrategy = require('passport-local').Strategy;

// Authentication using passport
passport.use(new LocalStrategy({
    usernameField: 'email',
}, async (email, password, done) => {
    try {
        // Find the user by email
        const user = await User.findOne({ email: email });

        // Check if the user exists and if the password matches
        if (!user || user.password !== password) {
            console.log('Invalid username or password');
            return done(null, false);
        }

        // If valid user, return the user
        return done(null, user);

    } catch (err) {
        // Handle any errors that occurred during the database lookup
        console.log(err);
        return done(err);
    }
}));

// Serializing user which key is kept in the cookie
passport.serializeUser((user, done) => {
    done(null, user.id);
});

// Deserializing the user from the key in the cookie
passport.deserializeUser(async (id, done) => {
    try {
        const user = await User.findById(id);
        if (user) {
            return done(null, user);
        }
    } catch (error) {
        console.log(error);
        return done(error);
    }
});

// Check if the user is authenticated

passport.checkAuthentication = function(req, res, next){
    if (req.isAuthenticated()) {
        return next();
    }
    // If user is not signed in
    return res.redirect('/user/signIn');
};

// Set authenticated user in response locals
passport.setAuthenticatedUser = (req, res, next) => {
    if (req.isAuthenticated()) {
        res.locals.user = req.user;
    }
    next();
};

module.exports = passport;
