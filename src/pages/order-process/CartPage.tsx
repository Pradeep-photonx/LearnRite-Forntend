// import React, { useEffect, useState } from "react";
// import CartItem from "../../components/CartItem";
// import CustomStepper, { StepAction } from "../../components/CustomStepper";
// import { useNavigate } from "react-router-dom";
// import Layout from "../../layouts/Layout";
// import {
//   Box,
//   Button,
//   Container,
//   Grid,
//   Paper,
//   Stack,
//   Typography,
//   styled,
//   List,
//   ListItem,
//   ListItemText,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   IconButton,
//   DialogTitle,
//   TextField,
//   Chip,
//   InputAdornment,
// } from "@mui/material";
// import designBoard from "../../assets/graphics/designBoard.svg";
// import { useCart } from "../../context/CartContext";
// import { XCircle } from "../../assets/react-icons/CommonIcons";
// import theme from "../../Theme";
// import CouponsDialog from "../../components/CouponsDialog";
// import { useCoupons } from "../../context/CouponContext";
// import { getUserAddresses } from "../../services/addressService";

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
//     backgroundImage: "none",
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
// const CartPage: React.FC = () => {
//   const navigate = useNavigate();
//   const { cartItems, updateCart, removeFromCart } = useCart();
//   const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
//   const [discountCode, setDiscountCode] = useState("");
//   const { appliedCode, discount, applyCoupon, removeCoupon, errorMessage } =
//     useCoupons();
//   const [couponsDialogOpen, setCouponsDialogOpen] = useState(false);
//   const [, setLoading] = useState(true);
//   const [shouldHideLayout, setShouldHideLayout] = useState(false);

//   useEffect(() => {
//     const hideLayoutFromQuery =
//       new URLSearchParams(location.search).get("hideLayout") === "true";
//     setShouldHideLayout(hideLayoutFromQuery);
//   }, [location.search]);



//   useEffect(() => {

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
//       calculateTax();
//     } else {
//       setLoading(false);
//     }
//   }, [cartItems]);

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
//   const handlecheckDiscountCode = async () => {
//     try {
//       if (appliedCode) {
//         const totalAmount = parseFloat(
//           cartItems
//             .reduce(
//               (total, item) => total + item.Product.price * item.quantity,
//               0
//             )
//             .toFixed(2)
//         );
//         await applyCoupon(totalAmount, appliedCode);

//         if (errorMessage) {
//           console.log(errorMessage); 
//           removeCoupon(); 
//           return;
//         }

//         navigate({
//           pathname: "/address",
//           search: location.search, 
//         });
//       } else {
//         navigate({
//           pathname: "/address",
//           search: location.search, 
//         });
//       }
//     } catch (error) {
//       console.error("Error applying coupon:", error);
//     }
//   };

//   const handleRemoveDiscountCode = () => {
//     removeCoupon();
//   };

//   const steps: StepAction[] = [
//     {
//       label: "Cart",
//       path: "/cart",
//       action: () =>
//         navigate({
//           pathname: "/cart",
//           search: location.search,
//         }),
//       isAccessible: false,
//     },
//     {
//       label: "Address",
//       path: "/address",
//       action: () =>
//         navigate({
//           pathname: "/address",
//           search: location.search,
//         }),
//       isAccessible: false,
//     },
//     {
//       label: "Checkout",
//       path: "/checkout",
//       action: () =>
//         navigate({
//           pathname: "/checkout",
//           search: location.search,
//         }),
//       isAccessible: false,
//     },
//   ];

//   const handleDelete = async (id: number) => {
//     try {
//       await removeFromCart(id);
//     } catch (error) {
//       console.error("Error removing item from cart:", error);
//     }
//   };

//   const handleIncrement = async (id: number) => {
//     const item = cartItems.find((item) => item.cart_product_id === id);
//     if (item) {
//       const newQuantity = item.quantity / item.unit_type;
//       try {
//         await updateCart(item.product_id, newQuantity + 1, item.unit_type);
//       } catch (error) {
//         console.error("Error incrementing item quantity:", error);
//       }
//     }
//   };

//   const handleDecrement = async (id: number) => {
//     const item = cartItems.find((item) => item.cart_product_id === id);
//     if (item && item.quantity / item.unit_type > 1) {
//       const newQuantity = item.quantity / item.unit_type;

//       try {
//         await updateCart(item.product_id, newQuantity - 1, item.unit_type);
//       } catch (error) {
//         console.error("Error decrementing item quantity:", error);
//       }
//     } else if (item && item.quantity / item.unit_type === 1) {
//       setConfirmDelete(id);
//     }
//   };

//   const handleConfirmDelete = async () => {
//     if (confirmDelete !== null) {
//       await handleDelete(confirmDelete);
//       setConfirmDelete(null);
//     }
//   };

//   if (cartItems.length === 0) {
//     const hideLayoutFromQuery =
//       new URLSearchParams(window.location.search).get("hideLayout") === "true";

//     const noItemsContent = (
//       <Container sx={{ textAlign: "center", mt: 10 }}>
//         <Typography variant="h4" gutterBottom>
//           No items in cart
//         </Typography>
//         <Button variant="contained" onClick={() => navigate("/")}>
//           Continue Shopping
//         </Button>
//       </Container>
//     );

//     return hideLayoutFromQuery ? (
//       noItemsContent
//     ) : (
//       <Layout>{noItemsContent}</Layout>
//     );
//   }

//   const totalPrice = parseFloat(
//     cartItems
//       .reduce((total, item) => total + item.Product.price * item.quantity, 0)
//       .toFixed(2)
//   );
//   const discountedTotal = discount ? totalPrice - discount : totalPrice;

//   // const currency = cartItems[0]?.Product?.currency;
//   const currency = "₹";
//   const charges = [
//     {
//       label: `Price (${cartItems.length} items)`,
//       amount: `${currency}${totalPrice}`,
//     },
//     {
//       label: "Discount",
//       amount: discount
//         ? `- ${currency}${discount.toFixed(2)}`
//         : `${currency} 0.00`,
//     },
//     {
//       label: "Total",
//       amount: `${currency}${discountedTotal
//         .toFixed(2)}`,
//     },
//   ];

//   const cartContent = (
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
//                     Your cart
//                   </Typography>
//                   <Paper
//                     sx={{
//                       px: 4,
//                       py: 2,
//                       boxShadow: "0px 0px 30px 0px #EEEEEE",
//                       borderRadius: 2,
//                       border: "1px solid #EFEFEF",
//                       position: "relative",
//                     }}
//                   >
//                     {cartItems.map((product) => (
//                       <CartItem
//                         key={product.cart_product_id}
//                         id={product.cart_product_id}
//                         imageUrl={product.Product.image}
//                         title={product.product_name}
//                         price={product.Product?.price}
//                         totalPrice={product.total_price}
//                         unit_type={product.unit_type}
//                         // currency={product.Product?.currency}
//                         currency={currency}
//                         quantity={product.quantity / product.unit_type}
//                         onDelete={handleDelete}
//                         onIncrement={handleIncrement}
//                         onDecrement={handleDecrement}
//                       />
//                     ))}
//                   </Paper>
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
//                       onClick={handlecheckDiscountCode}
//                       sx={{ minWidth: 150 }}
//                       variant="contained"
//                       disabled={cartItems.length === 0 && !appliedCode}
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

//       <Dialog
//         maxWidth="xs"
//         sx={{ zIndex: "9998" }}
//         fullWidth
//         open={confirmDelete !== null}
//         onClose={() => setConfirmDelete(null)}
//       >
//         <DialogTitle sx={{ py: 2, paddingRight: 2 }} component={"div"}>
//           <Stack
//             direction={"row"}
//             alignItems={"center"}
//             justifyContent={"space-between"}
//           >
//             <Typography variant="h3">Delete item</Typography>
//             <IconButton onClick={() => setConfirmDelete(null)} size="small">
//               <XCircle />
//             </IconButton>
//           </Stack>
//         </DialogTitle>
//         <DialogContent>
//           <DialogContentText sx={{ ...theme.typography.sb14 }}>
//             Are you sure you want to delete this item from your cart?
//           </DialogContentText>
//         </DialogContent>
//         <DialogActions>
//           <Button
//             variant="contained"
//             onClick={() => setConfirmDelete(null)}
//             color="error"
//           >
//             Cancel
//           </Button>
//           <Button
//             variant="outlined"
//             onClick={handleConfirmDelete}
//             color="error"
//           >
//             Delete
//           </Button>
//         </DialogActions>
//       </Dialog>
//       <CouponsDialog
//         open={couponsDialogOpen}
//         onClose={() => setCouponsDialogOpen(false)}
//         totalAmount={totalPrice}
//       />
//     </>
//   );
//   return shouldHideLayout ? <>{cartContent}</> : <>{cartContent}</>;
// };

// export default CartPage;
