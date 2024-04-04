import { useEffect } from 'react';
import ActionButton from './ActionButton';
import Schedule from './Schedule';
import { ScheduleContextWrapper } from './Schedule/ScheduleContext';
import TopBar from './TopBar';
import { axiosAPI, axiosApi } from '@base/utils/axios/api';

const HomePage = () => {
  const fetchInitData = async () => {
    const endpoint = 'http://localhost:4000/';
    const result = await axiosAPI(endpoint, 'GET');
    console.log(result);
  };
  useEffect(() => {
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
