const passport = require("passport");
const express = require("express");
const mongoose = require("mongoose");
const path = require("path");
const hbs = require("hbs");

const keys = require("./config/keys");
const cookieSession = require("cookie-session");
require("./models/User");
require("./services/passport");

mongoose.connect(keys.mongoURI);

const app = express();
app.use(
  cookieSession({
    maxAge: 30 * 24 * 60 * 1000,
    keys: [keys.cookieKey]
  })
);
app.use(passport.initialize());
app.use(passport.session());
require("./routes/authRoutes")(app);

hbs.registerPartials(__dirname + '/views/partials/')
app.set("views", path.join(__dirname, "views"));
app.set("view engine", "hbs");

const PORT = process.env.PORT || 5000;
app.listen(PORT, console.log("Running on :", PORT));
