import { Outlet } from 'react-router-dom';
import SideNavbar from './SideNavbar';
import TopBar from './TopBar';

const HomePage = () => {
  return (
    <div className='flex'>
      <SideNavbar />
      <div className='flex-1'>
        <div className='flex flex-col h-screen'>
          {/* Top Bar */}
          <TopBar />
          {/* Schedule Board */}
          <div className='bg-gray-100 flex-1 h-full relative'>
            {/* <Sidebar /> */}
            <div className='bg-gray-500 flex-1 h-full'>
              <Outlet />
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;
