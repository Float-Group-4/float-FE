import DatePicker from '@base/components/DatePicker';
import { ArrowRight } from '@mui/icons-material';
import {
  Box,
  Typography,
  TextField,
  Button,
  Stack,
  FormControl,
  ToggleButton,
  ToggleButtonGroup,
  Autocomplete,
  Chip,
  Grid,
  Select,
  MenuItem,
  OutlinedInput,
} from '@mui/material';
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { ChangeEvent, SetStateAction, useEffect, useState } from 'react';
import { Allocation } from '../../common/type';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useScheduleContext } from '@pages/HomePage/Schedule/ScheduleContext';
import dayjs from 'dayjs';
import { useAppSelector } from '@hooks/reduxHooks';

const AllocationTab = () => {
  const { allocation, setAllocation } = useScheduleContext();
  const usersByIds = useAppSelector((state) => state.general.usersById);

  const [isSpecificTime, setIsSpecificTime] = useState<boolean>(
    allocation?.endTime != null && allocation?.startTime != null,
  );

  const [diffDay, setDiffDay] = useState(0);

  useEffect(() => {
    if (allocation?.startDate && allocation?.endDate) {
      const startDateObj = dayjs(allocation?.startDate);
      const endDateObj = dayjs(allocation?.endDate);
      const differenceMs = Math.abs(endDateObj.diff(startDateObj, 'millisecond'));
      const differenceDays = Math.ceil(differenceMs / (1000 * 60 * 60 * 24));
      setDiffDay(differenceDays);
      console.log(differenceDays);
    }
  }, [allocation?.startDate, allocation?.endDate]);

  const handleTime = (e: { target: { value: string } }) => {
    console.log(e.target.value);
    let value = parseInt(e.target.value ?? 0.1);
    if (value <= 0) {
      value = 0.1;
    } else if (value > 24) {
      value = 24;
    }

    setAllocation((prev: Allocation | null) => ({
      ...prev,
      hourEachDay: value,
    }));
  };

  const handleTypeChange = (event: any, newValue: SetStateAction<string>) => {
    setAllocation((prev: Allocation) => ({
      ...prev,
      ['type']: newValue,
    }));
  };

  const setValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setAllocation((prev: Allocation | null) => ({
      ...prev,
      [`${name}`]: value,
    }));
  };

  const setDate = (value: Date, type: string) => {
    if (type == 'startDate') {
      setAllocation((prev: Allocation | null) => ({
        ...prev,
        startDate: value.toISOString(),
      }));
    } else {
      setAllocation((prev: Allocation | null) => ({
        ...prev,
        endDate: value.toISOString(),
      }));
    }
  };

  const setTime = (value: Date | number, type: string) => {
    if (type == 'startTime') {
      setAllocation((prev: Allocation | null) => ({
        ...prev,
        startTime: value,
      }));
    } else {
      setAllocation((prev: Allocation | null) => ({
        ...prev,
        endTime: value,
      }));
    }
  };

  return (
    <>
      <Box sx={{ backgroundColor: '#F6F6F6', m: 1, p: 2, borderRadius: '5px' }}>
        <Grid container columnGap={1}>
          <Grid item xs={5}>
            {isSpecificTime ? (
              <div>
                <Box display='flex' flexDirection='column'>
                  <FormControl>
                    <Typography>Time</Typography>
                    <Stack direction='row' spacing={1}>
                      <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <TimeField
                          value={allocation?.startTime}
                          onChange={(e) => setTime(e ?? 10, 'startTime')}
                        />
                        <TimeField
                          value={allocation?.endTime}
                          onChange={(e) => setTime(e ?? 24, 'endTime')}
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
                    <TextField
                      value={allocation?.hourEachDay}
                      name='time'
                      inputMode='decimal'
                      onChange={handleTime}
                    />
                  </FormControl>
                  {diffDay > 1 && (
                    <FormControl>
                      <Typography>Total hours</Typography>
                      <TextField
                        value={(allocation?.hourEachDay ?? 8) * diffDay}
                        inputMode='decimal'
                        onChange={setValue}
                      />
                    </FormControl>
                  )}
                </Stack>
                <Button
                  size='small'
                  sx={{ py: 0, mb: 0, mt: 1 }}
                  onClick={() => setIsSpecificTime(true)}
                >
                  Specific time
                </Button>
              </div>
            )}
          </Grid>
          <Grid item xs={6}>
            <FormControl>
              <Typography>Duration {diffDay > 1 ?? `: ${diffDay} days`}</Typography>
              <Stack direction='row' alignItems='center' justifyContent='center'>
                <DatePicker
                  value={dayjs(allocation?.startDate).toDate()}
                  onChange={(e) => setDate(e ?? new Date(), 'startDate')}
                />
                <ArrowRight />
                <DatePicker
                  value={dayjs(allocation?.endDate).toDate()}
                  onChange={(e) => setDate(e ?? new Date(), 'endDate')}
                />
              </Stack>
              <Select
                value={0}
                size='small'
                sx={{ width: '40%'}}
                input={<OutlinedInput margin='dense' />}
              >
                <MenuItem value={0}>Does not repeat</MenuItem>
              </Select>
            </FormControl>
          </Grid>
        </Grid>
      </Box>
      <Box display='flex' flexDirection='column' paddingX={3}>
        <FormControl>
          <Typography>Project</Typography>
          <Autocomplete
            clearIcon={true}
            options={[]}
            value={allocation?.projectId}
            onChange={(_, value) => {
              setAllocation((prev: Allocation | null) => ({
                ...prev,
                ['projectId']: value,
              }));
            }}
            freeSolo
            renderInput={(params) => <TextField {...params} variant='outlined' fullWidth />}
          />
          <Stack direction='row' justifyContent='space-between'>
            <Button size='small' sx={{ py: 0, mb: 0, mt: 1 }}>
              Add task
            </Button>
            <Button size='small' sx={{ py: 0, mb: 0, mt: 1 }}>
              Edit project
            </Button>
          </Stack>
        </FormControl>

        <ToggleButtonGroup
          value={allocation?.type}
          exclusive
          sx={{ py: 2 }}
          color='primary'
          onChange={handleTypeChange}
          aria-label='text alignment'
        >
          <ToggleButton value='completed' aria-label='left aligned'>
            Completed
          </ToggleButton>
          <ToggleButton value='tentative' aria-label='centered'>
            Tentative
          </ToggleButton>
        </ToggleButtonGroup>
        <FormControl>
          <Typography>Notes</Typography>
          <TextField
            multiline
            name='note'
            placeholder='Add details specific to this allocation'
            value={allocation?.note}
            onChange={setValue}
            minRows={3}
            maxRows={20}
          />
        </FormControl>
        <FormControl sx={{ py: 2 }}>
          <Typography>Assigned to</Typography>
          <Autocomplete
            clearIcon={false}
            options={['hello', 'hii']}
            freeSolo
            multiple
            value={allocation?.assignees}
            onChange={(_, value) =>
              setAllocation((prev: Allocation | null) => ({
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

export default AllocationTab;
