import React from "react";
import { Container } from "@mui/material";

interface ViewHeightContainerProps {
  children?: React.ReactNode | string;
  vh?: boolean;
  sx?: Object;
  center?: boolean;
  pt?: boolean;
}

export const ViewHeightContainer = (props: ViewHeightContainerProps) => {
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
