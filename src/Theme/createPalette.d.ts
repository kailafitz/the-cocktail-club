// https://mui.com/material-ui/customization/palette/#adding-new-colors

import * as createPalette from '@material-ui/core/styles/createPalette';

// declare module '@mui/material/styles/createPalette' {
//   interface Palette {
//     neutral: {
//       main?: string;
//       contrastText?: string;
//     },
//     dark: {
//       main?: string;
//       contrastText?: string;
//     },
//   }
//   interface PaletteOptions {
//     neutral: {
//       main?: string;
//       contrastText?: string;
//     },
//     dark: {
//       main?: string;
//       contrastText?: string;
//     };
//   }
// }

// declare module '@mui/material' {
//   interface ButtonPropsColorOverrides {
//     dark,
//     neutral,
//   }
// }

// declare module "@mui/material/styles" {
//   interface Palette {
//     neutral: Palette["primary"];
//     dark: Palette["primary"]
//   }

//   interface PaletteOptions {
//     neutral: PaletteOptions["primary"];
//     dark: PaletteOptions["primary"];
//   }

// }

declare module '@mui/material/styles' {
  interface Palette {
    neutral: Palette['primary'];
    dark: Palette["primary"];
  }

  interface PaletteOptions {
    neutral?: PaletteOptions['primary'];
    dark: PaletteOptions["primary"];
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    neutral: true;
    dark: true
  }
}

// export default function createPalette(palette: PaletteOptions): Palette;