var express = require("express");
var router = express.Router();
const signUpController = require("../controllers/signUpController");
const loginController = require("../controllers/loginController");
const membershipController = require("../controllers/membershipController");
const messageController = require("../controllers/messageController");
const deleteMessageController = require("../controllers/deleteMessageController");
const asyncHandler = require("express-async-handler");
const User = require("../models/user");
const Message = require("../models/message");

/* GET home page. */
router.get(
  "/",
  asyncHandler(async (req, res, next) => {
    const messages = await Message.find({}).populate("author").exec();
    res.render("index", {
      title: "The Elite Member's Club",
      user: res.locals.currentUser,
      messages: messages,
    });
  }),
);

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

/* Create message form GET and POST */
router.get("/message", messageController.message_get);
router.post("/message", messageController.message_post);

/* Message deletuion GET and POST */
router.get("/message/:id/delete", deleteMessageController.delete_message_get);
router.post("/message/:id/delete", deleteMessageController.delete_message_post);

module.exports = router;
