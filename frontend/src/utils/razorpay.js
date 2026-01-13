import axios from "axios";
import { getAuthToken } from "./auth";

/**
 * Initialize Razorpay payment
 * @param {string} orderId - The order ID from your backend
 * @param {number} amount - Amount in rupees
 * @param {string} name - Customer name
 * @param {string} email - Customer email
 * @param {function} onSuccess - Callback on successful payment
 * @param {function} onError - Callback on payment error
 */
export const initiateRazorpayPayment = async ({
  orderId,
  amount,
  name,
  email,
  onSuccess,
  onError,
}) => {
  try {
    const token = getAuthToken();
    if (!token) {
      onError("Please login to continue");
      return;
    }

    // Step 1: Create payment order on backend
    const response = await axios.post(
      "/api/v1/user/pay",
      { orderId },
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      }
    );

    if (!response.data.success) {
      onError(response.data.error || "Failed to create payment order");
      return;
    }

    const { razorpayOrderId } = response.data;

    // Step 2: Initialize Razorpay checkout
    const options = {
      key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
      amount: Math.round(amount * 100), // Convert to paise
      currency: "INR",
      name: "ArtisanMerch",
      description: `Order #${orderId}`,
      order_id: razorpayOrderId,
      handler: async function (response) {
        // Step 3: Verify payment on backend
        try {
          const verifyResponse = await axios.post(
            "/api/v1/user/payment/verify",
            {
              paymentId: response.razorpay_payment_id,
              razorpayOrderId: response.razorpay_order_id,
              signature: response.razorpay_signature,
            },
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );

          if (verifyResponse.data.success) {
            // Clear cart and update badge immediately
            window.dispatchEvent(new CustomEvent("cartUpdated"));
            onSuccess(verifyResponse.data);
          } else {
            onError(verifyResponse.data.error || "Payment verification failed");
          }
        } catch (error) {
          console.error("Payment verification error:", error);
          onError(
            error.response?.data?.error ||
              "Failed to verify payment. Please contact support."
          );
        }
      },
      prefill: {
        name: name || "",
        email: email || "",
      },
      theme: {
        color: "#8B6B5C",
      },
      modal: {
        ondismiss: function () {
          onError("Payment cancelled by user");
        },
      },
    };

    // Check if Razorpay is loaded
    if (!window.Razorpay) {
      onError("Razorpay SDK not loaded. Please refresh the page.");
      return;
    }

    const razorpay = new window.Razorpay(options);
    razorpay.on("payment.failed", function (response) {
      onError(response.error.description || "Payment failed");
    });
    razorpay.open();
  } catch (error) {
    console.error("Payment initiation error:", error);
    onError(
      error.response?.data?.error ||
        "Failed to initiate payment. Please try again."
    );
  }
};
