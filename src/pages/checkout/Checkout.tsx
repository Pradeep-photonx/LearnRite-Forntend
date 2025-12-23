import React, { useState } from "react";
import {
    Box,
    Container,
    Typography,
    Button,
    Paper,
    Stack,
    IconButton,
    Radio,
    RadioGroup,
    FormControlLabel,
    FormControl,
    Link,
    styled,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import { Add, Remove } from "@mui/icons-material";
import dummyImage from "../../assets/images/sm-cart.png";
import dummyImage2 from "../../assets/images/sm-cart-1.png";
import AddAddressModal from "../../components/modals/AddAddressModal";
import type { AddressFormData } from "../../components/modals/AddAddressModal";

// Styled Components
const CheckoutContainer = styled(Box)({
    padding: "40px 0 80px 0",
    minHeight: "60vh",
});

const SectionCard = styled(Paper)({
    borderRadius: "12px",
    boxShadow: "unset",
    padding: "24px",
    backgroundColor: "#FFFFFF",
    marginBottom: "24px",
    width: "100%",
});

const SectionHeader = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "20px",
    paddingBottom: "16px",
    borderBottom: "1px solid #1214191A",
});


const AddressCard = styled(Box)({
    display: "flex",
    alignItems: "flex-start",
    gap: "10px",
    padding: "16px",
    border: "1px solid #1214191A",
    borderRadius: "12px",
    marginBottom: "12px",
    width: "100%",
    "&:last-child": {
        marginBottom: 0,
    },
});

const AddressInfo = styled(Box)({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "8px",
});

const AddressActions = styled(Box)({
    display: "flex",
    gap: "16px",
    alignItems: "center",
});



const PaymentMethodCard = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
    width: "100%",
});

const OrderSummaryCard = styled(Paper)({
    borderRadius: "12px",
    boxShadow: "0px 5px 40px 0px #E4E2DC99",
    padding: "24px",
    backgroundColor: "#FFFFFF",
    position: "sticky",
    top: "20px",
    height: "fit-content",
});

const OrderItem = styled(Box)({
    display: "flex",
    gap: "16px",
    padding: "16px 0",
    borderBottom: "1px solid #F0F0F0",
    // "&:last-child": {
    //     borderBottom: "none",
    // },
});

const ItemImage = styled("img")({
    width: "80px",
    height: "80px",
    objectFit: "contain",
    backgroundColor: "#F9FAFB",
    borderRadius: "8px",
    padding: "8px",
});

const ItemInfo = styled(Box)({
    flex: 1,
    display: "flex",
    flexDirection: "column",
    gap: "4px",
});

const ItemName = styled(Typography)({
    fontSize: "16px",
    fontWeight: 500,
    color: "#121318",
    fontFamily: "Figtree, sans-serif",
});

const ItemDescription = styled(Typography)({
    fontSize: "14px",
    color: "#6B7280",
    fontFamily: "Figtree, sans-serif",
});

const ItemPrice = styled(Typography)({
    fontSize: "16px",
    fontWeight: 600,
    color: "#121318",
    fontFamily: "Figtree, sans-serif",
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

const SummaryRow = styled(Box)({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    marginBottom: "12px",
});

const SummaryLabel = styled(Typography)({
    fontSize: "16px",
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

// const PlaceOrderButton = styled(Button)({
//   width: "100%",
//   padding: "14px 24px",
//   borderRadius: "8px",
//   background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
//   color: "#FFFFFF",
//   textTransform: "none",
//   fontSize: "16px",
//   fontWeight: 600,
//   fontFamily: "Figtree, sans-serif",
//   boxShadow: "0px 5px 10px 0px #2D60E745",
//   marginTop: "24px",
//   "&:hover": {
//     background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
//     boxShadow: "0px 5px 15px 0px #2D60E745",
//   },
// });

// Interfaces
interface Address {
    id: number;
    name: string;
    address: string;
    phone: string;
}

interface OrderItem {
    id: number;
    name: string;
    description: string;
    image: string;
    price: number;
    quantity: number;
}

// Sample Data
const sampleAddresses: Address[] = [
    {
        id: 1,
        name: "Raghavendar",
        address: "Flat No. 204, Sri Lakshmi Residency, Near HDFC Bank, Miyapur Main Road, Hyderabad, Telangana - 500039",
        phone: "+91 9876543210",
    },
    {
        id: 2,
        name: "Raghavendar",
        address: "Flat No. 204, Sri Lakshmi Residency, Near HDFC Bank, Miyapur Main Road, Hyderabad, Telangana - 500039",
        phone: "+91 9876543210",
    },
];

const sampleOrderItems: OrderItem[] = [
    {
        id: 1,
        name: "Lower Kindergarten",
        description: "Second language: Hindi",
        image: dummyImage,
        price: 2280,
        quantity: 1,
    },
    {
        id: 2,
        name: "Apsara A4 Size Long Notebook-ruled 120 Pages",
        description: "",
        image: dummyImage2,
        price: 488,
        quantity: 1,
    },
    {
        id: 3,
        name: "Apsara A4 Size Long Notebook-ruled 120 Pages",
        description: "",
        image: dummyImage2,
        price: 488,
        quantity: 1,
    },
];

const Checkout: React.FC = () => {
    const [selectedAddress, setSelectedAddress] = useState<number>(1);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [orderItems, setOrderItems] = useState<OrderItem[]>(sampleOrderItems);
    const [showAllAddresses, setShowAllAddresses] = useState(false);
    const [addAddressModalOpen, setAddAddressModalOpen] = useState(false);
    const [addresses, setAddresses] = useState<Address[]>(sampleAddresses);

    const displayedAddresses = showAllAddresses ? addresses : addresses.slice(0, 2);

    const handleAddAddress = (addressData: AddressFormData) => {
        // Create new address from form data
        const newAddress: Address = {
            id: addresses.length + 1,
            name: addressData.fullName,
            address: `${addressData.address}, ${addressData.city}, ${addressData.state} - ${addressData.pinCode}`,
            phone: addressData.phoneNumber,
        };
        setAddresses([...addresses, newAddress]);
        // Auto-select the newly added address
        setSelectedAddress(newAddress.id);
    };

    const handleQuantityChange = (id: number, change: number) => {
        setOrderItems((prevItems) =>
            prevItems.map((item) => {
                if (item.id === id) {
                    const newQuantity = Math.max(1, item.quantity + change);
                    return { ...item, quantity: newQuantity };
                }
                return item;
            })
        );
    };

    const handlePlaceOrder = () => {
        // Handle place order logic
        console.log("Placing order:", {
            addressId: selectedAddress,
            paymentMethod,
            items: orderItems,
        });
    };

    const subtotal = orderItems.reduce((sum, item) => sum + item.price * item.quantity, 0);
    const deliveryFee = 120;
    const total = subtotal + deliveryFee;

    return (
        <>
            {/* <Breadcrumb items={[{ label: "Home", path: "/home" }, { label: "Cart", path: "/cart" }, { label: "Checkout" }]} /> */}
            <CheckoutContainer>
                <Container maxWidth="xl">
                    <Grid container spacing={4}>
                        {/* Left Column - Address and Payment */}
                        <Grid size={{ xs: 12, md: 8 }}>
                            {/* Address Section */}
                            <SectionCard>
                                <SectionHeader>
                                    <Typography variant="m20">Address</Typography>
                                    <Button
                                        variant="outlined"
                                        color="primary"
                                        sx={{ padding: "10px 16px" }}
                                        onClick={() => setAddAddressModalOpen(true)}
                                    >
                                        Add new address
                                    </Button>
                                </SectionHeader>
                                <FormControl component="fieldset" sx={{ width: "100%" }}>
                                    <RadioGroup
                                        value={selectedAddress}
                                        onChange={(e) => setSelectedAddress(Number(e.target.value))}
                                    >
                                        {displayedAddresses.map((address) => (
                                            <AddressCard key={address.id}>
                                                <Radio
                                                    value={address.id}
                                                    sx={{
                                                        color: "#2C65F9",
                                                        padding: "0",
                                                        "&.Mui-checked": {
                                                            color: "#2C65F9",
                                                        },
                                                    }}
                                                />
                                                <AddressInfo>
                                                    <Typography variant="m16">{address.name}</Typography>
                                                    <Typography variant="m14">{address.address}</Typography>
                                                    <Typography variant="m16">Contact : {address.phone}</Typography>
                                                    <AddressActions>
                                                        <Button variant="text" sx={{ color: "#121419", fontWeight: 600 }}>Edit</Button>
                                                        <Typography variant="m16" color="text.secondary">|</Typography>
                                                        <Button variant="text" sx={{ color: "#121419", fontWeight: 600 }}>Delete</Button>
                                                    </AddressActions>
                                                </AddressInfo>
                                            </AddressCard>
                                        ))}
                                    </RadioGroup>
                                </FormControl>
                                {addresses.length > 1 && !showAllAddresses && (
                                    <Box sx=
                                        {{
                                            display: "flex",
                                            justifyContent: "center",
                                            alignItems: "center",
                                            width: "100%",
                                            paddingTop: "10px",
                                            borderTop: "1px solid #1214191A",
                                            marginTop: "30px"
                                        }}>
                                        <Button variant="text" sx={{ color: "#121419", fontWeight: 500 }} onClick={() => setShowAllAddresses(true)}>
                                            See More
                                        </Button>
                                    </Box>
                                )}
                            </SectionCard>

                            {/* Payment Method Section */}
                            <SectionCard>
                                <Typography variant="m20">Payment Method</Typography>

                                <PaymentMethodCard sx={{ marginTop: "20px" }}>
                                    <FormControl component="fieldset" sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%" }}>
                                        <RadioGroup
                                            value={paymentMethod}
                                            onChange={(e) => setPaymentMethod(e.target.value)}
                                            sx={{ display: "flex", alignItems: "center", justifyContent: "space-between", width: "100%", flexDirection: "row" }}
                                        >
                                            <FormControlLabel
                                                value="cash"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            color: "#2C65F9",
                                                            "&.Mui-checked": {
                                                                color: "#2C65F9",
                                                            },
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <Typography variant="m16" sx={{ fontFamily: "Figtree, sans-serif" }}>
                                                        Cash on Delivery
                                                    </Typography>
                                                }
                                            />
                                            <FormControlLabel
                                                value="upi"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            color: "#2C65F9",
                                                            "&.Mui-checked": {
                                                                color: "#2C65F9",
                                                            },
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <Typography variant="m16" sx={{ fontFamily: "Figtree, sans-serif" }}>
                                                        UPI Payment
                                                    </Typography>
                                                }
                                            />
                                            <FormControlLabel
                                                value="card"
                                                control={
                                                    <Radio
                                                        sx={{
                                                            color: "#2C65F9",
                                                            "&.Mui-checked": {
                                                                color: "#2C65F9",
                                                            },
                                                        }}
                                                    />
                                                }
                                                label={
                                                    <Typography variant="m16" sx={{ fontFamily: "Figtree, sans-serif" }}>
                                                        Credit/Debit Card
                                                    </Typography>
                                                }
                                            />
                                        </RadioGroup>
                                    </FormControl>
                                </PaymentMethodCard>
                            </SectionCard>
                        </Grid>

                        {/* Right Column - Order Summary */}
                        <Grid size={{ xs: 12, md: 4 }}>
                            <OrderSummaryCard>
                                <Typography variant="m20" sx={{ marginBottom: "24px" }}>Order Summary</Typography>

                                {/* Order Items */}
                                <Stack spacing={2} sx={{ marginBottom: "10px" }}>
                                    {orderItems.map((item) => (
                                        <OrderItem key={item.id}>
                                            <Box
                                                sx={{
                                                    width: "80px",
                                                    height: "80px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                    backgroundColor: "#F9FAFB",
                                                    borderRadius: "8px",
                                                }}
                                            >
                                                <ItemImage
                                                    src={item.image}
                                                    alt={item.name}
                                                    onError={(e) => {
                                                        (e.target as HTMLImageElement).src = "";
                                                    }}
                                                />
                                            </Box>
                                            <ItemInfo>
                                                <Stack spacing={2} sx={{ display: "flex", flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", height: "100%" }}>
                                                    <Stack width="70%">
                                                        <ItemName>{item.name}</ItemName>
                                                        {item.description && (
                                                            <ItemDescription>{item.description}</ItemDescription>
                                                        )}
                                                    </Stack>
                                                    <ItemPrice>₹ {(item.price * item.quantity).toLocaleString("en-IN")}/-</ItemPrice>
                                                </Stack>

                                                <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                                                    <Box>
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
                                                        <QuantityButton onClick={() => handleQuantityChange(item.id, 1)}>
                                                            <Add fontSize="small" />
                                                        </QuantityButton>
                                                    </Box>
                                                </Box>
                                            </ItemInfo>
                                        </OrderItem>
                                    ))}
                                </Stack>

                                {/* Summary Totals */}
                                <Stack spacing={2}>
                                    <SummaryRow>
                                        <SummaryLabel>Sub Total</SummaryLabel>
                                        <SummaryValue>₹ {subtotal.toLocaleString("en-IN")}/-</SummaryValue>
                                    </SummaryRow>
                                    <SummaryRow>
                                        <SummaryLabel>Delivery Fee</SummaryLabel>
                                        <SummaryValue>₹ {deliveryFee.toLocaleString("en-IN")}/-</SummaryValue>
                                    </SummaryRow>
                                    <TotalRow>
                                        <TotalLabel>Total</TotalLabel>
                                        <TotalValue>₹ {total.toLocaleString("en-IN")}/-</TotalValue>
                                    </TotalRow>
                                </Stack>

                                <Button variant="contained" sx={{ width: "100%", marginTop: "24px" }} color="primary" onClick={handlePlaceOrder}>
                                    Place order
                                </Button>
                            </OrderSummaryCard>
                        </Grid>
                    </Grid>
                </Container>

                {/* Add Address Modal */}
                <AddAddressModal
                    open={addAddressModalOpen}
                    onClose={() => setAddAddressModalOpen(false)}
                    onAddAddress={handleAddAddress}
                />
            </CheckoutContainer>
        </>
    );
};

export default Checkout;

