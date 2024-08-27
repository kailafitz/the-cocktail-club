import { ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface TypographyVariants {
        display: React.CSSProperties;
        pageHeading: React.CSSProperties;
        copyright: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        display?: React.CSSProperties;
        pageHeading?: React.CSSProperties;
        copyright?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        display: true;
        pageHeading: true;
        copyright: true;
    }
}