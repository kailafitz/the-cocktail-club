import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const theme = createTheme({
  palette: {
    primary: {
      // light: "#0077",
      // main: "#4b4b9f",
      // dark: "#007",
      main: "#ebd69c",
      contrastText: "#151514",
    },
    neutral: {
      main: "#E9E9E9",
    },
    dark: {
      main: "#151514",
      contrastText: "#ebd69c",
    },
  },
  typography: {
    fontFamily: "Work Sans",
    h1: {
      fontFamily: "Work Sans",
      fontSize: "10rem",
    },
    h2: {
      fontFamily: "Work Sans",
      fontSize: "6rem",
    },
    h3: {
      fontFamily: "Imperial Script",
    },
    h4: {
      fontFamily: "Work Sans",
    },
    h5: {
      fontFamily: "Work Sans",
    },
    h6: {
      fontFamily: "Work Sans",
    },
    body1: {
      fontFamily: "Work Sans",
    },
    body2: {
      fontFamily: "Work Sans",
    },
    subtitle1: {
      fontFamily: "Work Sans",
    },
    subtitle2: {
      fontFamily: "Work Sans",
    },
    button: {
      fontFamily: "Work Sans",
    },
    caption: {
      fontFamily: "Work Sans",
    },
    overline: {
      fontFamily: "Work Sans",
    },
  },
});

export const responsiveTheme = responsiveFontSizes(theme);
