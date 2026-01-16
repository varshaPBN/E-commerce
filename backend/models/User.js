const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { 
    type: String,
    required: true 
  },
  otp: {
    type: String
  },
  otpExpiresAt: {
    type: Date
  }
});

mongoose.model("users", userSchema);
