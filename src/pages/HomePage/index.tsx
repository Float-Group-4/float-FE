import { useEffect, useState } from 'react';
import ActionButton from './ActionButton';
import Schedule from './Schedule';
import { ScheduleContextWrapper } from './Schedule/ScheduleContext';
import TopBar from './TopBar';
import { axiosAPI } from '@base/utils/axios/api';

const HomePage = () => {
  const [teamId, setTeamId] = useState('337b3b37-9f81-4c0a-be03-8445dabe513a');
  const fetchInitData = async () => {
    const endpoint = `${import.meta.env.VITE_FRONTEND_BASE_URL}/allocation/team/${teamId}`;
    const result = await axiosAPI(endpoint, 'GET');
    console.log(result);
  };
  useEffect(() => {
    setTeamId('337b3b37-9f81-4c0a-be03-8445dabe513a');
    console.log('Render Home Page');
    fetchInitData();
  }, []);
  return (
    <ScheduleContextWrapper>
      <div
        className='flex flex-col h-screen w-screen overflow-auto'
        style={{
          width: 'calc(100vw - 68px)',
        }}
      >
        {/* Top Bar */}
        <TopBar />
        {/* Schedule Board */}
        <Schedule />
        {/* Action Button*/}
        <ActionButton />
      </div>
    </ScheduleContextWrapper>
  );
};

export default HomePage;
