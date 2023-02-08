import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const StyledButton = styled(Button)(
  ({ theme }) => `
    padding: 1rem;
    width: fit-content;
    margin: .5rem;
    color: ${theme.palette.primary.contrastText};
`
) as typeof Button;
