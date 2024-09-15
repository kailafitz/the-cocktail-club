import Box from "@mui/material/Box";
import { styled } from "@mui/material/styles";

export const StyledDivider = styled("hr")(
  ({ theme }) => `
  background-color: ${theme.palette.primary.main};
  height: 2px;
  border: 3px ${theme.palette.primary.main};
  width: 80%;
  margin: ${theme.spacing(10)} auto;

  @media (min-width: ${theme.breakpoints.values.md}px) {
    width: 30%;
    margin: ${theme.spacing(15)} auto;
  }
`
);
