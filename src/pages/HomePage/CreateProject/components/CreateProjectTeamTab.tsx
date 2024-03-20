import { Close } from '@mui/icons-material';
import {
  Box,
  Typography,
  TextField,
  ClickAwayListener,
  Paper,
  ListItem,
  List,
  ListSubheader,
  ListItemText,
  IconButton,
  Stack,
  Checkbox,
  Popover,
} from '@mui/material';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import { ProjectTeam } from '../models';

interface TeamProps {
  team: ProjectTeam[] | null;
  setTeam: (team: any | null) => void;
}

const TeamSubBody: React.FC<TeamProps> = ({ team, setTeam }) => {
  const demoData = [
    { department: 'it', member: [{ name: 'quan', email: 'quan@gmail.com' }] },
    { department: 'No department', member: [{ name: 'nhat', email: 'nhat@gmail.com' }] },
    { department: 'hr', member: [{ name: 'bao', email: 'bao@gmail.com' }] },
  ];

  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const handleClose = () => {};

  const removeMember = (indexToRemove: number) => {
    setTeam((prevTeam: any[]) => {
      if (!prevTeam) return null;
      return prevTeam.filter((_: any, index: number) => index !== indexToRemove);
    });
  };

  const addToProject = (index: number, department: string) => {
    const newTeamMember = demoData.filter((d) => d.department === department)[index];
    setTeam((prevTeam: any) => {
      if (!prevTeam) return [{ member: newTeamMember }];
      return [...prevTeam, { member: newTeamMember }];
    });
  };

  return (
    <Box paddingX={1}>
      <Box sx={{ backgroundColor: '#F6F6F6', px: 2, py: 2, borderRadius: '5%' }}>
        <Typography>Assign a team member</Typography>
        <TextField
          sx={{ width: '100%', backgroundColor: 'white' }}
          variant='outlined'
          onClick={(e) => {
            setIsOpen(true);
            setAnchor(e.currentTarget);
          }}
          onBlur={() => {
            setIsOpen(false);
          }}
        />
        <Popover
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
            <Paper>
              <ListItem sx={{ '&:hover': { backgroundColor: '#F6F6F6' }, cursor: 'pointer' }}>
                All team members
              </ListItem>
              <List>
                {demoData.map((d, index) => (
                  <React.Fragment key={d.department}>
                    <ListSubheader
                      sx={{ fontWeight: '500', display: 'flex', alignItems: 'center' }}
                    >
                      {d.department}
                      <Typography variant='body2' color='primary' onClick={handleClose}>
                        All
                      </Typography>
                    </ListSubheader>

                    {d.member?.map((projectMember, index) => (
                      <ListItem
                        key={projectMember.email}
                        sx={{
                          '&:hover': { backgroundColor: '#F6F6F6' },
                          cursor: 'pointer',
                          m: 0,
                          px: 1,
                        }}
                        onClick={() => addToProject(index, d.department)}
                      >
                        <ListItemText
                          primary={projectMember.name}
                          secondary={projectMember.email}
                        />
                      </ListItem>
                    ))}
                  </React.Fragment>
                ))}
              </List>
            </Paper>
          </ClickAwayListener>
        </Popover>
      </Box>
      <Box
        minHeight='60%'
        height='30vh'
        display='flex'
        alignContent='center'
        justifyContent='center'
      >
        {team?.length == 0 || team == null ? (
          <Typography variant='body1' alignSelf='center' color='GrayText'>
            There are no people assigned to this project.
          </Typography>
        ) : (
          <List>
            {team?.map((projectTeam: ProjectTeam, index: number) => (
              <ListItem key={projectTeam.member.email}>
                <ListItemText primary={projectTeam.member.name} />
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
      <Stack direction='row' alignContent='center' sx={{ mt: 2, px: 2, pb: 4 }}>
        <Checkbox
          checked={isSelected}
          sx={{ m: 0, p: 0 }}
          onClick={() => {
            const val = !isSelected;
            setIsSelected(val);
          }}
        />
        <Typography sx={{ ml: 2 }}>All Project Managers have edit rights</Typography>
      </Stack>
    </Box>
  );
};

export default TeamSubBody;
