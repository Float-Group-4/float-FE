import { Block, CheckBox, Close, DepartureBoard, Edit, Folder, People, Person } from '@mui/icons-material';
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
  Select,
  MenuItem,
  FormControl,
  Divider,
  FormGroup,
  FormControlLabel,
} from '@mui/material';
import { ArrowDropDownIcon } from '@mui/x-date-pickers';
import React, { useState } from 'react';
import { AccountType, PersonInfo } from '../models';
import { EyeOutlined, GlobalOutlined } from '@ant-design/icons';
import PopupState, { bindTrigger, bindPopover } from 'material-ui-popup-state';

interface AccessProps {
  info: PersonInfo;
  setInfo: (info: any) => void;
}

const accountType = [
  { 'id': '1', 'title': AccountType.member, 'body': 'Can view schedule and optionally manage their own tasks and/or time off' },
  { 'id': '2', 'title': AccountType.manager, 'body': 'Can manage specific departments, people and/or projects' },
  { 'id': '3', 'title': AccountType.admin, 'body': 'Can manage all people, projects and team settings' }
]

const AccessSubBody: React.FC<AccessProps> = ({ info, setInfo }) => {

  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [anchor, setAnchor] = useState<HTMLElement | null>(null);
  const [type, setType] = useState('');
  const handleClose = () => { };

  const setValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target
    setInfo((prev: any) => ({
      ...prev,
      [name]: value
    }))
  }

  return (
    <Box paddingX={1}>
      <Box sx={{ backgroundColor: '#F6F6F6', px: 2, py: 2, borderRadius: '5%' }}>
        <Typography>Access</Typography>
        <PopupState variant='popover'>
          {(popupState) => (
            <div>
              <TextField
                fullWidth
                sx={{ backgroundColor: 'white' }}
                variant='outlined'
                value={info?.accountType.toString()}
                name='accountType'
                {...bindTrigger(popupState)}
                onChange={(e) => setValue(e)}
              />
              <Popover
                sx={{ width: '100%' }}
                {...bindPopover(popupState)}
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
                    <List >
                      {accountType.map(a => (
                        <ListItem key={a.id} onClick={() => setType(a.title.toString())} sx={{ '&:hover': { bgcolor: 'lightblue' } }}>
                          <ListItemText primary={a.title} secondary={a.body} />
                        </ListItem>
                      ))}
                    </List>
                  </Paper>
                </ClickAwayListener>
              </Popover>
            </div>
          )}
        </PopupState>

      </Box>
      <Box
        minHeight='60%'
        height='30vh'
        display='flex'
        alignContent='center'
        justifyContent='center'
      >
        {type == 'member' && <MemberLayout />}
        {type == 'manager' && <ManagerLayout />}
        {type == 'admin' && <AdminLayout />}

      </Box>
    </Box>
  );
};


const MemberLayout = () => {
  const [canView, setCanView] = useState('1');
  const [canEdit, setCanEdit] = useState('1');
  return (
    <List>
      <ListItem>
        <EyeOutlined />
        <ListItemText primary='Can view' secondary='Who they can see on the schedule' />
        <Select value={canView} onChange={(e) => setCanView(e.target.value)}>
          <MenuItem value='1'>
            <GlobalOutlined />
            <ListItemText primary='Everyone' secondary='All users on account' />
          </MenuItem>
          <MenuItem value='2'>
            <DepartureBoard />
            <ListItemText primary='Department' secondary='Selected department' />
          </MenuItem>
          <MenuItem value='3'>
            <Person />
            <ListItemText primary='Themself' secondary='Just themself' />
          </MenuItem>
        </Select>
      </ListItem>
      {canView == '1' && (
        <FormControl>
          <Typography>Departments</Typography>
          <TextField></TextField>
        </FormControl>
      )}
      <Divider />
      <ListItem>
        <Edit />
        <ListItemText primary='Can edit' secondary='Who they can edit on the schedule' />
        <Select value={canEdit} onChange={(e) => setCanEdit(e.target.value)}>
          <MenuItem value='1'>
            <Person />
            <ListItemText primary='Themself' secondary='Just themself' />
          </MenuItem>
          <MenuItem value='2'>
            <Block />
            <ListItemText primary='No one' secondary='No other one' />
          </MenuItem>
        </Select>
      </ListItem>
    </List>
  );
}

const AdminLayout = () => {
  return <></>
}

const ManagerLayout = () => {
  const [canView, setCanView] = useState('1');
  return (
    <Box>
      <List>
        <ListItem>
          <EyeOutlined />
          <ListItemText primary='Can view' secondary='Who they can see on the schedule' />
          <Select value={canView} onChange={(e) => setCanView(e.target.value)}>
            <MenuItem value='1'>
              <GlobalOutlined />
              <ListItemText primary='Everyone' secondary='All users on account' />
            </MenuItem>
            <MenuItem value='2'>
              <DepartureBoard />
              <ListItemText primary='Department' secondary='Selected department' />
            </MenuItem>
            <MenuItem value='3'>
              <Person />
              <ListItemText primary='Themself' secondary='Just themself' />
            </MenuItem>
          </Select>
        </ListItem>
        {canView == '1' && (
          <FormControl>
            <Typography>Departments</Typography>
            <TextField></TextField>
          </FormControl>
        )}
        <Divider />
        <ListItem>
          <People />
          <ListItemText primary='People Manager' secondary='Can schedule and approve time off requests' />
        </ListItem>
        <ListItem>
          <Folder />
          <ListItemText primary='Project Manager' secondary='Can schedule tasks and manage projects' />
        </ListItem>
      </List>
      <Typography>Additional permissions</Typography>
      <FormGroup>
        <FormControlLabel control={<Checkbox />} label="Create and edit people" />
        <FormControlLabel control={<Checkbox />} label="View everyone’s rates and their project budgets" />
      </FormGroup>
    </Box>
  );
}



export default AccessSubBody;
