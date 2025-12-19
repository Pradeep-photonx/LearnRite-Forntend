import { Box, Container, Stack, Typography } from '@mui/material'
import BookStatinary from "../assets/images/books-statinory.svg"
import SchoolZone from "../assets/images/schoolzone.svg"

const MostRecommendedStrip = () => {
  return (
    <>
    <Box sx={{ borderTop: "1px solid #1214191A", borderBottom: "1px solid #1214191A", backgroundColor:"#FFF" }}>
        <Container maxWidth="xl">
          <Stack
            direction="row"
            gap={"20px"}
            py={2.5}
            alignItems="center"
            justifyContent="flex-end"
            flexWrap="wrap"
          >
            <Stack 
                 sx={{
                    display:"flex",
                    flexDirection:"row",
                    gap:"8px",
                    alignItems:"center"
                }}
            >
                <img src={BookStatinary}/>
                <Typography variant="m14">Books & Stationary</Typography>
            </Stack>
            <Stack
                sx={{
                    display:"flex",
                    flexDirection:"row",
                    gap:"8px",
                    alignItems:"center"
                }}
            >
                <img src={SchoolZone}/>
                <Typography variant="m14">School Zone</Typography>
            </Stack>
            
          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default MostRecommendedStrip