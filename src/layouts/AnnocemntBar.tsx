import {
    Box,
    Container,
    Stack,
    Typography,
} from "@mui/material";

import { BannerStripIcon, } from "../components/icons/CommonIcons";
import BannerStripBg from "../assets/images/banner-strip-bg.png";

function AnnocemntBar() {
    return (
        <>
            <Box
                sx={{
                    backgroundImage: `url(${BannerStripBg})`,
                    backgroundSize: "cover",
                    backgroundPosition: "center",
                    backgroundRepeat: "no-repeat",
                    color: "#ffffff",
                    py: 2.5,
                    overflow: "hidden",
                }}
            >
                <Container maxWidth="xl">
                    <Box
                        sx={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                        }}
                    >
                        <Stack direction="row" spacing={1} position="relative">
                            <Box sx={{
                                position: "absolute",
                                top: "0px",
                                left: "-60px",
                            }}>
                                <BannerStripIcon />
                            </Box>
                            <Typography variant="m16">
                                Back to School Sale - Up to 50% OFF on Selected Items! Use code{" "}
                                <Box component="span" sx={{ fontWeight: 700 }}>
                                    STUDENT50
                                </Box>
                            </Typography>
                        </Stack>
                    </Box>
                </Container>
            </Box>

        </>
    )
}

export default AnnocemntBar