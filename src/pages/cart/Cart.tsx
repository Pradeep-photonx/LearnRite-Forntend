import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Paper,
  Stack,
  IconButton,
  TextField,
  styled,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogContentText,
  DialogActions,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Add, Remove, DeleteOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import dummyImage from "../../assets/images/sm-cart.png";
import LoginModal from "../../components/modals/LoginModal";
import SignUpModal from "../../components/modals/SignUpModal";
import { getCartDetails, removeCartItem, type CartItem } from "../../api/cart";
import { useEffect } from "react";
import toast from "react-hot-toast";

// Styled Components
const CartContainer = styled(Box)({
  padding: "40px 0 80px 0",
  //   backgroundColor: "#FFFFFF",
  minHeight: "60vh",
});

const CartCard = styled(Paper)({
  borderRadius: "12px",
  boxShadow: "unset",
  padding: "20px",
  backgroundColor: "#FFFFFF",
  border: "1px solid #1214191A",
});

const TableHeader = styled(TableCell)({
  fontSize: "16px",
  fontWeight: 600,
  color: "#121318",
  fontFamily: "Figtree, sans-serif",
  borderBottom: "1px solid #E5E7EB",
  padding: "0px 0px 16px 0",
});

const ProductRow = styled(TableRow)({
  "&:not(:last-child)": {
    borderBottom: "1px solid #F0F0F0",
  },
});

const ProductCell = styled(TableCell)({
  padding: "20px 0",
  borderBottom: "none",
});

const ProductInfo = styled(Box)({
  display: "flex",
  gap: "16px",
  alignItems: "center",
});

const ProductImage = styled("img")({
  width: "70px",
  height: "70px",
  objectFit: "contain",
});

const ProductDetails = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "4px",
});

const ProductName = styled(Typography)({
  fontSize: "16px",
  fontWeight: 500,
  color: "#121318",
  fontFamily: "Figtree, sans-serif",
});

const ProductDescription = styled(Typography)({
  fontSize: "14px",
  color: "#121318",
  fontWeight: 400,
  fontFamily: "Figtree, sans-serif",
});

const QuantityControl = styled(Box)({
  display: "flex",
  alignItems: "center",
  //   gap: "8px",
  //   border: "1px solid #D1D4DE",
  borderRadius: "8px",
  padding: "4px",
  width: "fit-content",
});

const QuantityButton = styled(IconButton)({
  width: "32px",
  height: "32px",
  padding: "0",
  color: "#121318",
  "&:hover": {
    backgroundColor: "#F3F4F6",
  },
});

const QuantityInput = styled("input")({
  width: "50px",
  textAlign: "center",
  border: "none",
  outline: "none",
  fontSize: "16px",
  fontFamily: "Figtree, sans-serif",
  color: "#121318",
  backgroundColor: "transparent",
  "&::-webkit-inner-spin-button, &::-webkit-outer-spin-button": {
    WebkitAppearance: "none",
    margin: 0,
  },
});

const PriceText = styled(Typography)({
  fontSize: "16px",
  fontWeight: 600,
  color: "#121318",
  fontFamily: "Figtree, sans-serif",
});

const DeleteButton = styled(IconButton)({
  color: "#6B7280",
  "&:hover": {
    color: "#EF4444",
    backgroundColor: "#FEF2F2",
  },
});

const OrderSummaryCard = styled(Paper)({
  borderRadius: "12px",
  boxShadow: "0px 5px 40px 0px #E4E2DC99",
  padding: "20px",
  backgroundColor: "#FFFFFF",
  position: "sticky",
  top: "20px",
});

const SummaryTitle = styled(Typography)({
  fontSize: "20px",
  fontWeight: 600,
  color: "#121318",
  fontFamily: "Figtree, sans-serif",
  marginBottom: "24px",
});

const SummaryRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
});

const SummaryLabel = styled(Typography)({
  fontSize: "16px",
  color: "#445061",
  fontFamily: "Figtree, sans-serif",
});

const SummaryValue = styled(Typography)({
  fontSize: "16px",
  fontWeight: 500,
  color: "#121318",
  fontFamily: "Figtree, sans-serif",
});

const TotalRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "16px",
  paddingTop: "16px",
  borderTop: "1px solid #E5E7EB",
});

const TotalLabel = styled(Typography)({
  fontSize: "18px",
  fontWeight: 600,
  color: "#121318",
  fontFamily: "Figtree, sans-serif",
});

const TotalValue = styled(Typography)({
  fontSize: "18px",
  fontWeight: 600,
  color: "#121318",
  fontFamily: "Figtree, sans-serif",
});

const CouponContainer = styled(Box)({
  display: "flex",
  gap: "12px",
  marginTop: "20px",
  marginBottom: "24px",
});

const CouponInput = styled(TextField)({
  flex: 1,
  "& .MuiOutlinedInput-root": {
    borderRadius: "8px",
    fontSize: "16px",
    fontFamily: "Figtree, sans-serif",
    "& fieldset": {
      borderColor: "#D1D4DE",
    },
    "&:hover fieldset": {
      borderColor: "#D1D4DE",
    },
    "&.Mui-focused fieldset": {
      borderColor: "#2C65F9",
    },
  },
});

const ApplyButton = styled(Button)({
  minWidth: "80px",
  padding: "12px 20px",
  borderRadius: "8px",
  border: "1px solid #D1D4DE",
  color: "#121318",
  backgroundColor: "#FFFFFF",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  fontFamily: "Figtree, sans-serif",
  "&:hover": {
    backgroundColor: "#F9FAFB",
    borderColor: "#9CA3AF",
  },
});

const CheckoutButton = styled(Button)({
  width: "100%",
  padding: "14px 24px",
  borderRadius: "8px",
  background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
  color: "#FFFFFF",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 600,
  fontFamily: "Figtree, sans-serif",
  marginTop: "24px",
  boxShadow: "0px 5px 10px 0px #2D60E745",
  "&:hover": {
    background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
    boxShadow: "0px 5px 15px 0px #2D60E745",
  },
});



const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [couponCode, setCouponCode] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);
  const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
  const [itemToDelete, setItemToDelete] = useState<number | null>(null);

  // Fetch cart data on mount
  useEffect(() => {
    const fetchCartData = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) {
          setLoading(false);
          return;
        }
        const data = await getCartDetails();
        if (data.user_cart && data.user_cart.length > 0) {
          setCartItems(data.user_cart[0].CartItems || []);
        }
      } catch (error: any) {
        console.error("Failed to fetch cart:", error);
        toast.error("Failed to load cart items");
      } finally {
        setLoading(false);
      }
    };
    fetchCartData();
  }, []);

  // Check if user is logged in
  const isLoggedIn = () => {
    return !!localStorage.getItem("token");
  };

  const handleQuantityChange = (cartItemId: number, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.cart_item_id === cartItemId) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = async (cartItemId: number) => {
    try {
      await removeCartItem(cartItemId);
      setCartItems((prevItems) => prevItems.filter((item) => item.cart_item_id !== cartItemId));
      toast.success("Item removed from cart");
    } catch (error: any) {
      console.error("Failed to remove item:", error);
      toast.error(error.response?.data?.message || "Failed to remove item");
    }
  };

  const handleDeleteClick = (id: number) => {
    setItemToDelete(id);
    setDeleteConfirmOpen(true);
  };

  const handleConfirmDelete = async () => {
    if (itemToDelete) {
      setLoading(true);
      await handleRemoveItem(itemToDelete);
      setDeleteConfirmOpen(false);
      setItemToDelete(null);
      setLoading(false);
    }
  };

  const handleCloseDeleteModal = () => {
    setDeleteConfirmOpen(false);
    setItemToDelete(null);
  };

  const handleApplyCoupon = () => {
    // Handle coupon application
    console.log("Applying coupon:", couponCode);
  };

  const handleCheckout = () => {
    // Check if user is logged in
    if (isLoggedIn()) {
      // User is logged in, redirect to checkout
      navigate("/checkout");
    } else {
      // User is not logged in, show login modal
      setLoginModalOpen(true);
    }
  };

  const handleLoginSuccess = () => {
    // After successful login, redirect to checkout
    setLoginModalOpen(false);
    navigate("/checkout");
  };

  // Calculate totals
  const subtotal = cartItems.reduce((sum, item) => sum + item.total_price, 0);
  const gst = Math.round(subtotal * 0.18);
  const delivery = 50; // Free delivery
  const total = subtotal + gst + delivery;

  // Helper function to get product image
  const getProductImage = (item: CartItem): string => {
    if (item.Product?.image1) {
      return `${import.meta.env.VITE_API_BASE_URL}/${item.Product.image1}`;
    }
    // For bundle items, use the class image if available
    if (item.Class?.image) {
      return item.Class.image;
    }
    if (item.CartItemBundles && item.CartItemBundles.length > 0) {
      return dummyImage; // Use default for bundles
    }
    return dummyImage;
  };

  // Helper function to get product name
  const getProductName = (item: CartItem): string => {
    if (item.Product) {
      return item.Product.name;
    }
    // For bundle items, prioritize the class name
    if (item.Class?.name) {
      return item.Class.name;
    }
    if (item.ClassLanguage?.Class?.name) {
      return item.ClassLanguage.Class.name;
    }
    if (item.student_class) {
      return item.student_class;
    }
    if (item.bundle_name) {
      return item.bundle_name;
    }
    return "Class Bundle";
  };

  // Helper function to get product description
  const getProductDescription = (item: CartItem): string => {
    if (item.Product) {
      return item.Product.description || "";
    }
    // For bundle items, format as "1 Unit (X items), Language"
    if (item.CartItemBundles && item.CartItemBundles.length > 0) {
      const bundleCount = item.CartItemBundles.length;
      const language = item.ClassLanguage?.language || "";
      return `1 Unit (${bundleCount} items), ${language}`;
    }
    return "";
  };

  return (
    <>
      {/* <Breadcrumb items={[{ label: "Home", path: "/home" }, { label: "Cart" }]} /> */}
      <Container maxWidth="xl">
        <CartContainer>
          <Grid container spacing={4}>
            {/* Left Column - Product List */}
            <Grid size={{ xs: 12, md: 8 }}>
              <CartCard>
                <TableContainer>
                  <Table>
                    <TableHead>
                      <TableRow>
                        <TableHeader>Product Name</TableHeader>
                        <TableHeader width="150px" align="center">Quantity</TableHeader>
                        <TableHeader width="150px" align="center">Total</TableHeader>
                        <TableHeader width="150px" align="center">Action</TableHeader>
                      </TableRow>
                    </TableHead>
                    <TableBody>
                      {loading ? (
                        <ProductRow>
                          <ProductCell colSpan={4} align="center">
                            <Typography>Loading cart...</Typography>
                          </ProductCell>
                        </ProductRow>
                      ) : cartItems.length === 0 ? (
                        <ProductRow>
                          <ProductCell colSpan={4} align="center">
                            <Typography>Your cart is empty</Typography>
                          </ProductCell>
                        </ProductRow>
                      ) : (
                        cartItems.map((item) => (
                          <ProductRow key={item.cart_item_id}>
                            <ProductCell>
                              <ProductInfo>
                                <Box sx={{
                                  width: "80px",
                                  height: "80px",
                                  display: "flex",
                                  alignItems: "center",
                                  justifyContent: "center",
                                  backgroundColor: "#F9FAFB",
                                  borderRadius: "8px",
                                }}>
                                  <ProductImage
                                    src={getProductImage(item)}
                                    // alt={getProductName(item)}
                                    onError={(e) => {
                                      (e.target as HTMLImageElement).src =
                                        "";
                                    }}
                                  />
                                </Box>
                                <ProductDetails>
                                  <ProductName>{getProductName(item)}</ProductName>
                                  <ProductDescription>{getProductDescription(item)}</ProductDescription>
                                </ProductDetails>
                              </ProductInfo>
                            </ProductCell>
                            <ProductCell width="150px" align="center">
                              <QuantityControl>
                                <QuantityButton
                                  onClick={() => handleQuantityChange(item.cart_item_id, -1)}
                                  disabled={item.quantity <= 1}
                                >
                                  <Remove fontSize="small" />
                                </QuantityButton>
                                <QuantityInput
                                  type="number"
                                  value={item.quantity}
                                  readOnly
                                  min="1"
                                  sx={{
                                    border: "1px solid #202228",
                                    height: "27px",
                                    width: "27px",
                                    borderRadius: "4px",
                                    margin: "0 10px 0px 13px",
                                    fontSize: "16px",
                                    fontWeight: 500,
                                    fontFamily: "Figtree, sans-serif",
                                  }}
                                />
                                <QuantityButton
                                  onClick={() => handleQuantityChange(item.cart_item_id, 1)}
                                >
                                  <Add fontSize="small" />
                                </QuantityButton>
                              </QuantityControl>
                            </ProductCell>
                            <ProductCell width="150px" align="center">
                              <PriceText>
                                ₹ {item.total_price.toLocaleString("en-IN")}/-
                              </PriceText>
                            </ProductCell>
                            <ProductCell width="150px" align="center">
                              <DeleteButton
                                onClick={() => handleDeleteClick(item.cart_item_id)}
                                aria-label="delete"
                              >
                                <DeleteOutline />
                              </DeleteButton>
                            </ProductCell>
                          </ProductRow>
                        )))
                      }
                    </TableBody>
                  </Table>
                </TableContainer>
              </CartCard>
            </Grid>

            {/* Right Column - Order Summary */}
            <Grid size={{ xs: 12, md: 4 }}>
              <OrderSummaryCard>
                <SummaryTitle>Order Summary</SummaryTitle>

                <Stack spacing={2}>
                  <SummaryRow>
                    <SummaryLabel>Subtotal</SummaryLabel>
                    <SummaryValue>₹ {subtotal.toLocaleString("en-IN")}</SummaryValue>
                  </SummaryRow>
                  <SummaryRow>
                    <SummaryLabel>GST(18%)</SummaryLabel>
                    <SummaryValue>₹ {gst.toLocaleString("en-IN")}</SummaryValue>
                  </SummaryRow>
                  <SummaryRow>
                    <SummaryLabel>Delivery</SummaryLabel>
                    <SummaryValue>₹ {delivery.toLocaleString("en-IN")}</SummaryValue>
                  </SummaryRow>

                  <TotalRow>
                    <TotalLabel>Total</TotalLabel>
                    <TotalValue>₹ {total.toLocaleString("en-IN")}/-</TotalValue>
                  </TotalRow>
                </Stack>

                {/* <CouponContainer>
                  <CouponInput
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                  <ApplyButton onClick={handleApplyCoupon}>Apply</ApplyButton>
                </CouponContainer> */}

                <CheckoutButton onClick={handleCheckout}>
                  Proceed to checkout
                </CheckoutButton>
              </OrderSummaryCard>
            </Grid>
          </Grid>
        </CartContainer>

        {/* Login Modal */}
        <LoginModal
          open={loginModalOpen}
          onClose={() => {
            setLoginModalOpen(false);
          }}
          onSignUpClick={() => {
            setLoginModalOpen(false);
            setSignUpModalOpen(true);
          }}
          onLoginSuccess={handleLoginSuccess}
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
      </Container>

      {/* Delete Confirmation Modal */}
      <Dialog
        open={deleteConfirmOpen}
        onClose={handleCloseDeleteModal}
        PaperProps={{
          sx: {
            borderRadius: "12px",
            padding: "8px",
          }
        }}
      >
        <DialogTitle variant="sb20" sx={{ p: 0 }}>
          Confirm Removal
        </DialogTitle>
        <DialogContent sx={{
          padding: "20px 0px",
          mb: 3
        }}>
          <DialogContentText variant="m14" color="text.primary">
            Are you sure you want to remove this item from your cart?
          </DialogContentText>
        </DialogContent>
        <DialogActions sx={{ p: 0 }}>
          <Button
            onClick={handleCloseDeleteModal}
            variant="outlined"
            color="inherit"
            disabled={loading}
            sx={{
              padding: "10px 15px",
              color: "#121318",
              borderColor: "#E5E7EB",
              width: "136px",
            }}
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirmDelete}
            variant="contained"
            color="error"
            disabled={loading}
            sx={{
              padding: "10px 15px",
              width: "136px",
            }}

          >
            {loading ? "Removing..." : "Remove Item"}
          </Button>
        </DialogActions>
      </Dialog>
    </>
  );
};

export default Cart;

