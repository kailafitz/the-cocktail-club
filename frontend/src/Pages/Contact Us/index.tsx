import React from "react";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import Typography from "@mui/material/Typography";
import Stack from "@mui/material/Stack";
import EmailIcon from "@mui/icons-material/Email";
import MyLocationIcon from "@mui/icons-material/MyLocation";
import Link from "@mui/material/Link";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";

const ContactUs = () => {
  return (
    <ViewHeightContainer pt>
      <Typography variant="pageHeading">Get in Touch</Typography>
      <ViewHeightContainer>
        <Stack
          direction={{ xs: "column", md: "row" }}
          spacing={7}
          justifyContent="space-between"
        >
          <Stack direction="column">
            <Stack direction="row" mb={3}>
              <EmailIcon color="primary" />
              <Link href="/" variant="body1" ml={2}>
                support@thecocktailclubco.com
              </Link>
            </Stack>
            <Stack direction="row">
              <MyLocationIcon color="primary" />
              <Link href="/" variant="body1" ml={2}>
                123 Spirit St, Glass Avenue, Long Island, 12345 New York
              </Link>
            </Stack>
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3724.0138008856534!2d105.84563647523098!3d21.03213378766275!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3135ab000fac8763%3A0x35043f84a0316a27!2sRandom%20Vietnamese%20Cat%2C%2014%20Hang%20Manh%20Street!5e0!3m2!1sen!2s!4v1720889011321!5m2!1sen!2s"
              width="400"
              height="300"
              className="map"
              // style="border:0;"
              // allowfullscreen=""
              loading="lazy"
              // referrerpolicy="no-referrer-when-downgrade"
            ></iframe>
          </Stack>
          <Stack sx={{ width: { xs: "100%", md: "40%" } }} spacing={3}>
            <Typography variant="body1">
              Send us a message and our team will be back to you as soon as
              possible!
            </Typography>
            <TextField label="Name" />
            <TextField label="Email" />
            <TextField label="Message" multiline rows={3} />
            <Button variant="primaryDark">Submit</Button>
          </Stack>
        </Stack>
      </ViewHeightContainer>
    </ViewHeightContainer>
  );
};

export default ContactUs;
