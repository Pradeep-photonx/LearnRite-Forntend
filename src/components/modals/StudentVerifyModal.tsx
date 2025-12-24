import React, { type ReactNode } from "react";
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  Button,
  Box,
  Typography,
  TextField,
  styled,
} from "@mui/material";
import { Close } from "@mui/icons-material";
import { CloseIcon } from "../icons/CommonIcons";
// import theme from "../Theme";

// Styled Components
const StyledDialog = styled(Dialog)(({ theme }) => ({
  "& .MuiDialog-paper": {
    borderRadius: "12px",
    maxWidth: "800px",
    width: "100%",
    margin: "20px",
    padding: "20px",
    boxShadow: "unset !important",

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
  "& .MuiTypography-root": {
    fontSize: "20px",
    fontWeight: 600,
    color: "#121318",
    fontFamily: "Figtree, sans-serif",
  },
});

const CloseButton = styled(IconButton)({
  padding: "8px",
  color: "#6B7280",
  "&:hover": {
    backgroundColor: "#F3F4F6",
    color: "#121318",
  },
  "& .MuiSvgIcon-root": {
    fontSize: "24px",
  },
});

const StyledDialogContent = styled(DialogContent)({
  padding: "20px 0px !important",
  "& .MuiDialogContent-root": {
    padding: "30px",
  },
});

const StyledDialogActions = styled(DialogActions)({
  padding: "20px 0px",
  borderTop: "1px solid #E5E7EB",
  gap: "12px",
  justifyContent: "flex-end",
});

const CancelButton = styled(Button)({
  minWidth: "120px",
  padding: "12px 24px",
  borderRadius: "8px",
  border: "1px solid #D1D4DE",
  color: "#121318",
  backgroundColor: "#FFFFFF",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 500,
  fontFamily: "Figtree, sans-serif",
  "&:hover": {
    backgroundColor: "#F9FAFB",
    borderColor: "#9CA3AF",
  },
});

const ConfirmButton = styled(Button)({
  minWidth: "180px",
  padding: "12px 24px",
  borderRadius: "8px",
  background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
  color: "#FFFFFF",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 600,
  fontFamily: "Figtree, sans-serif",
  boxShadow: "0px 5px 10px 0px #2D60E745",
  "&:hover": {
    background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
    boxShadow: "0px 5px 15px 0px #2D60E745",
  },
  "&:disabled": {
    background: "#E5E7EB",
    color: "#9CA3AF",
  },
});

// Form Field Styling
export const FormFieldContainer = styled(Box)({
  display: "flex",
  flexDirection: "column",
  position: "relative",
  gap: "4px",
  marginBottom: "12px",
  "&:last-child": {
    marginBottom: 0,
  },
});

export const FormLabel = styled(Typography)({
  fontSize: "16px",
  fontWeight: 500,
  color: "#121318",
  fontFamily: "Figtree, sans-serif",
  marginBottom: "4px",
});

export const StyledTextField = styled(TextField)({
  flex: 1,
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    fontSize: "16px",
    fontFamily: "Figtree, sans-serif",
    color: "#121318",
    backgroundColor: "#FFFFFF",
    "& fieldset": {
      borderColor: "#D1D4DE",
    },
    "&:hover fieldset": {
      borderColor: "#D1D4DE",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2C65F9",
    },
    "&.Mui-disabled": {
      backgroundColor: "#F9FAFB",
      color: "#6B7280",
    },
  },
  "& .MuiInputBase-input::placeholder": {
    color: "#9CA3AF",
    opacity: 1,
  },
});

export const VerifyButton = styled(Button)({
  fontWeight: "600 !important",
  color: "#2C55C1 !important",
  fontSize: "16px !important",
  position: "absolute",
  right: "20px",
  top: "14px",
  zIndex: 9,

});

// Interface for form field configuration
export interface FormField {
  id: string;
  label: string;
  placeholder?: string;
  type?: "text" | "email" | "number" | "password" | "tel";
  required?: boolean;
  value: string;
  onChange: (value: string) => void;
  verifyButton?: {
    label: string;
    onClick: () => void;
    disabled?: boolean;
  };
  disabled?: boolean;
}

// CommonModal Props Interface
export interface CommonModalProps {
  open: boolean;
  onClose: () => void;
  title: string;
  formFields?: FormField[];
  children?: ReactNode; // For custom form content
  cancelButtonText?: string;
  confirmButtonText: string;
  onCancel?: () => void;
  onConfirm: () => void;
  confirmButtonDisabled?: boolean;
  maxWidth?: "xs" | "sm" | "md" | "lg" | "xl";
}

const CommonModal: React.FC<CommonModalProps> = ({
  open,
  onClose,
  title,
  formFields = [],
  children,
  cancelButtonText = "Cancel",
  confirmButtonText,
  onCancel,
  onConfirm,
  confirmButtonDisabled = false,
  maxWidth = "sm",
}) => {
  const handleCancel = () => {
    if (onCancel) {
      onCancel();
    } else {
      onClose();
    }
  };

  return (
    <StyledDialog
      open={open}
      onClose={onClose}
      maxWidth="lg"
      fullWidth
    >
      {/* Header */}
      <StyledDialogTitle>
        <Typography variant="h6">{title}</Typography>
        <CloseButton onClick={onClose} aria-label="close">
          <CloseIcon />
        </CloseButton>
      </StyledDialogTitle>

      {/* Content */}
      <StyledDialogContent>
        {children ? (
          children
        ) : (
          <Box sx={{
            "& .MuiInputBase-root": {
              height: "48px",
              "& .MuiInputBase-input::placeholder": {
                fontWeight: 400,
              },
            },
          }}>
            {formFields.map((field) => (
              <FormFieldContainer key={field.id}>
                <FormLabel>
                  {field.label}
                  {field.required && (
                    <Typography
                      component="span"
                      sx={{ color: "#EF4444", marginLeft: "4px" }}
                    >
                      *
                    </Typography>
                  )}
                </FormLabel>
                <Box
                  sx={{
                    display: "flex",
                    gap: "12px",
                    alignItems: "flex-start",
                  }}
                >
                  <StyledTextField
                    type={field.type || "text"}
                    placeholder={field.placeholder || `Enter ${field.label}`}
                    value={field.value}
                    onChange={(e) => field.onChange(e.target.value)}
                    disabled={field.disabled}
                    required={field.required}
                    fullWidth
                    variant="outlined"
                  />
                  {field.verifyButton && (
                    <VerifyButton
                      onClick={field.verifyButton.onClick}
                      disabled={field.verifyButton.disabled}
                    >
                      {field.verifyButton.label}
                    </VerifyButton>
                  )}
                </Box>
              </FormFieldContainer>
            ))}
          </Box>
        )}
      </StyledDialogContent>

      {/* Footer */}
      <StyledDialogActions>
        <CancelButton onClick={handleCancel}>
          {cancelButtonText}
        </CancelButton>
        <ConfirmButton
          variant="contained"
          onClick={onConfirm}
          disabled={confirmButtonDisabled}
        >
          {confirmButtonText}
        </ConfirmButton>
      </StyledDialogActions>
    </StyledDialog>
  );
};

export default CommonModal;

