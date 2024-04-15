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
  const navigate = useNavigate();
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
      <Stack spacing={2} alignItems='center' mt={3}>
        <LoadingButton
          size='large'
          variant='contained'
          loading={mSignUp.isPending}
          onClick={() => {
            handleSubmit((data) => onSubmit(data), onError)();
          }}
          sx={{ width: '100%', fontWeight: 500, borderRadius: 2 }}
          className='text-lg'
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
        borderRadius: 4,
        width: 464,
        margin: 'auto',
        p: 4,
        backgroundColor: 'white',
      }}
    >
      <Typography sx={{ fontSize: 24, fontWeight: 700, textAlign: 'center', mb: 3 }}>
        Sign Up
      </Typography>
      <button
        className='mb-6 w-full flex items-center justify-center gap-x-3 py-2 border rounded-lg text-lg  hover:bg-gray-50 duration-150 active:bg-gray-100'
        onClick={() => {
          navigate('/create-team');
        }}
      >
        <svg className='w-5 h-5' viewBox='0 0 48 48' fill='none' xmlns='http://www.w3.org/2000/svg'>
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
        Start 14-day free trial
      </button>
      <div className='relative my-4'>
        <span className='block w-full h-px bg-gray-300'></span>
        <p className='inline-block w-fit bg-white px-2 absolute -top-2 inset-x-0 mx-auto'>Or</p>
      </div>
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
