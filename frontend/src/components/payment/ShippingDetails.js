import { Paper, Typography } from "@mui/material";

export default function ShippingDetails() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={1}>
        Shipping To
      </Typography>

      <Typography>Alex Morgan</Typography>
      <Typography fontSize={13} color="text.secondary">
        123 Creator Lane, Apt 4B
        <br />
        Beverly Hills, Los Angeles
        <br />
        CA 90210, United States
      </Typography>

      <Typography fontSize={13} mt={1}>
        +1 (555) 123-4567
      </Typography>

      <Typography fontSize={12} color="text.secondary" mt={2}>
        Estimated Delivery: Oct 28, 2023
      </Typography>
    </Paper>
  );
}
