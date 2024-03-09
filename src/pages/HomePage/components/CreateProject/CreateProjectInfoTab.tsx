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
  Paper,
  Popper,
  Autocomplete,
  Chip,
} from '@mui/material';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import { useState } from 'react';
import { BUDGET_VALUE, ProjectInfo } from '../../models';
import { Close, ArrowDropDown } from '@mui/icons-material';
import TagsInput from './TagsInput';

interface CustomTextFieldProps {
  placeHolder: string;
  showClearIcon: boolean;
  showDropdownIcon: boolean;
  name: string;
}

const CustomTextField = (props: CustomTextFieldProps) => {
  const { placeHolder, showClearIcon, showDropdownIcon } = props;

  const handleClose = () => {};

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
        value={currentText}
        placeholder={placeHolder}
        onInput={(e) => onInput(e)}
        onChange={handleChange}
        sx={{ maxWidth: '90%', minWidth: '100%' }}
        InputProps={{
          endAdornment: (
            <Stack>
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
      <Popper open={isOpen} anchorEl={anchor} placement='bottom-start'>
        <ClickAwayListener onClickAway={handleClose}>
          <Paper>
            <Button onClick={handleClose} value={`Add "${currentText}"`} />
          </Paper>
        </ClickAwayListener>
      </Popper>
    </Box>
  );
};

interface InfoProp {
  info: ProjectInfo;
  setInfo: (info: ProjectInfo) => void;
}

const InfoSubBody: React.FC<InfoProp> = ({ info, setInfo }) => {
  const [tags, setTags] = useState<string[]>([]);
  const [currentTag, setCurrentTag] = useState<string>('');

  const handleButtonClick = (newType: string) => {
    setInfo((prevInfo: ProjectInfo) => ({
      ...prevInfo,
      ['type']: newType as string,
    }));
  };

  const handleValueChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>,
  ): void => {
    const { name, value } = event.target;
    setInfo((prevInfo: ProjectInfo) => ({
      ...prevInfo,
      ['name']: value,
    }));
  };

  const handleSelectedTags = (items: string[]) => {
    setTags(items);
  };

  return (
    <Box paddingX={3}>
      <Box>
        <Typography>Client</Typography>
        <CustomTextField
          placeHolder='No client'
          showDropdownIcon={true}
          showClearIcon={false}
          name='client'
        />
      </Box>
      <Box sx={{ mt: 2 }}>
        <Typography>Color</Typography>
        <IconButton
          sx={{ borderRadius: '80%', width: 22, height: 22, backgroundColor: info?.color }}
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
      <Box sx={{ mt: 2 }}>
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
      </Box>
      <Box sx={{ mt: 2 }}>
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
          renderInput={(params) => <TextField {...params} variant="outlined" fullWidth />}
        />
      </Box>

      <Stack sx={{ mt: 2 }} spacing={2} direction='row'>
        {/* <ToggleButtonGroup exclusive value={info?.type ?? 'billable'} onChange={handleTypeChange} color='standard'>
            <ToggleButton value='billable'>billable</ToggleButton>
            <ToggleButton value='non-billable'>non-billable</ToggleButton>
          </ToggleButtonGroup> */}
        <ButtonGroup>
          <Button
            variant='text'
            sx={{
              backgroundColor: info?.type == 'billable' ? '#82BEFF' : '#F6F6F6',
              color: 'black',
              border: 0,
              '&:hover': { backgroundColor: 'initial', color: 'inherit' },
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
              backgroundColor: info?.type == 'non-billable' ? '#82BEFF' : '#F6F6F6',
              color: 'black',
              '&:hover': { backgroundColor: '-moz-initial', color: 'inherit' },
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
            setInfo((prevInfo: ProjectInfo) => ({
              ...prevInfo,
              ['isTentative']: !prevInfo?.isTentative,
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

      <Box sx={{ mt: 2, pb: 6 }}>
        <Typography>Budget</Typography>
        <Select
          onChange={(e) => {
            setInfo((prevInfo: ProjectInfo) => ({
              ...prevInfo,
              ['budget']: parseInt(e.target.value, 0) as number,
            }));
          }}
          value={info?.budget}
          sx={{ width: '80%' }}
        >
          {Object.entries(BUDGET_VALUE).map(([key, value]) => (
            <MenuItem key={key} value={key}>
              {value}
            </MenuItem>
          ))}
        </Select>
      </Box>
    </Box>
  );
};

export default InfoSubBody;
