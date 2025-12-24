import React, { useState } from "react";
// import { useNavigate } from "react-router-dom";
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
    TextField,
    styled,
    Dialog,
    DialogTitle,
    DialogContent,
    DialogActions,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import dummyImage from "../../assets/images/sm-cart.png";
import Breadcrumb from "../../components/Breadcrumb";
import AddAddressModal from "../../components/modals/AddAddressModal";
import type { AddressFormData } from "../../components/modals/AddAddressModal";
import { getAddressList, deleteAddress } from "../../api/address";
import { getCartDetails, updateCartItemQuantity, type CartItem } from "../../api/cart";
import { placeOrder, type PlaceOrderPayload } from "../../api/order";
import { useEffect } from "react";
import toast from "react-hot-toast";

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
    address_id: number;
    first_name: string;
    address1: string;
    phone: string;
    city: string;
    pincode: number | string;
    state_id: string;
}

// (Removed OrderItem interface as we'll use CartItem)

// Sample Data
// const sampleAddresses: Address[] = [
//     {
//         id: 1,
//         name: "Raghavendar",
//         address: "Flat No. 204, Sri Lakshmi Residency, Near HDFC Bank, Miyapur Main Road, Hyderabad, Telangana - 500039",
//         phone: "+91 9876543210",
//     },
//     {
//         id: 2,
//         name: "Raghavendar",
//         address: "Flat No. 204, Sri Lakshmi Residency, Near HDFC Bank, Miyapur Main Road, Hyderabad, Telangana - 500039",
//         phone: "+91 9876543210",
//     },
// ];

// Removed sampleOrderItems

const Checkout: React.FC = () => {
    // const navigate = useNavigate();
    const [selectedAddress, setSelectedAddress] = useState<number | null>(null);
    const [paymentMethod, setPaymentMethod] = useState("cash");
    const [cartItems, setCartItems] = useState<CartItem[]>([]);
    const [cartLoading, setCartLoading] = useState(true);
    const [showAllAddresses, setShowAllAddresses] = useState(false);
    const [addAddressModalOpen, setAddAddressModalOpen] = useState(false);
    const [addresses, setAddresses] = useState<Address[]>([]);
    const [addressesLoading, setAddressesLoading] = useState(true);
    const [deleteConfirmOpen, setDeleteConfirmOpen] = useState(false);
    const [addressToDelete, setAddressToDelete] = useState<number | null>(null);
    const [deleting, setDeleting] = useState(false);
    const [addressToEdit, setAddressToEdit] = useState<Address | null>(null);
    const [couponCode, setCouponCode] = useState("");

    const fetchAddresses = async () => {
        setAddressesLoading(true);
        try {
            const response = await getAddressList();
            let addressData: Address[] = [];

            if (Array.isArray(response)) {
                addressData = response;
            } else if (response && response.user_address) {
                addressData = response.user_address;
            } else if (response && response.addresses) {
                addressData = response.addresses;
            }

            setAddresses(addressData);
            if (addressData.length > 0 && !selectedAddress) {
                setSelectedAddress(addressData[0].address_id);
            }
        } catch (error) {
            console.error("Failed to fetch addresses:", error);
        } finally {
            setAddressesLoading(false);
        }
    };

    const fetchCartData = async () => {
        setCartLoading(true);
        try {
            const data = await getCartDetails();
            if (data.user_cart && data.user_cart.length > 0) {
                setCartItems(data.user_cart[0].CartItems || []);
            }
        } catch (error: any) {
            console.error("Failed to fetch cart:", error);
            toast.error("Failed to load cart items");
        } finally {
            setCartLoading(false);
        }
    };

    useEffect(() => {
        fetchAddresses();
        fetchCartData();
    }, []);

    const displayedAddresses = showAllAddresses ? addresses : addresses.slice(0, 2);

    const handleAddAddress = (addressData: AddressFormData) => {
        // Just refresh the list from the API since the modal already called create
        fetchAddresses();
    };

    const handleQuantityChange = async (cartItemId: number, change: number) => {
        const item = cartItems.find(i => i.cart_item_id === cartItemId);
        if (!item) return;

        const newQuantity = Math.max(1, item.quantity + change);
        if (newQuantity === item.quantity) return;

        try {
            await updateCartItemQuantity({ cart_item_id: cartItemId, quantity: newQuantity });
            setCartItems((prevItems) =>
                prevItems.map((i) =>
                    i.cart_item_id === cartItemId ? { ...i, quantity: newQuantity, total_price: i.unit_price * newQuantity } : i
                )
            );
        } catch (error: any) {
            console.error("Failed to update quantity:", error);
            toast.error("Failed to update quantity");
        }
    };

    const handlePlaceOrder = async () => {
        if (!selectedAddress) {
            toast.error("Please select a shipping address");
            return;
        }

        const payload: PlaceOrderPayload = {
            order_items: cartItems
                .filter(item => item.cl_id !== null)
                .map(item => ({
                    cl_id: item.cl_id,
                    school_id: (item as any).school_id || 0, // Fallback to 0 if not present
                    admission_id: item.admission_id,
                    student_name: item.student_name,
                    class_id: item.class_id,
                    quantity: item.quantity,
                    bundle_products: item.CartItemBundles.map(bp => ({
                        product_id: bp.product_id,
                        quantity: bp.quantity
                    }))
                })),
            products: cartItems
                .filter(item => item.product_id !== null && item.cl_id === null)
                .map(item => ({
                    product_id: item.product_id!,
                    quantity: item.quantity
                })),
            shipping_address_id: selectedAddress,
            billing_address_id: selectedAddress,
            couponcode: couponCode,
            payment_type: paymentMethod
        };

        try {
            const response = await placeOrder(payload);
            toast.success(response.message || "Order placed successfully!");
            // navigate("/order-success"); // Redirect after success
        } catch (error: any) {
            console.error("Failed to place order:", error);
            toast.error(error.response?.data?.message || "Failed to place order. Please try again.");
        }
    };

    // Helper functions from Cart.tsx
    const getProductImage = (item: CartItem): string => {
        if (item.Product?.image1) {
            return `${import.meta.env.VITE_API_BASE_URL}/${item.Product.image1}`;
        }
        if (item.Class?.image) {
            return item.Class.image;
        }
        return dummyImage;
    };

    const getProductName = (item: CartItem): string => {
        if (item.Product) return item.Product.name;
        if (item.Class?.name) return item.Class.name;
        if (item.ClassLanguage?.Class?.name) return item.ClassLanguage.Class.name;
        if (item.student_class) return item.student_class;
        if (item.bundle_name) return item.bundle_name;
        return "Class Bundle";
    };

    const getProductDescription = (item: CartItem): string => {
        if (item.Product) return item.Product.description || "";
        if (item.CartItemBundles && item.CartItemBundles.length > 0) {
            const bundleCount = item.CartItemBundles.length;
            const language = item.ClassLanguage?.language || "";
            return `1 Unit (${bundleCount} items), ${language}`;
        }
        return "";
    };

    const subtotal = cartItems.reduce((sum, item) => sum + item.total_price, 0);
    const gst = Math.round(subtotal * 0.18);
    const deliveryFee = 50; // Free delivery matching Cart.tsx
    const total = subtotal + gst + deliveryFee;

    const handleEditClick = (address: Address) => {
        setAddressToEdit(address);
        setAddAddressModalOpen(true);
    };

    const handleDeleteClick = (addressId: number) => {
        setAddressToDelete(addressId);
        setDeleteConfirmOpen(true);
    };

    const handleConfirmDelete = async () => {
        if (!addressToDelete) return;
        setDeleting(true);
        try {
            await deleteAddress(addressToDelete);
            toast.success("Address deleted successfully");
            setDeleteConfirmOpen(false);
            setAddressToDelete(null);
            fetchAddresses(); // Refresh list
        } catch (error: any) {
            console.error("Failed to delete address:", error);
            toast.error(error.response?.data?.message || "Failed to delete address");
        } finally {
            setDeleting(false);
        }
    };

    const handleCloseDeleteModal = () => {
        setDeleteConfirmOpen(false);
        setAddressToDelete(null);
    };



    return (
        <>
            <Breadcrumb items={[{ label: "Home", path: "/home" }, { label: "Cart", path: "/cart" }, { label: "Checkout" }]} />
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
                                        {addressesLoading ? (
                                            <Box sx={{ py: 4, textAlign: "center" }}>
                                                <Typography color="text.secondary">Loading addresses...</Typography>
                                            </Box>
                                        ) : addresses.length === 0 ? (
                                            <Box sx={{ py: 4, textAlign: "center" }}>
                                                <Typography color="text.secondary">No addresses found. Please add a new address.</Typography>
                                            </Box>
                                        ) : (
                                            displayedAddresses.map((address) => (
                                                <AddressCard key={address.address_id}>
                                                    <Radio
                                                        value={address.address_id}
                                                        sx={{
                                                            color: "#2C65F9",
                                                            padding: "0",
                                                            "&.Mui-checked": {
                                                                color: "#2C65F9",
                                                            },
                                                        }}
                                                    />
                                                    <AddressInfo>
                                                        <Typography variant="m16">{address.first_name}</Typography>
                                                        <Typography variant="m14">{address.address1}, {address.city}, {address.state_id} - {address.pincode}</Typography>
                                                        <Typography variant="m16">Contact : {address.phone}</Typography>
                                                        <AddressActions>
                                                            <Button
                                                                variant="text"
                                                                sx={{ color: "#121419", fontWeight: 600 }}
                                                                onClick={() => handleEditClick(address)}
                                                            >
                                                                Edit
                                                            </Button>
                                                            <Typography variant="m16" color="text.secondary">|</Typography>
                                                            <Button
                                                                variant="text"
                                                                sx={{ color: "#121419", fontWeight: 600 }}
                                                                onClick={() => handleDeleteClick(address.address_id)}
                                                            >
                                                                Delete
                                                            </Button>
                                                        </AddressActions>
                                                    </AddressInfo>
                                                </AddressCard>
                                            ))
                                        )}
                                    </RadioGroup>
                                </FormControl>
                                {addresses.length > 2 && (
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
                                        <Button
                                            variant="text"
                                            sx={{ color: "#121419", fontWeight: 500 }}
                                            onClick={() => setShowAllAddresses(!showAllAddresses)}
                                        >
                                            {showAllAddresses ? "See Less" : "See More"}
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
                                    {cartLoading ? (
                                        <Typography sx={{ py: 2, textAlign: "center" }}>Loading items...</Typography>
                                    ) : cartItems.length === 0 ? (
                                        <Typography sx={{ py: 2, textAlign: "center" }}>Your cart is empty</Typography>
                                    ) : (
                                        cartItems.map((item) => (
                                            <OrderItem key={item.cart_item_id}>
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
                                                        src={getProductImage(item)}
                                                        alt={getProductName(item)}
                                                        onError={(e) => {
                                                            (e.target as HTMLImageElement).src = dummyImage;
                                                        }}
                                                    />
                                                </Box>
                                                <ItemInfo>
                                                    <Stack spacing={2} sx={{ display: "flex", flexDirection: "row", alignItems: "baseline", justifyContent: "space-between", height: "100%" }}>
                                                        <Stack width="70%">
                                                            <ItemName>{getProductName(item)}</ItemName>
                                                            {getProductDescription(item) && (
                                                                <ItemDescription>{getProductDescription(item)}</ItemDescription>
                                                            )}
                                                        </Stack>
                                                        <ItemPrice>₹ {item.total_price.toLocaleString("en-IN")}/-</ItemPrice>
                                                    </Stack>

                                                    {/* <Box sx={{ display: "flex", justifyContent: "space-between", alignItems: "center", }}>
                                                        <Box>
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
                                                            <QuantityButton onClick={() => handleQuantityChange(item.cart_item_id, 1)}>
                                                                <Add fontSize="small" />
                                                            </QuantityButton>
                                                        </Box>
                                                    </Box> */}
                                                </ItemInfo>
                                            </OrderItem>
                                        ))
                                    )}
                                </Stack>


                                {/* Summary Totals */}
                                <Stack spacing={2}>
                                    <SummaryRow>
                                        <SummaryLabel>Sub Total</SummaryLabel>
                                        <SummaryValue>₹ {subtotal.toLocaleString("en-IN")}/-</SummaryValue>
                                    </SummaryRow>
                                    <SummaryRow>
                                        <SummaryLabel>GST (18%)</SummaryLabel>
                                        <SummaryValue>₹ {gst.toLocaleString("en-IN")}/-</SummaryValue>
                                    </SummaryRow>
                                    <SummaryRow>
                                        <SummaryLabel>Delivery Fee</SummaryLabel>
                                        <SummaryValue>{deliveryFee === 50 ? "₹ 50/-" : `₹ ${deliveryFee}/-`}</SummaryValue>
                                    </SummaryRow>
                                    <TotalRow>
                                        <TotalLabel>Total</TotalLabel>
                                        <TotalValue>₹ {total.toLocaleString("en-IN")}/-</TotalValue>
                                    </TotalRow>
                                    {/* Coupon Code */}
                                    <Box sx={{ marginBottom: "24px", paddingTop: "10px" }}>
                                        {/* <Typography variant="m16" sx={{ marginBottom: "12px", display: "block" }}>Apply Coupon</Typography> */}
                                        <Box sx={{ display: "flex", gap: "12px" }}>
                                            <TextField
                                                fullWidth
                                                placeholder="Enter coupon code"
                                                value={couponCode}
                                                onChange={(e: React.ChangeEvent<HTMLInputElement>) => setCouponCode(e.target.value)}
                                                sx={{
                                                    "& .MuiInputBase-root": {
                                                        height: "44px",
                                                        backgroundColor: "#F9FAFB",
                                                    }
                                                }}
                                            />
                                            <Button variant="outlined" sx={{ height: "44px", whiteSpace: "nowrap" }}>
                                                Apply
                                            </Button>
                                        </Box>
                                    </Box>
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
                    onClose={() => {
                        setAddAddressModalOpen(false);
                        setAddressToEdit(null);
                    }}
                    onAddAddress={handleAddAddress}
                    initialData={addressToEdit}
                />

                {/* Delete Confirmation Modal */}
                <Dialog
                    open={deleteConfirmOpen}
                    onClose={handleCloseDeleteModal}
                    PaperProps={{
                        sx: {
                            borderRadius: "12px",
                            padding: "24px",
                        }
                    }}
                >
                    <DialogTitle variant="sb20" sx={{ p: 0, fontWeight: 600, mb: 4 }}>Delete Address</DialogTitle>
                    <DialogContent sx={{
                        padding: "20px 0px",
                        mb: 3
                    }}>
                        <Typography variant="m14" color="text.primary">
                            Are you sure you want to delete this address? This action cannot be undone.
                        </Typography>
                    </DialogContent >
                    <DialogActions sx={{ padding: "16px 24px" }}>
                        <Button
                            variant="outlined"
                            onClick={handleCloseDeleteModal}
                            disabled={deleting}
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
                            disabled={deleting}
                            sx={{
                                padding: "10px 15px",
                                width: "136px",
                            }}
                        >
                            {deleting ? "Deleting..." : "Delete"}
                        </Button>
                    </DialogActions>
                </Dialog>
            </CheckoutContainer>
        </>
    );
};

export default Checkout;

