import React from "react";
import { Box, Container, Grid, Stack, Typography, styled } from "@mui/material";
import image01 from '../../assets/images/image-01.png';
import image02 from '../../assets/images/image-02.png';
import image03 from '../../assets/images/image-03.png';

// Styled Components
const FeatureSectionContainer = styled(Box)(({ theme }) => ({
  padding: "120px 0",
  backgroundColor: "#FFFFFF",
//   [theme.breakpoints.down("md")]: {
//     padding: "40px 0",
//   },
}));

const FeatureCard = styled(Box)<{ bgColor: string }>(({ bgColor, theme }) => ({
  backgroundColor: bgColor,
  borderRadius: "20px",
  overflow: "hidden",
  display: "flex",
  flexDirection: "column",
  height: "100%",
  minHeight: "450px",
  position: "relative",
  [theme.breakpoints.down("md")]: {
    minHeight: "400px",
  },
}));

const CardContent = styled(Box)(({ theme }) => ({
  padding: "32px 0px 0px 0px",
  display: "flex",
  flexDirection: "column",
  justifyContent: "center",
  alignItems: "center",
  zIndex: 2,
  position: "relative",
  flex: "0 0 auto",
//   [theme.breakpoints.down("md")]: {
//     padding: "24px 24px 16px 24px",
//   },
}));

const CardImageContainer = styled(Box)({
  flex: 1,
  display: "flex",
  alignItems: "flex-end",
  justifyContent: "center",
  position: "relative",
  overflow: "hidden",
  minHeight: "220px",
  padding: "0 0px 0px 0px",
});

const CardImage = styled("img")({
    width: '100%',
    height: '315px',
    objectFit: 'contain',
});

// Feature Card Data Interface
interface FeatureCardData {
  id: number;
  title: string;
  subtitle: string;
  textColor: string;
  subtitleColor: string;
  image: string;
  imageAlt: string;
  backgroundColor: string;
}

// Default Feature Cards Data
const defaultFeatureCards: FeatureCardData[] = [
  {
    id: 1,
    title: "Pick Your School",
    subtitle: "Easy School Shopping",
    textColor: "#264139",
    subtitleColor: "#576762",
    image: image01, // Replace with actual image path
    imageAlt: "Girl with notebook and backpack",
    backgroundColor: "#E8F5E9", // Light mint green
  },
  {
    id: 2,
    title: "Books & More",
    subtitle: "Ready To Learn",
    textColor: "#765935",
    subtitleColor: "#77654E",
    image: image02, // Replace with actual image path
    imageAlt: "Boy holding colorful books",
    backgroundColor: "#FFF3E0", // Light peach/beige
  },
  {
    id: 3,
    title: "Stationery Hub",
    subtitle: "All Must-Haves", 
    textColor: "#824044",
    subtitleColor: "#A16C6F",
    image: image03, // Replace with actual image path
    imageAlt: "Colorful stationery items",
    backgroundColor: "#FCE4EC", // Light pink
  },
];

interface FeatureProps {
  featureCards?: FeatureCardData[];
}

const Feature: React.FC<FeatureProps> = ({ featureCards = defaultFeatureCards }) => {
  return (
    <FeatureSectionContainer>
      <Container maxWidth="lg">
        <Grid container spacing ={{ xs: 2, md: 3 }}>
          {featureCards.map((card) => (
            <Grid key={card.id} size={{ xs: 12, md: 4 }}>
              <FeatureCard bgColor={card.backgroundColor}>
                <CardContent>
                  <Stack spacing={1} alignItems={'center'}>
                    <Typography
                      variant="sb26"
                      color={card.textColor}
                       >
                      {card.title}
                    </Typography>
                    <Typography
                      variant="m16"
                      color={card.subtitleColor}
                    >
                      {card.subtitle}
                    </Typography>
                  </Stack>
                </CardContent>
                <CardImageContainer>
                  <CardImage src={card.image} alt={card.imageAlt} />
                </CardImageContainer>
              </FeatureCard>
            </Grid>
          ))}
        </Grid>
      </Container>
    </FeatureSectionContainer>
  );
};

export default Feature;

