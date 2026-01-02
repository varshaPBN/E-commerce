import {
  Box,
  Button,
  Typography,
  Link,
  TextField,
  Slider,
  IconButton,
  Menu,
  MenuItem,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import AssignmentIcon from "@mui/icons-material/Assignment";
import AttachMoneyIcon from "@mui/icons-material/AttachMoney";
import VisibilityIcon from "@mui/icons-material/Visibility";
import MoreVertIcon from "@mui/icons-material/MoreVert";
import LockIcon from "@mui/icons-material/Lock";
import { useState } from "react";
import { useRouter } from "next/router";

export default function DesignFinalizePage() {
  const router = useRouter();
  const [productTitle, setProductTitle] = useState("Classic Cotton T-Shirt");
  const [description, setDescription] = useState(
    "A classic white T-shirt made from soft, comfortable fabric with a clean, timeless fit. Perfect for everyday wear"
  );
  const [sellingPrice, setSellingPrice] = useState(35.0);
  const [baseCost] = useState(15.5);
  const [profitMargin, setProfitMargin] = useState(50);
  const [anchorEl, setAnchorEl] = useState(null);

  const calculatedProfit = sellingPrice - baseCost;

  const handleProfitMarginChange = (event, newValue) => {
    setProfitMargin(newValue);
    // Calculate selling price based on profit margin
    const newSellingPrice = baseCost / (1 - newValue / 100);
    setSellingPrice(parseFloat(newSellingPrice.toFixed(2)));
  };

  const handleMenuOpen = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#FDF8F2",
        p: { xs: 2, md: 4 },
        boxSizing: "border-box",
      }}
    >
      {/* Header */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          mb: 3,
        }}
      >
        {/* Logo */}
        <Typography
          sx={{
            background: "linear-gradient(135deg, #9C6ADE 0%, #E91E63 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 700,
            fontSize: { xs: 24, md: 28 },
            fontFamily: "inherit",
            mr: 3,
          }}
        >
          Artloom
        </Typography>

        {/* Back Link */}
        <Link
          href="/design"
          sx={{
            display: "flex",
            alignItems: "center",
            color: "#666",
            textDecoration: "none",
            fontWeight: 500,
            fontSize: 14,
            "&:hover": {
              color: "#1A1A1A",
              textDecoration: "underline",
            },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 18, mr: 0.5 }} />
          Back to design
        </Link>
      </Box>

      {/* Main Title */}
      <Box sx={{ mb: 4 }}>
        <Typography
          sx={{
            fontFamily: '"Playfair Display", serif',
            fontWeight: 700,
            fontSize: { xs: 32, md: 48 },
            color: "#1A1A1A",
            mb: 1,
          }}
        >
          Review & Pricing
        </Typography>
        <Typography
          sx={{
            fontSize: 16,
            color: "#666",
            fontFamily: '"Inter", sans-serif',
          }}
        >
          Finalize your product details, set your profit margin and launch your
          creation
        </Typography>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "450px 1fr" },
          gap: 4,
          alignItems: "start",
        }}
      >
        {/* Left Panel */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Product Details Section */}
          <Box
            sx={{
              backgroundColor: "#FDF8F2",
              borderRadius: "16px",
              p: 3,
              boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
              border: "1px solid #E8E0D8",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 2,
              }}
            >
              <AssignmentIcon
                sx={{
                  color: "#3B2A1A",
                  fontSize: 24,
                  mr: 1.5,
                }}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#1A1A1A",
                }}
              >
                Product Details
              </Typography>
            </Box>

            {/* Product Title */}
            <Box sx={{ mb: 3 }}>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 12,
                  color: "#666",
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                Product Title
              </Typography>
              <TextField
                fullWidth
                value={productTitle}
                onChange={(e) => setProductTitle(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "#E0E0E0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#D0D0D0",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3B2A1A",
                    },
                  },
                }}
              />
            </Box>

            {/* Description */}
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 12,
                  color: "#666",
                  textTransform: "uppercase",
                  mb: 1,
                }}
              >
                Description
              </Typography>
              <TextField
                fullWidth
                multiline
                rows={4}
                value={description}
                onChange={(e) => setDescription(e.target.value)}
                sx={{
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "#E0E0E0",
                    },
                    "&:hover fieldset": {
                      borderColor: "#D0D0D0",
                    },
                    "&.Mui-focused fieldset": {
                      borderColor: "#3B2A1A",
                    },
                  },
                }}
              />
            </Box>
          </Box>

          {/* Pricing & Profit Section */}
          <Box
            sx={{
              backgroundColor: "#FDF8F2",
              borderRadius: "16px",
              p: 3,
              boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
              border: "1px solid #E8E0D8",
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                mb: 3,
              }}
            >
              <AttachMoneyIcon
                sx={{
                  color: "#3B2A1A",
                  fontSize: 24,
                  mr: 1.5,
                }}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#1A1A1A",
                }}
              >
                Pricing & Profit
              </Typography>
            </Box>

            {/* Selling Price Label */}
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 12,
                color: "#666",
                textTransform: "uppercase",
                mb: 2,
              }}
            >
              SELLING PRICE
            </Typography>

            {/* Price Calculation Display */}
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
                gap: 1.5,
                mb: 3,
                flexWrap: "wrap",
              }}
            >
              <TextField
                value={`$ ${sellingPrice.toFixed(2)}`}
                onChange={(e) => {
                  const value = parseFloat(e.target.value.replace("$ ", ""));
                  if (!isNaN(value)) {
                    setSellingPrice(value);
                    const newMargin =
                      ((value - baseCost) / value) * 100;
                    setProfitMargin(Math.max(0, Math.min(100, newMargin)));
                  }
                }}
                sx={{
                  width: "120px",
                  "& .MuiOutlinedInput-root": {
                    backgroundColor: "#FFFFFF",
                    borderRadius: "8px",
                    "& fieldset": {
                      borderColor: "#E0E0E0",
                    },
                  },
                }}
              />
              <Typography sx={{ color: "#666", fontSize: 20 }}>-</Typography>
              <Box
                sx={{
                  backgroundColor: "#F0F0F0",
                  borderRadius: "8px",
                  px: 2,
                  py: 1.5,
                  minWidth: "100px",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#666",
                  }}
                >
                  ${baseCost.toFixed(2)}
                </Typography>
              </Box>
              <Typography sx={{ color: "#666", fontSize: 20 }}>=</Typography>
              <Box
                sx={{
                  backgroundColor: "#E8F5E9",
                  borderRadius: "8px",
                  px: 2,
                  py: 1.5,
                  minWidth: "100px",
                  textAlign: "center",
                }}
              >
                <Typography
                  sx={{
                    fontWeight: 600,
                    fontSize: 16,
                    color: "#2E7D32",
                  }}
                >
                  ${calculatedProfit.toFixed(2)}
                </Typography>
              </Box>
            </Box>

            {/* Profit Margin Slider */}
            <Box>
              <Typography
                sx={{
                  fontWeight: 600,
                  fontSize: 12,
                  color: "#666",
                  textTransform: "uppercase",
                  mb: 2,
                }}
              >
                Adjust profit margin
              </Typography>
              <Slider
                value={profitMargin}
                onChange={handleProfitMarginChange}
                min={0}
                max={100}
                step={1}
                sx={{
                  color: "#3B2A1A",
                  "& .MuiSlider-thumb": {
                    backgroundColor: "#3B2A1A",
                    width: 20,
                    height: 20,
                    "&:hover": {
                      boxShadow: "0 0 0 8px rgba(59, 42, 26, 0.16)",
                    },
                  },
                  "& .MuiSlider-track": {
                    backgroundColor: "#3B2A1A",
                    height: 4,
                  },
                  "& .MuiSlider-rail": {
                    backgroundColor: "#E0E0E0",
                    height: 4,
                  },
                }}
              />
            </Box>
          </Box>

          {/* Publish Button */}
          <Button
            variant="contained"
            fullWidth
            sx={{
              backgroundColor: "#3B2A1A",
              color: "#FFFFFF",
              textTransform: "none",
              borderRadius: "12px",
              py: 1.5,
              fontSize: 16,
              fontWeight: 600,
              "&:hover": {
                backgroundColor: "#2A1F15",
              },
            }}
          >
            Publish Product
          </Button>
        </Box>

        {/* Right Panel - Live Preview */}
        <Box
          sx={{
            backgroundColor: "#FDF8F2",
            borderRadius: "16px",
            p: 3,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
            border: "1px solid #E8E0D8",
            display: "flex",
            flexDirection: "column",
            height: "fit-content",
          }}
        >
          {/* Preview Header */}
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Box
              sx={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <VisibilityIcon
                sx={{
                  color: "#3B2A1A",
                  fontSize: 24,
                  mr: 1.5,
                }}
              />
              <Typography
                sx={{
                  fontWeight: 700,
                  fontSize: 18,
                  color: "#1A1A1A",
                }}
              >
                Live Preview
              </Typography>
            </Box>
            <IconButton
              onClick={handleMenuOpen}
              sx={{
                color: "#666",
                "&:hover": {
                  backgroundColor: "rgba(0,0,0,0.04)",
                },
              }}
            >
              <MoreVertIcon />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={Boolean(anchorEl)}
              onClose={handleMenuClose}
            >
              <MenuItem onClick={handleMenuClose}>Option 1</MenuItem>
              <MenuItem onClick={handleMenuClose}>Option 2</MenuItem>
            </Menu>
          </Box>

          {/* T-Shirt Preview */}
          <Box
            sx={{
              width: "100%",
              display: "flex",
              justifyContent: "center",
              alignItems: "center",
              mb: 3,
              backgroundColor: "#FDF8F2",
              borderRadius: "12px",
              p: 4,
              minHeight: "400px",
            }}
          >
            <Box
              sx={{
                position: "relative",
                width: "100%",
                maxWidth: "350px",
                display: "flex",
                justifyContent: "center",
                alignItems: "center",
              }}
            >
              {/* T-Shirt Image Placeholder - You can replace this with actual image */}
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "3/4",
                  backgroundColor: "#FFFFFF",
                  borderRadius: "8px",
                  border: "2px solid #E0E0E0",
                  display: "flex",
                  flexDirection: "column",
                  alignItems: "center",
                  justifyContent: "center",
                  position: "relative",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                {/* T-Shirt Design Preview */}
                <Box
                  sx={{
                    position: "absolute",
                    top: "50%",
                    left: "50%",
                    transform: "translate(-50%, -50%)",
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    gap: 0.5,
                    fontFamily: "Arial, sans-serif",
                    fontWeight: 700,
                    fontSize: "24px",
                  }}
                >
                  <Typography
                    sx={{
                      color: "#4FC3F7",
                      fontSize: "28px",
                      fontWeight: 700,
                      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    DO
                  </Typography>
                  <Typography
                    sx={{
                      color: "#29B6F6",
                      fontSize: "28px",
                      fontWeight: 700,
                      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    WHAT
                  </Typography>
                  <Typography
                    sx={{
                      color: "#FFEB3B",
                      fontSize: "28px",
                      fontWeight: 700,
                      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    MAKES
                  </Typography>
                  <Typography
                    sx={{
                      color: "#FF9800",
                      fontSize: "28px",
                      fontWeight: 700,
                      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    YOU
                  </Typography>
                  <Typography
                    sx={{
                      color: "#FFC107",
                      fontSize: "28px",
                      fontWeight: 700,
                      textShadow: "1px 1px 2px rgba(0,0,0,0.1)",
                    }}
                  >
                    HAPPY
                  </Typography>
                </Box>
              </Box>
            </Box>
          </Box>

          {/* Protection Message */}
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "flex-end",
              gap: 1,
              mt: "auto",
            }}
          >
            <LockIcon
              sx={{
                color: "#666",
                fontSize: 16,
              }}
            />
            <Typography
              sx={{
                fontSize: 12,
                color: "#666",
              }}
            >
              Your design is protected until you publish
            </Typography>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


