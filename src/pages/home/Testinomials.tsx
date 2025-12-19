// import React from "react";
// import { Box, Container, Stack, styled, Typography, useMediaQuery } from "@mui/material";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import testinomyBoard from "../../assets/graphics/testinony-board.svg";
// import promotionalChakra from "../../assets/graphics/full-chankra.svg";
// import quoteIcon from "../../assets/graphics/quote-icon.svg";
// import dummyUser from "../../assets/graphics/profile-user.svg";
// import theme from "../../Theme";

// interface Testimony {
//   id: number;
//   name: string;
//   image: string;
//   state: string;
//   country: string;
//   message: string;
// }

// const sliderButton = {
//   width: '26px',
//   height: '26px',
//   borderRadius: '50%',
//   color: theme.palette.common.white,
//   backgroundColor: theme.palette.primary.main,
//   border: `1px solid ${theme.palette.primary.main}`,
//   '&::after': {
//     fontSize: '10px',
//   },
//   '&.swiper-button-disabled': {
//     backgroundColor: theme.palette.common.white,
//     color: theme.palette.primary.main,
//     opacity: 1,
//   },
// };

// const SliderWrapper = styled(Box)({
//   '& .swiper-button-next': {
//     ...sliderButton,
//     right: 0,
//   },
//   '& .swiper-button-prev': {
//     ...sliderButton,
//     right: 38,
//   },
// });

// const testimony: Testimony[] = [
//   {
//     id: 1,
//     name: "Gal Gagot",
//     image: "/profile.png",
//     state: "Texas",
//     country: "USA",
//     message:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's  since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap. ",
//   },
//   {
//     id: 2,
//     name: "Gal Gagot",
//     image: "/profile.png",
//     state: "Texas",
//     country: "USA",
//     message:
//       "Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry's  since the 1500s, when an unknown printer took a galley of type and scrambled it to make a type specimen book. It has survived not only five centuries, but also the leap. ",
//   },
// ];

// const handleImageError = (e: React.SyntheticEvent<HTMLImageElement, Event>) => {
//   e.currentTarget.src = dummyUser;
// };

// const Testimonials: React.FC = () => {
//     const XsMobile = useMediaQuery(theme.breakpoints.down(900));
//     return (
//   <>
//     <SliderWrapper bgcolor={"#FDF4E9"} paddingTop={"80px"} paddingBottom={"40px"}>
//       <Container>
//         <Box
//           sx={{
//             background: !XsMobile ? `url('${testinomyBoard}')` : "#ffffff",
//             backgroundSize: "contain",
//             backgroundPosition: "center",
//             minHeight: 450,
//             width: "100%",
//             backgroundRepeat: "no-repeat",
//             display: "flex",
//             alignItems: "center",
//             position: "relative",
//             "&::before": {
//               content: '""',
//               width: "75%",
//               height: "75%",
//               backgroundImage: `url('${promotionalChakra}')`,
//               backgroundRepeat: "no-repeat",
//               backgroundSize: "contain",
//               backgroundPosition: "center",
//               position: "absolute",
//               top: "50%",
//               left: "50%",
//               transform: "translate(-50%, -50%)",
//             },
//           }}
//         >
//           <Swiper
//             className="custom-swiper"
//             navigation = {!XsMobile}
//             touchEventsTarget="container"
//             spaceBetween={0}
//             autoplay
//             slidesPerView={1}
//             modules={[Navigation]}
//             pagination={{ clickable: true }}
//           >
//             {testimony.map((item) => (
//               <SwiperSlide key={item.id}>
//                 <Stack spacing={10} padding={XsMobile ? 5 : 20} alignItems={"center"} justifyContent="space-between">
//                   <img src={quoteIcon} alt="Quote Icon" />
//                   <Typography>{item.message}</Typography>
//                   <Stack spacing={2} direction={'row'} alignItems={'center'}>
//                     <img
//                       style={{ width: '40px', height: '40px', borderRadius: '50%' }}
//                       src={item.image}
//                       onError={handleImageError}
//                       alt={item.name}
//                     />
//                     <Stack spacing={1}>
//                       <Typography
//                         sx={{
//                           fontSize: '16px',
//                           fontWeight: 600,
//                         }}
//                       >
//                         {item.name}
//                       </Typography>
//                       <Typography color="text.secondary" variant="body2">
//                         {item.state}, {item.country}
//                       </Typography>
//                     </Stack>
//                   </Stack>
//                 </Stack>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         </Box>
//       </Container>
//     </SliderWrapper>
//   </>
// )};

// export default Testimonials;
