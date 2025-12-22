const mongoose = require("mongoose");
const { Schema } = mongoose;

const artistSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  artistName: { type: String, required: true },
  storeName: { type: String, required: true },
  domain: { type: String },
  logo: { type: String }, //URL
  avatarImg: { type: String },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("artists", artistSchema);
