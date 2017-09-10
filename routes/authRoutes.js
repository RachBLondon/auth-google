const passport = require("passport");
const mongoose = require('mongoose')
const User = mongoose.model("users");
module.exports = app => {
  app.get("/", (req, res) => {
    res.render("index", { title: "Example App" });
  });

  app.get(
    "/auth/google",
    passport.authenticate("google", {
      scope: ["profile", "email"]
    })
  );
  app.get("/auth/google/callback", passport.authenticate("google"));

  app.get("/auth/facebook", passport.authenticate("facebook"));
  app.get(
    "/auth/facebook/callback",
    passport.authenticate("facebook", { failureRedirect: "/login" })
  );

  app.get("/api/logout", (req, res) => {
    req.logout();
    res.render("logout");
  });

  app.get("/api/current_user", (req, res) => {
    if (req.user) {
      User.findById(req.user.id).then(user => {
        res.render("profile", { id: user.id });
      });
    } else {
      res.render("profile", {id : "user not found"})
    }
  });
};
