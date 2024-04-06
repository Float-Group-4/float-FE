import { CONTAINER_PADDING_X, HEADER_HEIGHT_NOT_AUTH } from '@base/config/constants';
import { Stack } from '@mui/material';
import { Outlet } from 'react-router';
import Header from './Header';

const NotAuthLayout = () => {
  return (
    <Stack>
      <Header />
      <Stack
        height={`calc(100vh - ${HEADER_HEIGHT_NOT_AUTH}px)`}
        width='100%'
        margin='auto'
        px={CONTAINER_PADDING_X}
      >
        <Outlet />
      </Stack>
    </Stack>
  );
};

export default NotAuthLayout;
