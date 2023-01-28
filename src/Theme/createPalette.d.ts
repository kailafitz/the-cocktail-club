// https://stackoverflow.com/questions/59365396/how-to-use-material-ui-custom-theme-in-react-with-typescript?answertab=modifieddesc#tab-top

import * as createPalette from '@material-ui/core/styles/createPalette';
import { PrimaryExpression } from 'typescript';

declare module '@mui/material/styles/createPalette' {
  interface Palette {
    neutral: {
      main?: string;
      contrastText?: string;
    },
    dark: {
      main?: string;
      contrastText?: string;
    },
  }
  interface PaletteOptions {
    neutral: {
      main?: string;
      contrastText?: string;
    },
    dark: {
      main?: string;
      contrastText?: string;
    };
  }
}

export default function createPalette(palette: PaletteOptions): Palette;