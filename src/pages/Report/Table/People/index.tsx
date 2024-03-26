import * as React from 'react';
import Table from '@mui/material/Table';
import TableBody from '@mui/material/TableBody';
import TableCell from '@mui/material/TableCell';
import TableContainer from '@mui/material/TableContainer';
import TableHead from '@mui/material/TableHead';
import TableRow from '@mui/material/TableRow';
import Paper from '@mui/material/Paper';

function createData(
  people: string | number,
  departments: string | number,
  capacity: string | number,
  scheduled: string | number,
  billable: string | number,
  nonBillable: string | number,
  timeOff: string | number,
  overtime: string | number,
  sched: string | number,
) {
  return {
    people,
    departments,
    capacity,
    scheduled,
    billable,
    nonBillable,
    timeOff,
    overtime,
    sched,
  };
}

const rows = [
  createData('Hà Tuấn Lâm', 'No Department', 456, 0, 0, 0, 0, 0, '0%'),
  createData('Nguyễn Ngọc Quang', 'No Department', 456, 0, 0, 0, 0, 0, '0%'),
  createData('Lê Minh Nhật', 'No Department', 456, 0, 0, 0, 0, 0, '0%'),
  createData('Trương Gia Huy', 'No Department', 456, 0, 0, 0, 0, 0, '0%'),
];

function People() {
  return (
    <TableContainer component={Paper}>
      <Table sx={{ minWidth: 650 }} aria-label='simple table'>
        <TableHead>
          <TableRow>
            <TableCell>People</TableCell>
            <TableCell>Departments</TableCell>
            <TableCell align='right'>Capacity</TableCell>
            <TableCell align='right'>Scheduled</TableCell>
            <TableCell align='right'>Billable</TableCell>
            <TableCell align='right'>Non-billable</TableCell>
            <TableCell align='right'>Time off</TableCell>
            <TableCell align='right'>Overtime</TableCell>
            <TableCell align='right'>Sched. %</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {rows.map((row) => (
            <TableRow key={row.people} sx={{ '&:last-child td, &:last-child th': { border: 0 } }}>
              <TableCell>{row.people}</TableCell>
              <TableCell>{row.departments}</TableCell>
              <TableCell align='right'>{row.capacity}</TableCell>
              <TableCell align='right'>{row.scheduled}</TableCell>
              <TableCell align='right'>{row.billable}</TableCell>
              <TableCell align='right'>{row.nonBillable}</TableCell>
              <TableCell align='right'>{row.timeOff}</TableCell>
              <TableCell align='right'>{row.overtime}</TableCell>
              <TableCell align='right'>{row.sched}</TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </TableContainer>
  );
}

export default People;
