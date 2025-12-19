import React from "react";
import {
  Box,
  Container,
  Grid,
  Stack,
  Typography,
  Link,
  IconButton,
  styled,
} from "@mui/material";
import { useNavigate } from "react-router-dom";
import LogoImg from "../../assets/images/white-logo.svg";
import { WhiteFacebookIcon, WhiteInstagramIcon, WhiteLinkedinIcon, WhiteYoutubeIcon } from "../../components/icons/CommonIcons";

// Styled Components
const FooterContainer = styled(Box)<{ paddingTop?: string }>(({ theme, paddingTop }) => ({
  backgroundColor: "#17181D",
  color: "#FFFFFF",
  padding: paddingTop ? `${paddingTop} 0 20px 0` : "80px 0 20px 0",
  position: "relative",
  zIndex: 1,
  [theme.breakpoints.down("md")]: {
    padding: paddingTop ? `${paddingTop} 0 30px 0` : "120px 0 30px 0",
  },
}));

const FooterSection = styled(Box)(({ theme }) => ({
  marginBottom: "40px",
  [theme.breakpoints.down("md")]: {
    marginBottom: "30px",
  },
}));

const FooterTitle = styled(Typography)({
  fontSize: "20px",
  fontWeight: 500,
  marginBottom: "20px",
  color: "#FFFFFF",
});

const FooterLink = styled(Link)(({ }) => ({
  color: "#FFFFFF",
  textDecoration: "none",
  fontWeight: 400,
  fontSize: "15px",
  display: "block",
  marginBottom: "12px",
  transition: "color 0.3s ease",
  "&:hover": {
    color: "#2C65F9",
  },
}));

const SocialIconButton = styled(IconButton)(({ }) => ({
  color: "#9CA3AF",
  borderRadius: "8px",
}));

const FooterBottom = styled(Box)(({ theme }) => ({
  paddingTop: "20px",
  display: "flex",
  justifyContent: "center",
  alignItems: "center",
  flexWrap: "wrap",
  gap: "20px",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    textAlign: "center",
    paddingTop: "30px",
  },
}));

const CopyrightText = styled(Typography)({
  color: "#FFFFFF",
  fontSize: "14px",
  fontWeight: 400,
});

interface FooterProps {
  logo?: string;
  companyName?: string;
  onLinkClick?: (path: string) => void;
  paddingTop?: string;
}

const Footer: React.FC<FooterProps> = ({
  logo = LogoImg,
  companyName = "LearnRite",
  onLinkClick,
  paddingTop,
}) => {
  const navigate = useNavigate();

  const handleLinkClick = (path: string) => {
    if (onLinkClick) {
      onLinkClick(path);
    } else {
      navigate(path);
    }
  };

  const Company = [
    { name: "About Us", path: "/about-us" },
    { name: "Contact", path: "/contact" },
    { name: "Careers", path: "/careers" },
  ];
  
  const Support = [
    { name: "FAQs", path: "/faqs" },
    { name: "Returns", path: "/returns" },
    { name: "Shipping Info", path: "/shipping" },
  ];

  const Legal = [
    { name: "Privacy Policy", path: "/privacy" },
    { name: "Terms & Conditions", path: "/terms" },
    { name: "Cookie Policy", path: "/cookie" },
  ];

  return (
    <FooterContainer paddingTop={paddingTop}>
      <Container maxWidth="xl">
        <Grid container spacing={{ xs: 4, md: 6 }}>
          {/* Logo and About Section */}
          <Grid size={{ xs: 12, md: 3.5 }}>
            <FooterSection sx={{ display: "flex", flexDirection: "column", justifyContent: "left", gap: "20px" }}>
              <Stack direction="column" gap="10px" alignItems="left" justifyContent="left" >
                <img src={logo} alt={`${companyName} Logo`} style={{ width: "210px" }} />
                <Typography
                  variant="r16"
                  sx={{
                    color: "#FFFFFF",
                  }}
                >
                  Making school shopping simple, one book at a time. Making school shopping simple, one book at a time.
                </Typography>
              </Stack>
              <Stack direction="row" spacing={1}>
                <SocialIconButton aria-label="Facebook">
                  <WhiteFacebookIcon />
                </SocialIconButton>
                <SocialIconButton aria-label="LinkedIn">
                  <WhiteLinkedinIcon />
                </SocialIconButton>
                <SocialIconButton aria-label="Instagram">
                  <WhiteInstagramIcon />
                </SocialIconButton>
                <SocialIconButton aria-label="Youtube">
                  <WhiteYoutubeIcon />
                </SocialIconButton>
              </Stack>
            </FooterSection>
          </Grid>

          {/* Quick Links */}
          <Grid size={{ xs: 6, md: 3 }}>
            <FooterSection>
              <FooterTitle>Company</FooterTitle>
              {Company.map((link) => (
                <FooterLink
                  key={link.name}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.path);
                  }}
                >
                  {link.name}
                </FooterLink>
              ))}
            </FooterSection>
          </Grid>

          {/* Customer Service */}
          <Grid size={{ xs: 6, md: 3 }}>
            <FooterSection>
              <FooterTitle>Support</FooterTitle>
              {Support.map((link) => (
                <FooterLink
                  key={link.name}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.path);
                  }}
                >
                  {link.name}
                </FooterLink>
              ))}
            </FooterSection>
          </Grid>

          {/* Legal */}
          <Grid size={{ xs: 6, md: 2.5 }}>
            <FooterSection>
              <FooterTitle>Legal</FooterTitle>
              {Legal.map((link) => (
                <FooterLink
                  key={link.name}
                  href="#"
                  onClick={(e) => {
                    e.preventDefault();
                    handleLinkClick(link.path);
                  }}
                >
                  {link.name}
                </FooterLink>
              ))}
            </FooterSection>
          </Grid>

        </Grid>

        {/* Footer Bottom */}
        <FooterBottom>
          <CopyrightText>
            Copyright © {new Date().getFullYear()} {companyName}. All Rights Reserved.
          </CopyrightText>
        </FooterBottom>
      </Container>
    </FooterContainer>
  );
};

export default Footer;

