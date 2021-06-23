let GoogleStrategy = require('passport-google-oauth20').Strategy;

const strategy = new GoogleStrategy({
  clientID: process.env.GOOGLE_CLIENT_ID,
  clientSecret: process.env.GOOGLE_CLIENT_SECRET,
  callbackURL: process.env.GOOGLE_CALLBACK_URL
},
  function (accessToken, refreshToken, extraParams, profile, done) {
    return done(null, profile);
  }
);

module.exports = strategy;