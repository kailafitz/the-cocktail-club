import { alpha, styled } from "@mui/material/styles";
import { Box, IconButton } from "@mui/material";

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

export const ImageContainer = styled("div")(
  ({ theme }) => `
   width: 80%;
   margin: 0 auto;

   img {
    width: 100%;
    border-radius: 50%;
   }

   @media (min-width: ${theme.breakpoints.values.md}px) {
      width: 500px;
    }
  `
);

export const FlexboxRow = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    flex-grow: 1;
    justify-content: space-around;

    @media (min-width: ${theme.breakpoints.values.md}px) {
      flex-direction: row;
    }
  `
);

export const FlexboxColumn = styled(Box)(
  ({ theme }) => `
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding: ${theme.spacing(2)};

    @media (min-width: ${theme.breakpoints.values.md}px) {
      width: 50vw;
      padding: ${theme.spacing(0)};
    }
  `
);
