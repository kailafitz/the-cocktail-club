import React from "react";
import ViewHeightContainer from "../../Components/Layout/ViewHeightContainer";
import { Typography } from "@mui/material";

const ContactUs = () => {
  return (
    <ViewHeightContainer pt>
      <Typography
        variant="pageHeading"
        sx={{
          fontSize: { lg: "6rem" },
        }}
      >
        Get in Touch
      </Typography>
    </ViewHeightContainer>
  );
};

export default ContactUs;
