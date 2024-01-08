const CustomError = require("../utils/customError");
const asyncErrorHandler = require("../utils/asyncErrorHandler");
const Listing = require("../models/listing");
const cloudinary = require("../utils/cloudinary");

exports.createListing = asyncErrorHandler(async (req, res, next) => {
  console.log("we just hit here");
  const images = [];
  let coverPhoto = null;

  //upload images to cloudinary

  if (req.files.images) {
    //loop through the files
    for (const file of req.files.images) {
      //upload each to cloudinary while destructuring the secure_url and public_id props from the response
      const { secure_url: url, public_id } = await cloudinary.uploader.upload(
        file.path,
        { folder: "property-listing" }
      );
      images.push({
        url,
        public_id,
      });
    }
  }
  console.log(images);
  //upload coverPhoto to cloudinary
  if (req.files.coverPhoto) {
    const { secure_url: url, public_id } = await cloudinary.uploader.upload(
      req.files.coverPhoto[0].path,
      {
        folder: "property-listing",
      }
    );
    coverPhoto = {
      url,
      public_id,
    };
  }
  console.log(coverPhoto);

  const listing = new Listing({ ...req.body, images, coverPhoto });

  await listing.save();

  res.status(201).json({
    status: "success",
    listing,
  });
});

exports.getAllListing = asyncErrorHandler(async (req, res, next) => {
  const listings = await Listing.find();
  res.status(200).json({
    status: "success",
    listings,
  });
});

exports.getListing = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    const err = new CustomError("listing not found", 404);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    listing,
  });
});

exports.deleteListing = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findByIdAndDelete(id);
  if (!listing) {
    const err = new CustomError("listing not found", 404);
    return next(err);
  }
  res.status(200).json({
    status: "success",
    message: "Listing deleted",
  });
});

exports.approveOrRevokeListing = asyncErrorHandler(async (req, res, next) => {
  const { id } = req.params;
  const listing = await Listing.findById(id);
  if (!listing) {
    const err = new CustomError("listing not found", 404);
    return next(err);
  }
  listing.isApproved = !listing.isApproved;
  const updatedListing = await listing.save();

  res.status(200).json({
    status: "success",
    listing: updatedListing,
  });
});
exports.getFeaturedListing = asyncErrorHandler(async (req, res, next) => {
  const listing = await Listing.findOne({ featured: true });
  res.status(200).json({
    status: "success",
    listing,
  });
});
