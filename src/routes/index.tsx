import React from 'react';

import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import HomePage from '@pages/HomePage';
const SignIn = lazy(() => import('@pages/SignIn'));
const SignUp = lazy(() => import('@pages/SignUp'));
const TeamSetupModal = lazy(() => import('@pages/TeamSetupModal'));
const Layouts = lazy(() => import('@layouts/index'));

export const routes: RouteObject[] = [
  {
    path: '*',
    element: <Layouts />,
    children: [
      {
        index: true,
        element: <p>Home</p>,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'sign-in',
        element: <SignIn />,
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
];
