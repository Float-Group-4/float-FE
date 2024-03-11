import PeopleView from './PeopleView';
import TopBar from './TopBar';

const PeoplePage = () => {
  return (
    <div className='flex flex-col h-screen'>
      {/* Top Bar */}
      <TopBar />
      {/* Schedule Board */}
      <PeopleView />
    </div>
  );
};

export default PeoplePage;
