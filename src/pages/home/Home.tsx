import React from "react";
import { Box, Container, Typography, Button, styled, Stack } from "@mui/material";
import Banner from "./Banner";
import Feature from "./Feature";
import BrowseSchools from "./BrowseSchools";
import BestCategories from "./BestCategories";
import ProductCollections from "./ProductCollections";
import PromotionalSections from "./PromotionalSections";
import InstagramFollow from "./InstagramFollow";
import NewsletterSubscription from "./NewsletterSubscription";
import cta_bg from '../../assets/images/cta-bg.png';
import { PrimaryFillArrowIcon } from "../../components/icons/CommonIcons";
import MostRecommendedStrip from "../../layouts/MostRecommendedStrip";

// CTA Styled Components
const PromotionalBannerContainer = styled(Box)(({ theme }) => ({
  padding: "0px 0px 0px 0",
  backgroundColor: "transparent",
  marginBottom: "-100px",
  position: "relative",
  zIndex: 2,
  [theme.breakpoints.down("md")]: {
    marginBottom: "-40px",
  },
}));

const BannerWrapper = styled(Box)(({ theme }) => ({
  background: `url(${cta_bg}) no-repeat center center`,
  backgroundSize: "cover",
  borderRadius: "20px",
  padding: "80px 60px",
  position: "relative",
  overflow: "hidden",
  textAlign: "center",
  [theme.breakpoints.down("md")]: {
    padding: "60px 40px",
  },
  [theme.breakpoints.down("sm")]: {
    padding: "40px 24px",
  },
}));

const ContentSection = styled(Box)({
  position: "relative",
  zIndex: 2,
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  gap: "24px",
});

const StartShoppingButton = styled(Button)(({ theme }) => ({
  padding: "14px 32px",
  borderRadius: "50px",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 600,
  backgroundColor: "#FFFFFF",
  color: "#2C65F9",
  border: "2px solid #2C65F9",
  "&:hover": {
    backgroundColor: "#F5F7FA",
    borderColor: "#2C65F9",
  },
  "& .MuiButton-startIcon": {
    marginRight: "8px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "12px 24px",
    fontSize: "14px",
  },
}));


const Home: React.FC = () => {

  // CTA Handler
  const handleCTAButtonClick = () => {
    // Handle CTA button click
  };

  return (
    <>
      <Box sx={{
        backgroundColor: "#FFF !important"
      }}>
        <MostRecommendedStrip />
        <Banner />
        <Feature />
        <BrowseSchools />
        <BestCategories />
        <ProductCollections />
        <PromotionalSections />
        <InstagramFollow />
        {/* <NewsletterSubscription /> */}

        {/* CTA Section - Inline */}
        <PromotionalBannerContainer sx={{}}>
          <Container maxWidth="xl">
            <BannerWrapper>
              <ContentSection>
                <Stack direction="column" gap="05px">
                  <Typography
                    variant="sb50"
                    sx={{
                      color: "#FFFFFF",
                      maxWidth: "750px",
                    }}
                  >
                    Get All Your Student Essentials In One Click
                  </Typography>
                  <Typography
                    variant="r20"
                    sx={{
                      color: "#FFFFFF",
                      maxWidth: "750px",
                    }}
                  >
                    "From Books To Stationery, Find All Your School Essentials In One Simple Stop."
                  </Typography>
                </Stack>
                <StartShoppingButton
                  variant="outlined"
                  startIcon={<PrimaryFillArrowIcon />}
                  onClick={handleCTAButtonClick}
                  sx={{
                    fontSize: "16px",
                    fontWeight: 600,
                    backgroundColor: "#FFFFFF",
                    color: "#2C55C1",
                    padding: "8px 12px 8px 12px",
                  }}
                >
                  Start Shopping
                </StartShoppingButton>
              </ContentSection>
            </BannerWrapper>
          </Container>
        </PromotionalBannerContainer>

      </Box>
    </>
  );
};

export default Home;
