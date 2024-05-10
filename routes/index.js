var express = require("express");
var router = express.Router();
const signUpController = require("../controllers/signUpController");
const loginController = require("../controllers/loginController");
const membershipController = require("../controllers/membershipController");

/* GET home page. */
router.get("/", function (req, res, next) {
  const currentUser = res.locals.currentUser;
  res.render("index", {
    title: "The Elite Member's Club",
    user: res.locals.currentUser,
  });
});

/* Sign up GET and POST */
router.get("/sign-up", signUpController.sign_up_get);
router.post("/sign-up", signUpController.sign_up_post);

/* Log in GET and POST */
router.get("/login", loginController.log_in_get);
router.post("/login", loginController.log_in_post);

/* Logout also calls passport logout function */
router.get("/logout", (req, res, next) => {
  req.logout((err) => {
    if (err) {
      return next(err);
    }
    res.redirect("/");
  });
});

/* Membership form GET and POST */
router.get("/membership", membershipController.membership_get);
router.post("/membership", membershipController.membership_post);

module.exports = router;
