import { ArrowRight } from '@mui/icons-material';
import {
  Box,
  Grid,
  FormControl,
  Typography,
  Stack,
  Button,
  TextField,
  Autocomplete,
  ToggleButtonGroup,
  ToggleButton,
  Chip,
  AutocompleteRenderInputParams,
} from '@mui/material';
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useState, SetStateAction, ChangeEvent, useEffect, ReactNode } from 'react';
import { TimeOff } from '../../common/type';
import { useScheduleContext } from '@pages/HomePage/Schedule/ScheduleContext';
import dayjs from 'dayjs';
import DatePicker from '@base/components/DatePicker';
import { useAppSelector } from '@hooks/reduxHooks';
import { isWeekend } from '../../../../../../utilities/date';

const timeOffReasons = [
  'Annual Leave',
  'Compassionate Leave',
  'Paid Time Off',
  'Parental Leave',
  'Public Holiday',
  'Sick Leave',
  'Unpaid Time Off',
];

const TimeOffTab = () => {
  const { timeOff, setTimeOff } = useScheduleContext();

  const [isSpecificTime, setIsSpecificTime] = useState<boolean>(
    timeOff?.endTime != null && timeOff?.startTime != null,
  );

  const usersByIds = useAppSelector((state) => state.general.usersById);
  const [diffDay, setDiffDay] = useState(0);

  useEffect(() => {
    if (timeOff?.startDate && timeOff?.endDate) {
      const startDateObj = dayjs(timeOff?.startDate);
      const endDateObj = dayjs(timeOff?.endDate);
      const differenceMs = Math.abs(endDateObj.diff(startDateObj, 'millisecond'));
      const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
      setDiffDay(differenceDays);
      console.log(differenceDays);
    }
  }, [timeOff?.startDate, timeOff?.endDate]);

  const handleTime = (e: { target: { value: string } }) => {
    const inputValue = e.target.value.trim();
    let value: number;
    if (inputValue === '') {
      value = 0.1;
    } else {
      value = parseFloat(inputValue);
      if (isNaN(value) || value <= 0 || value > 24) {
        value = 0.1;
      }
    }

    setTimeOff((prev: TimeOff | null) => ({
      ...prev,
      hourEachDay: value,
    }));
  };

  const setValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setTimeOff((prev: TimeOff | null) => ({
      ...prev,
      [`${name}`]: value,
    }));
  };

  const setDate = (value: Date, type: string) => {
    if (!value || value == null || !dayjs(value).isValid()) {
      value = new Date();
    }

    if (type == 'startDate') {
      setTimeOff((prev: TimeOff | null) => ({
        ...prev,
        startDate: dayjs(value).format('DD MMM YYYY'),
      }));
    } else {
      setTimeOff((prev: TimeOff | null) => ({
        ...prev,
        endDate: dayjs(value).format('DD MMM YYYY'),
      }));
    }
  };

  const setTime = (value: Date | number | null, type: string) => {
    if (value == null) {
      value = new Date().getTime();
    }

    if (type == 'startTime') {
      setTimeOff((prev: TimeOff | null) => ({
        ...prev,
        startTime: value,
      }));
    } else {
      setTimeOff((prev: TimeOff | null) => ({
        ...prev,
        endTime: value,
      }));
    }
  };

  return (
    <>
      <Box sx={{ backgroundColor: '#F6F6F6', m: 1, p: 2, borderRadius: '5px' }}>
        <Grid container columnGap={1} spacing={2}>
          <Grid item xs={4}>
            {isSpecificTime ? (
              <div>
                <Box display='flex' flexDirection='column'>
                  <FormControl>
                    <Typography>Time</Typography>
                    <Stack direction='row' spacing={1}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimeField
                          value={timeOff?.startTime ?? 8}
                          onChange={(e) => setTime(e, 'startTime')}
                        />
                        <TimeField
                          value={timeOff?.endTime ?? 18}
                          onChange={(e) => setTime(e, 'endTime')}
                        />
                      </LocalizationProvider>
                    </Stack>
                  </FormControl>
                </Box>
                <Button size='small' onClick={() => setIsSpecificTime(false)}>
                  Total hours
                </Button>
              </div>
            ) : (
              <div>
                <Stack direction='row' justifyItems='left' spacing={1}>
                  <FormControl>
                    <Typography>Hours/day</Typography>
                    <TextField variant='standard' value={timeOff?.hourEachDay} name='time' onChange={handleTime} />
                  </FormControl>
                  {diffDay > 1 && (
                    <FormControl>
                      <Typography>Total hours</Typography>
                      <TextField variant='standard' value={(timeOff?.hourEachDay ?? 8) * diffDay} />
                    </FormControl>
                  )}
                </Stack>
                <Button size='small' onClick={() => setIsSpecificTime(true)}>
                  Specific time
                </Button>
              </div>
            )}
          </Grid>
          <Grid item xs={7}>
            <FormControl>
              <Typography>Duration {diffDay > 1 && `: ${diffDay} days`}</Typography>
              <Stack direction='row' alignItems='center' justifyContent='center'>
                <DatePicker
                  shouldDisableDate={isWeekend}
                  value={dayjs(timeOff?.startDate).toDate()}
                  onChange={(e) => setDate(e ?? new Date(), 'startDate')}
                />
                <ArrowRight />
                <DatePicker
                  shouldDisableDate={isWeekend}
                  value={dayjs(timeOff?.endDate).toDate()}
                  onChange={(e) => setDate(e ?? new Date(), 'endDate')}
                />
              </Stack>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Box paddingX={3}>
        <FormControl fullWidth>
          <Typography>Time off</Typography>
          <Autocomplete
            fullWidth
            clearIcon=''
            options={timeOffReasons}
            value={timeOff?.reason}
            onChange={(e, newValue) => {
              setTimeOff((prev: any) => ({
                ...prev,
                reason: newValue,
              }));
            }}
            isOptionEqualToValue={(option, value) => option == value}
            renderInput={(params) => (
              <TextField {...params} value={timeOff?.reason} name='reason' />
            )}
          />
        </FormControl>
      </Box>
      <Box display='flex' flexDirection='column' paddingX={3}>
        <ToggleButton
          value='tentative'
          selected={timeOff?.isTentative}
          color='primary'
          onChange={() =>
            setTimeOff((prev: any) => ({
              ...prev,
              isTentative: !timeOff?.isTentative,
            }))
          }
          aria-label='centered'
          sx={{
            alignSelf: 'flex-start',
            marginTop: 1,
            paddingX: 2,
            paddingY: 0.8,
            bgcolor: '#E5E5E5 !important',
            '&.Mui-selected': {
              bgcolor: '#B0D9FB !important',
              color: 'black',
              '&:hover': { bgcolor: '#B0D9FB !important', color: 'black' },
            },
          }}
        >
          Tentative
        </ToggleButton>

        <FormControl sx={{ paddingTop: 1 }}>
          <Typography>Notes</Typography>
          <TextField
            multiline
            name='note'
            placeholder='Add details specific to this timeOff'
            value={timeOff?.note}
            onChange={setValue}
            minRows={3}
            maxRows={20}
          />
        </FormControl>
        <FormControl sx={{ py: 2 }}>
          <Typography>Assigned to</Typography>
          <Autocomplete
            clearIcon={false}
            options={[]}
            freeSolo
            multiple
            value={timeOff?.assignees}
            onChange={(_, value) =>
              setTimeOff((prev: TimeOff | null) => ({
                ...prev,
                ['assignees']: value,
              }))
            }
            renderTags={(value, props) =>
              value.map((option, index) => <Chip label={option} {...props({ index })} />)
            }
            renderInput={(params) => <TextField {...params} variant='outlined' fullWidth />}
          />
        </FormControl>
      </Box>
    </>
  );
};

export default TimeOffTab;
