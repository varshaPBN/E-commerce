// pages/cart.tsx
import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Paper,
  Divider,
} from "@mui/material";
import { Delete, Add, Remove } from "@mui/icons-material";
import ProductsHeader from "@/components/common/ProductsHeader";
import BackButton from "@/components/common/BackButton";
import ProductsCard from "@/components/common/ProductsCard";
import { useRouter } from "next/router";

const CartPage = () => {
    const router = useRouter()
  const [cartItems, setCartItems] = useState([
    {
      id: 1,
      name: "Customized Pen",
      artist: "Kiara",
      variant: "Blue Ink With Pink Tie",
      price: 10,
      quantity: 1,
      image: "pink-tie.jpg",
    },
    {
      id: 2,
      name: "Naruto T Shirt",
      artist: "SBC",
      variant: "White Colored",
      price: 200,
      quantity: 1,
      image: "product-image.png",
    },
  ]);

  const suggestedProducts = [
    {
      title: "Custom embroidered hat",
      description:
        "Custom embroidered hat means hats that are specially made or decorated with s...",
      price: "₹149",
      image: "/products/hat.jpg",
    },
    {
      title: "Sunflower Soul Denim Jacket",
      description:
        "A face hidden behind flowers — bold, fearless, and beautifully untamed. This j...",
      price: "₹299",
      image: "/products/jacket.jpg",
    },
    {
      title: "Purr-fect Cat Graphic T-Shirt",
      description:
        "Show off your love for cats with this fun front-print t-shirt. Made for cat lovers...",
      price: "₹149",
      image: "/products/cat-tshirt.png",
    },
  ];

  const updateQuantity = (id, delta) => {
    setCartItems((items) =>
      items.map((item) =>
        item.id === id
          ? { ...item, quantity: Math.max(1, item.quantity + delta) }
          : item
      )
    );
  };

  const removeItem = (id) => {
    setCartItems((items) => items.filter((item) => item.id !== id));
  };

  const subtotal = cartItems.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );
  const shipping = 50;
  const taxes = 10;
  const total = subtotal + shipping + taxes;

  return (
    <Box sx={{ bgcolor: "#FDF8F2", minHeight: "100vh", pb: 4 }}>
        <h1>{router.query.artist}</h1>
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
            <Typography variant="body2" sx={{ color: "#666", mb: 3 }}>
              3 Items From Various Artists
            </Typography>

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
                    <Typography variant="h6" sx={{ fontWeight: 600, mb: 0.5 }}>
                      {item.name}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666", mb: 0.5 }}>
                      {item.artist}
                    </Typography>
                    <Typography variant="body2" sx={{ color: "#666" }}>
                      {item.variant}
                    </Typography>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
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
                      onClick={() => removeItem(item.id)}
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
                        onClick={() => updateQuantity(item.id, -1)}
                        sx={{ borderRadius: 0 }}
                      >
                        <Remove fontSize="small" />
                      </IconButton>
                      <Typography
                        sx={{ px: 2, minWidth: 40, textAlign: "center" }}
                      >
                        {item.quantity}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={() => updateQuantity(item.id, 1)}
                        sx={{ borderRadius: 0 }}
                      >
                        <Add fontSize="small" />
                      </IconButton>
                    </Box>
                  </Box>
                </Paper>
              ))}
            </Box>

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
                  display: "flex",
                  flexWrap: "wrap",
                  gap: 2,
                  justifyContent: "flex-start", // or "center"
                }}
              >
                {suggestedProducts.map((product, index) => (
                  <Box key={index} sx={{ width: 250 }}>
                    <ProductsCard
                      index={index}
                      image={product.image}
                      title={product.title}
                    />
                  </Box>
                ))}
              </Box>
            </Box>
          </Box>

          {/* Order Summary Section */}
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
                        sx={{ fontWeight: 600, mb: 0.5 }}
                      >
                        {item.name}
                      </Typography>
                      <Typography variant="body2" sx={{ color: "#666" }}>
                        By {item.artist}
                      </Typography>
                    </Box>
                    <Typography variant="h6" sx={{ fontWeight: 700 }}>
                      ₹{item.price}
                    </Typography>
                  </Box>
                ))}
              </Box>

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
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
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
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
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
                  <Typography variant="body1" sx={{ fontWeight: 600 }}>
                    ₹{taxes}
                  </Typography>
                </Box>
              </Box>

              <Divider sx={{ my: 3, bgcolor: "#C5BDB1" }} />

              {/* Total */}
              <Box
                sx={{ display: "flex", justifyContent: "space-between", mb: 4 }}
              >
                <Typography variant="h5" sx={{ fontWeight: 700 }}>
                  Total
                </Typography>
                <Typography variant="h4" sx={{ fontWeight: 700 }}>
                  ₹{total}
                </Typography>
              </Box>

              {/* Checkout Button */}
              <Button
                fullWidth
                variant="contained"
                size="large"
                sx={{
                  bgcolor: "#3D2817",
                  color: "white",
                  py: 2,
                  borderRadius: 3,
                  textTransform: "none",
                  fontSize: 18,
                  fontWeight: 600,
                  "&:hover": { bgcolor: "#2D1F12" },
                }}
              >
                Click Here To Pay
              </Button>
            </Paper>
          </Box>
        </Box>
      </Container>
    </Box>
  );
};

export default CartPage;
