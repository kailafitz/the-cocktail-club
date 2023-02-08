import React from "react";
import { Typography } from "@mui/material";

interface ErrorProps {
  message: string;
  color: string;
}

export const Error = (props: ErrorProps) => {
  return (
    <>
      <Typography color={props.color}>Error!</Typography>
      <Typography color={props.color}>{props.message}</Typography>
    </>
  );
};
