import { ThemeOptions } from '@mui/material/styles';

declare module "@mui/material/Button" {
    interface ButtonPropsVariantOverrides {
        primary: true;
    }
}