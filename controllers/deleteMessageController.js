const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.delete_message_get = (req, res, next) => {
  res.render("delete", { title: "The Elite Member's Club" });
};

exports.delete_message_post = async (req, res, next) => {
  try {
    await Message.findByIdAndDelete(req.params.id);

    res.redirect("/");
  } catch (error) {
    next(error);
  }
};
