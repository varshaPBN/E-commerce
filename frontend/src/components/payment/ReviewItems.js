import { Box, Paper, Typography, Divider } from "@mui/material";

export default function ReviewItems({ items = [] }) {
  if (!items || items.length === 0) {
    return (
      <Paper sx={{ p: 3 }}>
        <Typography fontWeight={600} mb={2}>
          Review Items
        </Typography>
        <Typography color="text.secondary">No items to review</Typography>
      </Paper>
    );
  }

  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Review Items ({items.length})
      </Typography>

      {items.map((item, i) => (
        <Box key={i}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Box>
              <Typography>{item.name || "Product"}</Typography>
              {item.color && item.size && (
                <Typography fontSize={12} color="text.secondary">
                  {item.color} - {item.size} (Qty: {item.quantity})
                </Typography>
              )}
            </Box>
            <Typography>₹{(item.price * item.quantity).toFixed(2)}</Typography>
          </Box>
          {i !== items.length - 1 && <Divider sx={{ my: 2 }} />}
        </Box>
      ))}
    </Paper>
  );
}
