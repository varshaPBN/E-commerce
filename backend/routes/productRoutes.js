const mongoose = require("mongoose");
const userAuth = require("../middleware/userAuth");
const Products = mongoose.model("products")


module.exports = (app) => {

    // Get available categories
    app.get("/api/v1/artist/products/categories", async (req, res) => {
      try {
        const categories = ["Tshirt", "Hats", "Mug", "Bags"];
        res.status(200).json({
          message: "Categories fetched successfully",
          categories
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    // Get available colors
    app.get("/api/v1/artist/products/colors", async (req, res) => {
      try {
        const colors = ["Black", "White", "Red", "Blue", "Green"];
        res.status(200).json({
          message: "Colors fetched successfully",
          colors
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    app.get("/api/v1/artist/products/sizes", async (req, res) => {
      try {
        const sizes = ["XS", "S", "M", "L", "XL", "XXL"];
        res.status(200).json({
          message: "Sizes fetched successfully",
          sizes
        });
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    });

    //product creation
    app.post("/api/v1/artist/products/create", userAuth, async (req, res) => {
    try {
      const {
        name,
        description,
        category,
        price,
        design,
        colors,
        sizes
      } = req.body;

      // Basic validation
      if (!name || !category || !price) {
        return res.status(400).json({ message: "Required fields missing" });
      }

      const product = await Products.create({
        artistId: req.user.id,
        name,
        description,
        category,
        price,
        design,
        colors,
        sizes
      });

      res.status(201).json({
        message: "Product created successfully",
        product
      });

    } catch (error) {
      console.log(error);
      res.status(500).json({ message: error.message });
    }
  });

  //product view
   app.get("/api/v1/artist/products/view", userAuth, async (req, res) => {
    console.log("Logged in artist id:", req.user.id);
    try {
    const products = await Products.find({
      artistId: req.user.id
    });

    res.status(200).json({
      message: "My products fetched successfully",
      products
    });
    } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
    }
});
  //product delete
    app.delete("/api/v1/artist/products/:productId", userAuth, async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Products.findOne({
      _id: productId,
      artistId: req.user.id
    });

    if (!product) {
      return res.status(404).json({
        message: "Product not found or unauthorized"
      });
    }

    await Products.deleteOne({ _id: productId });

    res.status(200).json({
      message: "Product deleted successfully"
    });

  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

  //product updation
  app.put("/api/v1/artist/products/:productId", userAuth, async (req, res) => {
  try {
    const updated = await Products.updateOne(
      { _id: req.params.productId, artistId: req.user.id },
      req.body
    );

    res.status(200).json({
      message: "Product updated successfully",
      updated
    });

  } catch (error) {
    res.status(500).json({ message: error.message });
  }
});

  // User – view all products of an artist (public)
app.get("/api/v1/:artistId/products", async (req, res) => {
  try {
    const { artistId } = req.params;

    const products = await Products.find({ artistId });

    res.status(200).json({
      message: "Artist products fetched successfully",
      products
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});

  // User – view single product details (public)
app.get("/api/v1/user/products/:productId", async (req, res) => {
  try {
    const { productId } = req.params;

    const product = await Products.findById(productId);

    if (!product) {
      return res.status(404).json({ message: "Product not found" });
    }

    res.status(200).json({
      message: "Product details fetched successfully",
      product
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});


};
