import React from "react";
import { Box, Container, Grid, Stack, Typography, styled } from "@mui/material";

// Icon Components
const SecureShippingIcon = () => (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M29.3334 5.5H1.83337V29.3333H29.3334V5.5Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M29.3334 14.6667H36.6667L42.1667 20.1667V29.3334H29.3334V14.6667Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M10.0833 38.5C12.6146 38.5 14.6667 36.448 14.6667 33.9166C14.6667 31.3853 12.6146 29.3333 10.0833 29.3333C7.55203 29.3333 5.5 31.3853 5.5 33.9166C5.5 36.448 7.55203 38.5 10.0833 38.5Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M33.9167 38.5C36.448 38.5 38.5 36.448 38.5 33.9166C38.5 31.3853 36.448 29.3333 33.9167 29.3333C31.3854 29.3333 29.3334 31.3853 29.3334 33.9166C29.3334 36.448 31.3854 38.5 33.9167 38.5Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
);

const QuickPaymentIcon = () => (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M38.5 7.33331H5.49998C3.47494 7.33331 1.83331 8.97494 1.83331 11V33C1.83331 35.025 3.47494 36.6666 5.49998 36.6666H38.5C40.525 36.6666 42.1666 35.025 42.1666 33V11C42.1666 8.97494 40.525 7.33331 38.5 7.33331Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M1.83331 18.3333H42.1666" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
);

const ExtensiveCollectionIcon = () => (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M36.6667 22V40.3333H7.33334V22" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M40.3333 12.8333H3.66666V22H40.3333V12.8333Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 40.3333V12.8333" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 12.8334H13.75C12.5344 12.8334 11.3686 12.3505 10.5091 11.4909C9.64954 10.6314 9.16666 9.4656 9.16666 8.25002C9.16666 7.03444 9.64954 5.86866 10.5091 5.00911C11.3686 4.14957 12.5344 3.66669 13.75 3.66669C20.1667 3.66669 22 12.8334 22 12.8334Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M22 12.8334H30.25C31.4656 12.8334 32.6314 12.3505 33.4909 11.4909C34.3504 10.6314 34.8333 9.4656 34.8333 8.25002C34.8333 7.03444 34.3504 5.86866 33.4909 5.00911C32.6314 4.14957 31.4656 3.66669 30.25 3.66669C23.8333 3.66669 22 12.8334 22 12.8334Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
);

const SupportIcon = () => (
    <svg width="44" height="44" viewBox="0 0 44 44" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M31.1667 38.5V34.8333C31.1667 32.8884 30.3941 31.0232 29.0188 29.6479C27.6435 28.2726 25.7783 27.5 23.8333 27.5H9.16667C7.22175 27.5 5.35649 28.2726 3.98122 29.6479C2.60595 31.0232 1.83334 32.8884 1.83334 34.8333V38.5" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M16.5 20.1667C20.5501 20.1667 23.8333 16.8834 23.8333 12.8333C23.8333 8.78325 20.5501 5.5 16.5 5.5C12.4499 5.5 9.16666 8.78325 9.16666 12.8333C9.16666 16.8834 12.4499 20.1667 16.5 20.1667Z" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M42.1667 38.5V34.8333C42.1655 33.2085 41.6247 31.6301 40.6292 30.3459C39.6337 29.0617 38.2399 28.1446 36.6667 27.7383" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    <path d="M29.3333 5.73834C30.9108 6.14223 32.3089 7.05963 33.3073 8.34591C34.3058 9.63219 34.8477 11.2142 34.8477 12.8425C34.8477 14.4708 34.3058 16.0528 33.3073 17.3391C32.3089 18.6254 30.9108 19.5428 29.3333 19.9467" stroke="white" stroke-width="3" stroke-linecap="round" stroke-linejoin="round"/>
    </svg>
    
);

// Styled Components
const FeaturesContainer = styled(Box)(({ theme }) => ({
  background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
  padding: "0px 0",
  [theme.breakpoints.up("md")]: {
    padding: "50px 0",
  },
}));

const FeatureCard = styled(Box)(({ theme }) => ({
  display: "flex",
  alignItems: "flex-start",
  justifyContent: "flex-start",
  gap: "20px",
}));

// Feature Data Interface
interface FeatureData {
  id: number;
  icon: React.ReactNode;
  title: string;
  subtitle: string;
}

// Default Features Data
const defaultFeatures: FeatureData[] = [
  {
    id: 1,
    icon: <SecureShippingIcon />,
    title: "Secure Shipping",
    subtitle: "Packed carefully",
  },
  {
    id: 2,
    icon: <QuickPaymentIcon />,
    title: "Quick Payment",
    subtitle: "100% Secure",
  },
  {
    id: 3,
    icon: <ExtensiveCollectionIcon />,
    title: "Extensive Collection",
    subtitle: "Discover thousand of books",
  },
  {
    id: 4,
    icon: <SupportIcon />,
    title: "24/7 Support",
    subtitle: "Ready for You",
  },
];

interface FeaturesSectionProps {
  features?: FeatureData[];
}

const FeaturesSection: React.FC<FeaturesSectionProps> = ({ features = defaultFeatures }) => {
  return (
    <FeaturesContainer>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 2, md: 3 }}>
          {features.map((feature) => (
            <Grid key={feature.id} size={{ xs: 12, sm: 6, md: 3 }}>
              <FeatureCard>
                <Box sx={{ display: "flex", alignItems: "center", mb: 1 }}>
                  {feature.icon}
                </Box>
                <Stack gap={'05px'}>
                <Typography
                  variant="b20"
                  sx={{
                      color: "#FFFFFF",
                }}
                >
                  {feature.title}
                </Typography>
                <Typography
                  variant="m16"
                  sx={{
                      color: "#C4D5EF",
                    }}
                    >
                  {feature.subtitle}
                </Typography>
                </Stack>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </FeaturesContainer>
  );
};

export default FeaturesSection;

