import { Search } from "@mui/icons-material";
import { Avatar, Box, Container, IconButton, InputAdornment, TextField } from "@mui/material";

export default function ProductsHeader() {
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
            src="/marcus-logo.png"
            alt="Logo"
            sx={{
              height: "60px",
              cursor: "pointer",
            }}
          />

          {/* Search Bar */}
          <TextField
            placeholder="Search..."
            variant="outlined"
            size="small"
            sx={{
              width: "500px",
              "& .MuiOutlinedInput-root": {
                borderRadius: "30px",
                backgroundColor: "#F3E9DF",
                //"& fieldset": { border: "none" },
              },
            }}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <Search sx={{ color: "#999" }} />
                </InputAdornment>
              ),
            }}
          />

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
            <IconButton
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
