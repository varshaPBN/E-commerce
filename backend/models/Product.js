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
  description: {
    type: String
  },
  category: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  actualPrice: {
    type: Number,
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
