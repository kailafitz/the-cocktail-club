import { styled } from "@mui/material/styles";
import Box from "@mui/material/Box";
import Typography from "@mui/material/Typography";

export const StyledDetailsBox = styled(Box)(
  ({ theme }) => `
  background: ${theme.palette.primary.main};
  padding: ${theme.spacing(3)};
`
);

export const StyledTypography = styled(Typography)(
  () => `
  font-size: 7rem;
`
);
