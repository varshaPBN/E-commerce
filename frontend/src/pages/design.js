import {
  Box,
  Button,
  Typography,
  Link,
  Avatar,
  Select,
  MenuItem,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
  IconButton,
  TextField,
} from "@mui/material";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import FormatBoldIcon from "@mui/icons-material/FormatBold";
import FormatItalicIcon from "@mui/icons-material/FormatItalic";
import FormatUnderlinedIcon from "@mui/icons-material/FormatUnderlined";
import FormatAlignCenterIcon from "@mui/icons-material/FormatAlignCenter";
import PaletteIcon from "@mui/icons-material/Palette";
import { useState, useRef } from "react";
import { useRouter } from "next/router";

export default function DesignPage() {
  const router = useRouter();
  const [category, setCategory] = useState("Apparel");
  const [product, setProduct] = useState("Classic Cotton T-Shirt");
  const [baseColor, setBaseColor] = useState("white");
  const [view, setView] = useState("FRONT");
  const [size, setSize] = useState("S");
  const [font, setFont] = useState("Times New Roman");
  const [fontSize, setFontSize] = useState("32");
  const [uploadedDesign, setUploadedDesign] = useState(null);
  const fileInputRef = useRef(null);

  const colors = [
    { name: "white", value: "#FFFFFF" },
    { name: "black", value: "#000000" },
    { name: "dark grey", value: "#424242" },
    { name: "purple", value: "#9C6ADE" },
    { name: "maroon", value: "#8B0000" },
  ];

  const sizes = ["S", "M", "L", "XL", "2XL"];

  const handleFileUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setUploadedDesign(URL.createObjectURL(file));
    }
  };

  const handleDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
  };

  const handleDrop = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const file = e.dataTransfer.files[0];
    if (file) {
      setUploadedDesign(URL.createObjectURL(file));
    }
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
      {/* Top Navigation Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
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
          }}
        >
          Artloom
        </Typography>

        {/* Navigation Links */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 4,
            alignItems: "center",
          }}
        >
          <Link
            href="/home"
            sx={{
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
            Dashboard
          </Link>
          <Link
            href="#"
            sx={{
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
            Products
          </Link>
          <Link
            href="#"
            sx={{
              color: "#1A1A1A",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 14,
              borderBottom: "2px solid #9C6ADE",
              pb: 0.5,
            }}
          >
            Design
          </Link>
          <Link
            href="#"
            sx={{
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
            Orders
          </Link>
        </Box>

        {/* Profile Picture */}
        <Avatar
          sx={{
            width: { xs: 32, md: 40 },
            height: { xs: 32, md: 40 },
            bgcolor: "#9C6ADE",
          }}
        >
          K
        </Avatar>
      </Box>

      {/* Main Content */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "400px 1fr" },
          gap: 4,
          height: "calc(100vh - 120px)",
        }}
      >
        {/* Left Panel - Product Details */}
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            p: 3,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
            overflow: "auto",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 20,
              color: "#1A1A1A",
              mb: 0.5,
            }}
          >
            Product Details
          </Typography>
          <Typography
            sx={{
              fontSize: 12,
              color: "#666",
              mb: 3,
            }}
          >
            Configure your base product
          </Typography>

          {/* Category */}
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
              Category
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#F8F8F8",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E0E0E0",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D0D0D0",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#9C6ADE",
                  },
                }}
              >
                <MenuItem value="Apparel">Apparel</MenuItem>
                <MenuItem value="Accessories">Accessories</MenuItem>
                <MenuItem value="Home & Living">Home & Living</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Product */}
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
              Product
            </Typography>
            <FormControl fullWidth size="small">
              <Select
                value={product}
                onChange={(e) => setProduct(e.target.value)}
                sx={{
                  borderRadius: "8px",
                  backgroundColor: "#F8F8F8",
                  "& .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#E0E0E0",
                  },
                  "&:hover .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#D0D0D0",
                  },
                  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
                    borderColor: "#9C6ADE",
                  },
                }}
              >
                <MenuItem value="Classic Cotton T-Shirt">
                  Classic Cotton T-Shirt
                </MenuItem>
                <MenuItem value="Premium T-Shirt">Premium T-Shirt</MenuItem>
                <MenuItem value="V-Neck T-Shirt">V-Neck T-Shirt</MenuItem>
              </Select>
            </FormControl>
          </Box>

          {/* Base Color */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 12,
                color: "#666",
                textTransform: "uppercase",
                mb: 1.5,
              }}
            >
              Base Color
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1.5,
                flexWrap: "wrap",
              }}
            >
              {colors.map((color) => (
                <Box
                  key={color.name}
                  onClick={() => setBaseColor(color.name)}
                  sx={{
                    width: 40,
                    height: 40,
                    borderRadius: "50%",
                    backgroundColor: color.value,
                    border:
                      baseColor === color.name
                        ? "3px solid #9C6ADE"
                        : "2px solid #E0E0E0",
                    cursor: "pointer",
                    transition: "all 0.2s",
                    "&:hover": {
                      transform: "scale(1.1)",
                    },
                  }}
                />
              ))}
            </Box>
          </Box>

          {/* View */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 12,
                color: "#666",
                textTransform: "uppercase",
                mb: 1.5,
              }}
            >
              View
            </Typography>
            <ToggleButtonGroup
              value={view}
              exclusive
              onChange={(e, newView) => newView && setView(newView)}
              fullWidth
              sx={{
                "& .MuiToggleButton-root": {
                  border: "1px solid #E0E0E0",
                  color: "#666",
                  textTransform: "none",
                  fontWeight: 500,
                  "&.Mui-selected": {
                    backgroundColor: "#9C6ADE",
                    color: "#FFFFFF",
                    borderColor: "#9C6ADE",
                    "&:hover": {
                      backgroundColor: "#8B5FBF",
                    },
                  },
                },
              }}
            >
              <ToggleButton value="FRONT">FRONT</ToggleButton>
              <ToggleButton value="BACK">BACK</ToggleButton>
            </ToggleButtonGroup>
          </Box>

          {/* Size */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 12,
                color: "#666",
                textTransform: "uppercase",
                mb: 1.5,
              }}
            >
              Size
            </Typography>
            <Box
              sx={{
                display: "flex",
                gap: 1,
                flexWrap: "wrap",
              }}
            >
              {sizes.map((s) => (
                <Button
                  key={s}
                  onClick={() => setSize(s)}
                  variant={size === s ? "contained" : "outlined"}
                  sx={{
                    minWidth: 48,
                    height: 40,
                    borderRadius: "8px",
                    textTransform: "none",
                    fontWeight: 600,
                    fontSize: 14,
                    borderColor: "#E0E0E0",
                    color: size === s ? "#FFFFFF" : "#666",
                    backgroundColor:
                      size === s ? "#9C6ADE" : "transparent",
                    "&:hover": {
                      backgroundColor: size === s ? "#8B5FBF" : "#F8F8F8",
                      borderColor: "#9C6ADE",
                    },
                  }}
                >
                  {s}
                </Button>
              ))}
            </Box>
          </Box>

          {/* Upload Design */}
          <Box>
            <Typography
              sx={{
                fontWeight: 600,
                fontSize: 12,
                color: "#666",
                textTransform: "uppercase",
                mb: 1.5,
              }}
            >
              Upload Design
            </Typography>
            <Box
              component="label"
              onDragOver={handleDragOver}
              onDrop={handleDrop}
              sx={{
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                minHeight: 200,
                border: "2px dashed #E0E0E0",
                borderRadius: "12px",
                backgroundColor: uploadedDesign ? "transparent" : "#F8F8F8",
                cursor: "pointer",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  borderColor: "#9C6ADE",
                  backgroundColor: uploadedDesign ? "transparent" : "#F0F0F0",
                },
              }}
            >
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                onChange={handleFileUpload}
                style={{ display: "none" }}
              />
              {uploadedDesign ? (
                <Box
                  sx={{
                    width: "100%",
                    height: "100%",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    p: 2,
                  }}
                >
                  <img
                    src={uploadedDesign}
                    alt="Uploaded design"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                </Box>
              ) : (
                <>
                  <Button
                    variant="contained"
                    startIcon={<CloudUploadIcon />}
                    onClick={(e) => {
                      e.stopPropagation();
                      fileInputRef.current?.click();
                    }}
                    sx={{
                      backgroundColor: "#3B2A1A",
                      color: "#FFFFFF",
                      textTransform: "none",
                      borderRadius: "8px",
                      px: 3,
                      py: 1,
                      mb: 1,
                      "&:hover": {
                        backgroundColor: "#2A1F15",
                      },
                    }}
                  >
                    Upload Design
                  </Button>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#666",
                    }}
                  >
                    or drag files here
                  </Typography>
                </>
              )}
            </Box>
          </Box>
        </Box>

        {/* Right Panel - Preview and Text Options */}
        <Box
          sx={{
            display: "flex",
            flexDirection: "column",
            gap: 3,
          }}
        >
          {/* Product Preview */}
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              p: 4,
              boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
              flex: 1,
              display: "flex",
              flexDirection: "column",
              alignItems: "center",
              justifyContent: "center",
              backgroundColor: "#F6EEE4",
              minHeight: 400,
            }}
          >
            <Box
              sx={{
                width: "100%",
                maxWidth: 400,
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                position: "relative",
              }}
            >
              {/* T-Shirt Preview Placeholder */}
              <Box
                sx={{
                  width: "100%",
                  aspectRatio: "3/4",
                  backgroundColor: baseColor === "white" ? "#FFFFFF" : baseColor === "black" ? "#000000" : baseColor === "dark grey" ? "#424242" : baseColor === "purple" ? "#9C6ADE" : "#8B0000",
                  borderRadius: "8px",
                  display: "flex",
                  alignItems: "center",
                  justifyContent: "center",
                  border: "2px solid #E0E0E0",
                  position: "relative",
                  boxShadow: "0px 4px 12px rgba(0,0,0,0.1)",
                }}
              >
                {uploadedDesign ? (
                  <img
                    src={uploadedDesign}
                    alt="Design preview"
                    style={{
                      maxWidth: "80%",
                      maxHeight: "80%",
                      objectFit: "contain",
                    }}
                  />
                ) : (
                  <Typography
                    sx={{
                      color: baseColor === "white" || baseColor === "purple" ? "#666" : "#FFFFFF",
                      fontSize: 14,
                    }}
                  >
                    Design Preview
                  </Typography>
                )}
              </Box>
            </Box>
          </Box>

          {/* Submit Design Button */}
          <Button
            variant="contained"
            fullWidth
            onClick={() => router.push("/designFinalize")}
            sx={{
              backgroundColor: "#3B2A1A",
              color: "#FFFFFF",
              textTransform: "none",
              borderRadius: "12px",
              py: 1.5,
              fontSize: 16,
              fontWeight: 500,
              "&:hover": {
                backgroundColor: "#2A1F15",
              },
            }}
          >
            Submit Design
          </Button>

          {/* Text Options */}
          <Box
            sx={{
              backgroundColor: "#FFFFFF",
              borderRadius: "16px",
              p: 3,
              boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 16,
                color: "#1A1A1A",
                mb: 2,
              }}
            >
              Text Options
            </Typography>
            <Box
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: 2,
              }}
            >
              {/* Font Selection */}
              <Box
                sx={{
                  display: "grid",
                  gridTemplateColumns: "1fr 1fr",
                  gap: 2,
                }}
              >
                <FormControl fullWidth size="small">
                  <Select
                    value={font}
                    onChange={(e) => setFont(e.target.value)}
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: "#F8F8F8",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#E0E0E0",
                      },
                    }}
                  >
                    <MenuItem value="Times New Roman">Times New Roman</MenuItem>
                    <MenuItem value="Arial">Arial</MenuItem>
                    <MenuItem value="Helvetica">Helvetica</MenuItem>
                    <MenuItem value="Georgia">Georgia</MenuItem>
                    <MenuItem value="Courier New">Courier New</MenuItem>
                  </Select>
                </FormControl>
                <FormControl fullWidth size="small">
                  <Select
                    value={fontSize}
                    onChange={(e) => setFontSize(e.target.value)}
                    sx={{
                      borderRadius: "8px",
                      backgroundColor: "#F8F8F8",
                      "& .MuiOutlinedInput-notchedOutline": {
                        borderColor: "#E0E0E0",
                      },
                    }}
                  >
                    <MenuItem value="12">12</MenuItem>
                    <MenuItem value="16">16</MenuItem>
                    <MenuItem value="20">20</MenuItem>
                    <MenuItem value="24">24</MenuItem>
                    <MenuItem value="32">32</MenuItem>
                    <MenuItem value="48">48</MenuItem>
                  </Select>
                </FormControl>
              </Box>

              {/* Formatting Buttons */}
              <Box
                sx={{
                  display: "flex",
                  gap: 1,
                  alignItems: "center",
                }}
              >
                <IconButton
                  sx={{
                    border: "1px solid #E0E0E0",
                    borderRadius: "8px",
                    width: 40,
                    height: 40,
                    "&:hover": {
                      backgroundColor: "#F8F8F8",
                      borderColor: "#9C6ADE",
                    },
                  }}
                >
                  <FormatBoldIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton
                  sx={{
                    border: "1px solid #E0E0E0",
                    borderRadius: "8px",
                    width: 40,
                    height: 40,
                    "&:hover": {
                      backgroundColor: "#F8F8F8",
                      borderColor: "#9C6ADE",
                    },
                  }}
                >
                  <FormatItalicIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton
                  sx={{
                    border: "1px solid #E0E0E0",
                    borderRadius: "8px",
                    width: 40,
                    height: 40,
                    "&:hover": {
                      backgroundColor: "#F8F8F8",
                      borderColor: "#9C6ADE",
                    },
                  }}
                >
                  <FormatUnderlinedIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <IconButton
                  sx={{
                    border: "1px solid #E0E0E0",
                    borderRadius: "8px",
                    width: 40,
                    height: 40,
                    "&:hover": {
                      backgroundColor: "#F8F8F8",
                      borderColor: "#9C6ADE",
                    },
                  }}
                >
                  <FormatAlignCenterIcon sx={{ fontSize: 20 }} />
                </IconButton>
                <Box
                  sx={{
                    display: "flex",
                    alignItems: "center",
                    gap: 1,
                    ml: 2,
                  }}
                >
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#666",
                    }}
                  >
                    Color
                  </Typography>
                  <IconButton
                    sx={{
                      border: "1px solid #E0E0E0",
                      borderRadius: "8px",
                      width: 40,
                      height: 40,
                      "&:hover": {
                        backgroundColor: "#F8F8F8",
                        borderColor: "#9C6ADE",
                      },
                    }}
                  >
                    <PaletteIcon sx={{ fontSize: 20, color: "#9C6ADE" }} />
                  </IconButton>
                </Box>
              </Box>
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}


