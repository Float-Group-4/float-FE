import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DensityLargeOutlinedIcon from '@mui/icons-material/DensityLargeOutlined';
import DensityMediumOutlinedIcon from '@mui/icons-material/DensityMediumOutlined';
import DensitySmallOutlinedIcon from '@mui/icons-material/DensitySmallOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import SearchIcon from '@mui/icons-material/Search';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import ViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';

import { useAppDispatch, useAppSelector } from '@hooks/reduxHooks';
import {
  Button,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import dayjs from 'dayjs';
import React, { useState } from 'react';
import { ViewDensity } from '../../../../src/types/enums';
import {
  setViewDensity,
  setViewType,
} from '../../../../src/redux/schedule/scheduleMeasurementSlice';
import { ViewType } from '../Schedule/Board/common/type';
import { useScheduleContext } from '../Schedule/ScheduleContext';
import AddButtonMultiplePurpose from './AddButtonMultiplePurpose';

const options = ['Schedule', 'Project Plan', 'Log Team'];
const densityOptions = [
  {
    leftIcon: <DensitySmallOutlinedIcon fontSize='small' />,
    label: 'Compact',
    value: ViewDensity.compact,
  },
  {
    leftIcon: <DensityMediumOutlinedIcon fontSize='small' />,
    label: 'Comfortable',
    value: ViewDensity.comfortable,
  },
  {
    leftIcon: <DensityLargeOutlinedIcon fontSize='small' />,
    label: 'Spacious',
    value: ViewDensity.spacious,
  },
];
const zoomOptions = [
  { label: 'Days', value: ViewType.days },
  { label: 'Weeks', value: ViewType.weeks },
  { label: 'Months', value: ViewType.months },
];
const filterOptions = [
  {
    label: 'Me',
    icon: <AccountCircleOutlinedIcon fontSize='small' />,
    divider: true,
  },
  {
    label: 'Person',
    icon: <PeopleAltOutlinedIcon fontSize='small' />,
    divider: true,
  },
  {
    label: 'Project',
    icon: <FolderOpenOutlinedIcon fontSize='small' />,
    divider: true,
  },
  {
    label: 'Task',
    icon: <SplitscreenIcon fontSize='small' />,
    divider: false,
  },
];

export default function TopBar() {
  const dispatch = useAppDispatch();
  const { fastForwardDate, fastForward } = useScheduleContext();
  const { currentWeekIndex } = useAppSelector((state) => state.schedule);
  const [anchorEl, setAnchorEl] = useState<null | HTMLElement>(null);
  const [zoomModeAnchorEl, setZoomModeAnchorEl] = useState<null | HTMLElement>(null);
  const [densityAnchorEl, setDensityAnchorEl] = useState<null | HTMLElement>(null);
  const [filterAnchorEl, setFilterAnchorEl] = useState<null | HTMLElement>(null);

  const [selectedIndex, setSelectedIndex] = useState(0);
  const [selectedZoomMode, setSelectedZoomMode] = useState(1);
  const [selectedDensity, setSelectedDensity] = useState(1);

  const open = Boolean(anchorEl);
  const openZoomModeMenu = Boolean(zoomModeAnchorEl);
  const openDensityMenu = Boolean(densityAnchorEl);
  const openFilterMenu = Boolean(filterAnchorEl);

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
    dispatch(setViewType(zoomOptions[index].value));
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
    dispatch(setViewDensity(densityOptions[index].value));
    setSelectedDensity(index);
    setDensityAnchorEl(null);
  };

  const handleCloseDensityMenu = () => {
    setDensityAnchorEl(null);
  };

  const handleOpenFilterMenu = (event: React.MouseEvent<HTMLElement>) => {
    setFilterAnchorEl(event.currentTarget);
  };

  const handleCloseFilterMenu = () => {
    setFilterAnchorEl(null);
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
                onClick={handleClickViewModeMenu}
                className={`text-xl font-medium px-4 py-1 rounded-md ${open ? 'bg-blue-200' : ''}`}
              >
                {options[selectedIndex]}
                <ExpandMoreOutlinedIcon className='ms-2' fontSize='small' />
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
            >
              {options.map((option, index) => (
                <MenuItem
                  key={option}
                  selected={index === selectedIndex}
                  onClick={(event) => handleSelectViewMode(event, index)}
                  className={`flex justify-between min-w-36 mx-2 rounded-md ${index != options.length - 1 ? 'my-1' : ''}`}
                >
                  {option}
                  {selectedIndex == index ? (
                    <div>
                      <CheckOutlinedIcon sx={{ fontSize: 16 }} />
                    </div>
                  ) : null}
                </MenuItem>
              ))}
            </Menu>
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
            onClick={handleOpenFilterMenu}
          >
            <ManageSearchOutlinedIcon fontSize='small' className='me-2' />
            Filter
          </Button>
          <Menu
            id='filter-menu'
            anchorEl={filterAnchorEl}
            open={openFilterMenu}
            onClose={handleCloseFilterMenu}
          >
            <div className='mb-2 mx-2'>
              <SearchIcon fontSize='small' className='ml-3' />
              <InputBase className='ml-3' placeholder='Search' />
            </div>
            <Divider className='mb-2' />
            {filterOptions.map((option, index) => (
              <div key={index}>
                <MenuItem className='h-8 w-60 px-3 py-3 mx-2 rounded-lg my-1'>
                  <ListItemIcon>{option.icon}</ListItemIcon>
                  <ListItemText>{option.label}</ListItemText>
                </MenuItem>
                {option.divider ? <Divider /> : <></>}
              </div>
            ))}
          </Menu>
        </div>
        {/* Right Nav Content */}
        <div className='flex gap-4'>
          {/* Move And Today */}
          <div className='flex gap-2 items-center'>
            <div>
              <IconButton
                onClick={() => {
                  fastForward(currentWeekIndex - 1);
                }}
              >
                <ChevronLeftIcon />
              </IconButton>
              <IconButton
                onClick={() => {
                  fastForward(currentWeekIndex + 1);
                }}
              >
                <ChevronRightIcon />
              </IconButton>
            </div>
            <Button
              variant='outlined'
              className='rounded-md'
              sx={{ borderColor: grey[300], color: grey[800] }}
              onClick={() => {
                fastForwardDate(dayjs());
              }}
            >
              Today
            </Button>
          </div>
          {/* Zoom And Density */}
          <div className='flex gap-2 items-center'>
            <div>
              <Button
                id='zoomModeBtn'
                aria-controls={openZoomModeMenu ? 'zoomModeMenu' : undefined}
                aria-haspopup='true'
                aria-expanded={openZoomModeMenu ? 'true' : undefined}
                onClick={handleClickZoomModeMenu}
                variant='outlined'
                className='rounded-md flex items-center '
                sx={{ borderColor: grey[300], color: grey[800] }}
              >
                <CalendarTodayOutlinedIcon sx={{ fontSize: 16 }} className='me-2' />
                {zoomOptions[selectedZoomMode].label}
                <ExpandMoreOutlinedIcon className='ms-2' fontSize='small' />
              </Button>
              <Menu
                id='zoomModeMenu'
                anchorEl={zoomModeAnchorEl}
                open={openZoomModeMenu}
                onClose={handleCloseZoomModeMenu}
                MenuListProps={{
                  'aria-labelledby': 'zoomModeBtn',
                }}
                className='top-1 rounded-md'
              >
                {zoomOptions.map((option, index) => (
                  <MenuItem
                    key={option.value}
                    onClick={(event) => handleSelectZoomMode(event, index)}
                    selected={selectedZoomMode == index}
                    className={`flex justify-between min-w-32 mx-2 rounded-md ${index != options.length - 1 ? 'my-1' : ''}`}
                  >
                    {option.label}
                    {selectedZoomMode == index ? (
                      <div>
                        <CheckOutlinedIcon sx={{ fontSize: 16 }} />
                      </div>
                    ) : null}
                  </MenuItem>
                ))}
              </Menu>
            </div>
            <div>
              <Button
                id='densityBtn'
                aria-controls={open ? 'densityMenu' : undefined}
                aria-haspopup='true'
                aria-expanded={open ? 'true' : undefined}
                variant='outlined'
                className='rounded-md flex items-center h-9 aspect-square p-0'
                sx={{ borderColor: grey[300], color: grey[800], padding: 0, minWidth: 0 }}
                onClick={handleClickDensityMenu}
              >
                <ViewDayOutlinedIcon fontSize='small' />
              </Button>
              <Menu
                id='densityMenu'
                anchorEl={densityAnchorEl}
                open={openDensityMenu}
                onClose={handleCloseDensityMenu}
                MenuListProps={{
                  'aria-labelledby': 'densityBtn',
                }}
                className='top-1 rounded-md'
              >
                {densityOptions.map((option, index) => (
                  <MenuItem
                    key={option.value}
                    onClick={(event) => handleSelectDensity(event, index)}
                    selected={selectedDensity == index}
                    className={`flex justify-between min-w-48 mx-2 rounded-md ${index != options.length - 1 ? 'my-1' : ''}`}
                  >
                    <div className='flex items-center gap-4'>
                      {option.leftIcon}
                      <div className='py-1'>{option.label}</div>
                    </div>
                    {selectedDensity == index ? (
                      <div>
                        <CheckOutlinedIcon sx={{ fontSize: 16 }} />
                      </div>
                    ) : null}
                  </MenuItem>
                ))}
              </Menu>
            </div>
          </div>
          {/* Share & Add */}
          <div className='flex gap-2 items-center'>
            <IconButton
              sx={{
                color: grey[800],
                border: 1,
                borderColor: grey[300],
              }}
              className='rounded-md'
            >
              <ShareOutlinedIcon fontSize='small' />
            </IconButton>
            <AddButtonMultiplePurpose />
          </div>
        </div>
      </div>
    </div>
  );
}
