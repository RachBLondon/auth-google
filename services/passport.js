const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const FacebookStrategy = require("passport-facebook").Strategy;
const mongoose = require("mongoose");
const keys = require("./../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(null, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(null, user);
  });
});

passport.use(
  new GoogleStrategy(
    {
      clientID: keys.googleClientID,
      clientSecret: keys.googleClientSecret,
      callbackURL: "/auth/google/callback"
    },
    (accessToken, refreshToken, profile, done) => {
      User.findOne({ googleID: profile.id }).then(existingUser => {
        if (existingUser) {
          //dont need to create a new record
          done(null, existingUser);
        } else {
          new User({ googleID: profile.id }).save().then(user => {
            done(null, user);
          });
        }
      });
    }
  )
);

passport.use(
  new FacebookStrategy(
    {
      clientID: keys.facebookClientID,
      clientSecret: keys.facebookClientSecret,
      callbackURL: "/auth/facebook/callback"
    },
    function(accessToken, refreshToken, profile, done) {
      User.findOne({ facebookID: profile.id }).then(existingUser => {
        if (existingUser) {
          console.log("exisiting user", existingUser)
          //dont need to create a new record
          done(null, existingUser);
        } else {
          console.log("profile", profile)
          new User({ facebookID: profile.id }).save().then(user => {
            done(null, user);
          });
        }
      });
    }
  )
);
