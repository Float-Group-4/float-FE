import React, { Suspense, lazy, useEffect } from 'react';
import { BrowserRouter, Route, RouteObject, Routes } from 'react-router-dom';

import { Toaster } from 'react-hot-toast';
import '@fontsource/roboto/300.css';
import '@fontsource/roboto/400.css';
import '@fontsource/roboto/500.css';
import '@fontsource/roboto/700.css';

import './App.css';
import '@base/assets/fonts/base.css';
import '@base/assets/scss/app.scss';

import { ReactQueryDevtools } from '@tanstack/react-query-devtools';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { RecoilRoot } from 'recoil';
import { CircularProgress } from '@mui/material';
import { routes } from '@routes/index';
import LinearLoader from './LinearLoader';
import ThemeCustomization from '@base/themes';
import { gapi } from 'gapi-script';
import { clientId } from '@constants/oAuth2';

// Create a client
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      staleTime: 60000,
    },
  },
});

// const router = createBrowserRouter(routes);

function App() {
  useEffect(() => {
    const start = () => {
      gapi.client.init({
        clientId: clientId,
        scope: '',
      });

      gapi.load('client:auth2', start);
    };
  }, []);

  const getRoutes = (routes: RouteObject[]) => {
    const recursion = (routes: RouteObject[]) => (
      <>
        {routes.map((_route: any, i: number) => {
          return _route?.children ? (
            <Route key={_route?.path || 'index'} {..._route}>
              {recursion(_route?.children)}
            </Route>
          ) : (
            <Route key={_route?.path || 'index'} {..._route} />
          );
        })}
      </>
    );

    return recursion(routes);
  };

  return (
    <RecoilRoot>
      <BrowserRouter>
        <ThemeCustomization>
          <QueryClientProvider client={queryClient}>
            <Toaster position='top-right' reverseOrder={false} />
            <LinearLoader />
            <Suspense fallback={<CircularProgress />}>
              <Routes>{getRoutes(routes)}</Routes>
            </Suspense>
            {/* <ReactQueryDevtools initialIsOpen={false} /> */}
          </QueryClientProvider>
        </ThemeCustomization>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
