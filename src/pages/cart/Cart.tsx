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
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Add, Remove, DeleteOutline } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import dummyImage from "../../assets/images/sm-cart.png";
import dummyImage2 from "../../assets/images/sm-cart-1.png";
import LoginModal from "../../components/modals/LoginModal";
import SignUpModal from "../../components/modals/SignUpModal";
// import Breadcrumb from "../../components/Breadcrumb";
// import theme from "../../Theme";

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
  boxShadow: "0px 5px 10px 0px #2D60E745",
  "&:hover": {
    background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
    boxShadow: "0px 5px 15px 0px #2D60E745",
  },
});

// Product Interface
interface CartProduct {
  id: number;
  name: string;
  description: string;
  image: string;
  price: number;
  quantity: number;
}

// Sample Cart Data
const initialCartItems: CartProduct[] = [
  {
    id: 1,
    name: "Lower Kindergarten",
    description: "1 Unit (15 items), Hindi",
    image: dummyImage,
    price: 2280,
    quantity: 1,
  },
  {
    id: 2,
    name: "Apsara A4 Size Long Notebook-ruled 120 Pages",
    description: "1 Unit (5 pieces)",
    image: dummyImage2,
    price: 489,
    quantity: 1,
  },
  {
    id: 3,
    name: "Apsara A4 Size Long Notebook-ruled 120 Pages",
    description: "1 Unit (5 pieces)",
    image: "/api/placeholder/80/80",
    price: 489,
    quantity: 1,
  },
];

const Cart: React.FC = () => {
  const navigate = useNavigate();
  const [cartItems, setCartItems] = useState<CartProduct[]>(initialCartItems);
  const [couponCode, setCouponCode] = useState("");
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  // Check if user is logged in (using localStorage for now)
  const isLoggedIn = () => {
    return localStorage.getItem("isLoggedIn") === "true";
  };

  const handleQuantityChange = (id: number, change: number) => {
    setCartItems((prevItems) =>
      prevItems.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + change);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const handleRemoveItem = (id: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== id));
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

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
  const gst = Math.round(subtotal * 0.18);
  const delivery = 0; // Free delivery
  const total = subtotal + gst + delivery;

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
                      {cartItems.map((item) => (
                        <ProductRow key={item.id}>
                          <ProductCell>
                            <ProductInfo>
                              <Box sx={{
                                width: "80px",
                                height: "80px",
                                display:"flex",
                                alignItems: "center",
                                justifyContent: "center",
                                backgroundColor: "#F9FAFB",
                                borderRadius: "8px",
                              }}>
                              <ProductImage
                                src={item.image}
                                alt={item.name}
                                onError={(e) => {
                                  (e.target as HTMLImageElement).src =
                                    "";
                                }}
                              />
                              </Box>
                              <ProductDetails>
                                <ProductName>{item.name}</ProductName>
                                <ProductDescription>{item.description}</ProductDescription>
                              </ProductDetails>
                            </ProductInfo>
                          </ProductCell>
                          <ProductCell width="150px" align="center">
                            <QuantityControl>
                              <QuantityButton
                                onClick={() => handleQuantityChange(item.id, -1)}
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
                                onClick={() => handleQuantityChange(item.id, 1)}
                              >
                                <Add fontSize="small" />
                              </QuantityButton>
                            </QuantityControl>
                          </ProductCell>
                          <ProductCell width="150px" align="center">
                            <PriceText>
                              ₹ {(item.price * item.quantity).toLocaleString("en-IN")}/-
                            </PriceText>
                          </ProductCell>
                          <ProductCell width="150px" align="center">
                            <DeleteButton
                              onClick={() => handleRemoveItem(item.id)}
                              aria-label="delete"
                            >
                              <DeleteOutline />
                            </DeleteButton>
                          </ProductCell>
                        </ProductRow>
                      ))}
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
                    <SummaryValue>Free</SummaryValue>
                  </SummaryRow>

                  <TotalRow>
                    <TotalLabel>Total</TotalLabel>
                    <TotalValue>₹ {total.toLocaleString("en-IN")}/-</TotalValue>
                  </TotalRow>
                </Stack>

                <CouponContainer>
                  <CouponInput
                    placeholder="Enter coupon code"
                    value={couponCode}
                    onChange={(e) => setCouponCode(e.target.value)}
                    variant="outlined"
                    size="small"
                  />
                  <ApplyButton onClick={handleApplyCoupon}>Apply</ApplyButton>
                </CouponContainer>

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
    </>
  );
};

export default Cart;

