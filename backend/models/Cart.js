const mongoose = require("mongoose");
const { Schema } = mongoose;

const cartSchema = new Schema({
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
    unique: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: "true",
      },
      productName: { type: String, required: true },
      artistName: { type: String, required: true },
      color: { type: String },
      size: { type: String },
      quantity: {
        type: Number,
        min: 1,
        default: 1,
      },
      price: { type: Number, required: true },
      sampleImage: String,
      addedAt: {
        type: Date,
        default: Date.now,
      },
    },
  ],
  updatedAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("cart", cartSchema);
