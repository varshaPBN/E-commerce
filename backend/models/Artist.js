const mongoose = require("mongoose");
const { Schema } = mongoose;

const artistSchema = new Schema({
  email:{
    type: String,
    required: true,
  },
  otp:{
    type: String,
  },
  artistName: { 
    type: String, 
    required: true
  },
  storeName: {
    type: String,
    required: true 
  },
  domain: {
    type: String 
  },
  logo: { 
    type: String 
  }, //URL
  avatarImg: {
    type: String 
  },
  isEmailVerified:{
    type: Boolean
  }
});

mongoose.model("artists", artistSchema);
