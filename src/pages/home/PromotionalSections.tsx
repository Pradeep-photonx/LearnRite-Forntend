import React, { useRef, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  IconButton,
  styled,
  CircularProgress,
} from "@mui/material";
import { AddToCartWhiteIcon } from "../../components/icons/CommonIcons";
import { ArrowBackIos, ArrowForwardIos } from "@mui/icons-material";
import type { ProductData } from "../home/ProductCollections";
import { useDiscountedProducts } from "../../api/useDiscountedProducts";
import booksmoreImage from "../../assets/images/books-more.png";
import stationeryshopImage from "../../assets/images/image-03.png";

// Styled Components
const PromotionalSectionsContainer = styled(Box)(({ theme }) => ({
  padding: "80px 0",
  backgroundColor: "#FFFFFF",
  [theme.breakpoints.down("md")]: {
    padding: "60px 0",
  },
}));

const PromoSection = styled(Box)(({ theme }) => ({
  marginBottom: "60px",
  "&:last-child": {
    marginBottom: 0,
  },
  [theme.breakpoints.down("md")]: {
    marginBottom: "40px",
  },
}));

const SectionWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFBF7",
  borderRadius: "20px",
  padding: "32px 0 32px 32px",
  display: "flex",
  gap: "32px",
  alignItems: "flex-start",
  border: "1px solid #F8E0C1",
  width: "100%",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    padding: "24px",
    gap: "24px",
  },
}));

const BannerSection = styled(Box)<{ bgColor?: string; borderColor?: string }>(({ bgColor, borderColor, theme }) => ({
  flex: "0 0 320px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "center",
  boxShadow: borderColor ? `1px 4px 5px 0px ${borderColor}80` : "1px 4px 5px 0px #D3C1AAB2",
  backgroundColor: bgColor || "#FFEFDB",
  borderRadius: "12px",
  //   padding: "25px 25px 0px 25px",
  height: "405px",
  gap: "12px",
  [theme.breakpoints.down("md")]: {
    flex: "1 1 auto",
    width: "100%",
  },
}));

const SaleBanner = styled(Box)<{ bgColor?: string }>(({ bgColor }) => ({
  backgroundColor: bgColor || "#FFF",
  width: "100%",
  padding: "8px 16px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  alignSelf: "center",
  margin: "0px 25px 0px 25px !important",

}));

const BannerImage = styled(Box)<{
  imageWidth?: string;
  imageHeight?: string;
  imageMarginTop?: string;
}>(({ imageWidth, imageHeight, imageMarginTop }) => ({
  width: imageWidth || "185px",
  height: imageHeight || "100%",
  marginTop: imageMarginTop || "20px",
  "& img": {
    width: imageWidth || "185px",
    height: imageHeight || "100%",
    objectFit: "contain",
  },
}));

const CarouselSection = styled(Box)({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const NavigationButtons = styled(Stack)({
  flexDirection: "row",
  gap: "8px",
});

const NavButton = styled(IconButton)({
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  backgroundColor: "#2C65F9 !important",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0px",
  color: "#FFFFFF",
  border: "none",
  opacity: 1,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "#1e40af !important",
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
    backgroundColor: "#D1D4DE !important",
  },
  "& svg": {
    pointerEvents: "none",
    color: "#FFFFFF",
  },
});

const CarouselContainer = styled(Box)({
  position: "relative",
  overflow: "hidden",
  width: "100%",
});

const CarouselTrack = styled(Box)<{ translateX: number }>(({ translateX }) => ({
  display: "flex",
  transition: "transform 0.5s ease-in-out",
  transform: `translateX(-${translateX}px)`,
  gap: "20px",
}));

const ProductCard = styled(Box)(({ theme }) => ({
  minWidth: "280px",
  maxWidth: "280px",
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
  [theme.breakpoints.down("md")]: {
    minWidth: "240px",
    maxWidth: "240px",
  },
}));

const ProductImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "200px",
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
  flexWrap: "wrap",
});

const AddToCartButton = styled(Button)(({ theme }) => ({
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  backgroundColor: theme.palette.primary.main,
  color: "#FFFFFF",
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
    opacity: 0.9,
  },
}));

// Promotional Section Data Interface
export interface PromotionalSectionData {
  id: number | string;
  title: string;
  saleText: string;
  bannerImage: string;
  bannerImageAlt?: string;
  products: ProductData[];
  backgroundColor?: string;
  bannerBgColor?: string;
  bannerBorderColor?: string;
  saleBannerBgColor?: string;
  saleTextColor?: string;
  titleColor?: string;
  wrapperBorderColor?: string;
  imageWidth?: string;
  imageHeight?: string;
  imageMarginTop?: string;
  ImageCover?: string;
}

interface PromotionalSectionsProps {
  sections?: PromotionalSectionData[];
  onProductClick?: (product: ProductData) => void;
  onAddToCart?: (product: ProductData) => void;
}

// Default Promotional Sections Data
const defaultSections: PromotionalSectionData[] = [
  {
    id: 1,
    title: "Books & More",
    saleText: "Sale Upto 50% OFF",
    bannerImage: booksmoreImage,
    bannerImageAlt: "Boy with books",
    backgroundColor: "#FFFBF7",
    bannerBgColor: "#FFEFDB",
    bannerBorderColor: "#D3C1AA",
    saleBannerBgColor: "#FFFAF3",
    saleTextColor: "#BD2A28",
    titleColor: "#765935",
    wrapperBorderColor: "#F8E0C1",
    imageWidth: "185px",
    imageHeight: "100%",
    imageMarginTop: "20px",
    ImageCover: "cover",
    products: [
      {
        id: 1,
        name: "Classmate Single Line Long Notebook",
        brand: "CLASSMATE",
        image: "/api/placeholder/280/200",
        unit: "1 Unit (1 pieces)",
        currentPrice: 50,
        originalPrice: 55,
        discount: 5,
        category: "Notebooks",
        isBestSale: true,
      },
      {
        id: 2,
        name: "Classmate Single Line Long Notebook",
        brand: "CLASSMATE",
        image: "/api/placeholder/280/200",
        unit: "1 Unit (1 pieces)",
        currentPrice: 50,
        originalPrice: 55,
        discount: 5,
        category: "Notebooks",
        isBestSale: true,
      },
      {
        id: 3,
        name: "Classmate Single Line Long Notebook",
        brand: "CLASSMATE",
        image: "/api/placeholder/280/200",
        unit: "1 Unit (1 pieces)",
        currentPrice: 50,
        originalPrice: 55,
        discount: 5,
        category: "Notebooks",
        isBestSale: true,
      },
      {
        id: 4,
        name: "Classmate Single Line Long Notebook",
        brand: "CLASSMATE",
        image: "/api/placeholder/280/200",
        unit: "1 Unit (1 pieces)",
        currentPrice: 50,
        originalPrice: 55,
        discount: 5,
        category: "Notebooks",
        isBestSale: true,
      },
      {
        id: 5,
        name: "Classmate Single Line Long Notebook",
        brand: "CLASSMATE",
        image: "/api/placeholder/280/200",
        unit: "1 Unit (1 pieces)",
        currentPrice: 50,
        originalPrice: 55,
        discount: 5,
        category: "Notebooks",
        isBestSale: true,
      },
    ],
  },
  {
    id: 2,
    title: "Stationery Hub",
    saleText: "Sale Upto 50% OFF",
    bannerImage: stationeryshopImage,
    bannerImageAlt: "Stationery items",
    backgroundColor: "#FFFBFB",
    bannerBgColor: "#FEDCDE",
    bannerBorderColor: "#FEDCDE",
    saleBannerBgColor: "#FFF5F8",
    saleTextColor: "#BD2A28",
    titleColor: "#824044",
    wrapperBorderColor: "#F8D7E0",
    imageWidth: "100%",
    imageHeight: "100%",
    imageMarginTop: "15px",
    ImageCover: "cover",
    products: [
      {
        id: 6,
        name: "Classmate Single Line Long Notebook",
        brand: "CLASSMATE",
        image: "/api/placeholder/280/200",
        unit: "1 Unit (1 pieces)",
        currentPrice: 50,
        originalPrice: 55,
        discount: 5,
        category: "Notebooks",
        isBestSale: true,
      },
      {
        id: 7,
        name: "Classmate Single Line Long Notebook",
        brand: "CLASSMATE",
        image: "/api/placeholder/280/200",
        unit: "1 Unit (1 pieces)",
        currentPrice: 50,
        originalPrice: 55,
        discount: 5,
        category: "Notebooks",
        isBestSale: true,
      },
      {
        id: 8,
        name: "Classmate Single Line Long Notebook",
        brand: "CLASSMATE",
        image: "/api/placeholder/280/200",
        unit: "1 Unit (1 pieces)",
        currentPrice: 50,
        originalPrice: 55,
        discount: 5,
        category: "Notebooks",
        isBestSale: true,
      },
      {
        id: 9,
        name: "Classmate Single Line Long Notebook",
        brand: "CLASSMATE",
        image: "/api/placeholder/280/200",
        unit: "1 Unit (1 pieces)",
        currentPrice: 50,
        originalPrice: 55,
        discount: 5,
        category: "Notebooks",
        isBestSale: true,
      },
      {
        id: 10,
        name: "Classmate Single Line Long Notebook",
        brand: "CLASSMATE",
        image: "/api/placeholder/280/200",
        unit: "1 Unit (1 pieces)",
        currentPrice: 50,
        originalPrice: 55,
        discount: 5,
        category: "Notebooks",
        isBestSale: true,
      },
    ],
  },
];

const PromotionalSections: React.FC<PromotionalSectionsProps> = ({
  sections: propSections,
  onProductClick,
  onAddToCart,
}) => {
  const { products: fetchedDiscounted, loading } = useDiscountedProducts();

  // Map API products to internal format
  const mapApiProducts = (apiProducts: any[]) => {
    return apiProducts.map(p => {
      let displayImage = "/api/placeholder/280/200";
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
  };

  const sections = propSections || defaultSections.map(section => {
    if (section.title === "Books & More") {
      return {
        ...section,
        products: fetchedDiscounted.length > 0 ? mapApiProducts(fetchedDiscounted) : section.products
      };
    }
    return section;
  });

  if (loading && !propSections) {
    return (
      <Box sx={{ display: "flex", justifyContent: "center", padding: "80px 0" }}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <PromotionalSectionsContainer>
      <Container maxWidth="xl">
        {sections.map((section) => (
          <PromoSectionComponent
            key={section.id}
            section={section}
            onProductClick={onProductClick}
            onAddToCart={onAddToCart}
          />
        ))}
      </Container>
    </PromotionalSectionsContainer>
  );
};

// Individual Promo Section Component
interface PromoSectionComponentProps {
  section: PromotionalSectionData;
  onProductClick?: (product: ProductData) => void;
  onAddToCart?: (product: ProductData) => void;
}

const PromoSectionComponent: React.FC<PromoSectionComponentProps> = ({
  section,
  onProductClick,
  onAddToCart,
}) => {
  const navigate = useNavigate();
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(1);

  // Calculate card width and visible cards
  useEffect(() => {
    const updateDimensions = () => {
      if (cardRef.current && carouselRef.current) {
        const card = cardRef.current;
        const cardRect = card.getBoundingClientRect();
        if (cardRect.width > 0) {
          const cardWidthWithGap = cardRect.width + 20; // 20px gap
          setCardWidth(cardWidthWithGap);

          const containerWidth = carouselRef.current.clientWidth;
          const visible = Math.max(1, Math.floor(containerWidth / cardWidthWithGap));
          setCardsVisible(visible);
        }
      }
    };

    const rafId = requestAnimationFrame(() => {
      updateDimensions();
      setTimeout(() => {
        updateDimensions();
        setTimeout(updateDimensions, 100);
      }, 50);
    });

    window.addEventListener("resize", updateDimensions);
    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener("resize", updateDimensions);
    };
  }, [section.products.length]);

  useEffect(() => {
    if (cardWidth > 0 && carouselRef.current) {
      const newTranslateX = currentIndex * cardWidth;
      setTranslateX(newTranslateX);
    }
  }, [currentIndex, cardWidth]);

  const handlePrev = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    if (currentIndex > 0) {
      if (cardWidth > 0) {
        const newIndex = Math.max(0, currentIndex - cardsVisible);
        setCurrentIndex(newIndex);
      } else {
        setCurrentIndex(Math.max(0, currentIndex - 1));
      }
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const maxIndex = Math.max(0, section.products.length - cardsVisible);
    if (currentIndex < maxIndex) {
      if (cardWidth > 0) {
        const newIndex = Math.min(maxIndex, currentIndex + cardsVisible);
        setCurrentIndex(newIndex);
      } else {
        setCurrentIndex(Math.min(section.products.length - 1, currentIndex + 1));
      }
    }
  };

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

  const canGoPrev = currentIndex > 0 && cardWidth > 0;
  const maxIndex = Math.max(0, section.products.length - cardsVisible);
  const canGoNext = currentIndex < maxIndex && cardWidth > 0;

  return (
    <PromoSection>
      <SectionWrapper
        sx={{
          backgroundColor: section.backgroundColor || "#FFFBF7",
          position: "relative",
          border: `1px solid ${section.wrapperBorderColor || "#F8E0C1"}`,
        }}
      >
        {/* Banner Section */}
        <BannerSection
          bgColor={section.bannerBgColor}
          borderColor={section.bannerBorderColor}
        >
          <Box sx={{ display: "flex", flexDirection: "column", gap: "10px", justifyContent: "center", alignItems: "center", padding: "25px 30px 0px 30px" }}>
            <SaleBanner bgColor={section.saleBannerBgColor}>
              <Typography
                variant="sb20"
                sx={{
                  color: section.saleTextColor || "#BD2A28",
                }}
              >
                {section.saleText}
              </Typography>
            </SaleBanner>
            <Typography
              variant="sb20"
              sx={{
                color: section.titleColor || "#765935",
              }}
            >
              {section.title}
            </Typography>
          </Box>
          <BannerImage
            imageWidth={section.imageWidth}
            imageHeight={section.imageHeight}
            imageMarginTop={section.imageMarginTop}
          >
            <Box
              component="img"
              src={section.bannerImage}
              alt={section.bannerImageAlt || section.title}
            />
          </BannerImage>
        </BannerSection>

        {/* Product Carousel Section */}
        <CarouselSection sx={{ position: "relative" }}>
          <CarouselContainer ref={carouselRef}>
            <CarouselTrack translateX={translateX}>
              {section.products.map((product, index) => (
                <ProductCard
                  key={product.id}
                  ref={index === 0 ? cardRef : undefined}
                  onClick={() => handleProductClick(product)}
                >
                  <ProductImageContainer>
                    <ProductImage
                      src={product.image}
                      alt={product.imageAlt || product.name}
                    />
                    {product.isBestSale && (
                      <BestSaleTag>Best Sale</BestSaleTag>
                    )}
                  </ProductImageContainer>
                  <ProductInfo>
                    <Stack direction="column" gap="5px" minHeight="80px" mb="12px">
                      <Typography variant="m12" color="#193CB8">
                        {product.brand}
                      </Typography>
                      <Stack direction="column" gap="4px">
                        <Typography variant="sb16">{product.name}</Typography>
                        <Typography variant="m12" color="text.secondary">
                          {product.unit}
                        </Typography>
                      </Stack>
                    </Stack>
                    <PriceSection>
                      <Typography variant="b16" color="#155DFC">
                        ₹{product.currentPrice}
                      </Typography>
                      <Typography
                        variant="r14"
                        color="#6A7282"
                        sx={{ textDecoration: "line-through" }}
                      >
                        ₹{product.originalPrice}
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
                        {product.discount}% off
                      </Typography>
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
              ))}
            </CarouselTrack>
          </CarouselContainer>
        </CarouselSection>
        <NavigationButtons>
          <NavButton
            onClick={handlePrev}
            disabled={!canGoPrev}
            aria-label="Previous products"
            sx={{
              position: "absolute",
              left: "26%",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,

            }}
          >
            <ArrowBackIos sx={{ fontSize: "18px" }} />
          </NavButton>
          <NavButton
            onClick={handleNext}
            disabled={!canGoNext}
            aria-label="Next products"
            sx={{
              position: "absolute",
              right: "0px",
              top: "50%",
              transform: "translateY(-50%)",
              zIndex: 1,
            }}
          >
            <ArrowForwardIos sx={{ fontSize: "18px" }} />
          </NavButton>
        </NavigationButtons>
      </SectionWrapper>
    </PromoSection>
  );
};

export default PromotionalSections;

