import React from "react";
import { Container } from "@mui/material";

interface ViewHeightContainerProps {
  children?: React.ReactNode | string;
  vh?: boolean;
  sx?: Object;
}

export const ViewHeightContainer = (props: ViewHeightContainerProps) => {
  return (
    <Container
      sx={{
        height: props.vh ? "100vh" : "100%",
        display: "flex",
        flexDirection: "column",
        justifyContent: "center",
      }}
    >
      {props.children}
    </Container>
  );
};
