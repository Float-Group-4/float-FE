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
      navigate('/home');
      reset && reset();
    }
  };

  const border = `1px solid ${theme.palette.divider}`;

  const Footer = useMemo(() => {
    return (
      <Stack spacing={3} alignItems='center' mt={3}>
        <LoadingButton
          size='large'
          variant='contained'
          loading={mSignIn.isPending}
          onClick={() => {
            handleSubmit((data) => onSubmit(data), onError)();
          }}
          sx={{ width: '100%', fontWeight: 500 }}
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
          // render={(renderProps) => (
          //   <Button
          //     variant='outlined'
          //     onClick={renderProps.onClick}
          //     disabled={renderProps.disabled}
          //   >
          //     Sign in with google
          //   </Button>
          // )}
        />

        <Stack direction='row' spacing={1} mt={3}>
          <Typography color='secondary' sx={{ fontSize: 12 }}>
            Forgot your password?
          </Typography>
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
        </Stack>
      </Stack>
    );
  }, [reset, isValid]);

  return (
    <Box
      sx={{
        boxShadow: '0 6px 30px #0000001f',
        border,
        borderRadius: 2,
        width: 464,
        margin: 'auto',
        p: 4,
        // backgroundImage: `url(${signInBackgroundUrl})`
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
