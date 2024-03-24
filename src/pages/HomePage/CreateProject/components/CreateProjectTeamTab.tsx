import { Close } from '@mui/icons-material';
import {
  Box,
  Typography,
  TextField,
  ListItem,
  List,
  ListItemText,
  IconButton,
  Checkbox,
  Autocomplete,
  FormControlLabel,
} from '@mui/material';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import { ProjectMember } from '../models';

interface TeamProps {
  team: ProjectMember[] | null;
  setTeam: (team: any | null) => void;
}

const TeamSubBody: React.FC<TeamProps> = ({ team, setTeam }) => {
  const demoData = [
    { id: '1', name: 'quan', email: 'quan@gmail.com', department: 'it' },
    { id: '2', name: 'bao', email: 'bao@gmail.com', department: 'it' },
    { id: '4', name: 'quang', email: 'quang@gmail.com', department: 'it' },
    { id: '3', name: 'nhat', email: 'nhat@gmail.com', department: 'No department' },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [currentText, setCurrentText] = useState('');
  const [isSelected, setIsSelected] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const handleClose = () => {};

  const removeMember = (indexToRemove: number) => {
    setTeam((prevTeam: any[]) => {
      if (!prevTeam) return null;
      return prevTeam.filter((_: any, index: number) => index !== indexToRemove);
    });
  };

  const addToProject = (member: ProjectMember) => {
    console.log(member);
    if (team == null || team.length == 0) {
      setTeam([member]);
      return;
    }

    const temp = [...team];
    if (temp.some((t) => t.id == member.id)) {
      return;
    }
    setTeam([...team, member]);
  };

  return (
    <Box paddingX={1}>
      <Box sx={{ backgroundColor: '#F6F6F6', px: 2, py: 2, borderRadius: '5px', marginBottom: 2 }}>
        <Typography>Assign a team member</Typography>
        <Autocomplete
          options={demoData}
          getOptionLabel={(option: ProjectMember) => option.name}
          groupBy={(option: ProjectMember) => option.department}
          renderInput={(params) => (
            <TextField {...params} value={currentText} sx={{ bgcolor: 'white' }} />
          )}
          onChange={(event, newValue: ProjectMember | null) => {
            if (newValue) {
              setCurrentText(newValue.name);
              addToProject(newValue);
            }
          }}
          isOptionEqualToValue={(option: ProjectMember, value: ProjectMember) =>
            option.id === value.id
          }
        />
      </Box>
      <Box sx={{ minHeight: '30vh', maxHeight: '40vh', overflow: 'auto', paddingX: 3 }}>
        {team?.length === 0 || team == null ? (
          <Box>
            <Typography padding={10} fontSize={16} align='center' color='GrayText'>
              There are no people assigned to this project.
            </Typography>
          </Box>
        ) : (
          <List>
            {team.map((projectTeam: ProjectMember, index: number) => (
              <ListItem key={projectTeam.email}>
                <ListItemText primary={projectTeam.name} style={{ color: 'black' }} />
                <IconButton onClick={() => removeMember(index)} sx={{ ml: 'auto' }}>
                  <Close />
                </IconButton>
              </ListItem>
            ))}
          </List>
        )}
      </Box>
      <Box paddingX={2}>
        <Typography>Project Owner</Typography>
        <TextField
          value='name'
          variant='outlined'
          sx={{ width: '100%' }}
          InputProps={{
            endAdornment: (
              <IconButton>
                <ArrowDropDownIcon />
              </IconButton>
            ),
          }}
        />
      </Box>
      <FormControlLabel
        sx={{ paddingX: 3.5, paddingY: 1 }}
        control={
          <Checkbox
            checked={isSelected}
            sx={{ m: 0, p: 0 }}
            onClick={() => {
              const val = !isSelected;
              setIsSelected(val);
            }}
          />
        }
        label={<Typography sx={{ ml: 1 }}>All Project Managers have edit rights</Typography>}
      ></FormControlLabel>
    </Box>
  );
};

export default TeamSubBody;
