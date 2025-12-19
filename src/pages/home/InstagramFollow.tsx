import React, { useRef, useState, useEffect } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  styled,
} from "@mui/material";
import { Favorite } from "@mui/icons-material";
import instagram_image1 from '../../assets/images/instgram-01.png';
import instagram_image2 from '../../assets/images/instgram-02.png';
import instagram_image3 from '../../assets/images/instgram-03.png';
import instagram_image4 from '../../assets/images/instgram-01.png';
import instagram_image5 from '../../assets/images/instgram-02.png';
import { FollowUsIcon } from "../../components/icons/CommonIcons";

// Styled Components
const InstagramFollowContainer = styled(Box)(({ theme }) => ({
  padding: "0px 0 80px 0px",
  backgroundColor: "#FFFFFF",
  [theme.breakpoints.down("md")]: {
    padding: "60px 0",
  },
}));

const HeaderSection = styled(Box)({
  textAlign: "center",
  marginBottom: "48px",
});

const CarouselContainer = styled(Box)({
  position: "relative",
  overflow: "hidden",
  width: "100%",
  marginBottom: "40px",
});

const CarouselTrack = styled(Box)<{ translateX: number }>(({ translateX }) => ({
  display: "flex",
  transition: "transform 0.6s ease-in-out",
  transform: `translateX(-${translateX}px)`,
  gap: "20px",
}));

const GalleryImage = styled(Box)<{ isEven?: boolean }>(({ isEven, theme }) => ({
  position: "relative",
  minWidth: "350px",
  maxWidth: "350px",
  height: "420px",
  overflow: "hidden",
  cursor: "pointer",
  transition: "all 0.3s ease",
  flexShrink: 0,
  marginTop: isEven ? "12px" : "0px",
  "&:hover": {
    transform: "translateY(-4px)",
    boxShadow: "0px 8px 16px rgba(0, 0, 0, 0.15)",
    "& .hover-overlay": {
      opacity: 1,
    },
    "& .instagram-overlay": {
      opacity: 1,
    },
  },
  [theme.breakpoints.down("md")]: {
    minWidth: "240px",
    maxWidth: "240px",
    height: "240px",
  },
  [theme.breakpoints.down("sm")]: {
    minWidth: "200px",
    maxWidth: "200px",
    height: "200px",
  },
}));

const Image = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const InstagramOverlay = styled(Box)({
  position: "absolute",
  top: "50%",
  left: "50%",
  transform: "translate(-50%, -50%)",
  width: "60px",
  height: "60px",
  display: "flex",
  alignItems: "center",
  justifyContent: "center",
  zIndex: 2,
  opacity: 0,
  transition: "opacity 0.3s ease",
  pointerEvents: "none",
  "& svg": {
    width: "100%",
    height: "100%",
    color: "#FFFFFF",
    filter: "drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3))",
  },
});

const HoverOverlay = styled(Box)({
  position: "absolute",
  top: 0,
  left: 0,
  right: 0,
  bottom: 0,
  backgroundColor: "rgba(0, 0, 0, 0.4)",
  opacity: 0,
  transition: "opacity 0.3s ease",
  pointerEvents: "none",
  zIndex: 1,
});

const FollowButton = styled(Button)(({ theme }) => ({
  padding: "12px 32px",
  borderRadius: "50px",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 600,
  border: "1px solid #2C65F9",
  color: "#2C65F9",
  backgroundColor: "#FFFFFF",
  "&:hover": {
    backgroundColor: "#F5F7FA",
    borderColor: "#2C65F9",
  },
  "& .MuiButton-endIcon": {
    marginLeft: "8px",
  },
  [theme.breakpoints.down("md")]: {
    padding: "10px 24px",
    fontSize: "14px",
  },
}));

// Instagram Image Data Interface
export interface InstagramImageData {
  id: number | string;
  image: string;
  imageAlt?: string;
  instagramUrl?: string; // URL to the Instagram post
  postId?: string; // Instagram post ID
}

interface InstagramFollowProps {
  title?: string;
  images?: InstagramImageData[];
  buttonText?: string;
  onImageClick?: (image: InstagramImageData) => void;
  onFollowClick?: () => void;
}

// Default Instagram Images Data
const defaultImages: InstagramImageData[] = [
  {
    id: 1,
    image: instagram_image1,
    imageAlt: "Bookstore interior",
    instagramUrl: "https://instagram.com/p/example1",
  },
  {
    id: 2,
    image: instagram_image2,
    imageAlt: "Person reading a book",
    instagramUrl: "https://instagram.com/p/example2",
  },
  {
    id: 3,
    image: instagram_image3,
    imageAlt: "Bookstore with Instagram overlay",
    instagramUrl: "https://instagram.com/p/example3",
  },
  {
    id: 4,
    image: instagram_image4,
    imageAlt: "Hand reaching for a book",
    instagramUrl: "https://instagram.com/p/example4",
  },
  {
    id: 5,
    image: instagram_image5,
    imageAlt: "Bookstore scene",
    instagramUrl: "https://instagram.com/p/example5",
  },
  {
    id: 6,
    image: instagram_image5,
    imageAlt: "Bookstore scene",
    instagramUrl: "https://instagram.com/p/example5",
  },
  {
    id: 7,
    image: instagram_image5,
    imageAlt: "Bookstore scene",
    instagramUrl: "https://instagram.com/p/example5",
  },
  {
    id: 8,
    image: instagram_image5,
    imageAlt: "Bookstore scene",
    instagramUrl: "https://instagram.com/p/example5",
  },
  {
    id: 9,
    image: instagram_image5,
    imageAlt: "Bookstore scene",
    instagramUrl: "https://instagram.com/p/example5",
  },
  {
    id: 10,
    image: instagram_image5,
    imageAlt: "Bookstore scene",
    instagramUrl: "https://instagram.com/p/example5",
  },
];

const InstagramFollow: React.FC<InstagramFollowProps> = ({
  title = "Follow Us On Instagram",
  images = defaultImages,
  buttonText = "Follow Us",
  onImageClick,
  onFollowClick,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [translateX, setTranslateX] = useState(0);
  const carouselRef = useRef<HTMLDivElement>(null);
  const cardRef = useRef<HTMLDivElement>(null);
  const [cardWidth, setCardWidth] = useState(0);
  const [cardsVisible, setCardsVisible] = useState(1);
  const autoPlayIntervalRef = useRef<number | null>(null);

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
  }, [images.length]);

  // Update translateX when currentIndex or cardWidth changes
  useEffect(() => {
    if (cardWidth > 0 && carouselRef.current) {
      const newTranslateX = currentIndex * cardWidth;
      setTranslateX(newTranslateX);
    }
  }, [currentIndex, cardWidth]);

  // Auto-play functionality with continuous loop
  useEffect(() => {
    if (images.length <= cardsVisible) return; // Don't auto-play if all images are visible

    const autoPlay = () => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, images.length - cardsVisible);
        if (prevIndex >= maxIndex) {
          return 0; // Loop back to start
        }
        return prevIndex + 1;
      });
    };

    autoPlayIntervalRef.current = window.setInterval(autoPlay, 3000); // Change slide every 3 seconds

    return () => {
      if (autoPlayIntervalRef.current) {
        window.clearInterval(autoPlayIntervalRef.current);
      }
    };
  }, [images.length, cardsVisible]);

  const handleImageClick = (image: InstagramImageData) => {
    if (image.instagramUrl) {
      window.open(image.instagramUrl, "_blank");
    }
    if (onImageClick) {
      onImageClick(image);
    }
  };

  const handleFollowClick = () => {
    if (onFollowClick) {
      onFollowClick();
    }
  };

  // Pause auto-play on hover
  const handleMouseEnter = () => {
    if (autoPlayIntervalRef.current) {
      window.clearInterval(autoPlayIntervalRef.current);
    }
  };

  // Resume auto-play on mouse leave
  const handleMouseLeave = () => {
    if (images.length <= cardsVisible) return;
    autoPlayIntervalRef.current = window.setInterval(() => {
      setCurrentIndex((prevIndex) => {
        const maxIndex = Math.max(0, images.length - cardsVisible);
        if (prevIndex >= maxIndex) {
          return 0; // Loop back to start
        }
        return prevIndex + 1;
      });
    }, 3000);
  };

  return (
    <InstagramFollowContainer>
      <Container maxWidth="xl">
        {/* Header Section */}
        <HeaderSection>
          <Typography variant="sb40">
            {title}
          </Typography>
        </HeaderSection>
        </Container>

        {/* Auto-playing Image Carousel */}
        <CarouselContainer
          ref={carouselRef}
          onMouseEnter={handleMouseEnter}
          onMouseLeave={handleMouseLeave}
        >
          <CarouselTrack translateX={translateX}>
            {images.map((image, index) => (
              <GalleryImage
                key={image.id}
                ref={index === 0 ? cardRef : undefined}
                isEven={(index + 1) % 2 === 0}
                onClick={() => handleImageClick(image)}
              >
                <Image
                  src={image.image}
                  alt={image.imageAlt || `Instagram post ${image.id}`}
                />
                <HoverOverlay className="hover-overlay" />
                <InstagramOverlay className="instagram-overlay">
                <svg width="54" height="54" viewBox="0 0 54 54" fill="none" xmlns="http://www.w3.org/2000/svg">
                  <g clip-path="url(#clip0_984_6)">
                  <path d="M27 32.5371C30.0581 32.5371 32.5371 30.0581 32.5371 27C32.5371 23.9419 30.0581 21.4629 27 21.4629C23.9419 21.4629 21.4629 23.9419 21.4629 27C21.4629 30.0581 23.9419 32.5371 27 32.5371Z" fill="white"/>
                  <path d="M27 0.632812C12.4378 0.632812 0.632812 12.4378 0.632812 27C0.632812 41.5622 12.4378 53.3672 27 53.3672C41.5622 53.3672 53.3672 41.5622 53.3672 27C53.3672 12.4378 41.5622 0.632812 27 0.632812ZM43.2905 33.7015C43.1639 36.2083 42.4595 38.6802 40.6327 40.4877C38.7881 42.3123 36.3045 42.9921 33.7735 43.1174H20.2266C17.6953 42.9921 15.212 42.3127 13.3674 40.4877C11.5405 38.6802 10.8362 36.2083 10.7096 33.7015V20.2985C10.8362 17.7917 11.5406 15.3198 13.3674 13.5122C15.212 11.6876 17.6957 11.0078 20.2266 10.8826H33.7734C36.3047 11.0078 38.788 11.6873 40.6326 13.5122C42.4595 15.3198 43.1638 17.7917 43.2904 20.2985L43.2905 33.7015Z" fill="white"/>
                  <path d="M33.6025 13.9365C30.3028 13.846 23.6984 13.846 20.3987 13.9365C18.6815 13.9837 16.7349 14.4111 15.5115 15.7179C14.2401 17.0762 13.7597 18.7173 13.711 20.5532C13.6254 23.7755 13.711 33.447 13.711 33.447C13.7668 35.2827 14.2401 36.924 15.5115 38.2823C16.7349 39.5895 18.6815 40.0165 20.3987 40.0637C23.6984 40.1542 30.3028 40.1542 33.6025 40.0637C35.3197 40.0165 37.2663 39.589 38.4897 38.2823C39.761 36.924 40.2415 35.2829 40.2902 33.447V20.5532C40.2415 18.7173 39.761 17.0762 38.4897 15.7179C37.2659 14.4107 35.3192 13.9837 33.6025 13.9365ZM27.0002 35.5826C25.3027 35.5826 23.6434 35.0793 22.232 34.1362C20.8206 33.1931 19.7206 31.8527 19.071 30.2845C18.4214 28.7162 18.2514 26.9906 18.5826 25.3257C18.9137 23.6609 19.7311 22.1316 20.9314 20.9313C22.1317 19.731 23.661 18.9136 25.3258 18.5825C26.9907 18.2513 28.7163 18.4213 30.2846 19.0709C31.8528 19.7205 33.1932 20.8205 34.1363 22.2319C35.0793 23.6433 35.5827 25.3026 35.5827 27.0001C35.5827 29.2763 34.6785 31.4593 33.0689 33.0688C31.4594 34.6784 29.2764 35.5826 27.0002 35.5826ZM35.6192 20.1891C35.2797 20.189 34.9479 20.0883 34.6657 19.8996C34.3834 19.711 34.1635 19.4429 34.0336 19.1292C33.9038 18.8156 33.8699 18.4704 33.9361 18.1375C34.0024 17.8046 34.1659 17.4987 34.406 17.2587C34.6461 17.0187 34.9519 16.8553 35.2849 16.7891C35.6178 16.7229 35.963 16.7569 36.2766 16.8868C36.5902 17.0168 36.8583 17.2368 37.0469 17.519C37.2354 17.8013 37.3361 18.1332 37.3361 18.4726C37.3361 18.6981 37.2917 18.9213 37.2054 19.1296C37.1191 19.3379 36.9926 19.5271 36.8332 19.6865C36.6738 19.8459 36.4845 19.9724 36.2762 20.0586C36.0679 20.1448 35.8446 20.1892 35.6192 20.1891Z" fill="white"/>
                  </g>
                  <defs>
                  <clipPath id="clip0_984_6">
                  <rect width="54" height="54" fill="white"/>
                  </clipPath>
                  </defs>
                  </svg>
                </InstagramOverlay>
              </GalleryImage>
            ))}
          </CarouselTrack>
        </CarouselContainer>

        {/* Follow Button */}
        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            alignItems: "center",
          }}
        >
          <FollowButton
            variant="outlined"
            endIcon={<FollowUsIcon />}
            onClick={handleFollowClick}
            sx={{
              padding:"15px 16px",
            }}
          >
            {buttonText}
          </FollowButton>
        </Box>
    </InstagramFollowContainer>
  );
};

export default InstagramFollow;

