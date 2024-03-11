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
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { useState } from 'react';
import { BUDGET_VALUE, ProjectInfo } from '../models';
import { Close, ArrowDropDown, RoundaboutRight } from '@mui/icons-material';
import React from 'react';

interface CustomTextFieldProps {
  placeHolder: string;
  showClearIcon: boolean;
  showDropdownIcon: boolean;
  name: string;
}

const CustomTextField = (props: CustomTextFieldProps) => {
  const { placeHolder, showClearIcon, showDropdownIcon } = props;

  const handleClose = () => {
    setOpen(false);
    setAnchor(null);
  };

  const onInput = (e: any) => {
    setAnchor(e.target);
    setOpen(true);
  };

  const handleChange = (e: any) => {
    setCurrentText(e.target.value.trim());
  };

  const [isOpen, setOpen] = useState(false);
  const [anchor, setAnchor] = useState(null);
  const [currentText, setCurrentText] = useState('');

  return (
    <Box>
      <TextField
        size='medium'
        value={currentText}
        placeholder={placeHolder}
        onInput={(e) => onInput(e)}
        onChange={handleChange}
        sx={{ maxWidth: '90%', minWidth: '100%' }}
        InputProps={{
          endAdornment: (
            <Stack direction='row'>
              {currentText.length > 0 && (
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
      type: newType as string,
    }));
  };

  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target;
    setInfo((prevInfo: ProjectInfo) => ({
      ...prevInfo,
      [name]: value,
    }));
  };
  console.log(info?.color);

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
        <IconButton
          sx={{ borderRadius: '80%', width: 22, height: 22, color: info?.color, backgroundColor: info?.color }}
          disableFocusRipple
          disableTouchRipple
          disableRipple
        />
        <IconButton
          sx={{ width: 22, height: 22 }}
          disableFocusRipple
          disableTouchRipple
          disableRipple
        >
          <ArrowDropDownIcon />
        </IconButton>
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
              backgroundColor: info?.type === 'billable' ? '#82BEFF' : '#F6F6F6',
              color: 'black',
            }}
            onClick={() => handleButtonClick('billable')}
            disableFocusRipple
            disableRipple
            disableTouchRipple
          >
            Billable
          </Button>
          <Button
            variant='text'
            sx={{
              backgroundColor: info?.type === 'non-billable' ? '#82BEFF' : '#F6F6F6',
              color: 'black',
            }}
            onClick={() => handleButtonClick('non-billable')}
            disableFocusRipple
            disableRipple
            disableTouchRipple
          >
            Non-billable
          </Button>
        </ButtonGroup>
        <Button
          onClick={() => {
            setInfo((prevInfo: boolean | any) => ({
              ...prevInfo,
              isTentative: !prevInfo?.isTentative,
            }));
          }}
          sx={{
            backgroundColor: info?.isTentative ? '#82BEFF' : '#F6F6F6',
            color: 'black',
            '&:hover': { backgroundColor: '-moz-initial', color: 'inherit' },
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
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </FormControl>
    </Box>
  );
};

export default InfoSubBody;
