const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "Gmail",
  auth: {
    user: "itiszeden@gmail.com",
    pass: "mhwn zjlx cgjt sgxe",
  },
});

const sendNotification = async (userEmail, subject, message) => {
  const mailOptions = {
    from: "itiszeden@gmail.com",
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
