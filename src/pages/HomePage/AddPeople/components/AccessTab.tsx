import {
  Block,
  CheckBox,
  Close,
  DepartureBoard,
  Edit,
  Folder,
  People,
  Person,
} from '@mui/icons-material';
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
  Autocomplete,
  Menu,
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
  {
    id: '1',
    title: AccountType.member,
    body: 'Can view schedule and optionally manage their own tasks and/or time off',
  },
  {
    id: '2',
    title: AccountType.manager,
    body: 'Can manage specific departments, people and/or projects',
  },
  { id: '3', title: AccountType.admin, body: 'Can manage all people, projects and team settings' },
];

const AccessSubBody: React.FC<AccessProps> = ({ info, setInfo }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [isSelected, setIsSelected] = useState(false);
  const [anchorEl, setAnchorEl] = useState<HTMLElement | null>(null);
  const [type, setType] = useState('');

  const setValue = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { value, name } = event.target;
    setInfo((prev: any) => ({
      ...prev,
      name: value,
    }));
  };

  return (
    <Box paddingX={1}>
      <Box sx={{ backgroundColor: '#F6F6F6', px: 2, py: 2, borderRadius: '5px' }}>
        <Typography>Access</Typography>
        <Autocomplete
          fullWidth
          sx={{ backgroundColor: 'white' }}
          options={accountType}
          getOptionLabel={(option) => option.title.toString()}
          renderInput={(params) => (
            <TextField
              {...params}
              autoFocus
              variant='outlined'
              value={info?.accountType}
              name='accountType'
              onClick={(e) => {
                setAnchorEl(e.currentTarget);
                setIsOpen(true);
              }}
              onChange={(e) => setValue(e)}
            />
          )}
          renderOption={(props: object, option: any) => (
            <MenuItem
              {...props}
              key={option.id}
              onClick={() => {
                setInfo((prev: any) => ({
                  ...prev,
                  accountType: option.title,
                }));
                setType(option.title);
                setIsOpen(false);
              }}
              sx={{ '&:hover': { bgcolor: 'lightblue !important' } }}
            >
              <ListItemText
                primary={option.title}
                secondary={option.body}
                primaryTypographyProps={{ color: 'black' }}
              />
            </MenuItem>
          )}
          open={isOpen}
        />
      </Box>
      <Box minHeight='60%' height='30vh' width='100%'>
        {type == AccountType.member && <MemberLayout />}
        {type == AccountType.manager && <ManagerLayout />}
        {type == AccountType.admin && <AdminLayout />}
        {type === AccountType.none && (
          <Typography paddingX={3} paddingY={2} fontSize={16}>
            Once access rights are selected, your teammate will receive an email invitation to join
            your team.
          </Typography>
        )}
      </Box>
    </Box>
  );
};

const MemberLayout = () => {
  const [canView, setCanView] = useState('1');
  const [canEdit, setCanEdit] = useState('1');
  return (
    <Box marginX={3}>
      <List>
        <ListItem sx={{ padding: 0 }}>
          <EyeOutlined style={{ fontSize: 30, marginRight: 10 }} />
          <ListItemText
            primary={<Typography variant='h4'>Can view</Typography>}
            secondary={<Typography fontSize='15px'>Who they can see on the schedule</Typography>}
          />
          <Select
            autoWidth
            value={canView}
            onChange={(e) => setCanView(e.target.value)}
            sx={{ fontSize: '16px' }}
            renderValue={(selected) => (
              <Box display='flex' alignItems='center' justifyContent='center'>
                {selected === '1' && <GlobalOutlined />}
                {selected === '2' && <DepartureBoard />}
                {selected === '3' && <Person />}
                {selected === '1' && ' Everyone'}
                {selected === '2' && ' Department'}
                {selected === '3' && ' Themself'}
              </Box>
            )}
          >
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
        {canView == '2' && (
          <FormControl fullWidth>
            <Typography>Departments</Typography>
            <TextField fullWidth size='medium'></TextField>
          </FormControl>
        )}
        <Divider />
        <ListItem sx={{ padding: 0 }}>
          <Edit style={{ fontSize: 30, marginRight: 10 }} />
          <ListItemText
            primary={<Typography variant='h4'>Can edit</Typography>}
            secondary={<Typography fontSize='15px'>Who they can edit on the schedule</Typography>}
          />
          <Select
            value={canEdit}
            onChange={(e) => setCanEdit(e.target.value)}
            sx={{ fontSize: '16px' }}
            renderValue={(selected) => (
              <Box display='flex' alignItems='center' justifyContent='center'>
                {selected === '1' && <Person />}
                {selected === '2' && <Block />}

                {selected === '1' && ' Themself'}
                {selected === '2' && ' No one'}
              </Box>
            )}
          >
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
    </Box>
  );
};

const AdminLayout = () => {
  return (
    <Box marginX={3}>
      <List>
        <ListItem sx={{ padding: 0 }}>
          <EyeOutlined style={{ fontSize: '30px', marginRight: 10 }} />
          <ListItemText
            primary={<Typography variant='h4'>Can view</Typography>}
            secondary={<Typography fontSize='15px'>Who they can see on the schedule</Typography>}
          />
          <div style={{ flexGrow: '10' }}></div>
          <ListItemText>
            <Typography fontSize='16px'>Everyone</Typography>
          </ListItemText>
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <GlobalOutlined style={{ fontSize: '30px', marginRight: 10 }} />
          <ListItemText primary={<Typography variant='h4'>Manages</Typography>} />
          <div style={{ flexGrow: '10' }}></div>
          <ListItemText>
            <Typography sx={{ alignSelf: 'flex-end', flexWrap: 'wrap' }} fontSize='16px'>
              All people, projects and settings
            </Typography>
          </ListItemText>
        </ListItem>
      </List>
    </Box>
  );
};

const ManagerLayout = () => {
  const [canView, setCanView] = useState('1');
  return (
    <Box marginX={3}>
      <List>
        <ListItem sx={{ padding: 0 }}>
          <EyeOutlined style={{ fontSize: '30px', marginRight: 10 }} />
          <ListItemText
            primary={<Typography variant='h4'>Can view</Typography>}
            secondary={<Typography fontSize='15px'>Who they can see on the schedule</Typography>}
          />
          <Select
            value={canView}
            onChange={(e) => setCanView(e.target.value)}
            sx={{ fontSize: '15px' }}
            renderValue={(selected) => (
              <Box display='flex' alignItems='center' justifyContent='center'>
                {selected === '1' && <GlobalOutlined />}
                {selected === '2' && <DepartureBoard />}
                {selected === '3' && <Person />}
                {selected === '1' && ' Everyone'}
                {selected === '2' && ' Department'}
                {selected === '3' && ' Themself'}
              </Box>
            )}
          >
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
        {canView == '2' && (
          <FormControl fullWidth>
            <Typography>Departments</Typography>
            <TextField></TextField>
          </FormControl>
        )}
        <Divider />
        <ListItem sx={{ padding: 0 }}>
          <People style={{ fontSize: '30px', marginRight: 10 }} />
          <ListItemText
            primary={<Typography variant='h4'>People Manager</Typography>}
            secondary={
              <Typography fontSize='15px'>Can schedule and approve time off requests</Typography>
            }
          />
        </ListItem>
        <ListItem sx={{ padding: 0 }}>
          <Folder style={{ fontSize: '30px', marginRight: 10 }} />
          <ListItemText
            primary={<Typography variant='h4'>Project Manager</Typography>}
            secondary={
              <Typography fontSize='15px'>Can schedule tasks and manage projects</Typography>
            }
          />
        </ListItem>
      </List>
      <Typography fontSize={15}>Additional permissions</Typography>
      <FormGroup>
        <FormControlLabel
          control={<Checkbox />}
          label={<Typography fontSize={15}>Create and edit people</Typography>}
        />
        <FormControlLabel
          control={<Checkbox />}
          label={
            <Typography fontSize={15}>View everyone’s rates and their project budgets</Typography>
          }
        />
      </FormGroup>
    </Box>
  );
};

export default AccessSubBody;
