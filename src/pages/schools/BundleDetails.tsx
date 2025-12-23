import React, { useState, useEffect, useMemo } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  styled,
  Stack,
  CircularProgress,
  Checkbox,
} from "@mui/material";
import { ExpandMore, KeyboardArrowUp } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import theme from "../../Theme";
import CommonModal from "../../components/modals/StudentVerifyModal";
import type { FormField } from "../../components/modals/StudentVerifyModal";
import { useBundleDetail } from "../../api/useBundleDetail";
import type { School } from "../../api/school";

// Styled Components
const BundleContainer = styled(Box)(() => ({
  padding: "40px 0 80px 0",
  // backgroundColor: "#FFFFFF",
  // [theme.breakpoints.down("md")]: {
  //   padding: "30px 0 60px 0",
  // },
}));

const LeftSection = styled(Box)(({ theme }) => ({
  [theme.breakpoints.down("md")]: {
    marginBottom: "40px",
  },
}));

const RightSection = styled(Box)(({ theme }) => ({
  position: "sticky",
  top: "20px",
  height: "fit-content",

  [theme.breakpoints.down("md")]: {
    position: "relative",
    top: 0,
  },
}));

const ClassTitle = styled(Typography)({
  marginBottom: "8px",
});

const SchoolName = styled(Typography)({
  marginBottom: "24px",
  color: "#445061",
});

const LanguageSection = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  alignItems: "left",
  gap: "05px",
});

const LanguageLabel = styled(Typography)({
  // marginBottom: "16px",
  fontWeight: 600,
  color: "#121318",
});

const SectionTitle = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  width: "100%",
  padding: "0 8px",
});

const SectionTitleText = styled(Box)({
  display: "flex",
  flexDirection: "column",
  justifyContent: "left",
  alignItems: "left",
  gap: "2px",
});

const BookItem = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "flex-start",
  padding: "15px 20px 15px 20px",
  backgroundColor: "#F9F9F9",
  borderRadius: "12px",
  "&:last-child": {
    borderBottom: "none",
  },
});

const BookName = styled(Typography)({
  flex: 1,
  color: "#121318",
});

const BookDetails = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "16px",
});

const PriceDisplay = styled(Box)({
  textAlign: "right",
  marginBottom: "32px",
});

const BundleSummary = styled(Box)({
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  padding: "20px",
  boxShadow: "0px 5px 40px 0px #E4E2DC99",

});



const SummaryItem = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
});

;

const PriceBreakdown = styled(Box)({
  marginTop: "20px",
});

const PriceRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "12px",
});

const TotalRow = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginTop: "20px",
  paddingTop: "16px",
  borderTop: "1px solid #E5E7EB",
});

const AddToCartButton = styled(Button)({
  width: "100%",
  marginTop: "24px",
});

// Data Interfaces
interface BookItem {
  id: number | string;
  name: string;
  quantity: number;
  price: number;
}



const BundleDetails: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [commonBooksExpanded, setCommonBooksExpanded] = useState(true);
  const [verifyStudentModalOpen, setVerifyStudentModalOpen] = useState(false);

  const passedClassItem = location.state?.classItem;
  const school = location.state?.school as School | undefined;

  const { bundle, loading, error } = useBundleDetail(passedClassItem?.bundle_id || null);

  const [stationeryExpanded, setStationeryExpanded] = useState(true);
  const [selectedOptionalProductIds, setSelectedOptionalProductIds] = useState<number[]>([]);

  // Filter products based on mandatory flag
  const mandatoryProducts = useMemo(() => bundle?.products?.filter((p) => p.is_mandatory) || [], [bundle]);
  const optionalProducts = useMemo(() => bundle?.products?.filter((p) => !p.is_mandatory) || [], [bundle]);

  // Initialize selectedOptionalProductIds with all optional product IDs when bundle loads
  useEffect(() => {
    if (optionalProducts.length > 0) {
      setSelectedOptionalProductIds(optionalProducts.map(p => p.product_id));
    }
  }, [optionalProducts]);

  // Calculate total price based on selection
  const totalPrice = useMemo(() => {
    let total = 0;
    // Add mandatory products price
    mandatoryProducts.forEach(p => {
      total += p.total_price;
    });
    // Add selected optional products price
    optionalProducts.forEach(p => {
      if (selectedOptionalProductIds.includes(p.product_id)) {
        total += p.total_price;
      }
    });
    return total;
  }, [mandatoryProducts, optionalProducts, selectedOptionalProductIds]);

  const handleOptionalProductToggle = (productId: number) => {
    setSelectedOptionalProductIds(prev => {
      if (prev.includes(productId)) {
        return prev.filter(id => id !== productId);
      } else {
        return [...prev, productId];
      }
    });
  };

  // Form state for Verify Student Modal
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [classGrade, setClassGrade] = useState("");
  const [schoolName, setSchoolName] = useState("");

  const handleAddToCart = () => {
    // Open verify student modal before adding to cart
    setVerifyStudentModalOpen(true);
  };

  const handleVerifyAdmission = () => {
    // Handle verify admission number logic
    console.log("Verifying admission number:", admissionNumber);
    // After verification, you can auto-fill other fields if needed
  };

  const handleConfirmAndAddToCart = () => {
    // Handle confirm and add to cart logic
    console.log("Confirm and add to cart", {
      admissionNumber,
      studentName,
      classGrade,
      schoolName,
      bundle,
      selectedOptionalProductIds
    });
    // Close modal after confirmation
    setVerifyStudentModalOpen(false);
    // Reset form
    setAdmissionNumber("");
    setStudentName("");
    setClassGrade("");
    setSchoolName("");
    // Navigate to cart page
    navigate("/cart");
  };

  const handleCloseModal = () => {
    setVerifyStudentModalOpen(false);
    // Reset form on close
    setAdmissionNumber("");
    setStudentName("");
    setClassGrade("");
    setSchoolName("");
  };

  // Form fields configuration for Verify Student Modal
  const verifyStudentFormFields: FormField[] = [
    {
      id: "admissionNumber",
      label: "Admission Number",
      placeholder: "Enter Admission Number",
      type: "text",
      required: true,
      value: admissionNumber,
      onChange: setAdmissionNumber,
      verifyButton: {
        label: "Verify",
        onClick: handleVerifyAdmission,
        disabled: !admissionNumber.trim(),
      },
    },
    {
      id: "studentName",
      label: "Student Name",
      placeholder: "Enter Student Name",
      type: "text",
      required: true,
      value: studentName,
      onChange: setStudentName,
    },
    {
      id: "classGrade",
      label: "Class / Grade",
      placeholder: "Enter Class / Grade",
      type: "text",
      required: true,
      value: classGrade,
      onChange: setClassGrade,
    },
    {
      id: "schoolName",
      label: "School Name",
      placeholder: "Enter School Name",
      type: "text",
      required: true,
      value: schoolName,
      onChange: setSchoolName,
    },
  ];

  return (
    <Container maxWidth="xl">
      {loading ? (
        <Box sx={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
          <CircularProgress />
        </Box>
      ) : error ? (
        <Box sx={{ textAlign: "center", padding: "100px 0" }}>
          <Typography variant="h5" color="error">{error}</Typography>
          <Button onClick={() => navigate(-1)} sx={{ marginTop: "20px" }}>Go Back</Button>
        </Box>
      ) : !bundle ? (
        <Box sx={{ textAlign: "center", padding: "100px 0" }}>
          <Typography variant="h5">Bundle not found.</Typography>
          <Button onClick={() => navigate(-1)} sx={{ marginTop: "20px" }}>Go Back</Button>
        </Box>
      ) : (
        <BundleContainer>
          <Stack direction="column" justifyContent="left" alignItems="left">
            <Stack direction="row" justifyContent="space-between" alignItems="flex-start"
              sx={{
                border: "1px solid #CFCDCD4D",
                padding: "30px",
                background: "#FFFFFF",
                borderRadius: "12px",
                marginBottom: "20px",
              }}
            >
              <Stack direction="column" justifyContent="left" alignItems="left">
                <ClassTitle variant="m32">
                  {bundle.name}
                </ClassTitle>
                <SchoolName variant="r16" color="text.secondary">
                  {bundle.school?.name || school?.name || "School Name"}
                </SchoolName>
              </Stack>
              <PriceDisplay display="flex" flexDirection="column" justifyContent="left" alignItems="left">
                <Typography
                  variant="sb32"
                  sx={{
                    color: "#155DFC",

                  }}
                >
                  ₹ {totalPrice.toLocaleString("en-IN")}
                </Typography>
                <Typography variant="r14" color="text.secondary">
                  inc of all taxes
                </Typography>
              </PriceDisplay>
            </Stack>
          </Stack>
          <Grid container spacing={4}>
            {/* Left Section */}
            <Grid size={{ xs: 12, md: 8 }}>
              <LeftSection sx={{
                "& .MuiPaper-root": {
                  borderTopLeftRadius: "13px !important",
                  borderTopRightRadius: "13px !important",
                  borderBottomLeftRadius: "13px !important",
                  borderBottomRightRadius: "13px !important",
                  overflow: "hidden",
                  "& .MuiAccordionSummary-expandIconWrapper": {
                    transform: "rotate(0deg) !important",
                  },
                },
              }}>

                {/* Common Books Section (Mandatory) */}
                {mandatoryProducts.length > 0 && (
                  <Accordion
                    expanded={commonBooksExpanded}
                    onChange={() => setCommonBooksExpanded(!commonBooksExpanded)}
                    sx={{
                      boxShadow: "none",
                      borderRadius: "12px",
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#FFFFFF",
                      marginBottom: "16px",
                      "&:before": {
                        display: "none",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <IconButton size="small">
                          {commonBooksExpanded ? (
                            <KeyboardArrowUp sx={{ color: "#121318" }} />
                          ) : (
                            <ExpandMore sx={{ color: "#121318" }} />
                          )}
                        </IconButton>
                      }
                      sx={{
                        padding: "5px 20px",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                        backgroundColor: "#DFE6F7",
                        minHeight: "auto !important",
                        "& .MuiAccordionSummary-content": {
                          margin: "0 !important",

                        },
                      }}
                    >
                      <SectionTitle>
                        <SectionTitleText>
                          <Typography variant="m18"
                            sx={{
                              fontFamily: "Figtree, sans-serif",
                            }}>
                            Common Books
                          </Typography>
                          <Typography variant="r14"
                            sx={{
                              color: theme.palette.text.secondary,
                              fontFamily: "Figtree, sans-serif",
                            }}
                          >
                            {mandatoryProducts.length} Items
                          </Typography>
                        </SectionTitleText>
                      </SectionTitle>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        padding: "15px 30px",
                        backgroundColor: "#FFF",
                        borderBottomLeftRadius: "12px",
                        borderBottomRightRadius: "12px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "left",
                        alignItems: "left",
                        gap: "15px",
                      }}>
                      {mandatoryProducts.map((product, index) => (
                        <BookItem key={product.product_id || index}>
                          <Stack direction="column" justifyContent="left" alignItems="left" gap="5px">
                            <BookName variant="sb16">{product.product_name}</BookName>
                            <Typography variant="m14">
                              Qty: {product.quantity}
                            </Typography>
                          </Stack>
                          <BookDetails>
                            <Typography variant="sb20">
                              ₹ {product.price?.toLocaleString("en-IN")}/-
                            </Typography>
                          </BookDetails>
                        </BookItem>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                )}

                {/* Stationery Section (Optional) */}
                {optionalProducts.length > 0 && (
                  <Accordion
                    expanded={stationeryExpanded}
                    onChange={() => setStationeryExpanded(!stationeryExpanded)}
                    sx={{
                      boxShadow: "none",
                      borderRadius: "12px",
                      border: "1px solid #E5E7EB",
                      backgroundColor: "#FFFFFF",
                      marginBottom: "16px",
                      "&:before": {
                        display: "none",
                      },
                    }}
                  >
                    <AccordionSummary
                      expandIcon={
                        <IconButton size="small">
                          {stationeryExpanded ? (
                            <KeyboardArrowUp sx={{ color: "#121318" }} />
                          ) : (
                            <ExpandMore sx={{ color: "#121318" }} />
                          )}
                        </IconButton>
                      }
                      sx={{
                        padding: "5px 20px",
                        borderTopLeftRadius: "12px",
                        borderTopRightRadius: "12px",
                        backgroundColor: "#DFE6F7",
                        minHeight: "auto !important",
                        "& .MuiAccordionSummary-content": {
                          margin: "0 !important",

                        },
                      }}
                    >
                      <SectionTitle>
                        <SectionTitleText>
                          <Typography variant="m18"
                            sx={{
                              fontFamily: "Figtree, sans-serif",
                            }}>
                            Stationery
                          </Typography>
                          <Typography variant="r14"
                            sx={{
                              color: theme.palette.text.secondary,
                              fontFamily: "Figtree, sans-serif",
                            }}
                          >
                            {optionalProducts.length} Items (Select to add)
                          </Typography>
                        </SectionTitleText>
                      </SectionTitle>
                    </AccordionSummary>
                    <AccordionDetails
                      sx={{
                        padding: "15px 30px",
                        backgroundColor: "#FFF",
                        borderBottomLeftRadius: "12px",
                        borderBottomRightRadius: "12px",
                        display: "flex",
                        flexDirection: "column",
                        justifyContent: "left",
                        alignItems: "left",
                        gap: "15px",
                      }}>
                      {optionalProducts.map((product, index) => (
                        <BookItem key={product.product_id || index}>
                          <Box sx={{ display: 'flex', alignItems: 'center' }}>
                            <Checkbox
                              checked={selectedOptionalProductIds.includes(product.product_id)}
                              onChange={() => handleOptionalProductToggle(product.product_id)}
                              sx={{ padding: '0 10px 0 0' }}
                            />
                            <Stack direction="column" justifyContent="left" alignItems="left" gap="5px">
                              <BookName variant="sb16">{product.product_name}</BookName>
                              <Typography variant="m14">
                                Qty: {product.quantity}
                              </Typography>
                            </Stack>
                          </Box>
                          <BookDetails>
                            <Typography variant="sb20">
                              ₹ {product.price?.toLocaleString("en-IN")}/-
                            </Typography>
                          </BookDetails>
                        </BookItem>
                      ))}
                    </AccordionDetails>
                  </Accordion>
                )}
              </LeftSection>
            </Grid>

            {/* Right Section */}
            <Grid size={{ xs: 12, md: 4 }}>
              <RightSection>
                {/* Price Display */}
                {/* Bundle Summary */}
                <BundleSummary>
                  <Stack direction="column" justifyContent="left" alignItems="left" gap="20px">
                    <Typography variant="m20">Bundle Summary</Typography>

                    <Stack direction="column" justifyContent="left" alignItems="left" gap="8px">
                      <SummaryItem>
                        <Typography variant="m16">Total Products</Typography>
                        <Typography variant="sb16">
                          {(mandatoryProducts.length + selectedOptionalProductIds.length)} items
                        </Typography>
                      </SummaryItem>
                    </Stack>
                  </Stack>

                  <PriceBreakdown>
                    <Stack direction="column" justifyContent="left" alignItems="left" gap="8px"
                      sx={{
                        backgroundColor: "#F4F6F8",
                        padding: "15px",
                        borderRadius: "12px",
                      }}
                    >
                      <PriceRow>
                        <Typography variant="m16">
                          Subtotal
                        </Typography>
                        <Typography variant="sb16">
                          ₹ {totalPrice.toLocaleString("en-IN")}/-
                        </Typography>
                      </PriceRow>
                    </Stack>
                    <TotalRow>
                      <Typography variant="m16">
                        Total
                      </Typography>
                      <Typography variant="sb16">
                        ₹ {totalPrice.toLocaleString("en-IN")}/-
                      </Typography>
                    </TotalRow>
                  </PriceBreakdown>

                  <AddToCartButton
                    variant="contained"
                    onClick={handleAddToCart}
                  >
                    Add to Cart
                  </AddToCartButton>
                </BundleSummary>
              </RightSection>
            </Grid>
          </Grid>
        </BundleContainer>
      )}

      {/* Verify Student Modal */}
      <CommonModal
        open={verifyStudentModalOpen}
        onClose={handleCloseModal}
        title="Verify Student"
        formFields={verifyStudentFormFields}
        cancelButtonText="Cancel"
        confirmButtonText="Confirm & Add to Cart"
        onConfirm={handleConfirmAndAddToCart}
        confirmButtonDisabled={
          !admissionNumber.trim() ||
          !studentName.trim() ||
          !classGrade.trim() ||
          !schoolName.trim()
        }
      />
    </Container>
  );
};

export default BundleDetails;

