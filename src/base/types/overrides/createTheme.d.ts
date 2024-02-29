import { SimplePaletteColorOptions, ThemeOptions } from '@mui/material/styles';
import * as Theme from '@mui/material/styles';

// project import
import { CustomShadowProps } from '@base/types/theme';

declare module '@mui/material/styles' {
  interface CustomPalette {
    magenta: SimplePaletteColorOptions;
    purple: SimplePaletteColorOptions;
    orange: SimplePaletteColorOptions;
    yellow: SimplePaletteColorOptions;
    lime: SimplePaletteColorOptions;
    volcano: SimplePaletteColorOptions;
    header: string;
    link: string;
  }
  interface Palette extends CustomPalette {}
  interface PaletteOptions extends CustomPalette {}
  interface Theme {
    customShadows: CustomShadowProps;
    // hanbiro: {
    //   red: PaletteColor;
    //   indigo: PaletteColor;
    //   orange: PaletteColor;
    // };
  }
  // interface ThemeOptions {
  //   hanbiro?: {
  //     red?: PaletteColor;
  //     indigo?: PaletteColor;
  //     orange?: PaletteColor;
  //   };
  // }
}

declare module '@mui/material/Button' {
  interface ButtonPropsColorOverrides {
    magenta: true;
    purple: true;
    orange: true;
    yellow: true;
    lime: true;
    volcano: true;
  }
}

declare module '@mui/material/IconButton' {
  interface IconButtonPropsColorOverrides {
    magenta: true;
    purple: true;
    orange: true;
    yellow: true;
    lime: true;
    volcano: true;
  }
}

declare module '@mui/material/Chip' {
  interface ChipPropsColorOverrides {
    magenta: true;
    purple: true;
    orange: true;
    yellow: true;
    lime: true;
    volcano: true;
  }
}
