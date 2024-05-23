import React from "react";
import Button from "@mui/material/Button";
import styled from "@emotion/styled";

const StyledButton = styled(Button)(() => ({
    padding: "1rem",
    width: "fit-content",
    margin: ".5rem"
}));

export default function LetterButton(props) {
    return (
        <StyledButton variant="contained" onClick={props.onClick}>{props.letter}</StyledButton>
    )
}