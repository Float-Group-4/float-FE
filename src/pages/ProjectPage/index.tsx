import ProjectView from './ProjectView';
import TopBar from './TopBar';

const PeoplePage = () => {
  return (
    <div className='flex flex-col h-screen'>
      {/* Top Bar */}
      <TopBar />
      {/* Schedule Board */}
      <ProjectView />
    </div>
  );
};

export default PeoplePage;
