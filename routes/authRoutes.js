const passport = require("passport");

module.exports = app => {
  app.get("/", (req, res) => {
    res.render('index', { title: 'Example App' });
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
    res.send(req.user);
  });

  app.get("/api/current_user", (req, res) => {
    res.render('profile', {id : req.user.id})
  });
};
