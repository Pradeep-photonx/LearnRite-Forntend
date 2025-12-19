// import {
//   Box,
//   Grid,
//   IconButton,
//   List,
//   ListItem,
//   ListItemButton,
//   ListItemText,
//   Stack,
//   Typography,
// } from "@mui/material";
// import theme from "../Theme";
// import { Link } from "react-router-dom";
// import {
//     FacebookIcon,
//   InstagramIcon,
//   LinkedInIcon,
//   MailOutlined,
//   MapPinOutlined,
//   PhoneOutlined,
//   TwitterIcon,
// } from "../assets/react-icons/CommonIcons";
// import fullChankra from "../assets/graphics/full-chankra.svg";
// import { styled } from "@mui/system";

// const pages = [
//   { name: "Privacy Policy", path: "/privacy" },
//   { name: "Terms & Conditions", path: "/terms" },
//   { name: "Cancellations & Refund Policy", path: "/cancellations" },
//   { name: "Shipping & Delivery Policy", path: "/shipping" },
//   { name: "Disclaimer Policy", path: "/disclaimer" },
// ];
// const FooterBottomChakra = styled(Box)({
//   position: "absolute",
//   left: "50%",
//   bottom: "-280px",
//   pointerEvents: "none",
//   userSelect: "none",
//   transform: "translateX(-50%)",
// });
// const Footer: React.FC = () => (
//   <>
//     <Box sx={{ position: "relative", overflow: "hidden" }}>
//       <Box
//         sx={{
//           pt: {
//             xs: 5,
//             md: 10,
//             lg: 15,
//           },
//           pb: 6,
//         }}
//       >
//         <Grid spacing={{ xs: 5, md: 6, lg: 8 }} container>
//           <Grid item lg={5}>
//             <Stack spacing={2}>
//               <Typography
//                 sx={{
//                   fontSize: "20px",
//                   fontWeight: 400,
//                   fontFamily: "Vangeda",
//                 }}
//               >
//                 About Us
//               </Typography>
//               <Typography
//                 sx={{
//                   ...theme.typography.r14,
//                 }}
//               >
//                 <span style={{ fontWeight: 500 }}>SWAGRUHA FOODS</span> –
//                 pioneers of Home Foods. In AP & Telangana taste our sweets, savouries, pickles and karampodulu for an
//                 unforgettable experience. Crafted with 100% homemade goodness,
//                 using only the freshest, finest natural ingredients. Each treat
//                 is made as if for our own family, ensuring unparalleled quality.
//                 Our secret? The finest ingredients, delivering unparalleled taste.
//                 Trusted by our loyal customers, our success is fueled by our
//                 commitment to taste, hygiene, and customer happiness.
//               </Typography>
//             </Stack>
//           </Grid>
//           <Grid item lg={3}>
//             <Stack>
//               <Typography
//                 sx={{
//                   fontSize: "20px",
//                   fontWeight: 400,
//                   fontFamily: "Vangeda",
//                 }}
//               >
//                 Menu
//               </Typography>
//               <List component="nav" aria-label="mailbox folders">
//                 {pages.map((page, index) => (
//                   <ListItem key={index} disablePadding>
//                     <ListItemButton
//                       sx={{ p: 0 }}
//                       component={Link}
//                       to={page.path}
//                     >
//                       <ListItemText primary={page.name} />
//                     </ListItemButton>
//                   </ListItem>
//                 ))}
//               </List>
//             </Stack>
//           </Grid>
//           <Grid item lg={4}>
//             <Stack spacing={2}>
//               <Typography
//                 sx={{
//                   fontSize: "20px",
//                   fontWeight: 400,
//                   fontFamily: "Vangeda",
//                 }}
//               >
//                 Store Information
//               </Typography>
//               <Stack spacing={2}>
//                 <Stack spacing={2} direction={"row"}>
//                   <Box>
//                     <MapPinOutlined
//                       style={{ position: "relative", top: -2.7 }}
//                     />
//                   </Box>
//                   <Typography sx={{ ...theme.typography.m14 }}>
//                     D.No: 38-8-58, Opposite PWD grounds, M.G.Road,
//                     Vijayawada-520010, Andhra Pradesh
//                   </Typography>
//                 </Stack>
//                 <Stack spacing={2} direction={"row"} alignItems={"center"}>
//                   <MailOutlined />
//                   <Typography sx={{ ...theme.typography.m14 }}>
//                     {/* swagruhafoods@yahoo.com */}
//                     swagruhafoodsestore@gmail.com
//                   </Typography>
//                 </Stack>
//                 <Stack spacing={2} direction={"row"} alignItems={"center"}>
//                   <PhoneOutlined />
//                   <Typography sx={{ ...theme.typography.m14 }}>
//                     {/* 9949845000 */}
//                     +91 9949845000
//                   </Typography>
//                 </Stack>
//               </Stack>
//             </Stack>
//           </Grid>
//         </Grid>
//       </Box>
//       <Box sx={{ py: 4 }}>
//         <Stack
//           direction={"row"}
//           alignItems={"center"}
//           justifyContent={"space-between"}
//         >
//           <Typography
//             sx={{
//               ...theme.typography.m14,
//             }}
//           >
//             2024 swagruhafoods. All Rights Reserved
//           </Typography>
//           <Stack direction={"row"}>
//             <IconButton>
//               <FacebookIcon />
//             </IconButton>
//             <IconButton>
//               <InstagramIcon />
//             </IconButton>
//             <IconButton>
//               <LinkedInIcon />
//             </IconButton>
//             <IconButton>
//               <TwitterIcon />
//             </IconButton>
//           </Stack>
//         </Stack>
//         <FooterBottomChakra>
//           <img src={fullChankra} alt="" />
//         </FooterBottomChakra>
//       </Box>
//     </Box>
//   </>
// );

// export default Footer;
