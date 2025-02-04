import { Container } from "@mui/material";
import PropTypes from "prop-types";
import React, { ReactNode } from "react";
import { IViewHeightContainer } from "../../../Interfaces";

const ViewHeightContainer: React.FC<IViewHeightContainer> = (
  props: IViewHeightContainer
) => {
  return (
    <Container
      sx={{
        height: props.vh ? "100vh" : "100%",
        display: "flex",
        flexGrow: 1,
        flexDirection: "column",
        justifyContent: props.center ? "center" : "unset",
        pt: props.pt ? 10 : 0,
        ...props.sx,
      }}
    >
      {props.children}
    </Container>
  );
};

ViewHeightContainer.propTypes = {
  children: PropTypes.node.isRequired as PropTypes.Validator<ReactNode>,
  vh: PropTypes.bool,
  sx: PropTypes.object,
  center: PropTypes.bool,
  pt: PropTypes.bool,
};

export default ViewHeightContainer;
