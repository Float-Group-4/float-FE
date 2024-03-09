import { KeyboardArrowDown } from '@mui/icons-material';
import { Button, Popover, Typography, useTheme } from '@mui/material';
import React from 'react';

interface TimeFilterProps {}

const TimeFilter = (props: TimeFilterProps) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <Button
        aria-describedby={id}
        size='small'
        variant='outlined'
        color='secondary'
        sx={{ color: theme.palette.text.primary, height: 28 }}
        endIcon={<KeyboardArrowDown fontSize='small' />}
        onClick={handleClick}
      >
        Last week
      </Button>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <Typography sx={{ p: 2 }}>The content of the Popover.</Typography>
      </Popover>
    </>
  );
};

export default TimeFilter;
