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
import ChooseTeamPage from '@pages/ChooseTeamPage';
import ErrorPage from '@pages/ErrorPage';
import RecoverPassword from '@pages/RecoverPassword';
import CreateTeamPage from '@pages/CreateTeamPage';
import TutorialPage from '@pages/TutorialPage';
const Layouts = lazy(() => import('@layouts/index'));
const Report = lazy(() => import('@pages/Report'));
const SignIn = lazy(() => import('@pages/SignIn'));
const SignUp = lazy(() => import('@pages/SignUp'));

export const routes: RouteObject[] = [
  {
    path: '/',
    element: <Layouts />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: 'team',
        element: <ChooseTeamPage />,
      },
      {
        path: 'team/:teamId/home',
        element: <HomePage />,
      },
      {
        path: 'team/:teamId/people',
        element: <PeoplePage />,
      },
      {
        path: 'team/:teamId/project',
        element: <ProjectPage />,
      },
      {
        path: 'team/:teamId/report',
        element: <Report />,
      },
      {
        path: '/team/:teamId/tutorial',
        element: <TutorialPage />,
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
        element: <Report />,
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
        path: 'recover-password',
        element: <RecoverPassword />,
      },
      {
        path: 'create-team',
        element: <CreateTeamPage />,
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
  {
    path: '*',
    element: <ErrorPage />,
  },
];
