import { KeyboardArrowDown, PersonAddAlt, PlusOneOutlined, Sort } from '@mui/icons-material';
import { Button, IconButton, useTheme } from '@mui/material';
import { Stack, Chip } from '@mui/material';
import React from 'react';
import { CORNER_CELL_HEIGHT } from '@constants/home';
import TimeFilter from './TimeFilter';

interface ToolbarProps {}

const Toolbar = (props: ToolbarProps) => {
  const theme = useTheme();
  return (
    <Stack
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      p={1}
      width='60px'
      borderBottom={`1px solid ${theme.palette.divider}`}
      height={CORNER_CELL_HEIGHT}
    >
      <Stack direction='row' alignItems='center' spacing={1}>
        <IconButton color='secondary' size='small' sx={{ height: 28, width: 28 }}>
          <PersonAddAlt fontSize='small' sx={{ color: theme.palette.text.primary }} />
        </IconButton>
        <IconButton
          color='secondary'
          size='small'
          sx={{ border: `1px solid ${theme.palette.secondary.main}`, height: 28, width: 28 }}
        >
          <Sort fontSize='small' sx={{ color: theme.palette.text.primary }} />
        </IconButton>
      </Stack>
      <Stack direction='row' alignItems='center' spacing={1}>
        <TimeFilter />
        <Chip
          variant='light'
          size='small'
          color='secondary'
          label='128h'
          sx={{ '& .MuiChip-label ': { color: theme.palette.text.primary } }}
        />
      </Stack>
    </Stack>
  );
};

export default Toolbar;
