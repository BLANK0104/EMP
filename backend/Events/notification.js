const nodemailer = require("nodemailer");
require("dotenv").config();
const email = process.env.EMAIL;

const transporter = nodemailer.createTransport({
  service: "Outlook365",
  auth: {
    user: "emsmptp.shirpur@nmims.edu",
    pass: "Strength007",
  },
});

const sendNotification = async (userEmail, subject, message) => {
  const mailOptions = {
    from: "emsmptp.shirpur@nmims.edu",
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