import { useState } from "react";
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
} from "@mui/material";

import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShoppingCartOutlinedIcon from "@mui/icons-material/ShoppingCartOutlined";

import ProductsHeader from "@/components/common/UserProductsHeader";

export default function ProductPage() {
    const [likedProducts, setLikedProducts] = useState({});

    const toggleLike = (title) => {
        setLikedProducts((prev) => ({
            ...prev,
            [title]: !prev[title],
        }));
    };

    const [cartItems, setCartItems] = useState([]);

    const addToCart = (product) => {
        setCartItems((prev) => [...prev, product]);
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
                        Marcus Chen’s Collection
                    </Typography>

                    <Avatar src="/creator.png" sx={{ width: 80, height: 80 }} />
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
                        {products.map((product) => (
                            <Card
                                key={product.title}
                                sx={{
                                    borderRadius: 3,
                                    boxShadow: "0 8px 20px rgba(0,0,0,0.12)",
                                    position: "relative",
                                }}
                            >
                                <CardMedia
                                    component="img"
                                    height="200"
                                    image={product.image}
                                    alt={product.title}
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
                                        onClick={() => toggleLike(product.title)}
                                        sx={{ bgcolor: "#fff", "&:hover": { bgcolor: "#fff" } }}
                                    >
                                        {likedProducts[product.title] ? (
                                            <FavoriteIcon sx={{ color: "red" }} />
                                        ) : (
                                            <FavoriteBorderIcon />
                                        )}
                                    </IconButton>

                                    <IconButton
                                        onClick={() => addToCart(product)}
                                        sx={{ bgcolor: "#fff", "&:hover": { bgcolor: "#fff" } }}
                                    >
                                        <ShoppingCartOutlinedIcon />
                                    </IconButton>
                                </Box>

                                <CardContent>
                                    <Typography fontWeight={600} fontSize={14}>
                                        {product.title}
                                    </Typography>

                                    <Typography fontSize={12} color="text.secondary" mb={1}>
                                        {product.desc}
                                    </Typography>

                                    <Divider sx={{ my: 2}} />

                                    <Typography fontWeight={600}>
                                        ₹{product.price}
                                    </Typography>
                                </CardContent>
                            </Card>
                        ))}
                    </Box>
                </Box>
            </Box>
        </Box>
    );
}

/* ================= MOCK DATA ================= */
const products = [
    {
        title: "Customized Naruto T-shirt",
        desc: "A fashionable t-shirt with anime print",
        price: 299,
        image: "/Naruto.png",
    },
    {
        title: "Custom embroidered hat",
        desc: "Custom embroidered hat made for you",
        price: 149,
        image: "/cap.png",
    },
    {
        title: "Sunflower Soul Denim Jacket",
        desc: "A denim jacket with sunflower design",
        price: 500,
        image: "/jacket.png",
    },
    {
        title: "Pure-fect Cat Graphic T-shirt",
        desc: "Fun cat graphic t-shirt",
        price: 149,
        image: "/tshirt.png",
    },
    {
        title: "Best Friends Forever Personalized Mug",
        desc: "Custom mug for best friends",
        price: 299,
        image: "/p5.png",
    },
    {
        title: "Creator Edition Streetwear Hoodie",
        desc: "Premium hoodie for creators",
        price: 699,
        image: "/p6.png",
    },
    {
        title: "Abstract Coffee Art Print",
        desc: "Abstract art for coffee lovers",
        price: 199,
        image: "/p7.png",
    },
    {
        title: "Capture the Moment T-shirt",
        desc: "Minimal typography t-shirt",
        price: 299,
        image: "/p8.png",
    },
];
