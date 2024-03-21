import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Stack,
  Button,
  Select,
  MenuItem,
  ClickAwayListener,
  Autocomplete,
  Chip,
  Popover,
  FormControl,
  List,
  ListItem,
  ListItemText,
  Paper,
  ButtonGroup,
} from '@mui/material';
import { ArrowDropDown, Close } from '@mui/icons-material';
import DatePicker from '@base/components/DatePicker';
import { PersonInfo } from '../models';

interface CustomTextFieldProps {
  placeHolder: string;
  showClearIcon: boolean;
  showDropdownIcon: boolean;
  name: string;
}

const CustomTextField: React.FC<CustomTextFieldProps> = ({
  placeHolder,
  showClearIcon,
  showDropdownIcon,
  name,
}) => {
  const [isOpen, setIsOpen] = useState(false);
  const [anchor, setAnchor] = useState<HTMLDivElement | null>(null);
  const [currentText, setCurrentText] = useState('');

  const handleClose = () => {
    setIsOpen(false);
    setAnchor(null);
  };

  const onInput = (e: React.ChangeEvent<HTMLInputElement>) => {
    setAnchor(e.currentTarget);
    setIsOpen(true);
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setCurrentText(e.target.value.trim());
  };

  return (
    <Box>
      <TextField
        size='medium'
        value={currentText}
        placeholder={placeHolder}
        onInput={onInput}
        onChange={handleChange}
        name={name}
        sx={{ maxWidth: '90%', minWidth: '100%' }}
        InputProps={{
          endAdornment: (
            <Stack direction='row'>
              {currentText.length > 0 && showClearIcon && (
                <IconButton onClick={handleClose}>
                  <Close />
                </IconButton>
              )}
              {showDropdownIcon && (
                <IconButton onClick={handleClose}>
                  <ArrowDropDown />
                </IconButton>
              )}
            </Stack>
          ),
        }}
      />
      <Popover
        id='simple-popover'
        open={isOpen}
        anchorEl={anchor}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <ClickAwayListener onClickAway={handleClose}>
          <Typography>
            <Button onClick={handleClose}>Add "{currentText}"</Button>
          </Typography>
        </ClickAwayListener>
      </Popover>
    </Box>
  );
};

interface AvailProp {
  info: PersonInfo;
  setInfo: (info: any) => void;
}

const AvailSubBody: React.FC<AvailProp> = ({ info, setInfo }) => {
  const [tags, setTags] = useState<string[]>([]);
  const today = new Date();
  const [startDate, setStartDate] = useState(today);
  const [endDate, setEndDate] = useState(today);

  const setValue = (
    event: { target: { name: any; value: any; }; },
  ): void => {
    const { name, value } = event.target;
    setInfo((prevInfo: any) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  console.log(info?.type);

  const handleDateChange = (date: any, isStart: boolean) => {
    try {
      if (!date || typeof date !== 'object' || !date.isValid()) {
        console.error('Invalid date:', date);
        return;
      }
      if (isStart) {
        setInfo((prev: any) => ({
          ...prev,
          availability: {
            ...prev.availability,
            startDate: date
          }
        }));
      } else {
        if (date.isBefore(startDate)) {
          setInfo((prev: any) => ({
            ...prev,
            availability: {
              ...prev.availability,
              startDate: date
            }
          }));
        }
        setInfo((prev: any) => ({
          ...prev,
          availability: {
            ...prev.availability,
            endDate: date
          }
        }));
      }
    } catch (error) {
      console.error('Error occurred while handling date change:', error);
    }
  };

  const handleButtonClick = (newType: string) => {
    setInfo((prevInfo: PersonInfo) => ({
      ...prevInfo,
      availability: {
        ...prevInfo.availability,
        workingType: newType
      }
    }));
  };

  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target;
    setInfo((prevInfo: any) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <Box display='flex' flexDirection='column' justifyContent='space-between' paddingX={2}>
      <Box sx={{ backgroundColor: '#F6F6F6', px: 2, py: 2, borderRadius: '5%' }}>
        <FormControl>
          <Typography>From</Typography>
          <DatePicker
            inputSx={{ backgroundColor: 'white' }}
            value={startDate}
            onChange={(date) => handleDateChange(date, true)}
          />
        </FormControl>
        <FormControl>
          <Typography>To</Typography>
          <DatePicker
            size='medium'
            inputSx={{ backgroundColor: 'white' }}
            value={endDate}
            onChange={(date) => handleDateChange(date, true)}
          />
        </FormControl>

      </Box>
      <Box paddingY={3}>
        <ButtonGroup>
          <Button
            variant='text'
            sx={{
              bgcolor: `${info?.availability.workingType === 'Full-time' ? '#82BEFF' : '#F6F6F6'} !important`,
              color: 'black',
              '&:hover': { backgroundColor: '-moz-initial', color: 'black' },
            }}
            disableRipple
            disableTouchRipple
            disableElevation
            onClick={() => handleButtonClick('Full-time')}
          >
            Billable
          </Button>
          <Button
            variant='text'
            sx={{
              bgcolor: `${info?.availability.workingType === 'Part-time' ? '#82BEFF' : '#F6F6F6'} !important`,
              color: 'black',
              '&:hover': { backgroundColor: '-moz-initial', color: 'black' },
            }}
            disableRipple
            disableTouchRipple
            disableElevation
            onClick={() => handleButtonClick('Part-time')}
          >
            Non-billable
          </Button>
        </ButtonGroup>
      </Box>
      <FormControl>
        <Typography>Public holidays</Typography>
        <CustomTextField
          name='publicHoliday' placeHolder={'Ho Chi Minh'} showClearIcon={false} showDropdownIcon={false}
        />
      </FormControl>
      <FormControl fullWidth sx={{ py: 2 }}>
        <Typography>Notes</Typography>
        <TextField
          maxRows={4}
          minRows={2}
          sx={{ width: '100%' }}
          multiline
          name='note'
          value={info?.availability.note ?? ''}
          onChange={handleValueChange}
          InputProps={{
            sx: { pt: 1 },
          }}
        />
      </FormControl>
    </Box>
  );
};

export default AvailSubBody;
