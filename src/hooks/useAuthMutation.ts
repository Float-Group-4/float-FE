import { queryKeys } from '@configs/queryKeys';
import useMutationCustom from '../base/hooks/useMutationCustom';
import { useSnackBar } from '../base/hooks/useSnackbar';

export const useAuthMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mSignIn = useMutationCustom(
    [queryKeys.auth_signIn],
    '/api/user-login',
    'POST',
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Sign in successfully');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Sign in Fail');
      },
    },
    undefined,
    undefined,
    undefined,
    false,
  );

  const mSignUp = useMutationCustom(
    [queryKeys.auth_signUp],
    '/api/register',
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

  return { mSignIn, mSignUp };
};
