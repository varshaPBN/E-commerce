import { useState } from "react";
import {
  Box,
  Paper,
  Typography,
  Radio,
  Button,
  Divider,
  CircularProgress,
  Alert,
} from "@mui/material";
import { useRouter } from "next/router";
import { initiateRazorpayPayment } from "@/utils/razorpay";
import axios from "axios";
import { getAuthToken } from "@/utils/auth";

export default function PaymentMethods({ orderId, amount, customerName, customerEmail, onPaymentSuccess, onPaymentError }) {
  const router = useRouter();
  const [method, setMethod] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleProceed = async () => {
    if (method === "online") {
      if (!orderId) {
        setError("Order ID is missing. Please try again.");
        return;
      }

      setLoading(true);
      setError("");

      try {
        await initiateRazorpayPayment({
          orderId,
          amount,
          name: customerName || "Customer",
          email: customerEmail || "",
          onSuccess: (data) => {
            setLoading(false);
            if (onPaymentSuccess) {
              onPaymentSuccess(data);
            } else {
              // Default success handler
              router.push(`/order-details?orderId=${orderId}`);
            }
          },
          onError: (errorMessage) => {
            setLoading(false);
            setError(errorMessage);
            if (onPaymentError) {
              onPaymentError(errorMessage);
            }
          },
        });
      } catch (err) {
        setLoading(false);
        setError(err.message || "Failed to initiate payment");
      }
    } else if (method === "cod") {
      // Handle COD - update order payment method
      setLoading(true);
      setError("");

      try {
        const token = getAuthToken();
        if (!token) {
          setError("Please login to continue");
          setLoading(false);
          return;
        }

        // For COD, the order is already created with paymentMethod: "cod"
        // Cart is already cleared when order was created, just dispatch event to update badge
        window.dispatchEvent(new CustomEvent("cartUpdated"));
        
        if (onPaymentSuccess) {
          onPaymentSuccess({ message: "Order placed with Cash on Delivery" });
        } else {
          router.push(`/order-details?orderId=${orderId}`);
        }
      } catch (err) {
        setError(err.message || "Failed to place COD order");
      } finally {
        setLoading(false);
      }
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
        onClick={() => setMethod("online")}
      >
        <Box sx={{ display: "flex", gap: 2 }}>
          <Radio checked={method === "online"} />
          <Box>
            <Typography fontWeight={600}>
              Pay Online (RazorPay)
            </Typography>
            <Typography fontSize={13} color="text.secondary">
              Credit/Debit Card, UPI, NetBanking, Wallets & more
            </Typography>
          </Box>
        </Box>
      </Paper>

      {/* CASH ON DELIVERY */}
      <Paper
        sx={{
          p: 2,
          border: method === "cod" ? "2px solid #8B6B5C" : "1px solid #ddd",
          cursor: "pointer",
        }}
        onClick={() => setMethod("cod")}
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

      {/* ERROR MESSAGE */}
      {error && (
        <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError("")}>
          {error}
        </Alert>
      )}

      {/* SINGLE PROCEED BUTTON */}
      {method && (
        <Button
          fullWidth
          disabled={loading}
          sx={{
            mt: 3,
            bgcolor: "#8B6B5C",
            color: "#fff",
            "&:hover": { bgcolor: "#75574A" },
            "&:disabled": { bgcolor: "#ccc" },
          }}
          onClick={handleProceed}
        >
          {loading ? (
            <CircularProgress size={24} color="inherit" />
          ) : (
            method === "online" ? "Proceed to Payment" : "Place Order (COD)"
          )}
        </Button>
      )}
    </Paper>
  );
}
