import React from "react";
import Button from "@mui/material/Button";
import { Link } from "react-router-dom";
import { LinkButtonInterface } from "../../Interfaces";
import PropTypes from "prop-types";
import { StyledIconButton } from "./styles";

const LinkButton = (props: LinkButtonInterface) => {
  return (
    <StyledIconButton
      disableElevation
      variant="contained"
      component={Link}
      to={props?.path}
      aria-label={`Link to ${props.label} page`}
      sx={props.styles}
      onClick={props.onClick}
      {...props}
    >
      {props.label}
    </StyledIconButton>
  );
};

LinkButton.propTypes = {
  label: PropTypes.string.isRequired,
  path: PropTypes.string,
  styles: PropTypes.object,
  startIcon: PropTypes.node,
  endIcon: PropTypes.node,
  onClick: PropTypes.func,
};

export default LinkButton;
