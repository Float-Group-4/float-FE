import { SxProps } from '@mui/material';
import { LocalizationProvider, DesktopDatePicker } from '@mui/x-date-pickers';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import dayjs, { Dayjs } from 'dayjs';

//import dayjs from 'dayjs';

interface DatePickerProps {
  inputFormat?: string;
  value: Date | string | null;
  onChange: (date: Date | null) => void;
  disabled?: boolean;
  size?: 'small' | 'medium';
  minDate?: any; // set minDate for schedule can not select day in past
  fullWidth?: boolean;
  inputSx?: SxProps;
  views?: Array<'day' | 'month' | 'year'>;
  openTo?: 'day' | 'month' | 'year';
  disablePast?: boolean;
  shouldDisableDate?: (day: dayjs.Dayjs) => boolean;
}

const DatePicker = (props: DatePickerProps) => {
  const {
    inputFormat = 'MM/DD/YYYY',
    value,
    onChange,
    disabled,
    size = 'medium',
    minDate,
    fullWidth = true,
    inputSx,
    views,
    openTo,
    disablePast = false,
    shouldDisableDate,
  } = props;
  // date format from setting
  // change condition get format to use when get year only or date, month only
  // const dateFormat = inputFormat && inputFormat !== 'MM/DD/YYYY' ? inputFormat : window?.dateFormat?.dateFormat || inputFormat;
  const dateFormat = inputFormat;

  return (
    <LocalizationProvider dateAdapter={AdapterDayjs}>
      <DesktopDatePicker
        sx={{ width: fullWidth ? '100%' : 'auto', ...inputSx }}
        //label="Date Desktop"
        format={dateFormat}
        value={dayjs(value)}
        onChange={(val: Dayjs | null) => onChange(val ? val.toDate() : null)}
        // renderInput={(params) => <TextField size={size} fullWidth={fullWidth} sx={{ ...inputSx }} {...params} />}
        disabled={disabled}
        minDate={minDate}
        views={views}
        openTo={openTo}
        disablePast={disablePast}
        shouldDisableDate={shouldDisableDate}
      />
    </LocalizationProvider>
  );
};

export default DatePicker;
