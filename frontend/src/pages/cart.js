// pages/cart.tsx
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Paper,
  Divider,
  CircularProgress,
  Alert,
  Snackbar,
} from "@mui/material";
import { Delete, Add, Remove, Balance } from "@mui/icons-material";
import { useRouter } from "next/router";
import ProductsHeader from "@/components/common/ProductsHeader";
import BackButton from "@/components/common/BackButton";
import ProductsCard from "@/components/common/ProductsCard";
import ShippingForm from "@/components/checkout/ShippingForm";
import { blue } from "@mui/material/colors";
import axios from "axios";
import { getAuthToken } from "@/utils/auth";

const CartPage = () => {
  const router = useRouter();
  const [cartItems, setCartItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const [authError, setAuthError] = useState(false);
  const [checkoutOpen, setCheckoutOpen] = useState(false);
  const [checkoutLoading, setCheckoutLoading] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  // Fetch cart items from API
  const fetchCart = async () => {
    try {
      setLoading(true);
      setAuthError(false);
      const token = getAuthToken();
      
      if (!token) {
        setAuthError(true);
        return;
      }

      const response = await axios.get("/api/v1/get/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      const items = response.data.cart?.items || [];
      const cartItems = items.map((item) => {
        const product = item.productId;
        const artist = product?.artistId;
        
        // Build variant string
        const variant = [item.color, item.size]
          .filter(Boolean)
          .filter(v => v !== "None")
          .join(" - ") || "Standard";

        return {
          id: item._id,
          productId: product?._id || item.productId,
          name: product?.name || "Product",
          artist: artist?.name || artist?.storeName || "Unknown Artist",
          variant,
          price: product?.price || item.price / item.quantity,
          quantity: item.quantity,
          image: product?.design || "/products/default.png",
          color: item.color,
          size: item.size,
        };
      });

      setCartItems(cartItems);
      
      // Trigger cart count refresh in header
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (error) {
      if (error.response?.status === 401) {
        setAuthError(true);
      } else if (error.response?.status === 404) {
        setCartItems([]);
        // Cart is empty, trigger update
        window.dispatchEvent(new CustomEvent("cartUpdated"));
      }
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchCart();
  }, []);

  const suggestedProducts = [
    {
      id: "695bf20d4c3597dcfe31af5d",
      title: "Custom embroidered hat",
      description:
        "Custom embroidered hat means hats that are specially made or decorated with s...",
      price: "₹149",
      image: "/products/hat.jpg",
    },
    {
      id: "695bf20d4c3597dcfe31af5b",
      title: "Sunflower Soul Denim Jacket",
      description:
        "A face hidden behind flowers — bold, fearless, and beautifully untamed. This j...",
      price: "₹299",
      image: "/products/jacket.jpg",
    },
    {
      id: "695bf20d4c3597dcfe31af5c",
      title: "Purr-fect Cat Graphic T-Shirt",
      description:
        "Show off your love for cats with this fun front-print t-shirt. Made for cat lovers...",
      price: "₹149",
      image: "/products/cat-tshirt.png",
    },
  ];

  const updateQuantity = async (item, delta) => {
    const newQuantity = item.quantity + delta;
    if (newQuantity < 1) return;

    try {
      const token = getAuthToken();
      if (!token) {
        setAuthError(true);
        return;
      }

      const action = delta > 0 ? "increase" : "decrease";
      
      await axios.patch(
        `/api/v1/cart/item/${item.productId}?size=${item.size || ""}&color=${item.color || ""}`,
        { action },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state optimistically
      setCartItems((items) =>
        items.map((cartItem) =>
          cartItem.id === item.id
            ? { ...cartItem, quantity: newQuantity }
            : cartItem
        )
      );
    } catch (error) {
      if (error.response?.status === 401) {
        setAuthError(true);
      } else {
        // Refresh cart on error
        fetchCart();
      }
    }
  };

  const removeItem = async (item) => {
    try {
      const token = getAuthToken();
      if (!token) {
        setAuthError(true);
        return;
      }
      
      await axios.delete(
        `/api/v1/delete/cart/item/${item.productId}?size=${item.size || ""}&color=${item.color || ""}`,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Update local state
      setCartItems((items) => items.filter((cartItem) => cartItem.id !== item.id));
      
      // Trigger cart count refresh in header immediately
      window.dispatchEvent(new CustomEvent("cartUpdated"));
    } catch (error) {
      if (error.response?.status === 401) {
        setAuthError(true);
      } else {
        // Refresh cart on error
        fetchCart();
      }
    }
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 50;
  const taxes = 10;
  const total = subtotal + shipping + taxes;

  const handleCheckout = async (shippingData) => {
    if (cartItems.length === 0) {
      setSnackbar({
        open: true,
        message: "Your cart is empty",
        severity: "warning",
      });
      return;
    }

    setCheckoutLoading(true);
    try {
      const token = getAuthToken();
      if (!token) {
        setSnackbar({
          open: true,
          message: "Please login to continue",
          severity: "error",
        });
        setCheckoutLoading(false);
        return;
      }

      // Prepare order items from cart
      // Note: Backend will use first available color/size if "None" is provided
      const items = cartItems.map((item) => ({
        productId: typeof item.productId === 'object' ? item.productId._id || item.productId.toString() : item.productId,
        quantity: item.quantity,
        color: item.color || "None",
        size: item.size || "None",
      }));

      // Create order
      const response = await axios.post(
        "/api/v1/orders/create",
        {
          items,
          shippingAddress: shippingData.shippingAddress,
          paymentMethod: "online", // Will be selected on payment page
          deliveryDate: shippingData.deliveryDate,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.data.success) {
        const orderId = response.data.order._id;
        setCheckoutOpen(false);
        
        // Clear local cart state and update badge immediately
        setCartItems([]);
        window.dispatchEvent(new CustomEvent("cartUpdated"));
        
        // Redirect to payment page
        router.push(`/payment?orderId=${orderId}`);
      } else {
        throw new Error(response.data.message || "Failed to create order");
      }
    } catch (error) {
      console.error("Checkout error:", error);
      console.error("Error response:", error.response?.data);
      console.error("Request payload:", {
        items,
        shippingAddress: shippingData.shippingAddress,
        paymentMethod: "online",
        deliveryDate: shippingData.deliveryDate,
      });
      setSnackbar({
        open: true,
        message: error.response?.data?.message || error.message || "Failed to create order. Please try again.",
        severity: "error",
      });
    } finally {
      setCheckoutLoading(false);
    }
  };

  return (
    <Box sx={{ bgcolor: "#FDF8F2", minHeight: "100vh", pb: 4 }}>
      {/* Header */}
      <ProductsHeader />

      {/* Back Button */}
      <BackButton />

      {/* Main Content */}
      <Container maxWidth="lg" sx={{ mt: 3 }}>
        <Box
          sx={{
            display: "flex",
            gap: 5,
            justifyContent: "space-between",
            alignItems: "flex-start",
          }}
        >
          {/* Cart Items Section */}
          <Box>
            <Typography
              variant="h3"
              sx={{ fontWeight: 700, mb: 1, fontFamily: "Playfair Display" }}
            >
              Your Cart
            </Typography>

            {loading ? (
              <Box sx={{ display: "flex", justifyContent: "center", py: 4 }}>
                <CircularProgress />
              </Box>
            ) : authError ? (
              <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: "#d32f2f", mb: 2 }}>
                  Authentication Required
                </Typography>
                <Typography variant="body1" sx={{ color: "#666", mb: 3 }}>
                  Please log in to view your cart. Your session may have expired.
                </Typography>
                <Button
                  variant="contained"
                  onClick={() => {
                    window.location.reload();
                  }}
                  sx={{
                    bgcolor: "#3D2817",
                    color: "white",
                    "&:hover": { bgcolor: "#2D1F12" },
                  }}
                >
                  Refresh Page
                </Button>
              </Box>
            ) : cartItems.length === 0 ? (
              <Box sx={{ py: 4, textAlign: "center" }}>
                <Typography variant="h6" sx={{ color: "#666" }}>
                  Your cart is empty
                </Typography>
              </Box>
            ) : (
              <Box sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
                {cartItems.map((item) => (
                <Paper
                  key={item.id}
                  elevation={0}
                  sx={{
                    p: 3,
                    borderRadius: 2,
                    bgcolor: "#E8E0D5",
                    display: "flex",
                    alignItems: "center",
                    gap: 3,
                  }}
                >
                  {/* Product Image */}
                  <Box
                    sx={{
                      width: 100,
                      height: 100,
                      borderRadius: 1,
                      overflow: "hidden",
                      bgcolor: "white",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      flexShrink: 0,
                    }}
                  >
                    <Box
                      component="img"
                      src={item.image}
                      sx={{ width: "100%" }}
                    ></Box>
                  </Box>

                  {/* Product Details */}
                  <Box sx={{ flex: 1 }}>
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5, color: "black", fontFamily: "Inter" }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                      {item.artist}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      {item.variant}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700, color: "black", fontFamily: "Inter" }}>
                      ₹{item.price}
                    </Typography>
                  </Box>

                  {/* Controls */}
                  <Box
                    sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "flex-end",
                      gap: 2,
                    }}
                  >
                    <IconButton
                      size="small"
                      onClick={() => removeItem(item)}
                      sx={{ alignSelf: "flex-end" }}
                    >
                      <Box
                        component="img"
                        src="/icons/delete.png"
                        sx={{ width: 24, height: 24 }}
                      />
                    </IconButton>

                    {/* Quantity Controls */}
                    <Box
                      sx={{
                        display: "flex",
                        alignItems: "center",
                        border: "1px solid #C5BDB1",
                        borderRadius: 2,
                      }}
                    >
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item, -1)}
                        disabled={item.quantity <= 1}
                        sx={{ borderRadius: 0 }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <Typography
                        sx={{ px: 2, minWidth: 40, textAlign: "center", color: "black" }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item, 1)}
                        sx={{ borderRadius: 0 }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
                ))}
              </Box>
            )}

            {/* You Might Also Like */}
            <Box sx={{ mt: 6 }}>
              <Typography
                variant="h4"
                sx={{ fontWeight: 700, mb: 3, fontFamily: "Playfair Display" }}
              >
                You Might Also Like
              </Typography>

              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "repeat(3, 1fr)",
                  gap: 2,
                  "@media (max-width: 1200px)": {
                    gridTemplateColumns: "repeat(3, minmax(200px, 1fr))",
                  },
                }}
              >
                {suggestedProducts.map((product, index) => (
                  <Box key={index}>
                    <ProductsCard
                      id={product.id}
                      index={index}
                      image={product.image}
                      title={product.title}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Order Summary Section - Only show when cart has items */}
          {cartItems.length > 0 && (
            <Box>
              <Paper
                elevation={0}
                sx={{
                  p: 4,
                  borderRadius: 2,
                  bgcolor: "#E8E0D5",
                  position: "sticky",
                  top: 20,
                }}
              >
              <Typography variant="h4" sx={{ fontWeight: 700, mb: 4 }}>
                Order Summary
              </Typography>

              {/* Order Items */}
              {cartItems.length > 0 && (
                <Box sx={{ mb: 3 }}>
                  {cartItems.map((item) => (
                    <Box key={item.id} sx={{ display: "flex", gap: 2, mb: 3 }}>
                      <Box
                        sx={{
                          width: 70,
                          height: 70,
                          borderRadius: 1,
                          overflow: "hidden",
                          bgcolor: "white",
                          display: "flex",
                          alignItems: "center",
                          justifyContent: "center",
                          flexShrink: 0,
                        }}
                      >
                        <Box
                          component="img"
                          src={item.image}
                          sx={{ width: "100%" }}
                        ></Box>
                      </Box>
                      <Box sx={{ flex: 1 }}>
                        <Typography
                          variant="body1"
                          sx={{ fontWeight: 600, mb: 0.5, color: "black" }}
                        >
                          {item.name}
                        </Typography>
                        <Typography variant="body2" sx={{ color: "#666" }}>
                          By {item.artist}
                        </Typography>
                      </Box>
                      <Typography variant="h6" sx={{ fontWeight: 700, color: "black", fontFamily: "Inter" }}>
                        ₹{item.price * item.quantity}
                      </Typography>
                    </Box>
                  ))}
                </Box>
              )}

              <Divider sx={{ my: 3, bgcolor: "#C5BDB1" }} />

              {/* Price Breakdown */}
              <Box sx={{ mb: 3 }}>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1" sx={{ color: "#666" }}>
                    Subtotal
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "black", fontFamily: "Inter" }}>
                    ₹{subtotal}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1" sx={{ color: "#666" }}>
                    Shipping
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "black", fontFamily: "Inter" }}>
                    ₹{shipping}
                  </Typography>
                </Box>
                <Box
                  sx={{
                    display: "flex",
                    justifyContent: "space-between",
                    mb: 2,
                  }}
                >
                  <Typography variant="body1" sx={{ color: "#666" }}>
                    Taxes
                  </Typography>
                  <Typography variant="body1" sx={{ fontWeight: 600, color: "black", fontFamily: "Inter"}}>
                    ₹{taxes}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 3, bgcolor: "#C5BDB1" }} />

              {/* Total */}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700, color: "black", fontFamily: "Inter" }}>
                  Total
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700, color: "black", fontFamily: "Inter" }}>
                  ₹{total}
                </Typography>
              </Box>

              {/* Checkout Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                disabled={cartItems.length === 0}
                onClick={() => setCheckoutOpen(true)}
                sx={{
                  bgcolor: "#3D2817",
                  color: "white",
                  py: 2,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: 18,
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#2D1F12" },
                  "&:disabled": { bgcolor: "#ccc", color: "#666" },
                }}
              >
                {cartItems.length === 0 ? "Cart is Empty" : "Proceed to Checkout"}
              </Button>
            </Paper>
          </Box>
          )}
        </Box>
      </Container>

      {/* Shipping Form Dialog */}
      <ShippingForm
        open={checkoutOpen}
        onClose={() => setCheckoutOpen(false)}
        onSubmit={handleCheckout}
        loading={checkoutLoading}
      />

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={6000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
      >
        <Alert
          onClose={() => setSnackbar({ ...snackbar, open: false })}
          severity={snackbar.severity}
          sx={{ width: "100%" }}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Box>
  );
};

export default CartPage;
