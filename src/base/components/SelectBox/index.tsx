import { useEffect, useRef, useState } from 'react';

import { Clear } from '@mui/icons-material';
import { IconButton, MenuItem, Select, SelectChangeEvent, SxProps, Typography } from '@mui/material';

import { LabelValue } from '@base/types';

import SpanLang from '@base/components/SpanLang';

interface SelectBoxProps {
  value: LabelValue | undefined;
  options: LabelValue[];
  onChange: (val: LabelValue) => void;
  size?: 'small' | 'medium' | undefined;
  sx?: SxProps;
  useLang?: boolean;
  disablePortal?: boolean;
  useClear?: boolean;
  placeholder?: string;
  disabled?: boolean;
}

const SelectBox = (props: SelectBoxProps) => {
  const {
    value,
    onChange,
    options,
    size,
    sx,
    disablePortal = false,
    useLang = true,
    useClear = false,
    placeholder = 'Click to select...',
    disabled = false,
  } = props;
  const [selectedValue, setSelectedValue] = useState(value?.value ?? '');

  useEffect(() => {
    if (value) {
      if (value.value !== selectedValue) {
        setSelectedValue(value.value);
      }
    }
  }, [value]);

  // value change
  const handleValueChange = (newValue: string) => {
    setSelectedValue(newValue);
    // callback
    const foundItem = options.find((v) => v.value == newValue) as LabelValue;
    onChange && onChange(foundItem);
  };

  const onClearValue = () => {
    setSelectedValue('');
    onChange && onChange({ value: '', label: '' });
  };

  return (
    <Select
      disabled={disabled}
      fullWidth
      displayEmpty
      inputProps={{ 'aria-label': 'select' }}
      size={size}
      value={selectedValue}
      MenuProps={{
        disablePortal: disablePortal, // If you use ClickAwayListener and don't have this option(true), It will run event of onClickAway
      }}
      sx={{
        ...sx,
        '& .MuiSelect-iconOutlined': { display: useClear && selectedValue ? 'none' : '' },
        '&.Mui-focused .MuiIconButton-root': { color: 'primary.main' },
      }}
      renderValue={(value: any) => {
        return value || value === 0 ? (
          <SpanLang keyLang={options.find((v) => v.value == value)?.label || ''} textOnly />
        ) : (
          <Typography color={'secondary'}>{placeholder}</Typography>
        );
      }} // render langkey on view
      endAdornment={
        useClear && selectedValue ? (
          <IconButton size="small" sx={{ visibility: selectedValue ? 'visible' : 'hidden' }} onClick={onClearValue}>
            <Clear sx={{ fontSize: 18 }} />
          </IconButton>
        ) : (
          false
        )
      }
      onChange={(e: SelectChangeEvent<string>) => {
        const selected = e.target.value;
        handleValueChange(selected);
      }}
    >
      {options.map((_option: LabelValue, _index: number) => {
        return (
          <MenuItem key={_index} value={_option.value}>
            <SpanLang keyLang={_option.label} textOnly />
          </MenuItem>
        );
      })}
    </Select>
  );
};

export default SelectBox;
