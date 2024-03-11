import React from 'react';
import UserList from './UserList';
import Toolbar from './Toolbar';
import { Stack } from '@mui/material';

interface SideBarProps {}

const SideBar = (props: SideBarProps) => {
  return (
    <Stack>
      <Toolbar />
      <UserList />
    </Stack>
  );
};

export default SideBar;
