const nodemailer = require('nodemailer');

const sendEmail = async (options) => {
  const transporter = nodemailer.createTransport({
    host: process.env.EMAIL_HOST,
    port: process.env.EMAIL_PORT,
    auth: {
      user: process.env.EMAIL_USERNAME,
      pass: process.env.EMAIL_PASSWORD,
    },
  });

  const mailOptions = { from: 'Ahmed Osama Al-Sawah', to: options.email, subject: options.subject, text: options.message };

  transporter.sendMail(mailOptions);
};

module.exports = sendEmail;
