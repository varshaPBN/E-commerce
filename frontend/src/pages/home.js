import {
  Box,
  Button,
  Typography,
  Link,
  Avatar,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Chip,
} from "@mui/material";
import StorefrontIcon from "@mui/icons-material/Storefront";
import AddIcon from "@mui/icons-material/Add";
import TrendingUpIcon from "@mui/icons-material/TrendingUp";
import ShoppingBagIcon from "@mui/icons-material/ShoppingBag";
import VisibilityIcon from "@mui/icons-material/Visibility";
import StarIcon from "@mui/icons-material/Star";
import FiberManualRecordIcon from "@mui/icons-material/FiberManualRecord";
import { useRouter } from "next/router";

export default function HomePage() {
  const router = useRouter();
  // Sample data - replace with actual data from API
  const recentOrders = [
    {
      id: 1,
      product: "Grey TShirt",
      productImage: "/placeholder-tshirt.png",
      customer: "Teena Ross",
      date: "Oct 24",
      status: "Paid",
      amount: "$45.00",
    },
    {
      id: 2,
      product: "Coffee Mug",
      productImage: "/placeholder-mug.png",
      customer: "Emily Mike",
      date: "Oct 23",
      status: "Pending",
      amount: "$28.50",
    },
    {
      id: 3,
      product: "Black Tote Bag",
      productImage: "/placeholder-tote.png",
      customer: "John Doe",
      date: "Oct 23",
      status: "Shipped",
      amount: "$18.00",
    },
    {
      id: 4,
      product: "Black Cap",
      productImage: "/placeholder-cap.png",
      customer: "Kiran S.",
      date: "Oct 22",
      status: "Paid",
      amount: "$15.00",
    },
    {
      id: 5,
      product: "Black Tote Bag",
      productImage: "/placeholder-tote.png",
      customer: "Neena M.",
      date: "Oct 27",
      status: "Shipped",
      amount: "$18.00",
    },
    {
      id: 6,
      product: "Black Cap",
      productImage: "/placeholder-cap.png",
      customer: "Aishwaraya C.",
      date: "Oct 30",
      status: "Shipped",
      amount: "$15.00",
    },
  ];

  const topProducts = [
    {
      id: 1,
      name: "Grey TShirt",
      image: "/placeholder-tshirt.png",
      sales: 42,
      revenue: "$1890",
    },
    {
      id: 2,
      name: "Black Tote Bag",
      image: "/placeholder-tote.png",
      sales: 38,
      revenue: "$684",
    },
    {
      id: 3,
      name: "Coffee Mug",
      image: "/placeholder-mug.png",
      sales: 20,
      revenue: "$570",
    },
    {
      id: 4,
      name: "Black Cap",
      image: "/placeholder-cap.png",
      sales: 20,
      revenue: "$300",
    },
    {
      id: 5,
      name: "Classic Red Hat",
      image: "/placeholder-hat.png",
      sales: 15,
      revenue: "$270",
    },
  ];

  const getStatusColor = (status) => {
    switch (status) {
      case "Paid":
        return "#4CAF50";
      case "Pending":
        return "#FF9800";
      case "Shipped":
        return "#2196F3";
      default:
        return "#999";
    }
  };

  return (
    <Box
      sx={{
        minHeight: "100vh",
        width: "100vw",
        backgroundColor: "#FDF8F2",
        p: { xs: 2, md: 4 },
        boxSizing: "border-box",
      }}
    >
      {/* Top Navigation Bar */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          mb: 4,
        }}
      >
        {/* Logo */}
        <Typography
          sx={{
            background: "linear-gradient(135deg, #9C6ADE 0%, #E91E63 100%)",
            WebkitBackgroundClip: "text",
            WebkitTextFillColor: "transparent",
            backgroundClip: "text",
            fontWeight: 700,
            fontSize: { xs: 24, md: 28 },
            fontFamily: "inherit",
          }}
        >
          Artloom
        </Typography>

        {/* Navigation Links */}
        <Box
          sx={{
            display: { xs: "none", md: "flex" },
            gap: 4,
            alignItems: "center",
          }}
        >
          <Link
            href="#"
            sx={{
              color: "#1A1A1A",
              textDecoration: "none",
              fontWeight: 600,
              fontSize: 14,
              borderBottom: "2px solid #9C6ADE",
              pb: 0.5,
            }}
          >
            Dashboard
          </Link>
          <Link
            href="#"
            sx={{
              color: "#666",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: 14,
              "&:hover": {
                color: "#1A1A1A",
                textDecoration: "underline",
              },
            }}
          >
            Products
          </Link>
          <Link
            href="#"
            sx={{
              color: "#666",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: 14,
              "&:hover": {
                color: "#1A1A1A",
                textDecoration: "underline",
              },
            }}
          >
            Design
          </Link>
          <Link
            href="#"
            sx={{
              color: "#666",
              textDecoration: "none",
              fontWeight: 500,
              fontSize: 14,
              "&:hover": {
                color: "#1A1A1A",
                textDecoration: "underline",
              },
            }}
          >
            Orders
          </Link>
        </Box>

        {/* Profile Picture */}
        <Avatar
          sx={{
            width: { xs: 32, md: 40 },
            height: { xs: 32, md: 40 },
            bgcolor: "#9C6ADE",
          }}
        >
          K
        </Avatar>
      </Box>

      {/* Welcome Section */}
      <Box
        sx={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: { xs: "flex-start", md: "center" },
          mb: 4,
          flexDirection: { xs: "column", md: "row" },
          gap: 2,
        }}
      >
        <Box>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: { xs: 28, md: 36 },
              mb: 0.5,
              color: "#1A1A1A",
            }}
          >
            Good Morning, Kiara.
          </Typography>
          <Typography
            sx={{
              fontSize: 14,
              color: "#666",
            }}
          >
            Here's what's happening with your store Today.
          </Typography>
        </Box>
        <Box
          sx={{
            display: "flex",
            gap: 2,
            flexDirection: { xs: "column", sm: "row" },
            width: { xs: "100%", md: "auto" },
          }}
        >
          <Button
            variant="outlined"
            startIcon={<StorefrontIcon />}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              borderColor: "#E0E0E0",
              color: "#1A1A1A",
              px: 3,
              py: 1,
              "&:hover": {
                borderColor: "#9C6ADE",
                backgroundColor: "#F8F8F8",
              },
            }}
          >
            View Storefront
          </Button>
          <Button
            variant="contained"
            startIcon={<AddIcon />}
            onClick={() => router.push("/design")}
            sx={{
              borderRadius: "12px",
              textTransform: "none",
              backgroundColor: "#3B2A1A",
              color: "#FFFFFF",
              px: 3,
              py: 1,
              "&:hover": {
                backgroundColor: "#2A1F15",
              },
            }}
          >
            Create Product
          </Button>
        </Box>
      </Box>

      {/* KPI Cards */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: {
            xs: "1fr",
            sm: "repeat(2, 1fr)",
            md: "repeat(4, 1fr)",
          },
          gap: 3,
          mb: 4,
        }}
      >
        {/* Total Revenue */}
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            p: 3,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "12px",
                backgroundColor: "#E8D4F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <TrendingUpIcon sx={{ color: "#9C6ADE", fontSize: 24 }} />
            </Box>
            <Chip
              label="+12.5%"
              size="small"
              sx={{
                backgroundColor: "#E8F5E9",
                color: "#4CAF50",
                fontWeight: 600,
                fontSize: 12,
                height: 24,
              }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: 12,
              color: "#666",
              mb: 0.5,
            }}
          >
            Total Revenue
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 24,
              color: "#1A1A1A",
            }}
          >
            $4289.00
          </Typography>
        </Box>

        {/* Total Orders */}
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            p: 3,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "12px",
                backgroundColor: "#E8D4F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <ShoppingBagIcon sx={{ color: "#9C6ADE", fontSize: 24 }} />
            </Box>
            <Chip
              label="+5.2%"
              size="small"
              sx={{
                backgroundColor: "#E8F5E9",
                color: "#4CAF50",
                fontWeight: 600,
                fontSize: 12,
                height: 24,
              }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: 12,
              color: "#666",
              mb: 0.5,
            }}
          >
            Total Orders
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 24,
              color: "#1A1A1A",
            }}
          >
            156
          </Typography>
        </Box>

        {/* Store Visits */}
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            p: 3,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "12px",
                backgroundColor: "#E8D4F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <VisibilityIcon sx={{ color: "#9C6ADE", fontSize: 24 }} />
            </Box>
            <Chip
              label="+12.5%"
              size="small"
              sx={{
                backgroundColor: "#FFEBEE",
                color: "#F44336",
                fontWeight: 600,
                fontSize: 12,
                height: 24,
              }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: 12,
              color: "#666",
              mb: 0.5,
            }}
          >
            Store Visits
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 24,
              color: "#1A1A1A",
            }}
          >
            8942
          </Typography>
        </Box>

        {/* Reviews */}
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            p: 3,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "flex-start",
              mb: 2,
            }}
          >
            <Box
              sx={{
                width: 48,
                height: 48,
                borderRadius: "12px",
                backgroundColor: "#E8D4F0",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
              }}
            >
              <StarIcon sx={{ color: "#9C6ADE", fontSize: 24 }} />
            </Box>
            <Chip
              label="4.9 Avg"
              size="small"
              sx={{
                backgroundColor: "#E8F5E9",
                color: "#4CAF50",
                fontWeight: 600,
                fontSize: 12,
                height: 24,
              }}
            />
          </Box>
          <Typography
            sx={{
              fontSize: 12,
              color: "#666",
              mb: 0.5,
            }}
          >
            Reviews
          </Typography>
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 24,
              color: "#1A1A1A",
            }}
          >
            28 New
          </Typography>
        </Box>
      </Box>

      {/* Main Content - Recent Orders and Top Products */}
      <Box
        sx={{
          display: "grid",
          gridTemplateColumns: { xs: "1fr", lg: "2fr 1fr" },
          gap: 3,
        }}
      >
        {/* Recent Orders */}
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            p: 3,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              mb: 3,
            }}
          >
            <Typography
              sx={{
                fontWeight: 700,
                fontSize: 18,
                color: "#1A1A1A",
              }}
            >
              Recent Orders
            </Typography>
            <Link
              href="#"
              sx={{
                color: "#9C6ADE",
                textDecoration: "none",
                fontSize: 14,
                fontWeight: 500,
                "&:hover": {
                  textDecoration: "underline",
                },
              }}
            >
              View All
            </Link>
          </Box>
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: "#666",
                      textTransform: "uppercase",
                      borderBottom: "1px solid #F0F0F0",
                    }}
                  >
                    Product
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: "#666",
                      textTransform: "uppercase",
                      borderBottom: "1px solid #F0F0F0",
                    }}
                  >
                    Customer
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: "#666",
                      textTransform: "uppercase",
                      borderBottom: "1px solid #F0F0F0",
                    }}
                  >
                    Date
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: "#666",
                      textTransform: "uppercase",
                      borderBottom: "1px solid #F0F0F0",
                    }}
                  >
                    Status
                  </TableCell>
                  <TableCell
                    sx={{
                      fontWeight: 600,
                      fontSize: 12,
                      color: "#666",
                      textTransform: "uppercase",
                      borderBottom: "1px solid #F0F0F0",
                    }}
                  >
                    Amount
                  </TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {recentOrders.map((order) => (
                  <TableRow key={order.id}>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 2,
                        }}
                      >
                        <Box
                          sx={{
                            width: 48,
                            height: 48,
                            borderRadius: "8px",
                            backgroundColor: "#F8F8F8",
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            overflow: "hidden",
                          }}
                        >
                          <Box
                            sx={{
                              width: "100%",
                              height: "100%",
                              backgroundColor: "#E0E0E0",
                              display: "flex",
                              alignItems: "center",
                              justifyContent: "center",
                              fontSize: 10,
                              color: "#999",
                            }}
                          >
                            {order.product.charAt(0)}
                          </Box>
                        </Box>
                        <Typography
                          sx={{
                            fontSize: 14,
                            fontWeight: 500,
                            color: "#1A1A1A",
                          }}
                        >
                          {order.product}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: 14,
                        color: "#666",
                      }}
                    >
                      {order.customer}
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: 14,
                        color: "#666",
                      }}
                    >
                      {order.date}
                    </TableCell>
                    <TableCell>
                      <Box
                        sx={{
                          display: "flex",
                          alignItems: "center",
                          gap: 0.5,
                        }}
                      >
                        <FiberManualRecordIcon
                          sx={{
                            fontSize: 8,
                            color: getStatusColor(order.status),
                          }}
                        />
                        <Typography
                          sx={{
                            fontSize: 14,
                            color: "#666",
                          }}
                        >
                          {order.status}
                        </Typography>
                      </Box>
                    </TableCell>
                    <TableCell
                      sx={{
                        fontSize: 14,
                        fontWeight: 600,
                        color: "#1A1A1A",
                      }}
                    >
                      {order.amount}
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>

        {/* Top Products */}
        <Box
          sx={{
            backgroundColor: "#FFFFFF",
            borderRadius: "16px",
            p: 3,
            boxShadow: "0px 2px 8px rgba(0,0,0,0.05)",
          }}
        >
          <Typography
            sx={{
              fontWeight: 700,
              fontSize: 18,
              color: "#1A1A1A",
              mb: 3,
            }}
          >
            Top Products
          </Typography>
          <Box
            sx={{
              display: "flex",
              flexDirection: "column",
              gap: 2,
            }}
          >
            {topProducts.map((product) => (
              <Box
                key={product.id}
                sx={{
                  display: "flex",
                  alignItems: "center",
                  gap: 2,
                  pb: 2,
                  borderBottom:
                    product.id !== topProducts.length
                      ? "1px solid #F0F0F0"
                      : "none",
                }}
              >
                <Box
                  sx={{
                    width: 64,
                    height: 64,
                    borderRadius: "8px",
                    backgroundColor: "#F8F8F8",
                    display: "flex",
                    alignItems: "center",
                    justifyContent: "center",
                    overflow: "hidden",
                    flexShrink: 0,
                  }}
                >
                  <Box
                    sx={{
                      width: "100%",
                      height: "100%",
                      backgroundColor: "#E0E0E0",
                      display: "flex",
                      alignItems: "center",
                      justifyContent: "center",
                      fontSize: 12,
                      color: "#999",
                    }}
                  >
                    {product.name.charAt(0)}
                  </Box>
                </Box>
                <Box sx={{ flex: 1, minWidth: 0 }}>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#1A1A1A",
                      mb: 0.5,
                    }}
                  >
                    {product.name}
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 12,
                      color: "#666",
                      mb: 0.5,
                    }}
                  >
                    {product.sales} sales this week
                  </Typography>
                  <Typography
                    sx={{
                      fontSize: 14,
                      fontWeight: 600,
                      color: "#1A1A1A",
                    }}
                  >
                    {product.revenue}
                  </Typography>
                </Box>
              </Box>
            ))}
          </Box>
        </Box>
      </Box>
    </Box>
  );
}

