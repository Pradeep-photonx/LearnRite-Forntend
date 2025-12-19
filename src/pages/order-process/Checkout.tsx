// import React, { useState, useEffect, useCallback } from "react";
// import { useNavigate, useLocation } from "react-router-dom";
// import {
//   Box,
//   Button,
//   Container,
//   Dialog,
//   DialogActions,
//   DialogContent,
//   DialogContentText,
//   DialogTitle,
//   Divider,
//   Grid,
//   IconButton,
//   List,
//   ListItem,
//   ListItemText,
//   Paper,
//   Stack,
//   Typography,
//   CircularProgress,
//   Chip,
//   TextField,
//   InputAdornment,
// } from "@mui/material";
// import { styled } from "@mui/system";
// import designBoard from "../../assets/graphics/designBoard.svg";
// import { useCart } from "../../context/CartContext";
// import { XCircle } from "../../assets/react-icons/CommonIcons";
// import theme from "../../Theme";
// import { getUserAddresses } from "../../services/addressService";
// import { placeOrder, updateOrderStatus } from "../../services/orderService";
// import { IAddress } from "../../types/interfaces";
// import { useSnackbar } from "../../context/SnackbarContext";
// import CustomStepper, { StepAction } from "../../components/CustomStepper";
// import Layout from "../../layouts/Layout";
// import CartItem from "../../components/CartItem";
// import {
//   loadRazorpayScript,
//   createRazorpayOptions,
// } from "../../utils/razorpayUtils";
// import { RazorpayPaymentResponse, RazorpayOptions } from "../../types/razorpay";
// import { useLogin } from "../../context/LoginContext";
// import { deleteCart, getCartItems } from "../../services/cartService";
// import CryptoJS from "crypto-js";
// import CouponsDialog from "../../components/CouponsDialog";
// import { useCoupons } from "../../context/CouponContext";
// import axiosAuth from "../../axios/axiosAuth";

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

// const ENCRYPTION_KEY = "your-encryption-key";

// const encryptData = (data: string) => {
//   return CryptoJS.AES.encrypt(data, ENCRYPTION_KEY).toString();
// };

// const decryptData = (ciphertext: string) => {
//   const bytes = CryptoJS.AES.decrypt(ciphertext, ENCRYPTION_KEY);
//   return bytes.toString(CryptoJS.enc.Utf8);
// };

// const Checkout: React.FC = () => {
//   const navigate = useNavigate();
//   const location = useLocation();
//   const { shippingAddressId, billingAddressId } = location.state || {};
//   const [shippingAddress, setShippingAddress] = useState<IAddress | null>(null);
//   const [billingAddress, setBillingAddress] = useState<IAddress | null>(null);
//   const { cartItems, updateCart, removeFromCart, clearCart } = useCart();
//   const [confirmDelete, setConfirmDelete] = useState<number | null>(null);
//   const [loadingAddresses, setLoadingAddresses] = useState<boolean>(true);
//   const [placingOrder, setPlacingOrder] = useState<boolean>(false);
//   const { showSnackbar } = useSnackbar();
//   const { user } = useLogin();
//   const [, setOrderId] = useState<number | null>(null);
//   const [, setRazorpayOrderId] = useState<string | null>(null);
//   const [discountCode, setDiscountCode] = useState("");
//   const {
//     appliedCode,
//     discount,
//     applyCoupon,
//     removeCoupon,
//     errorMessage,
//     checkCoupon,
//   } = useCoupons();
//   const [couponsDialogOpen, setCouponsDialogOpen] = useState(false);
//   const [shouldHideLayout, setShouldHideLayout] = useState(false);


//   const [quantityError, setQuantityError] = useState("");


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
//   console.log(appliedCode);

//   cartItems.forEach((item) => {
//     console.log(typeof parseFloat(item.quantity.toString()), item.quantity);
//   });

//   // console.log(totalQuantity)

//   const handlecheckDiscountCode = async () => {
//     const totalQuantity = cartItems.reduce(
//       (sum, item) => sum + parseFloat(item.quantity.toString()),
//       0
//     );

//     if (totalQuantity > 50) {
//       setQuantityError(
//         "Cannot offer more than 50kgs right now. If you want to order in bulk, please contact us."
//       );
//       return;
//     } else {
//       setQuantityError(""); 
//     }



//     if (!appliedCode) {
//       placeOrderWithConfirmation(); 
//       return;
//     }

//     const totalAmount = parseFloat(
//       cartItems
//         .reduce((total, item) => total + item.Product.price * item.quantity, 0)
//         .toFixed(2)
//     );

//     try {
//       const isValid = await checkCoupon(totalAmount, appliedCode);
//       if (!isValid) {
//         console.error(errorMessage);
//         removeCoupon();
//         return;
//       }

//       placeOrderWithConfirmation(); 
//     } catch (error) {
//       console.error("Error during coupon check:", error);
//       showSnackbar("Failed to validate coupon. Please try again.", "error");
//     }
//   };

//   const handleRemoveDiscountCode = () => {
//     removeCoupon();
//   };
//   useEffect(() => {
//     const fetchAddresses = async () => {
//       try {
//         const shippingData = await getUserAddresses(true, false);
//         const billingData = await getUserAddresses(false, true);
//         const shippingAddress =
//           shippingData.find(
//             (address: IAddress) => address.address_id === shippingAddressId
//           ) || null;
//         const billingAddress =
//           billingData.find(
//             (address: IAddress) => address.address_id === billingAddressId
//           ) || null;

//         setShippingAddress(shippingAddress);
//         setBillingAddress(billingAddress);
//       } catch (error) {
//         console.error("Error fetching addresses:", error);
//       } finally {
//         setLoadingAddresses(false);
//       }
//     };
//     fetchAddresses();
//   }, [shippingAddressId, billingAddressId]);

//   useEffect(() => {
//     const storedMessage = localStorage.getItem("snackbarMessage");
//     if (storedMessage) {
//       showSnackbar(storedMessage, "error");
//       localStorage.removeItem("snackbarMessage");
//     }
//   }, [showSnackbar]);

//   const steps: StepAction[] = [
//     {
//       label: "Cart",
//       path: "/cart",
//       action: () =>
//         navigate({
//           pathname: "/cart",
//           search: location.search,
//         }),
//       isAccessible: true,
//     },
//     {
//       label: "Address",
//       path: "/address",
//       action: () =>
//         navigate({
//           pathname: "/address",
//           search: location.search,
//         }),
//       isAccessible: true,
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
//     } catch {
//       console.error("Error removing item from cart");
//     }
//   };

//   const handleIncrement = async (id: number) => {
//     const item = cartItems.find((item) => item.cart_product_id === id);
//     if (item) {
//       const newQuantity = item.quantity / item.unit_type;

//       try {
//         await updateCart(item.product_id, newQuantity + 1, item.unit_type);
//       } catch {
//         console.error("Error incrementing item quantity");
//       }
//     }
//   };

//   const handleDecrement = async (id: number) => {
//     const item = cartItems.find((item) => item.cart_product_id === id);
//     if (item && item.quantity / item.unit_type > 1) {
//       const newQuantity = item.quantity / item.unit_type;
//       try {
//         await updateCart(item.product_id, newQuantity - 1, item.unit_type);
//       } catch {
//         console.error("Error decrementing item quantity");
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
//   const [confirmDialogOpen, setConfirmDialogOpen] = useState(false);

//   const handleConfirmDialogClose = (proceed: boolean) => {
//     if (proceed) {
//       updateCountryPreference(
//         shippingAddress?.WebtagCountry?.name === "India"
//           ? "India"
//           : "Outside India"
//       );
//       placeOrderWithConfirmation();
//     }
//     setConfirmDialogOpen(false);
//   };
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
//   const handlePlaceOrder = async () => {
//     if (!shippingAddress || !billingAddress || !user) return;

//     setPlacingOrder(true);
//     try {
//       // new code
//       const products = cartItems.map((item) => ({
//         product_id: item.product_id,
//         quantity: item.quantity / item.unit_type,
//         unit_type: item.unit_type,
//       }));


//       const couponCode = appliedCode || undefined;

//       console.log(
//         "Products:payload",
//         products,
//         shippingAddress.address_id,
//         billingAddress.address_id,
//         couponCode
//       );

//       const { order, razorOrder } = await placeOrder(
//         products,
//         shippingAddress.address_id!,
//         billingAddress.address_id!,
//         couponCode
//       );


//       if (!order.order_id || !razorOrder.id) {
//         throw new Error("Failed to get order ID or Razorpay order ID");
//       }

//       setOrderId(order.order_id);
//       setRazorpayOrderId(razorOrder.id);

//       // Encrypt and store order ID in local storage
//       const encryptedOrderId = encryptData(order.order_id.toString());
//       localStorage.setItem("order_id", encryptedOrderId);

//       const scriptLoaded = await loadRazorpayScript();

//       if (!scriptLoaded) {
//         showSnackbar("Razorpay SDK failed to load. Please try again.", "error");
//         return;
//       }

//       const options: RazorpayOptions = createRazorpayOptions(
//         razorOrder.id,
//         razorOrder.amount,
//         razorOrder.currency,
//         user,
//         billingAddress,
//         handlePaymentSuccess
//       );

//       options.notes = {
//         address: `${billingAddress.address_1}, ${billingAddress.address_2}, ${billingAddress.city_id}, ${billingAddress.zone_id}, ${billingAddress.country_id}`,
//         order_id: order.order_id.toString(),
//       };

//       options.image =
//         "https://www.swagruhafoods.net/assets/images/home/logo.png";

//       const rzp = new window.Razorpay(options);
//       rzp.on("payment.failed", handlePaymentFailure);
//       rzp.open();
//     } catch (error) {
//       showSnackbar("Failed to place order. Please try again.", "error");
//     } finally {
//       setPlacingOrder(false);
//     }
//   };
//   const placeOrderWithConfirmation = async () => {
//     const location = localStorage.getItem("location");
//     const isOutsideIndia = shippingAddress?.WebtagCountry?.name !== "India";
//     const locationCheck = isOutsideIndia
//       ? "International"
//       : shippingAddress?.WebtagCountry?.name;

//     if (locationCheck !== location) {
//       setConfirmDialogOpen(true);
//     } else {
//       await handlePlaceOrder();
//     }
//   };
//   const handlePaymentSuccess = async (response: RazorpayPaymentResponse) => {
//     const encryptedOrderId = localStorage.getItem("order_id");

//     if (!encryptedOrderId) {
//       showSnackbar("Order ID is missing. Please contact support.", "error");
//       return;
//     }

//     const orderId = parseInt(decryptData(encryptedOrderId));

//     try {
//       const paymentStatus = response.razorpay_payment_id ? 2 : 10;
//       await updateOrderStatus(orderId, paymentStatus);
//       showSnackbar("Payment successful. Order placed.", "success");
//       const cartResponse = await getCartItems();
//       if (cartResponse.length > 0) {
//         const cartId = cartResponse[0].cart_id;
//         await deleteCart(cartId);
//       }
//       clearCart();
//       navigate("/", { state: { fromCheckout: true } });
//     } catch {
//       showSnackbar(
//         "Failed to update order status. Please contact support.",
//         "error"
//       );
//     } finally {
//       localStorage.removeItem("order_id");
//     }
//   };

//   const handlePaymentFailure = useCallback(async () => {
//     const encryptedOrderId = localStorage.getItem("order_id");

//     if (encryptedOrderId) {
//       const orderId = parseInt(decryptData(encryptedOrderId));

//       try {
//         console.log("Updating order status to failed for Order ID:", orderId);
//         await updateOrderStatus(orderId, 10); 
//       } catch (error) {
//         console.error("Update Order Status Error:", error);
//         showSnackbar(
//           "Failed to update order status after payment failure. Please contact support.",
//           "error"
//         );
//       } finally {
//         localStorage.removeItem("order_id");
//       }
//     }
//     localStorage.setItem(
//       "snackbarMessage",
//       "Payment failed. Please try again."
//     );
//     window.location.reload(); 
//   }, [showSnackbar]);

//   const [shippingCost, setShippingCost] = useState<number | null>(null);
//   const [, setLoading] = useState(true);

//   useEffect(() => {
//     const calculateShippingCost = async () => {
//       try {
//         const totalWeight = cartItems.reduce(
//           (total, item) =>
//             total + (parseFloat(item.quantity as unknown as string) || 0), 
//           0
//         );

//         console.log("totalWeight", totalWeight);


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
//   }, [cartItems, shippingCost, shippingAddress?.country_id]);

//   // NEW CODE

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

//   console.log(shippingCost);

//   const totalPrice = parseFloat(
//     cartItems
//       .reduce((total, item) => total + item.Product.price * item.quantity, 0)
//       .toFixed(2)
//   );
//   const discountedTotal = discount ? totalPrice - discount : totalPrice;

//   const currency = "₹";
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

//   const checkoutContent = (
//     <>
//       <Paper sx={{ boxShadow: "none" }}>
//         <CustomStepper steps={steps} />
//         <Box sx={{ py: 10 }}>
//           <Container>
//             <Grid container spacing={6}>
//               <Grid item xs={12} md={7} lg={7}>
//                 <Stack spacing={4}>
//                   <Typography
//                     sx={{
//                       fontSize: "24px",
//                       fontWeight: 400,
//                       fontFamily: "Vangeda",
//                     }}
//                   >
//                     Checkout
//                   </Typography>
//                   <Stack spacing={3}>
//                     <Box>
//                       <Grid container spacing={4}>
//                         <Grid item xs={12} md={6}>
//                           <Paper
//                             sx={{
//                               p: 4,
//                               boxShadow: "0px 0px 30px 0px #EEEEEE",
//                               borderRadius: 2,
//                               border: "1px solid #EFEFEF",
//                               position: "relative",
//                             }}
//                           >
//                             <Stack
//                               direction={"row"}
//                               alignItems={"center"}
//                               justifyContent={"space-between"}
//                             >
//                               <Typography variant="h3">
//                                 Shipping Address
//                               </Typography>
//                             </Stack>
//                             <Divider sx={{ my: 3 }} />
//                             {loadingAddresses ? (
//                               <CircularProgress />
//                             ) : shippingAddress ? (
//                               <Stack spacing={1} alignItems={"flex-start"}>
//                                 <Typography variant="h4">
//                                   {shippingAddress.firstname}{" "}
//                                   {shippingAddress.lastname}
//                                 </Typography>
//                                 <Typography variant="body1">
//                                   {shippingAddress.address_1},{" "}
//                                   {shippingAddress.address_2}
//                                 </Typography>
//                                 <Typography variant="body1">
//                                   {shippingAddress.WebtagCity?.name},{" "}
//                                   {shippingAddress.WebtagZone?.name},{" "}
//                                   {shippingAddress.WebtagCountry?.name} -{" "}
//                                   {shippingAddress.postcode}
//                                 </Typography>
//                                 <Typography variant="body1">
//                                   Email: {shippingAddress.email}
//                                 </Typography>
//                                 <Typography variant="body1">
//                                   Phone: {shippingAddress.telephone}
//                                 </Typography>
//                                 <Button
//                                   sx={{}}
//                                   variant="text"
//                                   onClick={() => navigate("/address")}
//                                 >
//                                   Change
//                                 </Button>
//                               </Stack>
//                             ) : (
//                               <Typography variant="body1">
//                                 No shipping address found.
//                               </Typography>
//                             )}
//                           </Paper>
//                         </Grid>
//                         <Grid item xs={12} md={6}>
//                           <Paper
//                             sx={{
//                               p: 4,
//                               boxShadow: "0px 0px 30px 0px #EEEEEE",
//                               borderRadius: 2,
//                               border: "1px solid #EFEFEF",
//                               position: "relative",
//                             }}
//                           >
//                             <Stack
//                               direction={"row"}
//                               alignItems={"center"}
//                               justifyContent={"space-between"}
//                             >
//                               <Typography variant="h3">
//                                 Billing Address
//                               </Typography>
//                             </Stack>
//                             <Divider sx={{ my: 3 }} />
//                             {loadingAddresses ? (
//                               <CircularProgress />
//                             ) : billingAddress ? (
//                               <Stack spacing={1} alignItems={"flex-start"}>
//                                 <Typography variant="h4">
//                                   {billingAddress.firstname}{" "}
//                                   {billingAddress.lastname}
//                                 </Typography>
//                                 <Typography variant="body1">
//                                   {billingAddress.address_1},{" "}
//                                   {billingAddress.address_2}
//                                 </Typography>
//                                 <Typography variant="body1">
//                                   {billingAddress.WebtagCity?.name},{" "}
//                                   {billingAddress.WebtagZone?.name},{" "}
//                                   {billingAddress.WebtagCountry?.name} -{" "}
//                                   {billingAddress.postcode}
//                                 </Typography>
//                                 <Typography variant="body1">
//                                   Email: {billingAddress.email}
//                                 </Typography>
//                                 <Typography variant="body1">
//                                   Phone: {billingAddress.telephone}
//                                 </Typography>
//                                 <Button
//                                   sx={{}}
//                                   variant="text"
//                                   onClick={() => navigate("/address")}
//                                 >
//                                   Change
//                                 </Button>
//                               </Stack>
//                             ) : (
//                               <Typography variant="body1">
//                                 No billing address found.
//                               </Typography>
//                             )}
//                           </Paper>
//                         </Grid>
//                       </Grid>
//                     </Box>
//                     <Paper
//                       sx={{
//                         p: 4,
//                         boxShadow: "0px 0px 30px 0px #EEEEEE",
//                         borderRadius: 2,
//                         border: "1px solid #EFEFEF",
//                         position: "relative",
//                       }}
//                     >
//                       <Stack
//                         direction={"row"}
//                         alignItems={"center"}
//                         justifyContent={"space-between"}
//                       >
//                         <Typography variant="h3">Your Cart</Typography>
//                       </Stack>
//                       <Divider sx={{ my: 3 }} />
//                       <Box>
//                         {cartItems.map((product) => (
//                           <CartItem
//                             key={product.cart_product_id}
//                             id={product.cart_product_id}
//                             imageUrl={product.Product.image}
//                             title={product.product_name}
//                             price={product.Product?.price}
//                             quantity={product.quantity / product.unit_type}
//                             currency={currency}
//                             totalPrice={product.total_price}
//                             unit_type={product.unit_type}
//                             onDelete={handleDelete}
//                             onIncrement={handleIncrement}
//                             onDecrement={handleDecrement}
//                           />
//                         ))}
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
//                           error={Boolean(errorMessage)}
//                           helperText={errorMessage}
//                           onChange={(e) => setDiscountCode(e.target.value)}
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
//                       disabled={
//                         placingOrder ||
//                         !shippingAddress ||
//                         !billingAddress ||
//                         cartItems.length === 0
//                       }
//                     >
//                       {placingOrder ? (
//                         <CircularProgress size={24} />
//                       ) : (
//                         "Place Order"
//                       )}
//                     </Button>
//                     {quantityError && (
//                       <Typography color="error" variant="body2" sx={{ mt: 1 }}>
//                         {quantityError}
//                       </Typography>
//                     )}
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
//             variant="contained"
//             autoFocus
//           >
//             Continue
//           </Button>
//         </DialogActions>
//       </Dialog>
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
//             variant="contained"
//             autoFocus
//           >
//             Continue
//           </Button>
//         </DialogActions>
//       </Dialog>
//     </>
//   );
//   return shouldHideLayout ? (
//     <>{checkoutContent}</>
//   ) : (
//     <>{checkoutContent}</>
//   );
// };

// export default Checkout;
