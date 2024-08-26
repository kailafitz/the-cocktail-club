import { styled } from "@mui/material/styles";
import { Container, IconButton } from "@mui/material";

export const StyledContainer = styled(Container)(
  ({ theme }) => `
  background: transparent;
  display: flex;
  flex-direction: column;
  justify-content: space-between;
`
);

export const StyledIcon = styled(IconButton)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};
  transition: transform .3s ease-in-out;
  padding: 0;

  &:hover {
    color: ${theme.palette.primary.dark};
    transform: translateY(-5px);
  }
`
);
