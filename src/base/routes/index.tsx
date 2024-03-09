import React from 'react';

import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import HomePage from '@pages/HomePage';
const PageLayout = lazy(() => import('@base/PageLayout'));

const SignIn = lazy(() => import('@pages/SignIn'));
const SignUp = lazy(() => import('@pages/SignUp'));
const TeamSetupModal = lazy(() => import('@pages/TeamSetupModal'));

export const routes: RouteObject[] = [
  {
    path: '*',
    element: <PageLayout />,
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
      {
        path: 'team-setup',
        element: <TeamSetupModal isOpen={true} setIsOpen={() => {}} />,
      },
    ],
  },
];
