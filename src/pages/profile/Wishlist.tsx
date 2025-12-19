// import React, { useEffect, useState } from "react";
// import ProfileSideMenu from "./ProfileSideMenu";
// import {
//   Box,
//   Button,
//   Card,
//   Container,
//   Dialog,
//   DialogContent,
//   Divider,
//   Grid,
//   IconButton,
//   Paper,
//   Stack,
//   Typography,
//   useMediaQuery,
// } from "@mui/material";
// import { WishlistItem } from "../../types/interfaces";
// import { useWishlist } from "../../context/WishlistContext";
// import { useCart } from "../../context/CartContext";

// import theme from "../../Theme";
// import { CartWhite, TrashError } from "../../assets/react-icons/CommonIcons";
// import { useNavigate } from "react-router-dom";
// import ImageLoader from "../../components/ImageLoader";

// const Wishlist: React.FC = () => {
//   const isMd = useMediaQuery(theme.breakpoints.up("md"));
//   const { wishlist, removeFromWishlist, addWishlistToCart, refreshWishlist } =
//     useWishlist();
//   const navigate = useNavigate();

//   const [isAbove50, setIsAbove50] = useState<boolean>(false);
//   const [shake, setShake] = useState(false);
//   const { cartItems } = useCart();

//   useEffect(() => {
//     refreshWishlist(); 
//   }, []);

//   const handleContinueShopping = () => {
//     navigate("/");
//   };

//   const handleAddWishlistToCart = (item: WishlistItem) => {
//     const totalQuantity = cartItems.reduce(
//       (sum, item) => sum + parseFloat(item.quantity.toString()),
//       0
//     );
//     console.log("totalQuantity before increment:", totalQuantity); 

//     if (totalQuantity > 49.5) {
//       setIsAbove50(true);
//       return;
//     }

//     addWishlistToCart(item);
//   };
//   const handleBackdropClick = () => {
//     setShake(true);
//     setTimeout(() => setShake(false), 500);
//   };

//   const handleAbove50Dialogue = () => {
//     setIsAbove50(false);
//   };
//   const shakeAnimation = {
//     animation: "shake 0.5s",
//     "@keyframes shake": {
//       "0%": { transform: "translate(1px, 1px) rotate(0deg)" },
//       "10%": { transform: "translate(-1px, -2px) rotate(-1deg)" },
//       "20%": { transform: "translate(-3px, 0px) rotate(1deg)" },
//       "30%": { transform: "translate(3px, 2px) rotate(0deg)" },
//       "40%": { transform: "translate(1px, -1px) rotate(1deg)" },
//       "50%": { transform: "translate(-1px, 2px) rotate(-1deg)" },
//       "60%": { transform: "translate(-3px, 1px) rotate(0deg)" },
//       "70%": { transform: "translate(3px, 1px) rotate(-1deg)" },
//       "80%": { transform: "translate(-1px, -1px) rotate(1deg)" },
//       "90%": { transform: "translate(1px, 2px) rotate(0deg)" },
//       "100%": { transform: "translate(1px, -2px) rotate(-1deg)" },
//     },
//   };


//   return (
//     <>
//       <Dialog
//         open={isAbove50}
//         fullWidth
//         maxWidth="sm"
//         aria-labelledby="user-location-dialog-title"
//         aria-describedby="user-location-dialog-description"
//         sx={{
//           zIndex: "99999999",
//           "& .MuiDialog-paper": {
//             borderRadius: "20px",
//             padding: { xs: 0, md: 4 },
//             ...(shake ? shakeAnimation : {}),
//           },
//         }}
//         onClose={handleBackdropClick}
//       >
//         <DialogContent>
//           <Stack spacing={8}>
//             <Stack spacing={2}>
//               <Stack spacing={1}>
//                 <Typography
//                   textAlign={"center"}
//                   color="text.primary"
//                   variant="b20"
//                 >
//                   Alert: Exceeded Weight limit
//                 </Typography>
//                 <Typography
//                   textAlign={"center"}
//                   color="text.secondary"
//                   variant="m14"
//                 >
//                   Orders cannot exceed 50 kgs. For bulk requests, please contact
//                   us.{" "}
//                 </Typography>
//               </Stack>
//             </Stack>
//             <Stack spacing={3}>
//               <Button
//                 onClick={handleAbove50Dialogue}
//                 color="primary"
//                 variant="outlined"
//                 fullWidth
//                 sx={{
//                   borderColor: theme.palette.secondary.main,
//                   borderSize: 2,
//                   color: theme.palette.text.primary,
//                   fontWeight: 600,
//                   fontSize: 16,
//                   lineHeight: "24px",
//                   "&:hover": {
//                     borderColor: theme.palette.secondary.main,
//                   },
//                 }}
//               >
//                 Okay
//               </Button>
//             </Stack>
//           </Stack>
//         </DialogContent>
//       </Dialog>

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
//                       My wishlist
//                     </Typography>
//                   </Stack>
//                   <Box>
//                     <Divider sx={{ py: 1.5 }} />
//                   </Box>
//                   <Box py={4}>
//                     {wishlist.length === 0 ? (
//                       <Box textAlign="center">
//                         <Typography variant="h6" gutterBottom>
//                           No items in wishlist
//                         </Typography>
//                         <Button
//                           variant="contained"
//                           color="primary"
//                           onClick={handleContinueShopping}
//                         >
//                           Continue Shopping
//                         </Button>
//                       </Box>
//                     ) : (
//                       <Stack spacing={4}>
//                         {wishlist.map((item: WishlistItem) => (
//                           <Card
//                             key={item.wishlist_id}
//                             sx={{
//                               display: "flex",
//                               alignItems: { xs: "center", sm: "center" },
//                               p: 4,
//                               boxShadow: "none",
//                               border: "1px solid #F5F1F1",
//                             }}
//                           >
//                             {item.Product ? (
//                               <Grid container spacing={2}>
//                                 <Grid item xs={12} sm={3} md={2}>
//                                   <ImageLoader
//                                     src={item.Product.image}
//                                     alt={item.Product.name}
//                                     width={100}
//                                     height={100}
//                                     borderRadius={2}
//                                   />
//                                 </Grid>

//                                 <Grid item xs={12} sm={9} md={10}>
//                                   <Grid container spacing={2}>
//                                     {/* Product Name */}
//                                     <Grid item xs={6} md={3}>
//                                       <Typography
//                                         variant="subtitle2"
//                                         color="textSecondary"
//                                       >
//                                         Product Name
//                                       </Typography>
//                                       <Typography variant="subtitle1">
//                                         {item.Product.name}
//                                       </Typography>
//                                     </Grid>

//                                     <Grid item xs={6} md={3}>
//                                       <Typography
//                                         variant="subtitle2"
//                                         color="textSecondary"
//                                       >
//                                         Shelf Life
//                                       </Typography>
//                                       <Typography variant="subtitle1">
//                                         {item.Product.shelf_life || "N/A"}
//                                       </Typography>
//                                     </Grid>

//                                     <Grid item xs={6} md={2}>
//                                       <Typography
//                                         variant="subtitle2"
//                                         color="textSecondary"
//                                       >
//                                         Weight
//                                       </Typography>
//                                       <Typography variant="subtitle1">
//                                         {/* {product.weight} gms */}1 kg
//                                       </Typography>
//                                     </Grid>

//                                     <Grid item xs={6} md={2}>
//                                       <Typography
//                                         variant="subtitle2"
//                                         color="textSecondary"
//                                       >
//                                         Price
//                                       </Typography>
//                                       <Typography variant="subtitle1">
//                                         ₹ {item.Product.price}
//                                       </Typography>
//                                     </Grid>

//                                     <Grid item xs={6} md={2} spacing={10}>
//                                       <Box
//                                         display={"flex"}
//                                         alignItems={"center"}
//                                         gap={4}
//                                       >
//                                         <IconButton
//                                           size="small"
//                                           onClick={() =>
//                                             removeFromWishlist(item.wishlist_id)
//                                           }
//                                           sx={{
//                                             border: `1px solid ${theme.palette.primary.main}`,
//                                             width: "40px",
//                                             height: "40px",
//                                           }}
//                                         >
//                                           <TrashError />
//                                         </IconButton>
//                                         <IconButton
//                                           size="small"
//                                           onClick={
//                                             () => handleAddWishlistToCart(item)
//                                           }
//                                           disableRipple
//                                           sx={{
//                                             width: "40px",
//                                             height: "40px",
//                                             backgroundColor:
//                                               theme.palette.primary.main,
//                                             border: `1px solid ${theme.palette.primary.main}`,
//                                           }}
//                                         >
//                                           <CartWhite />
//                                         </IconButton>
//                                       </Box>
//                                     </Grid>

                                  
//                                   </Grid>
//                                 </Grid>
//                               </Grid>
//                             ) : (
//                               <Typography variant="body1" color="textSecondary">
//                                 Product details not available
//                               </Typography>
//                             )}
//                           </Card>
//                         ))}
//                       </Stack>
//                     )}
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

// export default Wishlist;
