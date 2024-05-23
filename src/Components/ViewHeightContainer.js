import React from "react";
import { Container } from "@mui/material";

export const ViewHeightContainer = ({ children, vh }) => {
    return (
        <Container sx={{ height: vh ? "100vh" : "100%", display: "flex", flexDirection: "column", justifyContent: "center" }}>
            {children}
        </Container>
    )
}
