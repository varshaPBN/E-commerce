import { ArrowBack } from "@mui/icons-material";
import { Button, Container } from "@mui/material";
import { useRouter } from "next/router";

export default function BackButton({ fallbackPath = "/", noBottomMargin = false, compact = false }) {
  const router = useRouter();

  const handleBack = () => {
    // Check if there's history to go back to
    if (window.history.length > 1) {
      router.back();
    } else {
      // If no history, navigate to fallback path or home
      router.push(fallbackPath);
    }
  };

  return (
    <Container maxWidth="xl" sx={{ px: 4, mt: compact ? 0 : 2.5, mb: noBottomMargin ? 0 : 4.5 }}>
      <Button
        startIcon={<ArrowBack />}
        onClick={handleBack}
        sx={{ 
          color: "#333", 
          textTransform: "none", 
          fontSize: 16,
          "&:hover": {
            backgroundColor: "rgba(0, 0, 0, 0.04)",
          },
        }}
      >
        Back
      </Button>
    </Container>
  );
}
