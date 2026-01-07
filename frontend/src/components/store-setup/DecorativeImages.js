import React from "react";
import { Box } from "@mui/material";

export default function DecorativeImages() {
  const images = [
    { src: "/image 1.png", top: 0, left: 5, rotate: -2, width: 190, height: 190, z: 1 },
    { src: "/image 2.png", top: 15, left: 90, rotate: 50, width: 190, height: 170, z: 2 },
    { src: "/image 4.png", top: 180, left: 100, rotate: -40, width: 190, height: 210, z: 1 },
    { src: "/image 3.png", top: 180, left: 170, rotate: -5, width: 250, height: 190, z: 2 },
    
  ];

  return (
    <Box
      sx={{
        position: "relative",
        height: { xs: "300px", md: "500px" },
        width: "100%",
        mt: 2,
        display: { xs: "none", lg: "block" },
        pointerEvents: "none",
      }}
    >
      {images.map((img, index) => (
        <Box
          key={index}
          sx={{
            position: "absolute",
            top: img.top,
            left: img.left,
            transform: `rotate(${img.rotate}deg)`,
            width: img.width,
            height: img.height,
            zIndex: img.z,
            pointerEvents: "none",
          }}
        >
          <Box
            component="img"
            src={img.src}
            alt={`Decorative ${index + 1}`}
            sx={{
              width: "100%",
              height: "100%",
              objectFit: "contain",
            }}
          />
        </Box>
      ))}
    </Box>
  );
}
