const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
    host: "smtp.gmail.com",
    port: 465,
    secure: true, // true for 465, false for other ports
    auth: {
      user:"paseadorescuidadores@gmail.com", // generated ethereal user
      pass: "jwubgwmqhjljvbtg", // generated ethereal password
    },
  });

  module.exports = transporter;