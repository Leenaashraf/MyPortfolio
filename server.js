const express = require("express");
const bodyParser = require("body-parser");
const cors = require("cors");
const nodemailer = require("nodemailer");
const path = require("path");

const app = express();
app.use(cors());
app.use(bodyParser.json());
app.use(express.static(path.join(__dirname, "public"))); // serve HTML/CSS/JS

app.post("/send-email", async (req, res) => {
  const { name, email, message } = req.body;

  try {
    let transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: "YOUR_EMAIL@gmail.com",      // replace with your email
        pass: "YOUR_APP_PASSWORD"          // replace with Gmail App Password
      }
    });

    await transporter.sendMail({
      from: email,
      to: "YOUR_EMAIL@gmail.com",
      subject: `Portfolio Message from ${name}`,
      text: message
    });

    res.json({ success: true });
  } catch (error) {
    console.error(error);
    res.json({ success: false });
  }
});

const PORT = 3000; // change to 5000 if you want
app.listen(PORT, () => console.log(`Server running on http://localhost:${PORT}`));
