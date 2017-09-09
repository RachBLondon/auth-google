const passport = require("passport");
const GoogleStrategy = require("passport-google-oauth20").Strategy;
const mongoose = require("mongoose");
const keys = require("./../config/keys");

const User = mongoose.model("users");

passport.serializeUser((user, done) => {
  done(err, user.id);
});

passport.deserializeUser((id, done) => {
  User.findById(id).then(user => {
    done(err, user);
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
          done(err, existingUser);
        } else {
          new User({ googleID: profile.id }).save().then(user => {
            done(err, user);
          });
        }
      });
    }
  )
);
