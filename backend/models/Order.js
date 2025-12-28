const mongoose = require("mongoose");
const { Schema } = mongoose;

const orderSchema = new Schema({
  orderNumber: {
    type: String,
    required: true,
    unique: true,
  },
  cartId: {
    type: Schema.Types.ObjectId,
    ref: "cart",
    required: true,
  },
  shippingAddress: {
    name: { type: String },
    phone: { type: Number },
    address: { type: String },
    city: { type: String },
    state: { type: String },
    pincode: { type: Number },
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
  }
});

mongoose.model("orders", orderSchema);
