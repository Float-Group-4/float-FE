import React from 'react';

import toast from 'react-hot-toast';
import { useTheme } from '@mui/material';

export const useSnackBar = () => {
  const theme = useTheme();
  const enqueueSuccessBar = (msg: string) => {
    toast.success(msg, {
      // icon: <DoneOutlinedIcon />,
      iconTheme: {
        primary: theme.palette.success.main,
        secondary: theme.palette.common.white,
      },
      duration: 3000,
    });
  };
  const enqueueErrorBar = (msg: string) => {
    toast.error(msg, {
      // icon: <DoneOutlinedIcon />,
      iconTheme: {
        primary: theme.palette.error.light,
        secondary: theme.palette.common.white,
      },
      duration: 3000,
      style: {
        backgroundColor: theme.palette.error.main, // Màu sắc nền thông báo
        color: theme.palette.error.contrastText, // Màu chữ
        fontWeight: 500,
      },
    });
  };

  const enqueuePrimaryBar = (msg: string) => {
    toast.error(msg, {
      // icon: <DoneOutlinedIcon />,
      iconTheme: {
        primary: theme.palette.primary.light,
        secondary: theme.palette.common.white,
      },
      duration: 3000,
      style: {
        backgroundColor: theme.palette.primary.main, // Màu sắc nền thông báo
        color: theme.palette.primary.contrastText, // Màu chữ
        fontWeight: 500,
      },
    });
  };

  return { enqueueSuccessBar, enqueueErrorBar, enqueuePrimaryBar };
};
