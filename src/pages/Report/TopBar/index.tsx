import AddOutlinedIcon from '@mui/icons-material/AddOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import CheckOutlinedIcon from '@mui/icons-material/CheckOutlined';
import ChevronLeftIcon from '@mui/icons-material/ChevronLeft';
import ChevronRightIcon from '@mui/icons-material/ChevronRight';
import DensityLargeOutlinedIcon from '@mui/icons-material/DensityLargeOutlined';
import DensityMediumOutlinedIcon from '@mui/icons-material/DensityMediumOutlined';
import DensitySmallOutlinedIcon from '@mui/icons-material/DensitySmallOutlined';
import ExpandMoreOutlinedIcon from '@mui/icons-material/ExpandMoreOutlined';
import LayersOutlinedIcon from '@mui/icons-material/LayersOutlined';
import ManageSearchOutlinedIcon from '@mui/icons-material/ManageSearchOutlined';
import ShareOutlinedIcon from '@mui/icons-material/ShareOutlined';
import ViewDayOutlinedIcon from '@mui/icons-material/ViewDayOutlined';
import AccountCircleOutlinedIcon from '@mui/icons-material/AccountCircleOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import FolderOpenOutlinedIcon from '@mui/icons-material/FolderOpenOutlined';
import SplitscreenIcon from '@mui/icons-material/Splitscreen';
import SearchIcon from '@mui/icons-material/Search';

import {
  Button,
  Container,
  Divider,
  IconButton,
  InputBase,
  List,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Menu,
  MenuItem,
  Stack,
  TextField,
  Typography,
  useTheme,
} from '@mui/material';
import { grey } from '@mui/material/colors';
import React, { useState } from 'react';
import dayjs from 'dayjs';
import AddButtonMultiplePurpose from './AddButtonMultiplePurpose';
import { AddOutlined, FileUploadOutlined, Filter } from '@mui/icons-material';

export default function TopBar() {
  const theme = useTheme();
  return (
    <Stack
      direction='row'
      alignItems='center'
      height={60}
      justifyContent='space-between'
      pl={1}
      pr={2}
    >
      <Stack direction='row' alignItems='center' spacing={1}>
        <Typography sx={{ fontSize: 22, fontWeight: 500, letterSpacing: '-0.1px', pr: 1 }}>
          Report
        </Typography>
        <IconButton
          sx={{
            color: grey[800],
            border: 1,
            borderColor: grey[300],
          }}
          size='small'
          className='rounded-md'
        >
          <LayersOutlinedIcon fontSize='small' />
        </IconButton>
        <Button
          size='small'
          variant='outlined'
          className='rounded-md'
          sx={{ borderColor: grey[300], color: grey[800] }}
          startIcon={<ManageSearchOutlinedIcon fontSize='small' />}
          // onClick={}
        >
          Filter
        </Button>
      </Stack>

      <Stack direction='row' alignItems='center' spacing={1}>
        <Button
          variant='outlined'
          color='secondary'
          size='small'
          startIcon={<FileUploadOutlined fontSize='small' />}
        >
          Export
        </Button>
        <ListItemButton
          id='addBtn'
          aria-controls='addMenu'
          className={`rounded-md flex items-center h-9 aspect-square p-0  ${'bg-blue-600'}  text-white`}
          sx={{ border: 0, padding: 0, minWidth: 0 }}
        >
          <AddOutlinedIcon fontSize='small' className='ms-2' />
        </ListItemButton>
      </Stack>
    </Stack>
  );
}
