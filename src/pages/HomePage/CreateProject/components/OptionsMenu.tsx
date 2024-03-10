import { Box, IconButton, ListItemIcon, ListItemText, Menu, MenuItem } from '@mui/material';
import React from 'react';
import { useState, ReactNode, MouseEvent } from 'react';

interface Option {
  label: string;
  icon?: ReactNode;
  action?: () => void;
  color?: string; 
}

interface OptionMenuProps {
  options?: Option[];
  actionIcon: ReactNode;
  onClick?: () => void;
}

const ITEM_HEIGHT = 60;

function OptionMenu({ options = [], actionIcon, onClick}: Readonly<OptionMenuProps>) {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const open = Boolean(anchorEl);

  const handleClick = (event: MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
    if (typeof onClick === 'function') onClick();
    event.stopPropagation();
  };

  const handleClose = (option?: Option) => {
    setAnchorEl(null);

    if (option?.action) option.action();
  };

  const maxMenuWidth = Math.max(...options.map((option) => option.label.length));

  return (
    <Box>
      <IconButton
        edge='end'
        aria-label='more'
        id='long-button'
        aria-controls={open ? 'option-menu' : undefined}
        aria-expanded={open ? 'true' : undefined}
        aria-haspopup='true'
        onClick={handleClick}
        disableFocusRipple
        sx={{ p: '5px' }}
      >
        {actionIcon}
      </IconButton>
      <Menu
        id='option-menu'
        MenuListProps={{
          'aria-labelledby': 'long-button',
        }}
        anchorEl={anchorEl}
        open={open}
        onClose={() => handleClose()}
        PaperProps={{
          style: {
            maxHeight: ITEM_HEIGHT * 4.5,
            minWidth: `${maxMenuWidth}ch`,
          },
        }}
      >
        {options.map((option) => (
          <MenuItem key={option.label} onClick={() => handleClose(option)}
            sx={{'&:hover' :{backgroundColor: option?.color}}}>
            {option.icon && <ListItemIcon>{option.icon}</ListItemIcon>}
            <ListItemText>{option.label}</ListItemText>
          </MenuItem>
        ))}
      </Menu>
    </Box>
  );
}

OptionMenu.defaultProps = {
  onClick: () => {
    // Default action when onClick is not provided
    // console.log("Default clicked")
  },
  options: [],
};

export default OptionMenu;
