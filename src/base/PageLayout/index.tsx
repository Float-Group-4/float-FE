import React from 'react';
import { Button, Stack } from '@mui/material';
import { Outlet } from 'react-router';
import Header from './Header';
import { CONTAINER_PADDING_X, HEADER_HEIGHT } from '@base/config/constants';
import { useMatch } from 'react-router-dom';

const PageLayout = () => {
  const isHome = useMatch('/');
  const isLogin = useMatch('/login');

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
    </Stack>
  );
};

export default PageLayout;
