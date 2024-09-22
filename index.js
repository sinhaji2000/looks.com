const express = require("express");
const cookieParser = require('cookie-parser');
const port = 8000;
const app = express();
const path = require("path");
const db = require("./config/mongoose");
const homeRouter = require("./routes/homeRoutes");
const userRoutes = require("./routes/userRoutes");
const expressLayouts = require("express-ejs-layouts");
const session = require('express-session');
const passport = require('passport');
const passportLocal = require('./config/passport-local-strategy');
const MongoStore = require("connect-mongo");

// Middleware to serve layouts
app.use(expressLayouts);
app.use(cookieParser());

// Extract styles and scripts from subpages into the layout
app.set("layout extractStyles", true);
app.set("layout extractScripts", true);

// Parsing form data
app.use(express.urlencoded({ extended: true }));

// Serve static files
app.use(express.static("assets"));

// Set view engine
app.set("view engine", "ejs");
app.set("views", path.join(__dirname, "views"));

// Session middleware configuration
app.use(session({
    name: 'codial',
    secret: 'blabla',
    saveUninitialized: false,
    resave: false,
    cookie: {
        maxAge: (1000 * 60 * 100) // Setting cookie expiration
    },
    store: MongoStore.create({
        mongoUrl: 'mongodb://localhost/codial_db', // Use the connection string
        // mongooseConnection : db ,
        autoRemove: 'disabled' // Optional: specify to disable auto removal
    })
}));

// Initialize Passport and session handling
app.use(passport.initialize());
app.use(passport.session());
app.use(passportLocal.setAuthenticatedUser);

// Define routes
app.use(homeRouter);
app.use('/user', userRoutes);

// Start the server
app.listen(port, () => {
    console.log(`Server is running on port: ${port}`);
});
