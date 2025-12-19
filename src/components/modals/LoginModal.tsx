import React, { useState } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  IconButton,
  Button,
  Box,
  Typography,
  TextField,
  Link,
  styled,
} from "@mui/material";
import LoginBannerImage from "../../assets/images/login-bg.png";
import { CloseIcon } from "../icons/CommonIcons";

// Styled Components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    maxWidth: "500px",
    width: "100%",
    margin: "20px",
    padding: "20px",
    overflow: "hidden",
    [theme.breakpoints.down("sm")]: {
      margin: "10px",
      maxWidth: "calc(100% - 20px)",
    },
  },
  "& .MuiBackdrop-root": {
    backgroundColor: "rgba(0, 0, 0, 0.5)",
    backdropFilter: "blur(4px)",
  },
}));

const StyledDialogTitle = styled(DialogTitle)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "0 0px 10px 0px",
  borderBottom: "1px solid #E5E7EB",
  marginBottom: "10px",
  "& .MuiTypography-root": {
    fontSize: "20px",
    fontWeight: 600,
    color: "#121318",
    fontFamily: "Figtree, sans-serif",
  },
});



const StyledDialogContent = styled(DialogContent)({
  padding: "0px !important",
  overflow: "visible",
});


const FormContainer = styled(Box)({
  padding: "20px 0px 0px 0px",
  display: "flex",
  flexDirection: "column",
  gap: "20px",
});

const FormField = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "8px",
});

const FormLabel = styled(Typography)({
  fontSize: "16px",
  fontWeight: 500,
  color: "#121318",
  fontFamily: "Figtree, sans-serif",
});

const StyledTextField = styled(TextField)({
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    fontSize: "16px",
    fontFamily: "Figtree, sans-serif",
    backgroundColor: "#FFFFFF",
    "& fieldset": {
      borderColor: "#202228",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#9CA3AF",
    opacity: 1,
  },
});

const ForgotPasswordLink = styled(Link)({
  fontSize: "14px",
  fontWeight: 400,
  color: "#2C65F9",
  fontFamily: "Figtree, sans-serif",
  textDecoration: "none",
  cursor: "pointer",
  alignSelf: "flex-start",
  "&:hover": {
    textDecoration: "underline",
  },
});

const LoginButton = styled(Button)({
  width: "100%",
  fontSize: "16px",
  fontWeight: 600,
  marginTop: "10px",
  "&:disabled": {
    background: "#E5E7EB",
    color: "#9CA3AF",
  },
});

const FooterSection = styled(Box)({
  padding: "20px 30px",
  borderTop: "1px solid #E5E7EB",
  textAlign: "center",
});


const SignUpLink = styled(Link)({
  fontSize: "14px",
  fontWeight: 400,
  color: "#2C65F9",
  fontFamily: "Figtree, sans-serif",
  textDecoration: "none",
  cursor: "pointer",
  marginLeft: "4px",
  "&:hover": {
    textDecoration: "underline",
    color: "#2C65F9",
  },
});

// Decorative Elements

interface LoginModalProps {
  open: boolean;
  onClose: () => void;
  onSignUpClick?: () => void;
  onForgotPasswordClick?: () => void;
  onLoginSuccess?: () => void;
}

const LoginModal: React.FC<LoginModalProps> = ({
  open,
  onClose,
  onSignUpClick,
  onForgotPasswordClick,
  onLoginSuccess,
}) => {
  const [phoneEmail, setPhoneEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = () => {
    // Handle login logic
    console.log("Login:", { phoneEmail, password });
    // Set login state in localStorage
    localStorage.setItem("isLoggedIn", "true");
    // Close modal after successful login
    onClose();
    // Call onLoginSuccess callback if provided
    if (onLoginSuccess) {
      onLoginSuccess();
    }
  };

  const handleSignUpClick = () => {
    if (onSignUpClick) {
      onSignUpClick();
    }
  };

  const handleForgotPasswordClick = () => {
    if (onForgotPasswordClick) {
      onForgotPasswordClick();
    }
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="sm" fullWidth>
      {/* Header */}
      <StyledDialogTitle>
        <Typography variant="sb20">Login</Typography>
        <IconButton onClick={onClose} aria-label="close">
        <CloseIcon />
        </IconButton>
      </StyledDialogTitle>

      {/* Content */}
      <StyledDialogContent>
         <img src={LoginBannerImage} alt="Promotional Banner" style={{ width: "100%", height: "100%", objectFit: "cover" }} />

        {/* Form Fields */}
        <FormContainer>
          <FormField>
            <FormLabel>
              Phone Number/Email <Typography component="span" sx={{ color: "#EF4444" }}>*</Typography>
            </FormLabel>
            <StyledTextField
              placeholder="+91 9876543210"
              value={phoneEmail}
              onChange={(e) => setPhoneEmail(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </FormField>

          <FormField>
            <FormLabel>
              Password <Typography component="span" sx={{ color: "#EF4444" }}>*</Typography>
            </FormLabel>
            <StyledTextField
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              fullWidth
            />
            <ForgotPasswordLink onClick={handleForgotPasswordClick}>
              Forgot password?
            </ForgotPasswordLink>
          </FormField>

          <LoginButton
          variant="contained"
            onClick={handleLogin}
            disabled={!phoneEmail.trim() || !password.trim()}
          >
            Login
          </LoginButton>
        </FormContainer>
      </StyledDialogContent>

      {/* Footer */}
      <FooterSection>
        <Typography variant="r14">
          Don't have an account?
          <SignUpLink onClick={handleSignUpClick}>Sign up</SignUpLink>
        </Typography>
      </FooterSection>
    </StyledDialog>
  );
};

export default LoginModal;

