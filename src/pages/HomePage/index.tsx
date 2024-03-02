import { IconButton, Avatar } from '@mui/material';
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { deepOrange } from '@mui/material/colors';

const HomePage = () => {
  return (
    <div className=''>
      {/* Side Nav Bar */}
      <div className='bg-gray-100 h-screen w-[68px] px-2 py-4 flex flex-col justify-between'>
        {/* Top Button Group */}
        <div className='flex flex-col gap-4 items-center'>
          {/* Schedule Button */}
          <div className='w-full aspect-square flex flex-col items-center group hover:cursor-pointer gap-1'>
            <IconButton aria-label='' onClick={() => {}} className='group-hover:bg-blue-200'>
              <ClearAllOutlinedIcon sx={{ color: 'black' }} />
            </IconButton>
            <div className='text-[10px] flex-1 flex justify-center items-center'>
              <p>Schedule</p>
            </div>
          </div>
          {/* People Button */}
          <div className='w-full aspect-square flex flex-col items-center group hover:cursor-pointer gap-1'>
            <IconButton aria-label='' onClick={() => {}} className='group-hover:bg-blue-200'>
              <PeopleOutlinedIcon sx={{ color: 'black' }} />
            </IconButton>
            <div className='text-[10px] flex-1 flex justify-center items-center'>
              <p>People</p>
            </div>
          </div>
          {/* Project Button */}
          <div className='w-full aspect-square flex flex-col items-center group hover:cursor-pointer gap-1'>
            <IconButton aria-label='' onClick={() => {}} className='group-hover:bg-blue-200'>
              <FolderOutlinedIcon sx={{ color: 'black' }} />
            </IconButton>
            <div className='text-[10px] flex-1 flex justify-center items-center'>
              <p>Project</p>
            </div>
          </div>
          {/* Report Button */}
          <div className='w-full aspect-square flex flex-col items-center group hover:cursor-pointer gap-1'>
            <IconButton aria-label='' onClick={() => {}} className='group-hover:bg-blue-200'>
              <BarChartOutlinedIcon sx={{ color: 'black' }} />
            </IconButton>
            <div className='text-[10px] flex-1 flex justify-center items-center'>
              <p>Report</p>
            </div>
          </div>
        </div>
        {/* Bottom Button Group */}
        <div className='flex flex-col justify-end items-center gap-4'>
          {/* Setting Button */}
          <IconButton aria-label='' onClick={() => {}} className='hover:bg-blue-200'>
            <SettingsOutlinedIcon sx={{ color: 'black' }} />
          </IconButton>
          {/* Help Button */}
          <IconButton aria-label='' onClick={() => {}} className='hover:bg-blue-200'>
            <HelpOutlineOutlinedIcon sx={{ color: 'black' }} />
          </IconButton>
          {/* Notification Button */}
          <IconButton aria-label='' onClick={() => {}} className='hover:bg-blue-200'>
            <NotificationsOutlinedIcon sx={{ color: 'black' }} />
          </IconButton>
          {/* Personal Button */}
          <Avatar sx={{ bgcolor: deepOrange[500], fontSize: 16 }} className='w-8 h-8'>
            Q
          </Avatar>
        </div>
      </div>
      {/* Scheduler */}
      <div></div>
    </div>
  );
};

export default HomePage;
