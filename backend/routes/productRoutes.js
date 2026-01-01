const mongoose = require("mongoose");
const userAuth = require("../middleware/userAuth");
const Products = mongoose.model("products")


module.exports = (app) => {
    //product creation
    app.post("/api/v1/artist/products/create", userAuth, async (req, res) => {
    try {
      const {
        name,
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
    app.delete("/api/v1/products/:productId", requireLogin, async (req, res) => {
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
  app.put("/api/v1/products/:productId", requireLogin, async (req, res) => {
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

};
