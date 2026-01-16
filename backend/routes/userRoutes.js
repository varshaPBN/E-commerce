const mongoose = require("mongoose");
const User = mongoose.model("users");
const jwt = require("jsonwebtoken");
const sendOtpMail = require("../utils/mailer");
const otpLength = 6;

module.exports = (app) => {
  // ============================================
  // OTP AUTHENTICATION ENDPOINTS
  // ============================================

  // Send OTP
  app.post("/api/v1/send-otp", async (req, res) => {
    try {
      const { email } = req.body;

      if (!email) {
        return res.status(400).json({ message: "Email is required" });
      }

      const digits = "0123456789";
      let newOTP = "";
      for (let i = 0; i < otpLength; i++) {
        newOTP += digits[Math.floor(Math.random() * 10)];
      }

      // Find or create user
      let user = await User.findOne({ email });
      if (!user) {
        user = await User.create({ email });
      }

      // Update OTP and expiration
      await User.updateOne(
        { email },
        {
          otp: newOTP,
          otpExpiresAt: Date.now() + 5 * 60 * 1000, // 5 minutes
        }
      );

      // Send OTP email
      await sendOtpMail(email, newOTP);

      res.json({ message: "OTP sent successfully" });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Failed to send OTP" });
    }
  });

  // Verify OTP
  app.post("/api/v1/verify-otp", async (req, res) => {
    try {
      const { email, otp } = req.body;

      const user = await User.findOne({ email });

      if (!user) {
        return res.status(404).json({ message: "User not found" });
      }

      if (!user.otp || !user.otpExpiresAt) {
        return res.status(400).json({ message: "OTP not generated" });
      }

      if (Date.now() > user.otpExpiresAt) {
        return res.status(400).json({ message: "OTP expired" });
      }

      if (user.otp !== otp) {
        return res.status(400).json({ message: "Invalid OTP" });
      }

      // Generate JWT token
      const payload = {
        id: user._id.toString(),
        email: user.email,
      };

      const token = jwt.sign(payload, process.env.JWT_SECRET, {
        expiresIn: process.env.JWT_EXPIRES_IN || "7d",
      });

      // Clear OTP after success
      await User.updateOne(
        { email },
        { otp: null, otpExpiresAt: null }
      );

      res.json({
        message: "OTP verified successfully",
        token,
      });
    } catch (error) {
      console.log(error);
      res.status(500).json({ message: "Error during verification" });
    }
  });
}; 

