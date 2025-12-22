const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  customerId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  artistId: {
    type: Schema.Types.ObjectId,
    ref: "artists",
    required: true,
  },
  items: [
    {
      productId: {
        type: Schema.Types.ObjectId,
        ref: "products",
        required: true,
      },
      productName: { type: String },
      category: { type: String },
      color: { type: String },
      size: { type: String },
      quantity: {
        type: Number,
        default: 1,
      },
      price: { type: Number },
      sampleImage: String,
    },
  ],
  shippingAddress: {
    name: { type: String },
    phone: { type: Number },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: Number },
  },
  total: {
    type: Number,
    required: true,
  },
  orderStatus: {
    type: String,
    enum: [
      "pending",
      "confirmed",
      "processing",
      "shipped",
      "delivered",
      "cancelled",
    ],
    default: "pending",
  },
  paymentStatus: {
    type: String,
    enum: ["pending", "paid", "failed"],
    default: "pending",
  },
  paymentMethod: {
    type: String,
    enum: ["upi", "card", "cod"],
  },
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

mongoose.model("orders", orderSchema);
