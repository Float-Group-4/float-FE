import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import DensitySmallOutlinedIcon from '@mui/icons-material/DensitySmallOutlined';
import SplitscreenOutlinedIcon from '@mui/icons-material/SplitscreenOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import { Box, ListItemButton, Menu, MenuItem, SvgIconTypeMap } from '@mui/material';
import React, { useState } from 'react';

import { OverridableComponent } from '@mui/material/OverridableComponent';

interface AddButtonMultiplePurposeButtonProps {}

class Item {
  constructor(
    public icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
      muiName: string;
    } = DensitySmallOutlinedIcon,
    public name: string = '',
    public key: string = '',
  ) {}
}

const HomePageOptions = [
  new Item(SplitscreenOutlinedIcon, 'Allocate time', 'A'),
  new Item(AccessAlarmOutlinedIcon, 'Log time', 'G'),
  new Item(MoreTimeOutlinedIcon, 'Add time off', 'T'),
  new Item(CreateNewFolderOutlinedIcon, 'Add project', 'P'),
  new Item(PersonAddAlt1OutlinedIcon, 'Add person', 'E'),
];

const AddButtonMultiplePurpose = (props: AddButtonMultiplePurposeButtonProps) => {
  const [openCreateProject, setOpenCreateProject] = useState<boolean>(false);
  const [openAddPerson, setOpenAddPerson] = useState<boolean>(false);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [openMiddlePage, setOpenMiddlePage] = useState<boolean>(false);
  const [openNewProjectTemplate, setOpenNewProjectTemplate] = useState<boolean>(false);
  const [selectedIndex, setSelectedIndex] = useState(0);
  const [template, setTemplate] = useState();

  const handleClickViewModeMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectViewMode = (_e: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);

    switch (index) {
      case 0:
        return;
      case 1:
        return;
      case 2:
        return;
      case 3:
        setOpenMiddlePage(true);
        return;
      case 4:
        setOpenAddPerson(true);
        return;
      default:
        throw new Error('Not valid index');
    }
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const open = Boolean(anchorEl);

  return (
    <>
      <div className='flex gap-2 items-center'>
        <ListItemButton
          id='addBtn'
          aria-controls='addMenu'
          aria-expanded={open ? 'true' : undefined}
          onClick={handleClickViewModeMenu}
          className={`rounded-md flex items-center h-9 aspect-square p-0  ${open ? 'bg-blue-100' : 'bg-blue-600'}  text-white`}
          sx={{ border: 0, padding: 0, minWidth: 0 }}
        >
          <AddOutlinedIcon fontSize='small' className='ms-2' />
        </ListItemButton>
      </div>
      <div>
        <Menu
          id='addMenu'
          MenuListProps={{
            'aria-labelledby': 'addBtn',
          }}
          anchorEl={anchorEl}
          open={open}
          onClose={handleClose}
          anchorOrigin={{
            vertical: 'bottom',
            horizontal: 'left',
          }}
          className='top-2'
        >
          {HomePageOptions.map((option, index) => {
            const Icon = option.icon;
            return (
              <MenuItem
                key={option.name}
                // selected={index === selectedIndex}
                onClick={(event) => handleSelectViewMode(event, index)}
                className={`flex justify-between min-w-56 rounded-md`}
                sx={{ '&:hover': { bgcolor: '#D5E9FF' } }}
              >
                <div className='flex items-center gap-8 min-h-8'>
                  <Icon fontSize='small' className='ms-2 ms-0'></Icon>
                  {option.name}
                </div>
                <div className='flex items-center justify-center me-1'>
                  <p>{option.key}</p>
                </div>
                {/* {selectedIndex == index ? (
                    <div>
                      <CheckOutlinedIcon sx={{ fontSize: 16 }} />
                    </div>
                  ) : null} */}
              </MenuItem>
            );
          })}
        </Menu>
      </div>

      {openNewProjectTemplate && <Box />}
    </>
  );
};

export default AddButtonMultiplePurpose;
