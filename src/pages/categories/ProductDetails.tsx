import React, { useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  IconButton,
  Paper,
  styled,
  CircularProgress,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  Favorite,
  FavoriteBorder,
} from "@mui/icons-material";
import { useNavigate, useParams } from "react-router-dom";
import { PrimaryRightArrowIcon, AddToCartWhiteIcon } from "../../components/icons/CommonIcons";
import { getProductDetails } from "../../api/product";
import type { PublicProduct } from "../../api/product";
import { addToCart } from "../../api/cart";
import { toast } from "react-hot-toast";
import { usePublicProducts } from "../../api/usePublicProducts";
import LoginModal from "../../components/modals/LoginModal";
import SignUpModal from "../../components/modals/SignUpModal";

// Styled Components
const PageContainer = styled(Box)({
  padding: "40px 0 80px 0",
  minHeight: "60vh",
});

const ImageGalleryContainer = styled(Box)({
  display: "flex",
  gap: "16px",
  height: "100%",
  "@media (max-width: 900px)": {
    flexDirection: "column-reverse",
  }
});

const ThumbnailContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  width: "80px",
  "@media (max-width: 900px)": {
    flexDirection: "row",
    width: "100%",
    justifyContent: "center",
  }
});

const Thumbnail = styled(Box)<{ active?: boolean }>(({ active }) => ({
  width: "80px",
  height: "80px",
  border: active ? "1px solid #2C65F9" : "1px solid #BFC2C833",
  overflow: "hidden",
  cursor: "pointer",
  backgroundColor: "#FFF !important",
  boxShadow: "0px 0px 8px 0px #BFC2C81A",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "4px",
  "& img": {
    width: "100%",
    height: "100%",
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
  minHeight: "450px",
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
  padding: "20px",
});

const CarouselButton = styled(IconButton)({
  position: "absolute",
  top: "50%",
  transform: "translateY(-50%)",
  backgroundColor: "rgba(255, 255, 255, 0.9)",
  width: "40px",
  height: "40px",
  borderRadius: "50%",
  border: "1px solid #2C65F9",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 1)",
  },
});

const ProductInfoCard = styled(Paper)({
  padding: "0px 24px",
  borderRadius: "12px",
  boxShadow: "none",
  backgroundColor: "transparent !important",
});

const PriceSection = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "12px",
  flexWrap: "wrap",
  marginTop: "16px",
});

const DescriptionText = styled(Typography)({
  fontSize: "15px",
  color: "#4B5563",
  lineHeight: "1.6",
  marginTop: "16px",
});

const ActionButtons = styled(Stack)({
  flexDirection: "column",
  gap: "16px",
  margin: "32px 0",
  "@media (max-width: 600px)": {
    flexDirection: "column",
  }
});

const OutlinedButton = styled(Button)({
  flex: 1,
  padding: "14px 24px",
  borderRadius: "50px",
  border: "1px solid #2C65F9",
  color: "#2C65F9",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 600,
  "&:hover": {
    borderColor: "#2C55C1",
    backgroundColor: "rgba(44, 101, 249, 0.05)",
  },
});

const FilledButton = styled(Button)({
  flex: 1,
  padding: "14px 24px",
  borderRadius: "50px",
  background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
  color: "#FFFFFF",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 600,
  "&:hover": {
    background: "linear-gradient(98.42deg, #2C65F9 20%, #2C55C1 90%)",
    boxShadow: "0px 5px 15px 0px #2D60E745",
  },
});

const HighlightsSection = styled(Box)({
  marginTop: "32px",
  borderTop: "1px solid #E5E7EB",
  paddingTop: "24px",
});

const HighlightRow = styled(Box)({
  display: "flex",
  marginBottom: "12px",
  "& .label": {
    width: "150px",
    color: "#6B7280",
    fontSize: "14px",
  },
  "& .value": {
    color: "#111827",
    fontSize: "14px",
    fontWeight: 500,
  },
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

const RelatedSection = styled(Box)({
  marginTop: "80px",
  paddingTop: "60px",
  borderTop: "1px solid #E5E7EB",
});

const RelatedProductCard = styled(Box)(() => ({
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  overflow: "hidden",
  transition: "all 0.3s ease-in-out",
  border: "1px solid #1214191A",
  cursor: "pointer",
  position: "relative",
  height: "100%",
  "&:hover": {
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
    "& .ProductImage": {
      transform: "scale(1.02)",
    }
  },
}));

const RelatedProductImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "200px",
  overflow: "hidden",
  backgroundColor: "#F9F9F9",
});

const RelatedProductImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  transition: "transform 0.3s ease",
});

const RelatedProductInfo = styled(Box)({
  padding: "16px",
});

const RelatedPriceSection = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
  marginBottom: "12px",
  flexWrap: "wrap",
});

const SmallAddToCartButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "8px",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "13px",
  fontWeight: 600,
  backgroundColor: theme.palette.primary.main,
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    opacity: 0.9,
  },
}));

const ProductDetails: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [product, setProduct] = useState<PublicProduct | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedImageIndex, setSelectedImageIndex] = useState(0);
  const [isWishlisted, setIsWishlisted] = useState(false);
  const [showFullDescription, setShowFullDescription] = useState(false);
  const [addingToCart, setAddingToCart] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  // Fetch related products
  const { products: fetchedRelated, loading: relatedLoading } = usePublicProducts();

  useEffect(() => {
    // Reset view when ID changes (important for "You May Also Like" clicks)
    window.scrollTo(0, 0);
    setSelectedImageIndex(0);
    setShowFullDescription(false);

    const fetchProductDetails = async () => {
      if (!id) return;
      try {
        setLoading(true);
        const data = await getProductDetails(id);
        const productData = data.Category?.SubCategory?.Product;

        if (productData) {
          setProduct({
            ...productData,
            Category: {
              category_id: data.Category.category_id,
              name: data.Category.name,
              image: data.Category.image,
              is_active: data.Category.is_active,
              visibility: data.Category.visibility
            },
            SubCategory: {
              sub_category_id: data.Category.SubCategory.sub_category_id,
              category_id: data.Category.SubCategory.category_id,
              name: data.Category.SubCategory.name,
              is_active: data.Category.SubCategory.is_active
            }
          });
        }
        setLoading(false);
      } catch (err: any) {
        console.error("Error fetching product details:", err);
        setError(err.message || "Failed to load product details");
        setLoading(false);
      }
    };

    fetchProductDetails();
  }, [id]);

  if (loading) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", alignItems: "center", minHeight: "60vh" }}>
        <CircularProgress />
      </Box>
    );
  }

  if (error || !product) {
    return (
      <Box sx={{ textAlign: "center", py: 10 }}>
        <Typography variant="h5" color="error" gutterBottom>
          {error || "Product not found"}
        </Typography>
        <Button variant="contained" onClick={() => navigate("/home")} sx={{ mt: 2 }}>
          Back to Home
        </Button>
      </Box>
    );
  }

  // Handle Images
  const allImages: string[] = [];
  if (product.image1) allImages.push(product.image1);
  if (product.image2) allImages.push(product.image2);
  if (product.image3) allImages.push(product.image3);
  if (product.image4) allImages.push(product.image4);

  if (product.images && Array.isArray(product.images)) {
    product.images.forEach(img => {
      if (img && !allImages.includes(img)) allImages.push(img);
    });
  }

  if (product.image) {
    try {
      const parsed = JSON.parse(product.image);
      if (Array.isArray(parsed)) {
        parsed.forEach(img => {
          if (img && !allImages.includes(img)) allImages.push(img);
        });
      } else if (typeof parsed === 'string' && !allImages.includes(parsed)) {
        allImages.push(parsed);
      }
    } catch (e) {
      if (!allImages.includes(product.image)) allImages.push(product.image);
    }
  }

  if (allImages.length === 0) {
    allImages.push("/api/placeholder/400/400");
  }

  const handlePreviousImage = () => {
    setSelectedImageIndex((prev) => (prev > 0 ? prev - 1 : allImages.length - 1));
  };

  const handleNextImage = () => {
    setSelectedImageIndex((prev) => (prev < allImages.length - 1 ? prev + 1 : 0));
  };

  const onAddToCart = async (redirectPath: string = "/cart") => {
    const token = localStorage.getItem("token");
    if (!token) {
      setLoginModalOpen(true);
      return;
    }

    try {
      setAddingToCart(true);
      await addToCart({
        products: [{
          product_id: product.product_id,
          quantity: 1,
        }],
        bundle_products: [],
        cl_id: null,
        admission_id: null,
        student_name: null,
        class_id: null
      });
      toast.success("Added to cart successfully!");
      navigate(redirectPath);
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    } finally {
      setAddingToCart(false);
    }
  };

  const handleBuyNow = async () => {
    await onAddToCart("/checkout");
  };

  const handleRelatedAddToCart = async (e: React.MouseEvent, productId: number) => {
    e.stopPropagation();
    const token = localStorage.getItem("token");
    if (!token) {
      setLoginModalOpen(true);
      return;
    }

    try {
      await addToCart({
        products: [{
          product_id: productId,
          quantity: 1,
        }],
        bundle_products: [],
        cl_id: null,
        admission_id: null,
        student_name: null,
        class_id: null
      });
      toast.success("Added to cart successfully!");
      navigate("/cart");
    } catch (err: any) {
      toast.error(err.response?.data?.message || "Failed to add to cart");
    }
  };

  // Filter out the current product from related items and limit to 4
  const relatedDisplay = (fetchedRelated || [])
    .filter(p => p.product_id !== product.product_id)
    .slice(0, 4);

  return (
    <PageContainer>
      <Container maxWidth="xl">
        <Grid container spacing={5}>
          {/* Left Column - Image Gallery */}
          <Grid size={{ xs: 12, md: 5.5 }}>
            <ImageGalleryContainer>
              <ThumbnailContainer>
                {allImages.map((image, index) => (
                  <Thumbnail
                    key={index}
                    active={index === selectedImageIndex}
                    onClick={() => setSelectedImageIndex(index)}
                  >
                    <img src={image} alt={`Thumbnail ${index + 1}`} />
                  </Thumbnail>
                ))}
              </ThumbnailContainer>
              <MainImageContainer>
                <MainImage
                  src={allImages[selectedImageIndex]}
                  alt={product.name}
                />
                {allImages.length > 1 && (
                  <>
                    <CarouselButton
                      onClick={handlePreviousImage}
                      sx={{ left: "12px", transform: "translateY(-50%) rotate(180deg)" }}
                    >
                      <PrimaryRightArrowIcon />
                    </CarouselButton>
                    <CarouselButton
                      onClick={handleNextImage}
                      sx={{ right: "12px" }}
                    >
                      <PrimaryRightArrowIcon />
                    </CarouselButton>
                  </>
                )}
              </MainImageContainer>
            </ImageGalleryContainer>
          </Grid>

          {/* Right Column - Product Information */}
          <Grid size={{ xs: 12, md: 6.5 }}>
            <ProductInfoCard>
              <Stack direction="row" justifyContent="space-between" alignItems="flex-start" gap={2}>
                <Box>
                  <Typography variant="m14" color="#2C65F9" sx={{ fontWeight: 600, mb: 1, display: 'block' }}>
                    {product.Brand?.name || product.Category?.name || "Premium Quality"}
                  </Typography>
                  <Typography variant="m24" sx={{ fontWeight: 700, lineHeight: 1.3 }}>
                    {product.name}
                  </Typography>
                </Box>
                <IconButton
                  onClick={() => setIsWishlisted(!isWishlisted)}
                  sx={{
                    background: "#DFE8FF",
                    "&:hover": { background: "#C0D4FF" }
                  }}
                >
                  {isWishlisted ? (
                    <Favorite sx={{ color: "#155DFC" }} />
                  ) : (
                    <FavoriteBorder sx={{ color: "#155DFC" }} />
                  )}
                </IconButton>
              </Stack>

              <PriceSection>
                <Typography variant="sb24" sx={{ color: "#111827" }}>
                  ₹{product.selling_price}
                </Typography>
                <Typography
                  variant="m20"
                  sx={{ textDecoration: "line-through", color: "#9CA3AF" }}
                >
                  ₹{product.mrp}
                </Typography>
                <Typography
                  variant="sb16"
                  sx={{
                    color: "#059669",
                    backgroundColor: "#ECFDF5",
                    padding: "4px 12px",
                    borderRadius: "50px",
                  }}
                >
                  {product.discount_percentage}% off
                </Typography>
              </PriceSection>

              <Typography variant="r14" sx={{ mt: 2, color: product.stock_quantity > 0 ? "#059669" : "#DC2626", fontWeight: 500 }}>
                {product.stock_quantity > 0 ? `In Stock (${product.stock_quantity} units available)` : "Out of Stock"}
              </Typography>

              <Box sx={{ mt: 2 }}>
                {/* <Typography variant="sb16" gutterBottom>Description</Typography> */}
                <DescriptionText>
                  {showFullDescription
                    ? product.description || "No description available."
                    : (product.description?.substring(0, 150) || "No description available.") + (product.description?.length > 250 ? "..." : "")
                  }
                </DescriptionText>
                {product.description && product.description.length > 250 && (
                  <Button
                    onClick={() => setShowFullDescription(!showFullDescription)}
                    sx={{ color: "#2C65F9", textTransform: "none", p: 0, mt: 1, fontWeight: 600 }}
                  >
                    {showFullDescription ? "Show Less" : "Read More"}
                  </Button>
                )}
              </Box>

              <ActionButtons>
                <OutlinedButton
                  variant="outlined"
                  onClick={() => onAddToCart()}
                  disabled={addingToCart || product.stock_quantity === 0}
                >
                  {addingToCart ? <CircularProgress size={24} /> : "Add to Cart"}
                </OutlinedButton>
                <FilledButton
                  variant="contained"
                  onClick={handleBuyNow}
                  disabled={addingToCart || product.stock_quantity === 0}
                >
                  Buy Now
                </FilledButton>
              </ActionButtons>

              <HighlightsSection>
                <Typography variant="m20" sx={{ mb: 2 }}>Specifications</Typography>
                <HighlightRow>
                  <Box className="label">Brand</Box>
                  <Box className="value">{product.Brand?.name || "N/A"}</Box>
                </HighlightRow>
                <HighlightRow>
                  <Box className="label">Category</Box>
                  <Box className="value">{product.Category?.name || "N/A"}</Box>
                </HighlightRow>
                <HighlightRow>
                  <Box className="label">Sub Category</Box>
                  <Box className="value">{product.SubCategory?.name || "N/A"}</Box>
                </HighlightRow>
                <HighlightRow>
                  <Box className="label">Stock</Box>
                  <Box className="value">{product.stock_quantity} Units</Box>
                </HighlightRow>
              </HighlightsSection>
            </ProductInfoCard>
          </Grid>
        </Grid>

        {/* Related Products Section */}
        <RelatedSection>
          <Stack gap={"5px"} sx={{ marginBottom: "20px" }}>
            <Typography variant="sb32">You May Also Like</Typography>
            <Typography variant="m14" color="text.secondary">Suggestions based on what you’re browsing.</Typography>
          </Stack>

          {relatedLoading ? (
            <Box sx={{ display: "flex", justifyContent: "center", py: 5 }}>
              <CircularProgress />
            </Box>
          ) : (
            <Grid container spacing={3}>
              {relatedDisplay.map((item) => {
                let itemImage = "/api/placeholder/280/200";
                if (item.image1) itemImage = item.image1;
                else if (item.image) {
                  try {
                    const parsed = JSON.parse(item.image);
                    itemImage = Array.isArray(parsed) ? parsed[0] : parsed;
                  } catch {
                    itemImage = item.image;
                  }
                } else if (item.images && item.images.length > 0) {
                  itemImage = item.images[0];
                }

                return (
                  <Grid key={item.product_id} size={{ xs: 12, sm: 6, md: 3 }}>
                    <RelatedProductCard onClick={() => navigate(`/product/${item.product_id}`)}>
                      <RelatedProductImageContainer>
                        <RelatedProductImage
                          className="ProductImage"
                          src={itemImage}
                          alt={item.name}
                          onError={(e) => { (e.target as HTMLImageElement).src = "/api/placeholder/280/200"; }}
                        />
                        {item.discount_percentage > 10 && (
                          <BestSaleTag>Best Sale</BestSaleTag>
                        )}
                      </RelatedProductImageContainer>
                      <RelatedProductInfo>
                        <Stack direction="column" gap="4px" sx={{ mb: 2, minHeight: "85px" }}>
                          <Typography variant="m12" color="#193CB8">
                            {item.Brand?.name || item.Category?.name || "School Essentials"}
                          </Typography>
                          <Typography variant="sb16" sx={{
                            overflow: "hidden",
                            textOverflow: "ellipsis",
                            display: "-webkit-box",
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: "vertical"
                          }}>
                            {item.name}
                          </Typography>
                          <Typography variant="m12" color="text.secondary">
                            {item.stock_quantity > 0 ? `In Stock (${item.stock_quantity}+)` : "Out of Stock"}
                          </Typography>
                        </Stack>
                        <RelatedPriceSection>
                          <Typography variant="b16" sx={{ color: "#155DFC !important" }}>₹{item.selling_price}</Typography>
                          <Typography variant="r14" sx={{ textDecoration: "line-through", color: "#6A7282" }}>₹{item.mrp}</Typography>
                          <Typography variant="sb12" sx={{
                            color: "#009E08",
                            backgroundColor: "#E6FFE7",
                            padding: "2px 8px",
                            borderRadius: "50px"
                          }}>
                            {item.discount_percentage}% off
                          </Typography>
                        </RelatedPriceSection>
                        <SmallAddToCartButton
                          variant="contained"
                          startIcon={<AddToCartWhiteIcon />}
                          onClick={(e) => handleRelatedAddToCart(e, item.product_id)}
                        >
                          Add to Cart
                        </SmallAddToCartButton>
                      </RelatedProductInfo>
                    </RelatedProductCard>
                  </Grid>
                );
              })}
            </Grid>
          )}

          {relatedDisplay.length === 0 && !relatedLoading && (
            <Typography sx={{ color: "text.secondary", textAlign: "center", py: 5 }}>
              No related products found.
            </Typography>
          )}
        </RelatedSection>
      </Container>

      {/* Login Modal */}
      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={() => setLoginModalOpen(false)}
        onSignUpClick={() => {
          setLoginModalOpen(false);
          setSignUpModalOpen(true);
        }}
      />

      {/* Sign Up Modal */}
      <SignUpModal
        open={signUpModalOpen}
        onClose={() => setSignUpModalOpen(false)}
        onLoginClick={() => {
          setSignUpModalOpen(false);
          setLoginModalOpen(true);
        }}
      />
    </PageContainer>
  );
};

export default ProductDetails;
