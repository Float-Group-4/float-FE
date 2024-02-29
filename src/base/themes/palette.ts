import { PalettesProps, presetDarkPalettes, presetPalettes } from '@ant-design/colors';
import { alpha, createTheme } from '@mui/material/styles';

import { PresetColor, ThemeMode } from '@base/types/config';
import { PaletteThemeProps } from '@base/types/theme';

import ThemeOption from './theme';

const Palette = (mode: ThemeMode, presetColor: PresetColor) => {
  const colors: PalettesProps = mode === 'dark' ? presetDarkPalettes : presetPalettes;

  let greyPrimary = [
    '#ffffff',
    '#fafafa',
    '#f5f5f5',
    '#f0f0f0', //#edeae9
    '#d9d9d9',
    '#bfbfbf',
    '#8c8c8c', //#6d6e6f
    '#595959',
    '#262626',
    '#141414',
    '#000000',
  ];

  let greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
  let greyConstant = ['#fafafb', '#e6ebf1'];

  if (mode === 'dark') {
    greyPrimary = [
      '#000000',
      '#141414',
      '#1e1e1e',
      '#595959',
      '#8c8c8c',
      '#bfbfbf',
      '#d9d9d9',
      '#f0f0f0',
      '#f5f5f5',
      '#fafafa',
      '#ffffff',
    ];
    // greyPrimary.reverse();
    // greyPrimary = ['#000000', '#141414', '#1e1e1e', '#595959', '#6d6e6f', '#bfbfbf', '#d9d9d9', '#edeae9', '#f5f5f5','#fafafa', '#ffffff'];

    greyAscent = ['#fafafa', '#bfbfbf', '#434343', '#1f1f1f'];
    greyConstant = ['#121212', '#d3d8db'];
  }
  colors.grey = [...greyPrimary, ...greyAscent, ...greyConstant];

  const paletteColor: PaletteThemeProps = ThemeOption(colors, presetColor, mode);

  // custom theme
  // return createTheme({
  //   palette: {
  //     mode,
  //     common: {
  //       black: '#000',
  //       white: '#fff'
  //     },
  //     ...paletteColor,
  //     text: {
  //       primary: mode === 'dark' ? alpha(paletteColor.grey[900]!, 0.87) : paletteColor.grey[700],
  //       secondary: mode === 'dark' ? alpha(paletteColor.grey[900]!, 0.45) : paletteColor.grey[500],
  //       disabled: mode === 'dark' ? alpha(paletteColor.grey[900]!, 0.1) : paletteColor.grey[400]
  //     },
  //     action: {
  //       disabled: paletteColor.grey[300],
  //       // active: paletteColor.grey[700]
  //     },
  //     divider: mode === 'dark' ? '#444444' : paletteColor.grey[200],
  //     background: {
  //       paper: mode === 'dark' ? paletteColor.grey[100] : paletteColor.grey[0],
  //       default: mode === 'dark' ? paletteColor.grey.A50 : '#f6f8fa' //paletteColor.grey.A100
  //     }
  //   }
  // });

  // mantis theme
  return createTheme({
    palette: {
      mode,
      common: {
        black: '#000',
        white: '#fff',
      },
      ...paletteColor,
      text: {
        primary: mode === 'dark' ? alpha(paletteColor.grey[900]!, 0.87) : paletteColor.grey[700],
        secondary: mode === 'dark' ? alpha(paletteColor.grey[900]!, 0.45) : paletteColor.grey[500],
        disabled: mode === 'dark' ? alpha(paletteColor.grey[900]!, 0.1) : paletteColor.grey[400],
      },
      action: {
        disabled: paletteColor.grey[300],
      },
      divider: mode === 'dark' ? alpha(paletteColor.grey[900]!, 0.05) : paletteColor.grey[200],
      background: {
        paper: mode === 'dark' ? paletteColor.grey[100] : paletteColor.grey[0],
        default: paletteColor.grey.A50,
      },
    },
  });
};

export default Palette;
