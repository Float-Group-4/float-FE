import React from 'react';
import { Stack } from '@mui/material';
import { Outlet } from 'react-router';
import Header from './Header';
import { CONTAINER_PADDING_X, HEADER_HEIGHT } from '@base/config/constants';

import DefaultLayout from './DefaultLayout';
import NotAuthLayout from './NotAuthLayout';

interface PageLayoutProps {}

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
    </Stack>
  );

const PageLayout = (props: PageLayoutProps) => {
  // change condition login here
  const isLogin = false;
  return <>{isLogin ? <DefaultLayout /> : <NotAuthLayout />}</>;

};

export default PageLayout;
