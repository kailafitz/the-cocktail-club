import { createTheme, responsiveFontSizes } from "@mui/material/styles";

const common = {
  dark: "#151514",
};

const theme = createTheme({
  palette: {
    primary: {
      main: "#EBD69C",
      contrastText: common.dark,
    },
    common: {
      black: common.dark,
    },
    dark: {
      main: common.dark,
    },
  },
  typography: {
    fontFamily: "Work Sans",
    h1: {
      fontFamily: "'Cinzel Decorative', cursive",
    },
    h2: {
      fontFamily: "Work Sans",
    },
    h3: {
      fontFamily: "Work Sans",
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
    caption: {
      fontFamily: "Work Sans",
    },
    overline: {
      fontFamily: "Work Sans",
    },
  },
  components: {
    MuiButtonBase: {
      defaultProps: {
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          fontFamily: "Work Sans",
        },
      },
    },
  },
});

export const responsiveTheme = responsiveFontSizes(theme);
