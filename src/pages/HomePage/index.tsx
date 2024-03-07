import Schedule from './Schedule';
import TopBar from './TopBar';

const HomePage = () => {
  return (
    <div className='flex flex-col h-screen'>
      {/* Top Bar */}
      <TopBar />
      {/* Schedule Board */}
      <Schedule />
    </div>
  );
};

export default HomePage;
