import React, { useState, useEffect } from "react";
import {
    Box,
    Container,
    Typography,
    Button,
    Grid,
    Paper,
    TextField,
    styled,
} from "@mui/material";
import ProfileSideMenu from "./ProfileSideMenu";
import Breadcrumb from "../../components/Breadcrumb";

const ProfileContainer = styled(Box)({
    padding: "40px 0 80px 0",
    backgroundColor: "#F9F9F9",
    minHeight: "80vh",
});

const SectionCard = styled(Paper)({
    borderRadius: "12px",
    padding: "32px",
    backgroundColor: "#FFFFFF",
    boxShadow: "unset",
    border: "1px solid #1214190D",
});

const SectionHeader = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "32px",
    paddingBottom: "16px",
    borderBottom: "1px solid #1214191A",
});

const EditButton = styled(Button)({
    backgroundColor: "#2B1D0E",
    color: "#FFFFFF",
    padding: "8px 24px",
    borderRadius: "8px",
    "&:hover": {
        backgroundColor: "#1A1208",
    },
});

const CustomTextField = styled(TextField)({
    "& .MuiOutlinedInput-root": {
        borderRadius: "12px",
        backgroundColor: "#FFFFFF",
        "& fieldset": {
            borderColor: "#D1D4DE",
        },
    },
    "& .MuiInputLabel-root": {
        marginBottom: "8px",
        position: "relative",
        transform: "none",
        fontSize: "16px",
        fontWeight: 500,
        color: "#121318",
    },
});

const InputLabel = styled(Typography)({
    fontSize: "16px",
    fontWeight: 500,
    marginBottom: "12px",
    color: "#121318",
});

const ProfileInformation: React.FC = () => {
    const [isEditing, setIsEditing] = useState(false);
    // const [user, setUser] = useState<any>(null);
    const [formData, setFormData] = useState({
        first_name: "",
        last_name: "",
        phone: "",
        email: "",
    });

    useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                const parsedUser = JSON.parse(storedUser);
                // setUser(parsedUser);
                setFormData({
                    first_name: parsedUser.first_name || "",
                    last_name: parsedUser.last_name || "",
                    phone: parsedUser.phone || "",
                    email: parsedUser.email || "",
                });
            } catch (e) {
                console.error("Failed to parse user", e);
            }
        }
    }, []);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setFormData(prev => ({ ...prev, [name]: value }));
    };

    const handleEditToggle = () => {
        if (isEditing) {
            // Save logic would go here
            console.log("Saving profile:", formData);
        }
        setIsEditing(!isEditing);
    };

    return (
        <ProfileContainer>
            <Container maxWidth="xl">
                {/* <Breadcrumb items={[{ label: "Home", path: "/home" }, { label: "Profile" }]} /> */}

                <Grid container spacing={4} sx={{ mt: 2 }}>
                    {/* Sidebar */}
                    <Grid size={{ xs: 12, md: 3 }}>
                        <ProfileSideMenu />
                    </Grid>

                    {/* Main Content */}
                    <Grid size={{ xs: 12, md: 9 }}>
                        <SectionCard>
                            <SectionHeader>
                                <Typography variant="m24">Personal Information</Typography>
                                <EditButton onClick={handleEditToggle}>
                                    {isEditing ? "Save" : "Edit"}
                                </EditButton>
                            </SectionHeader>

                            <Grid container spacing={3}>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <InputLabel>First Name *</InputLabel>
                                    <CustomTextField
                                        fullWidth
                                        name="first_name"
                                        value={formData.first_name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder="Enter first name"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <InputLabel>Last Name *</InputLabel>
                                    <CustomTextField
                                        fullWidth
                                        name="last_name"
                                        value={formData.last_name}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder="Enter last name"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <InputLabel>Phone Number *</InputLabel>
                                    <CustomTextField
                                        fullWidth
                                        name="phone"
                                        value={formData.phone}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder="Enter phone number"
                                    />
                                </Grid>
                                <Grid size={{ xs: 12, sm: 6 }}>
                                    <InputLabel>Email Address *</InputLabel>
                                    <CustomTextField
                                        fullWidth
                                        name="email"
                                        value={formData.email}
                                        onChange={handleChange}
                                        disabled={!isEditing}
                                        placeholder="Enter email address"
                                    />
                                </Grid>
                            </Grid>
                        </SectionCard>
                    </Grid>
                </Grid>
            </Container>
        </ProfileContainer>
    );
};

export default ProfileInformation;
