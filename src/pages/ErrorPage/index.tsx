import React from 'react';
import { useNavigate } from 'react-router-dom';

export default function ErrorPage() {
  const navigate = useNavigate();
  return (
    <main>
      <div className='max-w-screen-xl mx-auto px-4 flex items-center justify-start h-screen md:px-8'>
        <div className='max-w-lg mx-auto space-y-3 text-center'>
          <h3 className='text-blue-600 font-semibold'>404 Error</h3>
          <p className='text-gray-800 text-4xl font-semibold sm:text-5xl'>Page not found</p>
          <p className='text-gray-600'>
            Sorry, the page you are looking for could not be found or has been removed.
          </p>
          <div className='flex flex-wrap items-center justify-center gap-3'>
            <div
              onClick={() => navigate('/')}
              className='block py-2 px-4 text-white font-medium bg-blue-600 duration-150 hover:bg-blue-500 active:bg-blue-700 rounded-lg'
            >
              Go back
            </div>
          </div>
        </div>
      </div>
    </main>
  );
}
