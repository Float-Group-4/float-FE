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
  InputAdornment,
} from '@mui/material';
import { useScheduleContext } from '@pages/HomePage/Schedule/ScheduleContext';
import dayjs from 'dayjs';
import { useState, useEffect, ChangeEvent, useMemo } from 'react';
import { Status } from '../../common/type';
import { useAppSelector } from '@hooks/reduxHooks';
import DatePicker from '@base/components/DatePicker';
import { isWeekend } from '../../../../../../utilities/date';

const StatusTab = () => {
  const { status, setStatus } = useScheduleContext();
  const statusTypesDB = useAppSelector((state) => state.general.statusTypes);
  const usersByIds = useAppSelector((state) => state.general.usersById);
  const userOptions = useMemo(() => {
    const optionsObj = (Object.values(usersByIds) || []).map((user: any) => {
      return { label: user.name, id: user.id };
    });
    return optionsObj;
  }, [usersByIds]);

  const statusTypes = useMemo(() => {
    const result = (Object.values(statusTypesDB) || []).map((type) => {
      return {
        label: type.name,
        id: type.id,
        color: type.color,
      };
    });
    return result;
  }, [statusTypesDB]);

  const setValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setStatus((prev: Status | null) => ({
      ...prev,
      [`${name}`]: value,
    }));
  };

  const setDate = (value: Date, type: string) => {
    if (!value || value == null || !dayjs(value).isValid()) {
      value = new Date();
    }

    if (type == 'startDate') {
      setStatus((prev: Status | null) => ({
        ...prev,
        startDate: dayjs(value).format('DD MMM YYYY'),
      }));
    } else {
      setStatus((prev: Status | null) => ({
        ...prev,
        endDate: dayjs(value).format('DD MMM YYYY'),
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
                inputSx={{ fontSize: '15px' }}
                shouldDisableDate={isWeekend}
                value={dayjs(status?.startDate).toDate()}
                onChange={(e) => setDate(e ?? new Date(), 'startDate')}
              />
              <ArrowRight />
              <DatePicker
                inputSx={{ fontSize: '15px' }}
                shouldDisableDate={isWeekend}
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
          <TextField
            variant='outlined'
            name='name'
            InputProps={{
              startAdornment: (
                <InputAdornment position='start' sx={{ padding: 0, margin: 0 }}>
                  <Flag style={{ color: status?.color || 'blue' }} />
                </InputAdornment>
              ),
            }}
            fullWidth
            value={status?.name}
            onChange={setValue}
          />
          {(status?.name == '' || status?.name == null) && (
            <List>
              {statusTypes.map((t: any) => {
                return (
                  <ListItem
                    sx={{
                      cursor: 'pointer',
                      bgcolor: '#F2F2F2',
                      borderRadius: '5px',
                      marginY: 0.3,
                      '&:hover': { bgcolor: '#E3E9EC' },
                    }}
                    key={t.id}
                    onClick={() =>
                      setStatus((prev: Status | null) => ({
                        ...prev,
                        ['name']: t.label,
                        ['color']: t.color,
                        ['type']: t.id,
                      }))
                    }
                  >
                    <ListItemIcon className='me-4'>
                      <Flag sx={{ color: t.color }} />
                    </ListItemIcon>
                    <ListItemText>{t.label}</ListItemText>
                  </ListItem>
                );
              })}
            </List>
          )}
        </FormControl>

        <FormControl sx={{ py: 2 }}>
          <Typography>Assigned to</Typography>
          <Autocomplete
            clearIcon={false}
            options={userOptions}
            value={status?.assignee}
            isOptionEqualToValue={(option, value) => {
              return option.id === value.id;
            }}
            onChange={(_, value) => {
              setStatus((prev: Status | null) => ({
                ...prev,
                ['assignee']: value,
              }));
            }}
            renderInput={(params) => <TextField {...params} variant='outlined' fullWidth />}
          />
        </FormControl>
      </Box>
    </>
  );
};

export default StatusTab;
