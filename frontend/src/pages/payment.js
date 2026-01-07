import { Box, Typography, Chip } from "@mui/material";
import PaymentMethods from "@/components/payment/PaymentMethods";
import OrderSummary from "@/components/payment/OrderSummary";
import ReviewItems from "@/components/payment/ReviewItems";
import ShippingDetails from "@/components/payment/ShippingDetails";

export default function PaymentPage() {
  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#FAF7F2" }}>
      
      {/* HEADER */}
      <Box
        sx={{
          px: 6,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <Typography fontWeight={700}>ArtisanMerch</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Chip label="🛒" />
          <Chip label="👤" />
        </Box>
      </Box>

      {/* CONTENT */}
      <Box sx={{ px: 6, py: 4 }}>
        <Typography fontSize={13} color="text.secondary">
          Cart / Shipping Details / <b>Payment</b>
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700}>
              Secure Payment
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              Complete your purchase securely via RazorPay
            </Typography>
          </Box>

          {/* <Chip
            icon={<span>🔒</span>}
            label="SSL Secured Checkout"
            variant="outlined"
          /> */}
        </Box>

        <Box sx={{ display: "flex", gap: 4, mt: 4 }}>
          
          {/* LEFT */}
          <Box sx={{ flex: 2 }}>
            <PaymentMethods />
            <ReviewItems />
          </Box>

          {/* RIGHT */}
          <Box sx={{ flex: 1 }}>
            <OrderSummary />
            <Box sx={{ mt: 3 }}>
              <ShippingDetails />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
