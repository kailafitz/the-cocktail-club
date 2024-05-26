import React from "react";
import { ViewHeightContainer } from "../../Components/Layout/ViewHeightContainer";
import { Typography } from "@mui/material";

type Props = {};

const ContactUs = (props: Props) => {
  return (
    <ViewHeightContainer pt>
      <Typography
        variant="h2"
        color="primary"
        sx={{
          fontSize: { xs: "4rem", lg: "6rem" },
        }}
      >
        Get in Touch
      </Typography>
    </ViewHeightContainer>
  );
};

export default ContactUs;
