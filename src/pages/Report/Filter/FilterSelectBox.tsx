import CheckBoxGroup from '@base/components/CheckBoxGroup';
import { LabelValue } from '@base/types';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { Box, Button, Popover, Stack, Typography } from '@mui/material';
import React, { useState } from 'react';

interface FilterSelectBoxProps {
  title: string;
  options: LabelValue[];
  value: LabelValue[];
  onChange: any;
}

const FilterSelectBox = (props: FilterSelectBoxProps) => {
  const { title, options, value, onChange } = props;
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };
  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  const isAll = !options?.find(
    (_item) => value?.findIndex((_valueItem) => _valueItem.value === _item?.value) === -1,
  );

  return (
    <Stack direction='row' alignItems='center' spacing={1}>
      <Button
        onClick={handleClick}
        variant='outlined'
        size='small'
        endIcon={<KeyboardArrowDownOutlined fontSize='small' />}
      >
        {`${title}: ${isAll ? 'All' : value?.map((_item) => _item?.label).join(', ')}`}
      </Button>

      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        slotProps={{
          paper: {
            sx: {
              mt: 1,
            },
          },
        }}
      >
        <Box sx={{ p: 2 }}>
          <Typography>{`${title}:`}</Typography>
          <CheckBoxGroup options={options} value={value} onChange={onChange} />
        </Box>
      </Popover>
    </Stack>
  );
};

export default FilterSelectBox;
