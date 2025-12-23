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
    Stack,
    styled,
    Paper,
    Menu,
    MenuItem,
} from "@mui/material";
import { useNavigate, useParams, useLocation } from "react-router-dom";
import { KeyboardArrowDown } from "@mui/icons-material";
import DelhiPublic from '../../assets/images/delhi-public-school.png';
import { BoardIcon, SearchIcon, WhiteRightArrowIcon } from "../../components/icons/CommonIcons";
import { useSchoolClasses } from "../../api/useSchoolClasses";
import { CircularProgress } from "@mui/material";
import type { School } from "../../api/school";

// Styled Components
const SchoolBanner = styled(Box)(() => ({
    background: "linear-gradient(98.42deg, #2C65F9 10.23%, #2C55C1 80.76%)",
    padding: "30px 40px",
    margin: "30px 0px 20px 0px",
    borderRadius: "10px",
}));

const BannerContent = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "space-between",
    alignItems: "center",
    [theme.breakpoints.down("md")]: {
        flexDirection: "column",
        gap: "20px",
        textAlign: "center",
    },
}));

const BannerLeft = styled(Box)({
    display: "flex",
    justifyContent: "left",
    alignItems: "left",
    flexDirection: "column",
    gap: "15px",
});

const BannerRight = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
});

const SchoolLogo = styled("img")({
    width: "156px",
    height: "156px",
    objectFit: "contain",
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    padding: "10px",
});

const HeaderSection = styled(Box)(({ theme }) => ({
    display: "flex",
    justifyContent: "left",
    alignItems: "left",
    flexDirection: "column",
    gap: "20px",
    marginBottom: "30px",
    [theme.breakpoints.down("md")]: {
        marginBottom: "20px",
    },
}));

const SearchField = styled(TextField)(({ theme }) => ({
    flex: 1,
    maxWidth: "500px",
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
        maxWidth: "100%",
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

const ClassCard = styled(Box)(() => ({
    backgroundColor: "#FFFFFF",
    borderRadius: "12px",
    border: "1px solid #F0F0F0",
    overflow: "hidden",
    cursor: "pointer",
    transition: "all 0.3s ease",
    display: "flex",
    flexDirection: "column",
    height: "100%",
    "&:hover": {
        boxShadow: "0px 4px 16px rgba(0, 0, 0, 0.12)",
    },
}));

const ClassIconContainer = styled(Box)({
    width: "100%",
    height: "180px",
    backgroundColor: "#F9FAFB",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    padding: "20px",
});

const ClassIcon = styled(Box)({
    width: "100%",
    height: "100%",
    display: "flex",
    alignItems: "center",
    justifyContent: "center",
    "& img": {
        maxWidth: "100%",
        maxHeight: "100%",
        objectFit: "contain",
    },
});

const ClassContent = styled(Box)({
    padding: "24px",
    display: "flex",
    flexDirection: "column",
    gap: "12px",
    flex: 1,
});

const ClassDetails = styled(Box)({
    display: "flex",
    flexDirection: "column",
    gap: "4px",

});

const DetailRow = styled(Box)({
    display: "flex",
    alignItems: "center",
    justifyContent: "space-between",
});

const ViewBundleButton = styled(Button)(() => ({
    // marginTop: "auto",
    // borderRadius: "8px",
    // textTransform: "none",
    fontSize: "14px",
    // fontWeight: 600,
    "& .MuiButton-endIcon": {
        marginLeft: "8px",
    },
}));

// Class Data Interface




const SchoolClasses: React.FC = () => {
    const navigate = useNavigate();
    const { schoolSlug } = useParams<{ schoolSlug: string }>();
    const location = useLocation();
    const [searchQuery, setSearchQuery] = useState("");
    const [selectedLanguage, setSelectedLanguage] = useState("All Languages");
    const [languageAnchor, setLanguageAnchor] = useState<null | HTMLElement>(null);

    const languageOpen = Boolean(languageAnchor);
    const languageOptions = ["All Languages", "Telugu", "Hindi"];

    // Get school data from location state
    const school = location.state?.school as School | undefined;

    const { classes, loading, error } = useSchoolClasses(school?.school_id || null);

    console.log('SchoolClasses Debug:', {
        school,
        schoolId: school?.school_id,
        classes,
        loading,
        error
    });

    const handleLanguageClick = (event: React.MouseEvent<HTMLElement>) => {
        setLanguageAnchor(event.currentTarget);
    };

    const handleLanguageClose = () => {
        setLanguageAnchor(null);
    };

    const handleLanguageSelect = (language: string) => {
        setSelectedLanguage(language);
        setLanguageAnchor(null);
    };

    const handleClassClick = (classItem: any, bundle: any) => {
        try {
            // Navigate to class bundle details page using slugs
            const className = classItem?.class_name || 'class';
            const language = bundle?.language || 'bundle';
            navigate(`/schools/${schoolSlug}/${className.toLowerCase().replace(/ /g, '-')}-${language.toLowerCase()}`, {
                state: {
                    classItem: {
                        ...classItem,
                        ...bundle,
                        bundle_name: `${classItem.class_name} - ${bundle.language}`,
                    },
                    school
                }
            });
        } catch (err) {
            console.error('Error navigating to class:', err);
        }
    };

    // Filter classes based on search and language - with extra safety
    const filteredClasses = Array.isArray(classes) ? classes.filter((classItem) => {
        const matchesSearch =
            (classItem?.class_name || "").toLowerCase().includes(searchQuery.toLowerCase());

        // Check if any bundle in the class matches the selected language
        const hasLanguage = selectedLanguage === "All Languages" ||
            classItem.bundles?.some(bundle => bundle.language === selectedLanguage);

        return matchesSearch && hasLanguage;
    }) : [];

    // Early return for error state
    if (error && !loading) {
        return (
            <Container maxWidth="xl">
                <Box sx={{ padding: "100px 20px", textAlign: "center" }}>
                    <Typography variant="h5" color="error" gutterBottom>
                        {error}
                    </Typography>
                    <Button
                        variant="contained"
                        onClick={() => navigate('/schools')}
                        sx={{ marginTop: "20px" }}
                    >
                        Back to Schools
                    </Button>
                </Box>
            </Container>
        );
    }

    return (
        <>
            {/* School Banner Section */}
            <Container maxWidth="xl">
                {!school ? (
                    <Box sx={{ padding: "50px", textAlign: "center" }}>
                        <Typography variant="h5">School details not found. Please select a school first.</Typography>
                        <Button onClick={() => navigate('/schools')} sx={{ marginTop: "20px" }}>Back to Schools</Button>
                    </Box>
                ) : (
                    <SchoolBanner>
                        <BannerContent>
                            <BannerLeft>
                                <Box sx={{
                                    display: "flex",
                                    gap: "10px",
                                    alignItems: "center",
                                    backgroundColor: "#FFFFFF1A",
                                    backdropFilter: "blur(10px)",
                                    padding: "5px 10px",
                                    borderRadius: "50px",
                                    width: "fit-content",
                                }}>
                                    <BoardIcon />
                                    <Typography
                                        variant="r14"
                                        sx={{
                                            color: "#E7EBF0",
                                            opacity: 0.9,
                                        }}
                                    >
                                        {school.board}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px",
                                }}>
                                    <Typography
                                        variant="m24"
                                        sx={{
                                            color: "#FFFFFF",
                                        }}
                                    >
                                        {school.name}
                                    </Typography>
                                    <Typography
                                        variant="r14"
                                        sx={{
                                            color: "#FFF",
                                        }}
                                    >
                                        {school.branch}
                                    </Typography>
                                </Box>
                                <Box sx={{
                                    display: "flex",
                                    flexDirection: "column",
                                    gap: "5px",
                                }}>
                                    <Typography
                                        variant="m24"
                                        sx={{
                                            color: "#FFF",
                                        }}
                                    >
                                        {classes?.length || 0}
                                    </Typography>
                                    <Typography
                                        variant="r14"
                                        sx={{
                                            color: "#FFF",
                                        }}
                                    >
                                        Classes Available
                                    </Typography>
                                </Box>
                            </BannerLeft>
                            <BannerRight>
                                <SchoolLogo
                                    src={school.image}
                                    alt={`${school.name} Logo`}
                                    onError={(e) => {
                                        (e.target as HTMLImageElement).src = DelhiPublic;
                                    }}
                                />
                            </BannerRight>
                        </BannerContent>
                    </SchoolBanner>
                )}
            </Container>

            {/* Classes Section */}
            <Container maxWidth="xl">
                <Paper sx={{
                    margin: "30px 0px 60px 0px",
                    padding: "30px",
                    borderRadius: "15px",
                    boxShadow: "unset",
                    border: "1px solid #CFCDCD4D",
                }}>
                    <Stack sx={{
                        display: "flex",
                        flexDirection: "row",
                        justifyContent: "space-between",
                        alignItems: "flex-start",
                    }}>
                        <HeaderSection>
                            <Box sx={{
                                display: "flex",
                                flexDirection: "column",
                                justifyContent: "left",
                                alignItems: "left",
                                gap: "05px",
                            }}>
                                <Typography variant="sb32">
                                    Select Your Class
                                </Typography>
                                <Typography variant="r14" sx={{ color: "#445061" }}>
                                    Choose your class to view the complete book bundle kit
                                </Typography>
                            </Box>

                            {/* Search Bar */}
                            <SearchField
                                sx={{
                                    "& .MuiOutlinedInput-root": {
                                        width: "350px !important",
                                        height: "48px !important",
                                        padding: "10px !important",
                                        borderRadius: "10px !important",
                                    }
                                }}
                                placeholder="Search for classes"
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
                        </HeaderSection>

                        {/* Language Filter */}
                        <Box sx={{
                            display: "flex",
                            gap: "20px",
                            marginBottom: "30px"
                        }}>
                            <FilterButton
                                sx={{
                                    border: "1px solid #121419 !important",
                                    color: "#121419 !important",
                                    borderRadius: "06px !important",
                                    fontSize: "14px !important",
                                    fontWeight: "500 !important",
                                }}
                                onClick={handleLanguageClick}
                                endIcon={<KeyboardArrowDown />}
                            >
                                {selectedLanguage}
                            </FilterButton>

                            <Menu
                                anchorEl={languageAnchor}
                                open={languageOpen}
                                onClose={handleLanguageClose}
                            >
                                {languageOptions.map((language) => (
                                    <MenuItem
                                        key={language}
                                        onClick={() => handleLanguageSelect(language)}
                                        sx={{
                                            fontSize: "14px !important",
                                            fontWeight: "500 !important",
                                            color: "#121419 !important",
                                        }}
                                    >
                                        {language}
                                    </MenuItem>
                                ))}
                            </Menu>
                        </Box>
                    </Stack>


                    {/* Classes Grid */}
                    {loading ? (
                        <Box sx={{ display: "flex", justifyContent: "center", padding: "100px 0" }}>
                            <CircularProgress />
                        </Box>
                    ) : error ? (
                        <Box sx={{ textAlign: "center", padding: "60px 20px" }}>
                            <Typography variant="h6" color="error">{error}</Typography>
                        </Box>
                    ) : filteredClasses.length > 0 ? (
                        <Grid container spacing={{ xs: 2, md: 3 }}>
                            {filteredClasses.map((classItem) => (
                                <Grid key={classItem.class_id} size={{ xs: 12, sm: 6, md: 4 }}>
                                    <ClassCard>
                                        <ClassIconContainer>
                                            <ClassIcon>
                                                <Box
                                                    sx={{
                                                        width: "150px",
                                                        height: "150px",
                                                        // backgroundColor: "#e3e6f6",
                                                        borderRadius: "8px",
                                                        display: "flex",
                                                        alignItems: "center",
                                                        justifyContent: "center",
                                                        overflow: "hidden",
                                                    }}
                                                >
                                                    {classItem.class_image ? (
                                                        <img
                                                            src={`${classItem.class_image}`}
                                                            alt={classItem.class_name}
                                                            style={{
                                                                width: "100%",
                                                                height: "100%",
                                                                objectFit: "cover",
                                                            }}
                                                        />
                                                    ) : (
                                                        <Typography variant="sb32" sx={{ color: "#2C65F9" }}>
                                                            {classItem.class_name?.charAt(0) || "C"}
                                                        </Typography>
                                                    )}
                                                </Box>
                                            </ClassIcon>
                                        </ClassIconContainer>
                                        <ClassContent>
                                            <Box sx={{
                                                display: "flex",
                                                justifyContent: "left",
                                                alignItems: "left",
                                                flexDirection: "column",
                                                gap: "2px",
                                            }}>
                                                <Typography variant="sb16">
                                                    {classItem.class_name || "Class"}
                                                </Typography>
                                                <Typography variant="r14" color="text.secondary">
                                                    Foundation learning with play based activities
                                                </Typography>
                                            </Box>

                                            <Stack direction="column" spacing={2} justifyContent="space-between" alignItems="left"
                                                sx={{
                                                    borderTop: "1px solid #1214191A",
                                                    paddingTop: "10px",
                                                }}
                                            >
                                                <Typography variant="m16">
                                                    Select Second Language
                                                </Typography>
                                                <Box sx={{
                                                    display: "flex",
                                                    flexDirection: "row",
                                                    gap: "10px",
                                                    width: "100%",
                                                    flexWrap: "wrap",
                                                }}>
                                                    {classItem.bundles?.map((bundle) => {
                                                        const isSelectedLang = selectedLanguage === "All Languages" || bundle.language === selectedLanguage;
                                                        if (!isSelectedLang) return null;

                                                        return (
                                                            <Button
                                                                key={bundle.bundle_id}
                                                                variant="outlined"
                                                                onClick={() => handleClassClick(classItem, bundle)}
                                                                sx={{
                                                                    display: "flex",
                                                                    alignItems: "flex-start",
                                                                    flexDirection: "column",
                                                                    justifyContent: "flex-start",
                                                                    gap: "05px",
                                                                    border: "1px solid #D1D4DE",
                                                                    borderRadius: "10px",
                                                                    color: "text.primary",
                                                                    // minWidth: "30%",
                                                                    // width: "fit-content",
                                                                    // flex: 1,
                                                                    "&:hover": {
                                                                        borderColor: "#2C65F9",
                                                                        backgroundColor: "#F0F5FF"
                                                                    }
                                                                }}
                                                            >
                                                                {bundle.language}
                                                                <Box component={"span"} sx={{
                                                                    fontWeight: "bold",
                                                                    color: "#155DFC",
                                                                }}>
                                                                    ₹{bundle.total_price?.toLocaleString('en-IN') || 0}
                                                                </Box>
                                                            </Button>
                                                        );
                                                    })}
                                                </Box>
                                            </Stack>
                                        </ClassContent>
                                    </ClassCard>
                                </Grid>
                            ))}
                        </Grid>
                    ) : (
                        <Box
                            sx={{
                                textAlign: "center",
                                padding: "60px 20px",
                            }}
                        >
                            <Typography variant="h6" sx={{ color: "#6B7280" }}>
                                {searchQuery ? "No classes match your search." : "No classes found for this school."}
                            </Typography>
                            <Typography variant="body2" sx={{ color: "#9CA3AF", marginTop: "10px" }}>
                                Please check back later or contact the school administrator.
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Container>
        </>
    );
};

export default SchoolClasses;

