import { Close } from "@mui/icons-material";
import { Box, Typography, TextField, Popper, ClickAwayListener, Paper, ListItem, List, ListSubheader, ListItemText, IconButton, Stack, Checkbox } from "@mui/material";
import { ArrowDropDownIcon } from "@mui/x-date-pickers";
import React, { useState } from "react";
import { ProjectTeam } from "../../models";

interface TeamProp {
    team: ProjectTeam[] | null;
    setTeam: (team: ProjectTeam[] | null) => void;
  }
  
  const TeamSubBody: React.FC<TeamProp> = ({ team, setTeam }) => {
    const demoData = {
      it: [{ name: 'quan', email: 'quan@gmail.com' }],
      'No department': [{ name: 'nhat', email: 'nhat@gmail.com' }],
      hr: [{ name: 'bao', email: 'bao@gmail.com' }],
    };
  
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
      const newTeamMember = demoData[department][index];
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
          <Popper
            open={isOpen}
            anchorEl={anchor}
            placement='bottom-start'
            sx={{ zIndex: 9999, width: '24%', maxWidth: 'ml' }}
          >
            <ClickAwayListener
              onClickAway={() => {
                console.log('click away');
                setAnchor(null);
              }}
            >
              <Paper>
                <ListItem sx={{ '&:hover': { backgroundColor: '#F6F6F6' }, cursor: 'pointer' }}>
                  All team members
                </ListItem>
                <List>
                  {Object.entries(demoData).map(([department, projectMembers]) => (
                    <React.Fragment key={department}>
                      <ListSubheader
                        sx={{ fontWeight: '500', display: 'flex', alignItems: 'center' }}
                      >
                        {department}
                        <Typography
                          variant='body2'
                          color='primary'
                          onClick={handleClose}
                          sx={{ cursor: 'pointer', ml: 'auto' }}
                        >
                          All
                        </Typography>
                      </ListSubheader>
  
                      {projectMembers?.map((projectMember, index) => (
                        <ListItem
                          key={index}
                          sx={{
                            '&:hover': { backgroundColor: '#F6F6F6' },
                            cursor: 'pointer',
                            m: 0,
                            px: 1,
                          }}
                          onClick={() => addToProject(index, department)}
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
          </Popper>
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
                <ListItem key={index}>
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