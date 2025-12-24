import React, { useState } from "react";
import {
  Box,
  Button,
  Container,
  Divider,
  IconButton,
  InputBase,
  Menu,
  MenuItem,
  Paper,
  Stack,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
} from "@mui/material";
import {
  KeyboardArrowDown,
  SearchRounded,
  Menu as MenuIcon,
  Close,
} from "@mui/icons-material";
import { AddToCartIcon, WishlistIcon } from "../components/icons/CommonIcons";
import LogoImg from "../assets/images/learnrite-logo.svg";
import LoginModal from "../components/modals/LoginModal";
import SignUpModal from "../components/modals/SignUpModal";
import { useNavigate } from "react-router-dom";

const categoryOptions = [
  "Categories",
  "School Books",
  "Stationary",
  "Backpacks",
  "Notebooks",
  "Paper Products",
];



const menuCategories = [
  "Backpacks",
  "Notebooks",
  "School Books",
  "Paper Products",
  "Pen & Pencils",
  "Long Notebooks",
  "Art Items",
  "Long Notebooks",
  "Paper Products",
  "Notebooks",
];

const TopHeader: React.FC = () => {
  const [categoryAnchor, setCategoryAnchor] = useState<null | HTMLElement>(null);
  const [selectedCategory, setSelectedCategory] = useState(categoryOptions[0]);
  const categoryOpen = Boolean(categoryAnchor);
  const [menuAnchor, setMenuAnchor] = useState<null | HTMLElement>(null);
  const menuOpen = Boolean(menuAnchor);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  const [user, setUser] = useState<any>(null);
  const [userMenuAnchor, setUserMenuAnchor] = useState<null | HTMLElement>(null);

  React.useEffect(() => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      try {
        setUser(JSON.parse(storedUser));
      } catch (e) {
        console.error("Failed to parse user from local storage", e);
      }
    }
  }, []);

  const handleUserMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setUserMenuAnchor(event.currentTarget);
  };

  const handleUserMenuClose = () => {
    setUserMenuAnchor(null);
  };

  const handleLogout = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("user");
    setUser(null);
    handleUserMenuClose();
    // navigate("/login"); // Optional: if you want to redirect
  };

  const handleLoginSuccess = () => {
    const storedUser = localStorage.getItem("user");
    if (storedUser) {
      setUser(JSON.parse(storedUser));
    }
    setLoginModalOpen(false);
  };

  const handleCategoryOpen = (event: React.MouseEvent<HTMLElement>) => {
    setCategoryAnchor(event.currentTarget);
  };

  const handleCategorySelect = (option: string) => {
    setSelectedCategory(option);
    setCategoryAnchor(null);
  };

  const handleCategoryClose = () => {
    setCategoryAnchor(null);
  };

  const handleMenuOpen = (event: React.MouseEvent<HTMLElement>) => {
    setMenuAnchor(event.currentTarget);
  };

  const handleMenuClose = () => {
    setMenuAnchor(null);
  };

  const handleMenuCategorySelect = (category: string) => {
    setSelectedCategory(category);
    handleMenuClose();
  };

  const navigate = useNavigate();

  return (
    <Box sx={{ width: "100%", bgcolor: "#ffffff", }}>

      <Box sx={{ py: { xs: 1.5, md: 2.5 } }}>
        <Container maxWidth="xl">
          <Stack
            direction="row"
            alignItems="center"
            spacing={{ xs: 2, md: 3 }}
            justifyContent="space-between"
          >
            <Stack direction="row" spacing={1.5} alignItems="center" minWidth={180}>
              <IconButton
                onClick={menuOpen ? handleMenuClose : handleMenuOpen}
                sx={{
                  backgroundColor: "#2C65F9",
                  color: "#FFFFFF",
                  borderRadius: "8px",
                  width: "40px",
                  height: "40px",
                  padding: "8px",
                  "&:hover": {
                    backgroundColor: "#1e40af",
                  },
                }}
                aria-label={menuOpen ? "close menu" : "open menu"}
              >
                {menuOpen ? <Close sx={{ fontSize: "20px" }} /> : <MenuIcon />}
              </IconButton>
              <Stack spacing={0.2}>
                <Button variant="text" onClick={() => navigate("/home")}>
                  <img src={LogoImg} alt="Logo" />
                </Button>
              </Stack>
            </Stack>

            <Paper
              elevation={0}
              sx={{
                flex: 1,
                display: "flex",
                alignItems: "center",
                borderRadius: "10px",
                border: "1px solid #D1D4DE",
                backgroundColor: "#ffffff",
                px: 1,
                py: 1,
                // boxShadow: "0 6px 18px rgba(0,0,0,0.04)",
                minWidth: { xs: "100%", md: "500px" },
                width: "100%",
                maxWidth: "750px",
              }}
            >
              <Button
                variant="text"
                onClick={handleCategoryOpen}
                endIcon={<KeyboardArrowDown />}
                sx={{
                  color: "#111827",
                  borderRadius: "50px",
                  px: { xs: 1.5, md: 2 },
                  minWidth: { xs: "auto", md: "140px" },
                  fontWeight: 500,
                  fontSize: { xs: "14px", md: "16px" },
                  textTransform: "none",
                  backgroundColor: "unset !important",
                  "&:hover": {
                    backgroundColor: "unset !important",
                  },
                  "&:active": {
                    backgroundColor: "unset !important",
                  },
                  "&:focus": {
                    backgroundColor: "unset !important",
                  },
                }}
              >
                {selectedCategory}
              </Button>
              <Divider orientation="vertical" flexItem sx={{ mx: 1, borderColor: "#e5e7eb", height: "25px", marginTop: "10px" }} />
              <InputBase
                sx={{ ml: 1, flex: 1, fontSize: "14px" }}
                placeholder="Search for books, stationary, school products..."
                inputProps={{ "aria-label": "search for books, stationary, school products" }}
              />
              <IconButton
                sx={{
                  ml: 1,
                  backgroundColor: "#2C65F9",
                  color: "#ffffff",
                  "&:hover": { backgroundColor: "#2C65F9" },
                  width: 42,
                  height: 42,
                  borderRadius: "10px",
                }}
              >
                <SearchRounded />
              </IconButton>
              <Menu anchorEl={categoryAnchor} open={categoryOpen} onClose={handleCategoryClose}>
                {categoryOptions.map((option) => (
                  <MenuItem key={option} onClick={() => handleCategorySelect(option)}>
                    {option}
                  </MenuItem>
                ))}
              </Menu>
            </Paper>

            <Stack direction="row" spacing={1} alignItems="center" gap={"20px"}>
              <IconButton aria-label="wishlist" sx={{ padding: "0px" }}>
                <WishlistIcon />
              </IconButton>
              <IconButton onClick={() => navigate("/cart")} sx={{ color: "#111827", padding: "0px" }} aria-label="cart">
                <AddToCartIcon />
              </IconButton>
              {user ? (
                <>
                  <Button
                    variant="text"
                    onClick={handleUserMenuOpen}
                    endIcon={<KeyboardArrowDown />}
                    sx={{
                      color: "#111827",
                      // textTransform: "none",
                      fontWeight: 600,
                      fontSize: "16px",
                      textTransform: "capitalize",
                    }}
                  >
                    {user.first_name}
                  </Button>
                  <Menu
                    anchorEl={userMenuAnchor}
                    open={Boolean(userMenuAnchor)}
                    onClose={handleUserMenuClose}
                    anchorOrigin={{
                      vertical: "bottom",
                      horizontal: "right",
                    }}
                    transformOrigin={{
                      vertical: "top",
                      horizontal: "right",
                    }}
                  >
                    <MenuItem onClick={() => { handleUserMenuClose(); navigate("/profile"); }}>Profile</MenuItem>
                    <MenuItem onClick={handleUserMenuClose}>Change Password</MenuItem>
                    <MenuItem onClick={handleLogout}>Logout</MenuItem>
                  </Menu>
                </>
              ) : (
                <Button
                  variant="contained"
                  sx={{
                    textTransform: "none",
                    padding: "12px 12px",
                    // fontWeight: 600,
                    fontSize: "16px",
                  }}
                  onClick={() => setLoginModalOpen(true)}
                >
                  Sign in / Sign up
                </Button>
              )}
            </Stack>
          </Stack>
        </Container>
      </Box>

      {/* Hamburger Menu Dropdown */}
      <Menu
        anchorEl={menuAnchor}
        open={menuOpen}
        onClose={handleMenuClose}
        PaperProps={{
          sx: {
            width: { xs: "100%", sm: "400px" },
            maxWidth: "300px",
            maxHeight: "500px",
            overflowY: "auto",
            mt: 1,
            borderRadius: "14px",
            boxShadow: "unset",
            border: "1px solid #D1D4DE",
            position: "relative",
          },
        }}
        transformOrigin={{ horizontal: "left", vertical: "top" }}
        anchorOrigin={{ horizontal: "left", vertical: "bottom" }}
      >
        <Box sx={{ width: "100%", backgroundColor: "#FFFFFF" }}>
          {/* Categories List */}
          <Box
            sx={{
              overflowY: "auto",
              maxHeight: "500px",
            }}
          >
            <List sx={{ py: 0 }}>
              {menuCategories.map((category, index) => (
                <ListItem
                  key={`${category}-${index}`}
                  disablePadding
                // sx={{
                //   borderBottom: "1px solid #F3F4F6",
                // }}
                >
                  <ListItemButton
                    onClick={() => handleMenuCategorySelect(category)}
                    sx={{
                      py: 1.5,
                      px: 3,
                      "&:hover": {
                        backgroundColor: "#F9FAFB",
                      },
                      ...(category === "" && {
                        // backgroundColor: "#EFF6FF",
                        color: "#2C55C1",
                        fontWeight: 600,
                      }),
                    }}
                  >
                    <ListItemText
                      primary={category}
                      primaryTypographyProps={{
                        fontSize: "16px",
                        fontWeight: category === "" ? 600 : 500,
                        // color: category === "School Books" ? "#2C65F9" : "#121318",
                      }}
                    />
                  </ListItemButton>
                </ListItem>
              ))}
            </List>
          </Box>
        </Box>
      </Menu>

      {/* Login Modal */}
      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onSignUpClick={() => {
          setLoginModalOpen(false);
          setSignUpModalOpen(true);
        }}
      />

      {/* Sign Up Modal */}
      <SignUpModal
        open={signUpModalOpen}
        onClose={() => setSignUpModalOpen(false)}
        onLoginClick={() => {
          setSignUpModalOpen(false);
          setLoginModalOpen(true);
        }}
      />
    </Box>
  );
};

export default TopHeader;
