import React from 'react';
import { Stack } from '@mui/material';
import { Outlet } from 'react-router';
import { CONTAINER_PADDING_X, HEADER_HEIGHT } from '@base/config/constants';

import AuthLayout from './AuthLayout';
import NotAuthLayout from './NotAuthLayout';
import { useMatch } from 'react-router-dom';

interface LayoutsProps {}

const Layouts = (props: LayoutsProps) => {
  // change condition login here
  const isSignIn = useMatch('sign-in');
  const isSignUp = useMatch('sign-up');

  return <>{isSignIn || isSignUp ? <NotAuthLayout /> : <AuthLayout />}</>;
};

export default Layouts;
