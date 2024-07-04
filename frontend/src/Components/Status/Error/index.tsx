import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { ErrorInterface } from "../../../Interfaces";

const Error = (props: ErrorInterface) => {
  return (
    <>
      <Typography variant="h3" align="center">
        Error!
      </Typography>
      <Typography variant="body2" align="center">
        {props.message}
      </Typography>
    </>
  );
};

Error.propTypes = {
  message: PropTypes.string,
};

export default Error;
