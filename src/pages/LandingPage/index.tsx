import { useState } from 'react';
import { useNavigate } from 'react-router-dom';

const LandingPage = () => {
  const navigate = useNavigate();
  const [state, setState] = useState(false);

  const navigation = [
    { title: 'Features', path: '/' },
    { title: 'Customers', path: '/' },
    { title: 'Pricing', path: '/' },
  ];

  const features = [
    {
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3.75 13.5l10.5-11.25L12 10.5h8.25L9.75 21.75 12 13.5H3.75z'
          />
        </svg>
      ),
      title: 'Fast Refresh',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus.',
    },
    {
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M3 13.125C3 12.504 3.504 12 4.125 12h2.25c.621 0 1.125.504 1.125 1.125v6.75C7.5 20.496 6.996 21 6.375 21h-2.25A1.125 1.125 0 013 19.875v-6.75zM9.75 8.625c0-.621.504-1.125 1.125-1.125h2.25c.621 0 1.125.504 1.125 1.125v11.25c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V8.625zM16.5 4.125c0-.621.504-1.125 1.125-1.125h2.25C20.496 3 21 3.504 21 4.125v15.75c0 .621-.504 1.125-1.125 1.125h-2.25a1.125 1.125 0 01-1.125-1.125V4.125z'
          />
        </svg>
      ),
      title: 'Analytics',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus.',
    },
    {
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M16.5 10.5V6.75a4.5 4.5 0 10-9 0v3.75m-.75 11.25h10.5a2.25 2.25 0 002.25-2.25v-6.75a2.25 2.25 0 00-2.25-2.25H6.75a2.25 2.25 0 00-2.25 2.25v6.75a2.25 2.25 0 002.25 2.25z'
          />
        </svg>
      ),
      title: 'Datacenter security',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus.',
    },
    {
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M6.429 9.75L2.25 12l4.179 2.25m0-4.5l5.571 3 5.571-3m-11.142 0L2.25 7.5 12 2.25l9.75 5.25-4.179 2.25m0 0L21.75 12l-4.179 2.25m0 0l4.179 2.25L12 21.75 2.25 16.5l4.179-2.25m11.142 0l-5.571 3-5.571-3'
          />
        </svg>
      ),
      title: 'Build on your terms',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus.',
    },
    {
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z'
          />
        </svg>
      ),
      title: 'Safe to use',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus.',
    },
    {
      icon: (
        <svg
          xmlns='http://www.w3.org/2000/svg'
          fill='none'
          viewBox='0 0 24 24'
          strokeWidth={1.5}
          stroke='currentColor'
          className='w-6 h-6'
        >
          <path
            strokeLinecap='round'
            strokeLinejoin='round'
            d='M9.813 15.904L9 18.75l-.813-2.846a4.5 4.5 0 00-3.09-3.09L2.25 12l2.846-.813a4.5 4.5 0 003.09-3.09L9 5.25l.813 2.846a4.5 4.5 0 003.09 3.09L15.75 12l-2.846.813a4.5 4.5 0 00-3.09 3.09zM18.259 8.715L18 9.75l-.259-1.035a3.375 3.375 0 00-2.455-2.456L14.25 6l1.036-.259a3.375 3.375 0 002.455-2.456L18 2.25l.259 1.035a3.375 3.375 0 002.456 2.456L21.75 6l-1.035.259a3.375 3.375 0 00-2.456 2.456zM16.894 20.567L16.5 21.75l-.394-1.183a2.25 2.25 0 00-1.423-1.423L13.5 18.75l1.183-.394a2.25 2.25 0 001.423-1.423l.394-1.183.394 1.183a2.25 2.25 0 001.423 1.423l1.183.394-1.183.394a2.25 2.25 0 00-1.423 1.423z'
          />
        </svg>
      ),
      title: 'Flexible',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget molestie varius, enim ex faucibus purus.',
    },
  ];

  const plans = [
    {
      name: 'Basic plan',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 12,
      isMostPop: false,
      features: [
        'Curabitur faucibus',
        'massa ut pretium maximus',
        'Sed posuere nisi',
        'Pellentesque eu nibh et neque',
        'Suspendisse a leo',
        'Praesent quis venenatis ipsum',
        'Duis non diam vel tortor',
      ],
    },
    {
      name: 'Startup',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 35,
      isMostPop: true,
      features: [
        'Curabitur faucibus',
        'massa ut pretium maximus',
        'Sed posuere nisi',
        'Pellentesque eu nibh et neque',
        'Suspendisse a leo',
        'Praesent quis venenatis ipsum',
        'Duis non diam vel tortor',
      ],
    },
    {
      name: 'Enterprise',
      desc: 'Lorem ipsum dolor sit amet, consectetur adipiscing elit.',
      price: 60,
      isMostPop: false,
      features: [
        'Curabitur faucibus',
        'massa ut pretium maximus',
        'Sed posuere nisi',
        'Pellentesque eu nibh et neque',
        'Suspendisse a leo',
        'Praesent quis venenatis ipsum',
        'Duis non diam vel tortor',
      ],
    },
  ];

  const testimonials = [
    {
      avatar: 'https://api.uifaces.co/our-content/donated/xZ4wg2Xj.jpg',
      name: 'Martin escobar',
      title: 'Founder of meta',
      quote:
        'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et est hendrerit, porta nunc vitae.',
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/46.jpg',
      name: 'Simon andrew',
      title: 'Software engineer',
      quote:
        'Neque porro quisquam est qui dolorem ipsum quia dolor sit amet, consectetur, adipisci velit.',
    },
    {
      avatar: 'https://randomuser.me/api/portraits/men/86.jpg',
      name: 'Micheal worin',
      title: 'Product designer',
      quote:
        'There is no one who loves pain itself, who seeks after it and wants to have it, simply because it is pain.',
    },
  ];

  const footerNavs = [
    {
      label: 'Company',
      items: [
        {
          href: '/',
          name: 'Partners',
        },
        {
          href: '/',
          name: 'Blog',
        },
        {
          href: '/',
          name: 'Team',
        },
        {
          href: '/',
          name: 'Careers',
        },
      ],
    },
    {
      label: 'Resources',
      items: [
        {
          href: '/',
          name: 'Contact',
        },
        {
          href: '/',
          name: 'Support',
        },
        {
          href: '/',
          name: 'Docs',
        },
        {
          href: '/',
          name: 'Pricing',
        },
      ],
    },
    {
      label: 'About',
      items: [
        {
          href: '/',
          name: 'Terms',
        },
        {
          href: '/',
          name: 'License',
        },
        {
          href: '/',
          name: 'Privacy',
        },
        {
          href: '/',
          name: 'About US',
        },
      ],
    },
  ];

  return (
    <div>
      <nav className=' border-b w-full md:static md:text-sm md:border-none'>
        <div className='items-center px-4 max-w-screen-xl mx-auto md:flex md:px-8'>
          <div className='flex items-center justify-between py-3 md:py-5 md:block'>
            <div onClick={() => navigate('/')} className='hover:cursor-pointer'>
              <h1 className='text-lg font-semibold'>Proma</h1>
            </div>
            <div className='md:hidden'>
              <button
                className='text-gray-500 hover:text-gray-800'
                onClick={() => setState(!state)}
              >
                {state ? (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    className='h-6 w-6'
                    viewBox='0 0 20 20'
                    fill='currentColor'
                  >
                    <path
                      fillRule='evenodd'
                      d='M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z'
                      clipRule='evenodd'
                    />
                  </svg>
                ) : (
                  <svg
                    xmlns='http://www.w3.org/2000/svg'
                    fill='none'
                    viewBox='0 0 24 24'
                    strokeWidth={1.5}
                    stroke='currentColor'
                    className='w-6 h-6'
                  >
                    <path
                      strokeLinecap='round'
                      strokeLinejoin='round'
                      d='M3.75 6.75h16.5M3.75 12h16.5m-16.5 5.25h16.5'
                    />
                  </svg>
                )}
              </button>
            </div>
          </div>
          <div
            className={`flex-1 pb-3 mt-8 md:block md:pb-0 md:mt-0 ${state ? 'block' : 'hidden'}`}
          >
            <ul className='justify-end items-center space-y-6 md:flex md:space-x-6 md:space-y-0'>
              {navigation.map((item, idx) => {
                return (
                  <li key={idx} className='text-gray-700 hover:text-blue-600'>
                    <div onClick={() => navigate(item.path)} className='block'>
                      {item.title}
                    </div>
                  </li>
                );
              })}
              <span className='hidden w-px h-6 bg-gray-300 md:block'></span>
              <div className='space-y-3 items-center gap-x-6 md:flex md:space-y-0'>
                <li>
                  <div
                    onClick={() => navigate('/sign-in')}
                    className='block py-3 text-center text-gray-700 hover:text-blue-600 hover:cursor-pointer border rounded-lg md:border-none'
                  >
                    {'Log In'}
                  </div>
                </li>
                <li>
                  <div
                    onClick={() => navigate('/sign-up')}
                    className='block py-3 px-4 font-medium text-center text-white bg-blue-600 hover:bg-blue-500 hover:cursor-pointer active:bg-blue-700 active:shadow-none rounded-lg shadow md:inline'
                  >
                    Try For Free
                  </div>
                </li>
              </div>
            </ul>
          </div>
        </div>
      </nav>
      {/* Hero Section */}
      <section className='py-12'>
        <div className='max-w-screen-xl mx-auto text-gray-600 gap-x-12 items-center justify-between overflow-hidden md:flex md:px-8'>
          <div className='flex-none space-y-5 px-4 sm:max-w-lg md:px-0 lg:max-w-xl'>
            <h1 className='text-sm text-blue-600 font-medium'>Over 200 successful deals</h1>
            <h2 className='text-4xl text-gray-800 font-extrabold md:text-5xl'>
              We help startups to grow and make money
            </h2>
            <p>
              Sed ut perspiciatis unde omnis iste natus voluptatem accusantium doloremque
              laudantium, totam rem aperiam, eaque ipsa quae.
            </p>
            <div className='items-center gap-x-3 space-y-3 sm:flex sm:space-y-0'>
              <div
                onClick={() => navigate('/')}
                className='block py-2 px-4 text-center text-white font-medium bg-blue-600 duration-150 hover:bg-blue-500 hover:cursor-pointer active:bg-blue-700 rounded-lg shadow-lg hover:shadow-none'
              >
                Let's Get Started
              </div>
            </div>
          </div>
          <div className='flex-none mt-14 md:mt-0 md:max-w-xl'>
            <img
              src='https://images.unsplash.com/photo-1573164713619-24c711fe7878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1738&q=80'
              className=' md:rounded-tl-[108px]'
              alt=''
            />
          </div>
        </div>
      </section>
      {/* Feature Section */}
      <section className='relative py-28 bg-blue-700'>
        <div className='relative z-10 max-w-screen-xl mx-auto px-4 text-gray-300 justify-between gap-24 lg:flex md:px-8'>
          <div className='max-w-xl'>
            <h3 className='text-white text-3xl font-semibold sm:text-4xl'>
              Do more with less complexity
            </h3>
            <p className='mt-3'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Donec congue, nisl eget
              molestie varius, enim ex faucibus purus
            </p>
          </div>
          <div className='mt-12 lg:mt-0'>
            <ul className='grid gap-8 sm:grid-cols-2'>
              {features.map((item, idx) => (
                <li key={idx} className='flex gap-x-4'>
                  <div className='flex-none w-12 h-12 bg-blue-400 text-white rounded-lg flex items-center justify-center'>
                    {item.icon}
                  </div>
                  <div>
                    <h4 className='text-lg text-gray-100 font-semibold'>{item.title}</h4>
                    <p className='mt-3'>{item.desc}</p>
                  </div>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* Plan & Pricing */}
      <section className='py-12'>
        <div className='max-w-screen-xl mx-auto px-4 text-gray-600 md:px-8'>
          <div className='relative max-w-xl mx-auto sm:text-center'>
            <h3 className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
              Pricing for all sizes
            </h3>
            <div className='mt-3 max-w-xl'>
              <p>
                Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam efficitur consequat
                nunc.
              </p>
            </div>
          </div>
          <div className='mt-16 justify-center gap-6 sm:grid sm:grid-cols-2 sm:space-y-0 lg:grid-cols-3'>
            {plans.map((item, idx) => (
              <div
                key={idx}
                className={`relative flex-1 flex items-stretch flex-col rounded-xl border-2 mt-6 sm:mt-0 ${item.isMostPop ? 'mt-10' : ''}`}
              >
                {item.isMostPop ? (
                  <span className='w-32 absolute -top-5 left-0 right-0 mx-auto px-3 py-2 rounded-full border shadow-md bg-white text-center text-gray-700 text-sm font-semibold'>
                    Most popular
                  </span>
                ) : (
                  ''
                )}
                <div className='p-8 space-y-4 border-b'>
                  <span className='text-blue-600 font-medium'>{item.name}</span>
                  <div className='text-gray-800 text-3xl font-semibold'>
                    ${item.price} <span className='text-xl text-gray-600 font-normal'>/mo</span>
                  </div>
                  <p>{item.desc}</p>
                  <button className='px-3 py-3 rounded-lg w-full font-semibold text-sm duration-150 text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700'>
                    Get Started
                  </button>
                </div>
                <ul className='p-8 space-y-3'>
                  <li className='pb-2 text-gray-800 font-medium'>
                    <p>Features</p>
                  </li>
                  {item.features.map((featureItem, idx) => (
                    <li key={idx} className='flex items-center gap-5'>
                      <svg
                        xmlns='http://www.w3.org/2000/svg'
                        className='h-5 w-5 text-blue-600'
                        viewBox='0 0 20 20'
                        fill='currentColor'
                      >
                        <path
                          fill-rule='evenodd'
                          d='M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z'
                          clip-rule='evenodd'
                        ></path>
                      </svg>
                      {featureItem}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>
      {/* Testimonials */}
      <section className='relative py-12'>
        <div className='relative z-10 max-w-screen-xl mx-auto px-4 md:px-8'>
          <div className='max-w-xl sm:text-center md:mx-auto'>
            <h3 className='text-gray-800 text-3xl font-semibold sm:text-4xl'>
              Hear from our customers
            </h3>
            <p className='mt-3 text-gray-600'>
              Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nunc et est hendrerit, porta
              nunc vitae, gravida justo. Nunc fermentum magna lorem, euismod volutpat arcu volutpat
              et.
            </p>
          </div>
          <div className='mt-12'>
            <ul className='grid items-center gap-6 sm:grid-cols-2 lg:grid-cols-3'>
              {testimonials.map((item, idx) => (
                <li key={idx} className='bg-white rounded-xl border shadow-md'>
                  <div className='p-4'>
                    <svg
                      className='w-9 h-9 text-gray-300'
                      viewBox='0 0 35 35'
                      fill='none'
                      xmlns='http://www.w3.org/2000/svg'
                    >
                      <path
                        d='M9.47895 14.5833C9.15374 14.5833 8.84166 14.6329 8.53103 14.6781C8.63166 14.3398 8.7352 13.9956 8.90145 13.6865C9.0677 13.2373 9.32728 12.8479 9.58541 12.4556C9.80124 12.0312 10.1819 11.7439 10.4619 11.3808C10.755 11.0279 11.1546 10.7931 11.471 10.5C11.7817 10.1937 12.1885 10.0406 12.5123 9.82478C12.8506 9.63082 13.1452 9.41645 13.4602 9.31437L14.2462 8.99062L14.9375 8.70332L14.2302 5.87708L13.3596 6.08707C13.081 6.15707 12.7412 6.23874 12.3548 6.33645C11.9596 6.40937 11.5381 6.60916 11.0685 6.79145C10.6048 6.99853 10.0681 7.13853 9.56937 7.47103C9.0677 7.78895 8.48874 8.05437 7.97833 8.4802C7.48395 8.91916 6.88749 9.29978 6.44708 9.85833C5.96583 10.3804 5.49041 10.9287 5.12145 11.5529C4.69416 12.1479 4.40395 12.8012 4.0977 13.4473C3.82062 14.0933 3.59749 14.754 3.4152 15.3956C3.06958 16.6819 2.91499 17.904 2.8552 18.9496C2.80562 19.9967 2.83478 20.8673 2.89603 21.4973C2.91791 21.7948 2.95874 22.0835 2.98791 22.2833L3.02437 22.5283L3.06228 22.5196C3.32167 23.7312 3.91877 24.8446 4.78452 25.7311C5.65028 26.6175 6.7493 27.2408 7.95447 27.5287C9.15963 27.8166 10.4217 27.7575 11.5946 27.3581C12.7676 26.9587 13.8035 26.2354 14.5825 25.2719C15.3616 24.3083 15.8519 23.1439 15.9969 21.9133C16.1418 20.6828 15.9353 19.4363 15.4014 18.3181C14.8675 17.2 14.028 16.2558 12.9799 15.5949C11.9318 14.934 10.718 14.5832 9.47895 14.5833ZM25.5206 14.5833C25.1954 14.5833 24.8833 14.6329 24.5727 14.6781C24.6733 14.3398 24.7769 13.9956 24.9431 13.6865C25.1094 13.2373 25.369 12.8479 25.6271 12.4556C25.8429 12.0312 26.2235 11.7439 26.5035 11.3808C26.7967 11.0279 27.1962 10.7931 27.5127 10.5C27.8233 10.1937 28.2302 10.0406 28.554 9.82478C28.8923 9.63082 29.1869 9.41645 29.5019 9.31437L30.2879 8.99062L30.9792 8.70332L30.2719 5.87708L29.4012 6.08707C29.1227 6.15707 28.7829 6.23874 28.3965 6.33645C28.0012 6.40937 27.5798 6.60916 27.1102 6.79145C26.6479 6.99999 26.1098 7.13853 25.611 7.47249C25.1094 7.79041 24.5304 8.05582 24.02 8.48166C23.5256 8.92062 22.9292 9.30124 22.4887 9.85833C22.0075 10.3804 21.5321 10.9287 21.1631 11.5529C20.7358 12.1479 20.4456 12.8012 20.1394 13.4473C19.8623 14.0933 19.6392 14.754 19.4569 15.3956C19.1112 16.6819 18.9567 17.904 18.8969 18.9496C18.8473 19.9967 18.8765 20.8673 18.9377 21.4973C18.9596 21.7948 19.0004 22.0835 19.0296 22.2833L19.066 22.5283L19.104 22.5196C19.3633 23.7312 19.9604 24.8446 20.8262 25.7311C21.6919 26.6175 22.791 27.2408 23.9961 27.5287C25.2013 27.8166 26.4634 27.7575 27.6363 27.3581C28.8093 26.9587 29.8452 26.2354 30.6242 25.2719C31.4033 24.3083 31.8936 23.1439 32.0385 21.9133C32.1834 20.6828 31.977 19.4363 31.4431 18.3181C30.9092 17.2 30.0697 16.2558 29.0216 15.5949C27.9735 14.934 26.7597 14.5832 25.5206 14.5833Z'
                        fill='currentColor'
                      />
                    </svg>
                  </div>
                  <figure>
                    <blockquote>
                      <p className='text-gray-800 text-lg font-semibold px-4 py-1'>{item.quote}</p>
                    </blockquote>
                    <div className='flex items-center gap-x-4 p-4 mt-6 bg-blue-50'>
                      <img
                        src={item.avatar}
                        className='w-16 h-16 rounded-full border-2 border-blue-500'
                      />
                      <div>
                        <span className='block text-gray-800 font-semibold'>{item.name}</span>
                        <span className='block text-blue-600 text-sm mt-0.5'>{item.title}</span>
                      </div>
                    </div>
                  </figure>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>
      {/* Contact Section */}
      <section className='py-14 max-w-screen-xl mx-auto'>
        <div className='relative overflow-hidden mx-4 px-4 py-14 rounded-2xl bg-blue-600 md:px-8 md:mx-8'>
          <div className='relative z-10 max-w-xl mx-auto sm:text-center'>
            <div className='space-y-3'>
              <h3 className='text-3xl text-white font-bold'>Subscribe to our newsletter</h3>
              <p className='text-blue-100 leading-relaxed'>
                Stay up to date with the roadmap progress, announcements and exclusive discounts
                feel free to sign up with your email.
              </p>
            </div>
            <div className='mt-6'>
              <form
                onSubmit={(e) => e.preventDefault()}
                className='flex items-center justify-center bg-white rounded-lg p-1 sm:max-w-md sm:mx-auto'
              >
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='text-gray-500 w-full p-2 outline-none'
                />
                <button className='p-2 px-3 rounded-lg font-medium text-white bg-blue-600 hover:bg-blue-500 active:bg-blue-700 duration-150 outline-none shadow-md focus:shadow-none sm:px-4'>
                  Subscribe
                </button>
              </form>
              <p className='mt-3 max-w-lg text-[15px] text-blue-100 sm:mx-auto'>
                No spam ever, we are care about the protection of your data. Read our{' '}
                <div onClick={() => navigate('/')} className='underline hover:cursor-pointer'>
                  Privacy Policy
                </div>
              </p>
            </div>
          </div>
        </div>
      </section>
      {/* Footer */}
      <footer className=' px-4 py-5 max-w-screen-xl mx-auto md:px-8'>
        <div className='gap-6 justify-between md:flex'>
          <div className='flex-1'>
            <div className='max-w-xs'>
              <h1 className='text-lg font-semibold'>Proma</h1>
              <p className='leading-relaxed mt-2 text-sm'>
                Lorem Ipsum has been the industry's standard dummy text ever since the 1500s.
              </p>
            </div>
            <form onSubmit={(e) => e.preventDefault()}>
              <label className='block pt-4 pb-2'>Stay up to date</label>
              <div className='max-w-sm flex items-center border rounded-md p-1'>
                <input
                  type='email'
                  placeholder='Enter your email'
                  className='w-full p-2.5 outline-none'
                />
                <button className='p-2.5 rounded-md text-white bg-blue-600 outline-none shadow-md focus:shadow-none sm:px-5'>
                  Subscribe
                </button>
              </div>
            </form>
          </div>
          <div className='flex-1 mt-10 space-y-6 items-center justify-between sm:flex md:space-y-0 md:mt-0'>
            {footerNavs.map((item, idx) => (
              <ul className='space-y-4' key={idx}>
                <h4 className='text-lg font-medium'>{item.label}</h4>
                {item.items.map((el, idx) => (
                  <li key={idx}>
                    <div
                      onClick={() => navigate(el.href)}
                      className='hover:underline hover:cursor-pointer hover:text-blue-600'
                    >
                      {el.name}
                    </div>
                  </li>
                ))}
              </ul>
            ))}
          </div>
        </div>
      </footer>
    </div>
  );
};

export default LandingPage;
