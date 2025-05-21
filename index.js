const express = require("express");
const bodyParser = require("body-parser");
const axios = require("axios");
require("dotenv").config();

const app = express();
app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

app.get("/", (req, res) => {
  res.sendFile(__dirname + "/public/index.html");
});

app.post("/submit", async (req, res) => {
  const { title, message, mood } = req.body;
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kathmandu" });

app.post("/submit", async (req, res) => {
  const { title, problem, request, confession, mood } = req.body;
  const timestamp = new Date().toLocaleString("en-IN", { timeZone: "Asia/Kathmandu" });

  const text = `
❤️ *New Grievance Received!*
📌 *Title:* ${title}
🗣️ *Problem:* ${problem}
🙏 *Request:* ${request}
😳 *Confession:* ${confession}
😊 *Mood:* ${mood}
🕒 *Time:* ${timestamp}
  `;

  try {
    const response = await axios.post(`https://api.telegram.org/bot${process.env.BOT_TOKEN}/sendMessage`, {
      chat_id: process.env.USER_ID,
      text: text,
      parse_mode: "Markdown",
      reply_markup: {
        inline_keyboard: [[
          {
            text: "💬 Reply on Telegram",
            url: "https://t.me/sayar223"
          }
        ]]
      }
    });

    console.log("✅ Sent!", response.data);
    res.send("Grievance sent!");
  } catch (error) {
    console.error("❌ Telegram error:", error.response?.data || error.message);
    res.status(500).send("Failed to send grievance.");
  }
});
