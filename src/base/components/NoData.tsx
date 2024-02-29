import React from 'react';

import { Typography, Box, Button, SxProps } from '@mui/material';

interface NoDataProps {
  label?: string;
  ComponentButton?: any;
  sx?: SxProps;
}

const NoData = (props: NoDataProps) => {
  const { label, ComponentButton, sx } = props;

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        p: 1,
        color: '#c0ccda',
        ...sx,
      }}
    >
      <Typography noWrap sx={{ my: '8px' }}>
        {label || 'No Data'}
      </Typography>
      <Box sx={{ display: 'flex' }}>{ComponentButton}</Box>
    </Box>
  );
};

export default NoData;
