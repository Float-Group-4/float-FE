import { Outlet } from 'react-router-dom';
import SideNavbar from './SideNavbar/index';

export default function AuthLayout() {
  return (
    <div className='flex'>
      <SideNavbar />
      <div className='flex-1'>
        <Outlet />
      </div>
    </div>
  );
}
