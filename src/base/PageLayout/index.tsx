
import React from 'react';
import AuthLayout from './AuthLayout';
import NotAuthLayout from './NotAuthLayout';

interface PageLayoutProps {}

const PageLayout = (props: PageLayoutProps) => {
  // change condition login here
  const isLogin = true;
  return <>{isLogin ? <AuthLayout /> : <NotAuthLayout />}</>;
};

export default PageLayout;
