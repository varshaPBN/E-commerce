import {
  Box,
  Typography,
  TextField,
  InputAdornment,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Divider,
  Avatar,
} from "@mui/material";

import SearchIcon from "@mui/icons-material/Search";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingBagOutlinedIcon from "@mui/icons-material/ShoppingBagOutlined";
import NotificationsNoneOutlinedIcon from "@mui/icons-material/NotificationsNoneOutlined";

export default function ProductPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default", px: 6, py: 3 }}>
      {/* ================= HEADER ================= */}
      <Box
        sx={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 3,
        }}
      >
        {/* Logo */}
        <Typography fontWeight={700} color="primary">
          ✦ Artloom
        </Typography>

        {/* Search */}
        <TextField
          placeholder="Search..."
          size="small"
          sx={{
            width: 360,
            bgcolor: "#F3ECE3",
            borderRadius: 10,
          }}
          InputProps={{
            endAdornment: (
              <InputAdornment position="end">
                <SearchIcon />
              </InputAdornment>
            ),
          }}
        />

        {/* Icons */}
        <Box sx={{ display: "flex", alignItems: "center", gap: 2 }}>
          <IconButton>
            <NotificationsNoneOutlinedIcon />
          </IconButton>
          <IconButton>
            <ShoppingBagOutlinedIcon />
          </IconButton>
          <Avatar src="/profile.png" />
        </Box>
      </Box>

      {/* ================= HERO ================= */}
      <Box
        sx={{
          bgcolor: "#DED3BF",
          borderRadius: 4,
          px: 6,
          py: 4,
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          mb: 4,
        }}
      >
        <Typography
          variant="h4"
          fontWeight={700}
          sx={{ fontFamily: "Playfair Display" }}
        >
          Marcus Chen’s Collection
        </Typography>

        <Avatar
          src="/creator.png"
          sx={{ width: 80, height: 80 }}
        />
      </Box>

      {/* ================= CONTENT ================= */}
      <Box sx={{ display: "flex", gap: 4 }}>
        {/* ========== SIDEBAR ========== */}
        <Box sx={{ width: 220 }}>
          <Typography fontWeight={600} mb={2}>
            Category
          </Typography>

          {[
            "Clothing",
            "Posters & Prints",
            "Accessories",
            "Home & Living",
            "Limited Editions",
          ].map((item) => (
            <Box key={item} sx={{ display: "flex", alignItems: "center" }}>
              <Checkbox size="small" />
              <Typography fontSize={14}>{item}</Typography>
            </Box>
          ))}

          <Typography
            fontSize={13}
            color="primary"
            sx={{ mt: 1, cursor: "pointer" }}
          >
            Show more
          </Typography>
        </Box>

        {/* ========== PRODUCT GRID ========== */}
        <Box
          sx={{
            flex: 1,
            display: "grid",
            gridTemplateColumns: "repeat(4, 1fr)",
            gap: 3,
          }}
        >
          {products.map((product) => (
            <Card
              key={product.title}
              sx={{
                borderRadius: 3,
                boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                position: "relative",
              }}
            >
              <CardMedia
                component="img"
                height="200"
                image={product.image}
                alt={product.title}
              />

              <IconButton
                sx={{
                  position: "absolute",
                  bottom: 110,
                  right: 10,
                  bgcolor: "#fff",
                }}
              >
                <FavoriteBorderIcon />
              </IconButton>

              <CardContent>
                <Typography fontWeight={600} fontSize={14}>
                  {product.title}
                </Typography>

                <Typography
                  fontSize={12}
                  color="text.secondary"
                  mb={1}
                >
                  {product.desc}
                </Typography>

                <Divider sx={{ my: 1 }} />

                <Typography fontWeight={600}>
                  ₹{product.price}
                </Typography>
              </CardContent>
            </Card>
          ))}
        </Box>
      </Box>
    </Box>
  );
}

/* ================= MOCK DATA ================= */
const products = [
  {
    title: "Customized Naruto T-shirt",
    desc: "A fashionable t-shirt with anime print",
    price: 299,
    image: "/p1.png",
  },
  {
    title: "Custom embroidered hat",
    desc: "Custom embroidered hat made for you",
    price: 149,
    image: "/p2.png",
  },
  {
    title: "Sunflower Soul Denim Jacket",
    desc: "A denim jacket with sunflower design",
    price: 500,
    image: "/p3.png",
  },
  {
    title: "Pure-fect Cat Graphic T-shirt",
    desc: "Fun cat graphic t-shirt",
    price: 149,
    image: "/p4.png",
  },
  {
    title: "Best Friends Forever Personalized Mug",
    desc: "Custom mug for best friends",
    price: 299,
    image: "/p5.png",
  },
  {
    title: "Creator Edition Streetwear Hoodie",
    desc: "Premium hoodie for creators",
    price: 699,
    image: "/p6.png",
  },
  {
    title: "Abstract Coffee Art Print",
    desc: "Abstract art for coffee lovers",
    price: 199,
    image: "/p7.png",
  },
  {
    title: "Capture the Moment T-shirt",
    desc: "Minimal typography t-shirt",
    price: 299,
    image: "/p8.png",
  },
];
