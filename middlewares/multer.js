const multer = require("multer");
const CustomError = require("../utils/customError");

const storage = multer.diskStorage({});

const fileFilter = (req, file, cb) => {
  if (!file.mimetype.includes("image")) {
    console.log("this is not an image");
    const err = new CustomError("You can only upload an image", 400);
    return cb(err, false);
  }

  cb(null, true);
};

module.exports = multer({ storage, fileFilter });
