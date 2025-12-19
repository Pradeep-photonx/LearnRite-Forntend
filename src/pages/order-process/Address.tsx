// import React, { useState, useEffect } from "react";
// import CustomStepper, { StepAction } from "../../components/CustomStepper";
// import { useNavigate } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Chip,
//   CircularProgress,
//   Container,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   Divider,
//   FormControlLabel,
//   Grid,
//   IconButton,
//   InputAdornment,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
//   Radio,
//   RadioGroup,
//   Stack,
//   TextField,
//   Typography,
//   styled,
//   useMediaQuery,
// } from "@mui/material";
// import designBoard from "../../assets/graphics/designBoard.svg";
// import AddAddressForm from "../../components/dialogs/AddAddressForm";
// import {
//   DownChevron,
//   PlusSuccess,
//   XCircle,
// } from "../../assets/react-icons/CommonIcons";
// import { IAddress } from "../../types/interfaces";
// import {
//   getUserAddresses,
//   createAddress,
//   updateAddress,
// } from "../../services/addressService";
// import { useSnackbar } from "../../context/SnackbarContext";
// import { useCart } from "../../context/CartContext";
// import theme from "../../Theme";
// import axiosAuth from "../../axios/axiosAuth";
// import CouponsDialog from "../../components/CouponsDialog";
// import { useLogin } from "../../context/LoginContext";
// import { useCoupons } from "../../context/CouponContext";

// const OrderSummaryBox = styled(Box)({
//   backgroundImage: `url('${designBoard}')`,
//   backgroundSize: "contain",
//   width: "500px",
//   height: "640px",
//   backgroundRepeat: "no-repeat",
//   backgroundPosition: "center",
//   padding: "90px 50px",
//   position: "sticky",
//   top: 156,
//   [theme.breakpoints.down(401)]: {
//     backgroundImage: `none`,
//     width: "100%",
//     height: "auto",
//     padding: "40px 20px",
//     boxShadow: "0px 0px 30px 0px #EEEEEE",
//     borderRadius: "8px",
//     border: "1px solid #EFEFEF",
//   },
//   [theme.breakpoints.between(401, 460)]: {
//     padding: "120px 50px", 
//   },
// });

// const CustomFormControlLabel = styled(FormControlLabel)({
//   position: "relative",
//   margin: 0,
//   "&:hover": {
//     background: "#FAFAFA",
//     "& .MuiButton-root": {
//       visibility: "visible",
//     },
//   },
// });

// const CustomLabel = styled("div")({
//   display: "flex",
//   flexDirection: "column",
//   alignItems: "flex-start",
//   width: "100%",
// });

// const EditButton = styled(Button)({
//   position: "absolute",
//   right: 10,
//   top: 10,
//   visibility: "hidden", 
// });

// const AddressComponent: React.FC = () => {
//   const navigate = useNavigate();
//   const { showSnackbar } = useSnackbar();
//   const [shippingAddresses, setShippingAddresses] = useState<IAddress[]>([]);
//   const [billingAddresses, setBillingAddresses] = useState<IAddress[]>([]);
//   const [selectedShippingAddress, setSelectedShippingAddress] = useState<
//     number | null
//   >(null);
//   const [selectedBillingAddress, setSelectedBillingAddress] = useState<
//     number | null
//   >(null);
//   const [showAllShippingAddresses, setShowAllShippingAddresses] =
//     useState<boolean>(false);
//   const [showAllBillingAddresses, setShowAllBillingAddresses] =
//     useState<boolean>(false);
//   const [isFormOpen, setFormOpen] = useState<boolean>(false);
//   const [isShippingForm, setIsShippingForm] = useState<boolean>(true); 
//   const [editAddress, setEditAddress] = useState<IAddress | null>(null); 
//   const [loadingShipping, setLoadingShipping] = useState<boolean>(true);
//   const [loadingBilling, setLoadingBilling] = useState<boolean>(true);
//   const [discountCode, setDiscountCode] = useState("");
//   const [couponsDialogOpen, setCouponsDialogOpen] = useState(false);
//   const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);
//   const { appliedCode, discount, applyCoupon, removeCoupon, errorMessage } =
//     useCoupons();
//   const [shippingCost, setShippingCost] = useState<number | null>(null);
//   const [, setLoading] = useState(true);

//   const [shouldHideLayout, setShouldHideLayout] = useState(false);


//   useEffect(() => {
//     const hideLayoutFromQuery =
//       new URLSearchParams(location.search).get("hideLayout") === "true";
//     setShouldHideLayout(hideLayoutFromQuery);
//   }, [location.search]);



//   const handleApplyDiscountCode = async () => {
//     if (discountCode) {
//       const totalAmount = parseFloat(
//         cartItems
//           .reduce(
//             (total, item) => total + item.Product.price * item.quantity,
//             0
//           )
//           .toFixed(2)
//       );
//       await applyCoupon(totalAmount, discountCode);
//       setDiscountCode("");
//     }
//   };

//   const handleRemoveDiscountCode = () => {
//     removeCoupon();
//   };

//   console.log(selectedShippingAddress);
//   console.log(shippingCost);

//   const { cartItems } = useCart();
//   useEffect(() => {
//     const calculateShippingCost = async () => {
//       try {
//         const shippingData = await getUserAddresses(true, false);

//         const shippingAddress =
//           shippingData.find(
//             (address: IAddress) =>
//               address.address_id === selectedShippingAddress
//           ) || null;

//         const totalWeight = cartItems.reduce(
//           (total, item) => total + item.quantity,
//           0
//         );

//         const country_id = shippingAddress?.country_id;

//         const response = await axiosAuth.post("/DeliveryCharge/check", {
//           total_weight: totalWeight.toString(),
//           country_id: country_id?.toString(),
//         });


//         setShippingCost(parseFloat(response.data.shipping_cost));
//       } catch (error) {
//         console.error("Error calculating shipping cost:", error);
//       } finally {
//         setLoading(false);
//       }
//     };
//     const calculateTax = async () => {
//       try {
//         const shippingData = await getUserAddresses(true, false);
//         const zoneId = shippingData.length > 0 ? shippingData[0].zone_id : null;

//         if (zoneId) {
//           // const totalPrice = cartItems.reduce(
//           //   (total, item) => total + item.Product.price * item.quantity,
//           //   0
//           // );
//           // const taxResponse = await axiosAuth.post("/TaxSetting/check", {
//           //   zone_id: zoneId,
//           //   amount: totalPrice.toString(),
//           // });
//           // setTaxAmount(parseFloat(taxResponse.data.tax_amount));
//           // setTaxName(taxResponse.data.tax_name);
//         }
//       } catch (error) {
//         console.error("Error calculating tax:", error);
//       }
//     };

//     if (cartItems.length > 0) {
//       calculateShippingCost();
//       calculateTax();
//     } else {
//       setLoading(false);
//     }
//   }, [cartItems, shippingCost, selectedShippingAddress]);

//   const totalPrice = parseFloat(
//     cartItems
//       .reduce((total, item) => total + item.Product.price * item.quantity, 0)
//       .toFixed(2)
//   );
//   const discountedTotal = discount ? totalPrice - discount : totalPrice;

//   const currency = "₹";

//   console.log(currency);

//   const charges = [
//     {
//       label: `Price (${cartItems.length} items)`,
//       amount: `${currency}${totalPrice}`,
//     },
//     {
//       label: "Delivery Charge",
//       amount: shippingCost
//         ? `${currency}${shippingCost.toFixed(2)}`
//         : `${currency}0.00`,
//     },
//     {
//       label: "Discount",
//       amount: discount
//         ? `- ${currency}${discount.toFixed(2)}`
//         : `${currency} 0.00`,
//     },
//     {
//       label: "Total",
//       amount: `${currency}${(discountedTotal + (shippingCost || 0))
//         .toFixed(2)}`,
//     },
//   ];

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
//         if (shippingData.length)
//           setSelectedShippingAddress(shippingData[0].address_id || 0);
//         if (billingData.length)
//           setSelectedBillingAddress(billingData[0].address_id || 0);
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

//   const handleChangeShipping = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedShippingAddress(parseInt(event.target.value, 10));
//   };

//   const handleChangeBilling = (event: React.ChangeEvent<HTMLInputElement>) => {
//     setSelectedBillingAddress(parseInt(event.target.value, 10));
//   };

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
//       if (shippingData.length)
//         setSelectedShippingAddress(shippingData[0].address_id || 0);
//       if (billingData.length)
//         setSelectedBillingAddress(billingData[0].address_id || 0);
//       handleCloseForm();
//       showSnackbar("Address saved successfully", "success");
//     } catch (error) {
//       console.error("Error adding/updating address:", error);
//       showSnackbar("Failed to save address", "error");
//     }
//   };

//   const visibleShippingAddresses = showAllShippingAddresses
//     ? shippingAddresses
//     : shippingAddresses.slice(0, 1);
//   const visibleBillingAddresses = showAllBillingAddresses
//     ? billingAddresses
//     : billingAddresses.slice(0, 1);

//   const steps: StepAction[] = [
//     {
//       label: "Cart",
//       path: "/cart",
//       action: () =>
//         navigate({
//           pathname: "/cart",
//           search: window.location.search, 
//         }),
//       isAccessible: true,
//     },
//     {
//       label: "Address",
//       path: "/address",
//       action: () =>
//         navigate({
//           pathname: "/address",
//           search: window.location.search, 
//         }),
//       isAccessible: false,
//     },
//     {
//       label: "Checkout",
//       path: "/checkout",
//       action: () =>
//         navigate({
//           pathname: "/checkout",
//           search: window.location.search, 
//         }),
//       isAccessible: false,
//     },
//   ];
//   const isMobile = useMediaQuery(theme.breakpoints.down(400));
//   const { user } = useLogin();

//   const updateCountryPreference = async (location: string) => {
//     const country_type = location === "Outside India" ? "Non-Ind" : "Ind";
//     try {
//       if (user) {
//         await axiosAuth.patch("/Customer/country_preference", {
//           country_type,
//         });
//       }
//       localStorage.setItem("location", location);
//       window.location.reload();
//     } catch (error) {
//       console.error("Error updating country preference:", error);
//     }
//   };
//   const handleContinue = () => {
//     const selectedShippingAddressObj = shippingAddresses.find(
//       (address) => address.address_id === selectedShippingAddress
//     );
//     const location = localStorage.getItem("location");
//     const isOutsideIndia =
//       selectedShippingAddressObj?.WebtagCountry?.name !== "India";
//     const locationCheck = isOutsideIndia
//       ? "Outside India"
//       : selectedShippingAddressObj?.WebtagCountry?.name;

//     if (locationCheck !== location) {
//       setConfirmDialogOpen(true);
//     } else {
//       navigate(
//         {
//           pathname: "/checkout",
//           search: window.location.search, 
//         },
//         {
//           state: {
//             shippingAddressId: selectedShippingAddress,
//             billingAddressId: selectedBillingAddress,
//           },
//         }
//       );
//     }
//   };

//   const handleConfirmDialogClose = (proceed: boolean) => {
//     if (proceed) {
//       const selectedShippingAddressObj = shippingAddresses.find(
//         (address) => address.address_id === selectedShippingAddress
//       );
//       updateCountryPreference(
//         selectedShippingAddressObj?.WebtagCountry?.name === "India"
//           ? "India"
//           : "Outside India"
//       );
//       navigate(
//         {
//           pathname: "/checkout",
//           search: window.location.search,
//         },
//         {
//           state: {
//             shippingAddressId: selectedShippingAddress,
//             billingAddressId: selectedBillingAddress,
//           },
//         }
//       );
//     }
//     setConfirmDialogOpen(false);
//   };

//   const addressContent = (
//     <>
//       <Paper sx={{ boxShadow: "none" }}>
//         <CustomStepper steps={steps} />
//         <Box sx={{ py: 10 }}>
//           <Container>
//             <Grid container spacing={6}>
//               <Grid item xs={12} md={7} lg={7}>
//                 <Stack spacing={2}>
//                   <Typography
//                     sx={{
//                       fontSize: "24px",
//                       fontWeight: 400,
//                       fontFamily: "Vangeda",
//                     }}
//                   >
//                     Address
//                   </Typography>
//                   <Stack spacing={6}>
//                     <Paper
//                       sx={{
//                         p: 4,
//                         boxShadow: "0px 0px 30px 0px #EEEEEE",
//                         borderRadius: 2,
//                         border: "1px solid #EFEFEF",
//                         position: "relative",
//                       }}
//                     >
//                       <Box>
//                         <Stack
//                           direction={"row"}
//                           alignItems={"center"}
//                           justifyContent={"space-between"}
//                         >
//                           <Typography variant="h3">
//                             1. Shipping Address
//                           </Typography>
//                           <Button
//                             variant="outlined"
//                             size="small"
//                             onClick={() => handleOpenForm(true)}
//                           >
//                             Add Address
//                           </Button>
//                           <AddAddressForm
//                             open={isFormOpen}
//                             onClose={handleCloseForm}
//                             onAddAddress={handleAddAddress}
//                             isShippingForm={isShippingForm}
//                             initialData={editAddress}
//                           />
//                         </Stack>
//                         <Divider sx={{ my: 4 }} />
//                         {loadingShipping ? (
//                           <Stack direction="row" justifyContent="center">
//                             <CircularProgress />
//                           </Stack>
//                         ) : shippingAddresses.length === 0 ? (
//                           <Typography textAlign={"center"}>
//                             No shipping addresses found.
//                           </Typography>
//                         ) : (
//                           <RadioGroup
//                             name="shippingAddress"
//                             value={
//                               selectedShippingAddress !== null
//                                 ? selectedShippingAddress.toString()
//                                 : ""
//                             }
//                             onChange={handleChangeShipping}
//                           >
//                             {visibleShippingAddresses.map((address) => (
//                               <CustomFormControlLabel
//                                 key={address.address_id}
//                                 value={address.address_id?.toString()}
//                                 control={<Radio sx={{ py: 0 }} />}
//                                 sx={{ alignItems: "flex-start", py: 3 }}
//                                 label={
//                                   <CustomLabel>
//                                     <strong>
//                                       {address.firstname} {address.lastname}
//                                     </strong>
//                                     <span>
//                                       {address.address_1}, {address.address_2}
//                                     </span>
//                                     <span>
//                                       {address.WebtagCity?.name},{" "}
//                                       {address.WebtagZone?.name},{" "}
//                                       {address.WebtagCountry?.name} -{" "}
//                                       {address.postcode}
//                                     </span>
//                                     <span>Email: {address.email}</span>
//                                     <span>Phone: {address.telephone}</span>
//                                     <EditButton
//                                       variant="text"
//                                       size="small"
//                                       onClick={() =>
//                                         handleOpenForm(true, address)
//                                       }
//                                     >
//                                       Edit
//                                     </EditButton>
//                                   </CustomLabel>
//                                 }
//                               />
//                             ))}
//                           </RadioGroup>
//                         )}
//                         {shippingAddresses.length > 1 && (
//                           <Button
//                             variant="outlined"
//                             color="secondary"
//                             sx={{
//                               width: "100%",
//                               marginTop: 2,
//                               marginRight: 2,
//                               borderRadius: "4px",
//                             }}
//                             onClick={handleToggleViewAllShipping}
//                           >
//                             {showAllShippingAddresses
//                               ? "View Less"
//                               : "View All"}
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 transform: showAllShippingAddresses
//                                   ? "rotate(180deg)"
//                                   : "none",
//                               }}
//                             >
//                               <DownChevron />
//                             </Box>
//                           </Button>
//                         )}
//                       </Box>
//                     </Paper>
//                     <Paper
//                       sx={{
//                         p: 4,
//                         boxShadow: "0px 0px 30px 0px #EEEEEE",
//                         borderRadius: 2,
//                         border: "1px solid #EFEFEF",
//                       }}
//                     >
//                       <Box>
//                         <Stack
//                           direction={"row"}
//                           alignItems={"center"}
//                           justifyContent={"space-between"}
//                         >
//                           <Typography variant="h3">
//                             2. Billing Address
//                           </Typography>

//                           {isMobile ? (
//                             <IconButton
//                               sx={{
//                                 border: `1px solid ${theme.palette.primary.main}`,
//                                 "& > svg path": {
//                                   stroke: theme.palette.primary.main,
//                                 },
//                               }}
//                               size="small"
//                               onClick={() => handleOpenForm(false)}
//                             >
//                               <PlusSuccess />
//                             </IconButton>
//                           ) : (
//                             <Button
//                               variant="outlined"
//                               size="small"
//                               onClick={() => handleOpenForm(false)}
//                             >
//                               Add new address
//                             </Button>
//                           )}
//                           <AddAddressForm
//                             open={isFormOpen}
//                             onClose={handleCloseForm}
//                             onAddAddress={handleAddAddress}
//                             isShippingForm={isShippingForm}
//                             initialData={editAddress}
//                           />
//                         </Stack>
//                         <Divider sx={{ my: 4 }} />
//                         {loadingBilling ? (
//                           <Stack direction="row" justifyContent="center">
//                             <CircularProgress />
//                           </Stack>
//                         ) : billingAddresses.length === 0 ? (
//                           <Typography textAlign={"center"}>
//                             No billing addresses found.
//                           </Typography>
//                         ) : (
//                           <RadioGroup
//                             name="billingAddress"
//                             value={
//                               selectedBillingAddress !== null
//                                 ? selectedBillingAddress.toString()
//                                 : ""
//                             }
//                             onChange={handleChangeBilling}
//                           >
//                             {visibleBillingAddresses.map((address) => (
//                               <CustomFormControlLabel
//                                 key={address.address_id}
//                                 value={address.address_id?.toString()}
//                                 control={<Radio sx={{ py: 0 }} />}
//                                 sx={{ alignItems: "flex-start", py: 3 }}
//                                 label={
//                                   <CustomLabel>
//                                     <strong>
//                                       {address.firstname} {address.lastname}
//                                     </strong>
//                                     <span>
//                                       {address.address_1}, {address.address_2}
//                                     </span>
//                                     <span>
//                                       {address.WebtagCity?.name},{" "}
//                                       {address.WebtagZone?.name},{" "}
//                                       {address.WebtagCountry?.name} -{" "}
//                                       {address.postcode}
//                                     </span>
//                                     <span>Email: {address.email}</span>
//                                     <span>Phone: {address.telephone}</span>
//                                     <EditButton
//                                       variant="text"
//                                       size="small"
//                                       onClick={() =>
//                                         handleOpenForm(false, address)
//                                       }
//                                     >
//                                       Edit
//                                     </EditButton>
//                                   </CustomLabel>
//                                 }
//                               />
//                             ))}
//                           </RadioGroup>
//                         )}
//                         {billingAddresses.length > 1 && (
//                           <Button
//                             variant="outlined"
//                             color="secondary"
//                             sx={{
//                               width: "100%",
//                               marginTop: 2,
//                               marginRight: 2,
//                               borderRadius: "4px",
//                             }}
//                             onClick={handleToggleViewAllBilling}
//                           >
//                             {showAllBillingAddresses ? "View Less" : "View All"}
//                             <Box
//                               sx={{
//                                 display: "flex",
//                                 transform: showAllBillingAddresses
//                                   ? "rotate(180deg)"
//                                   : "none",
//                               }}
//                             >
//                               <DownChevron />
//                             </Box>
//                           </Button>
//                         )}
//                       </Box>
//                     </Paper>
//                   </Stack>
//                 </Stack>
//               </Grid>
//               <Grid
//                 item
//                 xs={12}
//                 md={5}
//                 lg={5}
//                 display={"flex"}
//                 justifyContent={"center"}
//               >
//                 <OrderSummaryBox>
//                   <Stack
//                     height={"100%"}
//                     alignItems={"center"}
//                     justifyContent={"space-between"}
//                   >
//                     <Typography
//                       sx={{
//                         fontFamily: "Vangeda",
//                         fontSize: "24px",
//                         fontWeight: "400",
//                         textAlign: "center",
//                       }}
//                     >
//                       Order Summary
//                     </Typography>
//                     <List sx={{ width: "100%", flex: "0 1 auto" }}>
//                       {charges.map((charge, index) => (
//                         <ListItem
//                           sx={{ px: 0 }}
//                           key={index}
//                           divider={index !== charges.length - 1}
//                         >
//                           <ListItemText
//                             sx={{
//                               display: "flex",
//                               justifyContent: "space-between",
//                               m: 0,
//                             }}
//                             primary={
//                               <Typography
//                                 variant={
//                                   charge.label === "Total" ? "h5" : "subtitle1"
//                                 }
//                                 style={{
//                                   fontWeight:
//                                     charge.label === "Total" ? 700 : 400,
//                                 }}
//                               >
//                                 {charge.label}
//                               </Typography>
//                             }
//                             secondary={
//                               <Typography
//                                 variant={charge.label === "Total" ? "h5" : "h6"}
//                                 style={{
//                                   fontWeight:
//                                     charge.label === "Total" ? 700 : 400,
//                                 }}
//                               >
//                                 {charge.amount}
//                               </Typography>
//                             }
//                           />
//                         </ListItem>
//                       ))}
//                     </List>
//                     <Stack>
//                       <Box sx={{ width: "100%", mb: 1 }}>
//                         <TextField
//                           fullWidth
//                           variant="outlined"
//                           placeholder={appliedCode ? "" : "Discount code"}
//                           value={discountCode}
//                           onChange={(e) => setDiscountCode(e.target.value)}
//                           error={Boolean(errorMessage)}
//                           helperText={errorMessage}
//                           onKeyDown={(e) => {
//                             if (e.key === "Backspace" && appliedCode) {
//                               handleRemoveDiscountCode();
//                             }
//                           }}
//                           disabled={!!appliedCode}
//                           sx={{
//                             "& .MuiOutlinedInput-notchedOutline": {
//                               borderRadius: "30px",
//                             },
//                           }}
//                           InputProps={{
//                             startAdornment: appliedCode && (
//                               <InputAdornment position="start">
//                                 <Chip
//                                   label={appliedCode}
//                                   onDelete={handleRemoveDiscountCode}
//                                   deleteIcon={<XCircle />}
//                                   sx={{ mr: 1 }}
//                                 />
//                               </InputAdornment>
//                             ),
//                             endAdornment: (
//                               <InputAdornment position="end">
//                                 <Button
//                                   variant="contained"
//                                   onClick={handleApplyDiscountCode}
//                                   disabled={!discountCode}
//                                 >
//                                   Apply
//                                 </Button>
//                               </InputAdornment>
//                             ),
//                           }}
//                         />
//                       </Box>
//                     </Stack>
//                     <Button
//                       onClick={handleContinue}
//                       sx={{ minWidth: 150 }}
//                       variant="contained"
//                       disabled={
//                         !selectedShippingAddress || !selectedBillingAddress
//                       }
//                     >
//                       Continue
//                     </Button>
//                   </Stack>
//                 </OrderSummaryBox>
//               </Grid>
//             </Grid>
//           </Container>
//         </Box>
//       </Paper>
//       <CouponsDialog
//         open={couponsDialogOpen}
//         onClose={() => setCouponsDialogOpen(false)}
//         totalAmount={totalPrice}
//       />
//       <Dialog
//         open={confirmDialogOpen}
//         onClose={() => handleConfirmDialogClose(false)}
//         sx={{
//           zIndex: "99999999",
//           "& .MuiDialog-paper": {
//             borderRadius: "20px",
//             padding: { xs: 0, md: 4 },
//           },
//         }}
//       >
//         <DialogContent>
//           <Stack spacing={2}>
//             <Stack spacing={1}>
//               <Typography
//                 textAlign={"center"}
//                 color="text.primary"
//                 variant="b20"
//               >
//                 Currency Mismatch: Confirm Shipping Address
//               </Typography>
//               <Typography
//                 textAlign={"center"}
//                 color="text.secondary"
//                 variant="m14"
//               >
//                 The country of the shipping address does not match the currency
//                 selected. Do you want to proceed with the current shipping
//                 address country?
//               </Typography>
//             </Stack>
//           </Stack>
//         </DialogContent>
//         <DialogActions sx={{ justifyContent: "center" }}>
//           <Button
//             onClick={() => handleConfirmDialogClose(false)}
//             color="primary"
//             variant="outlined"
//           >
//             Cancel
//           </Button>
//           <Button
//             onClick={() => handleConfirmDialogClose(true)}
//             color="primary"
//             autoFocus
//             variant="contained"
//           >
//             Continue
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
//   return shouldHideLayout ? (
//     <>{addressContent}</>
//   ) : (
//     <>{addressContent}</>
//   );
// };

// export default AddressComponent;
