const mongoose = require("mongoose");
const { Schema } = mongoose;

const userSchema = new Schema({
  email: { type: String, required: true },
  password: { type: String, required: true },
  role: { type: String, enum: ["artist", "customer", "admin"] },
  name: { type: String, required: true },
  avatar: { type: String },
  createdAt: { type: Date, default: Date.now },
});

mongoose.model("users", userSchema);
