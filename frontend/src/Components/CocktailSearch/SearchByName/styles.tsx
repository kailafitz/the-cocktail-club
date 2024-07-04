import { styled, alpha } from "@mui/material/styles";
import { Button } from "@mui/material";
import InputBase from "@mui/material/InputBase";

export const Search = styled("div")(({ theme }) => ({
  position: "relative",
  backgroundColor: alpha(theme.palette.common.white, 1),
  marginLeft: 0,
  margin: theme.spacing(3, "auto"),
  width: "80%",

  [theme.breakpoints.up("md")]: {
    margin: "2rem auto",
    width: "60%",
  },
}));

export const StyledInputBase = styled(InputBase)(({ theme }) => ({
  color: "inherit",
  "& .MuiInputBase-input": {
    padding: theme.spacing(1, 1, 1, 0),
    transition: theme.transitions.create("width"),
    width: "100%",
    [theme.breakpoints.up("sm")]: {
      width: "20ch",
      "&:focus": {
        width: "20ch",
      },
    },
  },
}));

export const StyledButton = styled(Button)(() => ({
  padding: 0,
  width: "fit-content",
}));
