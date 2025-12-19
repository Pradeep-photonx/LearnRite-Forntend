    import React, { useState } from "react";
    import {
        Box,
        Container,
        Grid,
        Stack,
        Typography,
        Button,
        styled,
    } from "@mui/material";
    import { useTheme } from "@mui/material/styles";
    import { AddToCartIcon, AddToCartWhiteIcon } from "../../components/icons/CommonIcons";
    import ProductCollectionsBg from "../../assets/images/products-bg.png";
    import ProductImag1 from "../../assets/images/classmate.png";
    import ProductImage2 from "../../assets/images/yemam1.png";
    import ProductImage3 from "../../assets/images/doms.png";
    import ProductImage4 from "../../assets/images/yemam.png";


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

    const CategoryTabs = styled(Stack)(({ theme }) => ({
        flexDirection: "row",
        gap: "12px",
        justifyContent: "center",
        flexWrap: "wrap",
        marginBottom: "40px",
        [theme.breakpoints.down("md")]: {
            marginBottom: "20px",
            gap: "8px",
        },
    }));

    const CategoryTab = styled(Button)<{ active?: boolean }>(({ active, theme }) => ({
        padding: "08px 18px",
        borderRadius: "50px",
        textTransform: "none",
        fontSize: "16px",
        fontWeight: 500,
        backgroundColor: active ? theme.palette.primary.main : "#FFF",
        color: active ? "#FFFFFF" : theme.palette.text.primary,
        border: "1px solid #1214191A",
        "&:hover": {
            // backgroundColor: active ? theme.palette.primary.main : "#E0E0E0",
            color: active ? "#FFFFFF" : theme.palette.text.primary,
        },
        [theme.breakpoints.down("md")]: {
            fontSize: "14px",
        },
    }));

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
    }

    interface ProductCollectionsProps {
        products?: ProductData[];
        categories?: string[];
        title?: string;
        subtitle?: string;
        onProductClick?: (product: ProductData) => void;
        onAddToCart?: (product: ProductData) => void;
    }

    // Default Categories
    const defaultCategories = [
        "All Products",
        "Notebooks",
        "Writing",
        "Pens & Pencils",
        "Organization",
        "Art Supplies",
    ];

    // Default Products Data (for demo - will be replaced by backend data)
    const defaultProducts: ProductData[] = [
        {
            id: 1,
            name: "Classmate Single Line Long Notebook",
            brand: "CLASSMATE",
            image: ProductImag1,
            unit: "1 Unit (1 pieces)",
            currentPrice: 50,
            originalPrice: 55,
            discount: 5,
            category: "Notebooks",
            isBestSale: true,
        },
        {
            id: 2,
            name: "WISHKEY 145 Pieces Art Set for Kids with Storage Case, Art and Craft Su...",
            brand: "YEMAMA",
            image: ProductImage2,
            unit: "1 Unit (20 pieces)",
            currentPrice: 600,
            originalPrice: 700,
            discount: 10,
            category: "Art Supplies",
        },
        {
            id: 3,
            name: "ONEGO Kids School Backpack Durable Printed Bag for Nursery",
            brand: "DOMS",
            image: ProductImage3,
            unit: "1 Unit (20 pieces)",
            currentPrice: 600,
            originalPrice: 700,
            discount: 10,
            category: "Organization",
            isBestSale: true,
        },
        {
            id: 4,
            name: "YAMAMA Sky Travel Multifunctional Pencil Magnetic Box High Tech Crea...",
            brand: "YEMAMA",
            image: ProductImage4,
            unit: "1 Unit (20 pieces)",
            currentPrice: 600,
            originalPrice: 700,
            discount: 10,
            category: "Organization",
            isBestSale: true,
        },
        {
            id: 5,
            name: "Brustro Mechanical Pencil with Eraser 0.5mm",
            brand: "BRUSTO",
            image: "/api/placeholder/300/240",
            unit: "1 Unit (20 pieces)",
            currentPrice: 50,
            originalPrice: 55,
            discount: 5,
            category: "Pens & Pencils",
        },
        {
            id: 6,
            name: "Doms Hexel Ball Pen",
            brand: "DOMS",
            image: "/api/placeholder/300/240",
            unit: "1 Unit (20 pieces)",
            currentPrice: 50,
            originalPrice: 55,
            discount: 5,
            category: "Pens & Pencils",
        },
        {
            id: 7,
            name: "Classmate Pulse 6 Subject Notebook",
            brand: "CLASSMATE",
            image: "/api/placeholder/300/240",
            unit: "1 Unit (1 pieces)",
            currentPrice: 50,
            originalPrice: 55,
            discount: 5,
            category: "Notebooks",
            isBestSale: true,
        },
        {
            id: 8,
            name: "Bullet Mini Ball Pen Submarine 5 Colour Pack",
            brand: "SUBMARINE",
            image: "/api/placeholder/300/240",
            unit: "1 Unit (5 pieces)",
            currentPrice: 500,
            originalPrice: 550,
            discount: 5,
            category: "Pens & Pencils",
        },
    ];

    const ProductCollections: React.FC<ProductCollectionsProps> = ({
        products = defaultProducts,
        categories = defaultCategories,
        title = "Our Product Collections",
        subtitle = "Handpicked essentials for students with amazing discounts.",
        onProductClick,
        onAddToCart,
    }) => {
        const theme = useTheme();
        const [selectedCategory, setSelectedCategory] = useState("All Products");

        // Filter products based on selected category
        const filteredProducts =
            selectedCategory === "All Products"
                ? products
                : products.filter((product) => product.category === selectedCategory);

        const handleCategoryChange = (category: string) => {
            setSelectedCategory(category);
        };

        const handleProductClick = (product: ProductData) => {
            if (onProductClick) {
                onProductClick(product);
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
                    {/* Header Section */}
                    <HeaderSection>
                        <Typography
                            variant="sb40"
                            sx={{
                                //   color: theme.palette.text.primary,
                                //   fontWeight: 700,
                                //   fontSize: { xs: "28px", md: "36px", lg: "40px" },
                                //   marginBottom: "12px !important",
                            }}
                        >
                            {title}
                        </Typography>
                        <Typography
                            variant="r20"
                            color={theme.palette.text.secondary}
                        // sx={{
                        //   fontSize: { xs: "14px", md: "16px" },
                        // }}
                        >
                            {subtitle}
                        </Typography>
                    </HeaderSection>

                    {/* Category Tabs */}
                    <CategoryTabs>
                        {categories.map((category) => (
                            <CategoryTab
                                key={category}
                                active={selectedCategory === category}
                                onClick={() => handleCategoryChange(category)}
                            >
                                {category}
                            </CategoryTab>
                        ))}
                    </CategoryTabs>

                    {/* Products Grid */}
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        {filteredProducts.map((product) => (
                            <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                                <ProductCard onClick={() => handleProductClick(product)}>
                                    <ProductImageContainer>
                                        <ProductImage className="ProductImage"
                                            src={product.image}
                                            alt={product.imageAlt || product.name}
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
                                            <Typography variant="r14" color="#6A7282" sx={{textDecoration:"line-through"}}>₹{product.originalPrice}</Typography>
                                            <Typography variant="sb12" color="#009E08" sx={{backgroundColor:"#E6FFE7", padding:"2px 8px", borderRadius:"50px"}}>{product.discount}% off</Typography>
                                        </PriceSection>
                                        <AddToCartButton
                                            variant="contained"
                                            startIcon={<AddToCartWhiteIcon />}
                                            onClick={(e) => handleAddToCart(e, product)}
                                            sx={{
                                                fontSize:"14px",
                                                lineHeight:"140%",
                                                fontWeight:500,
                                                display:"flex",
                                                alignItems:"baseline",
                                                justifyContent:"center",

                                            }}
                                        >
                                            Add to Cart
                                        </AddToCartButton>
                                    </ProductInfo>
                                </ProductCard>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Show message if no products found */}
                    {filteredProducts.length === 0 && (
                        <Box
                            sx={{
                                textAlign: "center",
                                padding: "60px 20px",
                            }}
                        >
                            <Typography
                                variant="h6"
                                sx={{
                                    color: theme.palette.text.secondary,
                                }}
                            >
                                No products found in this category.
                            </Typography>
                        </Box>
                    )}
                </Container>
            </ProductCollectionsContainer>
        );
    };

    export default ProductCollections;

