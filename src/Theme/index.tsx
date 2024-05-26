import React from "react";
import { createTheme, responsiveFontSizes } from "@mui/material/styles";
import {
  Link as RouterLink,
  LinkProps as RouterLinkProps,
} from "react-router-dom";
import { LinkProps } from "@mui/material/Link";

const LinkBehavior = React.forwardRef<
  HTMLAnchorElement,
  Omit<RouterLinkProps, "to"> & { href: RouterLinkProps["to"] }
>((props, ref) => {
  const { href, ...other } = props;
  // Map href (Material UI) -> to (react-router)
  return <RouterLink ref={ref} to={href} {...other} />;
});

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
      fontFamily: "'Cinzel Decorative', sans-serif",
      fontSize: "2rem",
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
        LinkComponent: LinkBehavior,
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          fontFamily: "Work Sans",
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
      } as LinkProps,
      styleOverrides: {
        root: {
          fontFamily: "Work Sans",
        },
      },
    },
  },
});

export const responsiveTheme = responsiveFontSizes(theme);
