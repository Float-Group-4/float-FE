import { ArrowRight, Flag } from '@mui/icons-material';
import {
  Box,
  Grid,
  FormControl,
  Typography,
  Stack,
  TextField,
  Autocomplete,
  List,
  ListItemIcon,
  ListItem,
  ListItemText,
} from '@mui/material';
import { useScheduleContext } from '@pages/HomePage/Schedule/ScheduleContext';
import dayjs from 'dayjs';
import { useState, useEffect, SetStateAction, ChangeEvent } from 'react';
import { Status } from '../../common/type';
import { useAppSelector } from '@hooks/reduxHooks';
import DatePicker from '@base/components/DatePicker';

const statusTypes = [
  { title: 'Home', icon: <Flag sx={{ color: 'orange' }} /> },
  { title: 'Travel', icon: <Flag sx={{ color: 'violet' }} /> },
  { title: 'Office', icon: <Flag sx={{ color: 'green' }} /> },
];

const StatusTab = () => {
  const { status, setStatus } = useScheduleContext();
  const usersByIds = useAppSelector((state) => state.general.usersById);

  console.log(status?.type)
  const setValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStatus((prev: Status | null) => ({
      ...prev,
      [`${name}`]: value,
    }));
  };

  const setDate = (value: Date, type: string) => {
    if (type == 'startDate') {
      setStatus((prev: Status | null) => ({
        ...prev,
        startDate: value.toISOString(),
      }));
    } else {
      setStatus((prev: Status | null) => ({
        ...prev,
        endDate: value.toISOString(),
      }));
    }
  };

  const [diffDay, setDiffDay] = useState(0);

  useEffect(() => {
    if (status?.startDate && status?.endDate) {
      const startDateObj = dayjs(status?.startDate);
      const endDateObj = dayjs(status?.endDate);
      const differenceMs = Math.abs(endDateObj.diff(startDateObj, 'millisecond'));
      const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
      setDiffDay(differenceDays);
      console.log(differenceDays);
    }
  }, [status?.startDate, status?.endDate]);

  return (
    <>
      <Box sx={{ backgroundColor: '#F6F6F6', m: 1, p: 2, borderRadius: '5px' }}>
        <Grid container>
          <FormControl>
            <Typography>Duration {diffDay > 1 ?? `: ${diffDay} days`}</Typography>
            <Stack direction='row' justifyContent='center' alignItems='center'>
              <DatePicker
                value={dayjs(status?.startDate).toDate()}
                onChange={(e) => setDate(e ?? new Date(), 'startDate')}
              />
              <ArrowRight />
              <DatePicker
                value={dayjs(status?.endDate).toDate()}
                onChange={(e) => setDate(e ?? new Date(), 'endDate')}
              />
            </Stack>
          </FormControl>
        </Grid>
      </Box>
      <Box display='flex' flexDirection='column' paddingX={3}>
        <FormControl>
          <Typography>Set a status</Typography>
          <Autocomplete
            clearIcon={true}
            options={[]}
            value={status?.type}
            onChange={(_, value) => {
              setStatus((prev: Status | null) => ({
                ...prev,
                ['type']: value,
              }));
            }}
            freeSolo
            renderInput={(params) => <TextField {...params} variant='outlined' fullWidth />}
          />
          {status?.type == '' || status?.type == null && (
            <List>
              {statusTypes.map((t) => (
                <ListItem
                  sx={{cursor: 'pointer', bgcolor: '#E2E5E7', borderRadius: '5px', marginY: 0.3, '&:hover': {bgcolor: '#E3E9EC'}}}
                  key={t.title}
                  onClick={() =>
                    setStatus((prev: Status | null) => ({
                      ...prev,
                      ['type']: t.title,
                    }))
                  }
                >
                  <ListItemIcon>{t.icon}</ListItemIcon>
                  <ListItemText>{t.title}</ListItemText>
                </ListItem>
              ))}
            </List>
          )}
        </FormControl>

        <FormControl sx={{ py: 2 }}>
          <Typography>Assigned to</Typography>
          <Autocomplete
            clearIcon={false}
            options={[]}
            freeSolo
            value={status?.assignee}
            onChange={(_, value) =>
              setStatus((prev: Status | null) => ({
                ...prev,
                ['assignee']: value,
              }))
            }
            renderInput={(params) => (
              <TextField
                {...params}
                variant='outlined'
                fullWidth
              />
            )}
          />
        </FormControl>
      </Box>
    </>
  );
};

export default StatusTab;
