import React, { useState } from 'react';
import { Button, Stack } from '@mui/material';
import { Outlet } from 'react-router';
import Header from './Header';
import { CONTAINER_PADDING_X, HEADER_HEIGHT } from '@base/config/constants';
import { useMatch } from 'react-router-dom';
import CreateTeamModal from '@pages/modals/CreateTeamModal';

const PageLayout = () => {
  const isHome = useMatch('/');
  const isLogin = useMatch('/login');
  const [isOpen, setIsOpen] = useState(true);

  return (
    <Stack>
      {!isLogin && <Header />}
      <Stack
        height={`calc(100vh - ${HEADER_HEIGHT}px)`}
        width='100%'
        margin='auto'
        px={CONTAINER_PADDING_X}
      >
        <Outlet />
      </Stack>
      <CreateTeamModal isOpen={isOpen} setIsOpen={setIsOpen}/>
    </Stack>
  );
};

export default PageLayout;
