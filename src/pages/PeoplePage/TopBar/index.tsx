import DensityLargeOutlinedIcon from '@mui/icons-material/DensityLargeOutlined';
import DensityMediumOutlinedIcon from '@mui/icons-material/DensityMediumOutlined';
import DensitySmallOutlinedIcon from '@mui/icons-material/DensitySmallOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';

import {
  Button,
  IconButton,
  List,
  ListItemButton,
  Menu,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import AddButtonMultiplePurpose from '@pages/HomePage/TopBar/AddButtonMultiplePurpose';


const densityOptions = [
  { leftIcon: <DensitySmallOutlinedIcon fontSize='small' />, label: 'Compact', value: 0 },
  { leftIcon: <DensityMediumOutlinedIcon fontSize='small' />, label: 'Comfortable', value: 1 },
  { leftIcon: <DensityLargeOutlinedIcon fontSize='small' />, label: 'Spacious', value: 2 },
];
const zoomOptions = [
  { label: 'Days', value: 'day' },
  { label: 'Weeks', value: 'week' },
  { label: 'Months', value: 'month' },
];

export default function TopBar() {
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [zoomModeAnchorEl, setZoomModeAnchorEl] = useState<null | HTMLElement>(null);
  const [densityAnchorEl, setDensityAnchorEl] = useState<null | HTMLElement>(null);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedZoomMode, setSelectedZoomMode] = useState(0);
  const [selectedDensity, setSelectedDensity] = useState(0);

  const open = Boolean(anchorEl);
  const openZoomModeMenu = Boolean(zoomModeAnchorEl);
  const openDensityMenu = Boolean(densityAnchorEl);

  const handleClickViewModeMenu = (event: React.MouseEvent<HTMLElement>) => {
    setAnchorEl(event.currentTarget);
  };

  const handleSelectViewMode = (_e: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedIndex(index);
    setAnchorEl(null);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const handleClickZoomModeMenu = (event: React.MouseEvent<HTMLElement>) => {
    setZoomModeAnchorEl(event.currentTarget);
  };

  const handleSelectZoomMode = (_e: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedZoomMode(index);
    setZoomModeAnchorEl(null);
  };

  const handleCloseZoomModeMenu = () => {
    setZoomModeAnchorEl(null);
  };

  const handleClickDensityMenu = (event: React.MouseEvent<HTMLElement>) => {
    setDensityAnchorEl(event.currentTarget);
  };

  const handleSelectDensity = (_e: React.MouseEvent<HTMLElement>, index: number) => {
    setSelectedDensity(index);
    setDensityAnchorEl(null);
  };

  const handleCloseDensityMenu = () => {
    setDensityAnchorEl(null);
  };
  return (
    <div className='py-4 pl-2 pr-4 bg-gray-100'>
      <div className='h-8 flex justify-between items-center'>
        {/* Left Nav Content */}
        <div className='flex gap-2 items-center'>
          <div>
            <List>
              <ListItemButton
                id='viewModeBtn'
                aria-controls='viewModeMenu'
                aria-expanded={open ? 'true' : undefined}
                className={`text-xl font-medium px-4 py-1 rounded-md`}
              >
                {9} People
              </ListItemButton>
            </List>
            <Menu
              id='viewModeMenu'
              MenuListProps={{
                'aria-labelledby': 'viewModeBtn',
              }}
              anchorEl={anchorEl}
              open={open}
              onClose={handleClose}
              anchorOrigin={{
                vertical: 'bottom',
                horizontal: 'left',
              }}
              className='top-2'
            ></Menu>
          </div>
          <IconButton
            sx={{
              color: grey[800],
              border: 1,
              borderColor: grey[300],
            }}
            className='rounded-md'
          >
            <LayersOutlinedIcon fontSize='small' />
          </IconButton>
          <Button
            variant='outlined'
            className='rounded-md'
            sx={{ borderColor: grey[300], color: grey[800] }}
          >
            <ManageSearchOutlinedIcon fontSize='small' className='me-2' />
            Filter
          </Button>
        </div>
        {/* Right Nav Content */}
        <div className='flex gap-2'>
          {/* Move And Today */}
          <div className='flex gap-2 items-center'>
            <Button
              variant='outlined'
              className='rounded-md'
              sx={{ borderColor: grey[300], color: grey[800] }}
            >
              <SaveAltOutlinedIcon fontSize='small' className='me-2' />
              Import
            </Button>
          </div>

          <AddButtonMultiplePurpose/>
        </div>
      </div>
    </div>
  );
}
