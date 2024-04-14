import React, { Suspense, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Grid, Stack, Typography, useTheme } from '@mui/material';
import { useQueryClient } from '@tanstack/react-query';

import writeConfig from './config';
import * as keyNames from './config/keyNames';
import { finalizeParams } from './payload';
import WriteFields from './WriteFields';
import { getWriteForm } from '@base/utils/getWriteForm';
import { SET_TIMEOUT } from '@base/config/constants';
import MiModal from '@base/components/MiModal';
import LoadingButton from '@base/components/LoadingButton';
import { useAuthMutation } from '@hooks/useAuthMutation';

import signInBackgroundUrl from '@base/assets/imgs/signIn-background.svg';
import { useNavigate } from 'react-router-dom';

interface SignUpProps {}

const SignUp = (props: SignUpProps) => {
  const theme = useTheme();
  const queryClient = useQueryClient();
  const navigate = useNavigate();
  const layoutFields: string[] = [
    keyNames.KEY_NAME_SIGN_UP_FIRST_NAME,
    keyNames.KEY_NAME_SIGN_UP_LAST_NAME,
    keyNames.KEY_NAME_SIGN_UP_EMAIL,
    keyNames.KEY_NAME_SIGN_UP_PASSWORD,
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

  const { mSignUp } = useAuthMutation();

  //when submit error, call this
  const onError = (errors: any, e: any) => {
    console.log('error', errors, e);
  };

  //submit form
  const onSubmit = async (formData: any) => {
    const params = getParams(formData);
    const parsedParams = finalizeParams(params); // define add or update here

    mSignUp.mutate(parsedParams, {
      onSuccess(data, variables: any, context) {
        // setTimeout(() => {
        //   queryClient.invalidateQueries([queryKeys.requests]);
        // }, SET_TIMEOUT);

        // onClose && onClose();
        reset && reset();
        navigate('/sign-in');
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
          loading={mSignUp.isPending}
          onClick={() => {
            handleSubmit((data) => onSubmit(data), onError)();
          }}
          sx={{ width: '100%', fontWeight: 500 }}
        >
          Start 14-day free trial
        </LoadingButton>

        <Stack direction='column' spacing={1} mt={3}>
          <Typography color='secondary' sx={{ fontSize: 12 }}>
            By continuing, you are agreeing to Float's
          </Typography>
          <Typography
            color='primary'
            sx={{
              fontSize: 12,
              fontWeight: 500,
              textAlign: 'center',
            }}
          >
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>
              Term & Confitions
            </span>
            <span style={{ color: theme.palette.text.secondary, textDecoration: 'none' }}>
              {' '}
              and{' '}
            </span>
            <span style={{ textDecoration: 'underline', cursor: 'pointer' }}>Privacy Policy</span>
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

export default SignUp;
