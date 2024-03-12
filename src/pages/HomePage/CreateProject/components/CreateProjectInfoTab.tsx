import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  TextField,
  Stack,
  ButtonGroup,
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
import { BUDGET_VALUE, ProjectInfo } from '../models';

import ColorSelectPopover from './ColorSelectIcon';

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
  info: ProjectInfo;
  setInfo: (info: any) => void;
}

const InfoSubBody: React.FC<InfoProp> = ({ info, setInfo }) => {
  const [tags, setTags] = useState<string[]>([]);

  const handleButtonClick = (newType: string) => {
    setInfo((prevInfo: any) => ({
      ...prevInfo,
      type: newType,
    }));
  };

  const selectColor = (color: string) => {
    setInfo((prevInfo: any) => ({
      ...prevInfo,
      color: color,
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

  console.log(info?.type);

  return (
    <Box paddingX={3}>
      <FormControl fullWidth>
        <Typography>Client</Typography>
        <CustomTextField
          placeHolder='No client'
          showDropdownIcon={true}
          showClearIcon={false}
          name='client'
        />
      </FormControl>
      <Box sx={{ mt: 2 }}>
        <Typography>Color</Typography>
        <ColorSelectPopover selectedColor={info?.color ?? '#ff0000'} onSelectColor={selectColor} />
      </Box>
      <FormControl fullWidth sx={{ py: 1 }}>
        <Typography>Notes</Typography>
        <TextField
          maxRows={4}
          minRows={2}
          sx={{ width: '100%' }}
          multiline
          name='note'
          value={info?.note ?? ''}
          onChange={handleValueChange}
          InputProps={{
            sx: { pt: 1 },
          }}
        />
      </FormControl>
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

      <Stack sx={{ my: 2 }} spacing={2} direction='row'>
        <ButtonGroup>
          <Button
            variant='text'
            sx={{
              bgcolor: `${info?.type === 'billable' ? '#82BEFF' : '#F6F6F6'} !important`,
              color: 'black',
              '&:hover': { backgroundColor: '-moz-initial', color: 'black' },
            }}
            disableRipple
            disableTouchRipple
            disableElevation
            onClick={() => handleButtonClick('billable')}
          >
            Billable
          </Button>
          <Button
            variant='text'
            sx={{
              bgcolor: `${info?.type === 'non-billable' ? '#82BEFF' : '#F6F6F6'} !important`,
              color: 'black',
              '&:hover': { backgroundColor: '-moz-initial', color: 'black' },
            }}
            disableRipple
            disableTouchRipple
            disableElevation
            onClick={() => handleButtonClick('non-billable')}
          >
            Non-billable
          </Button>
        </ButtonGroup>
        <Button
          onClick={() => {
            setInfo((prevInfo: { isTentative: any }) => ({
              ...prevInfo,
              isTentative: !prevInfo.isTentative,
            }));
          }}
          disableFocusRipple
          disableRipple
          disableTouchRipple
          disableElevation
          sx={{
            backgroundColor: `${info?.isTentative ? '#82BEFF' : '#F6F6F6'} !important`,
            color: 'black',
            '&:hover': { backgroundColor: '-moz-initial', color: 'black' },
          }}
        >
          Tentative
        </Button>
      </Stack>

      <FormControl fullWidth sx={{ py: 1 }}>
        <Typography>Budget</Typography>
        <Select
          onChange={(e) => {
            setInfo((prevInfo: any) => ({
              ...prevInfo,
              budget: e.target.value as number,
            }));
          }}
          value={info?.budget}
        >
          {Object.entries(BUDGET_VALUE).map(([key, value]) => (
            <MenuItem key={key} value={parseInt(key)}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default InfoSubBody;
