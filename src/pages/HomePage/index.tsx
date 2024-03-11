import ActionButton from './ActionButton';
import Schedule from './Schedule';
import { ScheduleContextWrapper } from './Schedule/ScheduleContext';
import TopBar from './TopBar';

const HomePage = () => {
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
