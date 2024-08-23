// const GoogleStrategy = require('passport-google-oauth20')
const GoogleStrategy = require('passport-google-oauth20').Strategy;
const passport  = require('passport')
require('dotenv').config();


passport.use(new GoogleStrategy({
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL:  "http://localhost:3030/user/auth/google/callback"
  },
  function(accessToken, refreshToken, profile, done) {
      done(null, profile)
  }
));

passport.serializeUser((done,user) => {
   done(null, user)
})

passport.deserializeUser((user, done) => {
   done(null, user)
})

module.exports = passport;




// passport.use(new GoogleStrategy({
//     clientID:    process.env.GOOGLE_CLIENT_ID,
//     clientSecret: process.env.GOOGLE_CLIENT_SECRET,
//     callbackURL: "http://localhost:3030/auth/google/callback",
//     passReqToCallback   : true
//   },
//   function(request, accessToken, refreshToken, profile, done) {
//     done (null, profile)
//   }
// ));