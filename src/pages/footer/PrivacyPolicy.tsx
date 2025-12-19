import { Box, Container, Typography } from "@mui/material";
import Layout from "../../layouts/Layout";

const PrivacyPolicy = () => {
  return (
    <Layout>
      <Box sx={{ py: 8, pb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h1" gutterBottom fontSize={"2rem"}>
            Privacy Policy
          </Typography>
          <Typography variant="body1" sx={{ py: 2 }}>
            SWAGRUHA FOODS has created this Privacy Policy in order to
            demonstrate our firm commitment to your privacy. The following
            document outlines our corporate policies and practices with respect
            to information gathering, dissemination, and protection.
          </Typography>

          <Typography variant="h2" gutterBottom>
            Compliance
          </Typography>
          <Typography variant="body1" paragraph>
            By entering into a contractual agreement with SWAGRUHA FOODS, you
            agree to the terms of the SWAGRUHA FOODS Privacy Policy outlined
            below.
          </Typography>

          <Typography variant="h2" gutterBottom>
            Collection of Information
          </Typography>
          <Typography variant="body1" paragraph>
            SWAGRUHA FOODS does not collect any information about you or your
            business other than the information that you affirmatively choose to
            submit to us.
          </Typography>

          <Typography variant="h2" gutterBottom>
            Use of Information
          </Typography>
          <Typography variant="body1" paragraph>
            SWAGRUHA FOODS collects this information to make better business
            decisions towards our mutual advantage, support the activities you
            choose to engage in, and provide higher quality solutions and
            services to you and your customers. We will not sell, share, or rent
            this information for commercial purposes to any person or
            organization.
          </Typography>

          <Typography variant="h2" gutterBottom>
            Information Security
          </Typography>
          <Typography variant="body1" paragraph>
            SWAGRUHA FOODS classifies your personal information as Confidential
            Information. Storing it on secure servers that only authorized
            SWAGRUHA FOODS personnel can access protects confidential
            information. The information is encrypted to prevent unauthorized
            parties from accessing this information.
          </Typography>

          <Typography variant="h2" gutterBottom>
            Website Information Management Policy
          </Typography>
          <Typography variant="body1" paragraph>
            While your personnel access our website, we do recognize and collect
            the IP address, browser type, ISP, referring/exit pages, platform
            type, date/time stamp, number of clicks, domain name, and
            country/state.
          </Typography>
          <Typography variant="body1" paragraph>
            We may use your IP address to help diagnose problems with our server
            and to administer the website. We will not use any of your
            information to enhance our website without prior written consent
            from an authorized signatory of your organization.
          </Typography>
          <Typography variant="body1" paragraph>
            Our website might contain links to websites of third parties.
            SWAGRUHA FOODS has no control over and is not responsible for, the
            content, privacy policies, or reliability of such sites. All rights
            and trademarks belong to the original owner of the brand names and
            SWAGRUHA FOODS.
          </Typography>

          <Typography variant="h2" gutterBottom>
            Changes to the Policy
          </Typography>
          <Typography variant="body1" paragraph>
            SWAGRUHA FOODS reserves the right to modify or amend this Privacy
            Policy at its own discretion. The changes will be communicated to
            you in advance via e-mail.
          </Typography>
        </Container>
      </Box>
    </Layout>
  );
};

export default PrivacyPolicy;
