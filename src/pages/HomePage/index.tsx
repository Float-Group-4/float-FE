import ActionButton from './ActionButton';
import Schedule from './Schedule';
import TopBar from './TopBar';

const HomePage = () => {
  return (
    <div className='flex flex-col h-screen'>
      {/* Top Bar */}
      <TopBar />
      {/* Schedule Board */}
      <Schedule />
      {/* Action Button */}
      <ActionButton />
    </div>
  );
};

export default HomePage;
