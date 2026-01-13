const mongoose = require("mongoose");
const Razorpay = require("razorpay");
const CryptoJS = require("crypto-js");
// ==== IMPORT SERVICES ====
const errorCodes = require("../services/errorCodes");

// ==== IMPORT MIDDLEWARE ====
const userAuth = require("../middleware/userAuth");

// ==== IMPORT MODELS ====
const Payment = mongoose.model("payments");
const Order = mongoose.model("orders");
const Cart = mongoose.model("cart");

const ROUTE_TYPE = "USER";

module.exports = (app) => {
  // =============
  // ==== PAY ====
  // =============
  app.post("/api/v1/user/pay", userAuth, async (req, res) => {
    console.log(`==== ${ROUTE_TYPE} PAYMENT ==== \n body:`, req.body);
    try {
      const { orderId } = req.body;

      if (!orderId) {
        return res.status(400).send({
          error: "Order ID is required",
        });
      }

      // ==== FIND ORDER ====
      const order = await Order.findOne({
        _id: orderId,
        userId: req.user.id,
      });

      if (!order) {
        return res.status(404).send({
          error: "Order not found",
        });
      }

      if (order.paymentStatus === "paid") {
        return res.status(400).send({
          error: "Order already paid",
        });
      }

      // ==== CREATE INSTANCE ====
      const instance = new Razorpay({
        key_id: process.env.RAZORPAY_KEY_ID,
        key_secret: process.env.RAZORPAY_KEY_SECRET,
      });

      const options = {
        amount: Math.round(order.totalAmount * 100), // Convert to paise
        currency: "INR",
      };

      instance.orders.create(options, async (err, razorpayOrder) => {
        if (err) {
          console.log(`==== ${ROUTE_TYPE} PAYMENT ERROR ==== \n error:`, err);
          return res.status(500).send({
            error: errorCodes.server_error,
          });
        }
        // ==== CREATE PAYMENT ====
        const payment = await Payment.create({
          userId: req.user.id,
          orderId: order._id,
          razorpayOrderId: razorpayOrder.id, // Razorpay order ID
          amount: order.totalAmount,
          status: "PENDING",
        });
        res.json({
          success: true,
          message: "Payment request created successfully",
          razorpayOrderId: razorpayOrder.id,
          amount: order.totalAmount,
        });
      });
    } catch (err) {
      console.log(`==== ${ROUTE_TYPE} PAYMENT ERROR ==== \n error:`, err);
      return res.status(500).send({
        error: errorCodes.server_error,
      });
    }
  });

  // ==============================
  // ==== PAYMENT VERIFICATION ====
  // ==============================
  app.post("/api/v1/user/payment/verify", userAuth, async (req, res) => {
    console.log(
      `==== ${ROUTE_TYPE} PAYMENT VERIFICATION ==== \n body:`,
      req.body
    );
    try {
      const { paymentId, razorpayOrderId, signature } = req.body;
      
      if (!paymentId || !razorpayOrderId || !signature) {
        return res.status(400).send({
          error: "Payment ID, Razorpay Order ID, and signature are required",
        });
      }

      const payment = await Payment.findOne({ razorpayOrderId });
      if (!payment) {
        return res.status(400).send({
          error: errorCodes.payment_not_found,
        });
      }

      // Verify payment belongs to user
      if (payment.userId.toString() !== req.user.id.toString()) {
        return res.status(403).send({
          error: "Unauthorized",
        });
      }

      const generated_signature = CryptoJS.HmacSHA256(
        razorpayOrderId + "|" + paymentId,
        process.env.RAZORPAY_KEY_SECRET
      ).toString();
      
      if (generated_signature !== signature) {
        return res.status(400).send({
          error: errorCodes.payment_verification_failed,
        });
      }

      // ==== UPDATE PAYMENT STATUS ====
      await Payment.findByIdAndUpdate(payment._id, {
        status: "SUCCESS",
        paymentId: paymentId,
      });

      // ==== UPDATE ORDER PAYMENT STATUS ====
      await Order.findByIdAndUpdate(payment.orderId, {
        paymentStatus: "paid",
      });

      // ==== CLEAR CART AFTER SUCCESSFUL PAYMENT ====
      await Cart.findOneAndUpdate(
        { userId: req.user.id },
        { $set: { items: [], updatedAt: Date.now() } }
      );

      res.json({
        success: true,
        message: "Payment verified successfully",
      });
    } catch (err) {
      console.log(
        `==== ${ROUTE_TYPE} PAYMENT VERIFICATION ERROR ==== \n error:`,
        err
      );
      return res.status(500).send({
        error: errorCodes.server_error,
      });
    }
  });
};
