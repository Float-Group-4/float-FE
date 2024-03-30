import SelectBox from '@base/components/SelectBox';
import { LabelValue } from '@base/types';
import { ChevronLeftOutlined, ChevronRightOutlined } from '@mui/icons-material';
import { Button, ButtonGroup, IconButton, Stack } from '@mui/material';
import React, { useState } from 'react';

interface ToolbarProps {}

const typeOptions: LabelValue[] = [
  {
    label: 'Logged vs Scheduled',
    value: '1',
  },
  {
    label: 'Past logged + Future scheduled',
    value: '2',
  },
  {
    label: 'Logged',
    value: '3',
  },
  {
    label: 'Scheduled',
    value: '4',
  },
];

const timeOptions: LabelValue[] = [
  {
    label: 'Days',
    value: '1',
  },
  {
    label: 'Weeks',
    value: '2',
  },
  {
    label: 'Months',
    value: '3',
  },
];

const Toolbar = (props: ToolbarProps) => {
  //state
  const [type, setType] = useState<LabelValue>(typeOptions[3]);
  const [timeSelect, setTimeSelect] = useState<LabelValue>(timeOptions[1]);

  return (
    <Stack direction='row' alignItems='center' justifyContent='space-between'>
      <ButtonGroup
        variant='outlined'
        color='secondary'
        size='small'
        aria-label='Small button group'
      >
        <Button key='one'>
          <ChevronLeftOutlined />
        </Button>

        <Button key='two'>
          <ChevronRightOutlined />
        </Button>
      </ButtonGroup>
      <Stack direction='row' alignItems='center' spacing={1}>
        <SelectBox value={type} onChange={setType} options={typeOptions} sx={{ minWidth: 270 }} />
        <SelectBox
          value={timeSelect}
          onChange={setTimeSelect}
          options={timeOptions}
          sx={{ minWidth: 100 }}
        />
      </Stack>
    </Stack>
  );
};

export default Toolbar;
