import React from 'react';

import { Checkbox, FormControl, FormControlLabel, Stack, SxProps } from '@mui/material';
import { isObject } from 'lodash';

import SpanLang from '@base/components/SpanLang';

interface ICheckboxGroupProps {
  value: any[];
  options: any[];
  isVertical?: boolean;
  fieldValue?: string;
  fieldLabel?: string;
  disabled?: boolean;
  readOnly?: boolean;
  onChange?: (params: any) => void;
  onClick?: () => void;
  multipleChoice?: boolean; // If 'Checkbox' but only get 1 choice, data still return array [] but one item was selected
  checkboxSx?: SxProps;
}
const CheckBoxGroup = (props: ICheckboxGroupProps) => {
  const {
    value = [],
    options = [],
    isVertical = true,
    fieldValue = 'value',
    fieldLabel = 'label',
    disabled = false,
    readOnly = false,
    onChange = (params: any) => {},
    onClick = () => {},
    multipleChoice = true,
    checkboxSx = {},
  } = props;

  if (options.length === 0) return <> No Options</>;

  return (
    <FormControl>
      <Stack direction={`${isVertical ? 'column' : 'row'}`} flexWrap="wrap">
        {options.map((item: any, index) => (
          <React.Fragment key={index}>
            <FormControlLabel
              key={index}
              value={item[fieldValue]}
              control={
                <Checkbox
                  onClick={() => onClick()}
                  checked={
                    Array.isArray(value) &&
                    value?.findIndex((_item: any) => {
                      if (isObject(_item)) {
                        return _item[fieldValue as keyof typeof _item] == item[fieldValue];
                      } else {
                        return _item == item[fieldValue];
                      }
                    }) !== -1
                  }
                  onChange={(e: any) => {
                    if (readOnly === false && onChange && typeof onChange === 'function') {
                      let valueNew = [];
                      if (e.target.checked) {
                        valueNew = multipleChoice ? value.concat(item) : [item];
                      } else {
                        valueNew = value.filter((itemChosed) => itemChosed[fieldValue] != item[fieldValue]);
                      }

                      onChange && onChange(valueNew);
                    }
                  }}
                  sx={checkboxSx}
                />
              }
              label={
                <Stack direction="row" alignItems={'center'}>
                  <SpanLang keyLang={item[fieldLabel]} namespace={item?.namespace || 'common'} />
                </Stack>
              }
              disabled={disabled || item?.disabled || readOnly}
              sx={{
                ml: 0,
                '& .MuiCheckbox-root': { p: 0, mr: 1, my: 1 },
              }}
            />
          </React.Fragment>
        ))}
      </Stack>
    </FormControl>
  );
};

export default CheckBoxGroup;
