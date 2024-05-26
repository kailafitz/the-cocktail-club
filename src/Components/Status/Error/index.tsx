import React from "react";
import { Typography } from "@mui/material";

interface ErrorProps {
  message: string;
  color: string;
}

export const Error = (props: ErrorProps) => {
  return (
    <>
      <Typography color={props.color} variant="h3" align="center">
        Error!
      </Typography>
      <Typography color={props.color} variant="body2" align="center">
        {props.message}
      </Typography>
    </>
  );
};
