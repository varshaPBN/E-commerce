import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import { Search } from "@mui/icons-material";
import { Avatar, Badge, Box, Container, IconButton, InputAdornment, TextField, Menu, MenuItem } from "@mui/material";
import axios from "axios";
import { getAuthToken, logout } from "@/utils/auth";

export default function ProductsHeader() {
  const router = useRouter();
  const [cartCount, setCartCount] = useState(0);
  const [searchQuery, setSearchQuery] = useState("");
  const [anchorEl, setAnchorEl] = useState(null);
  const open = Boolean(anchorEl);

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

      let items = [];
      if (response.data.cart?.items) {
        items = response.data.cart.items;
      } else if (response.data.items) {
        items = response.data.items;
      } else if (Array.isArray(response.data)) {
        items = response.data;
      }

      const totalQuantity = items.reduce((sum, item) => sum + (item.quantity || 0), 0);
      setCartCount(totalQuantity);
    } catch (error) {
      setCartCount(0);
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

  const handleAvatarClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleMenuClose = () => {
    setAnchorEl(null);
  };

  const handleLogout = () => {
    logout();
    handleMenuClose();
    router.push("/user-login");
  };

  const handleSearchChange = (e) => {
    setSearchQuery(e.target.value);
  };

  const handleSearchSubmit = (e) => {
    e.preventDefault();
    if (router.pathname?.includes('[')) {
      const currentPath = router.asPath?.split('?')[0];
      if (currentPath && !currentPath.includes('[') && !currentPath.includes(']')) {
        const queryParams = new URLSearchParams();
        if (searchQuery.trim()) {
          queryParams.set('search', searchQuery.trim());
        }
        Object.keys(router.query).forEach(key => {
          if (key !== 'search' && key !== 'artistId') {
            queryParams.set(key, router.query[key]);
          }
        });
        const queryString = queryParams.toString();
        const newUrl = queryString ? `${currentPath}?${queryString}` : currentPath;
        router.replace(newUrl, undefined, { shallow: true });
        return;
      }
    }
    
    if (searchQuery.trim()) {
      router.push({
        pathname: router.pathname,
        query: { ...router.query, search: searchQuery.trim() },
      });
    } else {
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
            }}
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
            <IconButton
              onClick={handleAvatarClick}
              sx={{ p: 0 }}
            >
              <Avatar
                src="/user-avatar.png"
                alt="User Avatar"
                sx={{
                  width: 40,
                  height: 40,
                  background: "linear-gradient(135deg, #FF6B9D 0%, #C239B3 100%)",
                  cursor: "pointer",
                }}
              />
            </IconButton>
            <Menu
              anchorEl={anchorEl}
              open={open}
              onClose={handleMenuClose}
              anchorOrigin={{
                vertical: "bottom",
                horizontal: "right",
              }}
              transformOrigin={{
                vertical: "top",
                horizontal: "right",
              }}
            >
              <MenuItem onClick={handleLogout}>Logout</MenuItem>
            </Menu>
          </Box>
        </Box>
      </Container>
    </Box>
  );
}
