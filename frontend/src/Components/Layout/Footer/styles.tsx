import { styled } from "@mui/material/styles";
import { Container, IconButton } from "@mui/material";

export const StyledContainer = styled(Container)(
  ({ theme }) => `
  background: transparent;
  display: flex;
  flex-direction: row;
  justify-content: center;
  padding: ${theme.spacing(2)};
`
);

export const StyledIcon = styled(IconButton)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};
  transition: transform .3s ease-in-out;

  &:hover {
    color: ${theme.palette.primary.dark};
    transform: translateY(-5px);
  }
`
);
