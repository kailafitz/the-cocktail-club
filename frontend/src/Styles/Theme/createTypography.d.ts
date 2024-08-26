import { ThemeOptions } from '@mui/material/styles';

declare module '@mui/material/styles' {
    interface TypographyVariants {
        pageHeading: React.CSSProperties;
        copyright: React.CSSProperties;
    }

    // allow configuration using `createTheme`
    interface TypographyVariantsOptions {
        pageHeading?: React.CSSProperties;
        copyright?: React.CSSProperties;
    }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
    interface TypographyPropsVariantOverrides {
        pageHeading: true;
        copyright: true;
    }
}