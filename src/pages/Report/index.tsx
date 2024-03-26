import React from 'react';
import TopBar from './TopBar';
import { Box, Stack, useTheme } from '@mui/material';
import Toolbar from './Toolbar';
import Filter from './Filter';
import Board from './Board';
import Table from './Table';
import Chart from './Chart';

interface ReportProps {}

const Report = (props: ReportProps) => {
  const theme = useTheme();
  return (
    <Stack height={'100%'} sx={{ background: '#f3f2f5' }}>
      <TopBar />
      <Stack
        width='100%'
        height='calc(100% - 60px)'
        sx={{
          borderTopLeftRadius: 12,
          borderTopRightRadius: 12,
          mr: 2,
          background: theme.palette.common.white,
          alignItems: 'center',
        }}
      >
        <Stack width={1280} height='100%' pt={2}>
          <Toolbar />
          <Filter sx={{ pt: 2.5 }} />
          <Chart sx={{ mt: 2.5 }} />
          <Board sx={{ my: 2.5 }} />
          <Table />
        </Stack>
      </Stack>
    </Stack>
  );
};

export default Report;
