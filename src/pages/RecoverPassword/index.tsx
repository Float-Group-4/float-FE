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
import { queryKeys } from '@base/config/queryKeys';
import signInBackgroundUrl from '@base/assets/imgs/signIn-background.svg';
import { useNavigate } from 'react-router-dom';
import { grey, indigo } from '@mui/material/colors';

interface LoginProps {}

const RecoverPassword = (props: LoginProps) => {
  const theme = useTheme();
  const navigate = useNavigate();
  const queryClient = useQueryClient();
  const layoutFields: string[] = [keyNames.KEY_NAME_SIGN_IN_USERNAME];

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
    navigate('/team');
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
          Send me recover instructions
        </LoadingButton>

        <Stack direction='row' spacing={1} mt={3}>
          <Typography color='secondary' sx={{ fontSize: 12 }}>
            Never mind,
          </Typography>
          <div
            onClick={() => {
              navigate('/sign-in');
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
              I remember now
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
      <Typography sx={{ fontSize: 24, fontWeight: 700, textAlign: 'center', mb: 2 }}>
        What's my password?
      </Typography>
      <Typography
        sx={{ fontSize: 16, fontWeight: 400, textAlign: 'center', mb: 2 }}
        className='text-gray-500'
      >
        Enter your email address and we'll send you a link to get you back into your Float account.
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

export default RecoverPassword;
