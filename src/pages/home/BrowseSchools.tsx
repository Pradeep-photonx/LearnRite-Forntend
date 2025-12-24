import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  IconButton,
  styled,
} from "@mui/material";
import { useTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";
import { useSchools } from "../../api/useSchools";
import DelhiPublic from '../../assets/images/delhi-public-school.png';
import SuchitraAcademy from '../../assets/images/suchitra-acadamy.png';
import { WhiteLeftArrowIcon, WhiteRightArrowIcon } from "../../components/icons/CommonIcons";


// Styled Components
const BrowseSchoolsContainer = styled(Box)(({ theme }) => ({
  padding: " 0px 0px 80px 0px",
  backgroundColor: "#FFFFFF",
  [theme.breakpoints.down("md")]: {
    padding: " 0px 0px 60px 0px",
  },
}));

const HeaderSection = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "20px",
});

const NavigationButtons = styled(Stack)({
  flexDirection: "row",
  gap: "8px",
});

const NavButton = styled(IconButton)<{ active?: boolean }>(({ active, theme }) => ({
  width: "44px",
  height: "44px",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  color: "#FFF",
  border: "none",
  opacity: 1,
  "&:hover": {
    backgroundColor: theme.palette.primary.main,
  },
  "&.Mui-disabled": {
    opacity: 0.2,
    cursor: "not-allowed",
    backgroundColor: theme.palette.primary.main,
  },
}));

const CarouselContainer = styled(Box)({
  position: "relative",
  // overflow: "hidden",
  width: "100%",
});

const CarouselTrack = styled(Box)<{ translateX: number }>(({ translateX }) => ({
  display: "flex",
  transition: "transform 0.5s ease-in-out",
  transform: `translateX(-${translateX}px)`,
  gap: "20px",
}));

const SchoolCard = styled(Box)(({ theme }) => ({
  minWidth: "350px",
  maxWidth: "350px",
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  padding: "24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  justifyContent: "space-between",
  border: "1px solid #F0F0F0",
  cursor: "pointer",
  boxShadow: "0px 0px 20px 0px #BFC2C833",
  transition: "all 0.3s ease",
  margin: "20px 0px",
  "&:hover": {
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
    transform: "translateY(-4px)",
  },
  [theme.breakpoints.down("md")]: {
    minWidth: "220px",
    maxWidth: "220px",
    padding: "20px",
  },
}));

const SchoolLogo = styled("img")({
  width: "120px",
  height: "120px",
  objectFit: "contain",
  marginBottom: "16px",
});

const SchoolName = styled(Typography)({
  textAlign: "center",
  marginBottom: "16px",
  flex: 1,
});

const CardArrow = styled(Box)(({ theme }) => ({
  width: "32px !important",
  height: "32px !important",
  borderRadius: "50%",
  backgroundColor: theme.palette.primary.main,
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  color: "#FFFFFF",
  marginLeft: "auto",
  cursor: "pointer",
  transition: "all 0.3s ease",
}));

// School Data Interface
export interface SchoolData {
  id: number | string;
  name: string;
  logo: string;
  logoAlt?: string;
  originalData?: any;
}

interface BrowseSchoolsProps {
  schools?: SchoolData[];
  title?: string;
  onSchoolClick?: (school: SchoolData) => void;
}

// Default Schools Data (fallback)
const defaultSchools: SchoolData[] = [
  // {
  //   id: 1,
  //   name: "Delhi Public School",
  //   logo: DelhiPublic,
  //   logoAlt: "Delhi Public School Logo",
  // },
  // {
  //   id: 2,
  //   name: "Suchitra Academy",
  //   logo: SuchitraAcademy,
  //   logoAlt: "Suchitra Academy Logo",
  // },
];

const BrowseSchools: React.FC<BrowseSchoolsProps> = ({
  schools: propSchools,
  title = "Browse Schools",
  onSchoolClick,
}) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const { schools: fetchedSchools, loading } = useSchools();

  const generateSlug = (name: string) => {
    return name
      .toLowerCase()
      .replace(/[^\w ]+/g, '')
      .replace(/ +/g, '-');
  };

  const schools = propSchools || (fetchedSchools.length > 0 ? fetchedSchools.map(s => ({
    id: s.school_id,
    name: s.name,
    logo: s.image,
    logoAlt: `${s.name} Logo`,
    originalData: s
  })) : defaultSchools);

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

    updateDimensions();
    const timer = setTimeout(updateDimensions, 100);

    window.addEventListener('resize', updateDimensions);
    return () => {
      clearTimeout(timer);
      window.removeEventListener('resize', updateDimensions);
    };
  }, [schools.length]);

  useEffect(() => {
    if (cardWidth > 0) {
      const newTranslateX = currentIndex * cardWidth;
      setTranslateX(newTranslateX);
    }
  }, [currentIndex, cardWidth]);

  const handlePrev = () => {
    if (cardWidth > 0 && currentIndex > 0) {
      const newIndex = Math.max(0, currentIndex - cardsVisible);
      setCurrentIndex(newIndex);
    }
  };

  const handleNext = () => {
    if (cardWidth > 0) {
      const maxIndex = Math.max(0, schools.length - cardsVisible);
      if (currentIndex < maxIndex) {
        const newIndex = Math.min(maxIndex, currentIndex + cardsVisible);
        setCurrentIndex(newIndex);
      }
    }
  };

  const handleCardClick = (school: SchoolData) => {
    if (onSchoolClick) {
      onSchoolClick(school);
    } else if (school.originalData) {
      navigate(`/schools/${generateSlug(school.name)}`, { state: { school: school.originalData } });
    }
  };

  const canGoPrev = currentIndex > 0 && cardWidth > 0;
  const maxIndex = Math.max(0, schools.length - cardsVisible);
  const canGoNext = currentIndex < maxIndex && cardWidth > 0;

  if (loading && !propSchools) {
    return null; // Or a skeleton
  }

  return (
    <BrowseSchoolsContainer sx={{ overflow: "hidden !important" }}>
      <Container maxWidth="xl">
        <HeaderSection>
          <Typography variant="sb40">{title}</Typography>
          <NavigationButtons>
            <NavButton onClick={handlePrev} disabled={!canGoPrev} aria-label="Previous schools">
              <WhiteLeftArrowIcon />
            </NavButton>
            <NavButton onClick={handleNext} disabled={!canGoNext} aria-label="Next schools">
              <WhiteRightArrowIcon />
            </NavButton>
          </NavigationButtons>
        </HeaderSection>

        <CarouselContainer ref={carouselRef}>
          <CarouselTrack translateX={translateX}>
            {schools.map((school, index) => (
              <SchoolCard
                key={school.id}
                ref={index === 0 ? cardRef : undefined}
                onClick={() => handleCardClick(school)}
                sx={{ position: "relative", }}
              >
                <Box sx={{ display: "flex", flexDirection: "column", alignItems: "start", width: "100%" }}>
                  <SchoolLogo
                    sx={{ width: "70px", height: "70px" }}
                    src={school.logo}
                    alt={school.logoAlt}
                    onError={(e) => {
                      (e.target as HTMLImageElement).src = DelhiPublic;
                    }}
                  />
                  <SchoolName
                    variant="sb16"
                    sx={{
                      color: theme.palette.text.primary,
                      fontSize: { xs: "14px", md: "16px" },
                      textAlign: "left"
                    }}
                  >
                    {school.name}
                  </SchoolName>
                </Box>
                <CardArrow sx={{ position: "absolute", right: "16px", top: "20px" }}>
                  <WhiteRightArrowIcon />
                </CardArrow>
              </SchoolCard>
            ))}
          </CarouselTrack>
        </CarouselContainer>
      </Container>
    </BrowseSchoolsContainer>
  );
};

export default BrowseSchools;
