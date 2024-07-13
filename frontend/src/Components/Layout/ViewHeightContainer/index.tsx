import React from "react";
import { Container } from "@mui/material";
import { IViewHeightContainer } from "../../../Interfaces";
import PropTypes from "prop-types";

const ViewHeightContainer = (props: IViewHeightContainer) => {
  return (
    <Container
      sx={{
        height: props.vh ? "100vh" : "100%",
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: props.center ? "center" : "unset",
        pt: props.pt ? 15 : 0,
        ...props.sx,
      }}
    >
      {props.children}
    </Container>
  );
};

ViewHeightContainer.propTypes = {
  children: PropTypes.node.isRequired,
  vh: PropTypes.bool,
  sx: PropTypes.object,
  center: PropTypes.bool,
  pt: PropTypes.bool,
};

export default ViewHeightContainer;
