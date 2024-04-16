import {
  Autocomplete,
  Box,
  Button,
  ClickAwayListener,
  Dialog,
  DialogActions,
  DialogContent,
  DialogTitle,
  Divider,
  IconButton,
  Paper,
  Popper,
  TextField,
  Typography,
} from '@mui/material';
import React, { useEffect, useRef, useState } from 'react';
import { TimeOffTypeSetting } from '../types/type.interface';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faChevronDown, faCircle } from '@fortawesome/free-solid-svg-icons';
import { balanceType } from '../enum';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import dayjs, { Dayjs } from 'dayjs';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import { DemoContainer } from '@mui/x-date-pickers/internals/demo';
import DeleteIcon from '@mui/icons-material/Delete';
import axios from 'axios';

const defaultColors = [
  '#f44336',
  '#0b5394',
  '#6fa8dc',
  '#8fce00',
  '#e69138',
  '#ff28ce',
  '#c90076',
  '#6a329f',
];

interface MyDialogProps {
  teamId: string;
  open: boolean;
  onClose: () => void;
}

const AddTimeOffDialog = ({ teamId, open, onClose }: MyDialogProps) => {
  const baseURL = import.meta.env.VITE_FRONTEND_BASE_URL;
  const [data, setData] = useState<TimeOffTypeSetting>();
  const [name, setName] = useState<string>('');
  const [color, setColor] = useState<string>('#FF0000');
  const [balance, setBalance] = useState<string>('Unlimited');
  const [days, setDays] = useState<number>(0);
  const [effectiveDate, setEffectiveDate] = useState<Dayjs>(dayjs());
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [colorPickerAnchor, setColorPickerAnchor] = useState<HTMLElement | null>(null);
  const [colorPickerValue, setColorPickerValue] = useState<string>('');

  useEffect(() => {
    if (colorPickerInputRef.current && colorPickerAnchor) {
      colorPickerInputRef.current.click();
    }
  });

  const handleColorPickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setColorPickerValue(newColor);
  };

  const colorPickerInputRef = useRef<HTMLInputElement>(null);

  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleAdd = async () => {
    try {
      let newTimeOffType = {
        teamId: teamId,
        name: name,
        color: color,
        balance: balance,
        days: days,
        EffectiveDate: effectiveDate,
      };
      const response = await axios.post(`${baseURL}/time-off-types`, newTimeOffType);
      handleClose();
    } catch (error) {
      console.log(error);
    }
  };

  const handleClose = () => {
    setName('');
    setColor('#FF0000');
    setDays(0);
    setBalance('Unlimited');
    setEffectiveDate(dayjs());
    onClose();
  };

  const handleNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setName(newName);
  };

  const handleEditDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newDays = event.target.value;

    setDays(Number(newDays));
  };

  const handleEditBalanceChange = (event: React.ChangeEvent<{}>, newBalance: string | null) => {
    var value = newBalance ? newBalance : 'Unlimited';
    setBalance(value);
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const handleClickAwayColor = () => {
    setColorPickerAnchor(null);
    setColor(colorPickerValue);
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setColor(newColor);
  };

  const handleDefaultColorClick = (colorCode: string) => {
    setColor(colorCode);
    setAnchorEl(null);
  };

  const colorPickerOpen = Boolean(colorPickerAnchor);
  const handleColorPickerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setColorPickerValue(color);
    setColorPickerAnchor(event.currentTarget);
    if (colorPickerInputRef.current) {
      colorPickerInputRef.current.click();
    }
  };

  return (
    <Box>
      <Dialog
        disableEnforceFocus
        open={open}
        onClose={onClose}
        fullWidth={true}
        PaperProps={{
          sx: {
            position: 'absolute',
            top: 50,
            borderRadius: 2,
            padding: '10px 0',
            maxWidth: '500px',
          },
        }}
      >
        <DialogTitle sx={{ fontSize: '30px' }}>Edit Time off</DialogTitle>
        <DialogContent>
          <Typography>Name*</Typography>
          <TextField
            autoFocus
            margin='dense'
            id='statusName'
            type='text'
            fullWidth
            value={name}
            onChange={handleNameChange}
          />

          <Typography marginTop={3}>Color</Typography>
          <Box display={'flex'} alignItems={'center'}>
            <IconButton
              onClick={handleMenuClick}
              sx={{
                width: '70px',
                '&:hover': {
                  backgroundColor: '#FFF',
                },
                justifyContent: 'space-between',
                alignItems: 'center',
              }}
            >
              <FontAwesomeIcon icon={faCircle} size='2x' color={color} />
              <FontAwesomeIcon icon={faChevronDown} />
            </IconButton>
          </Box>

          <Box display='flex' justifyContent={'space-between'}>
            <Box width={'300px'}>
              <Typography marginTop={3}>Balance</Typography>
              <Autocomplete
                autoFocus
                fullWidth
                options={balanceType}
                renderInput={(params) => <TextField {...params} />}
                value={balance}
                onChange={handleEditBalanceChange}
                disableClearable
              />
            </Box>
            {balance !== 'Unlimited' && (
              <Box width={'70px'}>
                <Typography marginTop={3}>Days</Typography>
                <TextField
                  autoFocus
                  fullWidth
                  type='number'
                  value={days}
                  onChange={handleEditDaysChange}
                />
              </Box>
            )}
          </Box>

          {balance !== 'Unlimited' && (
            <Box display='flex'>
              <Box width={'500px'}>
                <Typography marginTop={3}>Effective Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      value={dayjs(effectiveDate)}
                      onChange={(newDate: Dayjs | null) => {
                        setData((prevData) => {
                          if (prevData) {
                            return {
                              ...prevData,
                              EffectiveDate: newDate || prevData.EffectiveDate,
                            };
                          }
                          return prevData;
                        });
                      }}
                    />
                  </DemoContainer>
                </LocalizationProvider>
              </Box>
            </Box>
          )}
        </DialogContent>
        <DialogActions
          style={{ justifyContent: 'flex-start', marginLeft: '20px', marginRight: '20px' }}
        >
          <Button variant='contained' color='primary' onClick={handleAdd}>
            Save
          </Button>
          <Button variant='outlined' color='primary' onClick={handleClose}>
            Cancel
          </Button>
        </DialogActions>
      </Dialog>
      <Popper anchorEl={anchorEl} open={menuOpen} sx={{ zIndex: 1500 }}>
        <ClickAwayListener onClickAway={handleClickAway}>
          <Paper sx={{ width: '350px', height: '300px', padding: '15px', borderRadius: '5%' }}>
            <Box marginBottom={2}>
              <Typography>HEX</Typography>
              <TextField
                id='hex'
                autoFocus
                type='text'
                fullWidth
                value={color}
                onChange={handleColorChange}
                onKeyDown={(ev) => {
                  if (ev.key === 'Enter') {
                    setAnchorEl(null);
                    ev.preventDefault();
                  }
                }}
              />
            </Box>
            <Divider sx={{ borderBottomWidth: 3 }} />
            <Box marginBottom={2} marginTop={2}>
              <Typography>Default Colors</Typography>
              <Box display={'flex'} justifyContent={'space-between'}>
                {defaultColors.map((code) => (
                  <IconButton
                    sx={{ borderRadius: '50%' }}
                    onClick={() => handleDefaultColorClick(code)}
                  >
                    <FontAwesomeIcon icon={faCircle} color={code} style={{ fontSize: '30px' }} />
                  </IconButton>
                ))}
              </Box>
            </Box>
            <Divider sx={{ borderBottomWidth: 3, marginBottom: '20px' }} />
            <Button variant='contained' fullWidth onClick={handleColorPickerClick}>
              Set Custom Color
            </Button>
            <Popper sx={{ zIndex: 1500 }} open={colorPickerOpen} anchorEl={colorPickerAnchor}>
              <ClickAwayListener onClickAway={handleClickAwayColor}>
                <Box sx={{ width: '320px', top: '-15px', left: '-160px', position: 'absolute' }}>
                  <input
                    type='color'
                    style={{ width: 0, height: 0 }}
                    ref={colorPickerInputRef}
                    value={colorPickerValue}
                    onChange={handleColorPickerChange}
                  />
                </Box>
              </ClickAwayListener>
            </Popper>
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

export default AddTimeOffDialog;
