const mongoose = require("mongoose");
const userAuth = require("../middleware/userAuth");
const Order = mongoose.model("orders");
const Product = mongoose.model("products");
const Artists = mongoose.model("artists");

module.exports = (app) => {
  // Get artist dashboard analytics
  app.get("/api/v1/artist/dashboard/analytics", userAuth, async (req, res) => {
    try {
      const artistId = req.user.id;

      // Get all products by this artist
      const artistProducts = await Product.find({ artistId }).select('_id');
      const productIds = artistProducts.map(p => p._id);

      // Get all orders containing artist's products
      const orders = await Order.find({
        'items.productId': { $in: productIds }
      }).populate('items.productId');

      // Calculate revenue (only from artist's products)
      let totalRevenue = 0;
      let totalOrders = 0;
      let itemsSold = 0;

      orders.forEach(order => {
        order.items.forEach(item => {
          if (productIds.some(id => id.equals(item.productId._id))) {
            totalRevenue += item.price * item.quantity;
            itemsSold += item.quantity;
          }
        });
        totalOrders++;
      });

      // Calculate revenue change (last 30 days vs previous 30 days)
      const thirtyDaysAgo = new Date();
      thirtyDaysAgo.setDate(thirtyDaysAgo.getDate() - 30);
      
      const sixtyDaysAgo = new Date();
      sixtyDaysAgo.setDate(sixtyDaysAgo.getDate() - 60);

      const recentOrders = orders.filter(o => o.createdAt >= thirtyDaysAgo);
      const previousOrders = orders.filter(o => 
        o.createdAt >= sixtyDaysAgo && o.createdAt < thirtyDaysAgo
      );

      let recentRevenue = 0;
      recentOrders.forEach(order => {
        order.items.forEach(item => {
          if (productIds.some(id => id.equals(item.productId._id))) {
            recentRevenue += item.price * item.quantity;
          }
        });
      });

      let previousRevenue = 0;
      previousOrders.forEach(order => {
        order.items.forEach(item => {
          if (productIds.some(id => id.equals(item.productId._id))) {
            previousRevenue += item.price * item.quantity;
          }
        });
      });

      const revenueChange = previousRevenue > 0 
        ? ((recentRevenue - previousRevenue) / previousRevenue * 100).toFixed(1)
        : 0;

      const orderChange = previousOrders.length > 0
        ? ((recentOrders.length - previousOrders.length) / previousOrders.length * 100).toFixed(1)
        : 0;

      // Get artist info for store visits (mock data for now)
      const artist = await Artists.findById(artistId);
      const storeVisits = Math.floor(Math.random() * 10000); // Replace with actual analytics

      res.status(200).json({
        success: true,
        analytics: {
          revenue: {
            value: totalRevenue.toFixed(2),
            change: `${revenueChange >= 0 ? '+' : ''}${revenueChange}%`,
            changeType: revenueChange >= 0 ? 'positive' : 'negative'
          },
          orders: {
            value: totalOrders,
            change: `${orderChange >= 0 ? '+' : ''}${orderChange}%`,
            changeType: orderChange >= 0 ? 'positive' : 'negative'
          },
          visits: {
            value: storeVisits,
            change: '+8.2%', // Mock data - integrate with analytics service
            changeType: 'positive'
          },
          reviews: {
            value: '0 New', // Implement reviews system
            change: '0 Avg',
            changeType: 'neutral'
          }
        }
      });

    } catch (error) {
      console.error("Dashboard analytics error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch dashboard analytics",
        error: error.message
      });
    }
  });

  // Get recent orders for artist
  app.get("/api/v1/artist/dashboard/recent-orders", userAuth, async (req, res) => {
    try {
      const artistId = req.user.id;
      const limit = parseInt(req.query.limit) || 5;

      // Get artist's products
      const artistProducts = await Product.find({ artistId }).select('_id');
      const productIds = artistProducts.map(p => p._id);

      // Get orders containing artist's products
      const orders = await Order.find({
        'items.productId': { $in: productIds }
      })
        .populate('items.productId', 'name design')
        .populate('userId', 'name email')
        .sort({ createdAt: -1 })
        .limit(limit);

      // Filter and format orders to show only artist's products
      const formattedOrders = orders.map(order => {
        const artistItems = order.items.filter(item => 
          productIds.some(id => id.equals(item.productId._id))
        );

        const orderTotal = artistItems.reduce((sum, item) => 
          sum + (item.price * item.quantity), 0
        );

        return {
          orderNumber: order.orderNumber,
          _id: order._id,
          customer: order.userId?.name || 'Guest',
          items: artistItems,
          totalAmount: orderTotal,
          orderStatus: order.orderStatus,
          paymentStatus: order.paymentStatus,
          createdAt: order.createdAt
        };
      });

      res.status(200).json({
        success: true,
        orders: formattedOrders
      });

    } catch (error) {
      console.error("Recent orders error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch recent orders",
        error: error.message
      });
    }
  });

  // Get top selling products for artist
  app.get("/api/v1/artist/dashboard/top-products", userAuth, async (req, res) => {
    try {
      const artistId = req.user.id;
      const limit = parseInt(req.query.limit) || 5;

      // Get artist's products
      const artistProducts = await Product.find({ artistId });
      const productIds = artistProducts.map(p => p._id);

      // Get all orders with artist's products
      const orders = await Order.find({
        'items.productId': { $in: productIds }
      }).populate('items.productId');

      // Calculate sales per product
      const productSales = {};

      orders.forEach(order => {
        order.items.forEach(item => {
          if (productIds.some(id => id.equals(item.productId._id))) {
            const productId = item.productId._id.toString();
            
            if (!productSales[productId]) {
              productSales[productId] = {
                product: item.productId,
                totalQuantity: 0,
                totalRevenue: 0
              };
            }
            
            productSales[productId].totalQuantity += item.quantity;
            productSales[productId].totalRevenue += item.price * item.quantity;
          }
        });
      });

      // Convert to array and sort by quantity
      const topProducts = Object.values(productSales)
        .sort((a, b) => b.totalQuantity - a.totalQuantity)
        .slice(0, limit)
        .map(item => ({
          _id: item.product._id,
          name: item.product.name,
          design: item.product.design,
          category: item.product.category,
          price: item.product.price,
          soldQuantity: item.totalQuantity,
          revenue: item.totalRevenue.toFixed(2)
        }));

      res.status(200).json({
        success: true,
        products: topProducts
      });

    } catch (error) {
      console.error("Top products error:", error);
      res.status(500).json({
        success: false,
        message: "Failed to fetch top products",
        error: error.message
      });
    }
  });

  // Get artist profile info
  app.get("/api/v1/artist/profile", userAuth, async (req, res) => {
  try {
    const artist = await Artists.findById(req.user.id);
    if (!artist) {
      return res.status(404).json({ message: "Artist not found" });
    }
    res.status(200).json({ 
      message: "Artist profile fetched successfully", 
      artist 
    });
  } catch (error) {
    console.log(error);
    res.status(500).json({ message: error.message });
  }
});
};