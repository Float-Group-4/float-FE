import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Button,
  ClickAwayListener,
  Divider,
  FormControl,
  IconButton,
  List,
  ListItem,
  ListItemButton,
  ListItemText,
  Popover,
  Stack,
  TextField,
  Typography,
} from '@mui/material';
import { PersonInfo } from '../models';
import { Close, ArrowDropDown } from '@mui/icons-material';
import { ChangeEvent, ReactNode, useState } from 'react';

interface ProjectSubBodyProps {
  info: PersonInfo;
  setInfo: (info: any) => void;
}

const ProjectSubBody = (props: ProjectSubBodyProps) => {
  const { info, setInfo } = props;
  const projects = [];

  const setValue = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setInfo((prev: any) => ({
      ...prev,
      [`${name}`]: value,
    }));
  };
  return (
    <Box display='flex' flexDirection='column' justifyContent='space-between' paddingX={2}>
      <Box sx={{ backgroundColor: '#F6F6F6', px: 2, py: 2, borderRadius: '5px' }}>
        <FormControl fullWidth>
          <Typography>Project</Typography>
          <Autocomplete
            multiple
            open={projects.length > 0}
            renderInput={(params) => (
              <TextField
                {...params}
                placeholder='Type and selects projects'
                variant='outlined'
                value={info?.projects}
                name='project'
                sx={{ bgcolor: 'white' }}
                onChange={(e) => setValue(e)}
              />
            )}
            options={[]}
          />
        </FormControl>
      </Box>
      <Box sx={{ height: '30vh' }}>
        {info.projects?.length == 0 ||
          (info.projects == null && (
            <Box justifyContent='center' alignContent='center' display='flex' width='100%'>
              <Typography padding={10} fontSize={16}>
                There are no projects assigned to this person.
              </Typography>
            </Box>
          ))}
        <List>
          {info.projects?.map((p) => {
            return (
              <>
                <ListItem key={p}>
                  <ListItemText>{p}</ListItemText>
                  <ListItemButton>
                    <Close />
                  </ListItemButton>
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

export default ProjectSubBody;
