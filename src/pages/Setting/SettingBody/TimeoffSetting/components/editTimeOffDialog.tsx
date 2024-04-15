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
  data: TimeOffTypeSetting;
  onEdit: (editedData: TimeOffTypeSetting) => void;
  open: boolean;
  onClose: () => void;
  onDelete: (editedData: TimeOffTypeSetting) => void;
}

const EditTimeOffDialog = ({ data, onEdit, open, onClose, onDelete }: MyDialogProps) => {
  const [editedData, setEditedData] = useState<TimeOffTypeSetting>(data);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [colorPickerAnchor, setColorPickerAnchor] = useState<HTMLElement | null>(null);
  const [colorPickerValue, setColorPickerValue] = useState<string>('');

  useEffect(() => {
    if (colorPickerInputRef.current && colorPickerAnchor) {
      colorPickerInputRef.current.click();
    }
  });

  useEffect(() => {
    if (open) {
      setEditedData(data);
    }
  }, [open, data]);

  const handleColorPickerChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setColorPickerValue(newColor);
  };

  const colorPickerInputRef = useRef<HTMLInputElement>(null);

  const menuOpen = Boolean(anchorEl);
  const handleMenuClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSave = () => {
    onEdit(editedData);
    handleClose();
  };

  const handleDelete = () => {
    onDelete(editedData);
    handleClose();
  };

  const handleClose = () => {
    onClose();
  };

  const handleEditNameChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newName = event.target.value;
    setEditedData((prevData) => {
      if (prevData) {
        return { ...prevData, name: newName };
      }
      return prevData;
    });
  };

  const handleEditDaysChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    let newDays = event.target.value;

    setEditedData((prevData) => {
      if (prevData) {
        return { ...prevData, days: Number(newDays) };
      }
      return prevData;
    });
  };

  const handleEditBalanceChange = (event: React.ChangeEvent<{}>, newBalance: string | null) => {
    var value = newBalance ? newBalance : 'Unlimited';
    setEditedData((prevData) => {
      if (prevData) {
        return { ...prevData, balance: value };
      }
      return prevData;
    });
  };

  const handleClickAway = () => {
    setAnchorEl(null);
  };

  const handleClickAwayColor = () => {
    setColorPickerAnchor(null);
    setEditedData((prevData) => {
      if (prevData) {
        return { ...prevData, color: colorPickerValue };
      }
      return prevData;
    });
  };

  const handleColorChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newColor = event.target.value;
    setEditedData((prevData) => {
      if (prevData) {
        return { ...prevData, color: newColor };
      }
      return prevData;
    });
  };

  const handleDefaultColorClick = (colorCode: string) => {
    setEditedData((prevData) => {
      if (prevData) {
        return { ...prevData, color: colorCode };
      }
      return prevData;
    });
    setAnchorEl(null);
  };

  const colorPickerOpen = Boolean(colorPickerAnchor);
  const handleColorPickerClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setColorPickerValue(editedData.color);
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
            value={editedData.name}
            onChange={handleEditNameChange}
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
              <FontAwesomeIcon icon={faCircle} size='2x' color={editedData.color} />
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
                value={editedData.balance}
                onChange={handleEditBalanceChange}
                disableClearable
              />
            </Box>
            {editedData.balance !== 'Unlimited' && (
              <Box width={'70px'}>
                <Typography marginTop={3}>Days</Typography>
                <TextField
                  autoFocus
                  fullWidth
                  type='number'
                  value={editedData.days}
                  onChange={handleEditDaysChange}
                />
              </Box>
            )}
          </Box>

          {editedData.balance !== 'Unlimited' && (
            <Box display='flex'>
              <Box width={'500px'}>
                <Typography marginTop={3}>Effective Date</Typography>
                <LocalizationProvider dateAdapter={AdapterDayjs}>
                  <DemoContainer components={['DatePicker']}>
                    <DatePicker
                      value={dayjs(editedData.EffectiveDate)}
                      onChange={(newDate: Dayjs | null) => {
                        setEditedData((prevData) => {
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
          style={{ justifyContent: 'space-between', marginLeft: '20px', marginRight: '20px' }}
        >
          <Box width={'150px'} display={'flex'} justifyContent={'space-between'}>
            <Button variant='contained' color='primary' onClick={handleSave}>
              Save
            </Button>
            <Button variant='outlined' color='primary' onClick={handleClose}>
              Cancel
            </Button>
          </Box>
          <Button
            variant='text'
            sx={{ color: 'blue' }}
            onClick={handleDelete}
            startIcon={<DeleteIcon />}
          >
            Delete
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
                value={editedData.color}
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

export default EditTimeOffDialog;
