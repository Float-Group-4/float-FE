import {
  Autocomplete,
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
  SelectChangeEvent,
  Stack,
  TextField,
  ToggleButton,
  ToggleButtonGroup,
  Typography,
} from '@mui/material';
import { Box } from '@mui/material';
import React, { useEffect, useState } from 'react';
import days, { DayOfWeek } from '../models';
import axios from 'axios';
import moment from 'moment-timezone';
import CurrencyList from 'currency-list';
import { log } from 'console';

interface Preference {
  workDay: string;
  id: string;
  teamId: string;
  currency: string;
  timeZone: string;
  startWeek: string;
  timeFormat: string;
  isShowWeekend: boolean;
}

const PreferenceSetting = () => {
  const userId = 'cf428502-1658-4fd1-b402-d06251d2a38d';
  const baseURL = 'http://localhost:4000';
  const [data, setData] = useState<Preference>();
  const [timeZone, setTimeZone] = useState('');
  const [startOfWeek, setStartOfWeek] = useState('Monday');
  const [dayOfWeek, setDayOfWeek] = useState(days);
  const [timeFormat, setTimeFormat] = useState('12');
  const [timeZoneList, setTimeZoneList] = useState<string[]>([]);
  const [selectedCurrency, setSelectedCurrency] = useState<string>('');
  const [currencyList, setCurrencyList] = useState<string[]>([]);
  const [isShowWeekend, setIsShowWeekend] = useState<boolean>(true);

  useEffect(() => {
    fetchData();
    fetchTimeZoneList();
    const formattedCurrencyList = formatCurrencyList();
    setCurrencyList([...formattedCurrencyList, 'No Currency']);
  }, []);

  useEffect(() => {
    if (data) {
      setTimeFormat(data.timeFormat);
      setTimeZone(data.timeZone);
      setStartOfWeek(data.startWeek);
      setSelectedCurrency(data.currency);
      setIsShowWeekend(data.isShowWeekend);
      const workDays = data.workDay;
      const initialDayOfWeek = days.map((day) => ({
        name: day.name,
        included: workDays.includes(day.name),
        hourPerDay: 8,
      }));

      setDayOfWeek(initialDayOfWeek);
    }
  }, [data]);

  const fetchTimeZoneList = () => {
    const list = moment.tz.names();
    setTimeZoneList(list);
  };

  const fetchData = async () => {
    try {
      const response = await axios.get(`${baseURL}/settings/${userId}`);
      const newData = response.data;
      var result: Preference = {
        workDay: newData.workDay.split(', '),
        id: newData.id,
        teamId: newData.teamId,
        startWeek: newData.startWeek,
        currency: newData.currency,
        timeZone: newData.timeZone,
        timeFormat: newData.timeFormat,
        isShowWeekend: newData.isShowWeekend,
      };
      setData(result);
    } catch (e) {
      console.log('error: ' + e);
    }
  };

  const handleTimeFormatChange = (e: any) => {
    setTimeFormat(e.target.value as string);
  };

  const handleCheckBox = (dayOfWeekName: string, event: React.ChangeEvent<HTMLInputElement>) => {
    setDayOfWeek((prevDayOfWeek) => {
      return prevDayOfWeek.map((day) => {
        if (day.name === dayOfWeekName) {
          return {
            ...day,
            included: event.target.checked,
          };
        }
        return day;
      });
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

  const formatCurrencyList = () => {
    const currencies = CurrencyList.getAll().en;
    const formattedCurrencies: { [code: string]: { name: string; code: string } } = {};

    for (let currencyCode in currencies) {
      const currencyName = CurrencyList.get(currencyCode).name;
      formattedCurrencies[currencyCode] = { name: currencyName, code: currencyCode };
    }

    return Object.values(formattedCurrencies).map(
      (currency) => `${currency.code} - ${currency.name}`,
    );
  };

  const handleCurrencyChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
    setSelectedCurrency(newValue ? newValue : '');
  };

  const handleTimeZoneChange = (event: React.ChangeEvent<{}>, newValue: string | null) => {
    setTimeZone(newValue ? newValue : '');
  };

  const handleShowWeekendChange = (
    event: React.MouseEvent<HTMLElement>,
    newShowWeekend: boolean,
  ) => {
    setIsShowWeekend(newShowWeekend);
  };

  const handleUpdate = async () => {
    try {
      const workDay = dayOfWeek
        .filter((day) => day.included)
        .map((day) => day.name)
        .join(', ');
      const updatePreference: Preference = {
        workDay: workDay,
        id: data ? data.id : '1',
        teamId: data ? data.teamId : '1',
        currency: selectedCurrency,
        timeZone: timeZone,
        startWeek: startOfWeek,
        timeFormat: timeFormat,
        isShowWeekend: isShowWeekend,
      };
      console.log(updatePreference);

      const response = await axios.patch(`${baseURL}/settings/${userId}`, updatePreference);
      console.log('response' + response);
    } catch (e) {
      console.log('error: ' + e);
    }
  };

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
            {/* Time Zone */}
            <Typography variant='caption' fontWeight={450}>
              Timezone
            </Typography>
            <Autocomplete
              sx={{ my: 1 }}
              options={timeZoneList}
              renderInput={(params) => <TextField {...params} />}
              value={timeZone}
              onChange={handleTimeZoneChange}
              fullWidth
              disableClearable
            />
            <FormHelperText sx={{ m: 0 }}>
              The time zone setting is used for notifications by default.
            </FormHelperText>
          </FormControl>
          {/* Start Week Day */}
          <FormControl fullWidth size='medium'>
            <Typography variant='caption' fontWeight={450}>
              Start week on
            </Typography>
            <Select
              sx={{ my: 1 }}
              value={startOfWeek}
              onChange={(e) => setStartOfWeek(e.target.value)}
              fullWidth
            >
              <MenuItem value={'Sunday'}>Sunday</MenuItem>
              <MenuItem value={'Monday'}>Monday</MenuItem>
            </Select>
          </FormControl>
        </Stack>
        {/* Work days */}
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
                      value={8}
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
        {/* Display Weekend */}
        <ToggleButtonGroup
          color='primary'
          value={isShowWeekend}
          exclusive
          onChange={handleShowWeekendChange}
          aria-label='Platform'
        >
          <ToggleButton value={true}>Show Weekend</ToggleButton>
          <ToggleButton value={false}>Don't show Weekend</ToggleButton>
        </ToggleButtonGroup>

        {/* Time Format */}
        <FormControl sx={{ py: 2 }}>
          <Typography variant='body2' fontWeight='500'>
            Time format
          </Typography>
          <Select
            size='medium'
            sx={{ mt: 1 }}
            value={timeFormat}
            onChange={(e) => handleTimeFormatChange(e)}
          >
            <MenuItem value={'12'}>12-hour clock</MenuItem>
            <MenuItem value={'24'}>24-hour clock</MenuItem>
          </Select>
        </FormControl>
        <FormControl fullWidth sx={{ py: 2 }}>
          <Typography variant='body2' fontWeight='500'>
            Currency
          </Typography>
          <Autocomplete
            size='medium'
            options={currencyList}
            renderInput={(params) => <TextField {...params} />}
            sx={{ mt: 1 }}
            value={selectedCurrency}
            onChange={handleCurrencyChange}
            disableClearable
          />
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
          onClick={handleUpdate}
        >
          Update
        </Button>
      </Box>
    </Box>
  );
};

export default PreferenceSetting;
