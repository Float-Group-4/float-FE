import { queryKeys } from '@configs/queryKeys';
import useMutationCustom from '../base/hooks/useMutationCustom';
import { useSnackBar } from '../base/hooks/useSnackbar';
import { useMutation } from '@tanstack/react-query';
import { axiosAPI } from '@base/utils/axios/api';

export const useAuthMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mSignIn = useMutationCustom(
    [queryKeys.auth_signIn],
    '/auth/user-login',
    'POST',
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Sign in Successfully');
      },
      onError: (error: any, variables: any, context: any) => {
        if (error?.response?.data?.message) {
          enqueueErrorBar(error?.response?.data?.message);
        } else {
          enqueueErrorBar('Sign in Fail');
        }
      },
    },
    undefined,
    undefined,
    undefined,
    false,
  );

  const mSignUp = useMutationCustom(
    [queryKeys.auth_signUp],
    '/auth/register',
    'POST',
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Register successfully');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Register fail');
      },
    },
    undefined,
    undefined,
    undefined,
    false,
  );

  const mGoogleSignIn = useMutation({
    mutationKey: [queryKeys.auth_googleSignIn],
    mutationFn: (payload: any) => {
      return axiosAPI(
        `/auth/google-login?token=${payload?.token}`,
        'POST',
        undefined,
        undefined,
        undefined,
        undefined,
        false,
      );
    },
    onSuccess: (data: any, variables: any, context: any) => {
      enqueueSuccessBar('Sign in be google successfully');
    },
    onError: (error: any, variables: any, context: any) => {
      enqueueErrorBar('Sign in by google fail');
    },
  });

  const mSignOut = useMutation({
    mutationKey: [queryKeys.auth_googleSignIn],
    mutationFn: (payload: any) => {
      return axiosAPI(
        `/auth/logout?token=${payload?.token}`,
        'POST',
        undefined,
        undefined,
        undefined,
        undefined,
        false,
      );
    },
    onSuccess: (data: any, variables: any, context: any) => {
      // enqueueSuccessBar('Sign out successfully');
    },
    onError: (error: any, variables: any, context: any) => {
      // enqueueErrorBar('Sign out fail');
    },
  });

  return { mSignIn, mSignUp, mGoogleSignIn, mSignOut };
};
