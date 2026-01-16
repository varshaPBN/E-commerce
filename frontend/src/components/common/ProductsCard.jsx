import { useState } from "react";
import { Box, Card, CardContent, IconButton, Typography, Snackbar, Alert } from "@mui/material";
import { useRouter } from "next/router";
import axios from "axios";
import { getAuthToken, isAuthenticated } from "@/utils/auth";

export default function ProductsCard({
  id,
  index,
  image,
  title,
  description,
  price,
  isLiked,
  toggleHeart,
}) {
  
  const router = useRouter();
  const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });

  function handleClick() {
    router.push(`/product-view/${id}`);
  }

  const handleAddToCart = async (e) => {
    e.stopPropagation();
    
    if (!isAuthenticated()) {
      setSnackbar({
        open: true,
        message: "Please log in to add items to cart",
        severity: "warning",
      });
      setTimeout(() => {
        router.push({
          pathname: "/user-login",
          query: { returnUrl: router.asPath }
        });
      }, 1500);
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
        router.push({
          pathname: "/user-login",
          query: { returnUrl: router.asPath }
        });
        return;
      }

      // Fetch product details to get available colors/sizes
      const productResponse = await axios.get(`/api/v1/user/products/${id}`);
      const product = productResponse.data.product;
      
      // Use first available color/size, or "None" if not available
      const color = product.colors && product.colors.length > 0 ? product.colors[0] : "None";
      const size = product.sizes && product.sizes.length > 0 ? product.sizes[0] : "None";

      const response = await axios.post(
        "/api/v1/add/cart",
        {
          productId: id,
          color,
          size,
          quantity: 1,
        },
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

        // Wait a bit for the backend to process, then trigger cart count refresh
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
  };

  return (
    <Card
      elevation={0}
      sx={{
        borderRadius: "20px",
        bgcolor: "#F3E9DF",
        transition: "transform 0.2s",
        boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
        "&:hover": { transform: "translateY(-4px)" },
        height: "100%",
        display: "flex",
        flexDirection: "column",
      }}
    >
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: "100%",
          height: 250,
          objectFit: "cover",
          cursor: "pointer"
        }}
        onClick={handleClick}
      />
      <CardContent
        sx={{ p: 2, flexGrow: 1, display: "flex", flexDirection: "column" }}
      >
        <Typography sx={{ fontSize: "20px", fontWeight: 700, mb: 1, color: "black" }}>
          {title}
        </Typography>
        {description && (
          <Typography
            sx={{
              fontSize: "14px",
              color: "#666",
              mb: 2,
              lineHeight: 1.5,
            }}
          >
            {description.slice(0, 80)}...
          </Typography>
        )}
        {price && (
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mt: "auto",
            }}
          >
            <Typography sx={{ fontSize: "24px", fontWeight: 700, color: "black" }}>
              ₹{price}
            </Typography>
            <Box sx={{ display: "flex", gap: 1 }}>
              <IconButton
                size="small"
                sx={{ width: 32, height: 32 }}
                onClick={() => toggleHeart(index)}
              >
                <Box
                  component="img"
                  src={
                    isLiked[index] ? "/icons/HeartRed.png" : "/icons/Heart.png"
                  }
                  sx={{ width: 24, height: 24 }}
                />
              </IconButton>
              <IconButton 
                size="small" 
                sx={{ width: 32, height: 32 }}
                onClick={handleAddToCart}
              >
                <Box
                  component="img"
                  src="/icons/Bag.png"
                  sx={{ width: 24, height: 24 }}
                />
              </IconButton>
            </Box>
          </Box>
        )}
      </CardContent>

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
    </Card>
  );
}
