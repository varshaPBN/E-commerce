import { Paper, Typography } from "@mui/material";

export default function ShippingDetails({ shippingAddress, deliveryDate }) {
  if (!shippingAddress) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography fontWeight={600} mb={1}>
          Shipping To
        </Typography>
        <Typography color="text.secondary">No shipping address provided</Typography>
      </Paper>
    );
  }

  const formatDate = (date) => {
    if (!date) return "N/A";
    const d = new Date(date);
    return d.toLocaleDateString("en-US", {
      year: "numeric",
      month: "long",
      day: "numeric",
    });
  };

  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={1}>
        Shipping To
      </Typography>

      <Typography>{shippingAddress.name}</Typography>
      <Typography fontSize={13} color="text.secondary">
        {shippingAddress.address}
        <br />
        {shippingAddress.city}, {shippingAddress.state}
        <br />
        {shippingAddress.pincode}
      </Typography>

      {shippingAddress.phone && (
        <Typography fontSize={13} mt={1}>
          {shippingAddress.phone}
        </Typography>
      )}

      {deliveryDate && (
        <Typography fontSize={12} color="text.secondary" mt={2}>
          Estimated Delivery: {formatDate(deliveryDate)}
        </Typography>
      )}
    </Paper>
  );
}
