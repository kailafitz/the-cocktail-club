import { alpha, styled } from "@mui/material/styles";
import { IconButton } from "@mui/material";

export const StyledIconButton = styled(IconButton)(
  ({ theme }) => `
  color: ${theme.palette.common.white};
  transition: transform .8s ease;
  
  &:hover {
    transform: translateX(10px);
    color: ${alpha(theme.palette.common.white, 0.75)};
  }
  `
) as typeof IconButton;
