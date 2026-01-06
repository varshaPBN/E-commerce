import {
    Box,
    Button,
    Checkbox,
    TextField,
    Typography,
} from "@mui/material";
import MailOutlineIcon from "@mui/icons-material/MailOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import { useRouter } from "next/router";

export default function UserLogin() {
    const router = useRouter();
    return (
        <Box
            sx={{
                minHeight: "100vh",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                p: 4,
            }}
        >
            <Box
                sx={{
                    width: "80%",
                    display: "flex",
                    overflow: "hidden",
                    boxShadow: "0 30px 60px rgba(0,0,0,0.25)",
                    bgcolor: "rgba(253, 248, 242, 0)",
                }}
            >
                {/* LEFT */}
                <Box
                    sx={{
                        width: "50%",
                        p: 6,
                        backgroundImage: "url('/userLogin.png')",
                        backgroundSize: "cover",
                        backgroundPosition: "center",
                        backgroundRepeat: "no-repeat",
                    }}
                >
                    <Typography variant="h5" fontWeight={600} mb={1}>
                        Welcome Back
                    </Typography>

                    <Typography fontSize={14} color="text.secondary" mb={4}>
                        Log in to your account to checkout faster and track your order
                    </Typography>

                    <Typography fontSize={14} mb={1}>
                        Email Address
                    </Typography>

                    <TextField
                        fullWidth
                        placeholder="you@example.com"
                        InputProps={{
                            startAdornment: <MailOutlineIcon sx={{ mr: 1 }} />,
                        }}
                        sx={{ mb: 2 }}
                    />

                    {/* <Box display="flex" justifyContent="space-between" mb={3}>
            <Box display="flex" alignItems="center">
              <Checkbox />
              <Typography fontSize={13}>Remember me</Typography>
            </Box>

            <Typography fontSize={13}>Forgot Password</Typography>
          </Box> */}
                    <Box
                        display="flex"
                        justifyContent="space-between"
                        alignItems="center"
                        mb={3}
                        width="100%"
                        flexWrap="nowrap"
                    >
                        <Box display="flex" alignItems="center">
                            <Checkbox />
                            <Typography fontSize={13}>Remember me</Typography>
                        </Box>

                        <Typography fontSize={13} sx={{ whiteSpace: "nowrap" }}>
                            Forgot Password
                        </Typography>
                    </Box>


                    <Button onClick={()=> router.push("/user-product-page")}
                        fullWidth
                        variant="contained"
                        sx={{
                            bgcolor: "#8B5E3C",
                            py: 1.4,
                            borderRadius: 6,
                            textTransform: "none",
                        }}
                    >
                        Log In And Checkout
                    </Button>
                </Box>

                {/* RIGHT */}
                <Box sx={{ width: "50%", bgcolor: "#F4ECDF", p: 6 }}>
                    <Typography variant="h6" fontWeight={600} mb={1}>
                        Guest Checkout
                    </Typography>

                    <Typography fontSize={14} color="text.secondary" mb={3}>
                        No account? Proceed securely without creating one.
                    </Typography>

                    {[
                        "Instant checkout process",
                        "Secure payment processing",
                        "Track order via mail",
                    ].map((item) => (
                        <Box key={item} display="flex" alignItems="center" mb={2}>
                            <CheckCircleIcon sx={{ color: "green", mr: 1 }} />
                            <Typography fontSize={14}>{item}</Typography>
                        </Box>
                    ))}

                    <Button onClick={()=> router.push("/user-product-page")}
                        fullWidth
                        variant="contained"
                        sx={{
                            mt: 11,
                            bgcolor: "#8B5E3C",
                            px: 4,
                            py: 1.2,
                            borderRadius: 6,
                            textTransform: "none",
                        }}
                    >
                        Continue as Guest
                    </Button>
                </Box>
            </Box>
        </Box>
    );
}
