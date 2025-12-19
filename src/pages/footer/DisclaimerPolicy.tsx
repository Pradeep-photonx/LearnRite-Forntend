import { Box, Typography, Container } from "@mui/material";
import Layout from "../../layouts/Layout";

const DisclaimerPolicy = () => {
  return (
    <Layout>
      <Box sx={{ py: 8, pb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h1" gutterBottom fontSize={"2rem"}>
            Disclaimer Policy
          </Typography>

          <Typography variant="body1" paragraph sx={{ py: 2 }}>
            SWAGRUHA FOODS offers an unbeatable range of sweets and is
            passionate about Subcontinent food. We invite you to explore the
            diversity of Subcontinent cuisine with us. Our selection includes
            top-quality Indian products, including hard-to-find items, allowing
            our customers to fulfill all their Indian food needs under one roof.
          </Typography>

          <Typography variant="body1" paragraph>
            As www.swagruhafoods.net serves across the US with various sweets,
            we warrant that goods sold to consumers are of satisfactory quality,
            fit for their intended purpose, and conform to the terms of this
            contract in all material respects.
          </Typography>

          <Typography variant="h2" gutterBottom>
            Consumer Rights
          </Typography>
          <Typography variant="body1" paragraph>
            Where goods are sold under a consumer transaction (as defined by the
            Consumer Transactions (Restrictions on Statements) Order 1976, as
            amended), your legal rights are not affected by these conditions.
          </Typography>

          <Typography variant="h2" gutterBottom>
            Warranty Conditions
          </Typography>
          <Typography variant="body1" paragraph>
            Our warranty does not apply to defects arising from fair wear and
            tear, willful damage, accident, negligence by you or any third
            party, misuse of goods, failure to follow our instructions, or any
            unauthorized alteration or repair.
          </Typography>
          <Typography variant="body1" paragraph>
            In the unlikely event that the goods do not conform to these
            conditions, please notify us as soon as possible after delivery. We
            will arrange for the goods to be collected on an agreed date or may
            ask you to return them to us at our cost. Once the goods are
            inspected and confirmed as faulty, we will comply with our
            obligations under consumer law.
          </Typography>
        </Container>
      </Box>
    </Layout>
  );
};

export default DisclaimerPolicy;
