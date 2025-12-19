import React, { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  IconButton,
  Paper,
  Link,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import { AddToCartWhiteIcon, PrimaryRightArrowIcon} from "../../components/icons/CommonIcons";
import ProductImag1 from "../../assets/images/product-image.png";

// Styled Components
const PageContainer = styled(Box)({
  padding: "40px 0 80px 0",
  // backgroundColor: "#FFFFFF",
  minHeight: "60vh",
});

const ImageGalleryContainer = styled(Box)({
  display: "flex",
  gap: "16px",
  height: "100%",
});

const ThumbnailContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  width: "80px",
});

const Thumbnail = styled(Box)<{ active?: boolean }>(({ active }) => ({
  width: "80px",
  height: "80px",
  // borderRadius: "8px",
  border: active ? "1px solid #2C65F9" : "1px solid #FFF",
  overflow: "hidden",
  cursor: "pointer",
  backgroundColor: "#FFF !important",
  boxShadow: "0px 0px 16px 0px #BFC2C833",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  "& img": {
    width: "60px",
    height: "60px",
    objectFit: "contain",
  },
  "&:hover": {
    borderColor: "#2C65F9",
  },
}));

const MainImageContainer = styled(Box)({
  position: "relative",
  flex: 1,
  borderRadius: "8px",
  overflow: "hidden",
  backgroundColor: "#FFF",
  minHeight: "100%",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: "0px 0px 16px 0px #BFC2C833",

});

const MainImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "contain",
  maxHeight: "412px",
});

const CarouselButton = styled(IconButton)({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
  "&.Mui-disabled": {
    opacity: 0.5,
  },
});

const ProductInfoCard = styled(Paper)({
  padding: "24px",
  borderRadius: "12px",
  boxShadow: "none",
  backgroundColor: "unset !important",
  // border: "1px solid #E5E7EB",
});



const PriceSection = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "10px",
  flexWrap: "wrap",
});


const DescriptionText = styled(Typography)({
  fontSize: "14px",
  color: "#6B7280",
  lineHeight: "1.6",
  marginBottom: "16px",
});

const ActionButtons = styled(Stack)({
  flexDirection: "column",
  gap: "12px",
  marginBottom: "24px",
});

const OutlinedButton = styled(Button)({
  flex: 1,
  padding: "12px 24px",
  borderRadius: "50px",
  border: "1px solid #2C65F9",
  color: "#2C65F9",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 500,
  "&:hover": {
    borderColor: "#2C55C1",
    backgroundColor: "rgba(44, 101, 249, 0.05)",
  },
});

const FilledButton = styled(Button)({
  flex: 1,
  padding: "12px 24px",
  borderRadius: "50px",
  background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
  color: "#FFFFFF",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 500,
  // boxShadow: "0px 5px 10px 0px #2D60E745",
  "&:hover": {
    background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
    boxShadow: "0px 5px 15px 0px #2D60E745",
  },
});

const HighlightsSection = styled(Box)({
  marginTop: "24px",
  display: "flex",
  flexDirection: "column",
  gap: "10px",
});

const HighlightRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "30%",
});


const SectionTitle = styled(Typography)({
  fontSize: "24px",
  fontWeight: 600,
  color: "#121318",
  fontFamily: "Figtree, sans-serif",
  marginBottom: "8px",
});

const SectionSubtitle = styled(Typography)({
  fontSize: "14px",
  color: "#6B7280",
  marginBottom: "32px",
});

const ProductCard = styled(Box)({
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid #1214191A",
  cursor: "pointer",
  position: "relative",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
});

const ProductImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "200px",
  overflow: "hidden",
  backgroundColor: "#F9F9F9",
  padding: "12px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
});

const ProductImage = styled("img")({
  width: "140px",
  height: "170px",
  objectFit: "contain",
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

const PriceSectionSmall = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
  marginBottom: "12px",
  flexWrap: "wrap",
});

const AddToCartButton = styled(Button)({
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
  color: "#FFFFFF",
  boxShadow: "0px 5px 10px 0px #2D60E745",
  "&:hover": {
    background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
    boxShadow: "0px 5px 15px 0px #2D60E745",
  },
});

// Sample Data
const productImages = [
  ProductImag1,
  ProductImag1,
  ProductImag1,
  ProductImag1,
];

const relatedProducts = [
  {
    id: 1,
    name: "Classmate Single Line Long Notebook",
    brand: "CLASSMATE",
    image: ProductImag1,
    unit: "1 Unit (1 pieces)",
    currentPrice: 50,
    originalPrice: 55,
    discount: 5,
    isBestSale: true,
  },
  {
    id: 2,
    name: "Bullet Mini Ball Pen Submarine 5 Colour Pack",
    brand: "SUBMARINE",
    image: ProductImag1,
    unit: "1 Unit (5 pieces)",
    currentPrice: 500,
    originalPrice: 550,
    discount: 5,
    isBestSale: true,
  },
  {
    id: 3,
    name: "Classmate Single Line Long Notebook",
    brand: "CLASSMATE",
    image: ProductImag1,
    unit: "1 Unit (1 pieces)",
    currentPrice: 50,
    originalPrice: 55,
    discount: 5,
    isBestSale: true,
  },
  {
    id: 4,
    name: "Brustro Mechanical Pencil with Eraser 0.5mm",
    brand: "BRUSTRO",
    image: ProductImag1,
    unit: "1 Unit (20 pieces)",
    currentPrice: 50,
    originalPrice: 55,
    discount: 5,
    isBestSale: true,
  },
];

// Helper function to convert slug to display name
const slugToName = (slug: string | undefined): string => {
  if (!slug) return "Classmate Long Book";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Helper function to get product data by slug
const getProductData = (productSlug: string | undefined) => {
  // In real app, this would be fetched from API based on slug
  // For now, return default product data
  return {
    id: productSlug || "classmate-long-book",
    name: "Classmate Long Book - Single Line, 140 Pages, 297 mm x 210 mm - Pack Of 3",
    slug: productSlug || "classmate-long-book",
    brand: "CLASSMATE",
    currentPrice: 180,
    originalPrice: 220,
    discount: 25,
    stock: 5,
    description: "The cover design of the notebook is subject to change, it depends on stock availability. Pack Of 3 - Single Line Long Book",
    fullDescription: "The cover design of the notebook is subject to change, it depends on stock availability. Pack Of 3 - Single Line Long Book. This high-quality notebook features ruled pages perfect for writing, note-taking, and school work. Made with premium paper that prevents ink bleeding.",
    highlights: {
      brand: "Classmate",
      color: "Multi",
      sheetSize: "297 x 210",
      coverMaterial: "Paper",
    },
  };
};

const ProductDetails: React.FC = () => {
  const { productSlug } = useParams<{ productSlug: string }>();
  const navigate = useNavigate();
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);

  const product = getProductData(productSlug);

  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : productImages.length - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev < productImages.length - 1 ? prev + 1 : 0));
  };

  const handleAddToCart = () => {
    // Handle add to cart logic
    console.log("Added to cart:", product);
  };

  const handleBuyNow = () => {
    // Handle buy now logic
    handleAddToCart();
    navigate("/checkout");
  };

  return (
    <PageContainer>
      <Container maxWidth="xl">
        {/* <Breadcrumb items={[{ label: "Home", path: "/home" }, { label: "Categories", path: "/categories" }, { label: slugToName(productSlug) }]} /> */}

        <Grid container spacing={4} sx={{ marginTop: "24px" }}>
          {/* Left Column - Image Gallery */}
          <Grid size={{ xs: 12, md: 5.2 }}>
            <ImageGalleryContainer>
              <ThumbnailContainer>
                {productImages.map((image, index) => (
                  <Thumbnail
                    key={index}
                    active={index === selectedImageIndex}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img src={image} alt={`Product thumbnail ${index + 1}`} />
                  </Thumbnail>
                ))}
              </ThumbnailContainer>
              <MainImageContainer>
                <MainImage
                  src={productImages[selectedImageIndex]}
                  alt={product.name}
                />
                <CarouselButton
                  onClick={handlePreviousImage}
                  sx={{ left: "10px",
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%) rotate(180deg)",
                    border: "1px solid #2C55C1",

                  }}
                  aria-label="previous image"
                  // style={{ transform: "rotate(180deg)" }}
                >
                  <PrimaryRightArrowIcon  />
                </CarouselButton>
                <CarouselButton
                  onClick={handleNextImage}
                  sx={{ right: "10px" ,
                    position: "absolute",
                    top: "50%",
                    transform: "translateY(-50%)",
                    border: "1px solid #2C55C1",
                  }}
                  aria-label="next image"
                >
                  <PrimaryRightArrowIcon  />
                </CarouselButton>
              </MainImageContainer>
            </ImageGalleryContainer>
          </Grid>

          {/* Right Column - Product Information */}
          <Grid size={{ xs: 12, md: 6 }}>
            <ProductInfoCard>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start">
              <Typography variant="m20" maxWidth="75%" >
                {product.name}
              </Typography>
              <IconButton
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  sx={{ 
                    padding: "8px" ,
                    background: "#DFE8FF",
                    borderRadius: "50%",
                    // width: "32px",
                    // height: "32px",
                  }}
                  aria-label="add to wishlist"
                >
                  {isWishlisted ? (
                    <Favorite sx={{ color: "#155DFC" }} />
                  ) : (
                    <FavoriteBorder sx={{ color: "#155DFC" }} />
                  )}
                </IconButton>
              </Stack>

              <Stack direction="column" gap="8px">
              <PriceSection>
                <Typography variant="sb20">
                  ₹{product.currentPrice}
                </Typography>
                <Typography
                  variant="r14"
                  sx={{ textDecoration: "line-through" }}
                >
                  ₹{product.originalPrice}
                </Typography>
                <Typography
                  variant="m14"
                  sx={{
                    color: "#009E08",
                    borderRadius: "50px",
                  }}
                >
                  {product.discount}% off
                </Typography>
              </PriceSection>

              <Typography variant="r14">
              Availability : in Stock {product.stock} left
              </Typography>

              <DescriptionText>
                {showFullDescription ? product.fullDescription : product.description}
                {!showFullDescription && (
                  <Link
                    component="button"
                    onClick={() => setShowFullDescription(true)}
                    sx={{
                      color: "#2C65F9",
                      textDecoration: "none",
                      marginLeft: "4px",
                      cursor: "pointer",
                      "&:hover": {
                        textDecoration: "underline",
                      },
                    }}
                  >
                    Read More
                  </Link>
                )}
              </DescriptionText>
              </Stack>

              <ActionButtons>
                <OutlinedButton variant="outlined" onClick={handleAddToCart}>
                  Add to Cart
                </OutlinedButton>
                <FilledButton variant="contained" onClick={handleBuyNow}>
                  Buy Now
                </FilledButton>
              </ActionButtons>

              <HighlightsSection>
              <Typography variant="m16">Highlights</Typography>
                <HighlightRow>
                  <Typography variant="r14" color="text.secondary">Brand</Typography>
                  <Typography variant="m14">{product.highlights.brand}</Typography>
                </HighlightRow>
                <HighlightRow>
                  <Typography variant="r14" color="text.secondary">Color</Typography>
                  <Typography variant="m14">{product.highlights.color}</Typography>
                </HighlightRow>
                <HighlightRow>
                  <Typography variant="r14" color="text.secondary">Sheet Size</Typography>
                    <Typography variant="m14">{product.highlights.sheetSize}</Typography>
                </HighlightRow>
                <HighlightRow>
                  <Typography variant="r14" color="text.secondary">Cover Material</Typography>
                  <Typography variant="m14">{product.highlights.coverMaterial}</Typography>
                </HighlightRow>
              </HighlightsSection>
            </ProductInfoCard>
          </Grid>
        </Grid>

        {/* You May Also Like Section */}
        <Box sx={{ marginTop: "80px" }}>
          <SectionTitle>You May Also Like</SectionTitle>
          <SectionSubtitle>Suggestions Based On What You're Browsing.</SectionSubtitle>

          <Grid container spacing={3}>
            {relatedProducts.map((relatedProduct) => (
              <Grid key={relatedProduct.id} size={{ xs: 12, sm: 6, md: 3 }}>
                <ProductCard>
                  <ProductImageContainer>
                    {relatedProduct.isBestSale && (
                      <BestSaleTag>Best Sale</BestSaleTag>
                    )}
                    <ProductImage
                      src={relatedProduct.image}
                      alt={relatedProduct.name}
                      onError={(e) => {
                        (e.target as HTMLImageElement).src = "";
                      }}
                    />
                  </ProductImageContainer>
                  <ProductInfo>
                    <Stack direction="column" gap="5px" minHeight="80px" mb="12px">
                      <Typography variant="m12" color="#193CB8">
                        {relatedProduct.brand}
                      </Typography>
                      <Stack direction="column" gap="4px">
                        <Typography variant="sb16">{relatedProduct.name}</Typography>
                        <Typography variant="m12" color="text.secondary">
                          {relatedProduct.unit}
                        </Typography>
                      </Stack>
                    </Stack>
                    <PriceSectionSmall>
                      <Typography variant="b16" color="#155DFC">
                        ₹{relatedProduct.currentPrice}
                      </Typography>
                      <Typography
                        variant="r14"
                        color="#6A7282"
                        sx={{ textDecoration: "line-through" }}
                      >
                        ₹{relatedProduct.originalPrice}
                      </Typography>
                      <Typography
                        variant="sb12"
                        color="#009E08"
                        sx={{
                          backgroundColor: "#E6FFE7",
                          padding: "2px 8px",
                          borderRadius: "50px",
                        }}
                      >
                        {relatedProduct.discount}% off
                      </Typography>
                    </PriceSectionSmall>
                    <AddToCartButton
                      variant="contained"
                      startIcon={<AddToCartWhiteIcon />}
                    >
                      Add to Cart
                    </AddToCartButton>
                  </ProductInfo>
                </ProductCard>
              </Grid>
            ))}
          </Grid>
        </Box>
      </Container>
    </PageContainer>
  );
};

export default ProductDetails;

