import React, { useState } from "react";
import {
  Box,
  Container,
  Typography,
  TextField,
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Menu,
  MenuItem,
  styled,
  Paper,
  CircularProgress,
} from "@mui/material";
import { KeyboardArrowDown } from "@mui/icons-material";
import { useNavigate } from "react-router-dom";
import DelhiPublic from '../../assets/images/delhi-public-school.png';
import { LocationIcon, SearchIcon, WhiteRightArrowIcon } from "../../components/icons/CommonIcons";
import { useSchools } from "../../api/useSchools";



const HeaderSection = styled(Box)(({ theme }) => ({
  marginBottom: "30px",
  [theme.breakpoints.down("md")]: {
    marginBottom: "20px",
  },
}));

const SearchFilterSection = styled(Box)(({ theme }) => ({
  display: "flex",
  gap: "16px",
  marginBottom: "40px",
  flexWrap: "wrap",
  [theme.breakpoints.down("md")]: {
    flexDirection: "column",
    marginBottom: "30px",
  },
}));

const SearchField = styled(TextField)(({ theme }) => ({
  flex: 1,
  minWidth: "300px",
  "& .MuiOutlinedInput-root": {
    borderRadius: "10px",
    backgroundColor: "#FFFFFF",
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
  [theme.breakpoints.down("md")]: {
    minWidth: "100%",
  },
}));

const FilterButton = styled(Button)(({ theme }) => ({
  padding: "12px 16px",
  borderRadius: "10px",
  textTransform: "none",
  fontSize: "16px",
  fontWeight: 500,
  color: "#111827",
  backgroundColor: "#FFFFFF",
  border: "1px solid #D1D4DE",
  minWidth: "180px",
  justifyContent: "space-between",
  "&:hover": {
    backgroundColor: "#F9FAFB",
    borderColor: "#D1D4DE",
  },
  [theme.breakpoints.down("md")]: {
    minWidth: "100%",
  },
}));

const SchoolCard = styled(Box)(({ theme }) => ({
  backgroundColor: "#FFFFFF",
  borderRadius: "12px",
  // padding: "24px",
  display: "flex",
  flexDirection: "column",
  alignItems: "center",
  border: "1px solid #0000001A",
  cursor: "pointer",
  transition: "all 0.3s ease",
  minHeight: "332px",
  "&:hover": {
    boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
  },
  [theme.breakpoints.down("md")]: {
    minHeight: "250px",
    padding: "20px",
  },
}));

const SchoolLogo = styled("img")({
  width: "100px",
  height: "100px",
  objectFit: "contain",
  marginBottom: "16px",
});



const LocationText = styled(Box)({
  display: "flex",
  alignItems: "center",
  gap: "5px",
});

const ViewClassesButton = styled(Button)(() => ({
  width: "100%",
  marginTop: "10px",
  "& .MuiButton-endIcon": {
    marginLeft: "8px",
  },
}));




// Initial filter options
const INITIAL_LOCATION = "Select Location";
const INITIAL_BOARD = "Select Board";

// Helper to generate slug from name
const generateSlug = (name: string) => {
  return name
    .toLowerCase()
    .replace(/[^\w ]+/g, '')
    .replace(/ +/g, '-');
};

const Schools: React.FC = () => {
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState("");
  const [locationAnchor, setLocationAnchor] = useState<null | HTMLElement>(null);
  const [boardAnchor, setBoardAnchor] = useState<null | HTMLElement>(null);
  const [selectedLocation, setSelectedLocation] = useState(INITIAL_LOCATION);
  const [selectedBoard, setSelectedBoard] = useState(INITIAL_BOARD);

  const { schools, loading, error } = useSchools();

  const locationOpen = Boolean(locationAnchor);
  const boardOpen = Boolean(boardAnchor);

  const handleLocationClick = (event: React.MouseEvent<HTMLElement>) => {
    setLocationAnchor(event.currentTarget);
  };

  const handleLocationClose = () => {
    setLocationAnchor(null);
  };

  const handleLocationSelect = (location: string) => {
    setSelectedLocation(location);
    setLocationAnchor(null);
  };

  const handleBoardClick = (event: React.MouseEvent<HTMLElement>) => {
    setBoardAnchor(event.currentTarget);
  };

  const handleBoardClose = () => {
    setBoardAnchor(null);
  };

  const handleBoardSelect = (board: string) => {
    setSelectedBoard(board);
    setBoardAnchor(null);
  };

  const handleSchoolClick = (school: any) => {
    // Navigate using ID or generated slug and pass school data in state
    navigate(`/schools/${generateSlug(school.name)}`, { state: { school } });
  };

  // Dynamic filter options
  const locationOptions = [INITIAL_LOCATION, ...new Set(schools.map(s => s.branch).filter(Boolean))];
  const boardOptions = [INITIAL_BOARD, ...new Set(schools.map(s => s.board).filter(Boolean))];

  // Filter schools based on search, location, and board
  const filteredSchools = schools.filter((school) => {
    const matchesSearch = school.name.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesLocation = selectedLocation === INITIAL_LOCATION || school.branch === selectedLocation;
    const matchesBoard = selectedBoard === INITIAL_BOARD || school.board === selectedBoard;
    return matchesSearch && matchesLocation && matchesBoard;
  });

  return (
    <>
      <Container maxWidth="xl" >
        <Paper sx={{
          margin: "30px 0px 60px 0px",
          padding: "30px",
          borderRadius: "15px",
          boxShadow: "unset",
          border: "1px solid #F0F0F0",
        }}>
          {/* Header Section */}
          <HeaderSection>
            <Typography variant="sb32">
              Select Your School
            </Typography>

            {/* Search and Filter Section */}
            <SearchFilterSection sx={{
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              marginTop: "20px",
            }}>
              <SearchField
                sx={{
                  "& .MuiOutlinedInput-root": {
                    width: "350px !important",
                    height: "48px !important",
                    padding: "0px 10px !important",
                    borderRadius: "10px !important",
                  }
                }}
                placeholder="Search School"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <IconButton
                        sx={{
                          "&:hover": {
                            backgroundColor: "unset !important",
                          },
                        }}
                      >
                        <SearchIcon />
                      </IconButton>
                    </InputAdornment>
                  ),
                }}
              />

              <Box sx={{
                display: "flex",
                gap: "20px"
              }}>
                <FilterButton sx={{
                  border: "1px solid #121419 !important",
                  color: "#121419 !important",
                  borderRadius: "06px !important",
                  fontSize: "14px !important",
                  fontWeight: "500 !important",
                }}
                  onClick={handleLocationClick}
                  endIcon={<KeyboardArrowDown />}
                >
                  {selectedLocation}
                </FilterButton>

                <FilterButton sx={{
                  border: "1px solid #121419 !important",
                  color: "#121419 !important",
                  borderRadius: "06px !important",
                  fontSize: "14px !important",
                  fontWeight: "500 !important",
                }}
                  onClick={handleBoardClick}
                  endIcon={<KeyboardArrowDown />}
                >
                  {selectedBoard}
                </FilterButton>

                <Menu
                  anchorEl={locationAnchor}
                  open={locationOpen}
                  onClose={handleLocationClose}
                >
                  {locationOptions.map((location) => (
                    <MenuItem
                      key={location}
                      onClick={() => handleLocationSelect(location)}
                      sx={{
                        fontSize: "14px !important",
                        fontWeight: "500 !important",
                        color: "#121419 !important",
                      }}
                    >
                      {location}
                    </MenuItem>
                  ))}
                </Menu>

                <Menu
                  anchorEl={boardAnchor}
                  open={boardOpen}
                  onClose={handleBoardClose}
                >
                  {boardOptions.map((board) => (
                    <MenuItem
                      key={board}
                      onClick={() => handleBoardSelect(board)}
                      sx={{
                        fontSize: "14px !important",
                        fontWeight: "500 !important",
                        color: "#121419 !important",
                      }}
                    >
                      {board}
                    </MenuItem>
                  ))}
                </Menu>
              </Box>
            </SearchFilterSection>
          </HeaderSection>

          {/* Schools Grid */}
          {loading ? (
            <Box sx={{ display: "flex", justifyContent: "center", padding: "100px 0", width: "100%" }}>
              <CircularProgress />
            </Box>
          ) : error ? (
            <Box sx={{ textAlign: "center", padding: "60px 20px", width: "100%" }}>
              <Typography variant="h6" color="error">
                {error}
              </Typography>
            </Box>
          ) : (
            <Grid container spacing={{ xs: 2, md: 3 }}>
              {filteredSchools.map((school) => (
                <Grid key={school.school_id} size={{ xs: 12, sm: 6, md: 4, lg: 3 }}>
                  <SchoolCard onClick={() => handleSchoolClick(school)}>
                    <Box sx={{
                      display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", width: "100%", backgroundColor: "#E3E6F633 !important",
                      height: "200px",
                    }}>
                      <SchoolLogo
                        src={school.image}
                        alt={school.name}
                        onError={(e) => {
                          (e.target as HTMLImageElement).src = DelhiPublic; // Fallback logo
                        }}
                      />
                    </Box>
                    <Box sx={{
                      display: "flex",
                      flexDirection: "column",
                      alignItems: "start",
                      justifyContent: "start",
                      padding: "20px",
                      width: "100%",
                    }}>
                      <Typography variant="sb16">{school.name}</Typography>
                      <LocationText >
                        <LocationIcon />
                        <Typography variant="r12" color="text.secondary">
                          {school.branch || "N/A"}
                        </Typography>
                      </LocationText>
                      <ViewClassesButton
                        variant="contained"
                        endIcon={<WhiteRightArrowIcon />}
                        onClick={(e) => {
                          e.stopPropagation();
                          handleSchoolClick(school);
                        }}
                      >
                        View Classes
                      </ViewClassesButton>
                    </Box>
                  </SchoolCard>
                </Grid>
              ))}
            </Grid>
          )}

          {/* Show message if no schools found */}
          {!loading && !error && filteredSchools.length === 0 && (
            <Box
              sx={{
                textAlign: "center",
                padding: "60px 20px",
              }}
            >
              <Typography variant="h6" sx={{ color: "#6B7280" }}>
                No schools found matching your criteria.
              </Typography>
            </Box>
          )}
        </Paper>
      </Container>
    </>
  );
};

export default Schools;

