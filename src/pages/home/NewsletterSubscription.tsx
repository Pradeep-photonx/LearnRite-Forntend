import React, { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  TextField,
  Button,
  styled,
} from "@mui/material";
import newsletter_image from '../../assets/images/letter-new-img.png';

// Styled Components
const NewsletterContainer = styled(Box)(({ theme }) => ({
  padding: "0px 0px 80px 0",
  backgroundColor: "#FFFFFF",
  [theme.breakpoints.down("md")]: {
    padding: "60px 0",
  },
}));

const NewsletterWrapper = styled(Box)(({ theme }) => ({
  backgroundColor: "#F4F9FF",
  borderRadius: "20px",
  padding: "120px 40px",
  display: "flex",
  gap: "60px",
  border: "1px solid #B3D2F8",
  alignItems: "flex-start",
  position: "relative",
  overflow: "hidden",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    padding: "40px 24px",
    gap: "40px",
  },
}));

const LeftSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "10px",
  position: "relative",
  zIndex: 2,
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const NotebooksContainer = styled(Box)({
  position: "absolute",
  bottom: "-20px",
  left: "-10px",
  display: "flex",
  gap: "10px",
  zIndex: 1,
  transform: "rotate(-5deg)",
});

const NotebookImage = styled("img")({
  width: "120px",
  height: "auto",
  objectFit: "contain",
  filter: "drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))",
});

const RightSection = styled(Box)(({ theme }) => ({
  flex: 1,
  display: "flex",
  flexDirection: "column",
  gap: "24px",
  [theme.breakpoints.down("md")]: {
    width: "100%",
  },
}));

const FormField = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const InputLabel = styled(Typography)({
  fontSize: "14px",
  fontWeight: 600,
  color: "#121318",
  marginBottom: "4px",
});

const StyledTextField = styled(TextField)(({ theme }) => ({
  "& .MuiOutlinedInput-root": {
    backgroundColor: "#FFFFFF",
    borderRadius: "10px",
    "& fieldset": {
      borderColor: "#E5E7EB",
    },
    "&:hover fieldset": {
      borderColor: "#D1D5DB",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2C65F9",
    },
  },
  "& .MuiInputBase-input": {
    padding: "12px 16px",
    fontSize: "14px",
  },
}));

const SubscribeButton = styled(Button)(({ theme }) => ({
  padding: "14px 32px",
  borderRadius: "10px",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 600,
  background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
  color: "#FFFFFF",
  "&:hover": {
    background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
    opacity: 0.9,
  },
  [theme.breakpoints.down("md")]: {
    padding: "12px 24px",
    fontSize: "14px",
  },
}));

interface NewsletterSubscriptionProps {
  title?: string;
  subtitle?: string;
  notebookImages?: string[];
  onSubmit?: (data: { name: string; email: string }) => void;
}

const NewsletterSubscription: React.FC<NewsletterSubscriptionProps> = ({
  title = "Get updates straight to your inbox",
  subtitle = "Be the first to know about new arrivals, offers, and school essentials.",
  notebookImages = [],
  onSubmit,
}) => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [errors, setErrors] = useState<{ name?: string; email?: string }>({});

  const validateEmail = (email: string) => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    return emailRegex.test(email);
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    const newErrors: { name?: string; email?: string } = {};
    
    if (!name.trim()) {
      newErrors.name = "Name is required";
    }
    
    if (!email.trim()) {
      newErrors.email = "Email is required";
    } else if (!validateEmail(email)) {
      newErrors.email = "Please enter a valid email address";
    }
    
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    
    setErrors({});
    if (onSubmit) {
      onSubmit({ name, email });
    }
    
    // Reset form
    setName("");
    setEmail("");
  };

  return (
    <NewsletterContainer>
      <Container maxWidth="xl">
        <NewsletterWrapper sx={{
          position: "relative",
        }}>
          {/* Left Section */}
          <LeftSection>
            <Typography
              variant="sb50"
              sx={{
                // color: "#121318",
                // fontWeight: 700,
                // fontSize: { xs: "28px", md: "32px", lg: "36px" },
                // lineHeight: 1.3,
                // marginBottom: "12px",
                maxWidth: "500px",
            }}
            >
              {title}
            </Typography>
            <Typography
              variant="r20"
              color="text.secondary"
              sx={{
                  maxWidth: "500px",
                // color: "#445061",
                // fontSize: { xs: "14px", md: "16px" },
                // lineHeight: 1.6,
                // marginBottom: "20px",
              }}
            >
              {subtitle}
            </Typography>
            {notebookImages.length > 0 && (
              <NotebooksContainer>
                {notebookImages.slice(0, 2).map((image, index) => (
                  <NotebookImage
                    key={index}
                    src={image}
                    alt={`Notebook ${index + 1}`}
                  />
                ))}
              </NotebooksContainer>
            )}
          </LeftSection>

          {/* Right Section - Form */}
          <RightSection>
            <Box
              component="form"
              onSubmit={handleSubmit}
              sx={{
                display: "flex",
                flexDirection: "column",
                gap: "20px",
              }}
            >
              <FormField>
                <InputLabel>Enter Name*</InputLabel>
                <StyledTextField
                  placeholder="Enter your full name"
                  value={name}
                  onChange={(e) => {
                    setName(e.target.value);
                    if (errors.name) {
                      setErrors({ ...errors, name: undefined });
                    }
                  }}
                  error={!!errors.name}
                  helperText={errors.name}
                  fullWidth
                />
              </FormField>

              <FormField>
                <InputLabel>Email ID*</InputLabel>
                <StyledTextField
                  type="email"
                  placeholder="Enter your email id"
                  value={email}
                  onChange={(e) => {
                    setEmail(e.target.value);
                    if (errors.email) {
                      setErrors({ ...errors, email: undefined });
                    }
                  }}
                  error={!!errors.email}
                  helperText={errors.email}
                  fullWidth
                />
              </FormField>

              <SubscribeButton type="submit" variant="contained" fullWidth
              sx={{
                fontWeight: 500,
              }}
              >
                Subscribe
              </SubscribeButton>
            </Box>
          </RightSection>
            <Box sx={{
                position: "absolute",
                bottom: "-6px",
                left: "0px",
            }}>
                <img src={newsletter_image} alt="Newsletter" style={{
                width: "540px",
                }} />
            </Box>
        </NewsletterWrapper>
      </Container>
    </NewsletterContainer>
  );
};

export default NewsletterSubscription;

