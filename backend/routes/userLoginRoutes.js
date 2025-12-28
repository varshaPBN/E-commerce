const mongoose = require("mongoose");
const User = mongoose.model("users");
const jwt = require("jsonwebtoken");

const otpLength = 6;

module.exports = (app) => {
  app.post("/api/v1/user/login", async (req, res) => {
    try {
      const { email } = req.body;

      const digits = "0123456789";
      let newOTP = "";
      for (let i = 0; i < otpLength; i++) {
        newOTP += digits[Math.floor(Math.random() * 10)];
      }
      console.log("newOTP: ", newOTP);

      const user = await User.findOne({ email });
      if (!user) {
        res.status(404).json({ message: "User not found" });
      } else {
        const response = await User.updateOne({ email }, { otp: newOTP });
        res.status(201).json({ message: "OTP Sent Successfully", response });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });

  app.post("/api/v1/user/verify-otp", async (req, res) => {
    try {
      const { email, otp } = req.body;

      const user = await User.findOne({ email });

      if (user && user.otp === otp) {
        const payload = {
          id: user._id,
          email: user.email,
        };

        const token = jwt.sign(payload, process.env.JWT_SECRET, {
          expiresIn: process.env.JWT_EXPIRES_IN,
        });

        res.status(200).json({ message: "Login Success", token });
      }
    } catch (error) {
      console.log(error);
      res.status(500).send({ message: error.message });
    }
  });
};
