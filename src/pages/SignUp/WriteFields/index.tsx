import { useEffect } from 'react';
import { Control, FieldErrorsImpl, UseFormSetValue, UseFormWatch } from 'react-hook-form';

import { Grid, Stack } from '@mui/material';

import WriteField from '@base/components/WriteField';
import { WriteFieldItem } from '@base/types/common';

import * as keyNames from '../config/keyNames';

interface WriteFieldsProps {
  fields: WriteFieldItem[];
  watch: UseFormWatch<any>;
  setValue: UseFormSetValue<any>;
  control: Control<any, any>; //hook-from
  errors: Partial<FieldErrorsImpl<any>>; //hook-from
}

const WriteFields = (props: WriteFieldsProps) => {
  const { fields, watch, setValue, control, errors } = props;

  return (
    <Grid container spacing={3}>
      {fields.map((_field: WriteFieldItem) => {
        return (
          <WriteField
            key={_field?.keyName}
            item={_field}
            keyName={_field?.keyName || ''}
            control={control}
            errors={errors}
          />
        );
      })}
    </Grid>
  );
};

export default WriteFields;
