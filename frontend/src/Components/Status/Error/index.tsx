import React from "react";
import PropTypes from "prop-types";
import { Typography } from "@mui/material";
import { IError } from "../../../Interfaces";

const Error: React.FC<IError> = (props: IError) => {
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
  message: PropTypes.string.isRequired,
};

export default Error;
