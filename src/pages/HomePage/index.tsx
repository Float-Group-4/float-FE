import Schedule from './Schedule';
import TopBar from './TopBar';

const HomePage = () => {
  return (
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
    </div>
  );
};

export default HomePage;
