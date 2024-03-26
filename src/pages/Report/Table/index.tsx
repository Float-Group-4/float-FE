import * as React from 'react';
import Tabs from '@mui/material/Tabs';
import Tab from '@mui/material/Tab';
import Typography from '@mui/material/Typography';
import Box from '@mui/material/Box';
import { LabelValue } from '@base/types';
import People from './People';

interface TableProps {}

const tabOptions: LabelValue[] = [
  {
    label: 'People',
    value: '1',
  },
  {
    label: 'Roles',
    value: '2',
  },
  {
    label: 'Departments',
    value: '3',
  },
  {
    label: 'Projects',
    value: '4',
  },
  {
    label: 'Tasks',
    value: '5',
  },
  {
    label: 'Time off',
    value: '6',
  },
  {
    label: 'Time tracking',
    value: '7',
  },
];

const Table = (props: TableProps) => {
  const {} = props;

  const [value, setValue] = React.useState(tabOptions[0].value);

  const handleChange = (event: React.SyntheticEvent, newValue: string) => {
    setValue(newValue);
  };

  return (
    <>
      <Tabs
        value={value}
        onChange={handleChange}
        aria-label='basic tabs example'
        textColor='secondary'
        indicatorColor='secondary'
      >
        {tabOptions?.map((_tab) => <Tab value={_tab?.value} label={_tab?.label} />)}
      </Tabs>

      <People />
    </>
  );
};

export default Table;
