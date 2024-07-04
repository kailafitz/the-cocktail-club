import Button from "@mui/material/Button";
import { styled } from "@mui/material/styles";

// To pass prop such as "active" that can be added to component
// export const StyledIconButton = styled(Button, {
//   shouldForwardProp: (prop) => prop !== "active",
// })<{ active?: boolean }>(({ theme, active }) => ({
//      // styles
// }));

export const StyledIconButton = styled(Button)(({ theme }) => ({
  // width: "25%",
  color: theme.palette.common.black,
  textAlign: "center",
  transition: "all .3s linear",
  borderRadius: 0,
  position: "relative",
  overflow: "hidden",
  zIndex: 1,
  border: `${theme.palette.primary.main} solid 2px`,

  "&:after": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "100%",
    height: "100%",
    backgroundColor: theme.palette.primary.main,
    zIndex: -2,
  },

  "&:before": {
    content: '""',
    position: "absolute",
    bottom: 0,
    left: 0,
    width: "0%",
    height: "100%",
    backgroundColor: theme.palette.common.black,
    transition: "all .3s",
    zIndex: -1,
  },

  "&:hover": {
    // borderRadius: 0,
    border: `${theme.palette.primary.main} solid 2px`,
    color: theme.palette.primary.main,
    "&:before": {
      width: "100%",
    },
  },
})) as typeof Button;
