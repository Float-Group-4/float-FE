import React from 'react';
import DefaultLayout from './DefaultLayout';
import NotAuthLayout from './NotAuthLayout';

interface PageLayoutProps {}

const PageLayout = (props: PageLayoutProps) => {
  // change condition login here
  const isLogin = false;
  return <>{isLogin ? <DefaultLayout /> : <NotAuthLayout />}</>;
};

export default PageLayout;
