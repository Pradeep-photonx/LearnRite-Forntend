import {
  Box,
  Container,
  Typography,
  Stack,
  List,
  ListItem,
  ListItemText,
} from "@mui/material";
import Layout from "../../layouts/Layout";

const TermsAndConditions = () => {
  return (
    <Layout>
      <Box sx={{ py: 8, pb: 6 }}>
        <Container maxWidth="lg">
          <Typography variant="h1" fontSize={"2rem"}>
            Terms & Conditions
          </Typography>

          {/* SERVICES OVERVIEW */}
          <Typography variant="h2" gutterBottom sx={{ py: 2 }}>
            Services Overview
          </Typography>
          <Typography variant="body1" paragraph>
            As part of the registration process on the Site, SWAGRUHA FOODS may
            collect the following personally identifiable information about you:
            Name including first and last name, alternate email address, mobile
            phone number, and contact details, Postal code, Demographic profile
            (like your age, gender, occupation, education, address, etc.) and
            information about the pages on the site you visit/access, the links
            you click on the site, the number of times you access the page and
            any such browsing information.
          </Typography>

          {/* ELIGIBILITY */}
          <Typography variant="h6" gutterBottom>
            Eligibility
          </Typography>
          <Typography variant="body1" paragraph>
            Services of the Site would be available to only select geographies
            in India. Persons who are “incompetent to contract” within the
            meaning of the Indian Contract Act, 1872 including un-discharged
            insolvents, etc. are not eligible to use the Site. If you are a
            minor i.e. under the age of 18 years but at least 13 years of age
            you may use the Site only under the supervision of a parent or legal
            guardian who agrees to be bound by these Terms of Use. If your age
            is below 18 years your parents or legal guardians can transact on
            behalf of you if they are registered users. You are prohibited from
            purchasing any material, which is for adult consumption, and the
            sale of which to minors is prohibited.
          </Typography>

          {/* LICENSE & SITE ACCESS */}
          <Typography variant="h2" gutterBottom>
            License & Site Access
          </Typography>
          <Typography variant="body1" paragraph>
            SWAGRUHA FOODS grants you a limited sub-license to access and make
            personal use of this site and not to download (other than page
            caching) or modify it, or any portion of it, except with express
            written consent of SWAGRUHA FOODS. This license does not include any
            resale or commercial use of this site or its contents; any
            collection and use of any product listings, descriptions, or prices;
            any derivative use of this site or its contents; any downloading or
            copying of account information for the benefit of another merchant;
            or any use of data mining, robots, or similar data gathering and
            extraction tools. This site or any portion of this site may not be
            reproduced, duplicated, copied, sold, resold, visited, or otherwise
            exploited for any commercial purpose without express written consent
            of SWAGRUHA FOODS. You may not frame or utilize framing techniques
            to enclose any trademark, logo, or other proprietary information
            (including images, text, page layout, or form) of the Site or of
            SWAGRUHA FOODS and its affiliates without express written consent.
            You may not use any Meta tags or any other “hidden text” utilizing
            the Site’s or SWAGRUHA FOODS. name or trademarks without the express
            written consent of SWAGRUHA FOODS. Any unauthorized use terminates
            the permission or license granted by SWAGRUHA FOODS.
          </Typography>

          <Typography variant="h2" gutterBottom>
            Account & Registration Obligations
          </Typography>
          <Typography variant="body1" paragraph>
            All customers have to register and login to place orders on the
            Site. You have to keep your account and registration details current
            and correct for communications related to your purchases from the
            site.
          </Typography>

          {/* PRICING */}
          <Typography variant="h2" gutterBottom>
            Pricing
          </Typography>
          <Typography variant="body1" paragraph>
            All the products listed on the Site will be sold at MRP unless
            otherwise specified. The prices mentioned at the time of ordering
            will be the prices charged on the date of the delivery. Although
            prices of most of the products do not fluctuate on a daily basis,
            some of the commodities and fresh food prices do change on a daily
            basis. In case the prices are higher or lower on the date of
            delivery, additional charges will be collected or refunded as the
            case may be at the time of the delivery of the order.
          </Typography>

          {/* YOU AGREE AND CONFIRM */}
          <Typography variant="h2" gutterBottom>
            You Agree and Confirm
          </Typography>
          <Stack
            component="ul"
            sx={{ listStyleType: "disc", pl: 4 }}
            spacing={1}
          >
            <Typography component="li" variant="body1">
              That in the event that a non-delivery occurs on account of a
              mistake by you (i.e., wrong name or address or any other wrong
              information) any extra cost incurred by SWAGRUHA FOODS for
              redelivery shall be claimed from you.
            </Typography>
            <Typography component="li" variant="body1">
              That you will use the services provided by the Site, its
              affiliates, consultants, and contracted companies, for lawful
              purposes only and comply with all applicable laws and regulations
              while using and transacting on the Site.
            </Typography>
            <Typography component="li" variant="body1">
              You will provide authentic and true information in all instances
              where such information is requested of you. SWAGRUHA FOODS
              reserves the right to confirm and validate the information and
              other details provided by you at any point in time. If upon
              confirmation your details are found not to be true (wholly or
              partly), SWAGRUHA FOODS has the right in its sole discretion to
              reject the registration and debar you from using the Services
              and/or other affiliated websites without prior intimation
              whatsoever.
            </Typography>
            <Typography component="li" variant="body1">
              That you are accessing the services available on this Site and
              transacting at your sole risk and are using your best and prudent
              judgment before entering into any transaction through this Site.
            </Typography>
            <Typography component="li" variant="body1">
              That the address at which delivery of the product ordered by you
              is to be made will be correct and proper in all respects.
            </Typography>
            <Typography component="li" variant="body1">
              That before placing an order you will check the product
              description carefully. By placing an order for a product you agree
              to be bound by the conditions of sale included in the item's
              description.
            </Typography>
          </Stack>

          <Typography variant="h2" gutterBottom>
            You May Not Use the Site for Any of the Following Purposes:
          </Typography>
          <List sx={{ listStyleType: "disc", pl: 4 }}>
            <ListItem disablePadding>
              <ListItemText primary="Disseminating any unlawful, harassing, libelous, abusive, threatening, harmful, vulgar, obscene, or otherwise objectionable material." />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Transmitting material that encourages conduct that constitutes a criminal offense or results in civil liability or otherwise breaches any relevant laws, regulations, or code of practice." />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Gaining unauthorized access to other computer systems." />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Interfering with any other person's use or enjoyment of the Site." />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Breaching any applicable laws." />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Interfering or disrupting networks or websites connected to the Site." />
            </ListItem>
            <ListItem disablePadding>
              <ListItemText primary="Making, transmitting, or storing electronic copies of materials protected by copyright without the permission of the owner." />
            </ListItem>
          </List>

          <Typography variant="h2" gutterBottom>
            Modification of Terms & Conditions of Service
          </Typography>
          <Typography variant="body1" paragraph>
            SWAGRUHA FOODS may at any time modify the Terms & Conditions of Use
            of the Website without any prior notification to you. You can access
            the latest version of these Terms & Conditions at any given time on
            the Site. You should regularly review the Terms & Conditions on the
            Site. In the event the modified Terms & Conditions are not
            acceptable to you, you should discontinue using the Service.
            However, if you continue to use the Service, you shall be deemed to
            have agreed to accept and abide by the modified Terms & Conditions
            of Use of this Site.
          </Typography>

          <Typography variant="h2" gutterBottom>
            Governing Law and Jurisdiction
          </Typography>
          <Typography variant="body1" paragraph>
            This User Agreement shall be construed in accordance with the
            applicable laws of India. The Courts at Vijayawada shall have
            exclusive jurisdiction in any proceedings arising out of this
            agreement. Any dispute or difference either in interpretation or
            otherwise, of any terms of this User Agreement between the parties
            hereto, the same shall be referred to an independent arbitrator who
            will be appointed by SWAGRUHA FOODS and his decision shall be final
            and binding on the parties hereto. The above arbitration shall be in
            accordance with the Arbitration and Conciliation Act, 1996 as
            amended from time to time. The arbitration shall be held in
            Vijayawada.
          </Typography>
        </Container>
      </Box>
    </Layout>
  );
};

export default TermsAndConditions;
