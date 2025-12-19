import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  Button,
  Grid,
  Radio,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Checkbox,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  IconButton,
  styled,
  Stack,
} from "@mui/material";
import { ExpandMore, KeyboardArrowUp } from "@mui/icons-material";
import { useParams, useNavigate } from "react-router-dom";
import theme from "../../Theme";
import CommonModal from "../../components/modals/StudentVerifyModal";
import type { FormField } from "../../components/modals/StudentVerifyModal";

// Styled Components
const BundleContainer = styled(Box)(({ theme }) => ({
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

interface BundleData {
  id: number | string;
  className: string;
  schoolName: string;
  commonBooks: BookItem[];
  languageBooks: BookItem[];
  stationeryItems: BookItem[];
  subtotal: number;
  gst: number;
  total: number;
}

// Helper function to convert slug to display name
const slugToName = (slug: string | undefined): string => {
  if (!slug) return "Lower Kindergarten";
  return slug
    .split("-")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");
};

// Default Bundle Data (will be fetched based on classSlug)
const getBundleData = (schoolSlug: string | undefined, classSlug: string | undefined): BundleData => {
  // In real app, this would be fetched from API based on slugs
  const className = slugToName(classSlug);

  // Map school slugs to names
  const schoolNameMap: Record<string, string> = {
    "delhi-public-school": "Delhi Public School",
    "suchitra-academy": "Suchitra Academy",
    "oakridge-international-school": "Oakridge International School",
  };

  const schoolName = schoolNameMap[schoolSlug || "delhi-public-school"] || "Delhi Public School";

  return {
    id: classSlug || "lower-kindergarten",
    className: className,
    schoolName: schoolName,
    commonBooks: [
      { id: 1, name: "My First Steps with Cambridge", quantity: 1, price: 110 },
      { id: 2, name: "My First Steps with Cambridge", quantity: 1, price: 110 },
      { id: 3, name: "My First Steps with Cambridge", quantity: 1, price: 110 },
      { id: 4, name: "My First Steps with Cambridge", quantity: 1, price: 110 },
    ],
    languageBooks: [
      { id: 5, name: "Telugu Language Book", quantity: 1, price: 150 },
      { id: 6, name: "Telugu Language Book", quantity: 1, price: 150 },
    ],
    stationeryItems: [
      { id: 7, name: "Notebook", quantity: 2, price: 50 },
      { id: 8, name: "Pencil Set", quantity: 1, price: 80 },
      { id: 9, name: "Eraser", quantity: 2, price: 20 },
      { id: 10, name: "Sharpener", quantity: 1, price: 30 },
      { id: 11, name: "Crayons", quantity: 1, price: 120 },
    ],
    subtotal: 2200,
    gst: 80,
    total: 2280,
  };
};

const BundleDetails: React.FC = () => {
  const { schoolSlug, classSlug } = useParams<{ schoolSlug: string; classSlug: string }>();
  const navigate = useNavigate();
  const [selectedLanguage, setSelectedLanguage] = useState("Telugu");
  const [includeStationery, setIncludeStationery] = useState(false);
  const [commonBooksExpanded, setCommonBooksExpanded] = useState(true);
  const [stationeryExpanded, setStationeryExpanded] = useState(false);
  const [verifyStudentModalOpen, setVerifyStudentModalOpen] = useState(false);
  
  // Form state for Verify Student Modal
  const [admissionNumber, setAdmissionNumber] = useState("");
  const [studentName, setStudentName] = useState("");
  const [classGrade, setClassGrade] = useState("");
  const [schoolName, setSchoolName] = useState("");

  const bundleData = getBundleData(schoolSlug, classSlug);

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
      bundleData,
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

  const commonBooksCount = bundleData.commonBooks.length;
  const languageBooksCount = bundleData.languageBooks.length;
  const stationeryCount = bundleData.stationeryItems.length;

  const totalCommonBooksItems = bundleData.commonBooks.reduce((sum, book) => sum + book.quantity, 0);
  const totalLanguageBooksItems = bundleData.languageBooks.reduce((sum, book) => sum + book.quantity, 0);
  const totalStationeryItems = bundleData.stationeryItems.reduce((sum, item) => sum + item.quantity, 0);

  return (
    <Container maxWidth="xl">
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
                {bundleData.className}
              </ClassTitle>
              <SchoolName variant="r16" color="text.secondary">
                {bundleData.schoolName}
              </SchoolName>
              {/* Second Language Selection */}
              <LanguageSection >
                <LanguageLabel variant="m20">Second language</LanguageLabel>
                <FormControl>
                  <RadioGroup
                    row
                    value={selectedLanguage}
                    onChange={(e) => setSelectedLanguage(e.target.value)}
                    sx={{ gap: "0px" }}
                  >
                    <FormControlLabel
                      value="Telugu"
                      control={<Radio sx={{ color: "#2C55C1" }} />}
                      label={<Typography variant="m16">Telugu</Typography>}
                    />
                    <FormControlLabel
                      value="Hindi"
                      control={<Radio sx={{ color: "#2C55C1" }} />}
                      label={<Typography variant="m16">Hindi</Typography>}
                    />
                  </RadioGroup>
                </FormControl>
              </LanguageSection>

            </Stack>
            <PriceDisplay display="flex" flexDirection="column" justifyContent="left" alignItems="left">
              <Typography
                variant="sb32"
                sx={{
                  color: "#155DFC",

                }}
              >
                ₹ {bundleData.total.toLocaleString("en-IN")}
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

              {/* Common Books Section */}
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
                        {commonBooksCount} Books
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
                  {bundleData.commonBooks.map((book) => (
                    <BookItem key={book.id}>
                      <Stack direction="column" justifyContent="left" alignItems="left" gap="5px">
                        <BookName variant="sb16">{book.name}</BookName>
                        <Typography variant="m14">
                          Qty: {book.quantity}
                        </Typography>
                      </Stack>
                      <BookDetails>
                        <Typography variant="sb20">
                          ₹ {book.price}/-
                        </Typography>
                      </BookDetails>
                    </BookItem>
                  ))}
                </AccordionDetails>
              </Accordion>

              {/* Stationery Section */}
              <Accordion
                expanded={stationeryExpanded}
                onChange={() => setStationeryExpanded(!stationeryExpanded)}
                sx={{
                  boxShadow: "none",
                  border: "1px solid #E5E7EB",
                  marginTop: "20px",
                  borderRadius: "8px",
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
                    <SectionTitleText sx={{
                      display: "flex",
                      flexDirection: "row",
                      alignItems: "center",
                      justifyContent: "left",
                      width: "100%",
                      gap: "10px",
                    }}>
                      <Checkbox
                        checked={includeStationery}
                        onChange={(e) => setIncludeStationery(e.target.checked)}
                        sx={{
                          color: "#2C55C1",
                          borderRadius: "12px !important",
                          padding: 0,
                          // marginRight: "12px",
                        }}
                      />
                      <Stack direction="column" justifyContent="left" alignItems="left" gap="2px">
                        <Typography variant="sb16"
                          sx={{
                            fontFamily: "Figtree, sans-serif",
                          }}
                        >
                          Stationary
                        </Typography>
                        <Typography variant="r14"
                          sx={{
                            color: theme.palette.text.secondary,
                            fontFamily: "Figtree, sans-serif",
                          }}
                        >
                          {stationeryCount} Items
                        </Typography>
                      </Stack>
                    </SectionTitleText>
                  </SectionTitle>
                </AccordionSummary>
                <AccordionDetails
                  sx={{
                    padding: "20px 30px",
                    backgroundColor: "#FFF",
                    borderBottomLeftRadius: "12px",
                    borderBottomRightRadius: "12px",
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "left",
                    alignItems: "left",
                    gap: "15px",
                  }}>
                  {bundleData.stationeryItems.map((item) => (
                    <BookItem key={item.id}>
                      <Stack direction="column" justifyContent="left" alignItems="left" gap="5px">
                        <BookName variant="sb16">{item.name}</BookName>
                        <Typography variant="m14">
                          Qty: {item.quantity}
                        </Typography>
                      </Stack>
                      <BookDetails>
                        <Typography variant="sb20">
                          ₹ {item.price}/-
                        </Typography>
                      </BookDetails>
                    </BookItem>
                  ))}
                </AccordionDetails>
              </Accordion>
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
                      <Typography variant="m16">Common Books</Typography>
                      <Typography variant="sb16">{totalCommonBooksItems} items</Typography>
                    </SummaryItem>

                    <SummaryItem>
                      <Typography variant="m16">Language Books</Typography>
                      <Typography variant="sb16">{totalLanguageBooksItems} items</Typography>
                    </SummaryItem>

                    <SummaryItem>
                      <Typography variant="m16">Stationery</Typography>
                      <Typography variant="sb16">{totalStationeryItems} items</Typography>
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
                      ₹ {bundleData.subtotal.toLocaleString("en-IN")}/-
                    </Typography>
                  </PriceRow>
                  <PriceRow>
                    <Typography variant="m16">
                      GST(18%)
                    </Typography>
                    <Typography variant="sb16">
                      ₹ {bundleData.gst.toLocaleString("en-IN")}/-
                    </Typography>
                  </PriceRow>
                  </Stack>
                  <TotalRow>
                    <Typography variant="m16">
                      Total
                    </Typography>
                    <Typography variant="sb16">
                      ₹ {bundleData.total.toLocaleString("en-IN")}/-
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

