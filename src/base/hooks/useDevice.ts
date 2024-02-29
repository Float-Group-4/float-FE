import { useMediaQuery, useTheme } from '@mui/material';

const useDevice = () => {
  const theme = useTheme();

  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));

  return {
    isMobile,
    isDesktop,
  };
};

export default useDevice;
