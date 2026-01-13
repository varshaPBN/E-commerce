import { Box, Typography, Chip, Alert, CircularProgress } from "@mui/material";
import { useRouter } from "next/router";
import { useState, useEffect } from "react";
import PaymentMethods from "@/components/payment/PaymentMethods";
import OrderSummary from "@/components/payment/OrderSummary";
import ReviewItems from "@/components/payment/ReviewItems";
import ShippingDetails from "@/components/payment/ShippingDetails";
import axios from "axios";
import { getAuthToken } from "@/utils/auth";

export default function PaymentPage() {
  const router = useRouter();
  const { orderId } = router.query;
  const [order, setOrder] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [paymentSuccess, setPaymentSuccess] = useState(false);

  useEffect(() => {
    const fetchOrder = async () => {
      if (!orderId) {
        setError("Order ID is missing");
        setLoading(false);
        return;
      }

      try {
        const token = getAuthToken();
        if (!token) {
          setError("Please login to continue");
          setLoading(false);
          return;
        }

        const response = await axios.get(`/api/v1/get/order/${orderId}`, {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        });

        if (response.data.success) {
          setOrder(response.data.order);
        } else {
          setError("Order not found");
        }
      } catch (err) {
        setError(err.response?.data?.message || "Failed to load order");
      } finally {
        setLoading(false);
      }
    };

    if (orderId) {
      fetchOrder();
    }
  }, [orderId]);

  const handlePaymentSuccess = (data) => {
    setPaymentSuccess(true);
    setTimeout(() => {
      router.push(`/order-details?orderId=${orderId}`);
    }, 2000);
  };

  const handlePaymentError = (errorMessage) => {
    setError(errorMessage);
  };

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "100vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error && !order) {
    return (
      <Box sx={{ p: 4 }}>
        <Alert severity="error">{error}</Alert>
      </Box>
    );
  }

  if (paymentSuccess) {
    return (
      <Box sx={{ p: 4, textAlign: "center" }}>
        <Alert severity="success">Payment successful! Redirecting to order details...</Alert>
      </Box>
    );
  }

  return (
    <Box sx={{ minHeight: "100vh", bgcolor: "#FAF7F2" }}>
      
      {/* HEADER */}
      <Box
        sx={{
          px: 6,
          py: 2,
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          borderBottom: "1px solid #e5e5e5",
        }}
      >
        <Typography fontWeight={700}>ArtisanMerch</Typography>
        <Box sx={{ display: "flex", gap: 2 }}>
          <Chip label="🛒" />
          <Chip label="👤" />
        </Box>
      </Box>

      {/* CONTENT */}
      <Box sx={{ px: 6, py: 4 }}>
        <Typography fontSize={13} color="text.secondary">
          Cart / Shipping Details / <b>Payment</b>
        </Typography>

        <Box
          sx={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            mt: 2,
          }}
        >
          <Box>
            <Typography variant="h4" fontWeight={700}>
              Secure Payment
            </Typography>
            <Typography fontSize={14} color="text.secondary">
              Complete your purchase securely via RazorPay
            </Typography>
          </Box>

          {/* <Chip
            icon={<span>🔒</span>}
            label="SSL Secured Checkout"
            variant="outlined"
          /> */}
        </Box>

        {error && (
          <Alert severity="error" sx={{ mt: 2 }} onClose={() => setError("")}>
            {error}
          </Alert>
        )}

        <Box sx={{ display: "flex", gap: 4, mt: 4 }}>
          
          {/* LEFT */}
          <Box sx={{ flex: 2 }}>
            <PaymentMethods
              orderId={order?._id}
              amount={order?.totalAmount}
              customerName={order?.shippingAddress?.name}
              customerEmail={order?.userId?.email}
              onPaymentSuccess={handlePaymentSuccess}
              onPaymentError={handlePaymentError}
            />
            <ReviewItems items={order?.items || []} />
          </Box>

          {/* RIGHT */}
          <Box sx={{ flex: 1 }}>
            <OrderSummary
              subtotal={order?.subtotal}
              shippingCharge={order?.shippingCharge}
              taxAmount={order?.taxAmount}
              totalAmount={order?.totalAmount}
            />
            <Box sx={{ mt: 3 }}>
              <ShippingDetails
                shippingAddress={order?.shippingAddress}
                deliveryDate={order?.deliveryDate}
              />
            </Box>
          </Box>
        </Box>
      </Box>
    </Box>
  );
}
