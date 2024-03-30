import { Stack, SxProps, Typography } from '@mui/material';
import React from 'react';

interface ScheduledItemProps {
  title: string;
  subTitle?: string;
  value: string;
  sx: SxProps;
}

const ScheduledItem = (props: ScheduledItemProps) => {
  const { title, subTitle, value, sx } = props;
  return (
    <Stack sx={{ px: 2.5, py: 1.25, ...sx }}>
      <Stack direction='row' alignItems='center' spacing={1}>
        <Typography sx={{ fontSize: 14 }}>{title}</Typography>
        <Typography color='secondary' sx={{ fontSize: 14, letterSpacing: -0.2 }}>
          {subTitle}
        </Typography>
      </Stack>
      <Typography
        sx={{ mt: 0.5, fontSize: 32, fontWeight: 500, letterSpacing: '-0.5px', lineHeight: '39px' }}
      >
        {value}
      </Typography>
    </Stack>
  );
};

export default ScheduledItem;
