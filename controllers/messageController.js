const CustomError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Message = require("../models/message");

exports.createMessage = asyncErrorHandler(async (req, res, next) => {
  const message = new Message(req.body);
  await message.save();
  res.status(201).json({
    status: "success",
    message: "Your message has been sent and we will get back to you",
  });
});

exports.deleteMessage = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findByIdAndDelete(id);
  if (!message) {
    const err = new CustomError("Message not found", 404);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    message: "Message deleted",
  });
});
exports.getMessages = asyncErrorHandler(async (req, res, next) => {
  const messages = await Message.find();
  res.staus(200).json({
    status: "success",
    messages,
  });
});
exports.getMessage = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const message = await Message.findById(id);
  if (!message) {
    const err = new CustomError("Message not found", 404);
    return next(err);
  }
  res.staus(200).json({
    status: "success",
    message,
  });
});
