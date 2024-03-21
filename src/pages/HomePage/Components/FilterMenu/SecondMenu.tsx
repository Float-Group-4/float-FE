import { Menu, InputBase, Divider, MenuItem, ListItemIcon, ListItemText } from '@mui/material';
import React, { useState } from 'react';
import SearchIcon from '@mui/icons-material/Search';

interface SecondMenu {
  anchor: null | HTMLElement;
  category: {
    label: string;
    icon: React.ReactNode;
  } | null;
}

const SecondMenu = ({ anchor, category }: SecondMenu) => {
  var data: any[] = [];
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(anchor);

  const open = Boolean(anchorEl);

  const handleClose = () => {
    setAnchorEl(null);
  };

  return (
    <Menu id='filter-menu' anchorEl={anchorEl} open={open} onClose={handleClose}>
      <div className='mb-2 mx-2'>
        <SearchIcon fontSize='small' className='ml-3' />
        <InputBase className='ml-3' placeholder='Search' />
      </div>
      <Divider className='mb-2' />
      {data.map((value, index) => (
        <div>
          <MenuItem className='h-8 w-84 px-3 py-3 mx-2 rounded-lg my-1'>
            <ListItemIcon>{value}</ListItemIcon>
            <ListItemText>{value}</ListItemText>
          </MenuItem>
        </div>
      ))}
    </Menu>
  );
};

export default SecondMenu;
