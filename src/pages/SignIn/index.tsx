import React, { Suspense, useEffect, useMemo } from 'react';
import { useForm } from 'react-hook-form';

import { Box, Button, Grid, Stack, useTheme } from '@mui/material';
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

interface WritePageProps {
  title?: string;
  isOpen: boolean;
  onClose: () => void;
  updateData?: any;
}

const WritePage = (props: WritePageProps) => {
  const { title, isOpen, onClose, updateData } = props;
  const theme = useTheme();
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
      <Stack direction='row' spacing={2} alignItems='center'>
        <LoadingButton
          size='medium'
          variant='contained'
          loading={mSignIn.isPending}
          onClick={() => {
            handleSubmit((data) => onSubmit(data), onError)();
          }}
          sx={{ width: '100%' }}
        >
          Đăng nhập
        </LoadingButton>
      </Stack>
    );
  }, [reset, isValid]);

  return (
    <Box sx={{ border, borderRadius: 4, maxWidth: 400, margin: 'auto', p: 2 }}>
      <form>
        <Suspense fallback={<></>}>
          <Stack spacing={2}>
            <WriteFields
              fields={fields}
              watch={watch}
              setValue={setValue}
              control={control}
              errors={errors}
              isEdit={!!updateData}
              updateData={updateData}
            />
            {Footer}
          </Stack>
        </Suspense>
      </form>
    </Box>
  );
};

export default WritePage;
