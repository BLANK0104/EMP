const nodemailer = require("nodemailer");
require("dotenv").config();

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "ems.nmims@gmail.com",
    pass: "uufy fyis ayrb klpf",
  },
});

const sendNotification = async (userEmail, subject, message) => {
  const mailOptions = {
    from: "ems.nmims@gmail.com",
    to: userEmail,
    subject: subject,
    text: message,
  };

  try {
    await transporter.sendMail(mailOptions);
    console.log("Email sent successfully");
  } catch (error) {
    console.error("Error sending email:", error);
  }
};

module.exports = { sendNotification };
