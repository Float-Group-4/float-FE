import LogoutIcon from '@mui/icons-material/Logout';
import GroupAddOutlinedIcon from '@mui/icons-material/GroupAddOutlined';
import LockOutlinedIcon from '@mui/icons-material/LockOutlined';
import { Navigate, useNavigate } from 'react-router-dom';

export interface Team {
  name: string;
  totalProject: number;
  totalPeople: number;
  isActive: boolean;
}

export default function ChooseTeamPage() {
  const navigate = useNavigate();
  const teams = [
    {
      name: 'Team 1',
      totalProject: 5,
      totalPeople: 4,
      isActive: true,
    },
    {
      name: 'Team 2',
      totalProject: 5,
      totalPeople: 4,
      isActive: true,
    },
    {
      name: 'Team 3',
      totalProject: 5,
      totalPeople: 4,
      isActive: false,
    },
    {
      name: 'Team 4',
      totalProject: 5,
      totalPeople: 4,
      isActive: false,
    },
    {
      name: 'Team 5',
      totalProject: 5,
      totalPeople: 4,
      isActive: false,
    },
  ];

  const activeTeams = teams.filter((team) => team.isActive);
  const inactiveTeams = teams.filter((team) => !team.isActive);

  const handleClickTeam = (team: Team) => {
    console.log(team);
    navigate('/home');
  };

  return (
    <div>
      <nav className='flex-1 flex w-full relative items-center pt-2 px-4'>
        <div className='flex justify-between'>
          <div onClick={() => navigate('/')}>
            <img
              src='https://www.floatui.com/logo.svg'
              width={120}
              height={50}
              alt='Float UI logo'
            />
          </div>
        </div>
        <ul className={`flex-1 gap-8 justify-end mt-12 md:text-md md:font-medium md:flex md:mt-0`}>
          <div className='flex gap-4 justify-between items-center'>
            <li className='order-2 py-5 md:py-0'>
              <div
                onClick={() => navigate('/')}
                className=' gap-2py-2 px-5 rounded-lg font-medium text-center border-2 border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white duration-150 block md:py-3 md:inline'
              >
                <span>
                  <LogoutIcon fontSize='small' className='me-2' />
                </span>
                Sign Out
              </div>
            </li>
          </div>
        </ul>
      </nav>
      {/* Your Team Section */}
      <section className='p-8'>
        <h2 className='text-2xl font-semibold mb-4'>Your Team:</h2>
        <div className='flex flex-wrap gap-4'>
          {activeTeams.map((team) => {
            return (
              <div
                className={`relative h-52 grow-0 shrink-0 bg-white py-12 rounded-lg shadow-sm border-2 border-gray-100 ${!team.isActive && 'text-gray-400'} hover:cursor-pointer hover:shadow-md hover:border-gray-200 hover:text-blue-600 flex flex-col justify-center items-center`}
                style={{
                  flexBasis: 'calc(33.33333% - 1rem)',
                }}
                onClick={(e) => {
                  handleClickTeam(team);
                }}
              >
                <p className='text-xl font-medium'>{team.name}</p>
                <p className='my-2'>{`${team.totalProject} Project / ${team.totalPeople} People`}</p>
                {!team.isActive && (
                  <div className='absolute top-4 left-4'>
                    <LockOutlinedIcon />
                  </div>
                )}
              </div>
            );
          })}
          <div
            className='h-52 text-blue-600 border-dashed grow-0 shrink-0 bg-white py-12 rounded-lg shadow-sm border-2 border-blue-600 
            hover:cursor-pointer hover:shadow-md hover:border-blue-500-200 flex flex-col justify-center items-center'
            style={{
              flexBasis: 'calc(33.33333% - 1rem)',
            }}
            onClick={() => {
              navigate('/sign-up');
            }}
          >
            <GroupAddOutlinedIcon className='text-6xl m-2' />
            <p className='text-xl font-medium'>Create new team</p>
          </div>
        </div>
      </section>
      {/* Inactive Team Section */}
      <section className='p-8'>
        <h2 className='text-2xl font-semibold mb-4'>Inactive Team:</h2>
        <div className='flex flex-wrap gap-4'>
          {inactiveTeams.map((team) => {
            return (
              <div
                className={`relative h-52 grow-0 shrink-0 bg-white py-12 rounded-lg shadow-sm border-2 border-gray-100 ${!team.isActive && 'text-gray-400'} hover:cursor-pointer hover:shadow-md hover:border-gray-200 hover:text-blue-600 flex flex-col justify-center items-center`}
                style={{
                  flexBasis: 'calc(33.33333% - 1rem)',
                }}
              >
                <p className='text-xl font-medium'>{team.name}</p>
                {!team.isActive && (
                  <>
                    <p className='my-2'>Your free trial has ended</p>
                    <p className='text-gray-600 font-medium'>Upgrade to a paid plan</p>
                    <div className='absolute top-4 left-4'>
                      <LockOutlinedIcon />
                    </div>
                  </>
                )}
              </div>
            );
          })}
        </div>
      </section>
    </div>
  );
}
