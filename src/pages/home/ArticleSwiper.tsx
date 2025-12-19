// import React from "react";
// import { Swiper, SwiperSlide } from "swiper/react";
// import "swiper/css";
// import "swiper/css/navigation";
// import { Navigation } from "swiper/modules";
// import { Box, Grid, Skeleton, Stack, Typography, styled } from "@mui/material";
// import theme from "../../Theme";
// import useBestSellers from "../../hooks/useBestSellers";
// import ArticleCard from "../../components/ArticleCard";
// import articleImg2 from "../../assets/article_img_2.jpeg";
// import articleImg4 from "../../assets/article_img_4.jpeg";
// import articleImg5 from "../../assets/article_img_5.jpeg";
// import articleImg3 from "../../assets/article_img_3.jpeg";
// import articleImg6 from '../../assets/blog-main.png';
// import articleImg7 from '../../assets/articleImg7.jpeg';

// interface ArticleSwiperProps {
//   hasWhiteBg?: boolean;
//   slidesPerView: number;
//   title: string;
//   paragraph?: string;
// }

// const sliderButton = {
//   width: "26px",
//   height: "26px",
//   top: -30,
//   left: "auto",
//   borderRadius: "50%",
//   color: theme.palette.common.white,
//   backgroundColor: theme.palette.primary.main,
//   border: `1px solid ${theme.palette.primary.main}`,
//   "&::after": {
//     fontSize: "10px",
//   },
//   "&.swiper-button-disabled": {
//     backgroundColor: theme.palette.common.white,
//     color: theme.palette.primary.main,
//     opacity: 1,
//   },
// };

// const SliderWrapper = styled(Box)({
//   "& .swiper": {
//     overflow: "visible",
//   },
//   "& .swiper-button-next": {
//     ...sliderButton,
//     right: 0,
//   },
//   "& .swiper-button-prev": {
//     ...sliderButton,
//     right: 38,
//   },
// });

// const SliderTitle = styled(Typography)({
//   fontWeight: 400,
//   fontSize: "32px",
//   fontFamily: "Vangeda",
// });

// const SliderPara = styled(Typography)({
//   ...theme.typography.m14,
//   marginTop: 10,
//   color: theme.palette.text.secondary,
// });

// const NoDataMessage = styled(Typography)({
//   fontSize: "18px",
//   color: theme.palette.text.secondary,
//   textAlign: "center",
//   marginTop: "20px",
// });

// const ArticleSwiper: React.FC<ArticleSwiperProps> = ({
//   hasWhiteBg,
//   slidesPerView,
//   title,
//   paragraph,
// }) => {
//   const { loading } = useBestSellers();

//   const cardStyle = {
//     backgroundColor: hasWhiteBg ? "transparent" : "transparent",
//     padding: hasWhiteBg ? "15px" : "0",
//     borderRadius: hasWhiteBg ? "15px" : "0",
//   };

//   const articleData = [
//     {
//       image: articleImg4,
//       newspaperName: "Rediff News",
//       title: "A 'homemade' success story",
//       link: "https://www.rediff.com/money/report/homemade/20040219.htm",
//       description:
//         "The launch of the Swagruha Foods outlet in Vijayawada in 1991saw the advent of a new concept -- home foods -- in AP's sweet-meat industry. This was the brainchild of the woman entrepreneur, Chagarlamudi Vijayakumari.",
//       openIn : '_blank'
//     },

//     {
//       image: articleImg2,
//       newspaperName: "Youtube News",
//       title: "Vijayawada Food Tour (Swagruha Foods)",
//       link: "https://www.youtube.com/watch?v=6JVlwQ5__bQ&ab_channel=WhereverIGo...",
//       description:
//         "Want to know more, deep dive into the journey of this food business.",
//           openIn : '_blank'
//     },
//     {
//       image: articleImg3,
//       newspaperName: "hmtv News Live",
//       title: "Chagarlamudi Vijayalakshmi Interview",
//       link: "https://www.youtube.com/watch?v=ZKpNfsHuzGc&ab_channel=hmtvNewsLive",
//       description:
//         "Watch 'AAME' an exclusive interview with Chagarlamudi Vijayalakshmi the founder of Swagruha Foods, who started off as a small domestic business, is today an industry that supplies food items throughout the country and abroad.",
//           openIn : '_blank'
//     },

//     {
//       image: articleImg5,
//       newspaperName: "Youtube News",
//       title: "Swagruha Foods Ad Film Telugu",
//       link: "https://www.youtube.com/watch?v=A4OMecG4qm0&ab_channel=ThoughtSprinklersAdFilmMakers",
//       description:
//         "Want to know more, deep dive into the journey of this food business.",
//           openIn : '_blank'
//     },

//     {
//       image: articleImg6,
//       newspaperName: "TIMES OF INDIA",
//       title: "Foods That Remaind One Of Home",
//       link: "/blog",
//       description:
//         " Its better to spend a rupee more on a quality food product than spend lakh in the hospitals. I could easily cut down the cost and increase my profit margin, by say, using vanaspati in my sweets instead of pure ghee. But that is not who we are. That is not something we will ever do.",
//           openIn : '_self'
//     },
//     {
//       image: articleImg7,
//       newspaperName: "isb",
//       title: "Invited to isb to give a lecture on the success of swagruha foods",
//     },
//   ];
//   return (
//     <Stack spacing={6}>
//       <Grid container>
//         <Grid item xs={10} md={10} lg={10}>
//           <Stack sx={{ position: "relative" }}>
//             <SliderTitle>{title}</SliderTitle>
//             {paragraph && <SliderPara>{paragraph}</SliderPara>}
//           </Stack>
//         </Grid>
//       </Grid>
//       <SliderWrapper>
//         {loading ? (
//           <Grid container spacing={10}>
//             {Array.from(new Array(4)).map((_, index) => (
//               <Grid item key={index} xs={12} sm={6} md={4} lg={3}>
//                 <Box sx={cardStyle}>
//                   <Skeleton variant="rounded" width="100%" height={200} />
//                   <Skeleton sx={{ mt: 3 }} width="80%" />
//                   <Skeleton width="60%" />
//                 </Box>
//               </Grid>
//             ))}
//           </Grid>
//         ) : articleData.length > 0 ? (
//           <Swiper
//             className="custom-swiper"
//             navigation
//             touchEventsTarget="container"
//             spaceBetween={hasWhiteBg ? 30 : 50}
//             slidesPerView={slidesPerView}
//             modules={[Navigation]}
//             pagination={{ clickable: true }}
//             breakpoints={{
//               320: {
//                 slidesPerView: 1,
//                 spaceBetween: hasWhiteBg ? 30 : 50,
//               },
//               575: {
//                 slidesPerView: 2,
//                 spaceBetween: hasWhiteBg ? 30 : 50,
//               },
//               640: {
//                 slidesPerView: 2.2,
//                 spaceBetween: hasWhiteBg ? 30 : 50,
//               },
//               768: {
//                 slidesPerView: 2.5,
//                 spaceBetween: hasWhiteBg ? 30 : 50,
//               },
//               1024: {
//                 slidesPerView: slidesPerView,
//                 spaceBetween: hasWhiteBg ? 30 : 50,
//               },
//             }}
//           >
//             {articleData.map((article, index) => (
//               <SwiperSlide key={index}>
//                 <Box key={index} sx={cardStyle}>
//                   <ArticleCard
//                     image={article.image}
//                     newspaperName={article.newspaperName}
//                     title={article.title}
//                     link={article.link}
//                     description={article.description}
//                     openIn={article.openIn}

//                   />
//                 </Box>
//               </SwiperSlide>
//             ))}
//           </Swiper>
//         ) : (
//           <NoDataMessage>No data found</NoDataMessage>
//         )}
//       </SliderWrapper>
//     </Stack>
//   );
// };

// export default ArticleSwiper;
