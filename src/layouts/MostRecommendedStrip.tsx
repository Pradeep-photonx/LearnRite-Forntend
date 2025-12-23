import { Box, Button, Container, Stack, Typography } from '@mui/material'
import BookStatinary from "../assets/images/books-statinory.svg"
import SchoolZone from "../assets/images/schoolzone.svg"
import { useNavigate } from 'react-router-dom'

const MostRecommendedStrip = () => {
  const navigate = useNavigate()
  return (
    <>
      <Box sx={{ borderTop: "1px solid #1214191A", borderBottom: "1px solid #1214191A", backgroundColor: "#FFF" }}>
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
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                alignItems: "center"
              }}
            >
              <img src={BookStatinary} />
              <Button
                onClick={() => navigate('/categories')}
                variant="text" sx={{ color: "#121419", fontSize: "14px !important" }}>Books & Stationary</Button>
            </Stack>
            <Stack
              sx={{
                display: "flex",
                flexDirection: "row",
                gap: "8px",
                alignItems: "center"
              }}
            >
              <img src={SchoolZone} />
              <Button
                onClick={() => navigate('/schools')}
                variant="text" sx={{ color: "#121419", fontSize: "14px !important" }}>School Zone</Button>
            </Stack>

          </Stack>
        </Container>
      </Box>
    </>
  )
}

export default MostRecommendedStrip