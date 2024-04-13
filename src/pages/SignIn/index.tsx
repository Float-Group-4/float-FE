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

interface LoginProps {}

const Login = (props: LoginProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const layoutFields: string[] = [
    keyNames.KEY_NAME_SIGN_IN_USERNAME,
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

  const { mSignIn } = useAuthMutation();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //submit form
  const onSubmit = async (formData: any) => {
    const params = getParams(formData);
    const parsedParams = finalizeParams(params); // define add or update here
    navigate('/home');
    mSignIn.mutate(parsedParams, {
      onSuccess(data, variables: any, context) {
        // setTimeout(() => {
        //   queryClient.invalidateQueries([queryKeys.requests]);
        // }, SET_TIMEOUT);

        // onClose && onClose();
        reset && reset();
      },
    });
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

        {/* <LoadingButton
          size='large'
          variant='contained'
          loading={false}
          color='error'
          onClick={() => {
            // handleSubmit((data) => onSubmit(data), onError)();
          }}
          sx={{ width: '100%', fontWeight: 500 }}
        >
          Login with google
        </LoadingButton> */}

        <GoogleLogin
          clientId={clientId}
          onSuccess={(response: GoogleLoginResponse | GoogleLoginResponseOffline) => {
            console.log('🚀 ~ response:', response);
          }}
          isSignedIn={true}
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
