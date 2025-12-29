const userAuth = require("../middleware/userAuth");
const mongoose = require("mongoose");
const Cart = mongoose.model("cart");
const Product = mongoose.model("products");

module.exports = (app) => {
  // Get all items in cart of user
  app.get("/api/v1/get/cart/", userAuth, async (req, res) => {
    try {
      const cart = await Cart.findOne({ userId: req.user.id });

      if (!cart) {
        return res.status(404).json({ message: "Cart is empty", cart: null });
      }

      res.status(200).json({ message: "Cart fetched successfully", cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });
  // Add item to cart
  app.post("/api/v1/add/cart", userAuth, async (req, res) => {
    const { productId, color, size, quantity } = req.body;

    try {
      const product = await Product.findById(productId);
      if (!product) {
        return res.status(404).json({ message: "Product not found" });
      }
      const cart = await Cart.findOne({ userId: req.user.id });
      if (!cart) {
        const newCart = await Cart.create({
          userId: req.user.id,
          items: [
            {
              productId,
              color,
              size,
              quantity,
              price: product?.price * quantity,
            },
          ],
        });
        return res
          .status(201)
          .json({ message: "Product added to cart", cart: newCart });
      }

      const itemIndex = cart.items.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.color === color &&
          item.size === size
      );

      if (itemIndex > -1) {
        cart.items[itemIndex].quantity += quantity;
        cart.items[itemIndex].price =
          product?.price * cart.items[itemIndex].quantity;
      } else {
        cart.items.push({
          productId,
          color,
          size,
          quantity,
          price: product?.price * quantity,
        });
      }

      cart.updatedAt = Date.now();

      await cart.save();
      res.status(200).json({ message: "Product added to cart", cart: cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Increment or Decrement quantity of item
  app.patch("/api/v1/cart/item/:productId", userAuth, async (req, res) => {
    const { productId } = req.params;
    const { size, color } = req.query;
    const { action } = req.body;
    try {
      const cart = await Cart.findOne({ userId: req.user.id });
      const product = await Product.findById(productId);
      if (!cart) {
        return res.status(404).json({ message: "Cart is empty", cart: null });
      }
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.color === color &&
          item.size === size
      );
      if (itemIndex === -1) {
        return res.status(404).json({ message: "Item not found" });
      }
      if (action === "increase") {
        cart.items[itemIndex].quantity += 1;
      } else {
        cart.items[itemIndex].quantity > 1 &&
          (cart.items[itemIndex].quantity -= 1);
      }
      cart.items[itemIndex].price =
        product.price * cart.items[itemIndex].quantity;
      cart.updatedAt = Date.now();
      await cart.save();
      res
        .status(200)
        .json({ message: `Product Quantity ${action}d successfully`, cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Update quantity of item
  app.put("/api/v1/update/cart/item/:productId", userAuth, async (req, res) => {
    const { productId } = req.params;
    const { size, color } = req.query;
    const { quantity } = req.body;
    try {
      const cart = await Cart.findOne({ userId: req.user.id });
      const product = await Product.findById(productId);
      if (!cart) {
        return res.status(404).json({ message: "Cart is empty", cart: null });
      }
      const itemIndex = cart.items.findIndex(
        (item) =>
          item.productId.toString() === productId &&
          item.color === color &&
          item.size === size
      );
      if (itemIndex === -1) {
        return res.status(404).json({ message: "Item not found" });
      }
      cart.items[itemIndex].quantity = quantity;
      cart.items[itemIndex].price =
        product.price * cart.items[itemIndex].quantity;
      cart.updatedAt = Date.now();
      await cart.save();
      res
        .status(200)
        .json({ message: "Product Quantity updated successfully", cart });
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  });

  // Delete item from cart
  app.delete(
    "/api/v1/delete/cart/item/:productId",
    userAuth,
    async (req, res) => {
      const { productId } = req.params;
      const { size, color } = req.query;
      try {
        const cart = await Cart.findOneAndUpdate(
          { userId: req.user.id },
          {
            $pull: {
              items: {
                productId,
                size,
                color,
              },
            },
            $set: {
              updatedAt: Date.now(),
            },
          },
          { new: true }
        );
        if (!cart) {
          res.status(404).json({ message: "Cart or Item not found" });
        }
        res.status(200).json({ message: "Item deleted successfully", cart });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    }
  );
};
