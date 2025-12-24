import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import {
    Box,
    Container,
    Grid,
    Stack,
    Typography,
    Button,
    styled,
    CircularProgress,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { AddToCartWhiteIcon } from "../../components/icons/CommonIcons";
import ProductCollectionsBg from "../../assets/images/products-bg.png";
import { usePublicProducts } from "../../api/usePublicProducts";


// Styled Components
const ProductCollectionsContainer = styled(Box)(({ theme }) => ({
    padding: "80px 0",
    backgroundColor: "#FFFFFF",
    position: "relative",
    backgroundImage: `url(${ProductCollectionsBg})`,
    backgroundSize: "cover",
    backgroundPosition: "center",
    backgroundRepeat: "no-repeat",
    borderBottom: "1px solid #1214191A",
    [theme.breakpoints.down("md")]: {
        padding: "60px 0",
    },
}));

const HeaderSection = styled(Box)({
    textAlign: "center",
    marginBottom: "20px",
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    justifyContent: "center",
    gap: "12px",
});

const ProductCard = styled(Box)(({ theme }) => ({
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    overflow: "hidden",
    transition: "all 0.3s ease-in-out",
    border: "1px solid #1214191A",
    cursor: "pointer",
    position: "relative",
    "&:hover .ProductImage": {
        transform: "scale(1.02)",
        transition: "all 0.3s ease-in-out",
    },
    [theme.breakpoints.down("md")]: {
        marginBottom: "20px",
    },
}));

const ProductImageContainer = styled(Box)({
    position: "relative",
    width: "100%",
    height: "240px",
    overflow: "hidden",
    backgroundColor: "#F9F9F9",
});

const ProductImage = styled("img")({
    width: "100%",
    height: "100%",
    objectFit: "cover",
});

const BestSaleTag = styled(Box)({
    position: "absolute",
    top: "12px",
    left: "12px",
    backgroundColor: "#FF6B35",
    color: "#FFFFFF",
    padding: "4px 12px",
    borderRadius: "20px",
    fontSize: "12px",
    fontWeight: 600,
    zIndex: 2,
});

const ProductInfo = styled(Box)({
    padding: "16px",
});

const PriceSection = styled(Stack)({
    flexDirection: "row",
    alignItems: "center",
    gap: "8px",
    marginBottom: "12px",
});

const AddToCartButton = styled(Button)(({ theme }) => ({
    width: "100%",
    padding: "10px",
    borderRadius: "8px",
    textTransform: "none",
    fontSize: "14px",
    fontWeight: 600,
    backgroundColor: theme.palette.primary.main,
    color: "#FFFFFF",
    "&:hover": {
        backgroundColor: theme.palette.primary.main,
        opacity: 0.9,
    },
}));

// Product Data Interface
export interface ProductData {
    id: number | string;
    name: string;
    brand: string;
    image: string;
    imageAlt?: string;
    unit: string;
    currentPrice: number;
    originalPrice: number;
    discount: number;
    category: string;
    isBestSale?: boolean;
    originalData?: any;
}

interface ProductCollectionsProps {
    products?: ProductData[];
    title?: string;
    subtitle?: string;
    onProductClick?: (product: ProductData) => void;
    onAddToCart?: (product: ProductData) => void;
}

const ProductCollections: React.FC<ProductCollectionsProps> = ({
    products: propProducts,
    title = "Our Product Collections",
    subtitle = "Handpicked essentials for students with amazing discounts.",
    onProductClick,
    onAddToCart,
}) => {
    const theme = useTheme();
    const navigate = useNavigate();
    const { products: fetchedProducts, loading } = usePublicProducts();

    const products: ProductData[] = propProducts || (fetchedProducts || []).map(p => {
        let displayImage = "/api/placeholder/300/240";
        try {
            if (p.image1) {
                displayImage = p.image1;
            } else if (p.image) {
                const parsed = JSON.parse(p.image);
                if (Array.isArray(parsed) && parsed.length > 0) {
                    displayImage = parsed[0];
                }
            } else if (p.images && p.images.length > 0) {
                displayImage = p.images[0];
            }
        } catch (e) {
            console.error("Failed to parse product image", e);
        }

        return {
            id: p.product_id,
            name: p.name,
            brand: p.Brand?.name || p.Category?.name || "School Essentials",
            image: displayImage,
            unit: p.stock_quantity > 0 ? `In Stock (${p.stock_quantity}+)` : "Out of Stock",
            currentPrice: p.selling_price,
            originalPrice: p.mrp,
            discount: p.discount_percentage,
            category: p.Category?.name || "Other",
            isBestSale: p.discount_percentage > 10,
            originalData: p
        };
    });

    const handleProductClick = (product: ProductData) => {
        if (onProductClick) {
            onProductClick(product);
        } else {
            navigate(`/product/${product.id}`);
        }
    };

    const handleAddToCart = (e: React.MouseEvent, product: ProductData) => {
        e.stopPropagation();
        if (onAddToCart) {
            onAddToCart(product);
        }
    };

    return (
        <ProductCollectionsContainer>
            <Container maxWidth="xl">
                <HeaderSection sx={{ marginBottom: "60px" }}>
                    <Typography variant="sb40">{title}</Typography>
                    <Typography variant="r20" color={theme.palette.text.secondary}>
                        {subtitle}
                    </Typography>
                </HeaderSection>

                {loading ? (
                    <Box sx={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
                        <CircularProgress />
                    </Box>
                ) : (
                    <>
                        <Grid container spacing={{ xs: 2, md: 3 }} sx={{ mt: 2 }}>
                            {products.map((product) => (
                                <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                    <ProductCard onClick={() => handleProductClick(product)}>
                                        <ProductImageContainer>
                                            <ProductImage
                                                className="ProductImage"
                                                src={product.image}
                                                alt={product.imageAlt || product.name}
                                                onError={(e) => {
                                                    (e.target as HTMLImageElement).src = "/api/placeholder/300/240";
                                                }}
                                            />
                                            {product.isBestSale && (
                                                <BestSaleTag>Best Sale</BestSaleTag>
                                            )}
                                        </ProductImageContainer>
                                        <ProductInfo>
                                            <Stack direction="column" gap="5px" minHeight="100px">
                                                <Typography variant="m12" color="#193CB8">{product.brand}</Typography>
                                                <Stack direction="column" gap="4px">
                                                    <Typography variant="sb16">{product.name}</Typography>
                                                    <Typography variant="m12" color="text.secondary">{product.unit}</Typography>
                                                </Stack>
                                            </Stack>
                                            <PriceSection>
                                                <Typography variant="b16" color="#155DFC !important">₹{product.currentPrice}</Typography>
                                                <Typography variant="r14" color="#6A7282" sx={{ textDecoration: "line-through" }}>₹{product.originalPrice}</Typography>
                                                <Typography variant="sb12" color="#009E08" sx={{ backgroundColor: "#E6FFE7", padding: "2px 8px", borderRadius: "50px" }}>{product.discount}% off</Typography>
                                            </PriceSection>
                                            <AddToCartButton
                                                variant="contained"
                                                startIcon={<AddToCartWhiteIcon />}
                                                onClick={(e) => handleAddToCart(e, product)}
                                                sx={{
                                                    fontSize: "14px",
                                                    lineHeight: "140%",
                                                    fontWeight: 500,
                                                    display: "flex",
                                                    alignItems: "baseline",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                Add to Cart
                                            </AddToCartButton>
                                        </ProductInfo>
                                    </ProductCard>
                                </Grid>
                            ))}
                        </Grid>

                        {products.length === 0 && (
                            <Box sx={{ textAlign: "center", padding: "60px 20px" }}>
                                <Typography variant="h6" sx={{ color: theme.palette.text.secondary }}>
                                    No products found.
                                </Typography>
                            </Box>
                        )}
                    </>
                )}
            </Container>
        </ProductCollectionsContainer>
    );
};

export default ProductCollections;
