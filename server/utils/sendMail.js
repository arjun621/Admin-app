require("dotenv").config();
const nodemailer = require("nodemailer");

const sendMail = async (to, subject, text) => {
  try {
    // 1️⃣ Create transporter (connection to email server)
    const transporter = nodemailer.createTransport({
      service: "gmail",
      auth: {
        user: process.env.EMAIL_USER,      // your gmail
        pass: process.env.EMAIL_PASS,      // gmail app password
      },
    });

    // 2️⃣ Email options
    const mailOptions = {
      from: process.env.EMAIL_USER,
      to: to,
      subject: subject,
      text: text,
    };

    // 3️⃣ Send email
    await transporter.sendMail(mailOptions);

    console.log("Email sent successfully");
  } catch (error) {
    console.log("Error sending email:", error);
  }
};

module.exports = sendMail;