import {
  Autocomplete,
  Box,
  Divider,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  TextField,
  Typography,
} from '@mui/material';
import { PersonInfo } from '../models';
import { info } from 'console';
import Checkbox from '@base/components/CheckBox';
import { useState } from 'react';
import { Close } from '@mui/icons-material';

interface ManageTabProps {
  info: PersonInfo;
  setInfo: (info: any) => void;
}

const ManageSubBody = (props: ManageTabProps) => {
  const { info, setInfo } = props;
  const users = ['quan', 'bao'];
  const [isOpen, setIsOpen] = useState(false);
  const [checked, setChecked] = useState<string[]>([]);

  const addNewPerson = (value: string) => {
    if (checked.includes(value)) {
      const temp = [...checked].filter((c) => c != value);
      setChecked(temp);
    }

    if (info?.manages?.includes(value)) {
      return;
    }

    if (info?.manages == null) {
      setInfo((prev: any) => ({
        ...prev,
        manages: [value],
      }));
      return;
    }
    const newArray = [...info?.manages!, value];
    setInfo((prev: any) => ({
      ...prev,
      manages: newArray,
    }));
  };

  const removePerson = (index: number) => {
    const temp = [...info?.manages!];
    temp.splice(index, 1);
    setInfo((prev: any) => ({
      ...prev,
      manages: temp,
    }));
  };

  return (
    <Box paddingX={1}>
      <Box sx={{ backgroundColor: '#F6F6F6', px: 2, py: 2, borderRadius: '5px' }}>
        <FormControl fullWidth>
          <Typography>Manager of</Typography>
          <Autocomplete
            multiple
            open={isOpen}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Type and selects projects'
                variant='outlined'
                value={info?.manages}
                name='project'
                onClick={() => setIsOpen(true)}
                sx={{ bgcolor: 'white' }}
              />
            )}
            getOptionLabel={(option) => option}
            options={users}
            renderOption={(props: any, option: any) => {
              return (
                <ListItem
                  onClick={() => {
                    addNewPerson(option);
                    setIsOpen(false);
                  }}
                  sx={{ cursor: 'pointer', '&:hover': { bgcolor: '#C1C1C2' }, borderRadius: '5px' }}
                >
                  <ListItemText>{option}</ListItemText>
                  <Checkbox
                    value={checked.includes(option)}
                    onChange={() => addNewPerson(option)}
                  />
                </ListItem>
              );
            }}
          />
        </FormControl>
      </Box>
      <Box sx={{ height: '30vh' }} paddingX={3}>
        {info.manages?.length == 0 ||
          (info.manages == null && (
            <Box justifyContent='center' alignContent='center' display='flex' width='100%'>
              <Typography padding={10} fontSize={16}>
                The list of people they manage (approving and entering time off)
              </Typography>
            </Box>
          ))}
        <List>
          <Typography fontSize={16}>People</Typography>
          {info.manages?.map((p, index) => {
            return (
              <>
                <ListItem
                  key={p}
                  sx={{
                    justifyContent: 'space-between',
                    bgcolor: '#CBE4FF',
                    borderRadius: '10px',
                    marginY: 0.5,
                  }}
                >
                  <ListItemText>{p}</ListItemText>
                  <IconButton onClick={() => removePerson(index)}>
                    <Close />
                  </IconButton>
                </ListItem>
                <Divider />
              </>
            );
          })}
        </List>
      </Box>
    </Box>
  );
};

export default ManageSubBody;
