const express = require("express");
const {
  createMessage,
  deleteMessage,
  getMessage,
  getMessages,
} = require("../controllers/messageController");

const router = express.Router();

router.post("/", createMessage);
router.get("/", getMessages);
router.get("/:id", getMessage);
router.delete("/:id", deleteMessage);

module.exports = router;
