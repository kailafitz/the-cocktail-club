import { styled } from "@mui/material/styles";
import Button from "@mui/material/Button";

export const StyledContainer = styled("div")(
  ({ theme }) => `
    display: flex;
    flex-grow: 1;
    flex-direction: row;
    justify-content: flex-start;
    margin: ${theme.spacing(0, "auto")};
  `
);

export const StyledDarkBackground = styled("div")(
  ({ theme }) => `
    background: linear-gradient(to top, #ffffff00, ${theme.palette.common.black} 50%);
    position: absolute;
    z-index: -1;
    top: 0;
    left: 0;
    width: 100vw;
    height: 100vh;

    @media (min-width: ${theme.breakpoints.values.md}px) {
      background: linear-gradient(to left, #ffffff00, ${theme.palette.common.black} 20%);
      top: 0;
      width: 60vw;
      height: 100vh;
    }
  `
);

export const StyledCocktailBackground = styled("div")(
  ({ theme }) => `
    position: absolute;
    z-index: -2;
    bottom: 0;
    right: 0;
    width: 100vw;
    filter: blur(4px);

    @media (min-width: ${theme.breakpoints.values.md}px) {
      top: 0;
      width: 60vw;
      height: 100vh;
    }
  `
);

export const StyledCocktailImg = styled("img")(
  ({ theme }) => `
    // background-repeat: no-repeat;
    // background-size: contain;
    // background-blend-mode: multiply;
    filter: blur(4px);
    width: 100%;

    @media (min-width: ${theme.breakpoints.values.md}px) { 
      height: 100%;
    }
  `
);

export const GoldDivider = styled("img")(
  ({ theme }) => `
    width: 65%;
    margin: ${theme.spacing(2, "auto")};
  `
);

export const ActionSearchButton = styled(Button)(
  ({ theme }) => `
    width: 100%;
    textTransform: none;
    margin: ${theme.spacing(2, "auto")};

    @media (min-width: ${theme.breakpoints.values.md}px) {
      width: 50%;
    }
  `
);

export const FlexboxRow = styled("div")(
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

export const FlexboxColumn = styled("div")(
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
