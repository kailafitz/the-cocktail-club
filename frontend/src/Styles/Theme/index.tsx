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

const defaultTheme = createTheme();

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
      fontFamily: "'Cinzel Decorative', serif",
    },
    h2: {
      fontFamily: "Work Sans",
      fontSize: "1.5rem",
      fontWeight: 300,
    },
    h3: {
      fontFamily: "Work Sans",
      fontWeight: 300,
    },
    h4: {
      fontFamily: "Work Sans",
      fontWeight: 300,
    },
    h5: {
      fontFamily: "Work Sans",
      marginBottom: 4,
    },
    h6: {
      fontFamily: "Work Sans",
    },
    body1: {
      fontFamily: "Work Sans",
      fontWeight: 300,
    },
    body2: {
      fontFamily: "Work Sans, serif",
    },
    subtitle1: {
      fontFamily: "Work Sans",
    },
    subtitle2: {
      fontFamily: "Work Sans",
    },
    display: {
      fontFamily: "'Cinzel Decorative', serif",
      fontSize: "2rem",
      fontWeight: 400,
      [defaultTheme.breakpoints.up("sm")]: {
        fontSize: "4rem",
      },
      [defaultTheme.breakpoints.up("lg")]: {
        fontSize: "6rem",
      },
    },
    pageHeading: {
      fontFamily: "Work Sans",
      marginBottom: "2.5rem",
      fontWeight: 300,
      textAlign: "center",
    },
    copyright: {
      fontFamily: "Work Sans",
      fontWeight: 300,
      fontSize: "13px",
      opacity: 0.6,
      textAlign: "center",
    },
  },
  components: {
    MuiAlert: {
      styleOverrides: {
        message: {
          fontFamily: "'Work Sans'",
        },
      },
    },
    MuiBackdrop: {
      styleOverrides: {
        root: {
          backgroundColor: "#ebd69cb3",
          // backgroundColor: "rgba(0, 0, 0, 0.80)",
        },
      },
    },
    MuiButton: {
      variants: [
        {
          props: { variant: "primaryDark" },
          style: {
            // width: "fit-content",
            color: common.dark,
            textAlign: "center",
            transition: "all .3s linear",
            borderRadius: 0,
            position: "relative",
            overflow: "hidden",
            zIndex: 1,
            border: `#EBD69C solid 2px`,
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: "#EBD69C",
              zIndex: -2,
            },

            "&:before": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "0%",
              height: "100%",
              backgroundColor: common.dark,
              transition: "all .3s",
              zIndex: -1,
            },

            "&:hover": {
              border: `#EBD69C solid 2px`,
              color: "#EBD69C",
              "&:before": {
                width: "100%",
              },
            },
          },
        },
        {
          props: { variant: "primaryLight" },
          style: {
            // width: "fit-content",
            color: "#EBD69C",
            textAlign: "center",
            transition: "all .3s linear",
            borderRadius: 0,
            position: "relative",
            overflow: "hidden",
            zIndex: 1,
            border: `#EBD69C solid 2px`,
            "&:after": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "100%",
              height: "100%",
              backgroundColor: common.dark,
              zIndex: -2,
            },

            "&:before": {
              content: '""',
              position: "absolute",
              bottom: 0,
              left: 0,
              width: "0%",
              height: "100%",
              backgroundColor: "#EBD69C",
              transition: "all .3s",
              zIndex: -1,
            },

            "&:hover": {
              border: `${common.dark} solid 2px`,
              color: common.dark,
              "&:before": {
                width: "100%",
              },
            },
          },
        },
        {
          props: { variant: "minimal" },
          style: {
            textTransform: "inherit",
            color: "#EBD69C",
            fontFamily: "'Work Sans'",
            fontWeight: 300,
            fontSize: "2rem",
            padding: 0,
            "span svg": {
              fontSize: "2rem !important",
              marginLeft: "5px !important",
            },
          },
        },
      ],
      styleOverrides: {
        root: {
          minWidth: "unset",
        },
      },
    },
    MuiButtonBase: {
      defaultProps: {
        LinkComponent: LinkBehavior,
        disableRipple: true,
        disableTouchRipple: true,
      },
      styleOverrides: {
        root: {
          fontFamily: "Work Sans",
          textTransform: "capitalize",
          "&:hover": {
            cursor: "pointer",
          },
        },
      },
    },
    MuiContainer: {
      styleOverrides: {
        root: {
          [defaultTheme.breakpoints.up("xs")]: {
            maxWidth: "90%",
          },
          [defaultTheme.breakpoints.up("lg")]: {
            maxWidth: "1300px",
          },
        },
      },
    },
    MuiDialog: {
      styleOverrides: {
        paper: {
          maxWidth: "unset",
          width: "90%",
          [defaultTheme.breakpoints.up("lg")]: {
            width: "50%",
          },
        },
      },
    },
    MuiFormLabel: {
      styleOverrides: {
        root: {
          color: "#EBD69C",
        },
      },
    },
    MuiInput: {
      styleOverrides: {
        root: {
          "&::before": {
            borderBottom: "none",
          },
          "&:hover:not(.Mui-disabled, .Mui-error):before": {
            borderBottom: "none",
          },
        },
      },
    },
    MuiInputBase: {
      styleOverrides: {
        root: {
          color: "#EBD69C",
          "&:hover .MuiOutlinedInput-notchedOutline": {
            borderColor: "#EBD69C !important",
          },
        },
      },
    },
    MuiLink: {
      defaultProps: {
        component: LinkBehavior,
        underline: "none",
      } as LinkProps,
      styleOverrides: {
        root: {
          fontFamily: "Work Sans",
          fontWeight: 300,
          opacity: 1,
          transition: "opacity .5s ease",
          "&:hover": {
            opacity: 0.6,
            transition: "opacity .5s ease",
          },
        },
      },
    },
    MuiListItemText: {
      styleOverrides: {
        root: {
          fontFamily: "'Work Sans'",
        },
      },
    },
    MuiMenuItem: {
      styleOverrides: {
        root: {
          color: "#EBD69C",
          "&.Mui-selected": {
            "&:hover": {
              backgroundColor: "#EBD69C",
              color: common.dark,
            },
            backgroundColor: "#EBD69C !important",
            color: common.dark,
          },
          "&:hover": {
            backgroundColor: "#EBD69C",
            color: common.dark,
          },
        },
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: {
          borderWidth: "0.5px",
          borderRadius: 0,
          borderColor: "#EBD69C",
        },
      },
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          backgroundColor: common.dark,
        },
      },
    },
    MuiSvgIcon: {
      styleOverrides: {
        root: {
          "&.MuiSelect-icon": {
            color: "#EBD69C",
          },
        },
      },
    },
    MuiTable: {
      styleOverrides: {
        root: {
          minWidth: "unset",
        },
      },
    },
    MuiTableCell: {
      styleOverrides: {
        root: {
          paddingLeft: 0,
          color: "#EBD69C",
          borderBottom: "1px solid #EBD69C",
          fontFamily: "'Work Sans'",
        },
      },
    },
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          pageHeading: "h2",
          display: "h1",
        },
      },
      styleOverrides: {
        root: {
          color: "#EBD69C",
        },
      },
      variants: [
        {
          props: { variant: "pageHeading" },
          style: {
            fontSize: "4rem",
            // [defaultTheme.breakpoints.up("lg")]: {
            //   fontSize: "4rem",
            // },
          },
        },
      ],
    },
  },
});

export const responsiveTheme = responsiveFontSizes(theme);
