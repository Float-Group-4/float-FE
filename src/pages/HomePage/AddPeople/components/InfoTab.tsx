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

const InfoSubBody: React.FC<InfoProp> = ({ info, setInfo }) => {
  const [tags, setTags] = useState<string[]>([]);
  const roles = [];
  const departments = [];

  const setValue = (event: { target: { name: any; value: any } }): void => {
    const { name, value } = event.target;
    setInfo((prevInfo: any) => ({
      ...prevInfo,
      [name]: value,
    }));
  };

  return (
    <Box paddingX={3}>
      <FormControl fullWidth>
        <Typography>Role</Typography>
        <Autocomplete
          options={[]}
          open={roles.length > 0}
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
            options={[]}
            open={departments.length > 0}
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
            onChange={setValue}
          />
        </FormControl>
      </Stack>
    </Box>
  );
};

export default InfoSubBody;
