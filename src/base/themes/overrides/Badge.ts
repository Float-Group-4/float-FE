// material-ui
import { Theme } from '@mui/material/styles';

// project import
import { ExtendedStyleProps } from '@base/types/extended';
import getColors from '@base/utils/getColors';

// types

// ==============================|| BADGE - COLORS ||============================== //

function getColorStyle({ color, theme }: ExtendedStyleProps) {
  const colors = getColors(theme, color);
  const { lighter, main } = colors;

  return {
    color: main,
    backgroundColor: lighter,
  };
}

// ==============================|| OVERRIDES - BADGE ||============================== //

export default function Badge(theme: Theme) {
  const defaultLightBadge = getColorStyle({ color: 'primary', theme });

  return {
    MuiBadge: {
      styleOverrides: {
        standard: {
          minWidth: theme.spacing(2),
          height: theme.spacing(2),
          padding: theme.spacing(0.5),
        },
        light: {
          ...defaultLightBadge,
          '&.MuiBadge-colorPrimary': getColorStyle({ color: 'primary', theme }),
          '&.MuiBadge-colorSecondary': getColorStyle({ color: 'secondary', theme }),
          '&.MuiBadge-colorError': getColorStyle({ color: 'error', theme }),
          '&.MuiBadge-colorInfo': getColorStyle({ color: 'info', theme }),
          '&.MuiBadge-colorSuccess': getColorStyle({ color: 'success', theme }),
          '&.MuiBadge-colorWarning': getColorStyle({ color: 'warning', theme }),
        },
      },
    },
  };
}
