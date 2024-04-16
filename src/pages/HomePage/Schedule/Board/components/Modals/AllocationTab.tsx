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
  Tooltip,
} from '@mui/material';
import { LocalizationProvider, TimeField } from '@mui/x-date-pickers';
import { ChangeEvent, SetStateAction, useEffect, useMemo, useState } from 'react';
import { Allocation } from '../../common/type';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { useScheduleContext } from '@pages/HomePage/Schedule/ScheduleContext';
import dayjs from 'dayjs';
import { useAppSelector } from '@hooks/reduxHooks';
import { isWeekend } from '../../../../../../utilities/date';

const AllocationTab = () => {
  const { allocation, setAllocation } = useScheduleContext();
  const usersByIds = useAppSelector((state) => state.general.usersById);
  const teamProjects = useAppSelector((state) => state.general.teamProjects);
  const teamProjectTasks = useAppSelector((state) => state.general.teamProjectTasks);

  const projects = useMemo(() => {
    const result = (Object.values(teamProjects) || []).map((project) => {
      return {
        label: project.name,
        id: project.id,
      };
    });
    return result;
  }, [teamProjects]);

  const userOptions = useMemo(() => {
    const optionsObj = (Object.values(usersByIds) || []).map((user: any) => {
      return { label: user.name, id: user.id };
    });
    return optionsObj;
  }, [usersByIds]);

  const projectTasks = useMemo(() => {
    if (!allocation?.projectId?.id || !teamProjectTasks[`${allocation?.projectId?.id}`]) return [];
    const result = teamProjectTasks[`${allocation.projectId.id}`].map(
      (task: { id: string; name: string; projectId: string }) => {
        return { label: task.name, id: task.id };
      },
    );
    return result;
  }, [allocation?.projectId]);

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
    }
  }, [allocation?.startDate, allocation?.endDate]);

  const handleTime = (e: { target: { value: string } }) => {
    const inputValue = e.target.value.trim();
    let value: number;
    if (inputValue === '') {
      value = 1;
    } else {
      value = parseFloat(inputValue);
      if (isNaN(value) || value <= 0 || value > 24) {
        value = 1;
      }
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

  const setDate = (value: Date | null, type: string) => {
    if (!value || value == null || !dayjs(value).isValid()) {
      value = new Date();
    }

    if (type == 'startDate') {
      setAllocation((prev: Allocation | null) => ({
        ...prev,
        startDate: dayjs(value).format('DD MMM YYYY'),
      }));
    } else {
      setAllocation((prev: Allocation | null) => ({
        ...prev,
        endDate: dayjs(value).format('DD MMM YYYY'),
      }));
    }
  };

  const setTime = (value: Date | number | null, type: string) => {
    if (value == null) {
      value = new Date().getTime();
    }

    setAllocation((prevAllocation: any) => {
      if (type === 'startTime') {
        return {
          ...prevAllocation,
          startTime: value,
        };
      } else if (type === 'endTime') {
        return {
          ...prevAllocation,
          endTime: value,
        };
      }
      return prevAllocation;
    });
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
                          value={allocation?.startTime ?? 8}
                          onChange={(e) => setTime(e, 'startTime')}
                        />
                        <TimeField
                          value={allocation?.endTime ?? 18}
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
                <Stack direction='row' justifyItems='left' spacing={2}>
                  <FormControl>
                    <Typography>Hours/day</Typography>
                    <TextField
                      variant='standard'
                      value={allocation?.hourEachDay}
                      name='time'
                      onChange={handleTime}
                    />
                  </FormControl>
                  {diffDay > 1 && (
                    <FormControl>
                      <Typography>Total hours</Typography>
                      <TextField
                        variant='standard'
                        value={(allocation?.hourEachDay ?? 8) * diffDay}
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
          <Grid item xs={7}>
            <FormControl>
              <Typography>Duration {diffDay > 1 && `: ${diffDay} days`}</Typography>
              <Stack direction='row' alignItems='center' justifyContent='center'>
                <DatePicker
                  shouldDisableDate={isWeekend}
                  inputSx={{ fontSize: '15px' }}
                  value={dayjs(allocation?.startDate).toDate()}
                  onChange={(e) => setDate(e ?? new Date(), 'startDate')}
                />
                <ArrowRight />
                <DatePicker
                  shouldDisableDate={isWeekend}
                  value={dayjs(allocation?.endDate).toDate()}
                  onChange={(e) => setDate(e ?? new Date(), 'endDate')}
                />
              </Stack>
              <Select
                value={0}
                size='small'
                sx={{ width: '40%' }}
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
            options={projects}
            freeSolo
            isOptionEqualToValue={(option, value) => {
              return option?.id === value?.id;
            }}
            onChange={(_, value) => {
              setAllocation((prev: Allocation | null) => ({
                ...prev,
                ['projectId']: value,
              }));
            }}
            renderInput={(params) => (
              <TextField {...params} variant='outlined' fullWidth value={allocation?.projectId} />
            )}
          />
          <Typography>Task</Typography>
          <Tooltip
            title={!allocation?.projectId ? 'Please choose project first' : ''}
            arrow
            placement='top'
          >
            <Autocomplete
              clearIcon={true}
              options={projectTasks}
              disabled={!allocation?.projectId}
              onChange={(_, value) => {
                setAllocation((prev: Allocation | null) => ({
                  ...prev,
                  ['taskId']: value,
                }));
              }}
              renderInput={(params) => (
                <TextField {...params} variant='outlined' fullWidth value={allocation?.projectId} />
              )}
            />
          </Tooltip>
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
            options={userOptions}
            value={allocation?.assignees}
            freeSolo
            isOptionEqualToValue={(option, value) => {
              return option?.id === value?.id;
            }}
            onChange={(_, value) => {
              setAllocation((prev: Allocation | null) => ({
                ...prev,
                ['assignees']: value,
              }));
            }}
            renderInput={(params) => <TextField {...params} variant='outlined' fullWidth />}
          />
        </FormControl>
      </Box>
    </>
  );
};

export default AllocationTab;
