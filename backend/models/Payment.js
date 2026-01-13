const mongoose = require("mongoose");
const { Schema } = mongoose;

const paymentSchema = new Schema({
  userId: {
    type: Schema.Types.ObjectId,
    ref: "users",
    required: true,
  },
  orderId: {
    type: Schema.Types.ObjectId,
    ref: "orders",
    required: true,
  },
  amount: {
    type: Number,
    required: true,
  },
  razorpayOrderId: {
    type: String,
    required: true,
  },
  paymentId: {
    type: String,
  },
  status: {
    type: String,
    enum: ["PENDING", "SUCCESS", "FAILED"],
    default: "PENDING",
  },
}, {
  timestamps: true
});

mongoose.model("payments", paymentSchema);
