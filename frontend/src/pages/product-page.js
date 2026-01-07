import { useState, useEffect, useMemo } from "react";
import { useRouter } from "next/router";
import {
  Box,
  Typography,
  Card,
  CardContent,
  CardMedia,
  Checkbox,
  Divider,
  Avatar,
  IconButton,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";

import ProductsHeader from "@/components/common/ProductsHeader";

export default function ProductPage() {
  const [likedProducts, setLikedProducts] = useState({});
  const [selectedCategory, setSelectedCategory] = useState("All");
  const router = useRouter();
  const { search } = router.query;

  const toggleLike = (title) => {
    setLikedProducts((prev) => ({
      ...prev,
      [title]: !prev[title],
    }));
  };

  // Filter products based on search query
  const filteredProducts = useMemo(() => {
    if (!search || !search.trim()) {
      return products;
    }
    const searchLower = search.toLowerCase().trim();
    return products.filter((product) => {
      const titleMatch = product.title?.toLowerCase().includes(searchLower);
      const descMatch = product.desc?.toLowerCase().includes(searchLower);
      return titleMatch || descMatch;
    });
  }, [search]);

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
      {/* ================= HEADER ================= */}
      <ProductsHeader />

      {/* ================= PAGE CONTENT ================= */}
      <Box sx={{ px: 6, py: 3 }}>
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

          <Avatar src="/creator.png" sx={{ width: 80, height: 80 }} />
        </Box>

        {/* ================= CONTENT ================= */}
        <Box sx={{ display: "flex", gap: 4 }}>
          {/* ========== SIDEBAR ========== */}
          <Box sx={{ width: 220 }}>
            <Typography fontWeight={600} mb={2}>
              Category
            </Typography>

            {[
              "All",
              "Clothing",
              "Posters & Prints",
              "Accessories",
              "Home & Living",
              "Limited Editions",
            ].map((item) => (
              <Box
                key={item}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                }}
                onClick={() => setSelectedCategory(item)}
              >
                <Checkbox
                  size="small"
                  checked={selectedCategory === item}
                />
                <Typography fontSize={14}>{item}</Typography>
              </Box>
            ))}
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
            {filteredProducts.length === 0 ? (
              <Box
                sx={{
                  gridColumn: "1 / -1",
                  textAlign: "center",
                  py: 8,
                }}
              >
                <Typography color="text.secondary">
                  {search && search.trim()
                    ? `No products found for "${search}"`
                    : "No products available"}
                </Typography>
              </Box>
            ) : (
              filteredProducts.map((product) => (
                <Card
                  key={product.title}
                onClick={() => router.push("/user-login")}
                sx={{
                  borderRadius: 3,
                  boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                  position: "relative",
                  cursor: "pointer",
                  transition: "0.3s",
                  "&:hover": {
                    transform: "translateY(-4px)",
                    boxShadow: "0 12px 30px rgba(0,0,0,0.15)",
                  },
                }}
              >
                <CardMedia
                  component="img"
                  height="200"
                  image={product.image}
                  alt={product.title}
                />

                {/* LIKE BUTTON */}
                <IconButton
                  onClick={(e) => {
                    e.stopPropagation();
                    toggleLike(product.title);
                  }}
                  sx={{
                    position: "absolute",
                    bottom: 110,
                    right: 10,
                    bgcolor: "#fff",
                    "&:hover": { bgcolor: "#fff" },
                  }}
                >
                  {likedProducts[product.title] ? (
                    <FavoriteIcon sx={{ color: "red" }} />
                  ) : (
                    <FavoriteBorderIcon />
                  )}
                </IconButton>

                <CardContent>
                  <Typography fontWeight={600} fontSize={14}>
                    {product.title}
                  </Typography>

                  <Typography fontSize={12} color="text.secondary" mb={1}>
                    {product.desc}
                  </Typography>

                  <Divider sx={{ my: 1 }} />

                  <Typography fontWeight={600}>
                    ₹{product.price}
                  </Typography>
                </CardContent>
              </Card>
              ))
            )}
          </Box>
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
    image: "/Naruto.png",
    category: "Clothing",
  },
  {
    title: "Custom embroidered hat",
    desc: "Custom embroidered hat made for you",
    price: 149,
    image: "/cap.png",
    category: "Accessories",
  },
  {
    title: "Sunflower Soul Denim Jacket",
    desc: "A denim jacket with sunflower design",
    price: 500,
    image: "/jacket.png",
    category: "Clothing",
  },
  {
    title: "Pure-fect Cat Graphic T-shirt",
    desc: "Fun cat graphic t-shirt",
    price: 149,
    image: "/tshirt.png",
    category: "Clothing",
  },
  {
    title: "Best Friends Forever Personalized Mug",
    desc: "Custom mug for best friends",
    price: 299,
    image: "/p5.png",
    category: "Home & Living",
  },
  {
    title: "Creator Edition Streetwear Hoodie",
    desc: "Premium hoodie for creators",
    price: 699,
    image: "/p6.png",
    category: "Clothing",
  },
  {
    title: "Abstract Coffee Art Print",
    desc: "Abstract art for coffee lovers",
    price: 199,
    image: "/p7.png",
    category: "Posters & Prints",
  },
  {
    title: "Capture the Moment T-shirt",
    desc: "Minimal typography t-shirt",
    price: 299,
    image: "/p8.png",
    category: "Clothing",
  },
];
