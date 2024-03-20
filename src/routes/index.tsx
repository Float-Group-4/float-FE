import { lazy } from 'react';
import { RouteObject } from 'react-router-dom';
import HomePage from '@pages/HomePage';
import GeneralSetting from '@pages/Setting/SettingBody/GeneralSetting';
import PreferenceSetting from '@pages/Setting/SettingBody/PreferenceSetting';
import SettingsPage from '@pages/Setting';
import TeamSetup from '@pages/TeamSetupModal/TeamSetup';
import LandingPage from '@pages/LandingPage';
import PeoplePage from '@pages/PeoplePage';
import ProjectPage from '@pages/ProjectPage';
const Layouts = lazy(() => import('@layouts/index'));
const SignIn = lazy(() => import('@pages/SignIn'));
const SignUp = lazy(() => import('@pages/SignUp'));

export const routes: RouteObject[] = [
  {
    path: '*',
    element: <Layouts />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'home',
        element: <HomePage />,
      },
      {
        path: 'people',
        element: <PeoplePage />,
      },
      {
        path: 'project',
        element: <ProjectPage />,
      },
      {
        path: 'report',
        element: <h1>Report</h1>,
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
        element: <TeamSetup />,
      },
      {
        path: 'admin',
        element: <SettingsPage />,
        children: [
          {
            path: 'general',
            element: <GeneralSetting />,
          },
          {
            path: 'preferences',
            element: <PreferenceSetting />,
          },
        ],
      },
    ],
  },
];
