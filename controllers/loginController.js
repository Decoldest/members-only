const passport = require("passport");

exports.log_in_get = (req, res, next) => {
  res.render("login", { title: "Log In" });
};

exports.log_in_post = passport.authenticate("local", {
  successRedirect: "/",
  failureRedirect: "/login",
});
