import { useState, useEffect } from "react";
import { useRouter } from "next/router";
import {
    Box,
    Typography,
    Card,
    CardContent,
    CardMedia,
    Checkbox,
    Divider,
    Avatar,
    IconButton,
    CircularProgress,
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import ProductsHeader from "@/components/common/UserProductsHeader";
import { isAuthenticated, getAuthToken } from "@/utils/auth";
import axios from "axios";
import { Snackbar, Alert } from "@mui/material";

export default function ProductPage() {
    const router = useRouter();
    const { artistId, search } = router.query;
    const [products, setProducts] = useState([]);
    const [allProducts, setAllProducts] = useState([]);
    const [loading, setLoading] = useState(true);
    const [likedProducts, setLikedProducts] = useState({});
    const [artistInfo, setArtistInfo] = useState(null);
    const [snackbar, setSnackbar] = useState({ open: false, message: "", severity: "success" });
    const isUserAuthenticated = isAuthenticated();

    // Fetch products from backend
    useEffect(() => {
        const fetchProducts = async () => {
            if (!artistId) {
                setLoading(false);
                return;
            }

            try {
                setLoading(true);
                const response = await axios.get(`/api/v1/${artistId}/products`, {
                    validateStatus: () => true
                });

                if (response.status === 200 && response.data.products) {
                    setAllProducts(response.data.products);
                    setProducts(response.data.products);
                } else {
                    console.error("Failed to fetch products:", response.data?.message);
                    setProducts([]);
                    setAllProducts([]);
                }
            } catch (error) {
                console.error("Error fetching products:", error);
                setProducts([]);
                setAllProducts([]);
            } finally {
                setLoading(false);
            }
        };

        fetchProducts();
    }, [artistId]);

    // Filter products based on search query
    useEffect(() => {
        if (search && search.trim()) {
            const searchLower = search.toLowerCase().trim();
            const filtered = allProducts.filter((product) => {
                const nameMatch = product.name?.toLowerCase().includes(searchLower);
                const descMatch = product.description?.toLowerCase().includes(searchLower);
                const categoryMatch = product.category?.toLowerCase().includes(searchLower);
                return nameMatch || descMatch || categoryMatch;
            });
            setProducts(filtered);
        } else {
            setProducts(allProducts);
        }
    }, [search, allProducts]);

    const toggleLike = (productId) => {
        // Check authentication before allowing like
        if (!isUserAuthenticated) {
            router.push("/user-login");
            return;
        }
        setLikedProducts((prev) => ({
            ...prev,
            [productId]: !prev[productId],
        }));
    };

    const addToCart = async (product) => {
        // Check authentication before adding to cart
        if (!isUserAuthenticated) {
            router.push("/user-login");
            return;
        }

        try {
            const token = getAuthToken();
            if (!token) {
                setSnackbar({
                    open: true,
                    message: "Please log in to add items to cart",
                    severity: "error",
                });
                router.push("/user-login");
                return;
            }

            // Add to cart with default values (can be enhanced later with size/color selection)
            const response = await axios.post(
                "/api/v1/add/cart",
                {
                    productId: product._id,
                    color: "None",
                    size: "None",
                    quantity: 1,
                },
                {
                    headers: {
                        Authorization: `Bearer ${token}`,
                    },
                }
            );

            if (response.status === 200 || response.status === 201) {
                setSnackbar({
                    open: true,
                    message: "Item added to cart successfully!",
                    severity: "success",
                });

                // Wait a bit for the backend to process, then trigger cart count refresh
                setTimeout(() => {
                    window.dispatchEvent(new CustomEvent("cartUpdated"));
                }, 1000);
            } else {
                throw new Error("Unexpected response status");
            }

        } catch (error) {
            setSnackbar({
                open: true,
                message: error.response?.data?.message || "Failed to add item to cart",
                severity: "error",
            });
        }
    };

    // Handle product card click - redirect guests to login
    const handleProductClick = (product) => {
        if (!isUserAuthenticated) {
            router.push("/user-login");
            return;
        }
        // Navigate to product detail page
        router.push(`/product-view?productId=${product._id}`);
    };

    return (
        <Box sx={{ minHeight: "100vh", bgcolor: "background.default" }}>
            {/* ================= HEADER ================= */}
            <ProductsHeader />

            {/* ================= PAGE CONTENT ================= */}
            <Box sx={{ px: 6, py: 3 }}>
                {/* ================= HERO ================= */}
                <Box
                    sx={{
                        bgcolor: "#DED3BF",
                        borderRadius: 4,
                        px: 6,
                        py: 4,
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "space-between",
                        mb: 4,
                    }}
                >
                    <Typography
                        variant="h4"
                        fontWeight={700}
                        sx={{ fontFamily: "Playfair Display" }}
                    >
                        {artistInfo?.storeName || artistInfo?.name || "Artist Collection"}
                    </Typography>

                    <Avatar 
                        src={artistInfo?.profilePicture || "/creator.png"} 
                        sx={{ width: 80, height: 80 }} 
                    />
                </Box>

                {/* ================= CONTENT ================= */}
                <Box sx={{ display: "flex", gap: 4 }}>
                    {/* ========== SIDEBAR ========== */}
                    <Box sx={{ width: 220 }}>
                        <Typography fontWeight={600} mb={2}>
                            Category
                        </Typography>

                        {[
                            "Clothing",
                            "Posters & Prints",
                            "Accessories",
                            "Home & Living",
                            "Limited Editions",
                        ].map((item) => (
                            <Box key={item} sx={{ display: "flex", alignItems: "center" }}>
                                <Checkbox size="small" />
                                <Typography fontSize={14}>{item}</Typography>
                            </Box>
                        ))}

                        <Typography
                            fontSize={13}
                            color="primary.dark"
                            sx={{ mt: 1, cursor: "pointer" }}
                        >
                            Show more
                        </Typography>
                    </Box>

                    {/* ========== PRODUCT GRID ========== */}
                    <Box
                        sx={{
                            flex: 1,
                            display: "grid",
                            gridTemplateColumns: "repeat(4, 1fr)",
                            gap: 3,
                        }}
                    >
                        {loading ? (
                            <Box
                                sx={{
                                    gridColumn: "1 / -1",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    py: 8,
                                }}
                            >
                                <CircularProgress />
                            </Box>
                        ) : products.length === 0 ? (
                            <Box
                                sx={{
                                    gridColumn: "1 / -1",
                                    textAlign: "center",
                                    py: 8,
                                }}
                            >
                                <Typography color="text.secondary">
                                    {search && search.trim()
                                        ? `No products found for "${search}"`
                                        : "No products available"}
                                </Typography>
                            </Box>
                        ) : (
                            products.map((product) => (
                                <Card
                                    key={product._id}
                                    onClick={() => handleProductClick(product)}
                                    sx={{
                                        borderRadius: 3,
                                        boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                                        position: "relative",
                                        cursor: "pointer",
                                        transition: "transform 0.2s, box-shadow 0.2s",
                                        "&:hover": {
                                            transform: "translateY(-4px)",
                                            boxShadow: "0 12px 24px rgba(0,0,0,0.15)",
                                        },
                                    }}
                                >
                                    <CardMedia
                                        component="img"
                                        height="200"
                                        image={product.design || "/placeholder.png"}
                                        alt={product.name}
                                        sx={{ pointerEvents: "none" }}
                                    />

                                    <Box
                                        sx={{
                                            position: "absolute",
                                            bottom: 20,
                                            right: 10,
                                            display: "flex",
                                            gap: 1,
                                        }}
                                    >
                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                toggleLike(product._id);
                                            }}
                                            sx={{ bgcolor: "#fff", "&:hover": { bgcolor: "#fff" } }}
                                        >
                                            {likedProducts[product._id] ? (
                                                <FavoriteIcon sx={{ color: "red" }} />
                                            ) : (
                                                <FavoriteBorderIcon />
                                            )}
                                        </IconButton>

                                        <IconButton
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                addToCart(product);
                                            }}
                                            sx={{ bgcolor: "#fff", "&:hover": { bgcolor: "#fff" } }}
                                        >
                                            <ShoppingCartOutlinedIcon />
                                        </IconButton>
                                    </Box>

                                    <CardContent>
                                        <Typography fontWeight={600} fontSize={14}>
                                            {product.name}
                                        </Typography>

                                        <Typography fontSize={12} color="text.secondary" mb={1}>
                                            {product.description || product.category}
                                        </Typography>

                                        <Divider sx={{ my: 2}} />

                                        <Typography fontWeight={600}>
                                            ₹{product.price}
                                        </Typography>
                                    </CardContent>
                                </Card>
                            ))
                        )}
                    </Box>
                </Box>
            </Box>

            {/* Snackbar for notifications */}
            <Snackbar
                open={snackbar.open}
                autoHideDuration={3000}
                onClose={() => setSnackbar({ ...snackbar, open: false })}
                anchorOrigin={{ vertical: "bottom", horizontal: "right" }}
            >
                <Alert
                    onClose={() => setSnackbar({ ...snackbar, open: false })}
                    severity={snackbar.severity}
                    sx={{ width: "100%" }}
                >
                    {snackbar.message}
                </Alert>
            </Snackbar>
        </Box>
    );
}

