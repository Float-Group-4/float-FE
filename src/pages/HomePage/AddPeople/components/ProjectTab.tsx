import {
  Autocomplete,
  AutocompleteRenderInputParams,
  Box,
  Button,
  Chip,
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


const projects = [
  { id: '1', name: 'Project 1' },
  { id: '2', name: 'Project 2' },
  { id: '3', name: 'Project 3' },
];

interface ProjectSubBodyProps {
  info: PersonInfo;
  setInfo: (info: any) => void;
}

const ProjectSubBody = (props: ProjectSubBodyProps) => {
  const { info, setInfo } = props;

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
            options={projects.map((e) => e.name)}
            value={info.projects}
            freeSolo
            multiple
            onChange={(_, value) =>
              setInfo((prevInfo: any) => ({
                ...prevInfo,
                "projects": value,
              }))
            }
            renderTags={(value, props) =>
              value.map((option, index) => <Chip label={option} {...props({ index })} />)
            }
            renderInput={(params) => <TextField {...params} variant='outlined' fullWidth />}
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
                  <IconButton>
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

export default ProjectSubBody;
