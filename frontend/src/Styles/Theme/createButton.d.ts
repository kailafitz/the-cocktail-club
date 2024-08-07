import { ThemeOptions } from '@mui/material/styles';

declare module "@mui/material/Button" {
    interface ButtonPropsVariantOverrides {
        primaryLight: true;
        primaryDark: true;
        minimal: true;
    }
}