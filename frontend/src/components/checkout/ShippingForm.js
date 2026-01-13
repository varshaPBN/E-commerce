import { useState } from "react";
import {
  Box,
  Typography,
  TextField,
  Button,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  CircularProgress,
} from "@mui/material";

export default function ShippingForm({ open, onClose, onSubmit, loading }) {
  const [formData, setFormData] = useState({
    name: "",
    phone: "",
    address: "",
    city: "",
    state: "",
    pincode: "",
  });
  const [errors, setErrors] = useState({});

  const handleChange = (field) => (e) => {
    setFormData({ ...formData, [field]: e.target.value });
    if (errors[field]) {
      setErrors({ ...errors, [field]: "" });
    }
  };

  const calculateDeliveryDate = () => {
    // Calculate delivery date: 7-10 business days from today
    const today = new Date();
    let deliveryDate = new Date(today);
    let daysAdded = 0;
    const targetDays = 7; // Minimum 7 business days
    
    while (daysAdded < targetDays) {
      deliveryDate.setDate(deliveryDate.getDate() + 1);
      // Skip weekends (Saturday = 6, Sunday = 0)
      if (deliveryDate.getDay() !== 0 && deliveryDate.getDay() !== 6) {
        daysAdded++;
      }
    }
    
    return deliveryDate;
  };

  const validate = () => {
    const newErrors = {};
    
    if (!formData.name.trim()) newErrors.name = "Name is required";
    if (!formData.phone.trim()) newErrors.phone = "Phone is required";
    else if (!/^[0-9]{10}$/.test(formData.phone.replace(/\D/g, ""))) {
      newErrors.phone = "Please enter a valid 10-digit phone number";
    }
    if (!formData.address.trim()) newErrors.address = "Address is required";
    if (!formData.city.trim()) newErrors.city = "City is required";
    if (!formData.state.trim()) newErrors.state = "State is required";
    if (!formData.pincode.trim()) newErrors.pincode = "Pincode is required";
    else if (!/^[0-9]{6}$/.test(formData.pincode)) {
      newErrors.pincode = "Please enter a valid 6-digit pincode";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (validate()) {
      const deliveryDate = calculateDeliveryDate();
      onSubmit({
        shippingAddress: formData,
        deliveryDate: deliveryDate.toISOString(),
      });
    }
  };

  return (
    <Dialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      <DialogTitle>
        <Typography variant="h6" fontWeight={600}>
          Shipping Details
        </Typography>
      </DialogTitle>
      <form onSubmit={handleSubmit}>
        <DialogContent>
          <Box sx={{ display: "flex", flexDirection: "column", gap: 2, pt: 1 }}>
            <TextField
              label="Full Name"
              value={formData.name}
              onChange={handleChange("name")}
              error={!!errors.name}
              helperText={errors.name}
              required
              fullWidth
            />
            <TextField
              label="Phone Number"
              value={formData.phone}
              onChange={handleChange("phone")}
              error={!!errors.phone}
              helperText={errors.phone}
              required
              fullWidth
            />
            <TextField
              label="Address"
              value={formData.address}
              onChange={handleChange("address")}
              error={!!errors.address}
              helperText={errors.address}
              required
              fullWidth
              multiline
              rows={2}
            />
            <Box sx={{ display: "flex", gap: 2 }}>
              <TextField
                label="City"
                value={formData.city}
                onChange={handleChange("city")}
                error={!!errors.city}
                helperText={errors.city}
                required
                fullWidth
              />
              <TextField
                label="State"
                value={formData.state}
                onChange={handleChange("state")}
                error={!!errors.state}
                helperText={errors.state}
                required
                fullWidth
              />
            </Box>
            <TextField
              label="Pincode"
              value={formData.pincode}
              onChange={handleChange("pincode")}
              error={!!errors.pincode}
              helperText={errors.pincode}
              required
              fullWidth
            />
          </Box>
        </DialogContent>
        <DialogActions sx={{ px: 3, pb: 2 }}>
          <Button onClick={onClose} disabled={loading}>
            Cancel
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={loading}
            sx={{
              bgcolor: "#8B6B5C",
              "&:hover": { bgcolor: "#75574A" },
            }}
          >
            {loading ? <CircularProgress size={24} /> : "Continue to Payment"}
          </Button>
        </DialogActions>
      </form>
    </Dialog>
  );
}
