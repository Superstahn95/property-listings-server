const express = require("express");
const {
  approveOrRevokeListing,
  createListing,
  deleteListing,
  getAllListing,
  getListing,
} = require("../controllers/listingController");
const multer = require("../middlewares/multer");

const router = express.Router();

//public routes
router.post(
  "/",
  multer.fields([{ name: "images" }, { name: "coverPhoto" }]),
  createListing
);
router.get("/", getAllListing);
router.get("/:id", getListing);
//proteceted routes
router.delete("/:id", deleteListing);
router.patch("/:id", approveOrRevokeListing);

module.exports = router;
