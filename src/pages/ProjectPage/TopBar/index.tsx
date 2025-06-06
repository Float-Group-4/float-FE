import DensityLargeOutlinedIcon from '@mui/icons-material/DensityLargeOutlined';
import DensityMediumOutlinedIcon from '@mui/icons-material/DensityMediumOutlined';
import DensitySmallOutlinedIcon from '@mui/icons-material/DensitySmallOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import SaveAltOutlinedIcon from '@mui/icons-material/SaveAltOutlined';
import SplitscreenOutlinedIcon from '@mui/icons-material/SplitscreenOutlined';
import AccessAlarmOutlinedIcon from '@mui/icons-material/AccessAlarmOutlined';
import CreateNewFolderOutlinedIcon from '@mui/icons-material/CreateNewFolderOutlined';
import MoreTimeOutlinedIcon from '@mui/icons-material/MoreTimeOutlined';
import PersonAddAlt1OutlinedIcon from '@mui/icons-material/PersonAddAlt1Outlined';
import ContentCopyOutlinedIcon from '@mui/icons-material/ContentCopyOutlined';

import { Button, IconButton, List, ListItemButton, Menu, SvgIconTypeMap } from '@mui/material';
import { OverridableComponent } from '@mui/material/OverridableComponent';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import AddButtonMultiplePurpose from '@pages/HomePage/TopBar/AddButtonMultiplePurpose';
import { useAppSelector } from '@hooks/reduxHooks';

class Item {
  constructor(
    public icon: OverridableComponent<SvgIconTypeMap<{}, 'svg'>> & {
      muiName: string;
    } = DensitySmallOutlinedIcon,
    public name: string = '',
    public key: string = '',
  ) {}
}

const options = [
  new Item(SplitscreenOutlinedIcon, 'Allocate time', 'A'),
  new Item(AccessAlarmOutlinedIcon, 'Log time', 'G'),
  new Item(MoreTimeOutlinedIcon, 'Add time off', 'T'),
  new Item(CreateNewFolderOutlinedIcon, 'Add project', 'P'),
  new Item(PersonAddAlt1OutlinedIcon, 'Add person', 'E'),
];
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

  const projectLength = useAppSelector((state) => state.project.project).length ?? 0;

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
                {projectLength} Project
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
              <ContentCopyOutlinedIcon fontSize='small' className='me-2' />
              Manage Templates
            </Button>
          </div>
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

          {/* Share & Add */}
          <AddButtonMultiplePurpose />
        </div>
      </div>
    </div>
  );
}
