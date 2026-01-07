// pages/product.js
import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  IconButton,
  Select,
  MenuItem,
  FormControl,
  Chip,
  Avatar,
  Rating,
  Paper,
  Snackbar,
  Alert,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import ProductsHeader from "@/components/common/ProductsHeader";
import BackButton from "@/components/common/BackButton";
import ProductsCard from "@/components/common/ProductsCard";
import axios from "axios";
import { useSearchParams } from "next/navigation";
import { useRouter } from "next/router";
import { getAuthToken, isAuthenticated } from "@/utils/auth";

export default function ProductView() {
  const productId = useSearchParams().get("productId");
  const router = useRouter();

  const [product, setProduct] = useState({});
  const [relatedProducts, setRelatedProducts] = useState([]);
  const [size, setSize] = useState("None");
  const [color, setColor] = useState("None");
  const [isLiked, setLiked] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState("December 21, 2025");
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  async function fetchProduct(productId) {
    try {
      const response = await axios.get(`/api/v1/user/products/${productId}`);
      setProduct(response.data.product);
    } catch (error) {
      // Error handled silently - product will remain empty state
    }
  }

  async function fetchAllProducts() {
    try {
      const response = await axios.get(`/api/v1/${product.artistId}/products`);
      setRelatedProducts(response.data.products);
    } catch (error) {
      // Error handled silently - related products will remain empty
    }
  }

  async function handleAddToCart(productId, color, size, quantity) {
    // Check authentication
    if (!isAuthenticated()) {
      setSnackbar({
        open: true,
        message: "Please log in to add items to cart",
        severity: "warning",
      });
      setTimeout(() => router.push("/user-login"), 1500);
      return;
    }

    try {
      const token = getAuthToken();
      if (!token) {
        setSnackbar({
          open: true,
          message: "Please log in to add items to cart",
          severity: "error",
        });
        router.push("/user-login");
        return;
      }

      const response = await axios.post(
        "/api/v1/add/cart",
        { productId, color, size, quantity },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      if (response.status === 200 || response.status === 201) {
        setSnackbar({
          open: true,
          message: "Item added to cart successfully!",
          severity: "success",
        });

        // Trigger cart count refresh in header
        setTimeout(() => {
          window.dispatchEvent(new CustomEvent("cartUpdated"));
        }, 1000);
      } else {
        throw new Error("Unexpected response status");
      }
    } catch (error) {
      setSnackbar({
        open: true,
        message: error.response?.data?.message || "Failed to add item to cart",
        severity: "error",
      });
    }
  }

  useEffect(() => {
    if (!productId) return;
    fetchProduct(productId);
  }, [productId]);

  useEffect(() => {
    if (!product?.artistId) return;
    fetchAllProducts();
  }, [product?.artistId]);

  // Set default color when product colors are loaded
  useEffect(() => {
    if (product.colors && product.colors.length > 0) {
      setColor(product.colors[0]);
    } else {
      setColor("None");
    }
  }, [product.colors]);

  // Set default size when product sizes are loaded
  useEffect(() => {
    if (product.sizes && product.sizes.length > 0) {
      setSize(product.sizes[0]);
    } else {
      setSize("S");
    }
  }, [product.sizes]);

  const toggleHeart = (index) => {
    setLiked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const sizes = product.sizes || [];
  const colors = product.colors || [];

  const ratingData = [
    { stars: 5, percentage: 80 },
    { stars: 4, percentage: 60 },
    { stars: 3, percentage: 20 },
    { stars: 2, percentage: 5 },
    { stars: 1, percentage: 2 },
  ];

  return (
    <Box sx={{ bgcolor: "#FDF8F2", minHeight: "100vh" }}>
      {/* Header */}
      <ProductsHeader />

      {/* Back Button */}
      <BackButton fallbackPath="/user-product-page" />

      {/* Product Section */}
      <Container maxWidth="xl" sx={{ mb: 7, px: "60px !important" }}>
        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "1fr 2fr",
            gap: 5,
          }}
        >
          {/* Product Image */}
          <Paper
            elevation={0}
            sx={{
              borderRadius: "27px",
              overflow: "hidden",
              background: "linear-gradient(135deg, #C4BEAE 0%, #A39A88 100%)",
              // aspectRatio: '3/4',
              width: "558px",
              height: "623px",
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
            }}
          >
            <Box
              component="img"
              src={product.design}
              alt={product.name}
              sx={{
                width: "100%",
                height: "100%",
                objectFit: "cover",
              }}
            />
          </Paper>

          {/* Product Details */}
          <Box>
            <Chip
              label={product.category}
              size="small"
              sx={{
                width: "149px",
                height: "39px",
                bgcolor: "#FDF8F2",
                border: "2px solid #000000",
                borderRadius: "24px",
                fontSize: "16px",
                mb: "31px",
              }}
            />

            <Typography
              sx={{
                fontFamily: "Playfair Display",
                fontSize: "42px",
                fontWeight: 700,
                lineHeight: 1.2,
                mb: 2,
              }}
            >
              {product.name}
            </Typography>

            <Typography sx={{ fontSize: "36px", fontWeight: 700, mb: 4 }}>
              ₹{product.price}
            </Typography>

            {/* Size and Color Selection */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 3,
                mb: 3,
              }}
            >
              {/* Size */}
              {sizes?.length !== 0 && (
                <Box>
                  <Typography
                    sx={{ fontSize: "14px", fontWeight: 600, mb: 1.5 }}
                  >
                    Select Size
                  </Typography>
                  <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                    {sizes?.map((s) => (
                      <Button
                        key={s}
                        onClick={() => setSize(s)}
                        sx={{
                          minWidth: "71px",
                          px: 2.5,
                          py: 1.25,
                          borderRadius: "24px",
                          border: "2px solid #000000",
                          bgcolor: size === s ? "#3D2817" : "#FDF8F2",
                          color: size === s ? "white" : "#333",
                          fontSize: "14px",
                          fontWeight: 500,
                        }}
                      >
                        {s}
                      </Button>
                    ))}
                  </Box>
                </Box>
              )}

              {/* Color */}
              <Box>
                <Typography sx={{ fontSize: "14px", fontWeight: 600, mb: 1.5 }}>
                  Select Color
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {colors?.map((c, index) => (
                    <Box
                      key={index}
                      onClick={() => setColor(c)}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: c,
                        border:
                          color === c ? "2px solid #3D2817" : "2px solid #ddd",
                        cursor: "pointer",
                        transition: "all 0.2s",
                        "&:hover": { transform: "scale(1.1)" },
                      }}
                    />
                  ))}
                </Box>
              </Box>
            </Box>

            {/* Quantity and Delivery */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                mb: 3,
              }}
            >
              <Box>
                <Typography sx={{ fontSize: "14px", fontWeight: 600, mb: 1 }}>
                  Select Quantity
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={quantity}
                    onChange={(e) => setQuantity(e.target.value)}
                    sx={{
                      bgcolor: "white",
                      borderRadius: "50px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#D5D1C8",
                      },
                    }}
                  >
                    {[1, 2, 3, 4, 5].map((num) => (
                      <MenuItem key={num} value={num}>
                        {num}
                      </MenuItem>
                    ))}
                  </Select>
                </FormControl>
              </Box>

              <Box>
                <Typography sx={{ fontSize: "14px", fontWeight: 600, mb: 1 }}>
                  Select Delivery Date
                </Typography>
                <FormControl fullWidth>
                  <Select
                    value={deliveryDate}
                    onChange={(e) => setDeliveryDate(e.target.value)}
                    sx={{
                      bgcolor: "white",
                      borderRadius: "50px",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#D5D1C8",
                      },
                    }}
                  >
                    <MenuItem value="December 21, 2025">
                      December 21, 2025
                    </MenuItem>
                    <MenuItem value="December 22, 2025">
                      December 22, 2025
                    </MenuItem>
                    <MenuItem value="December 23, 2025">
                      December 23, 2025
                    </MenuItem>
                  </Select>
                </FormControl>
              </Box>
            </Box>

            {/* Action Buttons */}
            <Box
              sx={{
                display: "grid",
                gridTemplateColumns: "1fr 1fr",
                gap: 2,
                mb: 4,
              }}
            >
              <Button
                fullWidth
                sx={{
                  py: 2,
                  borderRadius: "50px",
                  bgcolor: "#3D2817",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#2D1F12" },
                }}
                onClick={() =>
                  handleAddToCart(productId, color, size, quantity)
                }
              >
                Add to Cart
              </Button>
              <Button
                fullWidth
                sx={{
                  py: 2,
                  borderRadius: "50px",
                  bgcolor: "#3D2817",
                  color: "white",
                  fontSize: "16px",
                  fontWeight: 500,
                  textTransform: "none",
                  "&:hover": { bgcolor: "#2D1F12" },
                }}
              >
                Buy Now
              </Button>
            </Box>

            {/* Product Description */}
            <Box>
              <Typography
                sx={{
                  fontFamily: "Playfair Display",
                  fontSize: "20px",
                  fontWeight: 700,
                  mb: 1.5,
                }}
              >
                Product description
              </Typography>
              <Typography
                sx={{ color: "#666", lineHeight: 1.8, fontSize: "15px" }}
              >
                {product.description}
              </Typography>
            </Box>
          </Box>
        </Box>
      </Container>

      {/* Rating Section */}
      <Container maxWidth="xl" sx={{ px: 4, mb: 7 }}>
        <Typography
          sx={{
            fontFamily: "Playfair Display",
            fontSize: "36px",
            fontWeight: 700,
            mb: 4,
            pl: "175px !important",
          }}
        >
          Rating & Review
        </Typography>

        <Box
          sx={{
            display: "flex",
            gap: 5,
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          {/* Rating Overview */}
          <Box sx={{ textAlign: "center", mb: 4 }}>
            <Typography
              sx={{
                fontSize: "96px",
                fontWeight: 500,
                lineHeight: 1,
                display: "inline",
                color: "black"
              }}
            >
              4.5
            </Typography>
            <Typography
              sx={{ fontSize: "32px", color: "#666", display: "inline" }}
            >
              /5
            </Typography>
          </Box>
          <Box sx={{ px: 2 }}>
            {ratingData.map((item) => (
              <Box
                key={item.stars}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  mb: 1.5,
                }}
              >
                <Typography
                  sx={{ fontSize: "14px", minWidth: 40, color: "#333" }}
                >
                  ⭐ {item.stars}
                </Typography>
                <Box
                  sx={{
                    width: 213,
                    height: 8,
                    bgcolor: "#E5E1D8",
                    borderRadius: 10,
                    overflow: "hidden",
                  }}
                >
                  <Box
                    sx={{
                      width: `${item.percentage}%`,
                      height: "100%",
                      bgcolor: "#FFC107",
                    }}
                  />
                </Box>
              </Box>
            ))}
          </Box>

          {/* Review Card */}
          <Paper
            elevation={0}
            sx={{
              p: 4,
              borderRadius: "20px",
              position: "relative",
              bgcolor: "#F3E9DF",
              boxShadow: "2px 4px 4px rgba(0,0,0,0.25)",
            }}
          >
            <Box sx={{ display: "flex", alignItems: "center", gap: 2, mb: 2 }}>
              <Avatar
                src="/reviewer-avatar.png"
                alt="Rahul S."
                sx={{
                  width: 48,
                  height: 48,
                  background:
                    "linear-gradient(135deg, #667eea 0%, #764ba2 100%)",
                }}
              />
              <Typography sx={{ fontSize: "18px", fontWeight: 600, color: "black" }}>
                Rahul S.
              </Typography>
            </Box>
            <Box sx={{ mb: 2 }}>
              <Rating
                value={5}
                readOnly
                sx={{ color: "#FFC107" }}
                size="small"
              />
            </Box>
            <Typography
              sx={{ color: "#333", lineHeight: 1.6, fontSize: "16px", pr: 6 }}
            >
              The Naruto design looks awesome and the fit is perfect.
            </Typography>
            <IconButton
              sx={{
                position: "absolute",
                right: 16,
                top: "50%",
                right: "-25px",
                transform: "translateY(-50%)",
                width: 48,
                height: 48,
                border: "1px solid #E5E1D8",
                borderRadius: "50%",
                bgcolor: "#FDF8F2",
                boxShadow: "2px 2px 4px rgba(0,0,0,0.25)",
                "&:hover": { bgcolor: "#FDF8F2" },
              }}
            >
              <ArrowForward sx={{ fontSize: 20 }} />
            </IconButton>
          </Paper>
        </Box>
      </Container>

      {/* Related Products */}
      <Container maxWidth="xl" sx={{ px: "60px !important", pb: 7 }}>
        <Typography
          sx={{
            fontFamily: "Playfair Display",
            fontSize: "36px",
            fontWeight: 700,
            textAlign: "center",
            mb: 4,
          }}
        >
          You might also like
        </Typography>

        <Box
          sx={{
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 3,
          }}
        >
          {relatedProducts
            .filter((product) => product._id != productId)
            .map((product, index) => (
              <ProductsCard
                key={index}
                index={index}
                id={product._id}
                title={product.name}
                image={product.design}
                description={product.description}
                price={product.price}
                isLiked={isLiked}
                toggleHeart={toggleHeart}
              />
            ))}
        </Box>
      </Container>

      {/* Snackbar for notifications */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={3000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
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
}
