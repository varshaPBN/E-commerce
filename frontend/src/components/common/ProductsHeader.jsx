import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Search } from "@mui/icons-material";
import { Avatar, Badge, Box, Container, IconButton, InputAdornment, TextField } from "@mui/material";
import axios from "axios";
import { getAuthToken } from "@/utils/auth";

export default function ProductsHeader() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");

  const fetchCartCount = async () => {
    try {
      const token = getAuthToken();
      if (!token) {
        setCartCount(0);
        return;
      }

      const response = await axios.get("/api/v1/get/cart/", {
        headers: { Authorization: `Bearer ${token}` },
      });

      // Handle different possible response structures
      let items = [];
      if (response.data.cart?.items) {
        items = response.data.cart.items;
      } else if (response.data.items) {
        items = response.data.items;
      } else if (Array.isArray(response.data)) {
        items = response.data;
      }

      // Calculate total quantity of all items in cart
      const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
      setCartCount(totalQuantity);
    } catch (error) {
      // If user is not authenticated or cart is empty, set count to 0
      if (error.response?.status === 401 || error.response?.status === 404) {
        setCartCount(0);
      } else {
        setCartCount(0);
      }
    }
  };

  useEffect(() => {
    fetchCartCount();

    // Listen for cart updates
    const handleCartUpdate = () => {
      fetchCartCount();
    };

    window.addEventListener("cartUpdated", handleCartUpdate);

    return () => {
      window.removeEventListener("cartUpdated", handleCartUpdate);
    };
  }, []);

  const handleCartClick = () => {
    router.push("/cart");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (searchQuery.trim()) {
      // Navigate to search results or update current page with search query
      const currentPath = router.pathname;
      router.push({
        pathname: currentPath,
        query: { ...router.query, search: searchQuery.trim() },
      });
    } else {
      // Remove search query if empty
      const { search, ...restQuery } = router.query;
      router.push({
        pathname: router.pathname,
        query: restQuery,
      });
    }
  };

  // Initialize search query from URL
  useEffect(() => {
    if (router.query.search) {
      setSearchQuery(router.query.search);
    }
  }, [router.query.search]);

  return (
    <Box sx={{ bgcolor: "#FDF8F2", py: 2 }}>
      <Container maxWidth="xl" sx={{ px: 4 }}>
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            flexWrap: { xs: "wrap", md: "nowrap" },
            gap: 2,
          }}
        >
          {/* Logo */}
          <Box
            component="img"
            src="/logo.png"
            alt="Artloom Logo"
            sx={{
              height: "60px",
              cursor: "pointer",
            }}
            onClick={() => router.push("/")}
          />

          {/* Search Bar */}
          <Box
            component="form"
            onSubmit={handleSearchSubmit}
            sx={{ width: "500px" }}
          >
            <TextField
              placeholder="Search products..."
              variant="outlined"
              size="small"
              value={searchQuery}
              onChange={handleSearchChange}
              fullWidth
              sx={{
                "& .MuiOutlinedInput-root": {
                  borderRadius: "30px",
                  backgroundColor: "#F3E9DF",
                },
              }}
              InputProps={{
                endAdornment: (
                  <InputAdornment position="end">
                    <IconButton
                      type="submit"
                      edge="end"
                      sx={{ p: 0.5 }}
                    >
                      <Search sx={{ color: "#999" }} />
                    </IconButton>
                  </InputAdornment>
                ),
              }}
            />
          </Box>

          {/* Header Icons */}
          <Box sx={{ display: "flex", gap: 1.5, alignItems: "center" }}>
            <IconButton
              sx={{
                bgcolor: "#F3E9DF",
                boxShadow: "2px 4px 4px rgba(0,0,0, 0.25)",
                "&:hover": { bgcolor: "#f3e9dfb4" },
              }}
            >
              <Box
                component="img"
                src="/icons/Bell.png"
                sx={{ width: 24, height: 24 }}
              />
            </IconButton>
            <Badge
              badgeContent={cartCount}
              color="error"
              sx={{
                "& .MuiBadge-badge": {
                  right: 6,
                  top: 6,
                  minWidth: 18,
                  height: 18,
                  fontSize: "0.75rem",
                  fontWeight: 600,
                },
              }}
            >
              <IconButton
                onClick={handleCartClick}
                sx={{
                  bgcolor: "#F3E9DF",
                  boxShadow: "2px 4px 4px rgba(0,0,0, 0.25)",
                  "&:hover": { bgcolor: "#f3e9dfb4" },
                }}
              >
                <Box
                  component="img"
                  src="/icons/Shopping cart.png"
                  sx={{ width: 24, height: 24 }}
                />
              </IconButton>
            </Badge>
            <Avatar
              src="/user-avatar.png"
              alt="User Avatar"
              sx={{
                width: 40,
                height: 40,
                background: "linear-gradient(135deg, #FF6B9D 0%, #C239B3 100%)",
              }}
            />
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
