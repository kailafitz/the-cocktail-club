import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";

export const StyledCocktailBackground = styled(`div`)(
  () => `
  position: absolute;
  background-repeat: no-repeat;
  background-size: cover;
  z-index: -1;
  top: 0;
  right: 0;
  width: 50vw;
  height: 100vh;
  filter: blur(4px);
`
);

export const StyledHeading = styled(Typography)(
  () => `
  color: white;
`
);

export const StyledHeading2 = styled(Typography)(
  ({ theme }) => `
  color: ${theme.palette.primary.main};
  text-align: center;
`
);

export const GoldDivider = styled("img")(
  () => `
    width: 65%;
    margin: 1rem auto;
`
);

export const FlexboxRow = styled("div")(
  () => `
  display: flex;
  flex-direction: row;
  overflow: hidden;
  `
);

export const FlexboxColumn = styled("div")(
  () => `
  display: flex;
  flex-direction: column;
  justify-content: center;
  width: 50vw;
  `
);
