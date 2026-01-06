// pages/product.js
import React, { useState } from "react";
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
} from "@mui/material";
import {
  ArrowForward,
} from "@mui/icons-material";
import ProductsHeader from "@/components/common/ProductsHeader";
import BackButton from "@/components/common/BackButton";
import ProductsCard from "@/components/common/ProductsCard";

export default function ProductView() {
  const [size, setSize] = useState("S");
  const [color, setColor] = useState("red");
  const [isLiked, setLiked] = useState({});
  const [quantity, setQuantity] = useState(1);
  const [deliveryDate, setDeliveryDate] = useState("December 21, 2025");

  const toggleHeart = (index) => {
    setLiked((prev) => ({ ...prev, [index]: !prev[index] }));
  };

  const sizes = ["S", "M", "L", "XL", "XXL"];
  const colors = [
    { name: "red", value: "#FF0000" },
    { name: "blue", value: "#0000FF" },
    { name: "green", value: "#00FF00" },
    { name: "black", value: "#000000" },
  ];

  const ratingData = [
    { stars: 5, percentage: 80 },
    { stars: 4, percentage: 60 },
    { stars: 3, percentage: 20 },
    { stars: 2, percentage: 5 },
    { stars: 1, percentage: 2 },
  ];

  const relatedProducts = [
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
    {
      title: "Best Friends Forever Personalized Mug",
      description:
        "A charming ceramic mug featuring a best-friends illustration with custom n...",
      price: "₹299",
      image: "/products/mug.png",
    },
  ];

  return (
    <Box sx={{ bgcolor: "#FDF8F2", minHeight: "100vh" }}>
      {/* Header */}
      <ProductsHeader />

      {/* Back Button */}
      <BackButton />

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
              src="/product-image.png"
              alt="Customized Naruto T-Shirt"
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
              label="Limited Edition"
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
              Customized Naruto T-Shirt
            </Typography>

            <Typography sx={{ fontSize: "36px", fontWeight: 700, mb: 4 }}>
              ₹299
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
              <Box>
                <Typography sx={{ fontSize: "14px", fontWeight: 600, mb: 1.5 }}>
                  Select Size
                </Typography>
                <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                  {sizes.map((s) => (
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

              {/* Color */}
              <Box>
                <Typography sx={{ fontSize: "14px", fontWeight: 600, mb: 1.5 }}>
                  Select Color
                </Typography>
                <Box sx={{ display: "flex", gap: 1 }}>
                  {colors.map((c) => (
                    <Box
                      key={c.name}
                      onClick={() => setColor(c.name)}
                      sx={{
                        width: 40,
                        height: 40,
                        borderRadius: "50%",
                        bgcolor: c.value,
                        border:
                          color === c.name
                            ? "2px solid #3D2817"
                            : "2px solid #ddd",
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
                A minimalist take on an iconic anime. This custom Naruto T-shirt
                delivers comfort, quality, and a striking design made for
                everyday wear. Designed to look good, feel good, and last long.
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
              <Typography sx={{ fontSize: "18px", fontWeight: 600 }}>
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
          {relatedProducts.map((product, index) => (
            <ProductsCard
              index={index}
              title={product.title}
              image={product.image}
              description={product.description}
              price={product.price}
              isLiked={isLiked}
              toggleHeart={toggleHeart}
            />
          ))}
        </Box>
      </Container>
    </Box>
  );
}
