const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.membership_get = (req, res, next) => {
  res.render("membership", {
    title: "Become a Member",
    user: res.locals.currentUser,
  });
};

exports.membership_post = [
  body("code")
    .escape()
    .custom((value, { req }) => {
      if (value !== process.env.MEMBERSHIP_CODE) {
        throw new Error("Code is incorrect");
      }
      return true;
    }),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      res.render("membership", {
        title: "Become a Member",
        errors: errors.array(),
      });
    } else {
      const updatedUser = await User.findOneAndUpdate(
        { _id: res.locals.currentUser._id },
        { membership: true },
      );
      res.redirect("/");
    }
  }),
];
