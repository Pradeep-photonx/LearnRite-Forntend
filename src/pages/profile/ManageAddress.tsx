// import React, { useEffect, useState } from "react";
// import ProfileSideMenu from "./ProfileSideMenu";
// import {
//   Box,
//   Button,
//   CircularProgress,
//   Container,
//   Divider,
//   Grid,
//   Paper,
//   Stack,
//   Typography,
//   styled,
//   useMediaQuery,
// } from "@mui/material";
// import AddAddressForm from "../../components/dialogs/AddAddressForm";
// import { DownChevron } from "../../assets/react-icons/CommonIcons";
// import { IAddress } from "../../types/interfaces";
// import {
//   createAddress,
//   updateAddress,
//   getUserAddresses,
//   deleteAddress,
// } from "../../services/addressService";
// import { useSnackbar } from "../../context/SnackbarContext";
// import theme from "../../Theme";

// const AddressItem = styled("div")({
//   width: "100%",
//   padding: "10px 15px",
//   background: "#FAFAFA",
// });

// const ManageAddress: React.FC = () => {
//   const isMd = useMediaQuery(theme.breakpoints.up("md"));
//   const [shippingAddresses, setShippingAddresses] = useState<IAddress[]>([]);
//   const [billingAddresses, setBillingAddresses] = useState<IAddress[]>([]);
//   const [loadingShipping, setLoadingShipping] = useState<boolean>(true);
//   const [loadingBilling, setLoadingBilling] = useState<boolean>(true);
//   const [showAllShippingAddresses, setShowAllShippingAddresses] =
//     useState<boolean>(false);
//   const [showAllBillingAddresses, setShowAllBillingAddresses] =
//     useState<boolean>(false);
//   const [isFormOpen, setFormOpen] = useState(false);
//   const [isShippingForm, setIsShippingForm] = useState<boolean>(true);
//   const [editAddress, setEditAddress] = useState<IAddress | null>(null);
//   const { showSnackbar } = useSnackbar();

//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const shippingData = await getUserAddresses(true, false);
//         const billingData = await getUserAddresses(false, true);
//         setShippingAddresses(
//           shippingData.sort(
//             (a: IAddress, b: IAddress) => b.address_id! - a.address_id!
//           )
//         );
//         setBillingAddresses(
//           billingData.sort(
//             (a: IAddress, b: IAddress) => b.address_id! - a.address_id!
//           )
//         );
//       } catch (error) {
//         console.error("Error fetching addresses:", error);
//         showSnackbar("Failed to fetch addresses", "error");
//       } finally {
//         setLoadingShipping(false);
//         setLoadingBilling(false);
//       }
//     };
//     fetchAddresses();
//   }, [showSnackbar]);

//   const handleToggleViewAllShipping = () => {
//     setShowAllShippingAddresses(!showAllShippingAddresses);
//   };

//   const handleToggleViewAllBilling = () => {
//     setShowAllBillingAddresses(!showAllBillingAddresses);
//   };

//   const handleOpenForm = (
//     isShipping: boolean,
//     address: IAddress | null = null
//   ) => {
//     setIsShippingForm(isShipping);
//     setEditAddress(address);
//     setFormOpen(true);
//   };

//   const handleCloseForm = () => setFormOpen(false);

//   const handleAddAddress = async (newAddress: IAddress) => {
//     try {
//       if (editAddress) {
//         await updateAddress(editAddress.address_id!, newAddress);
//       } else {
//         await createAddress(
//           newAddress,
//           isShippingForm,
//           newAddress.billing === 1
//         );
//       }
//       const shippingData = await getUserAddresses(true, false);
//       const billingData = await getUserAddresses(false, true);
//       setShippingAddresses(
//         shippingData.sort(
//           (a: IAddress, b: IAddress) => b.address_id! - a.address_id!
//         )
//       );
//       setBillingAddresses(
//         billingData.sort(
//           (a: IAddress, b: IAddress) => b.address_id! - a.address_id!
//         )
//       );
//       handleCloseForm();
//       showSnackbar("Address saved successfully", "success");
//     } catch (error) {
//       console.error("Error adding/updating address:", error);
//       showSnackbar("Failed to save address", "error");
//     }
//   };

//   const handleDeleteAddress = async (addressId: number) => {
//     try {
//       await deleteAddress(addressId);
//       const shippingData = await getUserAddresses(true, false);
//       const billingData = await getUserAddresses(false, true);
//       setShippingAddresses(
//         shippingData.sort(
//           (a: IAddress, b: IAddress) => b.address_id! - a.address_id!
//         )
//       );
//       setBillingAddresses(
//         billingData.sort(
//           (a: IAddress, b: IAddress) => b.address_id! - a.address_id!
//         )
//       );
//       showSnackbar("Address deleted successfully", "success");
//     } catch (error) {
//       console.error("Error deleting address:", error);
//       showSnackbar("Failed to delete address", "error");
//     }
//   };

//   const visibleShippingAddresses = showAllShippingAddresses
//     ? shippingAddresses
//     : shippingAddresses.slice(0, 1);
//   const visibleBillingAddresses = showAllBillingAddresses
//     ? billingAddresses
//     : billingAddresses.slice(0, 1);

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
//               <Grid container spacing={4}>
//                 <Grid item xs={12} sm={12} md={6}>
//                   <Paper
//                     sx={{
//                       p: 4,
//                       boxShadow: "0px 0px 30px 0px #EEEEEE",
//                       borderRadius: 2,
//                       border: "1px solid #EFEFEF",
//                       position: "relative",
//                     }}
//                   >
//                     <Box>
//                       <Stack
//                         direction={"row"}
//                         alignItems={"center"}
//                         justifyContent={"space-between"}
//                       >
//                         <Typography variant="h3">
//                           1. Shipping Address
//                         </Typography>
//                         <Button
//                           variant="outlined"
//                           size="small"
//                           onClick={() => handleOpenForm(true)}
//                         >
//                           Add new address
//                         </Button>
//                         <AddAddressForm
//                           open={isFormOpen}
//                           onClose={handleCloseForm}
//                           onAddAddress={handleAddAddress}
//                           isShippingForm={isShippingForm}
//                           initialData={editAddress}
//                         />
//                       </Stack>
//                       <Divider sx={{ my: 4 }} />
//                       {loadingShipping ? (
//                         <Stack direction="row" justifyContent="center">
//                           <CircularProgress />
//                         </Stack>
//                       ) : shippingAddresses.length === 0 ? (
//                         <Typography textAlign={"center"}>
//                           No shipping addresses found.
//                         </Typography>
//                       ) : (
//                         <Stack spacing={4}>
//                           {visibleShippingAddresses.map((address) => (
//                             <AddressItem key={address.address_id}>
//                               <Stack spacing={1}>
//                                 <Typography variant="h4">
//                                   {address.firstname} {address.lastname}
//                                 </Typography>
//                                 <Typography variant="subtitle1">
//                                   {address.address_1}, {address.address_2}
//                                 </Typography>
//                                 <Typography variant="subtitle1">
//                                   {address.WebtagCity?.name},{" "}
//                                   {address.WebtagZone?.name},{" "}
//                                   {address.WebtagCountry?.name} -{" "}
//                                   {address.postcode}
//                                 </Typography>
//                                 <Typography variant="subtitle1">
//                                   Email: {address.email}
//                                 </Typography>
//                                 <Typography variant="subtitle1">
//                                   Phone: {address.telephone}
//                                 </Typography>
//                                 <Stack spacing={2} direction={"row"}>
//                                   <Button
//                                     variant="text"
//                                     size="small"
//                                     onClick={() =>
//                                       handleOpenForm(true, address)
//                                     }
//                                   >
//                                     Edit
//                                   </Button>
//                                   <Button
//                                     variant="text"
//                                     size="small"
//                                     onClick={() =>
//                                       handleDeleteAddress(address.address_id!)
//                                     }
//                                   >
//                                     Delete
//                                   </Button>
//                                 </Stack>
//                               </Stack>
//                             </AddressItem>
//                           ))}
//                         </Stack>
//                       )}
//                       {shippingAddresses.length > 1 && (
//                         <Button
//                           variant="outlined"
//                           color="secondary"
//                           sx={{
//                             width: "100%",
//                             marginTop: 2,
//                             marginRight: 2,
//                             borderRadius: "4px",
//                           }}
//                           onClick={handleToggleViewAllShipping}
//                         >
//                           {showAllShippingAddresses ? "View Less" : "View All"}
//                           <Box
//                             sx={{
//                               display: "flex",
//                               transform: showAllShippingAddresses
//                                 ? "rotate(180deg)"
//                                 : "none",
//                             }}
//                           >
//                             <DownChevron />
//                           </Box>
//                         </Button>
//                       )}
//                     </Box>
//                   </Paper>
//                 </Grid>
//                 <Grid item xs={12} sm={12} md={6}>
//                   <Paper
//                     sx={{
//                       p: 4,
//                       boxShadow: "0px 0px 30px 0px #EEEEEE",
//                       borderRadius: 2,
//                       border: "1px solid #EFEFEF",
//                       position: "relative",
//                     }}
//                   >
//                     <Box>
//                       <Stack
//                         direction={"row"}
//                         alignItems={"center"}
//                         justifyContent={"space-between"}
//                       >
//                         <Typography variant="h3">2. Billing Address</Typography>
//                         <Button
//                           variant="outlined"
//                           size="small"
//                           onClick={() => handleOpenForm(false)}
//                         >
//                           Add new address
//                         </Button>
//                         <AddAddressForm
//                           open={isFormOpen}
//                           onClose={handleCloseForm}
//                           onAddAddress={handleAddAddress}
//                           isShippingForm={isShippingForm}
//                           initialData={editAddress}
//                         />
//                       </Stack>
//                       <Divider sx={{ my: 4 }} />
//                       {loadingBilling ? (
//                         <Stack direction="row" justifyContent="center">
//                           <CircularProgress />
//                         </Stack>
//                       ) : shippingAddresses.length === 0 ? (
//                         <Typography textAlign={"center"}>
//                           No billing addresses found.
//                         </Typography>
//                       ) : (
//                         <Stack spacing={4}>
//                           {visibleBillingAddresses.map((address) => (
//                             <AddressItem key={address.address_id}>
//                               <Stack spacing={1}>
//                                 <Typography variant="h4">
//                                   {address.firstname} {address.lastname}
//                                 </Typography>
//                                 <Typography variant="subtitle1">
//                                   {address.address_1}, {address.address_2}
//                                 </Typography>
//                                 <Typography variant="subtitle1">
//                                   {address.WebtagCity?.name},{" "}
//                                   {address.WebtagZone?.name},{" "}
//                                   {address.WebtagCountry?.name} -{" "}
//                                   {address.postcode}
//                                 </Typography>
//                                 <Typography variant="subtitle1">
//                                   Email: {address.email}
//                                 </Typography>
//                                 <Typography variant="subtitle1">
//                                   Phone: {address.telephone}
//                                 </Typography>
//                                 <Stack spacing={2} direction={"row"}>
//                                   <Button
//                                     variant="text"
//                                     size="small"
//                                     onClick={() =>
//                                       handleOpenForm(false, address)
//                                     }
//                                   >
//                                     Edit
//                                   </Button>
//                                   <Button
//                                     variant="text"
//                                     size="small"
//                                     onClick={() =>
//                                       handleDeleteAddress(address.address_id!)
//                                     }
//                                   >
//                                     Delete
//                                   </Button>
//                                 </Stack>
//                               </Stack>
//                             </AddressItem>
//                           ))}
//                         </Stack>
//                       )}
//                       {billingAddresses.length > 1 && (
//                         <Button
//                           variant="outlined"
//                           color="secondary"
//                           sx={{
//                             width: "100%",
//                             marginTop: 2,
//                             marginRight: 2,
//                             borderRadius: "4px",
//                           }}
//                           onClick={handleToggleViewAllBilling}
//                         >
//                           {showAllBillingAddresses ? "View Less" : "View All"}
//                           <Box
//                             sx={{
//                               display: "flex",
//                               transform: showAllBillingAddresses
//                                 ? "rotate(180deg)"
//                                 : "none",
//                             }}
//                           >
//                             <DownChevron />
//                           </Box>
//                         </Button>
//                       )}
//                     </Box>
//                   </Paper>
//                 </Grid>
//               </Grid>
//             </Grid>
//           </Grid>
//         </Container>
//       </Box>
//     </>
//   );
// };

// export default ManageAddress;
