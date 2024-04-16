import React, { Suspense, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import writeConfig from './config';
import * as keyNames from './config/keyNames';
import { finalizeParams } from './payload';
import WriteFields from './WriteFields';
import { getWriteForm } from '@base/utils/getWriteForm';
import LoadingButton from '@base/components/LoadingButton';
import { useAuthMutation } from '@hooks/useAuthMutation';
import { useNavigate } from 'react-router-dom';
import { indigo } from '@mui/material/colors';
import { GoogleLogin, GoogleLoginResponse, GoogleLoginResponseOffline } from 'react-google-login';
import { clientId } from '@constants/oAuth2';
import {
  LOCAL_STORAGE_KEY_ACCESS_TOKEN,
  LOCAL_STORAGE_KEY_REFRESH_TOKEN,
} from '@configs/localStorage';
import { useSnackBar } from '@base/hooks/useSnackbar';

interface LoginProps {}

const Login = (props: LoginProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const { enqueueSuccessBar, enqueueErrorBar } = useSnackBar();
  const layoutFields: string[] = [
    keyNames.KEY_NAME_SIGN_IN_EMAIL,
    keyNames.KEY_NAME_SIGN_IN_PASSWORD,
  ];

  const { fields, defaultValues, getParams } = getWriteForm(layoutFields, writeConfig);

  //react-hook
  const {
    handleSubmit,
    watch,
    reset,
    setValue,
    control,
    getValues,
    formState: { errors, isValid },
  } = useForm({
    defaultValues,
    criteriaMode: 'firstError',
    mode: 'onChange',
  });

  const { mSignIn, mGoogleSignIn } = useAuthMutation();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //submit form
  const onSubmit = async (formData: any) => {
    const params = getParams(formData);
    const parsedParams = finalizeParams(params); // define add or update here
    const res = await mSignIn.mutateAsync(parsedParams);
    if (typeof res?.access_token == 'string' && typeof res?.refresh_token == 'string') {
      localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, res?.access_token);
      localStorage.setItem(LOCAL_STORAGE_KEY_REFRESH_TOKEN, res?.refresh_token);
      navigate('/team');
      reset && reset();
    }
  };

  const border = `1px solid ${theme.palette.divider}`;

  const Footer = useMemo(() => {
    return (
      <Stack spacing={2} alignItems='center' mt={3}>
        <LoadingButton
          size='large'
          variant='contained'
          loading={mSignIn.isPending}
          onClick={() => {
            handleSubmit((data) => onSubmit(data), onError)();
          }}
          sx={{ width: '100%', fontWeight: 500, backgroundColor: indigo[600], borderRadius: 2 }}
          className='text-lg'
        >
          Sign In
        </LoadingButton>

        <GoogleLogin
          clientId={clientId}
          onSuccess={async (response: any) => {
            console.log('🚀 ~ response:', response);
            // if (response?.accessToken) {
            //   const res: any = await mGoogleSignIn.mutateAsync({
            //     token: response?.accessToken,
            //   });
            //   if (typeof res?.access_token == 'string' || typeof res?.refresh_token == 'string') {
            //     localStorage.setItem(LOCAL_STORAGE_KEY_ACCESS_TOKEN, res?.access_token);
            //     localStorage.setItem(LOCAL_STORAGE_KEY_REFRESH_TOKEN, res?.refresh_token);
            //     navigate('/home');
            //     reset && reset();
            //   }
            // }
          }}
          isSignedIn={true}
          render={(renderProps) => (
            <button
              className='w-full flex items-center justify-center gap-x-3 py-2 border rounded-lg text-lg hover:bg-gray-50 duration-150 active:bg-gray-100'
              onClick={renderProps.onClick}
              disabled={renderProps.disabled}
            >
              <svg
                className='w-5 h-5'
                viewBox='0 0 48 48'
                fill='none'
                xmlns='http://www.w3.org/2000/svg'
              >
                <g clip-path='url(#clip0_17_40)'>
                  <path
                    d='M47.532 24.5528C47.532 22.9214 47.3997 21.2811 47.1175 19.6761H24.48V28.9181H37.4434C36.9055 31.8988 35.177 34.5356 32.6461 36.2111V42.2078H40.3801C44.9217 38.0278 47.532 31.8547 47.532 24.5528Z'
                    fill='#4285F4'
                  />
                  <path
                    d='M24.48 48.0016C30.9529 48.0016 36.4116 45.8764 40.3888 42.2078L32.6549 36.2111C30.5031 37.675 27.7252 38.5039 24.4888 38.5039C18.2275 38.5039 12.9187 34.2798 11.0139 28.6006H3.03296V34.7825C7.10718 42.8868 15.4056 48.0016 24.48 48.0016Z'
                    fill='#34A853'
                  />
                  <path
                    d='M11.0051 28.6006C9.99973 25.6199 9.99973 22.3922 11.0051 19.4115V13.2296H3.03298C-0.371021 20.0112 -0.371021 28.0009 3.03298 34.7825L11.0051 28.6006Z'
                    fill='#FBBC04'
                  />
                  <path
                    d='M24.48 9.49932C27.9016 9.44641 31.2086 10.7339 33.6866 13.0973L40.5387 6.24523C36.2 2.17101 30.4414 -0.068932 24.48 0.00161733C15.4055 0.00161733 7.10718 5.11644 3.03296 13.2296L11.005 19.4115C12.901 13.7235 18.2187 9.49932 24.48 9.49932Z'
                    fill='#EA4335'
                  />
                </g>
                <defs>
                  <clipPath id='clip0_17_40'>
                    <rect width='48' height='48' fill='white' />
                  </clipPath>
                </defs>
              </svg>
              Continue with Google
            </button>
          )}
        />

        <Stack direction='row' spacing={1} mt={3}>
          <Typography color='secondary' sx={{ fontSize: 12 }}>
            Forgot your password?
          </Typography>
          <div
            onClick={() => {
              navigate('/recover-password');
            }}
          >
            <Typography
              sx={{
                fontSize: 12,
                textDecoration: 'underline',
                color: theme.palette.primary.main,
                fontWeight: 500,
                cursor: 'pointer',
              }}
            >
              Reset
            </Typography>
          </div>
        </Stack>
      </Stack>
    );
  }, [reset, isValid]);

  return (
    <Box
      sx={{
        boxShadow: '0 6px 30px #0000001f',
        border,
        borderRadius: 4,
        width: 464,
        margin: 'auto',
        p: 4,
        background: 'white',
      }}
    >
      <Typography sx={{ fontSize: 24, fontWeight: 700, textAlign: 'center', mb: 3 }}>
        Sign in
      </Typography>
      <form>
        <Suspense fallback={<></>}>
          <WriteFields
            fields={fields}
            watch={watch}
            setValue={setValue}
            control={control}
            errors={errors}
          />
          {Footer}
        </Suspense>
      </form>
    </Box>
  );
};

export default Login;
