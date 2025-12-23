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

const SignUpButton = styled(Button)({
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

const LoginLink = styled(Link)({
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

interface SignUpModalProps {
  open: boolean;
  onClose: () => void;
  onLoginClick?: () => void;
}

const SignUpModal: React.FC<SignUpModalProps> = ({
  open,
  onClose,
  onLoginClick,
}) => {
  const [parentsName, setParentsName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const handleSignUp = () => {
    // Handle sign up logic
    console.log("Sign Up:", {
      parentsName,
      mobileNumber,
      email,
      password,
      confirmPassword,
    });
    // Close modal after successful sign up
    onClose();
  };

  const handleLoginClick = () => {
    onClose();
    if (onLoginClick) {
      onLoginClick();
    }
  };

  const isFormValid = () => {
    return (
      parentsName.trim() &&
      mobileNumber.trim() &&
      email.trim() &&
      password.trim() &&
      confirmPassword.trim() &&
      password === confirmPassword
    );
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="md" fullWidth>
      {/* Header */}
      <StyledDialogTitle>
        <Typography variant="sb20">Sign Up</Typography>
        <IconButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </IconButton>
      </StyledDialogTitle>

      {/* Content */}
      <StyledDialogContent>

        {/* Form Fields */}
        <FormContainer>
          <FormField>
            <FormLabel>
              First Name{" "}
              <Typography component="span" sx={{ color: "#EF4444" }}>
                *
              </Typography>
            </FormLabel>
            <StyledTextField
              placeholder="Enter first name"
              value={parentsName}
              onChange={(e) => setParentsName(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </FormField>

          <FormField>
            <FormLabel>
              Last Name{" "}
              <Typography component="span" sx={{ color: "#EF4444" }}>
                *
              </Typography>
            </FormLabel>
            <StyledTextField
              placeholder="Enter last name"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              variant="outlined"
              fullWidth
              type="tel"
            />
          </FormField>

          <FormField>
            <FormLabel>
              Email{" "}
              <Typography component="span" sx={{ color: "#EF4444" }}>
                *
              </Typography>
            </FormLabel>
            <StyledTextField
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              variant="outlined"
              fullWidth
              type="email"
            />
          </FormField>

          <FormField>
            <FormLabel>
              Mobile Number{" "}
              <Typography component="span" sx={{ color: "#EF4444" }}>
                *
              </Typography>
            </FormLabel>
            <StyledTextField
              placeholder="Enter mobile number"
              value={mobileNumber}
              onChange={(e) => setMobileNumber(e.target.value)}
              variant="outlined"
              fullWidth
              type="tel"
            />
          </FormField>

          <FormField>
            <FormLabel>
              Password{" "}
              <Typography component="span" sx={{ color: "#EF4444" }}>
                *
              </Typography>
            </FormLabel>
            <StyledTextField
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              variant="outlined"
              fullWidth
            />
          </FormField>

          <FormField>
            <FormLabel>
              Confirm Password{" "}
              <Typography component="span" sx={{ color: "#EF4444" }}>
                *
              </Typography>
            </FormLabel>
            <StyledTextField
              type="password"
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              variant="outlined"
              fullWidth
              error={confirmPassword !== "" && password !== confirmPassword}
              helperText={
                confirmPassword !== "" && password !== confirmPassword
                  ? "Passwords do not match"
                  : ""
              }
            />
          </FormField>

          <SignUpButton
            variant="contained"
            onClick={handleSignUp}
            disabled={!isFormValid()}
          >
            Sign Up
          </SignUpButton>
        </FormContainer>
      </StyledDialogContent>

      {/* Footer */}
      <FooterSection>
        <Typography variant="r14">
          Already have an account?
          <LoginLink onClick={handleLoginClick}>Login</LoginLink>
        </Typography>
      </FooterSection>
    </StyledDialog>
  );
};

export default SignUpModal;

