// import React from 'react';
// import { List, ListItem, ListItemButton, ListItemIcon, ListItemText } from '@mui/material';
// import { NavLink } from 'react-router-dom';
// import { styled } from '@mui/system';
// import theme from '../../Theme';
// import { LockIcon, ProfileIcon, AddressIcon, OrderHistoryIcon, HeartIconThin } from '../../assets/react-icons/CommonIcons';

// interface RouteData {
//   path: string;
//   label: string;
//   icon: React.ReactNode;
// }

// const routes: RouteData[] = [
//   { path: '/profile-information', label: 'Profile Information', icon: <ProfileIcon /> },
//   { path: '/manage-address', label: 'Manage address', icon: <AddressIcon /> },
//   { path: '/order-history', label: 'Order history', icon: <OrderHistoryIcon /> },
//   { path: '/wishlist', label: 'My wishlist', icon: <HeartIconThin /> },
//   { path: '/change-password', label: 'Change password', icon: <LockIcon /> },
// ];

// const SidebarContainer = styled('div')({
//   width: '100%',
//   background: '#ffffff',
//   border: '1px solid #EFEFEF',
//   boxShadow: '0px 0px 30px 0px #EEEEEE',
//   borderRadius: '15px',
//   position: 'sticky',
//   top:186,
// });

// const StyledNavLink = styled(NavLink)({
//   width: '100%',
//   textDecoration: 'none',
//   color: 'inherit',
//   '&.active': {
//     fontWeight: 'bold',
//     color: theme.palette.secondary.main,
//     background: theme.palette.secondary.light,
//     '& .MuiListItemIcon-root svg path':{
//         stroke: theme.palette.secondary.main,
//     }
//   },
// });

// const ProfileSideMenu: React.FC = () => {
//   return (
//     <SidebarContainer>
//       <List sx={{ py: 4 }}>
//         {routes.map((route) => (
//           <ListItem key={route.path} disablePadding>
//             <StyledNavLink to={route.path} className={({ isActive }) => (isActive ? 'active' : '')}>
//               <ListItemButton sx={{ width: '100%' }}>
//                 <ListItemIcon>
//                   {route.icon}
//                 </ListItemIcon>
//                 <ListItemText primary={route.label} />
//               </ListItemButton>
//             </StyledNavLink>
//           </ListItem>
//         ))}
//       </List>
//     </SidebarContainer>
//   );
// };

// export default ProfileSideMenu;
