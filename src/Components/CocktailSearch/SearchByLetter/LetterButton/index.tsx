import React from "react";
import { StyledButton } from "./styles";

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
