import { Outlet } from 'react-router-dom';
import SideNavbar from './SideNavbar';

export default function UserLayout() {
  return (
    <div className='flex'>
      <SideNavbar />
      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  );
}
