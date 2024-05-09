var express = require("express");
var router = express.Router();
const signUpController = require("../controllers/signUpController");
const loginController = require("../controllers/loginController");

/* GET home page. */
router.get("/", function (req, res, next) {
  res.render("index", { title: "Express", user: currentUser });
});

router.get("/sign-up", signUpController.sign_up_get);
router.post("/sign-up", signUpController.sign_up_post);

router.get("/login", loginController.log_in_get);
router.post("/login", loginController.log_in_post);

module.exports = router;
