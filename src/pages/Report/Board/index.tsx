import CheckBoxGroup from '@base/components/CheckBoxGroup';
import { LabelValue } from '@base/types';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { Box, Button, Divider, Popover, Stack, SxProps, Typography, useTheme } from '@mui/material';
import React, { useState } from 'react';
import BoardItem from './BoardItem';
import ScheduledItem from './ScheduledItem';

interface BoardProps {
  sx: SxProps;
}

const Board = (props: BoardProps) => {
  const { sx } = props;
  const theme = useTheme();

  const border = `1px solid ${theme.palette.divider}`;
  return (
    <Stack
      direction='row'
      alignItems='center'
      border={border}
      borderRadius={1.5}
      width='100%'
      sx={sx}
      divider={<Divider orientation='vertical' />}
    >
      <BoardItem title='Capacity' value='1,824h' sx={{ flex: 1 }} />
      <ScheduledItem title='Scheduled' subTitle='0%' value='0h' sx={{ flex: 2.5 }} />
      <BoardItem title='Unscheduled' value='1,824h' sx={{ flex: 1 }} />
      <BoardItem title='Time off' value='0h' sx={{ flex: 1 }} />
      <BoardItem title='Overtime' value='0h' sx={{ flex: 1 }} />
    </Stack>
  );
};

export default Board;
