import { styled } from "@mui/material/styles";

export const StyledDivider = styled("hr")(
  ({ theme }) => `
  color: ${theme.palette.primary.main};
  width: 80%;
  margin: ${theme.spacing(10)} auto;

  @media (min-width: ${theme.breakpoints.values.md}px) {
    width: 30%;
    margin: ${theme.spacing(15)} auto;
  }
`
);

export const StyledImage = styled("img")(
  ({ theme }) => `
  margin: 0 auto;
  margin-bottom: ${theme.spacing(10)};
  border-radius: 50%;
  display: block;
  width: 80%;

  @media (min-width: ${theme.breakpoints.values.md}px) {
    margin-bottom: ${theme.spacing(15)};
    width: 30%;
  }
`
);
