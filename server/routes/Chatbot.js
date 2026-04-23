const express = require("express");
const router = express.Router();

const { videoChat } = require("../controllers/Chatbot");

// Optional: you could add auth middleware here if you only want logged-in users to chat
// const { auth } = require("../middlewares/auth");

router.post("/video", videoChat);

module.exports = router;
