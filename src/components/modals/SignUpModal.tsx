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
  Grid,
  InputAdornment,
} from "@mui/material";
import { Visibility, VisibilityOff } from "@mui/icons-material";
import { CloseIcon } from "../icons/CommonIcons";
import { registerUser, type UserRegisterPayload } from "../../api/auth";
import toast from "react-hot-toast";

// Styled Components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    maxWidth: "800px",
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
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [mobileNumber, setMobileNumber] = useState("");
  const [alternateMobileNumber, setAlternateMobileNumber] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleSignUp = async () => {
    if (password !== confirmPassword) {
      toast.error("Passwords do not match");
      return;
    }

    setLoading(true);
    try {
      const payload: UserRegisterPayload = {
        first_name: firstName,
        last_name: lastName,
        email: email,
        phone: mobileNumber,
        alternate_phone: alternateMobileNumber,
        password: password,
      };

      const response = await registerUser(payload);

      // If execution reaches here, the API call was successful (2xx)
      // We assume success unless the response body explicitly indicates an error
      if (!response.error) {
        toast.success("Registration successful! Please login.");
        // Clear fields
        setFirstName("");
        setLastName("");
        setMobileNumber("");
        setAlternateMobileNumber("");
        setEmail("");
        setPassword("");
        setConfirmPassword("");

        onClose();
        if (onLoginClick) onLoginClick();
      } else {
        toast.error(response.error || response.message || "Registration failed");
      }
    } catch (error: any) {
      console.error("Sign up error:", error);
      let errorMessage = "Registration failed. Please try again.";

      if (error.response) {
        // Server responded with a status code outside 2xx range
        if (typeof error.response.data === 'string') {
          errorMessage = error.response.data;
        } else if (error.response.data?.error) {
          errorMessage = error.response.data.error;
        } else if (error.response.data?.message) {
          errorMessage = error.response.data.message;
        } else if (error.response.data?.errors) {
          // Handle validation errors (e.g., ASP.NET default format)
          const errors = error.response.data.errors;
          // Join the first error message from each field or just take the first one found
          const firstError = Object.values(errors).flat()[0];
          if (typeof firstError === 'string') {
            errorMessage = firstError;
          }
        } else if (error.response.data?.title) {
          errorMessage = error.response.data.title;
        }
      } else if (error.message) {
        // Request setup triggered an error
        errorMessage = error.message;
      }

      toast.error(errorMessage);
    } finally {
      setLoading(false);
    }
  };

  const handleLoginClick = () => {
    onClose();
    if (onLoginClick) {
      onLoginClick();
    }
  };

  const isFormValid = () => {
    return (
      firstName.trim() !== "" &&
      lastName.trim() !== "" &&
      mobileNumber.trim() !== "" &&
      alternateMobileNumber.trim() !== "" &&
      email.trim() !== "" &&
      password.trim() !== "" &&
      confirmPassword.trim() !== "" &&
      password === confirmPassword
    );
  };

  return (
    <StyledDialog open={open} onClose={onClose} maxWidth="lg" fullWidth>
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
          <Grid container spacing={3}>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField>
                <FormLabel>
                  First Name{" "}
                  <Typography component="span" sx={{ color: "#EF4444" }}>
                    *
                  </Typography>
                </FormLabel>
                <StyledTextField
                  placeholder="Enter first name"
                  value={firstName}
                  onChange={(e) => setFirstName(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </FormField>

            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField>
                <FormLabel>
                  Last Name{" "}
                  <Typography component="span" sx={{ color: "#EF4444" }}>
                    *
                  </Typography>
                </FormLabel>
                <StyledTextField
                  placeholder="Enter last name"
                  value={lastName}
                  onChange={(e) => setLastName(e.target.value)}
                  variant="outlined"
                  fullWidth
                />
              </FormField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
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
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
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
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField>
                <FormLabel>
                  Alternate Mobile Number{" "}
                  <Typography component="span" sx={{ color: "#EF4444" }}>
                    *
                  </Typography>
                </FormLabel>
                <StyledTextField
                  placeholder="Enter alternate mobile number"
                  value={alternateMobileNumber}
                  onChange={(e) => setAlternateMobileNumber(e.target.value)}
                  variant="outlined"
                  fullWidth
                  type="tel"
                />
              </FormField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField>
                <FormLabel>
                  Password{" "}
                  <Typography component="span" sx={{ color: "#EF4444" }}>
                    *
                  </Typography>
                </FormLabel>
                <StyledTextField
                  type={showPassword ? "text" : "password"}
                  placeholder="Enter password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  variant="outlined"
                  fullWidth
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle password visibility"
                          onClick={() => setShowPassword(!showPassword)}
                          edge="end"
                        >
                          {showPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormField>
            </Grid>
            <Grid size={{ xs: 12, md: 6 }}>
              <FormField>
                <FormLabel>
                  Confirm Password{" "}
                  <Typography component="span" sx={{ color: "#EF4444" }}>
                    *
                  </Typography>
                </FormLabel>
                <StyledTextField
                  type={showConfirmPassword ? "text" : "password"}
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
                  InputProps={{
                    endAdornment: (
                      <InputAdornment position="end">
                        <IconButton
                          aria-label="toggle confirm password visibility"
                          onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                          edge="end"
                        >
                          {showConfirmPassword ? <VisibilityOff /> : <Visibility />}
                        </IconButton>
                      </InputAdornment>
                    ),
                  }}
                />
              </FormField>
            </Grid>
          </Grid>

          <SignUpButton
            variant="contained"
            onClick={handleSignUp}
            disabled={!isFormValid() || loading}
          >
            {loading ? "Signing Up..." : "Sign Up"}
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

