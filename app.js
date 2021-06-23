var express = require('express');
var app = express();
const passport = require('passport');
const googleAuthRouter = require("./GoogleAuth");
const expressSession = require("express-session");
const strategy = require('./strategy');
const secured = require('./secure');
const history = require('connect-history-api-fallback');

app.get('/health', function (req, res) {
    res.send('Ok')
});

const session = {
    secret: process.env.SESSION_SECRET,
    cookie: {},
    resave: false,
    saveUninitialized: false
};

app.use(expressSession(session));

passport.use(strategy);

app.use(passport.initialize());
app.use(passport.session());

passport.serializeUser((user, done) => {
    done(null, user);
});

passport.deserializeUser((user, done) => {
    done(null, user);
});

app.use((req, res, next) => {
    res.locals.isAuthenticated = req.isAuthenticated();
    next();
});

app.use(googleAuthRouter);
app.use(secured);

// Middleware for serving '/dist' directory
const staticFileMiddleware = express.static('dist');

// 1st call for unredirected requests 
app.use(staticFileMiddleware);

// 2nd call for redirected requests
// app.use(staticFileMiddleware);

app.use(history())

const port = process.env.PORT || 8080
app.listen(port, function () {
    console.log('Example app listening on port ' + port);
});