import { Box, Paper, Typography, Divider } from "@mui/material";

const items = [
  { name: "Premium Cotton Canvas Pack", price: "$45.00" },
  { name: "Professional Acrylic Set", price: "$30.00" },
  { name: "Adjustable Wooden Easel", price: "$120.00" },
];

export default function ReviewItems() {
  return (
    <Paper sx={{ p: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Review Items (3)
      </Typography>

      {items.map((item, i) => (
        <Box key={i}>
          <Box sx={{ display: "flex", justifyContent: "space-between" }}>
            <Typography>{item.name}</Typography>
            <Typography>{item.price}</Typography>
          </Box>
          {i !== items.length - 1 && <Divider sx={{ my: 2 }} />}
        </Box>
      ))}
    </Paper>
  );
}
