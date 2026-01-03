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
  enum: ["Tshirt", "Hat", "Mug", "Bag"],
  required: true
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
    enum: ["Black", "White", "Red", "Blue", "Green"],
    default: [],
  },
  sizes: {
    type: [String],
    enum: ["XS", "S", "M", "L", "XL", "XXL"],
    default: [],
  }
});

mongoose.model("products", productSchema);
