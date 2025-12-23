import React, { useState, useEffect } from "react";
import {
  Box,
  Button,
  Container,
  Stack,
  Typography,
  styled,
} from "@mui/material";
import banner1 from "../../assets/images/banner-slide.png";
import banner2 from "../../assets/images/banner-slide.png";
import banner3 from "../../assets/images/banner-slide.png";
import { WhatsappSmallIcon } from "../../components/icons/CommonIcons";
import FeaturesSection from "./FeaturesSection";
import { useNavigate } from "react-router-dom";


const HeroSection = styled(Box)({
  position: "relative",
  overflow: "hidden",
  backgroundColor: "#ffffff",
  minHeight: "500px",
  display: "flex",
  alignItems: "center",
});

const SlideContainer = styled(Box)<{ active: boolean; backgroundImage?: string }>(({ active, backgroundImage }) => ({
  position: "absolute",
  width: "100%",
  height: "100%",
  opacity: active ? 1 : 0,
  transition: "opacity 0.8s ease-in-out",
  display: "flex",
  alignItems: "center",
  backgroundImage: backgroundImage ? `url(${backgroundImage})` : "none",
  backgroundSize: "cover",
  backgroundPosition: "center",
  backgroundRepeat: "no-repeat",
}));

const DotIndicator = styled(Box)<{ active: boolean }>(({ active, theme }) => ({
  width: active ? 24 : 8,
  height: 8,
  borderRadius: "4px",
  backgroundColor: active ? theme.palette.primary.main : "#D1D4DE",
  transition: "all 0.3s ease",
  cursor: "pointer",
}));

// Slide data interface
interface SlideData {
  id: number;
  headline1: string;
  headline2: string;
  description: string;
  image: string;
  imageAlt: string;
}

// Default slides data
const defaultSlides: SlideData[] = [
  {
    id: 1,
    headline1: "Everything You Need for",
    headline2: "Academic Success",
    description: "From premium notebooks to tech accessories - get all your study essentials with exclusive student discounts",
    image: banner1, // Replace with actual image path
    imageAlt: "Student with books and backpack",
  },
  {
    id: 2,
    headline1: "Quality Education",
    headline2: "Supplies for Everyone",
    description: "Discover our wide range of educational products designed to support your learning journey",
    image: banner2, // Replace with actual image path
    imageAlt: "Educational supplies",
  },
  {
    id: 3,
    headline1: "Shop Smart",
    headline2: "Learn Better",
    description: "Find everything you need for school, college, and beyond at unbeatable prices",
    image: banner3, // Replace with actual image path
    imageAlt: "Learning materials",
  },
];

const Banner: React.FC<{ slides?: SlideData[] }> = ({ slides = defaultSlides }) => {
  const [currentSlide, setCurrentSlide] = useState(0);

  // Auto-slide functionality
  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000); // Change slide every 5 seconds

    return () => clearInterval(interval);
  }, [slides.length]);

  const handleDotClick = (index: number) => {
    setCurrentSlide(index);
  };

  const navigate = useNavigate()
  return (
    <Box>


      {/* Hero Section with Slider */}
      <HeroSection sx={{ height: "65vh", position: "relative" }}>
        <Box sx={{
          width: "100%",
          height: "100%",
        }}
        >
          {slides.map((slide, index) => (
            <SlideContainer
              key={slide.id}
              active={index === currentSlide}
              backgroundImage={slide.image}
            >
              <Container maxWidth="xl" sx={{ position: "relative", zIndex: 1, py: { xs: 4, md: 6 }, height: "100%" }}>
                <Box
                  sx={{
                    width: "100%",
                    maxWidth: { xs: "100%", md: "50%" },
                    textAlign: { xs: "center", md: "left" },
                    position: "relative",
                    zIndex: 2,
                    height: "100%",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    alignItems: "flex-start",
                  }}
                >
                  <Stack gap={"30px"}>
                    <Stack gap={"15px"}>
                      <Typography
                        sx={{
                          maxWidth: { xs: "100%", md: "100%" },
                        }}
                        variant="h1">
                        {slide.headline1}
                        <br />
                        <span style={{ fontWeight: "600" }}>
                          {slide.headline2}
                        </span>
                      </Typography>
                      <Typography
                        variant="m18" color="text.secondary" >
                        {slide.description}
                      </Typography>
                    </Stack>

                    {/* Buttons */}
                    <Stack
                      direction={{ xs: "column", sm: "row" }}
                      gap={"20px"}
                      sx={{
                        justifyContent: { xs: "center", md: "flex-start" },
                        alignItems: { xs: "stretch", sm: "center" },
                      }}
                    >
                      <Button
                        onClick={() => navigate('/categories')}
                        variant="contained">
                        Browse Categories
                      </Button>
                      <Button
                        variant="outlined"
                        startIcon={<WhatsappSmallIcon />}
                        sx={{
                          // fontWeight: 600,
                          textTransform: "none",
                          borderColor: "#29A232",
                          color: "#29A232",
                          whiteSpace: "nowrap",
                          "&:hover": {
                            borderColor: "#29A232",
                            backgroundColor: "rgba(37, 211, 102, 0.1)",
                          },
                          " .MuiButton-startIcon": {
                            marginRight: "5px !important",
                          },
                        }}
                      >
                        Order on Whatsapp
                      </Button>
                    </Stack>
                  </Stack>
                  <Stack
                    direction="row"
                    spacing={1}
                    justifyContent="center"
                    sx={{ mt: { xs: 4, md: 6 }, position: "absolute", bottom: "20px", left: "0%", zIndex: 2 }}
                  >
                    {slides.map((_, index) => (
                      <DotIndicator
                        key={index}
                        active={index === currentSlide}
                        onClick={() => handleDotClick(index)}
                      />
                    ))}
                  </Stack>
                </Box>
              </Container>
            </SlideContainer>
          ))}
        </Box>
      </HeroSection>
      <FeaturesSection />
    </Box>
  );
};

export default Banner;
