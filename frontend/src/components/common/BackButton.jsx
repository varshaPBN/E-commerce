import { ArrowBack } from "@mui/icons-material";
import { Button, Container } from "@mui/material";

export default function BackButton() {
  return (
    <Container maxWidth="xl" sx={{ px: 4, mt: 2.5, mb: 4.5 }}>
      <Button
        startIcon={<ArrowBack />}
        sx={{ color: "#333", textTransform: "none", fontSize: 16 }}
      >
        Back
      </Button>
    </Container>
  );
}
