// import React from "react";
// import ProfileSideMenu from "./ProfileSideMenu";
// import {
//   Box,
//   Container,
//   Divider,
//   Grid,
//   Paper,
//   Stack,
//   Typography,
//   CircularProgress,
//   useMediaQuery,
// } from "@mui/material";
// import OrderHistoryItem from "../../components/OrderHistoryItem";
// import useOrderHistory from "../../hooks/useOrderHistory";
// import theme from "../../Theme";

// const OrderHistory: React.FC = () => {
//   const isMd = useMediaQuery(theme.breakpoints.up("md"));
//   const { orders, loading, error } = useOrderHistory();

//   const currency = "₹";

//   console.log(orders);

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
//                       Order History
//                     </Typography>
//                   </Stack>
//                   <Box>
//                     <Divider sx={{ py: 1.5 }} />
//                   </Box>
//                   <Box py={4}>
//                     {loading ? (
//                       <Stack alignItems="center">
//                         <CircularProgress />
//                       </Stack>
//                     ) : error ? (
//                       <Typography color="error">{error}</Typography>
//                     ) : (
//                       <Stack spacing={3}>
//                         {orders.map((order) => (
//                           <OrderHistoryItem
//                             key={order.order_id}
//                             datePlaced={order.date_added}
//                             orderNumber={order.order_number}
//                             totalAmount={`${currency} ${order.total}`}
//                             order_status_id={order.order_status_id}
//                             products={order.products}
//                             currency_symbol={order.currency_symbol}
//                             order_id={order.order_id}
//                             deliveryDate={order.date_modified}
//                           />
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

// export default OrderHistory;
