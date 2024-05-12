const Message = require("../models/message");
const asyncHandler = require("express-async-handler");
const { body, validationResult } = require("express-validator");

exports.delete_message_get = (req, res, next) => {
  res.render("delete", { title: "The Elite Member's Club" });
};

exports.delete_message_post = async (req, res, next) => {
  console.log(req.params.id);
  try {
    const message = await Message.findById(req.params.id).exec();

    if (message === null) {
      res.redirect("/");
    } else {
      await Message.deleteOne(message);
      res.redirect("/");
    }
  } catch (error) {
    next(error);
  }
};
