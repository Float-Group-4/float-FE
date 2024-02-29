import { ReactNode, useMemo } from 'react';

import { CssBaseline, GlobalStyles, StyledEngineProvider } from '@mui/material';
import {
  createTheme,
  Theme,
  ThemeOptions,
  ThemeProvider,
  TypographyVariantsOptions,
} from '@mui/material/styles';

import { CustomShadowProps } from '@base/types/theme';

import componentsOverride from './overrides';
import Palette from './palette';
import CustomShadows from './shadows';
import Typography from './typography';
import React from 'react';
import { themeConfig } from '@base/config/config';

type ThemeCustomizationProps = {
  children: ReactNode;
};

declare module '@mui/material/styles' {
  interface TypographyVariants {
    voraMenu: React.CSSProperties;
    voraTollbar: React.CSSProperties;
  }

  // allow configuration using `createTheme`
  interface TypographyVariantsOptions {
    voraMenu?: React.CSSProperties;
    voraTollbar?: React.CSSProperties;
  }
}

// Update the Typography's variant prop options
declare module '@mui/material/Typography' {
  interface TypographyPropsVariantOverrides {
    voraMenu: true;
    voraTollbar: true;
  }
}

export default function ThemeCustomization({ children }: ThemeCustomizationProps) {
  const { themeDirection, mode, presetColor, fontFamily } = themeConfig;
  const theme: Theme = useMemo<Theme>(() => Palette(mode, presetColor), [mode, presetColor]);

  const themeTypography: TypographyVariantsOptions = useMemo<TypographyVariantsOptions>(
    () => Typography(mode, fontFamily, theme),
    [mode, fontFamily],
  );
  const themeCustomShadows: CustomShadowProps = useMemo<CustomShadowProps>(
    () => CustomShadows(theme),
    [theme],
  );

  const themeOptions: ThemeOptions = useMemo(
    () => ({
      breakpoints: {
        values: {
          xs: 0,
          sm: 768,
          md: 1024, // 0 <= phone, tablet(vertical) < 1024 <= desktop, tablet(horizontal)
          lg: 1266,
          xl: 1536,
        },
      },
      direction: themeDirection,
      mixins: {
        toolbar: {
          minHeight: 48,
          paddingTop: 4,
          paddingBottom: 4,
        },
      },
      palette: theme.palette,
      customShadows: themeCustomShadows,
      typography: {
        ...themeTypography,
        voraMenu: {
          ...themeTypography.h5,
          fontWeight: themeTypography.fontWeightRegular,
        },
        voraTollbar: {
          ...themeTypography.h5,
          fontWeight: themeTypography.fontWeightMedium,
        },
      },
    }),
    [themeDirection, theme, themeTypography, themeCustomShadows],
  );

  const themes: Theme = createTheme(themeOptions);

  themes.components = componentsOverride(themes);
  themes.components = {
    ...themes.components,
    MuiTypography: {
      ...themes.components?.MuiTypography,
      defaultProps: {
        variantMapping: {
          voraMenu: 'h5',
          voraTollbar: 'h5',
        },
      },
    },
  };

  const setGlobalStyles = (theme: Theme) => (
    <GlobalStyles
      styles={{
        ':root': {
          '--color-primary': theme.palette.primary.main,
          '--color-secondary': theme.palette.secondary.main,
          '--color-success': theme.palette.success.main,
          '--color-warning': theme.palette.warning.main,
          '--color-error': theme.palette.error.main,
          '--color-info': theme.palette.info.main,
          '--color-white': theme.palette.common.white,
          '--color-border': theme.palette.divider,
          '--color-gray-100': theme.palette.grey[100],
          '--color-gray-200': theme.palette.grey[200],
          '--color-gray-300': theme.palette.grey[300],
          '--color-gray-400': theme.palette.grey[400],
          '--color-gray-500': theme.palette.grey[500],
          '--color-red': theme.palette.error.main,
          '--color-purple': theme.palette.purple.main,
          '--color-orange': theme.palette.orange.main,
          '--separator-border': `${theme.palette.divider} !important`,
        },
      }}
    />
  );

  return (
    <StyledEngineProvider injectFirst>
      <ThemeProvider theme={themes}>
        <CssBaseline />
        {setGlobalStyles(themes)}
        {children}
      </ThemeProvider>
    </StyledEngineProvider>
  );
}
