import React from 'react';
import { Controller } from 'react-hook-form';

import { InfoOutlined } from '@mui/icons-material';
import { Box, Grid, InputLabel, Stack, Typography, useMediaQuery } from '@mui/material';
import { SxProps, useTheme } from '@mui/material/styles';
import Tooltip, { tooltipClasses } from '@mui/material/Tooltip';

import RawHTML from '@base/components/RawHTML';
import { WriteFieldItem } from '@base/types/common';

export interface WriteFieldProps {
  item: WriteFieldItem;
  control: any;
  errors: any;
  keyName: string;
  isHidden?: boolean;
  disabled?: boolean;
  invisible?: boolean;
  isHorizontal?: boolean;
  // use asterisk for required field
  requiredAsterisk?: boolean;
  // ratio of horizontal field, ex: fieldLabel: 3, fieldComponent: 9
  ratio?: {
    label: number;
    component: number;
  };
}

const WriteField = (props: WriteFieldProps) => {
  const {
    item,
    control,
    keyName,
    errors,
    isHidden,
    invisible,
    disabled = false,
    isHorizontal = false,
    requiredAsterisk = false,
    ratio = { label: 3, component: 9 },
  } = props;

  const {
    languageKey,
    titleNamespace = 'common',
    hideTitle = false,
    titleSx = {},
    itemSx = {},
    defaultValue: itemValue,
    validate,
    columns,
    tooltipShow,
    tooltipText = {
      tooltipLangKey: '',
      tooltipNameSpace: 'common',
    },
    Component,
    componentProps,
  } = item;

  const theme = useTheme();

  //do nothing
  if (invisible) return <></>;

  // eslint-disable-next-line react-hooks/rules-of-hooks
  const matchesMd: boolean = useMediaQuery(theme.breakpoints.down('md'));
  const getGridCol = () => {
    switch (matchesMd ? 1 : columns) {
      case 1:
        return 12;
      case 2:
        return 6;
      case 3:
        return 4;
      case 4:
        return 3;
      case 6:
        return 2;
      default:
        return 12;
    }
  };

  //render
  return (
    <Grid item xs={getGridCol()} sx={{ display: isHidden ? 'none' : 'block', ...itemSx }}>
      <Grid container spacing={isHorizontal ? 0 : 0.5}>
        {!hideTitle && (
          <Grid item xs={12} md={isHorizontal ? ratio?.label : 12}>
            <Stack spacing={1} direction="row" alignItems="center">
              <InputLabel sx={{ display: 'flex', alignItems: 'center' }}>
                <Typography sx={{ fontWeight: theme.typography.fontWeightMedium, ...titleSx }}>
                  {languageKey || ''}
                </Typography>
                {validate && requiredAsterisk && (
                  <Box component="span" sx={{ ml: 1, color: 'error.main' }}>
                    *
                  </Box>
                )}
              </InputLabel>
              {tooltipShow && (
                <Tooltip arrow title={<RawHTML>{tooltipText.tooltipLangKey || ''}</RawHTML>} placement="top">
                  <InfoOutlined htmlColor={theme.palette.text.secondary} sx={{ fontSize: 16, cursor: 'pointer' }} />
                </Tooltip>
              )}
            </Stack>
          </Grid>
        )}
        {componentProps?.replaceTitle && (
          <Grid item xs={12} md={isHorizontal ? ratio?.label : 12}>
            <Stack direction="row" sx={{ mb: 1 }}>
              <Box component="span" sx={{ mr: 1, px: 2, py: 1, color: 'common.white', bgcolor: 'primary.main' }}>
                {componentProps?.replaceTitle.step}
              </Box>
              <Box component="span" sx={{ width: '100%', pt: 1 }}>
                {componentProps?.replaceTitle.text}
              </Box>
            </Stack>
          </Grid>
        )}
        {Component ? (
          <Grid item xs={12} md={isHorizontal ? ratio?.component : 12}>
            <Stack>
              <Controller
                name={keyName}
                control={control}
                rules={{
                  validate: validate,
                }}
                render={({ field: { onChange, value, onBlur } }) => {
                  // I use Onblur to update isTouched of field from useForm
                  return (
                    <React.Suspense fallback={<></>}>
                      <Component
                        onBlur={onBlur}
                        control={control}
                        disabled={disabled}
                        {...componentProps}
                        value={value}
                        onChange={onChange}
                      />
                    </React.Suspense>
                  );
                }}
                defaultValue={itemValue}
              />
            </Stack>
          </Grid>
        ) : (
          <Grid item>{'Empty'}</Grid>
        )}
        {errors?.[keyName] && (
          <Typography variant="h6" sx={{ color: 'error.main', pt: 0.5, pl: isHorizontal ? 0 : 0.5 }}>
            {errors?.[keyName]?.message}
          </Typography>
        )}
      </Grid>
    </Grid>
  );
};

export default WriteField;
