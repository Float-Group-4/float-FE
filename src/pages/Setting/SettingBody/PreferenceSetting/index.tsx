import {
  Button,
  Card,
  Checkbox,
  FormControl,
  FormControlLabel,
  FormHelperText,
  Grid,
  Input,
  InputAdornment,
  InputLabel,
  List,
  ListItem,
  ListItemButton,
  MenuItem,
  OutlinedInput,
  Select,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { Box } from '@mui/material';
import React, { useState } from 'react';
import days, { DayOfWeek } from '../models';

const PreferenceSetting = () => {
  const [timeZone, setTimeZone] = useState(0);
  const [startOfWeek, setStartOfWeek] = useState(0);

  const [dayOfWeek, setDayOfWeek] = useState(days);
  const [timeFormat, setTimeFormat] = useState(0);

  const handleCheckBox = (dayOfWeekName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setDayOfWeek((prevDayOfWeek) => {
      const tempData = [...prevDayOfWeek];
      const updatedDayOfWeek = tempData.find((day) => day.name === dayOfWeekName);
      if (!updatedDayOfWeek) return tempData;
      updatedDayOfWeek.included = event.target.checked;
      return [...tempData];
    });
  };

  const handleHourInput = (
    dayOfWeekName: string,
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ) => {
    setDayOfWeek((prevDayOfWeek) => {
      const tempData = [...prevDayOfWeek];
      const updatedDayOfWeek = tempData.find((day) => day.name === dayOfWeekName);
      if (!updatedDayOfWeek) return tempData;
      updatedDayOfWeek.hourPerDay = event.target.value as unknown as number;
      return [...tempData];
    });
  };

  const numOfDay = dayOfWeek.length;

  return (
    <Box marginBottom={3}>
      <Typography variant='h2' fontWeight={500}>
        Hours & currency
      </Typography>
      <Typography paddingY={2} variant='h5' fontWeight={400}>
        Update your team's scheduled working hours.
      </Typography>
      <Box
        borderRadius={3}
        border='0.1px solid #D3D3D3'
        paddingX={4}
        paddingY={3}
        display='flex'
        flexDirection='column'
        justifyContent='space-evenly'
      >
        <Typography variant='h4' fontWeight={500}>
          Work schedule
        </Typography>
        <Stack direction='row' spacing={2} paddingY={2}>
          <FormControl fullWidth size='medium'>
            <Typography variant='caption' fontWeight={450}>
              Timezone
            </Typography>
            <Select
              sx={{ my: 1 }}
              value={timeZone}
              onChange={(e) => setTimeZone(e.target.value as number)}
              fullWidth
            >
              <MenuItem value={0}>(GMT-05:00) Eastern Time (US & Canada)</MenuItem>
              <MenuItem value={1}>(GMT-06:00) Central Time (US & Canada)</MenuItem>
              <MenuItem value={2}>(GMT-07:00) Mountain Time (US & Canada)</MenuItem>
            </Select>
            <FormHelperText sx={{ m: 0 }}>
              The time zone setting is used for notifications by default.
            </FormHelperText>
          </FormControl>
          <FormControl fullWidth size='medium'>
            <Typography variant='caption' fontWeight={450}>
              Start week on
            </Typography>
            <Select
              sx={{ my: 1 }}
              value={startOfWeek}
              onChange={(e) => setStartOfWeek(e.target.value as number)}
              fullWidth
            >
              <MenuItem value={0}>Sunday</MenuItem>
              <MenuItem value={1}>Monday</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        <FormControl fullWidth sx={{ py: 2 }}>
          <Typography>Work days</Typography>
          <List>
            {dayOfWeek.map((value, index) => (
              <ListItem
                key={index}
                sx={{
                  bgcolor: index % 2 == 0 ? '#EFEFEF' : 'inherit',
                  display: 'flex',
                  m: 0,
                  borderRadius: '8px',
                  justifyContent: 'space-between',
                }}
              >
                <FormControlLabel
                  control={
                    <Checkbox
                      disableTouchRipple
                      disableRipple
                      disableFocusRipple
                      checked={value.included}
                      onChange={(e) => handleCheckBox(value.name, e)}
                    />
                  }
                  label={value.name}
                />
                {value.included && (
                  <FormControl sx={{ width: '10ch' }} variant='outlined' fullWidth>
                    <OutlinedInput
                      size='small'
                      sx={{ bgcolor: '#FAFAFA' }}
                      value={value.hourPerDay}
                      onChange={(e) => handleHourInput(value.name, e)}
                      inputProps={{ inputMode: 'numeric', pattern: '[0-9]*' }}
                      endAdornment={<InputAdornment position='end'>h</InputAdornment>}
                    />
                  </FormControl>
                )}
              </ListItem>
            ))}
          </List>
        </FormControl>
        <FormControl sx={{ py: 2 }}>
          <Typography variant='body2' fontWeight='500'>
            Time format
          </Typography>
          <Select
            size='medium'
            sx={{ mt: 1 }}
            value={timeFormat}
            onChange={(e) => setTimeFormat(e.target.value as number)}
          >
            <MenuItem value={0}>12-hour clock</MenuItem>
            <MenuItem value={1}>24-hour clock</MenuItem>
          </Select>
        </FormControl>
        <Button
          variant='contained'
          sx={{
            mt: 1,
            mb: 3,
            width: '10%',
            whiteSpace: 'nowrap',
          }}
          size='medium'
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default PreferenceSetting;
