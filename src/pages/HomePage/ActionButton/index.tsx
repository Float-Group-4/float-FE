import {
  Box,
  Button,
  IconButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Tooltip,
  Typography,
} from '@mui/material';
import React, { useState } from 'react';
import HighlightOffIcon from '@mui/icons-material/HighlightOff';
import CheckCircleOutlineIcon from '@mui/icons-material/CheckCircleOutline';
import CallSplitIcon from '@mui/icons-material/CallSplit';
import LinkIcon from '@mui/icons-material/Link';
import NearMeOutlinedIcon from '@mui/icons-material/NearMeOutlined';

const actionOptions = [
  {
    label: 'Add/Edit',
    icon: <NearMeOutlinedIcon sx={{ transform: 'scaleX(-1)' }} fontSize='small' />,
    keyLetter: 'A',
  },
  { label: 'Split', icon: <CallSplitIcon fontSize='small' />, keyLetter: 'S' },
  { label: 'Link', icon: <LinkIcon fontSize='small' />, keyLetter: 'L' },
  { label: 'Complete', icon: <HighlightOffIcon fontSize='small' />, keyLetter: 'C' },
  { label: 'Delete', icon: <CheckCircleOutlineIcon fontSize='small' />, keyLetter: 'D' },
];

export default function ActionButton() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [icon, setIcon] = useState<null | React.ReactNode>(
    <NearMeOutlinedIcon sx={{ transform: 'scaleX(-1)' }} fontSize='small' />,
  );
  const [toolTipTitle, setToolTipTitle] = useState<null | string>('Add/Edit mode');
  const [selectedAction, setSelectedAction] = useState<string | null>('Add/Edit');

  const open = Boolean(anchorEl);

  const handleOpenMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleCloseMenu = () => {
    setAnchorEl(null);
  };

  const handleActionSelect = (action: string) => {
    setSelectedAction(action);
    handleCloseMenu();
    setToolTipTitle(action + ' mode');
    const selectedOption = actionOptions.find((option) => option.label === action);
    if (selectedOption) {
      setIcon(selectedOption.icon);
    }
  };

  return (
    <div className='absolute bottom-8 right-8 rounded-md border h-10 w-10 flex items-center justify-center'>
      <Tooltip title={toolTipTitle}>
        <IconButton
          className='h-8 w-8 bg-blue-200 hover:bg-blue-200'
          onClick={handleOpenMenu}
          sx={{
            '&:hover svg': {
              color: 'blue',
            },
          }}
        >
          {icon}
        </IconButton>
      </Tooltip>
      <Menu
        className='mb-20'
        open={open}
        anchorEl={anchorEl}
        onClose={handleCloseMenu}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
      >
        {actionOptions.map((option, index) => (
          <div key={index}>
            <MenuItem
              className={`h-8 w-60 px-3 py-3 mx-2 rounded-lg my-1 ${selectedAction === option.label ? 'text-blue-600' : ''}`}
              onClick={() => handleActionSelect(option.label)}
            >
              <ListItemIcon>
                {React.cloneElement(option.icon, {
                  sx: {
                    color: selectedAction === option.label ? 'blue' : undefined,
                  },
                })}
              </ListItemIcon>
              <ListItemText>{option.label}</ListItemText>
              <Typography>{option.keyLetter}</Typography>
            </MenuItem>
          </div>
        ))}
      </Menu>
    </div>
  );
}
