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
} from "@mui/material";
import { useNavigate, useParams } from "react-router-dom";
import DelhiPublic from '../../assets/images/delhi-public-school.png';
import { BoardIcon, SearchIcon, WhiteRightArrowIcon } from "../../components/icons/CommonIcons";

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
    display:"flex",
    justifyContent:"left",
    alignItems:"left",
    flexDirection:"column",
    gap:"20px",
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
    justifyContent:"space-between",
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
interface ClassData {
    id: number | string;
    name: string;
    slug: string;
    description: string;
    totalBooks: number;
    totalItems: number;
    price: number;
    icon?: string;
}

// School Data Interface
interface SchoolInfo {
    id: number | string;
    name: string;
    slug: string;
    logo: string;
    board: string;
    location: string;
    classesCount: number;
}

// Default School Info (will be fetched based on schoolSlug)
const getSchoolInfo = (schoolSlug: string | undefined): SchoolInfo => {
    // In real app, this would be fetched from API based on slug
    // For now, mapping slugs to school info
    const schoolMap: Record<string, SchoolInfo> = {
        "delhi-public-school": {
            id: 1,
            name: "Delhi Public School",
            slug: "delhi-public-school",
            logo: DelhiPublic,
            board: "CBSE Board",
            location: "Kondapur, Hyderabad",
            classesCount: 12,
        },
        "suchitra-academy": {
            id: 2,
            name: "Suchitra Academy",
            slug: "suchitra-academy",
            logo: DelhiPublic,
            board: "CBSE Board",
            location: "Madhapur, Hyderabad",
            classesCount: 10,
        },
        "oakridge-international-school": {
            id: 3,
            name: "Oakridge International School",
            slug: "oakridge-international-school",
            logo: DelhiPublic,
            board: "IB Board",
            location: "Gachibowli, Hyderabad",
            classesCount: 15,
        },
    };
    
    return schoolMap[schoolSlug || "delhi-public-school"] || schoolMap["delhi-public-school"];
};

// Default Classes Data
const defaultClasses: ClassData[] = [
    {
        id: 1,
        name: "Lower Kindergarten",
        slug: "lower-kindergarten",
        description: "Foundation learning with play based activities",
        totalBooks: 8,
        totalItems: 15,
        price: 2280,
    },
    {
        id: 2,
        name: "Upper Kindergarten",
        slug: "upper-kindergarten",
        description: "Advanced learning with interactive activities",
        totalBooks: 10,
        totalItems: 18,
        price: 2800,
    },
    {
        id: 3,
        name: "Class 1",
        slug: "class-1",
        description: "Elementary education foundation",
        totalBooks: 12,
        totalItems: 20,
        price: 3200,
    },
    {
        id: 4,
        name: "Class 2",
        slug: "class-2",
        description: "Building on foundational skills",
        totalBooks: 12,
        totalItems: 20,
        price: 3200,
    },
    {
        id: 5,
        name: "Class 3",
        slug: "class-3",
        description: "Developing critical thinking",
        totalBooks: 14,
        totalItems: 22,
        price: 3500,
    },
    {
        id: 6,
        name: "Class 4",
        slug: "class-4",
        description: "Expanding knowledge base",
        totalBooks: 14,
        totalItems: 22,
        price: 3500,
    },
    {
        id: 7,
        name: "Class 5",
        slug: "class-5",
        description: "Preparing for middle school",
        totalBooks: 16,
        totalItems: 24,
        price: 3800,
    },
    {
        id: 8,
        name: "Class 6",
        slug: "class-6",
        description: "Middle school curriculum",
        totalBooks: 18,
        totalItems: 26,
        price: 4200,
    },
    {
        id: 9,
        name: "Class 7",
        slug: "class-7",
        description: "Advanced middle school",
        totalBooks: 18,
        totalItems: 26,
        price: 4200,
    },
    {
        id: 10,
        name: "Class 8",
        slug: "class-8",
        description: "Preparing for high school",
        totalBooks: 20,
        totalItems: 28,
        price: 4500,
    },
    {
        id: 11,
        name: "Class 9",
        slug: "class-9",
        description: "High school foundation",
        totalBooks: 22,
        totalItems: 30,
        price: 5000,
    },
    {
        id: 12,
        name: "Class 10",
        slug: "class-10",
        description: "Board exam preparation",
        totalBooks: 24,
        totalItems: 32,
        price: 5500,
    },
];

const SchoolClasses: React.FC = () => {
    const navigate = useNavigate();
    const { schoolSlug } = useParams<{ schoolSlug: string }>();
    const [searchQuery, setSearchQuery] = useState("");

    const schoolInfo = getSchoolInfo(schoolSlug);

    const handleClassClick = (classData: ClassData) => {
        // Navigate to class bundle details page using slugs
        navigate(`/schools/${schoolSlug}/${classData.slug}`);
    };

    // Filter classes based on search
    const filteredClasses = defaultClasses.filter((classItem) =>
        classItem.name.toLowerCase().includes(searchQuery.toLowerCase())
    );

    return (
        <>
            {/* School Banner Section */}
            <Container maxWidth="xl">
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
                                    {schoolInfo.board}
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
                                    {schoolInfo.name}
                                </Typography>
                                <Typography
                                    variant="r14"
                                    sx={{
                                        color: "#FFF",
                                    }}
                                >
                                    {schoolInfo.location}
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
                                    {schoolInfo.classesCount}
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
                            <SchoolLogo src={schoolInfo.logo} alt={`${schoolInfo.name} Logo`} />
                        </BannerRight>
                    </BannerContent>
                </SchoolBanner>
            </Container>

            {/* Classes Section */}
            <Container maxWidth="xl">
                <Paper sx={{
                    margin: "30px 0px 60px 0px",
                    padding: "30px",
                    borderRadius:"15px",
                    boxShadow:"unset",
                    border:"1px solid #CFCDCD4D",
                }}>
                    <HeaderSection>
                       <Box sx={{
                        display:"flex",
                        flexDirection:"column",
                        justifyContent:"left",
                        alignItems:"left",
                        gap:"05px",
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
                            "& .MuiOutlinedInput-root":{
                              width:"350px !important",
                              height:"48px !important",
                              padding:"10px !important",
                              borderRadius:"10px !important",
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

                    {/* Classes Grid */}
                    <Grid container spacing={{ xs: 2, md: 3 }}>
                        {filteredClasses.map((classItem) => (
                            <Grid key={classItem.id} size={{ xs: 12, sm: 6, md: 4 }}>
                                <ClassCard onClick={() => handleClassClick(classItem)}>
                                    <ClassIconContainer>
                                        <ClassIcon>
                                            {/* Placeholder for class icon - in real app, this would be an image */}
                                            <Box
                                                sx={{
                                                    width: "100px",
                                                    height: "100px",
                                                    backgroundColor: "#E3E6F6",
                                                    borderRadius: "8px",
                                                    display: "flex",
                                                    alignItems: "center",
                                                    justifyContent: "center",
                                                }}
                                            >
                                                <Typography variant="r14" sx={{ color: "#6B7280" }}>
                                                    Icon
                                                </Typography>
                                            </Box>
                                        </ClassIcon>
                                    </ClassIconContainer>
                                    <ClassContent>
                                        <Box sx={{
                                            display:"flex",
                                            justifyContent:"left",
                                            alignItems:"left",
                                            flexDirection:"column",
                                            gap:"2px",
                                        }}>
                                            <Typography variant="sb16">
                                            {classItem.name}
                                        </Typography>
                                        <Typography variant="r14" color="text.secondary">
                                            {classItem.description}
                                        </Typography>
                                        </Box>
                                        <ClassDetails>
                                            <DetailRow>
                                                <Typography variant="r16" sx={{ color: "#445061" }}>
                                                    Total Books
                                                    </Typography>
                                                    <Typography variant="sb16">
                                                        {classItem.totalBooks} books
                                                    </Typography>
                                            </DetailRow>
                                            <DetailRow>
                                                <Typography variant="r14" sx={{ color: "#445061" }}>
                                                    Total Items:
                                                </Typography>
                                                <Typography variant="sb16">
                                                    {classItem.totalItems} items
                                                </Typography>
                                            </DetailRow>
                                        </ClassDetails>
                                        <Stack direction="row" spacing={2} justifyContent="space-between" alignItems="center"
                                        sx={{
                                            borderTop:"1px solid #1214191A",
                                            paddingTop:"10px",
                                        }}
                                        >
                                        <Typography
                                            variant="r16"
                                            // sx={{
                                            //     color: "#121318",
                                            //     marginTop: "8px",
                                            // }}
                                        >
                                            Bundle Prices: 
                                        </Typography>
                                        <Box sx={{
                                            display:"flex",
                                            flexDirection:"column",
                                            justifyContent:"flex-end",
                                            alignItems:"flex-end",
                                        }}>
                                            <Typography variant="b16" sx={{ color: "#155DFC" }}>
                                                ₹{classItem.price.toLocaleString("en-IN")}
                                            </Typography>
                                            <Typography variant="r12">
                                                inc of all taxes
                                            </Typography>
                                        </Box>
                                        </Stack>
                                        <ViewBundleButton
                                            variant="contained"
                                            endIcon={<WhiteRightArrowIcon />}
                                            onClick={(e) => {
                                                e.stopPropagation();
                                                handleClassClick(classItem);
                                            }}
                                        >
                                            View Bundle
                                        </ViewBundleButton>
                                    </ClassContent>
                                </ClassCard>
                            </Grid>
                        ))}
                    </Grid>

                    {/* Show message if no classes found */}
                    {filteredClasses.length === 0 && (
                        <Box
                            sx={{
                                textAlign: "center",
                                padding: "60px 20px",
                            }}
                        >
                            <Typography variant="h6" sx={{ color: "#6B7280" }}>
                                No classes found matching your search.
                            </Typography>
                        </Box>
                    )}
                </Paper>
            </Container>
        </>
    );
};

export default SchoolClasses;

