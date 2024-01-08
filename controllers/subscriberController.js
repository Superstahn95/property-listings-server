const CustomError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Subscriber = require("../models/subscriber");

exports.createSubscriber = asyncErrorHandler(async (req, res, next) => {
  const { email } = req.body;
  const existingSubscriber = await Subscriber.findOne({ email });
  if (existingSubscriber) {
    const err = new CustomError(
      "This email has already subscribed to our newsletter",
      400
    );
    return next(err);
  }
  await Subscriber.create({ email });
  res.status(201).json({
    status: "success",
    message: "You have succesfully subscribed to our newsletter",
  });
});

exports.getSubscribers = asyncErrorHandler(async (req, res, next) => {
  const subscribers = await Subscriber.find();
  res.status(200).json({
    status: "success",
    subscribers,
  });
});
