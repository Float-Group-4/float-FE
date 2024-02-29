import { queryKeys } from '@base/config/queryKeys';
import useMutationCustom from './useMutationCustom';
import { useSnackBar } from './useSnackbar';

export const useAuthMutation = () => {
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();

  const mSignIn = useMutationCustom(
    [queryKeys.auth_signIn],
    'auth/signin',
    'POST',
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Success');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Fail');
      },
    },
    undefined,
    undefined,
    undefined,
    false,
  );

  const mSignUp = useMutationCustom(
    [queryKeys.auth_signUp],
    'auth/sign up',
    'POST',
    {
      onSuccess: (data: any, variables: any, context: any) => {
        enqueueSuccessBar('Success');
      },
      onError: (error: any, variables: any, context: any) => {
        enqueueErrorBar('Fail');
      },
    },
    undefined,
    undefined,
    undefined,
    false,
  );

  return { mSignIn, mSignUp };
};
