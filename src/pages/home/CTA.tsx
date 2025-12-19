import React from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  styled,
  Stack,
} from "@mui/material";
import { ArrowForward } from "@mui/icons-material";
import cta_bg from '../../assets/images/cta-bg.png';
import { PrimaryFillArrowIcon } from "../../components/icons/CommonIcons";

// Styled Components
const PromotionalBannerContainer = styled(Box)(({ theme }) => ({
  padding: "0px 0px 80px 0",
  backgroundColor: "#FFFFFF",
  [theme.breakpoints.down("md")]: {
    padding: "60px 0",
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
  "& .MuiButton-endIcon": {
    marginLeft: "8px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "12px 24px",
    fontSize: "14px",
  },
}));

interface PromotionalBannerProps {
  headline?: string;
  subheadline?: string;
  buttonText?: string;
  onButtonClick?: () => void;
}

const PromotionalBanner: React.FC<PromotionalBannerProps> = ({
  headline = "Get All Your Student Essentials In One Click",
  subheadline = "From Books To Stationery, Find All Your School Essentials In One Simple Stop.",
  buttonText = "Start Shopping",
  onButtonClick,
}) => {
  const handleButtonClick = () => {
    if (onButtonClick) {
      onButtonClick();
    }
  };

  return (
    <PromotionalBannerContainer>
      <Container maxWidth="xl">
        <BannerWrapper>          

          {/* Main Content */}
          <ContentSection>
            <Stack direction="column" gap="05px">
            <Typography
              variant="sb50"
              sx={{
                color: "#FFFFFF",
                // fontWeight: 700,
                // fontSize: { xs: "28px", md: "36px", lg: "42px" },
                // lineHeight: 1.2,
                // marginBottom: "16px",
                maxWidth: "750px",
              }}
              >
              {headline}
            </Typography>
            <Typography
              variant="r20"
              sx={{
                color: "#FFFFFF",
                maxWidth: "750px",
              }}
            >
              {subheadline}
            </Typography>
            </Stack>
            <StartShoppingButton
              variant="outlined"
              startIcon={<PrimaryFillArrowIcon />}
              onClick={handleButtonClick}
              sx={{
                fontSize: "16px",
                fontWeight: 600,
                backgroundColor: "#FFFFFF",
                color: "#2C55C1",
                padding: "8px 12px 8px 12px",
              
              }}
            >
              {buttonText}
            </StartShoppingButton>
          </ContentSection>
        </BannerWrapper>
      </Container>
    </PromotionalBannerContainer>
  );
};

export default PromotionalBanner;

