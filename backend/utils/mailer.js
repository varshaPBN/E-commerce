const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOtpMail = async (to, otp) => {
  await transporter.sendMail({
    from: `"OTP FROM ARTLOOM" <${process.env.EMAIL_USER}>`,
    to,
    subject: "Your OTP Code",
    html: `
      <h2>Email Verification</h2>
      <h1>${otp}</h1>
      <p>This OTP is valid for 5 minutes</p>
    `,
  });
};

module.exports = sendOtpMail;
