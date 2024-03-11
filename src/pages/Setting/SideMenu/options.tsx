import SettingsIcon from '@mui/icons-material/Settings';
import TuneIcon from '@mui/icons-material/Tune';
import NotificationsNoneIcon from '@mui/icons-material/NotificationsNone';
import TimerOutlinedIcon from '@mui/icons-material/TimerOutlined';
import PeopleAltOutlinedIcon from '@mui/icons-material/PeopleAltOutlined';
import CalendarTodayOutlinedIcon from '@mui/icons-material/CalendarTodayOutlined';
import LocalOfferOutlinedIcon from '@mui/icons-material/LocalOfferOutlined';
import MarginOutlinedIcon from '@mui/icons-material/MarginOutlined';
import React from 'react';

interface SettingOption {
  title: string;
  subOptions: SubOption[];
}

interface SubOption {
  icon: React.ReactNode;
  label: string;
  path: string;
}

const settingOptions: SettingOption[] = [
  {
    title: 'Settings',
    subOptions: [
      {
        icon: <SettingsIcon />,
        label: 'General',
        path: 'general',
      },
      {
        icon: <NotificationsNoneIcon/>,
        label: 'Notifications',
        path: 'notifications',
      }
    ],
  },
  {
    title: 'Admin',
    subOptions: [
      {
        icon: <TuneIcon />,
        label: 'Hours & currency',
        path: 'preferences'
      },
      {
        icon: <TimerOutlinedIcon/>,
        label: 'Time tracking',
        path: 'time-tracking',
      },
      {
        icon: <PeopleAltOutlinedIcon/>,
        label: 'Guests',
        path: 'guests'
      },
      {
        icon: <CalendarTodayOutlinedIcon/>,
        label: 'Time off',
        path: 'timeoffs'
      },
      {
        icon: <LocalOfferOutlinedIcon/>,
        label: 'Tags',
        path: 'tags'
      },
      {
        icon: <MarginOutlinedIcon/>,
        label: 'Departments',
        path: 'departments'
      },
    ],
  },
];

export default settingOptions
