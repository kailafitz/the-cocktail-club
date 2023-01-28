import React from "react";
import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

const StyledButton = styled(Button)(
  ({ theme }) => `
    padding: 1rem;
    width: fit-content;
    margin: .5rem;
    color: ${theme.palette.primary.contrastText};
`
) as typeof Button;

interface LetterButtonProps {
  onClick: () => {};
  letter: string;
}

export default function LetterButton(props: LetterButtonProps) {
  return (
    <StyledButton variant="contained" onClick={props.onClick}>
      {props.letter}
    </StyledButton>
  );
}
