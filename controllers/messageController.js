const User = require("../models/user");
const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.message_get = (req, res, next) => {
  res.render("message", {
    title: "Create New Message",
    user: res.locals.currentUser,
  });
};

exports.message_post = [
  body("title")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("Title must be between 1-100 characters"),
  body("text")
    .trim()
    .isLength({ min: 1, max: 500 })
    .escape()
    .withMessage("Message text must be between 1-500 characters"),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const message = new Message({
      title: req.body.title,
      text: req.body.text,
      time: new Date(),
      author: res.locals.currentUser,
    });

    if (!errors.isEmpty()) {
      res.render("message", {
        title: "Create New Message",
        user: res.locals.currentUser,
        message: message,
        errors: errors.array(),
      });
    } else {
      const result = await message.save();
      res.redirect("/");
    }
  }),
];
