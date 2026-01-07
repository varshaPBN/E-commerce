import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Radio,
  Button,
  Divider,
} from "@mui/material";

export default function PaymentMethods() {
  const [method, setMethod] = useState(null);
  const [onlineMode, setOnlineMode] = useState(null);

  const handleProceed = () => {
    if (method === "online") {
      alert(`Proceeding with RazorPay via ${onlineMode}`);
    } else if (method === "cod") {
      alert("Order placed with Cash on Delivery");
    }
  };

  return (
    <Paper sx={{ p: 3, mb: 3 }}>
      <Typography fontWeight={600} mb={2}>
        Choose Payment Method
      </Typography>

      {/* PAY ONLINE */}
      <Paper
        sx={{
          p: 2,
          mb: 2,
          border: method === "online" ? "2px solid #8B6B5C" : "1px solid #ddd",
          cursor: "pointer",
        }}
        onClick={() => {
          setMethod("online");
          setOnlineMode(null);
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Radio checked={method === "online"} />
          <Box>
            <Typography fontWeight={600}>
              Pay Online (RazorPay)
            </Typography>
            <Typography fontSize={13} color="text.secondary">
              Credit/Debit Card, UPI, NetBanking
            </Typography>
          </Box>
        </Box>

        {method === "online" && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography fontSize={14} mb={1}>
              Select Payment Mode
            </Typography>

            {["upi", "card", "netbanking"].map((mode) => (
              <Box
                key={mode}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  cursor: "pointer",
                  mb: 1,
                }}
                onClick={(e) => {
                  e.stopPropagation();
                  setOnlineMode(mode);
                }}
              >
                <Radio checked={onlineMode === mode} />
                <Typography textTransform="capitalize">
                  {mode}
                </Typography>
              </Box>
            ))}
          </>
        )}
      </Paper>

      {/* CASH ON DELIVERY */}
      <Paper
        sx={{
          p: 2,
          border: method === "cod" ? "2px solid #8B6B5C" : "1px solid #ddd",
          cursor: "pointer",
        }}
        onClick={() => {
          setMethod("cod");
          setOnlineMode(null);
        }}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Radio checked={method === "cod"} />
          <Box>
            <Typography fontWeight={600}>
              Cash on Delivery
            </Typography>
            <Typography fontSize={13} color="text.secondary">
              Pay with cash upon delivery
            </Typography>
          </Box>
        </Box>

        {method === "cod" && (
          <>
            <Divider sx={{ my: 2 }} />
            <Typography fontSize={14} color="green">
              ✔ You can pay when you receive your order
            </Typography>
          </>
        )}
      </Paper>

      {/* SINGLE PROCEED BUTTON */}
      {method && (
        <Button
          fullWidth
          disabled={method === "online" && !onlineMode}
          sx={{
            mt: 3,
            bgcolor: "#8B6B5C",
            color: "#fff",
            "&:hover": { bgcolor: "#75574A" },
          }}
          onClick={handleProceed}
        >
          Proceed to Payment
        </Button>
      )}
    </Paper>
  );
}
