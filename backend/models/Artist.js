const mongoose = require("mongoose");
const { Schema } = mongoose;

const artistSchema = new Schema({
  email:{
    type: String,
    required: true,
    unique: true,
  },
  otp:{
    type: String,
  },
  name: { 
    type: String, 
    // required: true
  },
  storeName: {
    type: String,
    // required: true 
  },
  domain: {
    type: String 
  },
  logo: { 
    type: String 
  }, //URL
  avatar: {
    type: String 
  },
  isEmailVerified:{
    type: Boolean,
    default: false
  }
});

mongoose.model("artists", artistSchema);
