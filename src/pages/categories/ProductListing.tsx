import React, { useState } from "react";
import {
  Box,
  Container,
  Stack,
  Typography,
  Button,
  Checkbox,
  RadioGroup,
  FormControlLabel,
  FormControl,
  Accordion,
  AccordionSummary,
  AccordionDetails,
  Chip,
  Select,
  MenuItem,
  Paper,
  styled,
} from "@mui/material";
import Grid from "@mui/material/Grid";
import {
  ExpandMore,
  Close,
} from "@mui/icons-material";
import { AddToCartWhiteIcon, BlackRightArrowIcon } from "../../components/icons/CommonIcons";
import ProductImag1 from "../../assets/images/classmate.png";
import { useNavigate } from "react-router-dom";

// Styled Components
const PageContainer = styled(Box)({
  padding: "40px 0 80px 0",
  minHeight: "60vh",
});

const FiltersSidebar = styled(Paper)({
  // padding: "24px",
  boxShadow: "unset",
  backgroundColor: "unset",
  height: "fit-content",
  position: "sticky",
  top: "20px",
});

const FiltersHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  paddingBottom: "16px",
  // borderBottom: "1px solid #E5E7EB",
});

const FilterSection = styled(Box)({
  marginBottom: "10px",
  borderRadius: "4px",
  border: "1px solid #1214191A",

  "&:last-child": {
    marginBottom: 0,
  },
});

const StyledAccordion = styled(Accordion)({
  boxShadow: "none",
  padding: "15px",
  border: "none",
  "&:before": {
    display: "none",
  },
  "&.Mui-expanded": {
    margin: 0,
  },
});

const StyledAccordionSummary = styled(AccordionSummary)({
  padding: 0,
  minHeight: "48px",
  "& .MuiAccordionSummary-content": {
    margin: "0px !important",
  },
  "& .MuiAccordionSummary-expandIconWrapper": {
    color: "#121318",
  },
});

const FilterOptions = styled(Box)({
  display: "flex",
  flexDirection: "column",
  gap: "12px",
  paddingTop: "4px",
});


const ContentHeader = styled(Box)({
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  marginBottom: "24px",
  flexWrap: "wrap",
  gap: "16px",
});

const FilterTags = styled(Stack)({
  flexDirection: "row",
  gap: "8px",
  flexWrap: "wrap",
});

const FilterChip = styled(Chip)({
  backgroundColor: "#FFF",
  border: "1px solid #1214191A",
  color: "#121419",
  borderRadius: "20px",
  padding: "5px 10px",
  fontSize: "12px",
  fontWeight: 500,
  "& .MuiChip-deleteIcon": {
    color: "#121419",
    fontSize: "18px",
  },
});

const SortSelect = styled(Select)({
  minWidth: "220px",
  height: "40px",
  borderRadius: "8px",
  fontSize: "14px",
  fontFamily: "Figtree, sans-serif",
  color: "#121318",
  backgroundColor: "#FFFFFF",
  border: "#202228",
  "& .MuiOutlinedInput-notchedOutline": {
    borderColor: "#202228",
  },
  "&:hover .MuiOutlinedInput-notchedOutline": {
    borderColor: "#2C55C1",
  },
  "&.Mui-focused .MuiOutlinedInput-notchedOutline": {
    borderColor: "#2C55C1",
  },
  "& .MuiSelect-select": {
    padding: "8px 32px 8px 16px",
    display: "flex",
    alignItems: "center",
  },
  "& .MuiSelect-icon": {
    color: "#121318",
    "& svg": {
      transform: "translateY(-50%)",
      position: "absolute",
      top: "50%",
      right: "-12px",
      width: "14px",
      height: "14px",
    },
  },
});

const ProductCard = styled(Box)({
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  overflow: "hidden",
  border: "1px solid #1214191A",
  cursor: "pointer",
  position: "relative",
  transition: "all 0.3s ease",
  "&:hover": {
    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.1)",
  },
});

const ProductImageContainer = styled(Box)({
  position: "relative",
  width: "100%",
  height: "240px",
  overflow: "hidden",
  backgroundColor: "#F9F9F9",
});

const ProductImage = styled("img")({
  width: "100%",
  height: "100%",
  objectFit: "cover",
});

const BestSaleTag = styled(Box)({
  position: "absolute",
  top: "12px",
  left: "12px",
  backgroundColor: "#FF6B35",
  color: "#FFFFFF",
  padding: "4px 12px",
  borderRadius: "20px",
  fontSize: "12px",
  fontWeight: 600,
  zIndex: 2,
});

const ProductInfo = styled(Box)({
  padding: "16px",
});

const PriceSection = styled(Stack)({
  flexDirection: "row",
  alignItems: "center",
  gap: "8px",
  marginBottom: "12px",
  flexWrap: "wrap",
});

const AddToCartButton = styled(Button)({
  width: "100%",
  padding: "10px",
  borderRadius: "8px",
  textTransform: "none",
  fontSize: "14px",
  fontWeight: 500,
  background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
  color: "#FFFFFF",
  boxShadow: "0px 5px 10px 0px #2D60E745",
  "&:hover": {
    background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
    boxShadow: "0px 5px 15px 0px #2D60E745",
  },
});

// Helper function to convert name to slug
const nameToSlug = (name: string): string => {
  return name
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/(^-|-$)/g, "");
};

// Interfaces
interface Product {
  id: number;
  name: string;
  slug: string;
  brand: string;
  image: string;
  unit: string;
  currentPrice: number;
  originalPrice: number;
  discount: number;
  isBestSale?: boolean;
  category: string;
  type: string;
}

// Sample Data
const sampleProducts: Product[] = [
  {
    id: 1,
    name: "Classmate Single Line Long Notebook",
    slug: "classmate-single-line-long-notebook",
    brand: "CLASSMATE",
    image: ProductImag1,
    unit: "1 Unit (1 pieces)",
    currentPrice: 50,
    originalPrice: 55,
    discount: 5,
    isBestSale: true,
    category: "Notebooks",
    type: "Single Notebook",
  },
  {
    id: 2,
    name: "Classmate Single Line Long Notebook",
    slug: "classmate-single-line-long-notebook-2",
    brand: "CLASSMATE",
    image: ProductImag1,
    unit: "1 Unit (1 pieces)",
    currentPrice: 50,
    originalPrice: 55,
    discount: 5,
    category: "Notebooks",
    type: "Single Notebook",
  },
  {
    id: 3,
    name: "Classmate Single Line Long Notebook",
    slug: "classmate-single-line-long-notebook-3",
    brand: "CLASSMATE",
    image: ProductImag1,
    unit: "1 Unit (1 pieces)",
    currentPrice: 50,
    originalPrice: 55,
    discount: 5,
    isBestSale: true,
    category: "Notebooks",
    type: "Single Notebook",
  },
  {
    id: 4,
    name: "Classmate Single Line Long Notebook",
    slug: "classmate-single-line-long-notebook-4",
    brand: "CLASSMATE",
    image: ProductImag1,
    unit: "1 Unit (1 pieces)",
    currentPrice: 50,
    originalPrice: 55,
    discount: 5,
    category: "Notebooks",
    type: "Single Notebook",
  },
  {
    id: 5,
    name: "Classmate Single Line Long Notebook",
    slug: "classmate-single-line-long-notebook-5",
    brand: "CLASSMATE",
    image: ProductImag1,
    unit: "1 Unit (1 pieces)",
    currentPrice: 50,
    originalPrice: 55,
    discount: 5,
    isBestSale: true,
    category: "Notebooks",
    type: "Single Notebook",
  },
  {
    id: 6,
    name: "Classmate Single Line Long Notebook",
    slug: "classmate-single-line-long-notebook-6",
    brand: "CLASSMATE",
    image: ProductImag1,
    unit: "1 Unit (1 pieces)",
    currentPrice: 50,
    originalPrice: 55,
    discount: 5,
    category: "Notebooks",
    type: "Single Notebook",
  },
  {
    id: 7,
    name: "Classmate Single Line Long Notebook",
    slug: "classmate-single-line-long-notebook-7",
    brand: "CLASSMATE",
    image: ProductImag1,
    unit: "1 Unit (1 pieces)",
    currentPrice: 50,
    originalPrice: 55,
    discount: 5,
    category: "Notebooks",
    type: "Single Notebook",
  },
  {
    id: 8,
    name: "Classmate Single Line Long Notebook",
    slug: "classmate-single-line-long-notebook-8",
    brand: "CLASSMATE",
    image: ProductImag1,
    unit: "1 Unit (1 pieces)",
    currentPrice: 50,
    originalPrice: 55,
    discount: 5,
    category: "Notebooks",
    type: "Single Notebook",
  },
  {
    id: 9,
    name: "Classmate Single Line Long Notebook",
    slug: "classmate-single-line-long-notebook-9",
    brand: "CLASSMATE",
    image: ProductImag1,
    unit: "1 Unit (1 pieces)",
    currentPrice: 50,
    originalPrice: 55,
    discount: 5,
    category: "Notebooks",
    type: "Single Notebook",
  },
];

const ProductListing: React.FC = () => {
  const navigate = useNavigate();
  const [selectedCategories, setSelectedCategories] = useState<string[]>(["Notebooks"]);
  const [selectedType, setSelectedType] = useState<string>("Single Notebook");
  const [sortBy, setSortBy] = useState<string>("recommended");
  const [activeFilters, setActiveFilters] = useState<string[]>(["Notebooks"]);

  const handleCategoryChange = (category: string) => {
    setSelectedCategories((prev) =>
      prev.includes(category)
        ? prev.filter((c) => c !== category)
        : [...prev, category]
    );
    if (!activeFilters.includes(category)) {
      setActiveFilters([...activeFilters, category]);
    }
  };

  const handleTypeChange = (type: string) => {
    setSelectedType(type);
  };

  const handleRemoveFilter = (filter: string) => {
    setActiveFilters(activeFilters.filter((f) => f !== filter));
    if (selectedCategories.includes(filter)) {
      setSelectedCategories(selectedCategories.filter((c) => c !== filter));
    }
  };

  const handleClearAll = () => {
    setSelectedCategories([]);
    setSelectedType("");
    setActiveFilters([]);
  };

  const filteredProducts = sampleProducts.filter((product) => {
    if (selectedCategories.length > 0 && !selectedCategories.includes(product.category)) {
      return false;
    }
    if (selectedType && product.type !== selectedType) {
      return false;
    }
    return true;
  });

  return (
    <Container maxWidth="xl">
      <PageContainer>

        <Grid container spacing={5} sx={{ marginTop: "24px" }}>
          {/* Left Sidebar - Filters */}
          <Grid size={{ xs: 12, md: 2.5 }}>
            <FiltersSidebar>
              <FiltersHeader>
                <Typography variant="m20" sx={{ fontWeight: 600 }}>
                  Filters
                </Typography>
                <Button
                  variant="text"
                  onClick={handleClearAll}
                  sx={{
                    color: "text.secondary",
                    fontSize: "12px",
                    fontWeight: 400,
                    padding: 0,
                    minWidth: "auto",
                  }}
                >
                  Clear All
                </Button>
              </FiltersHeader>

              {/* Categories Filter */}
              <FilterSection>
                <StyledAccordion defaultExpanded sx={{}}>
                  <StyledAccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="categories-content"
                    id="categories-header"
                    sx={{
                      margin: "0px !important",
                      minHeight: "auto !important",
                    }}
                  >
                    <Typography variant="m16" sx={{ fontWeight: 600, fontFamily: "Figtree !important", margin: 0 }}>
                      Categories
                    </Typography>
                  </StyledAccordionSummary>
                  <AccordionDetails sx={{ padding: 0 }}>
                    <FilterOptions>
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedCategories.includes("Notebooks")}
                            onChange={() => handleCategoryChange("Notebooks")}
                            sx={{
                              color: "#2C65F9",
                              padding: "0 5px 0 08px",
                              "&.Mui-checked": {
                                color: "#2C65F9",
                              },
                            }}
                          />
                        }
                        label={
                          <Typography variant="r14" color="text.secondary">
                            Notebooks <span style={{ color: "#6B7280" }}>(40)</span>
                          </Typography>
                        }
                      />
                      <FormControlLabel
                        control={
                          <Checkbox
                            checked={selectedCategories.includes("Stationery")}
                            onChange={() => handleCategoryChange("Stationery")}
                            sx={{
                              color: "#2C65F9",
                              padding: "0 5px 0 08px",
                              "&.Mui-checked": {
                                color: "#2C65F9",
                              },
                            }}
                          />
                        }
                        label={
                          <Typography variant="r14" color="text.secondary">
                            Stationery
                          </Typography>
                        }
                      />
                    </FilterOptions>
                  </AccordionDetails>
                </StyledAccordion>
              </FilterSection>

              {/* Type Filter */}
              <FilterSection>
                <StyledAccordion defaultExpanded>
                  <StyledAccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="type-content"
                    id="type-header"
                    sx={{
                      margin: "0px !important",
                      minHeight: "auto !important",
                    }}
                  >
                    <Typography variant="m16" sx={{ fontWeight: 600, fontFamily: "Figtree !important", margin: 0 }}>
                      Type
                    </Typography>
                  </StyledAccordionSummary>
                  <AccordionDetails sx={{ padding: 0 }}>
                    <FormControl component="fieldset">
                      <RadioGroup
                        value={selectedType}
                        onChange={(e) => handleTypeChange(e.target.value)}
                      >
                        <FormControlLabel
                          value="Single Notebook"
                          control={
                            <Checkbox
                              sx={{
                                color: "#2C65F9",
                                padding: "08px 5px 0px 08px",
                                "&.Mui-checked": {
                                  color: "#2C65F9",
                                },
                              }}
                            />
                          }
                          label={<Typography variant="r14" color="text.secondary" marginTop={"8px"} >Single Notebook</Typography>}
                        />
                        <FormControlLabel
                          value="Long Book"
                          control={
                            <Checkbox
                              sx={{
                                color: "#2C65F9",
                                padding: "8px 5px 0px 08px",
                                "&.Mui-checked": {
                                  color: "#2C65F9",
                                },
                              }}
                            />
                          }
                          label={<Typography variant="r14" color="text.secondary" marginTop={"8px"} >Long Book</Typography>}
                        />
                        <FormControlLabel
                          value="Multi-Pack Books"
                          control={
                            <Checkbox
                              sx={{
                                color: "#2C65F9",
                                padding: "8px 5px 0px 08px",
                                "&.Mui-checked": {
                                  color: "#2C65F9",
                                },
                              }}
                            />
                          }
                          label={<Typography variant="r14" color="text.secondary" marginTop={"8px"} >Multi-Pack Books</Typography>}
                        />
                      </RadioGroup>
                    </FormControl>
                  </AccordionDetails>
                </StyledAccordion>
              </FilterSection>

              {/* Brand Filter - Collapsed */}
              <FilterSection>
                <StyledAccordion>
                  <StyledAccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="brand-content"
                    id="brand-header"
                    sx={{
                      margin: "0px !important",
                      minHeight: "auto !important",
                    }}
                  >
                    <Typography variant="m16" sx={{ fontWeight: 600, fontFamily: "Figtree !important", margin: 0 }}>
                      Brand
                    </Typography>
                  </StyledAccordionSummary>
                  <AccordionDetails sx={{ padding: 0 }}>
                    <FilterOptions>
                      <Typography variant="m14" color="text.secondary">
                        Brand options will appear here
                      </Typography>
                    </FilterOptions>
                  </AccordionDetails>
                </StyledAccordion>
              </FilterSection>

              {/* Price Range Filter - Collapsed */}
              <FilterSection>
                <StyledAccordion>
                  <StyledAccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="price-content"
                    id="price-header"
                    sx={{
                      margin: "0px !important",
                      minHeight: "auto !important",
                    }}
                  >
                    <Typography variant="m16" sx={{ fontWeight: 600 }}>
                      Price range
                    </Typography>
                  </StyledAccordionSummary>
                  <AccordionDetails sx={{ padding: 0 }}>
                    <FilterOptions>
                      <Typography variant="m14" color="text.secondary">
                        Price range options will appear here
                      </Typography>
                    </FilterOptions>
                  </AccordionDetails>
                </StyledAccordion>
              </FilterSection>

              {/* Discounts Filter - Collapsed */}
              <FilterSection>
                <StyledAccordion>
                  <StyledAccordionSummary
                    expandIcon={<ExpandMore />}
                    aria-controls="discounts-content"
                    id="discounts-header"
                    sx={{
                      margin: "0px !important",
                      minHeight: "auto !important",
                    }}
                  >
                    <Typography variant="m16" sx={{ fontWeight: 600, fontFamily: "Figtree !important", margin: 0 }}>
                      Discounts
                    </Typography>
                  </StyledAccordionSummary>
                  <AccordionDetails sx={{ padding: 0 }}>
                    <FilterOptions>
                      <Typography variant="m14" color="text.secondary">
                        Discount options will appear here
                      </Typography>
                    </FilterOptions>
                  </AccordionDetails>
                </StyledAccordion>
              </FilterSection>
            </FiltersSidebar>
          </Grid>

          {/* Main Content - Product Grid */}
          <Grid size={{ xs: 12, md: 9 }}>
            <Paper
              sx={{
                padding: "30px",
                borderRadius: "15px",
                boxShadow: "unset",
              }}
            >
              <ContentHeader>
                <FilterTags>
                  {activeFilters.map((filter) => (
                    <FilterChip
                      key={filter}
                      label={filter}
                      onDelete={() => handleRemoveFilter(filter)}
                      deleteIcon={<Close />}
                    />
                  ))}
                </FilterTags>
                <SortSelect
                  value={sortBy}
                  onChange={(e) => setSortBy(e.target.value as string)}
                  displayEmpty
                  IconComponent={(props) => (
                    <Box
                      component="span"
                      sx={{
                        marginLeft: "-20px !important",
                        position: "relative",
                        left: "-15px",
                        display: "flex",
                        alignItems: "center",
                        justifyContent: "center",
                        pointerEvents: "none",
                        ...props.sx,
                      }}
                    >
                      <BlackRightArrowIcon
                        style={{
                          transform: "rotate(90deg)",
                          width: "14px",
                          height: "14px",
                        }}
                      />
                    </Box>
                  )}
                  renderValue={(value) => {
                    const labels: { [key: string]: string } = {
                      recommended: "Recommended",
                      "price-low": "Price: Low to High",
                      "price-high": "Price: High to Low",
                      newest: "Newest First",
                    };
                    return `Sort by : ${labels[value as string] || labels.recommended}`;
                  }}
                >
                  <MenuItem value="recommended">Recommended</MenuItem>
                  <MenuItem value="price-low">Price: Low to High</MenuItem>
                  <MenuItem value="price-high">Price: High to Low</MenuItem>
                  <MenuItem value="newest">Newest First</MenuItem>
                </SortSelect>
              </ContentHeader>

              {/* Product Grid */}
              <Grid container spacing={3}>
                {filteredProducts.map((product) => (
                  <Grid key={product.id} size={{ xs: 12, sm: 6, md: 4 }}>
                    <ProductCard>
                      <ProductImageContainer>
                        {product.isBestSale && <BestSaleTag>Best Sale</BestSaleTag>}
                        <ProductImage
                          src={product.image}
                          alt={product.name}
                          onError={(e) => {
                            (e.target as HTMLImageElement).src = "";
                          }}
                        />
                      </ProductImageContainer>
                      <ProductInfo>
                        <Stack direction="column" gap="5px" minHeight="80px" mb="12px">
                          <Typography variant="m12" color="#193CB8">
                            {product.brand}
                          </Typography>
                          <Stack direction="column" gap="4px">
                            <Typography variant="sb16">{product.name}</Typography>
                            <Typography variant="m12" color="text.secondary">
                              {product.unit}
                            </Typography>
                          </Stack>
                        </Stack>
                        <PriceSection>
                          <Typography variant="b16" color="#155DFC">
                            ₹{product.currentPrice}
                          </Typography>
                          <Typography
                            variant="r14"
                            color="#6A7282"
                            sx={{ textDecoration: "line-through" }}
                          >
                            ₹{product.originalPrice}
                          </Typography>
                          <Typography
                            variant="sb12"
                            color="#009E08"
                            sx={{
                              backgroundColor: "#E6FFE7",
                              padding: "2px 8px",
                              borderRadius: "50px",
                            }}
                          >
                            {product.discount}% off
                          </Typography>
                        </PriceSection>
                        <AddToCartButton
                          variant="contained"
                          startIcon={<AddToCartWhiteIcon />}
                          onClick={() => navigate(`/categories/${product.slug}`)}
                        >
                          Add to Cart
                        </AddToCartButton>
                      </ProductInfo>
                    </ProductCard>
                  </Grid>
                ))}
              </Grid>
            </Paper>
          </Grid>
        </Grid>
      </PageContainer>
    </Container>
  );
};

export default ProductListing;

