import { Box, Typography, Container } from "@mui/material";
import Layout from "../../layouts/Layout";

const ShippingAndDeliveryPolicy = () => {
  return (
    <Layout>
      <Box sx={{ py: 8, pb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h1" gutterBottom fontSize={"2rem"}>
            Shipping & Delivery Policy
          </Typography>


          <Typography variant="h2" gutterBottom sx={{ py: 2 }}>
            Delivery Timelines
          </Typography>
          <Typography variant="body1" paragraph>
            We try our best to ensure that all products are delivered within:
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Metro Cities:</strong> 2 to 3 working days (excluding public
            holidays or declared holidays)
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Non-Metro:</strong> 3 to 4 working days (excluding public
            holidays or declared holidays)
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Remote and Small Areas:</strong> Delivery estimate will vary
            based on location
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Same Day Delivery:</strong> Available only in selected
            locations within Vijayawada
          </Typography>
          <Typography variant="body1" paragraph>
            <strong>Normal Delivery:</strong> As requested by the customer on
            the specified date
          </Typography>

          <Typography variant="h2" gutterBottom>
            Delays and Unavoidable Circumstances
          </Typography>
          <Typography variant="body1" paragraph>
            Please note that delivery timing depends on factors like weather,
            unforeseen events, traffic conditions, and special events. SWAGRUHA
            FOODS endeavors to complete deliveries as soon as possible and will
            update you in case of any changes.
          </Typography>
          <Typography variant="body1" paragraph>
            During festivals or in cases of unforeseen delays by courier
            services, delivery times may be extended. Situations beyond SWAGRUHA
            FOODS control, such as product unavailability, public holidays,
            strikes, or natural disasters, may also cause delays.
          </Typography>

          <Typography variant="h2" gutterBottom>
            Customer Responsibilities
          </Typography>
          <Typography variant="body1" paragraph>
            Products will be delivered to the address provided by the customer
            at the time of order. SWAGRUHA FOODS is not responsible for delivery
            delays due to incorrect or incomplete addresses. Deliveries cannot
            be made to post-box-only addresses.
          </Typography>
          <Typography variant="body1" paragraph>
            For any changes to the order, please contact us via phone or email
            as soon as possible. SWAGRUHA FOODS will try to accommodate changes
            based on order status, but changes cannot be made once an order has
            been shipped.
          </Typography>

          <Typography variant="h2" gutterBottom>
            Shipment Tracking
          </Typography>
          <Typography variant="body1" paragraph>
            You will receive an email with tracking details as soon as the
            product is shipped.
          </Typography>

          <Typography variant="h2" gutterBottom>
            Additional Charges
          </Typography>
          <Typography variant="body1" paragraph>
            Any charges such as GST, customs tax, customs excise duty, service
            tax, or any direct or indirect taxes post-shipment, whether national
            or international, will be the responsibility of the
            consignee/customer.
          </Typography>
        </Container>
      </Box>
    </Layout>
  );
};

export default ShippingAndDeliveryPolicy;
