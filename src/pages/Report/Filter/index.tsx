import CheckBoxGroup from '@base/components/CheckBoxGroup';
import { LabelValue } from '@base/types';
import { KeyboardArrowDownOutlined } from '@mui/icons-material';
import { Box, Button, Popover, Stack, SxProps, Typography } from '@mui/material';
import React, { useState } from 'react';
import FilterSelectBox from './FilterSelectBox';

interface FilterProps {
  sx: SxProps;
}

const PEOPLE_FILTER_OPTIONS: LabelValue[] = [
  {
    label: 'Employees',
    value: '1',
  },
  {
    label: 'Active',
    value: '2',
  },
  {
    label: 'Contractors',
    value: '3',
  },
  {
    label: 'Archived',
    value: '4',
  },
  {
    label: 'Placeholders',
    value: '5',
  },
];

const ALLOCATION_FILTER_OPTIONS: LabelValue[] = [
  {
    label: 'Confirmed',
    value: '1',
  },
  {
    label: 'Tentative',
    value: '2',
  },
  {
    label: 'Completed',
    value: '3',
  },
];

const TIME_FILTER_OPTIONS: LabelValue[] = [
  {
    label: 'Approvals',
    value: '1',
  },
  {
    label: 'Tentative',
    value: '2',
  },
  {
    label: 'Declined',
    value: '3',
  },
];

const Filter = (props: FilterProps) => {
  const { sx } = props;
  const [peopleFilter, setPeopleFilter] = useState<LabelValue[]>(PEOPLE_FILTER_OPTIONS.slice(0, 3));
  const [allocationFilter, setAllocationFilter] = useState<LabelValue[]>(TIME_FILTER_OPTIONS);
  const [timeFilter, setTimeFilter] = useState<LabelValue[]>(TIME_FILTER_OPTIONS);

  return (
    <Stack direction='row' alignItems='center' spacing={1} sx={sx}>
      <FilterSelectBox
        title='People'
        options={PEOPLE_FILTER_OPTIONS}
        value={peopleFilter}
        onChange={setPeopleFilter}
      />
      <FilterSelectBox
        title='Allocations'
        options={ALLOCATION_FILTER_OPTIONS}
        value={allocationFilter}
        onChange={setAllocationFilter}
      />
      <FilterSelectBox
        title='Time off'
        options={TIME_FILTER_OPTIONS}
        value={timeFilter}
        onChange={setTimeFilter}
      />
    </Stack>
  );
};

export default Filter;
