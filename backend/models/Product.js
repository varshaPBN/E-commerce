const mongoose = require("mongoose");
const { Schema } = mongoose;

const productSchema = new Schema({
  artistId: {
    type: Schema.Types.ObjectId,
    ref: "artists",
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  design: {
   type: String,
  },
  colors: {
    type: [String],
    default: [],
  },
  sizes: {
    type: [String],
    default: [],
  }
});

mongoose.model("products", productSchema);
