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
import { ProjectType } from '../../../../types/enums';

import { adjustSectionValue } from '@mui/x-date-pickers/internals/hooks/useField/useField.utils';

interface InfoProp {
  info: ProjectInfo;
  setInfo: (info: any) => void;
}

const InfoSubBody: React.FC<InfoProp> = ({ info, setInfo }) => {

  const clients = [
    { id: '1', name: 'Client 1' },
    { id: '2', name: 'Client 2' },
    { id: '3', name: 'Client 3' },
  ];

  const tags = [
    { id: '1', name: 'Tag 1' },
    { id: '2', name: 'Tag 2' },
    { id: '3', name: 'Tag 3' },
  ];
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

  return (
    <Box paddingX={3}>
      <FormControl fullWidth>
        <Typography>Client</Typography>
        <Autocomplete
          value={info.client}
          // inputValue={inputDepartment}
          onChange={(event, newInputValue) => {
            // setInputDepartment(newInputValue);
            setInfo((prevInfo: any) => ({
              ...prevInfo,
              client: newInputValue,
            }));
          }}
          freeSolo
          options={clients.map((e) => e.name)}
          renderInput={(params) => (
            <TextField
              {...params}
              name='client'
              value={info?.client}
              onChange={(e) => handleValueChange(e)}
            />
          )}
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
          options={tags.map((e) => e.name)}
          value={info.tags}
          freeSolo
          multiple
          onChange={(_, value) =>
            setInfo((prevInfo: any) => ({
              ...prevInfo,
              tags: value,
            }))
          }
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
              bgcolor: `${info?.type === ProjectType.billable ? '#82BEFF' : '#F6F6F6'} !important`,
              color: 'black',
              '&:hover': { backgroundColor: '-moz-initial', color: 'black' },
            }}
            disableRipple
            disableTouchRipple
            disableElevation
            onClick={() => handleButtonClick(ProjectType.billable)}
          >
            Billable
          </Button>
          <Button
            variant='text'
            sx={{
              bgcolor: `${info?.type === ProjectType.nonBillable ? '#82BEFF' : '#F6F6F6'} !important`,
              color: 'black',
              '&:hover': { backgroundColor: '-moz-initial', color: 'black' },
            }}
            disableRipple
            disableTouchRipple
            disableElevation
            onClick={() => handleButtonClick(ProjectType.nonBillable)}
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
