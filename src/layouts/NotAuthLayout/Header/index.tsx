import React from 'react';
import { CONTAINER_PADDING_X, HEADER_HEIGHT, HEADER_HEIGHT_NOT_AUTH } from '@base/config/constants';
import { Button, Stack, Typography } from '@mui/material';
import Logo from '@base/assets/imgs/float.svg';
import { useMatch, useNavigate, useNavigation } from 'react-router-dom';

interface HeaderProps {}

const Header = (props: HeaderProps) => {
  const navigate = useNavigate();
  const isSignIn = useMatch('/sign-in');

  return (
    <Stack
      height={HEADER_HEIGHT_NOT_AUTH}
      direction='row'
      alignItems='center'
      justifyContent='space-between'
      p={CONTAINER_PADDING_X}
    >
      <Stack direction='row' alignItems='center' spacing={2}>
        <img src={Logo} alt='React Logo' />
        {/* <Typography sx={{ fontSize: 14, fontWeight: 500 }}>New to Float?</Typography> */}
      </Stack>

      {isSignIn ? (
        <Stack direction='row' alignItems='center' spacing={2}>
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>New to Proma?</Typography>
          <Button onClick={() => navigate('sign-up')} variant='outlined' sx={{ fontWeight: 500 }}>
            Sign Up
          </Button>
        </Stack>
      ) : (
        <Stack direction='row' alignItems='center' spacing={2}>
          <Typography sx={{ fontSize: 14, fontWeight: 500 }}>
            Already have a Proma account?
          </Typography>
          <Button onClick={() => navigate('sign-in')} variant='outlined' sx={{ fontWeight: 500 }}>
            Sign In
          </Button>
        </Stack>
      )}
    </Stack>
  );
};

export default Header;
