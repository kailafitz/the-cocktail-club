import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const StyledButton = styled(Button)(
  ({ theme }) => `
    width: 4rem;
    min-width: fit-content;
    padding: ${theme.spacing(1.5, 1)};
    margin: ${theme.spacing(1)};
    color: ${theme.palette.primary.contrastText};

    @media (min-width: ${theme.breakpoints.values.md}px) {
      padding: ${theme.spacing(2)};
      margin: ${theme.spacing(1)};
    }
`
) as typeof Button;
