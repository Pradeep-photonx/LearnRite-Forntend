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
  FormControlLabel,
} from "@mui/material";
import { ExpandMore, KeyboardArrowUp } from "@mui/icons-material";
import { useNavigate, useLocation } from "react-router-dom";
import theme from "../../Theme";
import CommonModal, {
  FormFieldContainer,
  FormLabel,
  StyledTextField,
  VerifyButton
} from "../../components/modals/StudentVerifyModal";

import { useBundleDetail } from "../../api/useBundleDetail";
import { verifyAdmission, createStudent, addToCart } from "../../api/bundle";
import type { CreateStudentPayload, AddToCartPayload } from "../../api/bundle";
import type { School } from "../../api/school";
import toast from "react-hot-toast";
import LoginModal from "../../components/modals/LoginModal";
import SignUpModal from "../../components/modals/SignUpModal";

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

  // New Admission State
  const [isNewAdmission, setIsNewAdmission] = useState(false);
  const [parentName, setParentName] = useState("");
  const [parentMobile, setParentMobile] = useState("");

  const [isVerificationSuccessful, setIsVerificationSuccessful] = useState(false);
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const [signUpModalOpen, setSignUpModalOpen] = useState(false);

  // Restore verified student data from localStorage on mount
  useEffect(() => {
    if (bundle?.bundle_id) {
      const storageKey = `verified_student_${bundle.bundle_id}`;
      const storedData = localStorage.getItem(storageKey);
      if (storedData) {
        try {
          const parsed = JSON.parse(storedData);
          setAdmissionNumber(parsed.admissionNumber || "");
          setStudentName(parsed.studentName || "");
          setClassGrade(parsed.classGrade || "");
          setSchoolName(parsed.schoolName || "");
          setIsVerificationSuccessful(true);
        } catch (err) {
          console.error("Failed to parse stored verification data:", err);
        }
      }
    }
  }, [bundle?.bundle_id]);

  const handleAddToCart = () => {
    // If student is already verified effectively (has data and success flag), skip opening modal
    // and proceed to confirm/add to cart directly.
    if (isVerificationSuccessful && studentName && admissionNumber) {
      handleConfirmAndAddToCart();
    } else {
      // Open verify student modal before adding to cart
      setVerifyStudentModalOpen(true);
    }
  };

  const handleVerifyAdmission = async () => {
    if (!admissionNumber.trim()) {
      toast.error("Please enter an admission number");
      return;
    }

    if (!bundle?.bundle_id) {
      toast.error("Bundle information missing");
      return;
    }

    try {
      const response = await verifyAdmission(bundle.bundle_id, admissionNumber);

      if (response.success && response.admission) {
        const verifiedData = {
          admissionNumber: admissionNumber,
          studentName: response.admission.student_name,
          classGrade: response.admission.class,
          schoolName: bundle.school?.name || ""
        };

        setStudentName(verifiedData.studentName);
        setClassGrade(verifiedData.classGrade);
        setSchoolName(verifiedData.schoolName);
        setIsVerificationSuccessful(true);

        // Persist to localStorage
        if (bundle?.bundle_id) {
          const storageKey = `verified_student_${bundle.bundle_id}`;
          localStorage.setItem(storageKey, JSON.stringify(verifiedData));
        }

        toast.success(response.message || "Student verified successfully");
      } else {
        setIsVerificationSuccessful(false);
        toast.error(response.message || "Verification failed");
      }
    } catch (error: any) {
      console.error("Verification error:", error);
      setIsVerificationSuccessful(false);
      let errorMessage = error.response?.data?.message || error.message || "Verification failed";

      if (error.response?.status === 404) {
        errorMessage = "Admission number not found for this school";
      }

      toast.error(errorMessage);
    }
  };

  const handleConfirmAndAddToCart = async () => {
    if (isNewAdmission) {
      if (!bundle?.school_id || !bundle?.class_id) {
        toast.error("Bundle information missing");
        return;
      }
      if (!studentName.trim() || !parentName.trim() || !parentMobile.trim() || !admissionNumber.trim()) {
        toast.error("Please fill all required fields");
        return;
      }

      if (!/^\d{10}$/.test(parentMobile.trim())) {
        toast.error("Please enter a valid 10-digit mobile number");
        return;
      }

      const payload: CreateStudentPayload = {
        admission_id: admissionNumber,
        student_name: studentName,
        class_id: bundle.class_id,
        parent_name: parentName,
        parent_mobile_number: parentMobile,
        new_admission: true
      };

      try {
        const response = await createStudent(bundle.school_id, payload);
        if (response.success || response.student_id || response.message?.toLowerCase().includes("success")) {
          toast.success(response.message || "Student created successfully. Please verify to proceed.");
          setIsNewAdmission(false);
          // Clear details to force re-verification
          setStudentName("");
          setClassGrade("");
          setSchoolName("");
          setParentName("");
          setParentMobile("");
        } else {
          if (response.message?.toLowerCase().includes("already exists") || response.message?.toLowerCase().includes("duplicate")) {
            toast.error("An admission with this admission ID already exists.");
          } else {
            toast.error(response.message || "Failed to create student");
          }
        }
      } catch (err: any) {
        console.error("Create student error object:", err);
        console.error("Create student response data:", err.response?.data);

        // Extract possible error message from various common locations
        const errorData = err.response?.data;
        const errorMessage =
          errorData?.message ||
          errorData?.error ||
          (typeof errorData === 'string' ? errorData : "") ||
          err.message ||
          "Failed to create student";

        const status = err.response?.status;
        const lowerCaseMsg = errorMessage.toLowerCase();

        if (
          status === 409 ||
          lowerCaseMsg.includes("already exists") ||
          lowerCaseMsg.includes("duplicate") ||
          lowerCaseMsg.includes("unique constrain")
        ) {
          toast.error("An admission with this admission ID already exists.");
        } else {
          toast.error(errorMessage);
        }
      }
    } else {
      // Existing verified flow
      // Handle confirm and add to cart logic

      const token = localStorage.getItem("token");

      if (!token) {
        setLoginModalOpen(true);
        return;
      }

      if (!bundle) return;

      const addToCartPayload: AddToCartPayload = {
        cl_id: bundle.cl_id,
        admission_id: admissionNumber,
        student_name: studentName,
        class_id: bundle.class_id,
        // Mandatory products
        bundle_products: mandatoryProducts.map(p => ({
          product_id: p.product_id,
          quantity: p.quantity,
        })),
        // Optional products
        products: optionalProducts
          .filter(p => selectedOptionalProductIds.includes(p.product_id))
          .map(p => ({
            product_id: p.product_id,
            quantity: p.quantity,
          })),
      };

      try {
        const response = await addToCart(addToCartPayload);
        if (response.success || response.cart_id || response.message?.toLowerCase().includes("success")) {
          toast.success(response.message || "Added to cart successfully");
          setVerifyStudentModalOpen(false);
          // Reset form
          setAdmissionNumber("");
          setStudentName("");
          setClassGrade("");
          setSchoolName("");
          setIsVerificationSuccessful(false);
          navigate("/cart");
        } else {
          toast.error(response.message || "Failed to add to cart");
        }
      } catch (error: any) {
        console.error("Add to cart error:", error);
        toast.error(error.response?.data?.message || "Failed to add to cart");
      }
    }
  };

  const handleLoginSuccess = () => {
    setLoginModalOpen(false);
    // User requested to come back to the page and manually click add to cart
    // We also close the verify modal so they see the bundle details page
    setVerifyStudentModalOpen(false);
  };

  const handleCloseModal = () => {
    setVerifyStudentModalOpen(false);
    // Reset form on close
    setAdmissionNumber("");
    setStudentName("");
    setClassGrade("");
    setSchoolName("");
    setIsNewAdmission(false);
    setParentName("");
    setParentMobile("");
    setIsVerificationSuccessful(false);
  };



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
        cancelButtonText="Cancel"
        confirmButtonText={isNewAdmission ? "Create Admission" : "Confirm & Add to Cart"}
        onConfirm={handleConfirmAndAddToCart}
        confirmButtonDisabled={
          isNewAdmission
            ? (!admissionNumber.trim() || !studentName.trim() || !parentName.trim() || !parentMobile.trim())
            : (!admissionNumber.trim() || !studentName.trim() || !classGrade.trim() || !schoolName.trim())
        }
      >
        <Box sx={{ display: "flex", flexDirection: "column", gap: 1.2 }}>
          {!isNewAdmission ? (
            // Existing Verification field
            <>
              {!isVerificationSuccessful && (
                <FormControlLabel sx={{
                  padding: "0px 0px 14px 0px",
                }}
                  control={
                    <Checkbox sx={{
                      padding: "0px 10px 0px 15px",
                    }}
                      checked={isNewAdmission}
                      onChange={(e) => {
                        setIsNewAdmission(e.target.checked);
                        if (e.target.checked) {
                          setStudentName("");
                          setClassGrade(bundle?.class?.name || "");
                          setSchoolName(bundle?.school?.name || "");
                          setParentName("");
                          setParentMobile("");
                        } else {
                          setStudentName("");
                          setClassGrade("");
                          setSchoolName("");
                        }
                      }}
                    />
                  }
                  label="New Admission"
                />
              )}

              <FormFieldContainer>
                <FormLabel>Admission Number</FormLabel>
                <Box sx={{ display: "flex", gap: "12px", alignItems: "flex-start", position: "relative" }}>
                  <StyledTextField
                    placeholder="Enter Admission Number"
                    value={admissionNumber}
                    onChange={(e) => setAdmissionNumber(e.target.value)}
                    fullWidth
                    variant="outlined"
                  />
                  <VerifyButton
                    onClick={handleVerifyAdmission}
                    disabled={!admissionNumber.trim()}
                  >
                    Verify
                  </VerifyButton>
                </Box>
              </FormFieldContainer>
            </>
          ) : (
            // New Admission Fields
            <>
              <FormControlLabel sx={{
                padding: "0px 0px 14px 0px",
              }}
                control={
                  <Checkbox sx={{
                    padding: "0px 10px 0px 15px",
                  }}
                    checked={isNewAdmission}
                    onChange={(e) => {
                      setIsNewAdmission(e.target.checked);
                      if (e.target.checked) {
                        setStudentName("");
                        setClassGrade(bundle?.class?.name || "");
                        setSchoolName(bundle?.school?.name || "");
                        setParentName("");
                        setParentMobile("");
                      } else {
                        setStudentName("");
                        setClassGrade("");
                        setSchoolName("");
                      }
                    }}
                  />
                }
                label="New Admission"
              />

              <FormFieldContainer>
                <FormLabel>Admission Number</FormLabel>
                <StyledTextField
                  placeholder="Enter Admission Number"
                  value={admissionNumber}
                  onChange={(e) => setAdmissionNumber(e.target.value)}
                  fullWidth
                />
              </FormFieldContainer>

              <FormFieldContainer>
                <FormLabel>Student Name</FormLabel>
                <StyledTextField
                  placeholder="Enter Student Name"
                  value={studentName}
                  onChange={(e) => setStudentName(e.target.value)}
                  fullWidth
                />
              </FormFieldContainer>
              <FormFieldContainer>
                <FormLabel>Class</FormLabel>
                <StyledTextField
                  value={bundle?.class?.name || classGrade} // Show bundle class
                  disabled
                  fullWidth
                />
              </FormFieldContainer>
              <FormFieldContainer>
                <FormLabel>Parent Name</FormLabel>
                <StyledTextField
                  placeholder="Enter Parent Name"
                  value={parentName}
                  onChange={(e) => setParentName(e.target.value)}
                  fullWidth
                />
              </FormFieldContainer>
              <FormFieldContainer>
                <FormLabel>Parent Mobile Number</FormLabel>
                <StyledTextField
                  placeholder="Enter Parent Mobile Number"
                  value={parentMobile}
                  onChange={(e) => setParentMobile(e.target.value)}
                  fullWidth
                />
              </FormFieldContainer>
            </>
          )}

          {/* Read-only fields for Verification Mode */}
          {!isNewAdmission && (
            <>
              <FormFieldContainer>
                <FormLabel>Student Name</FormLabel>
                <StyledTextField
                  value={studentName}
                  disabled
                  fullWidth
                  placeholder="Auto-filled after verification"
                />
              </FormFieldContainer>
              <FormFieldContainer>
                <FormLabel>Class / Grade</FormLabel>
                <StyledTextField
                  value={classGrade}
                  disabled
                  fullWidth
                  placeholder="Auto-filled after verification"
                />
              </FormFieldContainer>
              <FormFieldContainer>
                <FormLabel>School Name</FormLabel>
                <StyledTextField
                  value={schoolName}
                  disabled
                  fullWidth
                  placeholder="Auto-filled after verification"
                />
              </FormFieldContainer>
            </>
          )}
        </Box>
      </CommonModal>

      <LoginModal
        open={loginModalOpen}
        onClose={() => setLoginModalOpen(false)}
        onLoginSuccess={handleLoginSuccess}
        onSignUpClick={() => {
          setLoginModalOpen(false);
          setSignUpModalOpen(true);
        }}
      />
      <SignUpModal
        open={signUpModalOpen}
        onClose={() => setSignUpModalOpen(false)}
        onLoginClick={() => {
          setSignUpModalOpen(false);
          setLoginModalOpen(true);
        }}
      />
    </Container >
  );
};

export default BundleDetails;

