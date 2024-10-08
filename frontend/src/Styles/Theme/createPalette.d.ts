import * as createPalette from "@material-ui/core/styles/createPalette";

declare module "@mui/material/styles" {
    interface Palette {
        // neutral: Palette["primary"];
        dark: Palette["primary"];
    }

    interface PaletteOptions {
        // neutral?: PaletteOptions["primary"];
        dark: PaletteOptions["primary"];
    }
}

declare module "@mui/material/IconButton" {
    interface IconButtonPropsColorOverrides {
        // neutral: true;
        dark: true
    }
}

declare module "@mui/material/Button" {
    interface ButtonPropsColorOverrides {
        // neutral: true;
        dark: true
    }
}

declare module "@mui/material/AppBar" {
    interface AppBarPropsColorOverrides {
        // neutral: true;
        dark: true
    }
}