import React from 'react';
import { Link } from 'react-router-dom';
import { useRecoilState } from 'recoil';
import { textState } from '../store/recoil_state';

const NavBar = () => {
  const [text, setText] = useRecoilState(textState);

  return (
    <>
      <div className='flex justify-between px-4 bg-blue-500'>
        <h1 className='p-4 pl-0 text-2xl text-white'>Hello 500 Bros</h1>
        <div className='flex items-center gap-2'>
          <Link to={'/login'} className=''>
            Login 
          </Link>
          <Link to={'/sign-up'} className=''>
            Sign up
          </Link>
        </div>
      </div>
    </>
  );
};

export default NavBar;
