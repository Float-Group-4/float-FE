import {
  AddOutlined,
  CreateNewFolderOutlined,
  KeyboardArrowDown,
  SettingsOutlined,
} from '@mui/icons-material';
import {
  Button,
  Divider,
  IconButton,
  ListItemIcon,
  MenuItem,
  MenuList,
  Popover,
  Typography,
  useTheme,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import TeamSetupModal from '@pages/TeamSetupModal';
import React, { useState } from 'react';
import { useNavigate } from 'react-router';
import CreateProjectModal from '../CreateProject';
import MiddlePage from '../CreateProject/middlePage';

interface AddButtonMultiplePurposeButtonProps {}

const AddButtonMultiplePurpose = (props: AddButtonMultiplePurposeButtonProps) => {
  const theme = useTheme();
  const [anchorEl, setAnchorEl] = React.useState<HTMLButtonElement | null>(null);
  const [openCreateProject, setOpenCreateProject] = useState<boolean>(false);

  const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);
  const id = open ? 'simple-popover' : undefined;

  return (
    <>
      <IconButton
        aria-describedby={id}
        onClick={handleClick}
        className='rounded-md flex items-center h-9 aspect-square p-0 bg-blue-600'
      >
        <AddOutlined sx={{ color: 'white' }} />
      </IconButton>
      <Popover
        id={id}
        open={open}
        anchorEl={anchorEl}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'bottom',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'bottom',
          horizontal: 'left',
        }}
      >
        <MenuList sx={{ px: 1 }}>
          <MenuItem onClick={() => console.log('Allocate time')}>
            <ListItemIcon></ListItemIcon>
            <Typography variant='inherit' noWrap>
              Allocate time
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => console.log('Log time')}>
            <ListItemIcon></ListItemIcon>
            <Typography variant='inherit' noWrap>
              Log time
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => console.log('Add time off')}>
            <ListItemIcon></ListItemIcon>
            <Typography variant='inherit' noWrap>
              Add time off
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => setOpenCreateProject(true)}>
            <ListItemIcon>
              <CreateNewFolderOutlined />
            </ListItemIcon>
            <Typography variant='inherit' noWrap>
              Add new project
            </Typography>
          </MenuItem>
          <MenuItem onClick={() => setOpenCreateProject(true)}>
            <ListItemIcon>
              <CreateNewFolderOutlined />
            </ListItemIcon>
            <Typography variant='inherit' noWrap>
              Add person
            </Typography>
          </MenuItem>
        </MenuList>
      </Popover>

      {openCreateProject && (
        <CreateProjectModal
          isOpen={openCreateProject}
          setIsOpen={setOpenCreateProject}
          size='sm'
        />
        // <MiddlePage/>
      )}
    </>
  );
};

export default AddButtonMultiplePurpose;
