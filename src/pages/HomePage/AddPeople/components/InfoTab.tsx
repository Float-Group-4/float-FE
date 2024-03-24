import React, { useState } from 'react';
import {
  Box,
  Typography,
  TextField,
  Stack,
  Select,
  MenuItem,
  Autocomplete,
  Chip,
  FormControl,
} from '@mui/material';
import { PersonInfo, ContractType } from '../models';
interface InfoProp {
  info: PersonInfo;
  setInfo: (info: any) => void;
}

const tags = [
  { id: '1', name: 'Tag 1' },
  { id: '2', name: 'Tag 2' },
  { id: '3', name: 'Tag 3' },
];

const roles = [
  { id: '1', name: 'Role 1' },
  { id: '2', name: 'Role 2' },
  { id: '3', name: 'Role 3' },
];

const departments = [
  { id: '1', name: 'Dep 1' },
  { id: '2', name: 'Dep 2' },
  { id: '3', name: 'Dep 3' },
];

const InfoSubBody: React.FC<InfoProp> = ({ info, setInfo }) => {
  // const [tags, setTags] = useState<string[]>([]);
  // const roles = [];
  // const departments = [];

  const setValue = (event: { target: { name: any; value: any } }): void => {
    const { name, value } = event.target;
    setInfo((prevInfo: any) => ({
      ...prevInfo,
      [name]: value,
    }));
    console.log(info);
  };

  console.log(info?.type);
  const [inputRole, setInputRole] = React.useState(info.role);
  const [inputDepartment, setInputDepartment] = React.useState(info.department);
  const [inputTags, setInputTags] = React.useState(info.tags);

  return (
    <Box paddingX={3}>
      <FormControl fullWidth>
        <Typography>Role</Typography>
        <Autocomplete
          value={info.role}
          // onChange={(_, value) => {
          //   setInputRole(value ?? info.role);
          // }}
          // inputValue={inputRole}
          onChange={(event, newInputValue) => {
            // setInputRole(newInputValue);
            setValue({
              target: {
                name: 'role',
                value: newInputValue,
              },
            });
          }}
          freeSolo
          id='controllable-states-demo'
          options={roles.map((e) => e.name)}
          //open={roles.length > 0}
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus
              variant='outlined'
              value={info?.role}
              name='role'
              onChange={(e) => setValue(e)}
            />
          )}
        />
      </FormControl>
      <Box sx={{ mt: 2 }}>
        <FormControl fullWidth>
          <Typography>Department</Typography>
          <Autocomplete
            value={info.department}
            // inputValue={inputDepartment}
            onChange={(event, newInputValue) => {
              // setInputDepartment(newInputValue);
              setValue({
                target: {
                  name: 'department',
                  value: newInputValue,
                },
              });
            }}
            freeSolo
            options={departments.map((e) => e.name)}
            //open={departments.length > 0}
            renderInput={(params) => (
              <TextField
                {...params}
                autoFocus
                variant='outlined'
                value={info?.department}
                name='department'
                placeholder={departments.length > 0 ? '' : 'No department'}
                onChange={(e) => setValue(e)}
              />
            )}
          />
        </FormControl>
      </Box>
      <FormControl fullWidth sx={{ py: 1 }}>
        <Typography>Tags</Typography>
        <Autocomplete
          clearIcon={false}
          //value={info.tags}
          // inputValue={inputTags}
          // onInputChange={(event, newInputValue) => {
          //   setInputTags(newInputValue);
          //   setValue({
          //     target: {
          //       name: 'tags',
          //       value: newInputValue,
          //     },
          //   });
          // }}
          options={tags.map((e) => e.name)}
          value={info.tags}
          freeSolo
          multiple
          onChange={(_, value) =>
            setValue({
              target: {
                name: 'tags',
                value: value,
              },
            })
          }
          renderTags={(value, props) =>
            value.map((option, index) => <Chip label={option} {...props({ index })} />)
          }
          renderInput={(params) => <TextField {...params} variant='outlined' fullWidth />}
        />
      </FormControl>

      <Stack direction='row' spacing={2}>
        <FormControl sx={{ py: 1, width: '70%' }}>
          <Typography>Type</Typography>
          <Select value={info?.type} onChange={setValue} name='type'>
            <MenuItem value={ContractType.employee}>Employee</MenuItem>
            <MenuItem value={ContractType.contractor}>Contractor</MenuItem>
            <MenuItem value={ContractType.placeholder}>Placeholer</MenuItem>
          </Select>
        </FormControl>
        <FormControl sx={{ py: 1 }}>
          <Typography>Hourly rate</Typography>
          <TextField
            placeholder='0'
            inputMode='decimal'
            InputProps={{ startAdornment: <span>đ</span> }}
            name='hourlyRate'
            value={info?.hourlyRate}
            onChange={(e) =>
              setValue({
                target: {
                  name: 'hourlyRate',
                  value: e.target.value,
                },
              })}
          />
        </FormControl>
      </Stack>
    </Box>
  );
};

export default InfoSubBody;
