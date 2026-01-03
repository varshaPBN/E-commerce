const mongoose = require("mongoose");
const Admin = mongoose.model("admins");
const jwt = require("jsonwebtoken");
const bcrypt = require("bcryptjs");

module.exports = (app) => {
  app.post("/api/v1/admin/login", async (req, res) => {
    const { email, password } = req.body;

    try {
      const admin = await Admin.findOne({ email });
      if (!admin) {
        return res.status(404).json({ message: "Admin not found" });
      }

      const isMatch = await bcrypt.compare(password, admin.password);
      if (!isMatch) {
        return res.status(401).json({ message: "Invalid credentials" });
      }

      const token = jwt.sign(
        { id: admin._id, role: "admin" },
        process.env.JWT_SECRET,
        { expiresIn: "1d" }
      );

      res.status(200).json({ message: "Admin login successful", token });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  app.get("/api/v1/admin/orders", adminAuth, async (req, res) => {
  try {
    const orders = await Orders.find()
      .populate("userId", "email name")
      .populate("items.productId", "name design price");

    res.status(200).json({
      message: "All orders fetched",
      orders
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

    app.get("/api/v1/admin/orders/:orderId", adminAuth, async (req, res) => {
  try {
    const order = await Orders.findById(req.params.orderId)
      .populate("userId")
      .populate("items.productId");

    if (!order) {
      return res.status(404).json({ message: "Order not found" });
    }

    res.status(200).json({
      message: "Order details fetched",
      order
    });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

};
