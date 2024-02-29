// material-ui
import { SimplePaletteColorOptions, PaletteColorOptions } from '@mui/material/styles';

// ==============================|| DEFAULT THEME - TYPES  ||============================== //

export type PaletteThemeProps = {
  primary: SimplePaletteColorOptions;
  secondary: SimplePaletteColorOptions;
  error: SimplePaletteColorOptions;
  warning: SimplePaletteColorOptions;
  info: SimplePaletteColorOptions;
  success: SimplePaletteColorOptions;
  grey: PaletteColorOptions;
  // add new by Mr.Kim
  magenta: SimplePaletteColorOptions;
  purple: SimplePaletteColorOptions;
  orange: SimplePaletteColorOptions;
  yellow: SimplePaletteColorOptions;
  lime: SimplePaletteColorOptions;
  volcano: SimplePaletteColorOptions;
  header: string;
  link: string;
};

export type CustomShadowProps = {
  button: string;
  text: string;
  z1: string;
  primary: string;
  primaryButton: string;
  secondary: string;
  secondaryButton: string;
  error: string;
  errorButton: string;
  warning: string;
  warningButton: string;
  info: string;
  infoButton: string;
  success: string;
  successButton: string;
  grey: string;
  greyButton: string;
};
