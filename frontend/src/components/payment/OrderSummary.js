import { Box, Paper, Typography, Divider } from "@mui/material";

export default function OrderSummary({ subtotal = 0, shippingCharge = 0, taxAmount = 0, totalAmount = 0 }) {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Order Summary
      </Typography>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography fontSize={14}>Subtotal</Typography>
        <Typography fontSize={14}>₹{subtotal.toFixed(2)}</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography fontSize={14}>Shipping Charge</Typography>
        <Typography fontSize={14}>₹{shippingCharge.toFixed(2)}</Typography>
      </Box>

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 1 }}>
        <Typography fontSize={14}>Tax</Typography>
        <Typography fontSize={14}>₹{taxAmount.toFixed(2)}</Typography>
      </Box>

      <Divider sx={{ my: 2 }} />

      <Box sx={{ display: "flex", justifyContent: "space-between", mb: 2 }}>
        <Typography fontWeight={600}>Total Amount</Typography>
        <Typography fontWeight={700}>₹{totalAmount.toFixed(2)}</Typography>
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
