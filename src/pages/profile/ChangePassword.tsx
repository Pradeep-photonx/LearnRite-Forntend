// import React, { useState } from "react";
// import {
//   Box,
//   Button,
//   Container,
//   Divider,
//   Grid,
//   IconButton,
//   InputAdornment,
//   Paper,
//   Stack,
//   TextField,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import {
//   EyeCloseIcon,
//   EyeOpenIcon,
// } from "../../assets/react-icons/CommonIcons";
// import { useSnackbar } from "../../context/SnackbarContext";
// import { changePassword } from "../../services/apiService";
// import axios from "axios";
// import ProfileSideMenu from "./ProfileSideMenu";
// import theme from "../../Theme";

// const ChangePassword: React.FC = () => {
//   const isMd = useMediaQuery(theme.breakpoints.up("md"));
//   const [currentPassword, setCurrentPassword] = useState("");
//   const [newPassword, setNewPassword] = useState("");
//   const [reEnterPassword, setReEnterPassword] = useState("");
//   const [showCurrentPassword, setShowCurrentPassword] = useState(false);
//   const [showNewPassword, setShowNewPassword] = useState(false);
//   const [showReEnterPassword, setShowReEnterPassword] = useState(false);
//   const { showSnackbar } = useSnackbar();

//   const handleClickShowCurrentPassword = () =>
//     setShowCurrentPassword(!showCurrentPassword);
//   const handleClickShowNewPassword = () => setShowNewPassword(!showNewPassword);
//   const handleClickShowReEnterPassword = () =>
//     setShowReEnterPassword(!showReEnterPassword);

//   const handleMouseDownPassword = (
//     event: React.MouseEvent<HTMLButtonElement>
//   ) => {
//     event.preventDefault();
//   };

//   const isPasswordValid = (password: string) => {
//     return password.length >= 8 && !/\s/.test(password);
//   };

//   const arePasswordsValid = () => {
//     return isPasswordValid(newPassword) && newPassword === reEnterPassword;
//   };

//   const handleChangePassword = async () => {
//     if (!arePasswordsValid()) {
//       showSnackbar("Passwords do not match or are invalid", "error");
//       return;
//     }
//     if (newPassword === currentPassword) {
//       showSnackbar(
//         "New password cannot be the same as the current password",
//         "error"
//       );
//       return;
//     }
//     try {
//       const response = await changePassword(
//         currentPassword,
//         newPassword,
//         reEnterPassword
//       );
//       const message = response.message || "Password updated successfully";
//       showSnackbar(message, "success");
//       setCurrentPassword("");
//       setNewPassword("");
//       setReEnterPassword("");
//     } catch (error) {
//       if (axios.isAxiosError(error) && error.response && error.response.data) {
//         const errorMessage =
//           error.response.data.error ||
//           error.response.data.message ||
//           "Error updating password";
//         showSnackbar(errorMessage, "error");
//       } else {
//         showSnackbar("Error updating password", "error");
//       }
//     }
//   };

//   const handlePasswordChange =
//     (setter: React.Dispatch<React.SetStateAction<string>>) =>
//     (event: React.ChangeEvent<HTMLInputElement>) => {
//       const value = event.target.value.replace(/\s/g, ""); 
//       setter(value);
//     };

//   return (
//     <>
//       <Box bgcolor={"white"} py={10}>
//         <Container>
//           <Grid container spacing={4}>
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
//                       Change Password
//                     </Typography>
//                   </Stack>
//                   <Divider sx={{ py: 1.5 }} />
//                   <Box py={6}>
//                     <Grid container justifyContent={"center"}>
//                       <Grid item xs={12} sm={8} md={6}>
//                         <Stack spacing={5}>
//                           <TextField
//                             label="Current Password"
//                             type={showCurrentPassword ? "text" : "password"}
//                             variant="outlined"
//                             value={currentPassword}
//                             onChange={handlePasswordChange(setCurrentPassword)}
//                             margin="normal"
//                             fullWidth
//                             InputProps={{
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   <IconButton
//                                     aria-label="toggle password visibility"
//                                     onClick={handleClickShowCurrentPassword}
//                                     onMouseDown={handleMouseDownPassword}
//                                   >
//                                     {showCurrentPassword ? (
//                                       <EyeCloseIcon />
//                                     ) : (
//                                       <EyeOpenIcon />
//                                     )}
//                                   </IconButton>
//                                 </InputAdornment>
//                               ),
//                             }}
//                           />
//                           <TextField
//                             label="New Password"
//                             type={showNewPassword ? "text" : "password"}
//                             variant="outlined"
//                             value={newPassword}
//                             onChange={handlePasswordChange(setNewPassword)}
//                             margin="normal"
//                             fullWidth
//                             error={
//                               (!isPasswordValid(newPassword) &&
//                                 newPassword !== "") ||
//                               /\s/.test(newPassword)
//                             }
//                             helperText={
//                               !isPasswordValid(newPassword) &&
//                               newPassword !== ""
//                                 ? "Password must be at least 8 characters and contain no spaces"
//                                 : ""
//                             }
//                             InputProps={{
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   <IconButton
//                                     aria-label="toggle password visibility"
//                                     onClick={handleClickShowNewPassword}
//                                     onMouseDown={handleMouseDownPassword}
//                                   >
//                                     {showNewPassword ? (
//                                       <EyeCloseIcon />
//                                     ) : (
//                                       <EyeOpenIcon />
//                                     )}
//                                   </IconButton>
//                                 </InputAdornment>
//                               ),
//                             }}
//                           />
//                           <TextField
//                             label="Re-Enter Password"
//                             type={showReEnterPassword ? "text" : "password"}
//                             variant="outlined"
//                             value={reEnterPassword}
//                             onChange={handlePasswordChange(setReEnterPassword)}
//                             margin="normal"
//                             fullWidth
//                             error={
//                               (newPassword !== reEnterPassword &&
//                                 reEnterPassword !== "") ||
//                               /\s/.test(reEnterPassword)
//                             }
//                             helperText={
//                               newPassword !== reEnterPassword &&
//                               reEnterPassword !== ""
//                                 ? "Passwords do not match"
//                                 : ""
//                             }
//                             InputProps={{
//                               endAdornment: (
//                                 <InputAdornment position="end">
//                                   <IconButton
//                                     aria-label="toggle password visibility"
//                                     onClick={handleClickShowReEnterPassword}
//                                     onMouseDown={handleMouseDownPassword}
//                                   >
//                                     {showReEnterPassword ? (
//                                       <EyeCloseIcon />
//                                     ) : (
//                                       <EyeOpenIcon />
//                                     )}
//                                   </IconButton>
//                                 </InputAdornment>
//                               ),
//                             }}
//                           />
//                           <Button
//                             size="small"
//                             variant="contained"
//                             onClick={handleChangePassword}
//                             disabled={!arePasswordsValid()}
//                           >
//                             Update Password
//                           </Button>
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

// export default ChangePassword;
