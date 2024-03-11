import { AddOutlined, KeyboardArrowDown, SettingsOutlined } from '@mui/icons-material';
import {
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  MenuList,
  Popover,
  Typography,
  useTheme,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import TeamSetupModal from '@pages/TeamSetupModal';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

interface SettingButtonProps {}

const SettingButton = (props: SettingButtonProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [openCreateTeam, setOpenCreateTeam] = useState<boolean>(false);

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
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        className='hover:bg-blue-200 rounded-md'
      >
        <SettingsOutlined sx={{ color: grey[800] }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuList sx={{ px: 1 }}>
          <MenuItem onClick={() => navigate('/admin/general')}>
            <ListItemIcon>
              <SettingsOutlined fontSize='small' />
            </ListItemIcon>
            <Typography variant='inherit' noWrap>
              Team Setting
            </Typography>
          </MenuItem>
          <Divider />
          <MenuItem onClick={() => setOpenCreateTeam(true)}>
            <ListItemIcon>
              <AddOutlined fontSize='small' />
            </ListItemIcon>
            <Typography variant='inherit' noWrap>
              Create new team
            </Typography>
          </MenuItem>
        </MenuList>
      </Popover>

      {openCreateTeam && (
        <TeamSetupModal
          isOpen={openCreateTeam}
          onClose={() => {
            console.log('Click!');

            setOpenCreateTeam(false);
          }}
        />
      )}
    </>
  );
};

export default SettingButton;
