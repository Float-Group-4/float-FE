import { Button, ButtonProps, CircularProgress } from '@mui/material';
import React from 'react';

interface LoadingButtonProps extends ButtonProps {
  loading: boolean;
  children: string;
}

const LoadingButton = (props: LoadingButtonProps) => {
  const { loading = false, children, ...others } = props;
  return <Button {...others}>{loading ? <CircularProgress /> : children}</Button>;
};

export default LoadingButton;
