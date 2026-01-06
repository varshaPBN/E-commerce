import { Box, Typography, Button, Stack } from "@mui/material";
import HomeIcon from "@mui/icons-material/Home";
import StorefrontIcon from "@mui/icons-material/Storefront";

export default function NotFound() {
  return (
    <Box
      minHeight="100vh"
      display="flex"
      alignItems="center"
      justifyContent="center"
      bgcolor="#F7EFE5"
    >
      <Stack spacing={3} alignItems="center">
        <Typography variant="h1" fontWeight="bold">
          404
        </Typography>

        <Typography variant="h4">
          Oops! Looks like this masterpiece is missing.
        </Typography>

        <Typography color="text.secondary" align="center">
          The page you are looking for might have been moved or deleted.
        </Typography>

        <Stack direction="row" spacing={2}>
          <Button
            variant="contained"
            startIcon={<HomeIcon />}
            href="/"
          >
            Go to Homepage
          </Button>

          <Button
            variant="outlined"
            startIcon={<StorefrontIcon />}
            href="/studio"
          >
            Visit My Studio
          </Button>
        </Stack>
      </Stack>
    </Box>
  );
}
