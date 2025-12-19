import { Box, Typography, Container } from "@mui/material";
import Layout from "../../layouts/Layout";

const CancellationsAndRefundPolicy = () => {
  return (
    <Layout>
      <Box sx={{ py: 8, pb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h1" gutterBottom fontSize={"2rem"}>
            Cancellations & Refund Policy
          </Typography>

          <Typography variant="h2" gutterBottom sx={{ py: 2 }}>
            Contact for Refund/Replacement and Cancellation
          </Typography>
          <Typography variant="body1" paragraph>
            For Refund/Replacement and Cancellation requests, please contact the
            SWAGRUHA FOODS Customer Service team at
            <strong> 9949845000</strong> (10:00 am to 6:00 pm IST) or write an
            email to
            <strong> swagruhafoods@yahoo.com</strong>.
          </Typography>

          <Typography variant="h2" gutterBottom>
            Cancellations
          </Typography>
          <Typography variant="body1" paragraph>
            Cancellations will be considered only if the request is made within
            24 hours of placing an order. SWAGRUHA FOODS will make a decision on
            the cancellation request based on the current order status and other
            factors. For example, if the order has already been shipped, it will
            not be possible to cancel the order.
          </Typography>
          <Typography variant="body1" paragraph>
            Cancellation requests will also not be approved for products that
            the SWAGRUHA FOODS marketing team has obtained for special occasions
            like Holi, Diwali, Valentine’s Day, etc. These are limited occasion
            offers, and therefore cancellations are not possible.
          </Typography>


          <Typography variant="h2" gutterBottom>
            Refund/Replacement
          </Typography>
          <Typography variant="body1" paragraph>
            Refund/Replacement requests will be considered only if the request
            is made to the SWAGRUHA FOODS customer service team within 12 hours
            of receiving delivery of the item. Common reasons may include
            incorrect item shipped or product spoilage. Customers are
            responsible for providing adequate information (including
            photographs) to assist SWAGRUHA FOODS in making a decision.
          </Typography>
          <Typography variant="body1" paragraph>
            No refunds will be issued if the product’s taste does not meet the
            customer's preference, provided the product is within its expiry
            date.
          </Typography>

          <Typography variant="h2" gutterBottom>
            Damaged Products
          </Typography>
          <Typography variant="body1" paragraph>
            In case of receipt of a damaged product, please report to our
            Customer Service team within 12 hours of receiving the shipment.
            Customers should provide adequate information (including
            photographs) so SWAGRUHA FOODS can address the issue with the
            courier company. Refunds or replacements will be provided to the
            customer in case of a positive decision.
          </Typography>

          <Typography variant="h2" gutterBottom>
            Product Replacements
          </Typography>
          <Typography variant="body1" paragraph>
            For product replacements, a new packet of the same product will be
            shipped to the customer. If the same product is unavailable, an
            equivalent product will be provided after discussion with the
            customer.
          </Typography>

          <Typography variant="h2" gutterBottom>
            Refund Timeline
          </Typography>
          <Typography variant="body1" paragraph>
            SWAGRUHA FOODS will typically process refunds within 1-2 business
            days after a refund request is approved. The request is then
            forwarded to our Payment Gateway partner, who requires 7-10 business
            days to complete the refund process.
          </Typography>
        </Container>
      </Box>
    </Layout>
  );
};

export default CancellationsAndRefundPolicy;
