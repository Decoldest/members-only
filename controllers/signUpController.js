const User = require("../models/user");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");
const bcrypt = require("bcryptjs");

exports.sign_up_get = (req, res, next) => {
  res.render("sign-up", { title: "Sign Up" });
};

exports.sign_up_post = [
  body("firstname")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("First name must be between 1-100 characters.")
    .isAlphanumeric()
    .withMessage("First name must be pnly alphanumeric characters."),
  body("lastname")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("Last name must be between 1-100 characters.")
    .isAlphanumeric()
    .withMessage("Last name has non-alphanumeric characters."),
  body("username")
    .trim()
    .isLength({ min: 1, max: 100 })
    .escape()
    .withMessage("Username must be between 1-100 characters.")
    .custom(async (value) => {
      const user = await User.findOne(value);
      if (user) {
        throw new Error("Username taken");
      }
      return true;
    })
    .withMessage("Username is already taken."),
  body("password")
    .isLength({ min: 5 })
    .escape()
    .withMessage("Password must be between at least 5 characters."),
  body("password-confirm", "Passwords do not match").custom(
    (value, { req }) => {
      if (value !== req.body.password) {
        throw new Error("Passwords do not match");
      }
      return true;
    },
  ),

  asyncHandler(async (req, res, next) => {
    const errors = validationResult(req);

    const userCheck = {
      firstname: req.body.firstname,
      lastname: req.body.lastname,
      username: req.body.username,
    };

    if (!errors.isEmpty()) {
      res.render("sign-up", {
        title: "Sign Up",
        errors: errors.array(),
        user: userCheck,
      });
    }
    const membership = req.body.code === process.env.MEMBERSHIP_CODE;
    bcrypt.hash(req.body.password, 10, async (err, hashedPassword) => {
      if (err) {
        return next(err);
      }
      const user = new User({
        ...userCheck,
        password: hashedPassword,
        membership: membership,
      });
      console.log(user);
      try {
        const result = await user.save();
        console.log("saved");
        res.redirect("/");
      } catch (error) {
        return next(error);
      }
    });
  }),
];
