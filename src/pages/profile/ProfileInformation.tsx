// import React, { useState } from "react";
// import ProfileSideMenu from "./ProfileSideMenu";
// import {
//   Box,
//   Container,
//   Divider,
//   Grid,
//   InputAdornment,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
//   Button,
//   CircularProgress,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   MailSmallIcon,
//   UserSmallIcon,
// } from "../../assets/react-icons/CommonIcons";
// import { useLogin } from "../../context/LoginContext";
// import useUpdateUser from "../../hooks/useUpdateUser";
// import { useSnackbar } from "../../context/SnackbarContext";
// import theme from "../../Theme";
// import { MuiTelInput } from "mui-tel-input";

// const ProfileInformation: React.FC = () => {
//   const isMd = useMediaQuery(theme.breakpoints.up("md"));
//   const { user, setUser } = useLogin();
//   const { showSnackbar } = useSnackbar();
//   const { updateUser, isLoading } = useUpdateUser();
//   const [isEditing, setIsEditing] = useState(false);
//   const [formData, setFormData] = useState({
//     firstName: user?.firstname || "",
//     lastName: user?.lastname || "",
//     email: user?.email || "",
//     phone: user?.telephone || "",
//   });
//   const [errors, setErrors] = useState({
//     firstName: "",
//     lastName: "",
//     email: "",
//     phone: "",
//   });

//   const validateField = (name: string, value: string) => {
//     let error = "";
//     if (
//       (name === "firstName" || name === "lastName" || name === "email") &&
//       value.includes(" ")
//       // name === "phone") &&
//     ) {
//       error = `${
//         name === "firstName"
//           ? "First name"
//           : name === "lastName"
//           ? "Last name"
//           : name === "email"
//           ? "Email"
//           : "Phone number"
//       } cannot contain spaces.`;
//     }

//     if (name === "email") {
//       const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
//       if (!emailRegex.test(value)) {
//         error = "Please enter a valid email address.";
//       }
//     }
//     if (name === "phone") {
//       const cleanedValue = value.replace(/\s+/g, "");

//       const phoneRegex = /^\+(\d{1,3})\d{10}$/;

//       if (!phoneRegex.test(cleanedValue)) {
//         error =
//           "Please enter a valid phone number according to international standards.";
//       }
//     }

//     return error;
//   };

//   const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({ ...prev, [name]: value }));
//     setErrors((prev) => ({ ...prev, [name]: validateField(name, value) }));
//   };

//   const handlePhoneChange = (value: string) => {
//     setFormData((prev) => ({ ...prev, phone: value }));
//     setErrors((prev) => ({ ...prev, phone: validateField("phone", value) }));
//   };

//   const handleEditToggle = () => {
//     setIsEditing((prev) => !prev);
//   };

//   const handleSubmit = async () => {
//     const response = await updateUser({
//       firstname: formData.firstName,
//       lastname: formData.lastName,
//       // new code
//       email: formData.email,
//       telephone: formData.phone,
//     });
//     showSnackbar(response.message, response.success ? "success" : "error");
//     if (response.success && user) {
//       setUser((prevUser) => {
//         if (!prevUser) return prevUser;
//         return {
//           ...prevUser,
//           firstname: formData.firstName,
//           lastname: formData.lastName,
//           // new code
//           email: formData.email,
//           telephone: formData.phone,
//         };
//       });
//       setIsEditing(false);
//     }
//   };

//   const isFormValid =
//     formData.firstName &&
//     !errors.firstName &&
//     formData.lastName &&
//     !errors.lastName &&
//     // new code
//     formData.email &&
//     !errors.email &&
//     formData.phone &&
//     !errors.phone;

//   return (
//     // <Layout>
//     <>
//       <Box bgcolor={"white"} py={10}>
//         <Container>
//           <Grid spacing={4} container>
//             {isMd && (
//               <Grid item xs={12} sm={4} md={3}>
//                 <ProfileSideMenu />
//               </Grid>
//             )}
//             <Grid item xs={12} sm={12} md={9} lg={9}>
//               <Paper
//                 sx={{
//                   width: "100%",
//                   backgroundColor: "#ffffff",
//                   border: "1px solid #EFEFEF",
//                   boxShadow: "0px 0px 30px 0px #EEEEEE",
//                   borderRadius: "15px",
//                   padding: "15px",
//                   position: "relative",
//                 }}
//               >
//                 <Stack>
//                   <Stack
//                     direction={"row"}
//                     justifyContent={"space-between"}
//                     alignItems={"center"}
//                   >
//                     <Typography
//                       sx={{
//                         fontSize: "24px",
//                         fontWeight: 400,
//                         fontFamily: "Vangeda",
//                       }}
//                     >
//                       Profile Information
//                     </Typography>
//                     <Button
//                       onClick={handleEditToggle}
//                       variant="outlined"
//                       size="small"
//                     >
//                       {isEditing ? "Cancel" : "Edit"}
//                     </Button>
//                   </Stack>
//                   <Divider sx={{ py: 1.5 }} />
//                   <Box py={6}>
//                     <Grid container justifyContent={"center"}>
//                       <Grid item xs={12} sm={8} md={6}>
//                         <Stack spacing={5}>
//                           <TextField
//                             name="firstName"
//                             value={formData.firstName}
//                             onChange={handleChange}
//                             placeholder="First name"
//                             error={!!errors.firstName}
//                             helperText={errors.firstName}
//                             disabled={!isEditing}
//                             InputProps={{
//                               readOnly: !isEditing,
//                               startAdornment: (
//                                 <InputAdornment position="start">
//                                   <UserSmallIcon />
//                                 </InputAdornment>
//                               ),
//                             }}
//                           />
//                           <TextField
//                             name="lastName"
//                             value={formData.lastName}
//                             onChange={handleChange}
//                             placeholder="Last name"
//                             error={!!errors.lastName}
//                             helperText={errors.lastName}
//                             disabled={!isEditing}
//                             InputProps={{
//                               readOnly: !isEditing,
//                               startAdornment: (
//                                 <InputAdornment position="start">
//                                   <UserSmallIcon />
//                                 </InputAdornment>
//                               ),
//                             }}
//                           />
//                           <TextField
//                             name="email"
//                             value={formData.email}
//                             onChange={handleChange}
//                             placeholder="Email"
//                             error={!!errors.email}
//                             helperText={errors.email}
//                             // disabled
//                             disabled={!isEditing}
//                             InputProps={{
//                               readOnly: !isEditing,
//                               startAdornment: (
//                                 <InputAdornment position="start">
//                                   <MailSmallIcon />
//                                 </InputAdornment>
//                               ),
//                             }}
//                           />

//                           <MuiTelInput
//                             value={formData.phone}
//                             onChange={handlePhoneChange}
//                             disabled={!isEditing}
//                             error={!!errors.phone}
//                             helperText={errors.phone}
//                           />
//                           {isEditing && (
//                             <Button
//                               onClick={handleSubmit}
//                               variant="contained"
//                               color="primary"
//                               disabled={!isFormValid || isLoading}
//                             >
//                               {isLoading ? (
//                                 <CircularProgress size={24} />
//                               ) : (
//                                 "Save"
//                               )}
//                             </Button>
//                           )}
//                         </Stack>
//                       </Grid>
//                     </Grid>
//                   </Box>
//                 </Stack>
//               </Paper>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default ProfileInformation;
