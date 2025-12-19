import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  styled,
} from "@mui/material";
import studentsImage from "../../assets/images/study-essential.png";
import backgroundImage from "../../assets/images/study-essential-bg.png";
import categoryImage1 from "../../assets/images/notebooks.png";
import categoryImage2 from "../../assets/images/pen-penclis.png";
import { WhiteLeftArrowIcon, WhiteRightArrowIcon } from "../../components/icons/CommonIcons";


// Styled Components
const StudyEssentialsContainer = styled(Box)(({ theme }) => ({
  background: `url(${backgroundImage}) no-repeat center center`,
  backgroundSize: "cover",
  position: "relative",
  overflow: "hidden",
  padding: "56px 0",
  [theme.breakpoints.down("md")]: {
    padding: "60px 0",
  },
}));

const ContentWrapper = styled(Box)({
  position: "relative",
  zIndex: 1,
});

const HeroSection = styled(Box)(({ theme }) => ({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start ",
  marginBottom: "0px",
  gap: "40px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    alignItems: "flex-start",
    marginBottom: "40px",
  },
}));

const TitleSection = styled(Box)({
  flex: 1,
  maxWidth: "600px",
  marginTop: "40px",
});

const StudentsImage = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  justifyContent: "flex-end",
  "& img": {
    maxWidth: "100%",
    height: "auto",
    objectFit: "contain",
  },
  [theme.breakpoints.down("md")]: {
    justifyContent: "center",
    width: "100%",
  },
}));

const CategoriesHeader = styled(Box)({
  display: "flex",
  justifyContent: "left",
  alignItems: "center",
  marginBottom: "32px",
  gap: "20px",
});

const NavigationButtons = styled(Stack)({
  flexDirection: "row",
  gap: "8px",
  
});

const NavButton = styled(IconButton)<{ active?: boolean }>(() => ({
  width: "34px",
  height: "34px",
  borderRadius: "50%",
  backgroundColor: "transparent !important",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  padding: "0px",
  color: "#FFFFFF",
  border: "1px solid #FFFFFF",
  opacity: 1,
  cursor: "pointer",
  "&:hover": {
    backgroundColor: "rgba(255, 255, 255, 0.1) !important",
  },
  "&:disabled": {
    opacity: 0.5,
    cursor: "not-allowed",
  },
  "& svg": {
    pointerEvents: "none",
  },
}));

const CarouselContainer = styled(Box)({
  position: "relative",
  overflow: "visible",
  width: "100%",
});

const CarouselTrack = styled(Box)<{ translateX: number }>(({ translateX }) => ({
  display: "flex",
  transition: "transform 0.5s ease-in-out",
  transform: `translateX(-${translateX}px)`,
  gap: "20px",
}));

const CategoryCard = styled(Box)(({ theme }) => ({
  minWidth: "250px",
  maxWidth: "250px",
  height: "320px",
  backgroundColor: "#FFFFFF",
  borderRadius: "16px",
  overflow: "hidden",
  cursor: "pointer",
  boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.15)",
  transition: "all 0.3s ease",
  position: "relative",

  // "&:hover": {
  //   transform: "translateY(-8px)",
  //   boxShadow: "0px 8px 24px rgba(0, 0, 0, 0.2)",
  // },
  [theme.breakpoints.down("md")]: {
    minWidth: "180px",
    maxWidth: "180px",
  },
}));

const CategoryImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
  display: "block",
});

const CategoryLabel = styled(Typography)(({ theme }) => ({
  // padding: "16px",
  width: "100%",
  textAlign: "center",
  fontWeight: 600,
  fontSize: "16px",
  position: "absolute",
  bottom: 10,
  left: "50%",
  transform: "translateX(-50%)",
  color: "#FFFFFF",
  zIndex: 2,
  [theme.breakpoints.down("md")]: {
    fontSize: "14px",
    padding: "12px",
  },
}));

// Category Data Interface
export interface CategoryData {
  id: number | string;
  name: string;
  image: string;
  imageAlt?: string;
}

interface BestCategoriesProps {
  categories?: CategoryData[];
  title?: string;
  tagline?: string;
  studentsImage?: string;
  onCategoryClick?: (category: CategoryData) => void;
}

// Default Categories Data (for demo - will be replaced by backend data)
const defaultCategories: CategoryData[] = [
  {
    id: 1,
    name: "Notebooks",
    image: categoryImage1,
    imageAlt: "Notebooks",
  },
  {
    id: 2,
    name: "Pen, Pencils",
    image: categoryImage2,
    imageAlt: "Pen, Pencils ",
  },
  {
    id: 3,
    name: "Backpacks",
    image: "/api/placeholder/200/180",
    imageAlt: "Backpacks",
  },
  {
    id: 4,
    name: "Desk Accessories",
    image: "/api/placeholder/200/180",
    imageAlt: "Desk Accessories",
  },
  {
    id: 5,
    name: "Notebooks",
    image: categoryImage1,
    imageAlt: "Notebooks",
  },
  {
    id: 6,
    name: "Pen, Pencils",
    image: categoryImage2,
    imageAlt: "Pen, Pencils ",
  },
  {
    id: 7,
    name: "Backpacks",
    image: "/api/placeholder/200/180",
    imageAlt: "Backpacks",
  },
  {
    id: 8,
    name: "Desk Accessories",
    image: "/api/placeholder/200/180",
    imageAlt: "Desk Accessories",
  },
];

const BestCategories: React.FC<BestCategoriesProps> = ({
  categories = defaultCategories,
  title = "Study Essentials Hub",
  tagline = "Everything you need for school, organized in one place.",
  onCategoryClick,
}) => {
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

    // Use multiple attempts to ensure measurement happens
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
  }, [categories.length]);

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
        // Fallback: scroll by 1 if cardWidth not calculated yet
        setCurrentIndex(Math.max(0, currentIndex - 1));
      }
    }
  };

  const handleNext = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation();
    const maxIndex = Math.max(0, categories.length - cardsVisible);
    if (currentIndex < maxIndex) {
      if (cardWidth > 0) {
        const newIndex = Math.min(maxIndex, currentIndex + cardsVisible);
        setCurrentIndex(newIndex);
      } else {
        // Fallback: scroll by 1 if cardWidth not calculated yet
        setCurrentIndex(Math.min(categories.length - 1, currentIndex + 1));
      }
    }
  };

  const handleCategoryClick = (category: CategoryData) => {
    if (onCategoryClick) {
      onCategoryClick(category);
    }
  };

  const canGoPrev = currentIndex > 0 && cardWidth > 0;
  const maxIndex = Math.max(0, categories.length - cardsVisible);
  const canGoNext = currentIndex < maxIndex && cardWidth > 0;

  return (
    <StudyEssentialsContainer>
      <ContentWrapper>
        <Container maxWidth="xl">
          {/* Hero Section */}
          <HeroSection>
            <TitleSection sx={{
              display: "flex",
              flexDirection: "column",
              gap: "10px",
            }}>
              <Typography
                variant="sb40"
                sx={{
                  color: "#FFFFFF",
                }}
              >
                {title}
              </Typography>
              <Typography
                variant="r20"
                sx={{
                  color: "#E7EBF0",
                  // fontSize: { xs: "16px", md: "18px" },
                  opacity: 0.8,
                  // lineHeight: 1.6,
                }}
              >
                {tagline}
              </Typography>
            </TitleSection>
            <StudentsImage>
              <Box
                component="img"
                src={studentsImage}
                alt="Students with school supplies"
                sx={{
                  maxWidth: { xs: "100%", md: "500px" },
                  height: "auto",
                }}
              />
            </StudentsImage>
          </HeroSection>

          {/* Best Categories Section */}
          <Box sx={{
            marginTop: "-90px",
          }}>
            <CategoriesHeader>
              <Typography
                variant="sb24"
                sx={{
                  color: "#FFFFFF",
                  // fontWeight: 700,
                  // fontSize: { xs: "28px", md: "32px" },
                }}
              >
                Best Categories
              </Typography>
              <NavigationButtons>
                <NavButton
                  onClick={handlePrev}
                  disabled={!canGoPrev}
                  active={false}
                  aria-label="Previous categories"
                >
                  <WhiteLeftArrowIcon  />
                </NavButton>
                <NavButton
                  onClick={handleNext}
                  disabled={!canGoNext}
                  active={true}
                  aria-label="Next categories"
                >
                  <WhiteRightArrowIcon />
                </NavButton>
              </NavigationButtons>
            </CategoriesHeader>

            <CarouselContainer ref={carouselRef}>
              <CarouselTrack translateX={translateX}>
                {categories.map((category, index) => (
                  <CategoryCard
                    key={category.id}
                    ref={index === 0 ? cardRef : undefined}
                    onClick={() => handleCategoryClick(category)}
                  >
                    <CategoryImage
                      src={category.image}
                      alt={category.imageAlt || category.name}
                    />
                    <CategoryLabel variant="sb20">
                      {category.name}
                    </CategoryLabel>
                    <Box sx={{
                      position: "absolute",
                      top: 0,
                      background: "linear-gradient(180deg, rgba(0, 0, 0, 0) 64.92%, rgba(0, 0, 0, 0.7) 93.69%)",
                      width: "100%",
                      height: "100%",
                      zIndex: 1,
                    }}>
                    </Box>
                  </CategoryCard>
                ))}
              </CarouselTrack>
            </CarouselContainer>
          </Box>
        </Container>
      </ContentWrapper>
    </StudyEssentialsContainer>
  );
};

export default BestCategories;

