// Create web server
// 1. Express
// 2. Body-parser
// 3. Mongoose
// 4. EJS
// 5. Method-override
// 6. Express-sanitizer
// 7. Connect-flash
// 8. Express-session
// 9. Passport
// 10. Passport-local
// 11. Passport-local-mongoose

var express = require("express"),
    app = express(),
    bodyParser = require("body-parser"),
    mongoose = require("mongoose"),
    Comment = require("./models/comment"),
    Campground = require("./models/campground"),
    seedDB = require("./seeds"),
    passport = require("passport"),
    LocalStrategy = require("passport-local"),
    User = require("./models/user"),
    methodOverride = require("method-override"),
    flash = require("connect-flash"),
    sanitizer = require("express-sanitizer");

// Requiring routes
var commentRoutes = require("./routes/comments"),
    campgroundRoutes = require("./routes/campgrounds"),
    indexRoutes = require("./routes/index");

// seedDB();
mongoose.connect("mongodb://localhost/yelp_camp_v12");
app.use(bodyParser.urlencoded({extended: true}));
app.set("view engine", "ejs");
app.use(express.static(__dirname + "/public"));
app.use(sanitizer());
app.use(methodOverride("_method"));
app.use(flash());

// Passport configuration
app.use(require("express-session")({
    secret: "This is a secret",
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());
// Middleware to pass the user to