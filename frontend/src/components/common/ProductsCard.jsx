import { Box, Card, CardContent, IconButton, Typography } from "@mui/material";

export default function ProductsCard({
  index,
  image,
  title,
  description,
  price,
  isLiked,
  toggleHeart,
}) {
  return (
    <Card
      key={index}
      elevation={0}
      sx={{
        borderRadius: "20px",
        bgcolor: "#F3E9DF",
        transition: "transform 0.2s",
        boxShadow: "2px 4px 4px rgba(0, 0, 0, 0.25)",
        "&:hover": { transform: "translateY(-4px)" },
      }}
    >
      <Box
        component="img"
        src={image}
        alt={title}
        sx={{
          width: "100%",
          height: 250,
          objectFit: "cover",
        }}
      />
      <CardContent sx={{ p: 2.5 }}>
        <Typography sx={{ fontSize: "20px", fontWeight: 700, mb: 1 }}>
          {title}
        </Typography>
        <Typography
          sx={{
            fontSize: "14px",
            color: "#666",
            mb: 2,
            minHeight: 60,
            lineHeight: 1.5,
          }}
        >
          {description}
        </Typography>
        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
          }}
        >
          <Typography sx={{ fontSize: "24px", fontWeight: 700 }}>
            {price}
          </Typography>
          <Box sx={{ display: "flex", gap: 1 }}>
            <IconButton
              size="small"
              sx={{ width: 32, height: 32 }}
              onClick={() => toggleHeart(index)}
            >
              <Box
                component="img"
                src={
                  isLiked[index] ? "/icons/HeartRed.png" : "/icons/Heart.png"
                }
                sx={{ width: 24, height: 24 }}
              />
            </IconButton>
            <IconButton size="small" sx={{ width: 32, height: 32 }}>
              <Box
                component="img"
                src="/icons/Bag.png"
                sx={{ width: 24, height: 24 }}
              />
            </IconButton>
          </Box>
        </Box>
      </CardContent>
    </Card>
  );
}
