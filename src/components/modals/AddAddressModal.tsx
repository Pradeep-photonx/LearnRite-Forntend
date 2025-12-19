import React, { useState } from "react";
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
    Grid,
    styled,
} from "@mui/material";
import { CloseIcon } from "../icons/CommonIcons";

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
            padding: "15px",
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

// const CloseButton = styled(IconButton)({
//   width: "32px",
//   height: "32px",
//   padding: "0",
//   backgroundColor: "#6B7280",
//   color: "#FFFFFF",
//   borderRadius: "50%",
//   "&:hover": {
//     backgroundColor: "#4B5563",
//   },
//   "& .MuiSvgIcon-root": {
//     fontSize: "20px",
//   },
// });

const StyledDialogContent = styled(DialogContent)({
    padding: "20px 0px !important",
    overflow: "visible",
});

const FormContainer = styled(Box)({
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
        "&:hover fieldset": {
            borderColor: "#202228",
        },
        "&.Mui-focused fieldset": {
            borderColor: "#2C65F9",
        },
    },
    "& .MuiInputBase-input::placeholder": {
        color: "#9CA3AF",
        opacity: 1,
    },
    "& .MuiInputBase-input": {
        padding: "12px 16px",
    },
    "& textarea": {
        minHeight: "100px",
        resize: "vertical",
    },
});

const StyledDialogActions = styled(DialogActions)({
    padding: "20px 0px 0px 0px",
    borderTop: "1px solid #E5E7EB",
    gap: "12px",
    justifyContent: "flex-end",
    marginTop: "20px",
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

const AddAddressButton = styled(Button)({

    color: "#FFFFFF",
    "&:disabled": {
        background: "#E5E7EB",
        color: "#9CA3AF",
    },
});

interface AddAddressModalProps {
    open: boolean;
    onClose: () => void;
    onAddAddress?: (addressData: AddressFormData) => void;
}

export interface AddressFormData {
    fullName: string;
    address: string;
    city: string;
    state: string;
    phoneNumber: string;
    pinCode: string;
    country: string;
}

const AddAddressModal: React.FC<AddAddressModalProps> = ({
    open,
    onClose,
    onAddAddress,
}) => {
    const [fullName, setFullName] = useState("");
    const [address, setAddress] = useState("");
    const [city, setCity] = useState("");
    const [state, setState] = useState("");
    const [phoneNumber, setPhoneNumber] = useState("+91 9876543210");
    const [pinCode, setPinCode] = useState("");
    const [country, setCountry] = useState("");

    const handleAddAddress = () => {
        const addressData: AddressFormData = {
            fullName,
            address,
            city,
            state,
            phoneNumber,
            pinCode,
            country,
        };

        if (onAddAddress) {
            onAddAddress(addressData);
        }

        // Reset form
        setFullName("");
        setAddress("");
        setCity("");
        setState("");
        setPhoneNumber("+91 9876543210");
        setPinCode("");
        setCountry("");

        onClose();
    };

    const handleCancel = () => {
        // Reset form on cancel
        setFullName("");
        setAddress("");
        setCity("");
        setState("");
        setPhoneNumber("+91 9876543210");
        setPinCode("");
        setCountry("");
        onClose();
    };

    const isFormValid = () => {
        return (
            fullName.trim() &&
            address.trim() &&
            city.trim() &&
            state.trim() &&
            phoneNumber.trim() &&
            pinCode.trim() &&
            country.trim()
        );
    };

    return (
        <StyledDialog open={open} onClose={handleCancel} maxWidth="md" fullWidth>
            {/* Header */}
            <StyledDialogTitle>
                <Typography variant="sb20">Add Address</Typography>
                <IconButton onClick={handleCancel} aria-label="close">
                    <CloseIcon />
                </IconButton>
            </StyledDialogTitle>

            {/* Content */}
            <StyledDialogContent>
                <FormContainer>
                    <Grid container spacing={3}>
                        {/* Left Column */}
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormField>
                                <FormLabel>
                                    Full Name{" "}
                                    <Typography component="span" sx={{ color: "#EF4444" }}>
                                        *
                                    </Typography>
                                </FormLabel>
                                <StyledTextField
                                    placeholder="Enter your full name"
                                    value={fullName}
                                    onChange={(e) => setFullName(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormField>
                                <FormLabel>
                                    Phone Number{" "}
                                    <Typography component="span" sx={{ color: "#EF4444" }}>
                                        *
                                    </Typography>
                                </FormLabel>
                                <StyledTextField
                                    placeholder="+91 9876543210"
                                    value={phoneNumber}
                                    onChange={(e) => setPhoneNumber(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    type="tel"
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12 }}>
                        <FormField>
                                <FormLabel>
                                    Address{" "}
                                    <Typography component="span" sx={{ color: "#EF4444" }}>
                                        *
                                    </Typography>
                                </FormLabel>
                                <StyledTextField
                                    placeholder="Enter address"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormField>
                                <FormLabel>
                                    City{" "}
                                    <Typography component="span" sx={{ color: "#EF4444" }}>
                                        *
                                    </Typography>
                                </FormLabel>
                                <StyledTextField
                                    placeholder="Enter city name"
                                    value={city}
                                    onChange={(e) => setCity(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormField>
                                <FormLabel>
                                    Pin Code{" "}
                                    <Typography component="span" sx={{ color: "#EF4444" }}>
                                        *
                                    </Typography>
                                </FormLabel>
                                <StyledTextField
                                    placeholder="Enter pincode"
                                    value={pinCode}
                                    onChange={(e) => setPinCode(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                    type="number"
                                />
                            </FormField>
                        </Grid>
                        <Grid size={{ xs: 12, md: 6 }}>
                            <FormField>
                                <FormLabel>
                                    State{" "}
                                    <Typography component="span" sx={{ color: "#EF4444" }}>
                                        *
                                    </Typography>
                                </FormLabel>
                                <StyledTextField
                                    placeholder="Enter State"
                                    value={state}
                                    onChange={(e) => setState(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                            </FormField>
                        </Grid>

                        <Grid size={{ xs: 12, md: 6 }}>

                            <FormField>
                                <FormLabel>
                                    Country{" "}
                                    <Typography component="span" sx={{ color: "#EF4444" }}>
                                        *
                                    </Typography>
                                </FormLabel>
                                <StyledTextField
                                    placeholder="Enter country"
                                    value={country}
                                    onChange={(e) => setCountry(e.target.value)}
                                    variant="outlined"
                                    fullWidth
                                />
                            </FormField>
                        </Grid>
                    </Grid>
                </FormContainer>
            </StyledDialogContent>

            {/* Footer */}
            <StyledDialogActions>
                <CancelButton onClick={handleCancel}>Cancel</CancelButton>
                <AddAddressButton
                    variant="contained"
                    onClick={handleAddAddress}
                    disabled={!isFormValid()}
                >
                    Add Address
                </AddAddressButton>
            </StyledDialogActions>
        </StyledDialog>
    );
};

export default AddAddressModal;

