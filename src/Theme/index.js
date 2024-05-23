import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        primary: {
            main: "#0077",
        },
        neutral: {
            main: "#E9E9E9",
            contrastText: "#000",
        },
        transparent: {
            main: "#FFFFFF00",
            contrastText: "#000",
        },
    },
    typography: {
        fontFamily: "Work Sans",
        h1: {
            fontFamily: "Merriweather",
        },
        h2: {
            fontFamily: "Merriweather",
        },
        h3: {
            fontFamily: "Merriweather",
        },
        h4: {
            fontFamily: "Merriweather",
        },
        h5: {
            fontFamily: "Merriweather",
        },
        h6: {
            fontFamily: "Merriweather",
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