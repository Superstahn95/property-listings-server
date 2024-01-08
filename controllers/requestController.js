const CustomError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Listing = require("../models/listing");
const Request = require("../models/request");

exports.createRequest = asyncErrorHandler(async (req, res, next) => {
  const { listingId } = req.params;
  const { email, phoneNumber, name } = req.body;
  //check if listing exists
  const listing = await Listing.findById(listingId);
  if (!listing) {
    const err = new CustomError("Listing not found", 404);
    return next(err);
  }
  //check if request with like details has been submitted before
  const existingRequest = await Request.findOne({
    listing: listingId,
    $or: [{ email }, { phoneNumber }],
  });
  if (existingRequest) {
    const err = new CustomError(
      "Request for this property with such details already exists",
      400
    );
    return next(err);
  }
  const request = new Request({ name, email, phoneNumber, listing: listingId });
  await request.save();
  const updatedListing = await Listing.findByIdAndUpdate(
    listingId,
    { $push: { requests: request._id } },
    { new: true } // Return the updated document
  );

  res.status(201).json({
    status: "success",
    request,
  });
});

exports.getRequests = asyncErrorHandler(async (req, res, next) => {
  const requests = await Request.find();
  res.status(200).json({
    status: "success",
    requests,
  });
});

exports.getRequest = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const request = await Request.findById(id);
  if (!request) {
    const err = new CustomError("Request not found", 404);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    request,
  });
});
