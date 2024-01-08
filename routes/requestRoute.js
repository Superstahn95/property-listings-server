const express = require("express");
const {
  createRequest,
  getRequest,
  getRequests,
} = require("../controllers/requestController");

const router = express.Router();

router.post("/:listingId", createRequest);

module.exports = router;
