const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { 
    type: String,
    required: true 
  },
  otp: {
    type: String
  }
});

mongoose.model("users", userSchema);
