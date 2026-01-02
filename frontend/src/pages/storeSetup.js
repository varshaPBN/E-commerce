import {
  Box,
  Button,
  TextField,
  Typography,
  Link,
} from "@mui/material";
import ArrowBackIcon from "@mui/icons-material/ArrowBack";
import CameraAltIcon from "@mui/icons-material/CameraAlt";
import EditIcon from "@mui/icons-material/Edit";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useState, useRef } from "react";
import { useRouter } from "next/router";

export default function StoreSetup() {
  const router = useRouter();
  const [storeName, setStoreName] = useState("");
  const [domain, setDomain] = useState("");
  const [artistName, setArtistName] = useState("");
  const [avatar, setAvatar] = useState(null);
  const [logo, setLogo] = useState(null);
  const [logoError, setLogoError] = useState(false);
  const [fallbackError, setFallbackError] = useState(false);
  const avatarInputRef = useRef(null);
  const logoInputRef = useRef(null);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setAvatar(URL.createObjectURL(file));
    }
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      setLogo(URL.createObjectURL(file));
    }
  };

  const handleFinish = () => {
    // Add validation and submission logic here
    console.log("Store setup:", { storeName, domain, artistName, avatar, logo });
    // Navigate to home page
    router.push("/home");
  };

  return (
    <Box
      sx={{
        minheight: "100vh",
        width: "100vw",
        backgroundColor: "#FDF8F2",
        position: "relative",
        overflow: "hidden",
        p: { xs: 2, md: 3 },
        boxSizing: "border-box",
      }}
    >
      {/* Header with Logo and Back Link - Left Aligned */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          gap: 2,
          mb: 2,
          position: "absolute",
          top: { xs: 16, md: 24 },
          left: { xs: 16, md: 24 },
          zIndex: 10,
        }}
      >
        {/* Back Link */}
        <Link
          href="#"
          onClick={() => router.back()}
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 0.5,
            color: "#000",
            textDecoration: "none",
            "&:hover": { textDecoration: "underline" },
          }}
        >
          <ArrowBackIcon sx={{ fontSize: 16 }} />
          <Typography sx={{ fontSize: 13 }}>Back</Typography>
        </Link>

        {/* Logo */}
        {logoError && fallbackError ? (
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
        ) : (
          <img
            src="/logo%20(2).png"
            alt="Artloom"
            onError={() => {
              if (!logoError) {
                setLogoError(true);
              } else {
                setFallbackError(true);
              }
            }}
            style={{
              height: "48px",
              width: "auto",
              objectFit: "contain",
            }}
          />
        )}
      </Box>

      {/* Main Card - Centered */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "center",
          minHeight: "100vh",
          width: "100%",
        }}
      >
        <Box
          sx={{
            display: "flex",
            backgroundColor: "#FFFFFF",
            borderRadius: "32px",
            boxShadow: "0px 4px 20px rgba(0,0,0,0.08)",
            overflow: "hidden",
            width: "100%",
            maxWidth: "1200px",
            minHeight: "600px",
          }}
        >
        {/* LEFT SECTION - Avatar and Product Images */}
        <Box
          sx={{
            width: "50%",
            backgroundColor: "#F6EEE4",
            p: 4,
            display: { xs: "none", md: "flex" },
            flexDirection: "column",
            alignItems: "center",
            justifyContent: "flex-start",
            position: "relative",
            overflow: "hidden",
          }}
        >
          {/* Avatar Upload */}
          <Box
            sx={{
              position: "relative",
              mb: 3,
            }}
          >
            <Box
              component="label"
              sx={{
                width: 180,
                height: 180,
                borderRadius: "50%",
                border: "3px dashed #999",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backgroundColor: avatar ? "transparent" : "#F8F8F8",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  borderColor: "#9C6ADE",
                },
              }}
            >
              <input
                ref={avatarInputRef}
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleAvatarUpload}
                style={{ display: "none" }}
              />
              {avatar ? (
                <>
                  <img
                    src={avatar}
                    alt="Avatar"
                    style={{
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      borderRadius: "50%",
                    }}
                  />
                  <Box
                    sx={{
                      position: "absolute",
                      bottom: 8,
                      right: 8,
                      width: 32,
                      height: 32,
                      borderRadius: "50%",
                      backgroundColor: "#9C6ADE",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      cursor: "pointer",
                    }}
                    onClick={(e) => {
                      e.stopPropagation();
                      avatarInputRef.current?.click();
                    }}
                  >
                    <EditIcon sx={{ fontSize: 18, color: "#FFF" }} />
                  </Box>
                </>
              ) : (
                <>
                  <CameraAltIcon
                    sx={{ fontSize: 48, color: "#999", mb: 1 }}
                  />
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#666",
                      textAlign: "center",
                      px: 2,
                    }}
                  >
                    Upload your Avatar
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 10,
                      color: "#999",
                      textAlign: "center",
                      mt: 0.5,
                    }}
                  >
                    Min 400 x 400 px. PNG or JPG.
                  </Typography>
                </>
              )}
            </Box>
          </Box>

          {/* Product Images - Decorative */}
          <Box
            sx={{
              display: "flex",
              flexWrap: "wrap",
              gap: 2,
              justifyContent: "center",
              alignItems: "center",
              position: "relative",
              width: "100%",
              maxWidth: 400,
            }}
          >
            {/* Three Ceramic Mugs - Top Left */}
            <Box
              sx={{
                width: 120,
                height: 120,
                borderRadius: "12px",
                transform: "rotate(-8deg)",
                boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#2C2C2C",
                background: "linear-gradient(135deg, #2C2C2C 0%, #4A4A4A 50%, #E8D5B7 100%)",
              }}
            >
              <img
                src="/image%201.png"
                alt="Ceramic Mugs"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>

            {/* T-Shirt with Cats - Top Right */}
            <Box
              sx={{
                width: 100,
                height: 120,
                borderRadius: "12px",
                transform: "rotate(5deg)",
                boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#FFFFFF",
                mt: -1,
              }}
            >
              <img
                src="/image%202.png"
                alt="T-Shirt with Cats"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>

            {/* Bedroom with Botanical Prints - Bottom Left */}
            <Box
              sx={{
                width: 140,
                height: 100,
                borderRadius: "12px",
                transform: "rotate(-3deg)",
                boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#F5F5F0",
                background: "linear-gradient(180deg, #F5F5F0 0%, #E8E8E0 100%)",
                mt: -2,
              }}
            >
              <img
                src="/image%203.png"
                alt="Bedroom with Art Prints"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>

            {/* Baseball Cap - Bottom Right */}
            <Box
              sx={{
                width: 100,
                height: 100,
                borderRadius: "12px",
                transform: "rotate(6deg)",
                boxShadow: "0px 6px 12px rgba(0,0,0,0.15)",
                overflow: "hidden",
                position: "relative",
                backgroundColor: "#E8D5B7",
                mt: -1,
              }}
            >
              <img
                src="/image%204.png"
                alt="Baseball Cap"
                style={{
                  width: "100%",
                  height: "100%",
                  objectFit: "cover",
                  display: "block",
                }}
              />
            </Box>
          </Box>
        </Box>

        {/* RIGHT SECTION - Form */}
        <Box
          sx={{
            width: { xs: "100%", md: "50%" },
            p: { xs: 3, md: 4 },
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
            boxSizing: "border-box",
            
          }}
        >
          {/* Title */}
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: 24, md: 32 },
              mb: 0.5,
              fontFamily: "'Playfair Display', serif",
              color: "#1A1A1A",
            }}
          >
            Let's build your store now
          </Typography>

          {/* Description */}
          <Typography
            sx={{
              fontSize: 13,
              color: "#666",
              mb: 3,
              lineHeight: 1.5,
            }}
          >
            Give your new creative space a name and a look. You can change this
            anytime.
          </Typography>

          {/* Store Name Field */}
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                fontWeight: 600,
                mb: 1,
                fontSize: 14,
                color: "#1A1A1A",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              Store Name
              <Typography component="span" sx={{ color: "red", fontSize: 16 }}>
                *
              </Typography>
            </Typography>
            <TextField
              fullWidth
              placeholder="This is how your store appear to customers."
              value={storeName}
              onChange={(e) => setStoreName(e.target.value)}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F8F8F8",
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "#E0E0E0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#D0D0D0",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9C6ADE",
                  },
                },
              }}
            />
          </Box>

          {/* Domain Field */}
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                fontWeight: 600,
                mb: 1,
                fontSize: 14,
                color: "#1A1A1A",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              Domain
              <Typography component="span" sx={{ color: "red", fontSize: 16 }}>
                *
              </Typography>
            </Typography>
            <TextField
              fullWidth
              placeholder="Choose a unique link for your store. You can change it later."
              value={domain}
              onChange={(e) => setDomain(e.target.value)}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F8F8F8",
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "#E0E0E0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#D0D0D0",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9C6ADE",
                  },
                },
              }}
            />
          </Box>

          {/* Artist Name Field */}
          <Box sx={{ mb: 2 }}>
            <Typography
              sx={{
                fontWeight: 600,
                mb: 1,
                fontSize: 14,
                color: "#1A1A1A",
                display: "flex",
                alignItems: "center",
                gap: 0.5,
              }}
            >
              Artist Name
              <Typography component="span" sx={{ color: "red", fontSize: 16 }}>
                *
              </Typography>
            </Typography>
            <TextField
              fullWidth
              placeholder="Please enter your name here."
              value={artistName}
              onChange={(e) => setArtistName(e.target.value)}
              size="small"
              sx={{
                "& .MuiOutlinedInput-root": {
                  backgroundColor: "#F8F8F8",
                  borderRadius: "12px",
                  "& fieldset": {
                    borderColor: "#E0E0E0",
                  },
                  "&:hover fieldset": {
                    borderColor: "#D0D0D0",
                  },
                  "&.Mui-focused fieldset": {
                    borderColor: "#9C6ADE",
                  },
                },
              }}
            />
          </Box>

          {/* Logo Upload Field */}
          <Box sx={{ mb: 3 }}>
            <Typography
              sx={{
                fontWeight: 600,
                mb: 1,
                fontSize: 14,
                color: "#1A1A1A",
              }}
            >
              Logo
            </Typography>
            <Box
              component="label"
              sx={{
                width: "100%",
                minHeight: 120,
                border: "2px dashed #999",
                borderRadius: "12px",
                display: "flex",
                flexDirection: "column",
                alignItems: "center",
                justifyContent: "center",
                cursor: "pointer",
                backgroundColor: logo ? "transparent" : "#F8F8F8",
                position: "relative",
                overflow: "hidden",
                "&:hover": {
                  borderColor: "#9C6ADE",
                  backgroundColor: logo ? "transparent" : "#F0F0F0",
                },
              }}
            >
              <input
                ref={logoInputRef}
                type="file"
                accept="image/png,image/jpeg"
                onChange={handleLogoUpload}
                style={{ display: "none" }}
              />
              {logo ? (
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
                    src={logo}
                    alt="Logo"
                    style={{
                      maxWidth: "100%",
                      maxHeight: "100%",
                      objectFit: "contain",
                    }}
                  />
                  <Button
                    size="small"
                    onClick={(e) => {
                      e.stopPropagation();
                      logoInputRef.current?.click();
                    }}
                    sx={{
                      position: "absolute",
                      top: 8,
                      right: 8,
                      minWidth: "auto",
                      p: 1,
                    }}
                  >
                    <EditIcon />
                  </Button>
                </Box>
              ) : (
                <>
                  <CloudUploadIcon
                    sx={{ fontSize: 48, color: "#999", mb: 1 }}
                  />
                  <Typography
                    sx={{
                      fontSize: 14,
                      color: "#666",
                      textAlign: "center",
                      fontWeight: 500,
                    }}
                  >
                    Upload a file or drag and drop
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#999",
                      textAlign: "center",
                      mt: 0.5,
                    }}
                  >
                    PNG, JPG and up to 10MB
                  </Typography>
                </>
              )}
            </Box>
          </Box>

          {/* Finish Button */}
          <Button
            fullWidth
            variant="contained"
            onClick={handleFinish}
            sx={{
              mt: "auto",
              py: 1.5,
              borderRadius: "999px",
              backgroundColor: "#3B2A1A",
              color: "#FFFFFF",
              textTransform: "none",
              fontSize: 16,
              fontWeight: 500,
              boxShadow: "none",
              "&:hover": {
                backgroundColor: "#2A1F15",
                boxShadow: "0px 4px 12px rgba(59, 42, 26, 0.3)",
              },
            }}
          >
            Click to Finish
          </Button>
        </Box>
        </Box>
      </Box>
    </Box>
  );
}
