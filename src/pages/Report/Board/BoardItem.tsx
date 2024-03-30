import { Stack, SxProps, Typography } from '@mui/material';
import React from 'react';

interface BoardItemProps {
  title: string;
  value: string;
  sx: SxProps;
}

const BoardItem = (props: BoardItemProps) => {
  const { title, value, sx } = props;
  return (
    <Stack sx={{ px: 2.5, py: 1.25, ...sx }}>
      <Typography sx={{ fontSize: 14 }}>{title}</Typography>
      <Typography
        sx={{ mt: 0.5, fontSize: 32, fontWeight: 500, letterSpacing: '-0.5px', lineHeight: '39px' }}
      >
        {value}
      </Typography>
    </Stack>
  );
};

export default BoardItem;
