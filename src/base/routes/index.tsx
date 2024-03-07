import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import HomePage from '@pages/HomePage';
const PageLayout = lazy(() => import('@base/PageLayout'));

const SignIn = lazy(() => import('@pages/SignIn'));
const SignUp = lazy(() => import('@pages/SignUp'));

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
        element: (
          <SignIn
            isOpen={false}
            onClose={function (): void {
              throw new Error('Function not implemented.');
            }}
          />
        ),
      },
      {
        path: 'sign-up',
        element: <SignUp />,
      },
    ],
  },
];
