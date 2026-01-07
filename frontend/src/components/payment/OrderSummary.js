import { Box, Paper, Typography, Divider, Button } from "@mui/material";

export default function OrderSummary() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Order Summary
      </Typography>

      {[
        ["Subtotal (3 items)", "$195.00"],
        ["Shipping Charge", "$15.00"],
        ["Tax (8.6%)", "$16.80"],
        ["Promo Discount", "-$10.00"],
      ].map(([label, value]) => (
        <Box key={label} sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
          <Typography fontSize={14}>{label}</Typography>
          <Typography fontSize={14}>{value}</Typography>
        </Box>
      ))}

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography fontWeight={600}>Total Amount</Typography>
        <Typography fontWeight={700}>$216.80</Typography>
      </Box>

      {/* <Button
        fullWidth
        sx={{
          bgcolor: "#8B6B5C",
          color: "#fff",
          py: 1.2,
          "&:hover": { bgcolor: "#75574A" },
        }}
      >
        Proceed to Payment →
      </Button> */}

      {/* <Typography fontSize={12} color="text.secondary" mt={1}>
        🔒 Payments are SSL encrypted and secure
      </Typography> */}
    </Paper>
  );
}
