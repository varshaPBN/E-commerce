const mongoose = require("mongoose");
const userAuth = require("../middleware/userAuth");
const Order = mongoose.model("orders");
const Product = mongoose.model("products");

const generateOrderNumber = () => {
  const timestamp = Date.now();
  const random = Math.floor(Math.random() * 1000);
  return `ORD${timestamp}${random}`;
};

const validateDeliveryDate = (deliveryDate) => {
  const selectedDate = new Date(deliveryDate);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if date is in the past
  if (selectedDate < today) {
    return { valid: false, message: "Delivery date cannot be in the past" };
  }

  // Check if date is within 30 days (optional business rule)
  const maxDate = new Date();
  maxDate.setDate(maxDate.getDate() + 30);

  if (selectedDate > maxDate) {
    return { valid: false, message: "Delivery date must be within 30 days" };
  }

  return { valid: true };
};

// Calculate order amounts
const calculateOrderAmounts = (subtotal) => {
  const shippingCharge = 50;
  const taxAmount = 10;

  // Total amount
  const totalAmount = subtotal + shippingCharge + taxAmount;

  return {
    subtotal,
    shippingCharge,
    taxAmount,
    totalAmount,
  };
};

module.exports = (app) => {
  app.post("/api/v1/orders/create", userAuth, async (req, res) => {
    try {
      const { items, shippingAddress, paymentMethod, deliveryDate } = req.body;
      const userId = req.user.id;

      // Validation
      if (!items || items.length === 0) {
        return res.status(400).json({
          success: false,
          message: "Items not found",
        });
      }

      if (!shippingAddress) {
        return res.status(400).json({
          success: false,
          message: "Shipping address is required",
        });
      }

      if (!deliveryDate) {
        return res.status(400).json({
          success: false,
          message: "Delivery date is required",
        });
      }

      // Validate delivery date
      const dateValidation = validateDeliveryDate(deliveryDate);
      if (!dateValidation.valid) {
        return res.status(400).json({
          success: false,
          message: dateValidation.message,
        });
      }

      // Verify products and calculate subtotal
      let subtotal = 0;
      const orderItems = [];

      for (const item of items) {
        const product = await Product.findById(item.productId);

        if (!product) {
          return res.status(404).json({
            success: false,
            message: `Product not found`,
          });
        }

        // Validate color and size
        if (!product.colors.includes(item.color)) {
          return res.status(400).json({
            success: false,
            message: `Color ${item.color} not available for ${product.name}`,
          });
        }

        if (!product.sizes.includes(item.size)) {
          return res.status(400).json({
            success: false,
            message: `Size ${item.size} not available for ${product.name}`,
          });
        }

        orderItems.push({
          productId: product._id,
          name: product.name,
          quantity: item.quantity,
          price: product.price,
          color: item.color,
          size: item.size,
        });

        subtotal += product.price * item.quantity;
      }

      // Calculate amounts
      const amounts = calculateOrderAmounts(subtotal);

      // Create order
      const order = new Order({
        orderNumber: generateOrderNumber(),
        userId,
        items: orderItems,
        subtotal: amounts.subtotal,
        shippingCharge: amounts.shippingCharge,
        taxAmount: amounts.taxAmount,
        totalAmount: amounts.totalAmount,
        shippingAddress,
        paymentMethod,
        deliveryDate: new Date(deliveryDate),
        orderStatus: "pending",
        paymentStatus: "pending",
      });

      await order.save();

      // Populate product details
      await order.populate("items.productId", "name design");

      res.status(201).json({
        success: true,
        message: "Order placed successfully",
        order,
      });
    } catch (error) {
      console.error("Create order error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create order",
        error: error.message,
      });
    }
  });

  app.get("/api/v1/get/orders", userAuth, async (req, res) => {
    try {
      const userId = req.user.id;

      const orders = await Order.find({ userId })
        .populate("items.productId", "name design price")
        .sort({ createdAt: -1 });

      res.status(200).json({
        success: true,
        count: orders.length,
        orders,
      });
    } catch (error) {
      console.error("Get orders error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch orders",
        error: error.message,
      });
    }
  });

  app.get("/api/v1/get/order/:orderId", userAuth, async (req, res) => {
    try {
      const { orderId } = req.params;
      const userId = req.user.id;

      const order = await Order.findOne({
        _id: orderId,
        userId,
      }).populate("items.productId", "name design price");

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      res.status(200).json({
        success: true,
        order,
      });
    } catch (error) {
      console.error("Get order error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch order",
        error: error.message,
      });
    }
  });

  app.put("/api/v1/cancel/order/:orderId", userAuth, async (req, res) => {
    try {
      const { orderId } = req.params;
      const userId = req.user.id;

      const order = await Order.findOne({
        _id: orderId,
        userId,
      });

      if (!order) {
        return res.status(404).json({
          success: false,
          message: "Order not found",
        });
      }

      // Check if order can be cancelled
      if (order.orderStatus === "delivered") {
        return res.status(400).json({
          success: false,
          message: "Delivered orders cannot be cancelled",
        });
      }

      if (order.orderStatus === "cancelled") {
        return res.status(400).json({
          success: false,
          message: "Order is already cancelled",
        });
      }

      // Update order status
      order.orderStatus = "cancelled";
      await order.save();

      res.status(200).json({
        success: true,
        message: "Order cancelled successfully",
        order,
      });
    } catch (error) {
      console.error("Cancel order error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to cancel order",
        error: error.message,
      });
    }
  });
};
