import {
  LOCAL_STORAGE_KEY_ACCESS_TOKEN,
  LOCAL_STORAGE_KEY_REFRESH_TOKEN,
} from '@configs/localStorage';
import { useAuthMutation } from '@hooks/useAuthMutation';
import {
  AddOutlined,
  KeyboardArrowDown,
  LogoutOutlined,
  SettingsOutlined,
} from '@mui/icons-material';
import {
  Avatar,
  Box,
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
import { deepOrange, grey } from '@mui/material/colors';
import TeamSetupModal from '@pages/TeamSetupModal';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';

interface PersonalButtonProps {}

const PersonalButton = (props: PersonalButtonProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [openCreateTeam, setOpenCreateTeam] = useState<boolean>(false);
  const { mSignOut } = useAuthMutation();

  const handleClick = (event: any) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleSignOut = () => {
    const token = localStorage.getItem(LOCAL_STORAGE_KEY_REFRESH_TOKEN);

    const params: any = {
      token: token,
    };
    mSignOut.mutate(params);
    localStorage.removeItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN);
    localStorage.removeItem(LOCAL_STORAGE_KEY_REFRESH_TOKEN);
    navigate('/');
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton
        size='large'
        aria-label=''
        onClick={handleClick}
        className='hover:bg-blue-200 rounded-md'
      >
        <Avatar
          // onClick={handleClick}
          sx={{ bgcolor: deepOrange[500], fontSize: 16 }}
          className='w-8 h-8'
        >
          Q
        </Avatar>
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
          <MenuItem onClick={handleSignOut}>
            <ListItemIcon>
              <LogoutOutlined fontSize='small' />
            </ListItemIcon>
            <Typography variant='inherit' noWrap>
              Sign out
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

export default PersonalButton;
