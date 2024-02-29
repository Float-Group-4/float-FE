import { Theme } from '@mui/material/styles';

import { ColorProps } from '@base/types/extended';

const getColors = (theme: Theme, color?: ColorProps) => {
  switch (color!) {
    case 'secondary':
      return theme.palette.secondary;
    case 'error':
      return theme.palette.error;
    case 'warning':
      return theme.palette.warning;
    case 'info':
      return theme.palette.info;
    case 'success':
      return theme.palette.success;
    default:
      return theme.palette.primary;
  }
};

export const getThemeColor = (theme: Theme, color?: string) => {
  switch (color!) {
    case 'secondary':
      return theme.palette.secondary.main;
    case 'error':
      return theme.palette.error.main;
    case 'warning':
      return theme.palette.warning.main;
    case 'info':
      return theme.palette.info.main;
    case 'success':
      return theme.palette.success.main;
    case 'primary':
      return theme.palette.primary.main;
    default:
      return color;
  }
};

export default getColors;
