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
} from '@mui/material';
import { ArrowDropDown, Close } from '@mui/icons-material';
import { PersonInfo, ContractType } from '../models';

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

interface InfoProp {
  info: PersonInfo;
  setInfo: (info: any) => void;
}

const InfoSubBody: React.FC<InfoProp> = ({ info, setInfo }) => {
  const [tags, setTags] = useState<string[]>([]);

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

  return (
    <Box paddingX={3}>
      <FormControl fullWidth>
        <Typography>Role</Typography>
        <CustomTextField
          placeHolder=''
          showDropdownIcon={true}
          showClearIcon={false}
          name=''
        />
      </FormControl>
      <Box sx={{ mt: 2 }}>
        <FormControl fullWidth>
          <Typography>Department</Typography>
          <CustomTextField
            placeHolder='No department'
            showDropdownIcon={true}
            showClearIcon={false}
            name='department'
          />
        </FormControl>
      </Box>
      <FormControl fullWidth sx={{ py: 1 }}>
        <Typography>Tags</Typography>
        <Autocomplete
          clearIcon={false}
          options={[]}
          freeSolo
          multiple
          onChange={(_, value) => setTags(value)}
          renderTags={(value, props) =>
            value.map((option, index) => <Chip label={option} {...props({ index })} />)
          }
          renderInput={(params) => <TextField {...params} variant='outlined' fullWidth />}
        />
      </FormControl>

      <Stack direction='row' spacing={2} >
        <FormControl sx={{ py: 1, width: '70%' }}>
          <Typography>Type</Typography>
          <Select value={info?.type} onChange={setValue} name='type'>
            <MenuItem value={ContractType.employee}>
              Employee
            </MenuItem>
            <MenuItem value={ContractType.contractor}>
              Contractor
            </MenuItem>
            <MenuItem value={ContractType.placeholder}>
              Placeholer
            </MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ py: 1 }}>
          <Typography>Hourly rate</Typography>
          <TextField placeholder='0' inputMode='decimal' InputProps={{ startAdornment: <span>đ</span> }} name='hourlyRate' value={info?.hourlyRate} onChange={setValue} />
        </FormControl>
      </Stack>
    </Box>
  );
};

export default InfoSubBody;
