import { IconButton } from '@mui/material';
import BarChartOutlinedIcon from '@mui/icons-material/BarChartOutlined';
import ClearAllOutlinedIcon from '@mui/icons-material/ClearAllOutlined';
import FolderOutlinedIcon from '@mui/icons-material/FolderOutlined';
import HelpOutlineOutlinedIcon from '@mui/icons-material/HelpOutlineOutlined';
import NotificationsOutlinedIcon from '@mui/icons-material/NotificationsOutlined';
import PeopleOutlinedIcon from '@mui/icons-material/PeopleOutlined';
import SettingsOutlinedIcon from '@mui/icons-material/SettingsOutlined';
import { Avatar } from '@mui/material';
import { deepOrange, grey } from '@mui/material/colors';
import { useNavigate } from 'react-router-dom';

export default function SideNavbar() {
  const navigate = useNavigate();
  return (
    <div className='bg-gray-100 h-screen w-[68px] px-2 py-4 flex flex-col justify-between'>
      {/* Top Button Group */}
      <div className='flex flex-col gap-4 items-center'>
        {/* Schedule Button */}
        <div
          className='w-full aspect-square flex flex-col items-center group hover:cursor-pointer gap-1'
          onClick={(_e) => {
            navigate('/home');
          }}
        >
          <IconButton
            aria-label=''
            onClick={() => {}}
            className='group-hover:bg-blue-200 rounded-md'
          >
            <ClearAllOutlinedIcon sx={{ color: grey[800] }} />
          </IconButton>
          <div className='text-[10px] flex-1 flex justify-center items-center'>
            <p>Schedule</p>
          </div>
        </div>
        {/* People Button */}
        <div
          className='w-full aspect-square flex flex-col items-center group hover:cursor-pointer gap-1'
          onClick={(_e) => {
            navigate('/people');
          }}
        >
          <IconButton
            aria-label=''
            onClick={() => {}}
            className='group-hover:bg-blue-200 rounded-md'
          >
            <PeopleOutlinedIcon sx={{ color: grey[800] }} />
          </IconButton>
          <div className='text-[10px] flex-1 flex justify-center items-center'>
            <p>People</p>
          </div>
        </div>
        {/* Project Button */}
        <div
          className='w-full aspect-square flex flex-col items-center group hover:cursor-pointer gap-1'
          onClick={(_e) => {
            navigate('/project');
          }}
        >
          <IconButton
            aria-label=''
            onClick={() => {}}
            className='group-hover:bg-blue-200 rounded-md'
          >
            <FolderOutlinedIcon sx={{ color: grey[800] }} />
          </IconButton>
          <div className='text-[10px] flex-1 flex justify-center items-center'>
            <p>Project</p>
          </div>
        </div>
        {/* Report Button */}
        <div
          className='w-full aspect-square flex flex-col items-center group hover:cursor-pointer gap-1'
          onClick={(_e) => {
            navigate('/report');
          }}
        >
          <IconButton
            aria-label=''
            onClick={() => {}}
            className='group-hover:bg-blue-200 rounded-md'
          >
            <BarChartOutlinedIcon sx={{ color: grey[800] }} />
          </IconButton>
          <div className='text-[10px] flex-1 flex justify-center items-center'>
            <p>Report</p>
          </div>
        </div>
      </div>
      {/* Bottom Button Group */}
      <div className='flex flex-col justify-end items-center gap-4'>
        {/* Setting Button */}
        <IconButton aria-label='' onClick={() => {}} className='hover:bg-blue-200 rounded-md'>
          <SettingsOutlinedIcon sx={{ color: grey[800] }} />
        </IconButton>
        {/* Help Button */}
        <IconButton aria-label='' onClick={() => {}} className='hover:bg-blue-200 rounded-md'>
          <HelpOutlineOutlinedIcon sx={{ color: grey[800] }} />
        </IconButton>
        {/* Notification Button */}
        <IconButton aria-label='' onClick={() => {}} className='hover:bg-blue-200 rounded-md'>
          <NotificationsOutlinedIcon sx={{ color: grey[800] }} />
        </IconButton>
        {/* Personal Button */}
        <Avatar sx={{ bgcolor: deepOrange[500], fontSize: 16 }} className='w-8 h-8'>
          Q
        </Avatar>
      </div>
    </div>
  );
}
