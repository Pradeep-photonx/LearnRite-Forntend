import React from "react";
import {
    Box,
    Typography,
    List,
    ListItem,
    ListItemButton,
    ListItemIcon,
    ListItemText,
    styled,
    Avatar,
} from "@mui/material";
import {
    PersonOutline,
    FavoriteBorder,
    ShoppingCartOutlined,
    LocationOnOutlined,
    Logout,
} from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";

const SidebarContainer = styled(Box)({
    width: "100%",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "24px",
    // border: "1px solid #1214191A",
});

const UserProfileSection = styled(Box)({
    display: "flex",
    alignItems: "center",
    gap: "16px",
    marginBottom: "32px",
    paddingBottom: "24px",
    borderBottom: "1px solid #1214191A",
});

const StyledListItemButton = styled(ListItemButton)<{ active?: boolean }>(({ active }) => ({
    borderRadius: "12px",
    marginBottom: "8px",
    padding: "12px 16px",
    backgroundColor: active ? "#F5F1E9" : "transparent",
    "&:hover": {
        backgroundColor: active ? "#F5F1E9" : "#F9FAFB",
    },
    "& .MuiListItemIcon-root": {
        color: "#121318",
        minWidth: "40px",
    },
    "& .MuiListItemText-primary": {
        fontSize: "16px",
        fontWeight: active ? 600 : 500,
        color: "#121318",
    },
}));

const ProfileSideMenu: React.FC = () => {
    const navigate = useNavigate();
    const location = useLocation();

    const [user, setUser] = React.useState<any>(null);

    React.useEffect(() => {
        const storedUser = localStorage.getItem("user");
        if (storedUser) {
            try {
                setUser(JSON.parse(storedUser));
            } catch (e) {
                console.error("Failed to parse user", e);
            }
        }
    }, []);

    const menuItems = [
        { label: "Profile", icon: <PersonOutline />, path: "/profile" },
        { label: "Wishlist", icon: <FavoriteBorder />, path: "/wishlist" },
        { label: "My Orders", icon: <ShoppingCartOutlined />, path: "/order-history" },
        { label: "Addresses", icon: <LocationOnOutlined />, path: "/manage-address" },
    ];

    const handleLogout = () => {
        localStorage.removeItem("token");
        localStorage.removeItem("user");
        navigate("/home");
        window.location.reload();
    };

    return (
        <SidebarContainer>
            <UserProfileSection>
                <Avatar
                    sx={{ width: 64, height: 64 }}
                    src={user?.avatar || "https://mui.com/static/images/avatar/1.jpg"}
                />
                <Box>
                    <Typography variant="r14" color="textSecondary">Hello</Typography>
                    <Typography variant="sb20" sx={{ display: "block" }}>
                        {user ? `${user.first_name} ${user.last_name || ""}` : "Guest"}
                    </Typography>
                </Box>
            </UserProfileSection>

            <List disablePadding>
                {menuItems.map((item) => (
                    <ListItem key={item.path} disablePadding>
                        <StyledListItemButton
                            active={location.pathname === item.path}
                            onClick={() => navigate(item.path)}
                        >
                            <ListItemIcon>{item.icon}</ListItemIcon>
                            <ListItemText primary={item.label} />
                        </StyledListItemButton>
                    </ListItem>
                ))}
                <ListItem disablePadding>
                    <StyledListItemButton onClick={handleLogout}>
                        <ListItemIcon><Logout /></ListItemIcon>
                        <ListItemText primary="Logout" />
                    </StyledListItemButton>
                </ListItem>
            </List>
        </SidebarContainer>
    );
};

export default ProfileSideMenu;
